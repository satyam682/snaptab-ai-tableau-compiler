import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { protect } from "../middleware/auth.js";
import { ChatSession } from "../models/ChatSession.js";
import { 
  runDataEngine, 
  generateDatasetRecommendations, 
  processConversationalQuery 
} from "../services/chatBiService.js";
import { generateTableauWorkbookXml } from "../services/tableauXmlService.js";
import { packageTwbxArchive } from "../services/packagingService.js";

const router = express.Router();

const uploadDir = path.join(process.cwd(), "uploads", "datasets");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `dataset-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB max for huge enterprise datasets
});

// @route  POST /api/chat/upload
// @desc   Upload dataset (CSV/XLSX), inspect all rows, create MongoDB session, generate recommended queries
router.post("/upload", protect, upload.single("dataset"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Please upload a CSV or Excel file." });
    }

    const filePath = req.file.path;
    const fileName = req.file.originalname;

    // Run Python Data Engine to inspect 100% of rows
    const datasetInfo = await runDataEngine({
      action: "inspect",
      filePath: filePath
    });

    // Generate AI recommendations
    const aiRecomms = await generateDatasetRecommendations(datasetInfo);

    // Create persistent MongoDB session
    const session = new ChatSession({
      userId: req.user._id,
      sessionTitle: `Analysis: ${fileName.replace(/\.[^/.]+$/, "")}`,
      dataset: {
        fileName,
        filePath,
        rowCount: datasetInfo.rowCount,
        columns: datasetInfo.columns,
        summary: datasetInfo
      },
      messages: [
        {
          id: "msg_init_" + Date.now(),
          sender: "assistant",
          text: aiRecomms.welcomeMessage,
          timestamp: new Date()
        }
      ],
      visuals: []
    });

    await session.save();

    res.status(201).json({
      success: true,
      session,
      suggestedQueries: aiRecomms.suggestedQueries
    });
  } catch (err) {
    console.error("[Chat Upload Error]", err);
    res.status(500).json({ success: false, message: err.message || "Failed to process dataset." });
  }
});

// @route  POST /api/chat/query
// @desc   Process natural language query, run full-row aggregation, store in MongoDB
router.post("/query", protect, async (req, res) => {
  try {
    const { sessionId, query } = req.body;
    if (!sessionId || !query) {
      return res.status(400).json({ success: false, message: "Session ID and query prompt are required." });
    }

    const session = await ChatSession.findOne({ _id: sessionId, userId: req.user._id });
    if (!session) {
      return res.status(404).json({ success: false, message: "Chat session not found." });
    }

    // 1. Add user message
    const userMsg = {
      id: "msg_user_" + Date.now(),
      sender: "user",
      text: query,
      timestamp: new Date()
    };
    session.messages.push(userMsg);

    // 2. Process query via Groq NLP & Python Data Engine
    const aiResult = await processConversationalQuery({
      query,
      datasetInfo: session.dataset.summary,
      filePath: session.dataset.filePath
    });

    // 3. Add assistant message
    const assistantMsg = {
      id: "msg_ai_" + Date.now(),
      sender: "assistant",
      text: aiResult.text,
      timestamp: new Date(),
      visual: aiResult.visual || undefined
    };
    session.messages.push(assistantMsg);

    // 4. If visual was generated, add to workbook visuals array
    if (aiResult.visual) {
      // Calculate responsive grid bounding box coordinates
      const currentCount = session.visuals.length;
      const isTopRow = currentCount < 3;
      const colIdx = currentCount % 3;
      const bounds = {
        x: 2 + colIdx * 32,
        y: isTopRow ? 10 : 52,
        width: 31,
        height: 40
      };

      session.visuals.push({
        id: aiResult.visual.id,
        title: aiResult.visual.title,
        type: aiResult.visual.type,
        mapping: {
          dimension: aiResult.visual.dimension,
          measure: aiResult.visual.measure,
          aggregation: aiResult.visual.aggregation
        },
        bounds,
        confidence: 0.98
      });
    }

    await session.save();

    res.json({
      success: true,
      message: assistantMsg,
      session
    });
  } catch (err) {
    console.error("[Chat Query Error]", err);
    res.status(500).json({ success: false, message: err.message || "Failed to process query." });
  }
});

// @route  GET /api/chat/sessions
// @desc   Get all past chat sessions for logged-in user
router.get("/sessions", protect, async (req, res) => {
  try {
    const sessions = await ChatSession.find({ userId: req.user._id })
      .select("sessionTitle dataset.fileName dataset.rowCount visuals createdAt updatedAt")
      .sort({ updatedAt: -1 });

    res.json({ success: true, sessions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route  GET /api/chat/session/:id
// @desc   Get complete session by ID with all messages and charts
router.get("/session/:id", protect, async (req, res) => {
  try {
    const session = await ChatSession.findOne({ _id: req.params.id, userId: req.user._id });
    if (!session) {
      return res.status(404).json({ success: false, message: "Session not found." });
    }
    res.json({ success: true, session });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route  POST /api/chat/export-twbx
// @desc   Compile all generated visuals from this chat session into a native Tableau .twbx
router.post("/export-twbx", protect, async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await ChatSession.findOne({ _id: sessionId, userId: req.user._id });

    if (!session) {
      return res.status(404).json({ success: false, message: "Session not found." });
    }

    if (!session.visuals || session.visuals.length === 0) {
      return res.status(400).json({ success: false, message: "No visual charts have been generated in this chat session yet." });
    }

    const safeProjectName = session.sessionTitle.replace(/[^a-zA-Z0-9_-]/g, "_");
    const headers = session.dataset.columns || [];

    // 1. Generate Tableau XML
    const twbXml = generateTableauWorkbookXml(
      safeProjectName,
      session.dataset.fileName,
      headers,
      session.visuals
    );

    // 2. Package into native .twbx with Hyper extract
    const archiveResult = await packageTwbxArchive({
      projectName: safeProjectName,
      twbContent: twbXml,
      csvPath: session.dataset.filePath,
      csvFileName: session.dataset.fileName,
    });

    session.twbxFileName = archiveResult.twbxFileName;
    session.twbxPath = archiveResult.twbxPath;
    session.downloadUrl = `/api/chat/download/${session._id}`;
    await session.save();

    res.json({
      success: true,
      downloadUrl: session.downloadUrl,
      fileName: archiveResult.twbxFileName,
      totalVisuals: session.visuals.length
    });
  } catch (err) {
    console.error("[Chat Export Error]", err);
    res.status(500).json({ success: false, message: err.message || "Failed to compile Tableau workbook." });
  }
});

// @route  GET /api/chat/download/:id
// @desc   Download compiled .twbx package (accessible via session ID)
router.get("/download/:id", async (req, res) => {
  try {
    const session = await ChatSession.findById(req.params.id);
    if (!session || !session.twbxPath || !fs.existsSync(session.twbxPath)) {
      return res.status(404).json({ success: false, message: "Tableau package not found or expired." });
    }

    res.download(session.twbxPath, session.twbxFileName);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
