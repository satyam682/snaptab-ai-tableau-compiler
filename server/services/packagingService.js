import { ZipArchive } from "archiver";
import fs from "fs";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

/**
 * Package .twb XML, Hyper Extract, and underlying CSV into a valid .twbx (PKZIP) archive
 */
export const packageTwbxArchive = async ({ projectName, twbContent, csvPath, csvFileName }) => {
  const uploadsDir = path.join(process.cwd(), "uploads", "twbx");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const cleanProjectName = (projectName || "SnapTab_Dashboard").replace(/[^a-zA-Z0-9_-]/g, "_");
  const timestamp = Date.now();
  const twbxFileName = `${cleanProjectName}_${timestamp}.twbx`;
  const outputFilePath = path.join(uploadsDir, twbxFileName);

  const cleanCsvName = (csvFileName || "data.csv").replace(/\.[^/.]+$/, "");

  // Generate Hyper Extract using python hyperService
  const tempHyperPath = path.join(uploadsDir, `${cleanCsvName}_${timestamp}.hyper`);
  let hasHyper = false;

  try {
    const pythonScript = path.join(process.cwd(), "services", "hyperService.py");
    const targetCsv = (csvPath && fs.existsSync(csvPath)) ? csvPath : path.join(uploadsDir, "temp_data.csv");
    if (!fs.existsSync(targetCsv)) {
      fs.writeFileSync(targetCsv, "Region,Category,Sales,Profit\nNorth,Technology,45000,12000\nSouth,Furniture,28000,6500\n");
    }

    await execFileAsync("python", [pythonScript, targetCsv, tempHyperPath]);
    if (fs.existsSync(tempHyperPath)) {
      hasHyper = true;
      console.log(`[SnapTab Packager] Generated native Hyper extract: ${tempHyperPath}`);
    }
  } catch (hyperErr) {
    console.warn("[SnapTab Packager] Hyper generation warning:", hyperErr.message);
  }

  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputFilePath);
    const archive = new ZipArchive({
      zlib: { level: 9 }, // Maximum compression
    });

    output.on("close", () => {
      console.log(`[SnapTab Packager] .twbx archive created: ${archive.pointer()} total bytes`);
      // Cleanup temp hyper
      if (hasHyper && fs.existsSync(tempHyperPath)) {
        try { fs.unlinkSync(tempHyperPath); } catch (_) {}
      }
      resolve({
        twbxFileName,
        twbxPath: outputFilePath,
        fileSizeBytes: archive.pointer(),
      });
    });

    archive.on("error", (err) => {
      console.error("[SnapTab Packager Error]", err);
      reject(err);
    });

    archive.pipe(output);

    // 1. Append Tableau Workbook XML at root
    archive.append(twbContent, { name: `${cleanProjectName}.twb` });

    // 2. Append Hyper extract for Tableau Public
    if (hasHyper && fs.existsSync(tempHyperPath)) {
      archive.file(tempHyperPath, { name: `Data/Extracts/${cleanCsvName}.hyper` });
    }

    // 3. Append CSV dataset inside Data/ directory
    if (csvPath && fs.existsSync(csvPath)) {
      archive.file(csvPath, { name: `Data/${cleanCsvName}.csv` });
    } else {
      const defaultCsv = "Region,Category,Sales,Profit\nNorth,Technology,45000,12000\nSouth,Furniture,28000,6500\nEast,Office Supplies,31000,8900\nWest,Technology,52000,15400\n";
      archive.append(defaultCsv, { name: `Data/${cleanCsvName}.csv` });
    }

    archive.finalize();
  });
};

