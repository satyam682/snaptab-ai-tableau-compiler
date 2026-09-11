import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/project.js";
import chatRoutes from "./routes/chat.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: [process.env.CLIENT_URL || "http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/chat", chatRoutes);

// Root route for browser visits
app.get("/", (req, res) => {
  res.json({
    platform: "SnapTab API Server",
    status: "active and running",
    database: "MongoDB Connected (Port 27017)",
    endpoints: {
      health: "/api/health",
      register: "POST /api/auth/register",
      login: "POST /api/auth/login",
      me: "GET /api/auth/me",
    },
    clientApp: "http://localhost:5173",
  });
});

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    platform: "SnapTab API",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[SnapTab API] Server running on http://localhost:${PORT}`);
});
