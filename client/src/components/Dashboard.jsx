import React, { useState, useEffect, useRef } from "react";
import { 
  ArrowLeft, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  Download, 
  FileText, 
  Image as ImageIcon, 
  Layers, 
  BarChart3, 
  TrendingUp, 
  Clock, 
  LogOut, 
  Cpu, 
  FileCode2, 
  RefreshCw, 
  Play, 
  ChevronRight,
  Database
} from "lucide-react";

export default function Dashboard({ user, onLogout, onBackToLanding, onSwitchToChat }) {
  const [projectName, setProjectName] = useState("Executive Sales Performance");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [csvFile, setCsvFile] = useState(null);
  const [csvFileName, setCsvFileName] = useState("");
  const [csvColumns, setCsvColumns] = useState(["Region", "Category", "Sales", "Profit", "Order Date"]);

  // Conversion state
  const [converting, setConverting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // 0 to 5
  const [detectedVisuals, setDetectedVisuals] = useState([]);
  const [conversionResult, setConversionResult] = useState(null);
  const [activeVisualId, setActiveVisualId] = useState(null);

  // History state
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const fileInputImageRef = useRef(null);
  const fileInputCsvRef = useRef(null);

  const token = localStorage.getItem("snaptab_token");

  // Fetch past projects on mount
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    if (!token) return;
    try {
      setLoadingHistory(true);
      const res = await fetch("http://localhost:5000/api/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setHistory(data.projects || []);
      }
    } catch (err) {
      console.error("Failed to load history:", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCsvUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCsvFile(file);
      setCsvFileName(file.name);
      // Read first line to get columns
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        const firstLine = text.split("\n")[0] || "";
        const cols = firstLine.split(",").map((c) => c.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
        if (cols.length > 0) setCsvColumns(cols);
      };
      reader.readAsText(file);
    }
  };

  // 1-Click Preset
  const handleLoadPreset = () => {
    setProjectName("Q3 Superstore Executive Performance");
    setImagePreview("https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80");
    setCsvFileName("superstore_sales_q3.csv");
    setCsvColumns(["Region", "Category", "Sub-Category", "Sales", "Profit", "Quantity", "Order Date"]);
    setImageFile(null);
    setCsvFile(null);
    setConversionResult(null);
    setCurrentStep(0);
  };

  const handleConvert = async () => {
    if (!token) {
      alert("Please sign in to convert dashboards");
      return;
    }

    setConverting(true);
    setCurrentStep(1);
    setConversionResult(null);

    // Step simulation progression
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < 4 ? prev + 1 : prev));
    }, 450);

    try {
      const formData = new FormData();
      formData.append("projectName", projectName);
      if (imageFile) formData.append("image", imageFile);
      if (csvFile) formData.append("csv", csvFile);

      const res = await fetch("http://localhost:5000/api/projects/convert", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      clearInterval(stepInterval);

      if (!res.ok) {
        throw new Error(data.message || "Conversion failed");
      }

      setCurrentStep(5);
      setDetectedVisuals(data.detectedVisuals || []);
      setConversionResult(data);
      fetchHistory(); // Refresh history
    } catch (err) {
      clearInterval(stepInterval);
      alert("Conversion Error: " + err.message);
      setCurrentStep(0);
    } finally {
      setConverting(false);
    }
  };

  const handleDownloadTwbx = (projectId) => {
    const id = projectId || conversionResult?.project?.id;
    if (id) {
      window.location.href = `http://localhost:5000/api/projects/download/${id}`;
    }
  };

  const handleDownloadTwb = (projectId) => {
    const id = projectId || conversionResult?.project?.id;
    if (id) {
      window.location.href = `http://localhost:5000/api/projects/download-twb/${id}`;
    }
  };

  return (
    <div style={{ background: "#000000", minHeight: "100vh", color: "#ffffff", paddingBottom: "80px" }}>
      {/* Background grain */}
      <div className="grain-overlay" />

      {/* ================= STUDIO TOP BAR ================= */}
      <header style={{
        background: "rgba(10, 10, 10, 0.85)",
        borderBottom: "1px solid var(--border)",
        backdropFilter: "blur(14px)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        padding: "12px 24px"
      }}>
        <div style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px"
        }}>
          {/* Left: Brand & View Switcher */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button 
              onClick={onBackToLanding}
              className="btn-liquid-secondary"
              style={{ padding: "6px 14px", fontSize: "12px", gap: "6px" }}
            >
              <ArrowLeft size={13} />
              <span>Landing Page</span>
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: "26px",
                height: "26px",
                borderRadius: "6px",
                background: "linear-gradient(135deg, #ffffff 0%, #666 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#000",
                fontWeight: "900",
                fontSize: "13px"
              }}>
                S
              </div>
              <span style={{ fontSize: "17px", fontWeight: "800", letterSpacing: "-0.4px" }}>
                SnapTab Studio
              </span>
            </div>

            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(0, 255, 102, 0.08)",
              border: "1px solid rgba(0, 255, 102, 0.2)",
              padding: "3px 10px",
              borderRadius: "100px",
              fontSize: "11px",
              fontFamily: "var(--font-mono)",
              color: "#00ff66"
            }} className="hide-mobile">
              <span className="status-dot-green"></span>
              <span>GROQ LPU & TABLEAU ENGINE ONLINE</span>
            </div>

            {/* Switch to Chat Dashboard button */}
            <button
              onClick={onSwitchToChat}
              style={{
                background: "rgba(59, 130, 246, 0.12)",
                border: "1px solid rgba(59, 130, 246, 0.3)",
                color: "#93c5fd",
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "12px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}
              title="Switch to Conversational Chat Dashboard"
            >
              <Sparkles size={13} color="#60a5fa" />
              <span>Chat Dashboard</span>
            </button>
          </div>

          {/* Center: Project Title Input */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "11px", color: "var(--muted)", fontFamily: "var(--font-mono)" }}>PROJECT:</span>
            <input 
              type="text" 
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                padding: "6px 12px",
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: "600",
                width: "260px",
                outline: "none"
              }}
            />
          </div>

          {/* Right: User Profile & Logout */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid var(--border)",
              padding: "5px 12px",
              borderRadius: "var(--radius-full)",
              fontSize: "12px",
              fontFamily: "var(--font-mono)"
            }}>
              <div style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: "#ffffff",
                color: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                fontSize: "11px"
              }}>
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <span>{user?.name || "Shivam Patel"}</span>
            </div>

            <button 
              onClick={onLogout}
              className="btn-liquid-secondary"
              style={{ padding: "6px 12px", fontSize: "12px", gap: "6px" }}
              title="Sign Out"
            >
              <LogOut size={13} />
              <span className="hide-mobile">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* ================= MAIN 3-PANEL WORKSPACE ================= */}
      <main style={{ maxWidth: "1400px", margin: "32px auto 0", padding: "0 24px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "360px 1.2fr 380px",
          gap: "24px",
          alignItems: "start"
        }}>
          {/* ================= COLUMN 1: INGESTION ZONE ================= */}
          <div style={{
            background: "#080808",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "24px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.8)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
              <span className="section-label" style={{ margin: 0 }}>STAGE 01</span>
              <button 
                onClick={handleLoadPreset}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "#ffffff",
                  fontSize: "11px",
                  fontFamily: "var(--font-mono)",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                ⚡ Load Superstore Preset
              </button>
            </div>

            <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "6px" }}>
              Upload Visual & Data
            </h3>
            <p style={{ fontSize: "12px", color: "var(--muted)", marginBottom: "20px" }}>
              Select your dashboard mockup image and its matching CSV or Excel file.
            </p>

            {/* Image Upload Box */}
            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: "11px", fontFamily: "var(--font-mono)", color: "#aaa", marginBottom: "6px" }}>
                1. DASHBOARD MOCKUP (.PNG, .JPG)
              </label>
              <input 
                type="file" 
                accept="image/*" 
                ref={fileInputImageRef} 
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              <div 
                onClick={() => fileInputImageRef.current?.click()}
                style={{
                  border: "1px dashed rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                  padding: "16px",
                  textAlign: "center",
                  cursor: "pointer",
                  background: imagePreview ? "transparent" : "rgba(255,255,255,0.02)",
                  position: "relative",
                  overflow: "hidden",
                  minHeight: "120px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {imagePreview ? (
                  <div>
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      style={{ maxWidth: "100%", maxHeight: "110px", borderRadius: "6px", objectFit: "cover" }} 
                    />
                    <div style={{ fontSize: "11px", color: "#00ff66", marginTop: "6px" }}>✓ Image loaded</div>
                  </div>
                ) : (
                  <div>
                    <ImageIcon size={22} color="#666" style={{ margin: "0 auto 8px" }} />
                    <div style={{ fontSize: "13px", color: "#eee", fontWeight: "500" }}>Click to select screenshot</div>
                    <div style={{ fontSize: "11px", color: "#666" }}>or drag and drop here</div>
                  </div>
                )}
              </div>
            </div>

            {/* CSV Upload Box */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "11px", fontFamily: "var(--font-mono)", color: "#aaa", marginBottom: "6px" }}>
                2. UNDERLYING DATASET (.CSV, .XLSX)
              </label>
              <input 
                type="file" 
                accept=".csv,.xlsx" 
                ref={fileInputCsvRef} 
                onChange={handleCsvUpload}
                style={{ display: "none" }}
              />
              <div 
                onClick={() => fileInputCsvRef.current?.click()}
                style={{
                  border: "1px dashed rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                  padding: "16px",
                  textAlign: "center",
                  cursor: "pointer",
                  background: csvFileName ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.02)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <FileText size={22} color={csvFileName ? "#00ff66" : "#666"} style={{ margin: "0 auto 8px" }} />
                <div style={{ fontSize: "13px", color: "#eee", fontWeight: "500" }}>
                  {csvFileName || "Click to select CSV dataset"}
                </div>
                <div style={{ fontSize: "11px", color: "#666" }}>
                  {csvFileName ? `${csvColumns.length} columns identified` : "Standard comma-separated dataset"}
                </div>
              </div>
            </div>

            {/* Detected Column Badges */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: "#777", marginBottom: "8px" }}>
                IDENTIFIED DATASET FIELDS ({csvColumns.length}):
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {csvColumns.map((col) => (
                  <span 
                    key={col}
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      fontSize: "11px",
                      fontFamily: "var(--font-mono)",
                      color: "#ccc"
                    }}
                  >
                    {col}
                  </span>
                ))}
              </div>
            </div>

            {/* Run Conversion Button */}
            <button 
              className="btn-liquid-primary" 
              style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: "14px" }}
              onClick={handleConvert}
              disabled={converting}
            >
              <Sparkles size={16} />
              <span>{converting ? "Processing with Groq AI..." : "Run AI Vision Conversion"}</span>
            </button>
          </div>

          {/* ================= COLUMN 2: VISION AI & MAPPING WORKSPACE ================= */}
          <div style={{
            background: "#080808",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "24px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.8)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <span className="section-label" style={{ margin: 0 }}>STAGE 02 — VISION ANALYSIS</span>
              <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "#aaa" }}>
                {detectedVisuals.length > 0 ? `${detectedVisuals.length} Visual Components Detected` : "Awaiting Conversion"}
              </span>
            </div>

            <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "14px" }}>
              Visual Target & Component Extraction
            </h3>

            {/* Visual Canvas with Overlaid Bounding Boxes */}
            <div style={{
              background: "#000000",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              minHeight: "260px",
              maxHeight: "360px",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
              padding: "4px"
            }}>
              {imagePreview ? (
                <div style={{ position: "relative", display: "inline-block", maxWidth: "100%", maxHeight: "350px" }}>
                  <img 
                    src={imagePreview} 
                    alt="Target Mockup" 
                    style={{ display: "block", maxWidth: "100%", maxHeight: "350px", width: "auto", height: "auto", borderRadius: "4px", opacity: 0.9 }} 
                  />

                  {/* SVG Overlaid Bounding Boxes */}
                  {detectedVisuals.map((vis) => {
                    const b = vis.bounds || { x: 10, y: 10, width: 30, height: 30 };
                    const isActive = activeVisualId === vis.id;
                    return (
                      <div 
                        key={vis.id}
                        onMouseEnter={() => setActiveVisualId(vis.id)}
                        onMouseLeave={() => setActiveVisualId(null)}
                        style={{
                          position: "absolute",
                          left: `${b.x}%`,
                          top: `${b.y}%`,
                          width: `${b.width}%`,
                          height: `${b.height}%`,
                          border: isActive ? "2px solid #00ff66" : "1.5px solid rgba(255,255,255,0.6)",
                          background: isActive ? "rgba(0, 255, 102, 0.15)" : "rgba(255,255,255,0.05)",
                          borderRadius: "4px",
                          transition: "all 0.2s ease",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "flex-start",
                          padding: "4px"
                        }}
                      >
                        <span style={{
                          background: "#000",
                          border: "1px solid rgba(255,255,255,0.3)",
                          color: "#fff",
                          fontSize: "9px",
                          fontFamily: "var(--font-mono)",
                          padding: "1px 5px",
                          borderRadius: "2px"
                        }}>
                          {vis.type}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ textAlign: "center", color: "#555" }}>
                  <ImageIcon size={36} style={{ margin: "0 auto 8px" }} />
                  <div style={{ fontSize: "13px" }}>No dashboard loaded yet</div>
                  <div style={{ fontSize: "11px" }}>Upload a file or click "Load Superstore Preset"</div>
                </div>
              )}
            </div>

            {/* Semantic Field Mapping Cards List */}
            <div>
              <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "#888", marginBottom: "10px" }}>
                SEMANTIC FIELD ENCODINGS (AUTO-MAPPED):
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "260px", overflowY: "auto" }}>
                {detectedVisuals.length > 0 ? (
                  detectedVisuals.map((vis) => (
                    <div 
                      key={vis.id}
                      onMouseEnter={() => setActiveVisualId(vis.id)}
                      onMouseLeave={() => setActiveVisualId(null)}
                      style={{
                        background: activeVisualId === vis.id ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)",
                        border: activeVisualId === vis.id ? "1px solid #00ff66" : "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "8px",
                        padding: "12px",
                        transition: "all 0.2s ease"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                        <span style={{ fontSize: "13px", fontWeight: "600", color: "#fff" }}>
                          {vis.title}
                        </span>
                        <span style={{
                          fontSize: "10px",
                          fontFamily: "var(--font-mono)",
                          background: "rgba(255,255,255,0.1)",
                          padding: "1px 6px",
                          borderRadius: "3px",
                          color: "#ccc"
                        }}>
                          {vis.type}
                        </span>
                      </div>

                      <div style={{ display: "flex", gap: "12px", fontSize: "11px", fontFamily: "var(--font-mono)", color: "#aaa" }}>
                        {vis.mapping?.dimension && (
                          <span>Dim: <strong style={{ color: "#fff" }}>{vis.mapping.dimension}</strong></span>
                        )}
                        {vis.mapping?.measure && (
                          <span>Measure: <strong style={{ color: "#00ff66" }}>{vis.mapping.aggregation}({vis.mapping.measure})</strong></span>
                        )}
                        <span>Confidence: <strong style={{ color: "#fff" }}>{Math.round(vis.confidence * 100)}%</strong></span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: "20px", textAlign: "center", color: "#555", fontSize: "13px" }}>
                    Run conversion to view extracted visual mapping
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ================= COLUMN 3: COMPILER & DOWNLOAD HUB ================= */}
          <div style={{
            background: "#080808",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "24px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.8)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <span className="section-label" style={{ margin: 0 }}>STAGE 03 — EXPORT</span>
              <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: currentStep === 5 ? "#00ff66" : "#aaa" }}>
                {currentStep === 5 ? "✓ COMPILATION DONE" : converting ? "COMPILING..." : "IDLE"}
              </span>
            </div>

            <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "14px" }}>
              Tableau Package Generator
            </h3>

            {/* 5-Step Progress Terminal */}
            <div style={{
              background: "#030303",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "20px",
              fontFamily: "var(--font-mono)",
              fontSize: "11px"
            }}>
              <div style={{ color: "#666", marginBottom: "12px", borderBottom: "1px solid #1a1a1a", paddingBottom: "6px" }}>
                // COMPILATION PIPELINE
              </div>

              {[
                "Visual Geometry & Components (Groq AI)",
                "Dataset Schema & Measures Inspected",
                "Semantic Field Mappings Synthesized",
                "Tableau 2024.x XML Compiled (.twb)",
                "PKZIP Archive Packaged (.twbx)"
              ].map((stepText, idx) => {
                const stepNum = idx + 1;
                const isDone = currentStep >= stepNum;
                const isCurrent = currentStep === stepNum && converting;

                return (
                  <div 
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "8px",
                      color: isDone ? "#00ff66" : isCurrent ? "#ffffff" : "#444",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <span>{isDone ? "✓" : isCurrent ? "▶" : "○"}</span>
                    <span>{stepText}</span>
                  </div>
                );
              })}
            </div>

            {/* Result & Downloads */}
            {conversionResult ? (
              <div>
                <div style={{
                  background: "rgba(0, 255, 102, 0.04)",
                  border: "1px solid rgba(0, 255, 102, 0.2)",
                  borderRadius: "8px",
                  padding: "14px",
                  marginBottom: "16px",
                  fontSize: "12px"
                }}>
                  <div style={{ color: "#00ff66", fontWeight: "700", marginBottom: "4px" }}>
                    ✓ Native Tableau Workbook Ready!
                  </div>
                  <div style={{ color: "#aaa", fontSize: "11px", fontFamily: "var(--font-mono)" }}>
                    Compiled in {conversionResult.project?.compilationTimeMs}ms • 100% Native Marks
                  </div>
                </div>

                {/* Main Download Button */}
                <button 
                  className="btn-liquid-primary" 
                  style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: "14px", marginBottom: "10px" }}
                  onClick={() => handleDownloadTwbx()}
                >
                  <Download size={16} />
                  <span>Download Package (.TWBX)</span>
                </button>

                {/* XML Download Button */}
                <button 
                  className="btn-liquid-secondary" 
                  style={{ width: "100%", justifyContent: "center", padding: "11px", fontSize: "13px" }}
                  onClick={() => handleDownloadTwb()}
                >
                  <FileCode2 size={14} />
                  <span>Download Raw XML (.TWB)</span>
                </button>
              </div>
            ) : (
              <div style={{
                border: "1px dashed rgba(255,255,255,0.1)",
                borderRadius: "8px",
                padding: "24px 16px",
                textAlign: "center",
                color: "#666",
                fontSize: "12px"
              }}>
                <div>Click "Run AI Vision Conversion" to generate your `.twbx` package.</div>
              </div>
            )}
          </div>
        </div>

        {/* ================= SECTION: PROJECT CONVERSION HISTORY (MONGODB) ================= */}
        <div style={{
          marginTop: "48px",
          background: "#080808",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: "28px"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#fff", marginBottom: "4px" }}>
                My Conversion History
              </h3>
              <p style={{ fontSize: "12px", color: "var(--muted)" }}>
                Past dashboard workbooks stored in your personal MongoDB database account.
              </p>
            </div>

            <button 
              onClick={fetchHistory}
              className="btn-liquid-secondary"
              style={{ padding: "6px 12px", fontSize: "12px", gap: "6px" }}
            >
              <RefreshCw size={13} className={loadingHistory ? "spin-icon" : ""} />
              <span>Refresh</span>
            </button>
          </div>

          {history.length > 0 ? (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", color: "#888", fontFamily: "var(--font-mono)", fontSize: "11px" }}>
                    <th style={{ padding: "10px" }}>PROJECT NAME</th>
                    <th style={{ padding: "10px" }}>DETECTED VISUALS</th>
                    <th style={{ padding: "10px" }}>TIME</th>
                    <th style={{ padding: "10px" }}>DATE</th>
                    <th style={{ padding: "10px" }}>STATUS</th>
                    <th style={{ padding: "10px", textAlign: "right" }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((proj) => (
                    <tr key={proj._id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <td style={{ padding: "14px 10px", fontWeight: "600", color: "#fff" }}>
                        {proj.projectName}
                      </td>
                      <td style={{ padding: "14px 10px", color: "var(--muted)" }}>
                        {proj.detectedVisuals?.length || 4} charts
                      </td>
                      <td style={{ padding: "14px 10px", fontFamily: "var(--font-mono)", fontSize: "11px", color: "#aaa" }}>
                        {proj.compilationTimeMs ? `${proj.compilationTimeMs}ms` : "<1s"}
                      </td>
                      <td style={{ padding: "14px 10px", color: "#888", fontSize: "12px" }}>
                        {new Date(proj.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: "14px 10px" }}>
                        <span style={{
                          background: "rgba(0, 255, 102, 0.1)",
                          color: "#00ff66",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          fontSize: "11px",
                          fontFamily: "var(--font-mono)"
                        }}>
                          Completed
                        </span>
                      </td>
                      <td style={{ padding: "14px 10px", textAlign: "right" }}>
                        <button 
                          className="btn-liquid-secondary"
                          style={{ padding: "5px 12px", fontSize: "12px", gap: "6px" }}
                          onClick={() => handleDownloadTwbx(proj._id)}
                        >
                          <Download size={12} />
                          <span>.TWBX</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "32px", color: "#555", fontSize: "13px" }}>
              <Database size={32} style={{ margin: "0 auto 10px", opacity: 0.5 }} />
              <div>No conversion history recorded yet.</div>
              <div style={{ fontSize: "11px" }}>Upload a mockup and click convert to create your first workbook.</div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
