import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  Upload,
  Database,
  BarChart3,
  TrendingUp,
  PieChart as PieIcon,
  Layers,
  Sparkles,
  Download,
  ArrowLeft,
  RefreshCw,
  PlusCircle,
  MessageSquare,
  FileSpreadsheet,
  CheckCircle2,
  Trash2,
  ChevronRight,
  Maximize2
} from "lucide-react";

export default function ChatDashboard({ user, onBackToLanding, onSwitchToVisionStudio, onLogout }) {
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputQuery, setInputQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [suggestedQueries, setSuggestedQueries] = useState([]);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [exportSuccessUrl, setExportSuccessUrl] = useState(null);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const token = localStorage.getItem("snaptab_token");

  // Fetch past sessions on mount
  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const fetchSessions = async () => {
    if (!token) return;
    try {
      const res = await fetch("http://localhost:5000/api/chat/sessions", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success && data.sessions) {
        setSessions(data.sessions);
        // Load latest session if available
        if (data.sessions.length > 0 && !sessionId) {
          loadSession(data.sessions[0]._id);
        }
      }
    } catch (e) {
      console.error("Failed to load past chat sessions", e);
    }
  };

  const loadSession = async (id) => {
    if (!token || !id) return;
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/chat/session/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success && data.session) {
        setCurrentSession(data.session);
        setSessionId(data.session._id);
        setMessages(data.session.messages || []);
        if (data.session.twbxFileName) {
          setExportSuccessUrl(data.session.downloadUrl);
        } else {
          setExportSuccessUrl(null);
        }
      }
    } catch (e) {
      console.error("Failed to load session", e);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("dataset", file);

    try {
      setUploading(true);
      const res = await fetch("http://localhost:5000/api/chat/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (data.success && data.session) {
        setCurrentSession(data.session);
        setSessionId(data.session._id);
        setMessages(data.session.messages || []);
        setSuggestedQueries(data.suggestedQueries || []);
        setExportSuccessUrl(null);
        fetchSessions();
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error", err);
      alert("Failed to upload dataset.");
    } finally {
      setUploading(false);
    }
  };

  const handleSendQuery = async (queryText = null) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || !sessionId || loading) return;

    const tempUserMsg = {
      id: "temp_" + Date.now(),
      sender: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, tempUserMsg]);
    setInputQuery("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat/query", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sessionId,
          query: textToSend
        })
      });

      const data = await res.json();
      if (data.success && data.message) {
        setMessages(data.session.messages || []);
        setCurrentSession(data.session);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: "err_" + Date.now(),
            sender: "assistant",
            text: data.message || "Failed to process analytical query.",
            timestamp: new Date()
          }
        ]);
      }
    } catch (err) {
      console.error("Query error", err);
      setMessages((prev) => [
        ...prev,
        {
          id: "err_" + Date.now(),
          sender: "assistant",
          text: "Connection error. Please ensure the backend server is running.",
          timestamp: new Date()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleExportTwbx = async () => {
    if (!sessionId || exporting) return;
    try {
      setExporting(true);
      const res = await fetch("http://localhost:5000/api/chat/export-twbx", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ sessionId })
      });
      const data = await res.json();
      if (data.success && data.downloadUrl) {
        setExportSuccessUrl(data.downloadUrl);
        // Direct browser file download
        const a = document.createElement("a");
        a.href = `http://localhost:5000${data.downloadUrl}`;
        a.setAttribute("download", data.fileName || "SnapTab_Dashboard.twbx");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        alert(data.message || "Failed to compile Tableau workbook.");
      }
    } catch (err) {
      console.error("Export error", err);
      alert("Error compiling workbook.");
    } finally {
      setExporting(false);
    }
  };

  // Render Interactive Chart SVG/HTML Component
  const renderInteractiveVisual = (visual) => {
    if (!visual) return null;

    if (visual.type === "KPI_CARD") {
      return (
        <div style={{
          background: "linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(5,150,105,0.05) 100%)",
          border: "1px solid rgba(16,185,129,0.3)",
          borderRadius: "12px",
          padding: "18px 24px",
          margin: "12px 0 6px",
          display: "flex",
          flexDirection: "column",
          gap: "4px"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "#10b981", textTransform: "uppercase", letterSpacing: "1px" }}>
              KPI SCORECARD • {visual.aggregation || "SUM"}
            </span>
            <span style={{ fontSize: "10px", background: "rgba(16,185,129,0.2)", color: "#34d399", padding: "2px 6px", borderRadius: "4px" }}>
              Tableau Native
            </span>
          </div>
          <div style={{ fontSize: "28px", fontWeight: "800", color: "#ffffff", fontFamily: "var(--font-mono)", letterSpacing: "-0.5px" }}>
            {visual.summaryValue || (visual.data?.[0]?.value ? `$${visual.data[0].value.toLocaleString()}` : "0")}
          </div>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>
            {visual.title}
          </div>
        </div>
      );
    }

    const data = visual.data || [];
    const maxValue = Math.max(...data.map((d) => d.value || 0), 1);

    return (
      <div style={{
        background: "#0d1117",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "12px",
        padding: "16px",
        margin: "12px 0 6px",
        width: "100%",
        maxWidth: "580px",
        overflow: "hidden"
      }}>
        {/* Visual Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
          <div>
            <div style={{ fontSize: "14px", fontWeight: "700", color: "#ffffff" }}>
              {visual.title}
            </div>
            <div style={{ fontSize: "11px", color: "#8b949e", fontFamily: "var(--font-mono)", marginTop: "2px" }}>
              {visual.dimension} • {visual.aggregation || "SUM"}({visual.measure})
            </div>
          </div>
          <div style={{
            background: "rgba(59, 130, 246, 0.15)",
            border: "1px solid rgba(59, 130, 246, 0.3)",
            color: "#60a5fa",
            fontSize: "10px",
            fontFamily: "var(--font-mono)",
            padding: "2px 8px",
            borderRadius: "4px"
          }}>
            {visual.type}
          </div>
        </div>

        {/* Dynamic Chart Rendering */}
        {visual.type === "DONUT_CHART" || visual.type === "PIE_CHART" ? (
          /* Donut / Pie View */
          <div style={{ display: "flex", alignItems: "center", gap: "20px", padding: "10px 0" }}>
            <div style={{ position: "relative", width: "120px", height: "120px", flexShrink: 0 }}>
              <svg viewBox="0 0 42 42" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                {data.map((item, idx) => {
                  const colorsList = ["#3b82f6", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6", "#06b6d4"];
                  const total = data.reduce((acc, curr) => acc + curr.value, 0) || 1;
                  const percent = (item.value / total) * 100;
                  const prevTotal = data.slice(0, idx).reduce((acc, curr) => acc + curr.value, 0);
                  const strokeDashoffset = 100 - (prevTotal / total) * 100;

                  return (
                    <circle
                      key={idx}
                      cx="21"
                      cy="21"
                      r="15.91549430918954"
                      fill="transparent"
                      stroke={colorsList[idx % colorsList.length]}
                      strokeWidth="6"
                      strokeDasharray={`${percent} ${100 - percent}`}
                      strokeDashoffset={strokeDashoffset}
                      style={{ transition: "stroke-width 0.2s ease", cursor: "pointer" }}
                      onMouseEnter={() => setActiveTooltip({ ...item, percent: percent.toFixed(1) })}
                      onMouseLeave={() => setActiveTooltip(null)}
                    />
                  );
                })}
              </svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", flexGrow: 1, maxHeight: "140px", overflowY: "auto" }}>
              {data.map((item, idx) => {
                const colorsList = ["#3b82f6", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6", "#06b6d4"];
                return (
                  <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: colorsList[idx % colorsList.length] }} />
                      <span style={{ color: "#c9d1d9" }}>{item.label}</span>
                    </div>
                    <span style={{ color: "#ffffff", fontFamily: "var(--font-mono)", fontWeight: "600" }}>
                      ${item.value.toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Bar / Line / Area Chart View */
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "4px 0" }}>
            {data.slice(0, 8).map((item, idx) => {
              const pct = Math.max((item.value / maxValue) * 100, 2);
              return (
                <div 
                  key={idx} 
                  style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "12px" }}
                  onMouseEnter={() => setActiveTooltip(item)}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  <div style={{ width: "100px", color: "#8b949e", textAlign: "right", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {item.label}
                  </div>
                  <div style={{ flexGrow: 1, background: "rgba(255,255,255,0.05)", height: "20px", borderRadius: "4px", overflow: "hidden", position: "relative" }}>
                    <div style={{
                      width: `${pct}%`,
                      height: "100%",
                      background: visual.type === "LINE_CHART" || visual.type === "AREA_CHART"
                        ? "linear-gradient(90deg, #3b82f6, #60a5fa)"
                        : "linear-gradient(90deg, #10b981, #34d399)",
                      borderRadius: "4px",
                      transition: "width 0.4s ease"
                    }} />
                  </div>
                  <div style={{ width: "70px", fontFamily: "var(--font-mono)", color: "#ffffff", fontWeight: "600", fontSize: "11px" }}>
                    ${item.value.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Visual Footer */}
        <div style={{ marginTop: "12px", paddingTop: "8px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "11px", color: "#8b949e" }}>
          <span>Dataset Total: <b>${(visual.data?.reduce((a, b) => a + b.value, 0) || 0).toLocaleString()}</b></span>
          <span style={{ color: "#10b981", display: "flex", alignItems: "center", gap: "4px" }}>
            <CheckCircle2 size={12} /> Ready for Tableau Export
          </span>
        </div>
      </div>
    );
  };

  return (
    <div style={{ background: "#05070a", minHeight: "100vh", display: "flex", flexDirection: "column", color: "#ffffff" }}>
      {/* Top Navbar */}
      <header style={{
        height: "64px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(10, 13, 18, 0.8)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        position: "sticky",
        top: 0,
        zIndex: 50
      }}>
        {/* Brand & Mode Switcher */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <button 
            onClick={onBackToLanding}
            style={{
              background: "transparent",
              border: "none",
              color: "#888",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px"
            }}
          >
            <ArrowLeft size={16} />
            <span className="hide-mobile">Home</span>
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontWeight: "700", fontSize: "16px", letterSpacing: "-0.5px" }}>SnapTab</span>
            <span style={{ fontSize: "11px", background: "rgba(59,130,246,0.15)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.3)", padding: "2px 8px", borderRadius: "12px", fontFamily: "var(--font-mono)" }}>
              Conversational BI
            </span>
          </div>

          {/* Studio Mode Selector */}
          <div style={{
            display: "flex",
            alignItems: "center",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "20px",
            padding: "2px"
          }}>
            <button
              onClick={onSwitchToVisionStudio}
              style={{
                background: "transparent",
                border: "none",
                color: "#888",
                padding: "4px 12px",
                borderRadius: "16px",
                fontSize: "12px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              <BarChart3 size={13} />
              <span>Vision Studio</span>
            </button>
            <button
              style={{
                background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                border: "none",
                color: "#ffffff",
                padding: "4px 12px",
                borderRadius: "16px",
                fontSize: "12px",
                fontWeight: "600",
                cursor: "default",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 2px 8px rgba(59,130,246,0.4)"
              }}
            >
              <Sparkles size={13} />
              <span>Chat Dashboard</span>
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {currentSession?.visuals?.length > 0 && (
            <div style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "#10b981", display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981" }} />
              {currentSession.visuals.length} Visuals Synthesized
            </div>
          )}

          <button
            onClick={handleExportTwbx}
            disabled={exporting || !currentSession?.visuals?.length}
            style={{
              background: currentSession?.visuals?.length > 0 
                ? "linear-gradient(135deg, #10b981, #059669)" 
                : "rgba(255,255,255,0.06)",
              color: currentSession?.visuals?.length > 0 ? "#ffffff" : "#666",
              border: "1px solid rgba(255,255,255,0.15)",
              padding: "8px 16px",
              borderRadius: "8px",
              fontSize: "12px",
              fontWeight: "600",
              cursor: currentSession?.visuals?.length > 0 ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s ease"
            }}
          >
            {exporting ? <RefreshCw size={14} className="spin-icon" /> : <Download size={14} />}
            <span>{exporting ? "Compiling Tableau Package..." : "Export Package (.TWBX)"}</span>
          </button>
        </div>
      </header>

      {/* Main Studio Body */}
      <div style={{ display: "flex", flexGrow: 1, overflow: "hidden", height: "calc(100vh - 64px)" }}>
        {/* Left Sidebar: Dataset Info & Recent Sessions */}
        <aside style={{
          width: "320px",
          borderRight: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(10, 13, 18, 0.4)",
          display: "flex",
          flexDirection: "column",
          padding: "16px",
          gap: "16px",
          overflowY: "auto"
        }}>
          {/* Active Dataset Card */}
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "10px",
            padding: "14px"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "#888", textTransform: "uppercase" }}>
                Active Dataset
              </span>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#60a5fa",
                  fontSize: "11px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px"
                }}
              >
                <PlusCircle size={12} />
                <span>Upload New</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
            </div>

            {currentSession?.dataset?.fileName ? (
              <div>
                <div style={{ fontSize: "13px", fontWeight: "600", color: "#ffffff", wordBreak: "break-all" }}>
                  {currentSession.dataset.fileName}
                </div>
                <div style={{ fontSize: "11px", color: "#10b981", fontFamily: "var(--font-mono)", marginTop: "4px" }}>
                  {currentSession.dataset.rowCount.toLocaleString()} Rows Processed (100%)
                </div>
                {/* Column badges */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "10px" }}>
                  {currentSession.dataset.columns?.slice(0, 8).map((col, i) => (
                    <span key={i} style={{
                      fontSize: "10px",
                      background: "rgba(255,255,255,0.06)",
                      color: "#aaa",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      fontFamily: "var(--font-mono)"
                    }}>
                      {col}
                    </span>
                  ))}
                  {currentSession.dataset.columns?.length > 8 && (
                    <span style={{ fontSize: "10px", color: "#666" }}>
                      +{currentSession.dataset.columns.length - 8} more
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div 
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: "1px dashed rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                  padding: "16px",
                  textAlign: "center",
                  cursor: "pointer"
                }}
              >
                <FileSpreadsheet size={24} style={{ margin: "0 auto 6px", color: "#60a5fa" }} />
                <div style={{ fontSize: "12px", color: "#ddd" }}>Upload CSV / Excel</div>
                <div style={{ fontSize: "10px", color: "#666" }}>Up to 100k+ rows supported</div>
              </div>
            )}
          </div>

          {/* Synthesized Dashboard Visuals Tray */}
          <div>
            <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "#888", marginBottom: "8px", textTransform: "uppercase" }}>
              Dashboard Visuals ({currentSession?.visuals?.length || 0})
            </div>

            {currentSession?.visuals?.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {currentSession.visuals.map((vis, i) => (
                  <div key={i} style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "6px",
                    padding: "8px 10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: "600", color: "#eee" }}>{vis.title}</div>
                      <div style={{ fontSize: "10px", color: "#60a5fa", fontFamily: "var(--font-mono)" }}>
                        {vis.type} • {vis.mapping?.measure}
                      </div>
                    </div>
                    <CheckCircle2 size={13} color="#10b981" />
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: "11px", color: "#555", fontStyle: "italic", padding: "6px 0" }}>
                Ask a query in chat to generate charts.
              </div>
            )}
          </div>

          {/* Past Chat Sessions List (MongoDB) */}
          <div style={{ marginTop: "auto", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "12px" }}>
            <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "#888", marginBottom: "8px", textTransform: "uppercase" }}>
              Recent Sessions
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", maxHeight: "150px", overflowY: "auto" }}>
              {sessions.map((sess) => (
                <div
                  key={sess._id}
                  onClick={() => loadSession(sess._id)}
                  style={{
                    padding: "6px 8px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    background: sessionId === sess._id ? "rgba(59,130,246,0.15)" : "transparent",
                    color: sessionId === sess._id ? "#60a5fa" : "#888",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.15s ease"
                  }}
                >
                  <MessageSquare size={12} />
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {sess.sessionTitle || "Analytics Session"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Center Chat Area */}
        <main style={{ flexGrow: 1, display: "flex", flexDirection: "column", height: "100%", background: "#05070a" }}>
          {/* Chat Messages Thread */}
          <div style={{ flexGrow: 1, overflowY: "auto", padding: "24px 32px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {messages.map((msg, idx) => (
              <div 
                key={msg.id || idx}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: msg.sender === "user" ? "flex-end" : "flex-start",
                  width: "100%"
                }}
              >
                {/* Sender badge */}
                <div style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: "#666", marginBottom: "4px", padding: "0 4px" }}>
                  {msg.sender === "user" ? "You" : "SnapTab AI"}
                </div>

                {/* Bubble */}
                <div style={{
                  maxWidth: "75%",
                  background: msg.sender === "user" ? "#1d4ed8" : "rgba(255,255,255,0.04)",
                  border: msg.sender === "user" ? "none" : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: msg.sender === "user" ? "16px 16px 2px 16px" : "16px 16px 16px 2px",
                  padding: "14px 18px",
                  color: "#ffffff",
                  fontSize: "13.5px",
                  lineHeight: "1.6",
                  boxShadow: msg.sender === "user" ? "0 4px 14px rgba(29,78,216,0.3)" : "none"
                }}>
                  <div>{msg.text}</div>

                  {/* Render Visual Chart if attached */}
                  {msg.visual && renderInteractiveVisual(msg.visual)}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#60a5fa", fontSize: "12px", padding: "8px" }}>
                <RefreshCw size={14} className="spin-icon" />
                <span>Analyzing full dataset with Groq LPU and aggregating records...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Query Suggestion Pills Carousel */}
          {suggestedQueries.length > 0 && (
            <div style={{ padding: "8px 32px", display: "flex", gap: "8px", overflowX: "auto", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
              {suggestedQueries.map((query, i) => (
                <button
                  key={i}
                  onClick={() => handleSendQuery(query)}
                  style={{
                    background: "rgba(59, 130, 246, 0.08)",
                    border: "1px solid rgba(59, 130, 246, 0.25)",
                    color: "#93c5fd",
                    padding: "6px 12px",
                    borderRadius: "16px",
                    fontSize: "11.5px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.15s ease"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(59, 130, 246, 0.18)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "rgba(59, 130, 246, 0.08)"}
                >
                  <Sparkles size={11} />
                  <span>{query}</span>
                </button>
              ))}
            </div>
          )}

          {/* Bottom Chat Input Form */}
          <div style={{
            padding: "16px 32px 24px",
            background: "rgba(10, 13, 18, 0.8)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}>
            <input
              type="text"
              placeholder={sessionId ? "Ask an analytical question (e.g., 'Show Sales by Region in a bar chart' or 'Plot Monthly Profit Trend')..." : "Upload a dataset to start conversational BI..."}
              value={inputQuery}
              disabled={!sessionId || loading}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendQuery()}
              style={{
                flexGrow: 1,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "10px",
                padding: "12px 18px",
                color: "#ffffff",
                fontSize: "13.5px",
                outline: "none"
              }}
            />
            <button
              onClick={() => handleSendQuery()}
              disabled={!inputQuery.trim() || !sessionId || loading}
              style={{
                background: inputQuery.trim() && sessionId && !loading
                  ? "linear-gradient(135deg, #3b82f6, #1d4ed8)"
                  : "rgba(255,255,255,0.08)",
                color: inputQuery.trim() && sessionId && !loading ? "#ffffff" : "#555",
                border: "none",
                borderRadius: "10px",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: inputQuery.trim() && sessionId && !loading ? "pointer" : "not-allowed",
                transition: "all 0.2s ease"
              }}
            >
              <Send size={18} />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
