import mongoose from "mongoose";

const visualComponentSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: {
    type: String,
    enum: ["KPI_CARD", "BAR_CHART", "LINE_CHART", "DONUT_CHART", "AREA_CHART", "PIE_CHART", "TABLE", "SCATTER_PLOT", "MAP", "HISTOGRAM"],
    required: true,
  },
  title: { type: String, default: "Untitled Visual" },
  bounds: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    width: { type: Number, default: 100 },
    height: { type: Number, default: 100 },
  },
  mapping: {
    dimension: { type: String, default: "" },
    measure: { type: String, default: "" },
    aggregation: { type: String, enum: ["SUM", "AVG", "COUNT", "MEDIAN", "MIN", "MAX"], default: "SUM" },
    colorDimension: { type: String, default: "" },
  },
  confidence: { type: Number, default: 0.95 },
});

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    projectName: {
      type: String,
      required: true,
      trim: true,
      default: "Tableau Dashboard Project",
    },
    imageFileName: { type: String, default: "" },
    imagePath: { type: String, default: "" },
    csvFileName: { type: String, default: "" },
    csvPath: { type: String, default: "" },
    headers: [{ type: String }],
    sampleRowCount: { type: Number, default: 0 },
    detectedVisuals: [visualComponentSchema],
    twbContent: { type: String, default: "" },
    twbxFileName: { type: String, default: "" },
    twbxPath: { type: String, default: "" },
    status: {
      type: String,
      enum: ["uploaded", "analyzing", "mapped", "compiled", "completed", "failed"],
      default: "uploaded",
    },
    compilationTimeMs: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.model("Project", projectSchema);
