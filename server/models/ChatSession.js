import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema({
  id: { type: String, required: true },
  sender: { type: String, enum: ["user", "assistant", "system"], required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  // Optional embedded interactive visual chart or KPI
  visual: {
    id: { type: String },
    title: { type: String },
    type: { 
      type: String, 
      enum: ["BAR_CHART", "LINE_CHART", "DONUT_CHART", "AREA_CHART", "PIE_CHART", "KPI_CARD", "TABLE"], 
    },
    dimension: { type: String, default: "" },
    measure: { type: String, default: "" },
    secondaryMeasure: { type: String, default: "" },
    aggregation: { type: String, default: "SUM" },
    summaryValue: { type: String, default: "" }, // For KPI Cards e.g. "$2,297,201"
    data: [
      {
        label: { type: String },
        value: { type: Number },
        secondaryValue: { type: Number }
      }
    ],
    confidence: { type: Number, default: 0.98 }
  }
});

const chatSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    sessionTitle: {
      type: String,
      required: true,
      trim: true,
      default: "New Chat Analytics Session",
    },
    dataset: {
      fileName: { type: String, default: "" },
      filePath: { type: String, default: "" },
      rowCount: { type: Number, default: 0 },
      columns: [{ type: String }],
      summary: { type: mongoose.Schema.Types.Mixed, default: {} }
    },
    messages: [chatMessageSchema],
    // Visuals pinned to the workbook dashboard export
    visuals: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        type: { type: String, required: true },
        mapping: {
          dimension: { type: String, default: "" },
          measure: { type: String, default: "" },
          aggregation: { type: String, default: "SUM" },
          colorDimension: { type: String, default: "" }
        },
        bounds: {
          x: { type: Number, default: 0 },
          y: { type: Number, default: 0 },
          width: { type: Number, default: 100 },
          height: { type: Number, default: 100 }
        },
        confidence: { type: Number, default: 0.98 }
      }
    ],
    twbxFileName: { type: String, default: "" },
    twbxPath: { type: String, default: "" },
    downloadUrl: { type: String, default: "" }
  },
  {
    timestamps: true,
  }
);

export const ChatSession = mongoose.model("ChatSession", chatSessionSchema);
