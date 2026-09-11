import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { protect } from "../middleware/auth.js";
import { Project } from "../models/Project.js";
import { analyzeDashboardImageWithGroq } from "../services/visionService.js";
import { generateTableauWorkbookXml } from "../services/tableauXmlService.js";
import { packageTwbxArchive } from "../services/packagingService.js";

const router = express.Router();

// Configure Multer storage
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
});

// Helper: Parse CSV headers quickly from first line
const extractCsvHeaders = (filePath) => {
  try {
    if (!filePath || !fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, "utf-8");
    const firstLine = content.split("\n")[0] || "";
    return firstLine
      .split(",")
      .map((h) => h.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  } catch (err) {
    console.error("[CSV Parse Error]", err);
    return [];
  }
};

// @route   POST /api/projects/convert
// @desc    Convert dashboard screenshot + CSV into Tableau .twbx
// @access  Private (or authenticated user)
router.post(
  "/convert",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "csv", maxCount: 1 },
  ]),
  async (req, res) => {
    const startTime = Date.now();
    try {
      const projectName = req.body.projectName || "Tableau Analytics Workbook";
      const isPreset = req.body.isPreset === "true" || req.body.isPreset === true;

      let imagePath = req.files?.image?.[0]?.path;
      let csvPath = req.files?.csv?.[0]?.path;
      let imageFileName = req.files?.image?.[0]?.originalname || "dashboard.png";
      let csvFileName = req.files?.csv?.[0]?.originalname || "data.csv";

      let headers = [];

      if (csvPath) {
        headers = extractCsvHeaders(csvPath);
      }

      // Default sample headers if none detected
      if (headers.length === 0) {
        headers = [
          "Region",
          "Category",
          "Sub-Category",
          "Sales",
          "Profit",
          "Quantity",
          "Discount",
          "Order Date",
          "Customer Name",
        ];
      }

      console.log(`[SnapTab] Starting conversion for project: "${projectName}" by user ${req.user._id}`);
      console.log(`[SnapTab] CSV Headers: [${headers.join(", ")}]`);

      // 1. Vision AI Analysis via Groq (llama-3.2-11b-vision-preview)
      const aiResult = await analyzeDashboardImageWithGroq(imagePath, headers);
      const visuals = aiResult.visuals || [];

      // 2. Generate Tableau XML (.twb)
      const twbContent = generateTableauWorkbookXml({
        projectName,
        csvFileName,
        headers,
        visuals,
      });

      // 3. Package into .twbx (PKZIP archive)
      const packageResult = await packageTwbxArchive({
        projectName,
        twbContent,
        csvPath,
        csvFileName,
      });

      const compilationTimeMs = Date.now() - startTime;

      // 4. Save to MongoDB Project Collection
      const project = await Project.create({
        userId: req.user._id,
        projectName,
        imageFileName,
        imagePath: imagePath || "",
        csvFileName,
        csvPath: csvPath || "",
        headers,
        detectedVisuals: visuals,
        twbContent,
        twbxFileName: packageResult.twbxFileName,
        twbxPath: packageResult.twbxPath,
        status: "completed",
        compilationTimeMs,
      });

      return res.status(201).json({
        success: true,
        message: "Dashboard successfully converted to native Tableau (.twbx)!",
        project: {
          id: project._id,
          projectName: project.projectName,
          status: project.status,
          compilationTimeMs: project.compilationTimeMs,
          visualCount: visuals.length,
          createdAt: project.createdAt,
        },
        detectedVisuals: visuals,
        dashboardTitle: aiResult.dashboardTitle || projectName,
        downloadTwbxUrl: `/api/projects/download/${project._id}`,
        downloadTwbUrl: `/api/projects/download-twb/${project._id}`,
      });
    } catch (err) {
      console.error("[SnapTab Conversion Error]", err);
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to convert dashboard",
      });
    }
  }
);

// @route   GET /api/projects
// @desc    Get conversion history for logged in user
// @access  Private
router.get("/", protect, async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .select("-twbContent");

    return res.json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (err) {
    console.error("[Get Projects Error]", err);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve project history",
    });
  }
});

// @route   GET /api/projects/download/:id
// @desc    Download packaged .twbx file
// @access  Public (or by project ID)
router.get("/download/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project || !project.twbxPath || !fs.existsSync(project.twbxPath)) {
      return res.status(404).json({ success: false, message: "TWBX file not found" });
    }

    res.download(project.twbxPath, project.twbxFileName);
  } catch (err) {
    console.error("[Download TWBX Error]", err);
    return res.status(500).json({ success: false, message: "Download failed" });
  }
});

// @route   GET /api/projects/download-twb/:id
// @desc    Download raw Tableau XML (.twb)
// @access  Public
router.get("/download-twb/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project || !project.twbContent) {
      return res.status(404).json({ success: false, message: "TWB file not found" });
    }

    const cleanName = project.projectName.replace(/[^a-zA-Z0-9_-]/g, "_");
    res.setHeader("Content-Type", "application/xml");
    res.setHeader("Content-Disposition", `attachment; filename="${cleanName}.twb"`);
    res.send(project.twbContent);
  } catch (err) {
    console.error("[Download TWB Error]", err);
    return res.status(500).json({ success: false, message: "Download failed" });
  }
});

export default router;
