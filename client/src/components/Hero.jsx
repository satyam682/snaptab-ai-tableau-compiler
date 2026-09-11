import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero({ onStartConverting }) {
  const videoUrl = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4";

  return (
    <section className="hero-wrapper">
      {/* Cinematic Ambient Background Looping Video */}
      <div className="hero-ambient-video-wrap">
        <video 
          className="hero-ambient-video" 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="auto"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      </div>

      <div className="container hero-content">
        {/* Badge */}
        <div className="hero-pill-badge" style={{ gap: "8px" }}>
          <Sparkles size={12} color="#60a5fa" />
          <span>DUAL-ENGINE AI: VISION MOCKUPS + CONVERSATIONAL CHAT DASHBOARD</span>
        </div>

        {/* Main Headline */}
        <h1 className="hero-headline">
          Turn visual mockups & chats <br />
          into <span className="serif-italic">native Tableau.</span>
        </h1>

        {/* Supporting Copy */}
        <p className="hero-subtext">
          Upload dashboard mockups OR chat directly with 50,000+ row CSV and Excel datasets in plain English. SnapTab leverages Groq LPU AI to reconstruct layouts, aggregate complete datasets, and compile production-grade native Tableau (.twbx) workbooks.
        </p>

        {/* CTAs */}
        <div className="hero-cta-group">
          <button className="btn-liquid-primary" style={{ fontSize: "15px", padding: "12px 28px" }} onClick={onStartConverting}>
            <span>Launch Vision Studio</span>
            <ArrowRight size={16} />
          </button>

          <button 
            className="btn-liquid-secondary" 
            style={{ fontSize: "15px", padding: "12px 26px", borderColor: "rgba(59,130,246,0.4)", color: "#93c5fd", display: "flex", alignItems: "center", gap: "8px" }}
            onClick={onStartConverting}
          >
            <Sparkles size={15} color="#60a5fa" />
            <span>Try Chat Dashboard</span>
          </button>
        </div>

        {/* Hero Product Visual (Split Architecture: Visual Target vs Tableau Output) */}
        <div className="product-showcase-frame">
          <div className="product-frame-header">
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#333333" }}></div>
              <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#333333" }}></div>
              <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#333333" }}></div>
              <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--muted)", marginLeft: "10px" }}>
                Split Architecture Preview
              </span>
            </div>

            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--muted)" }} className="hide-mobile">
              sales_performance_q3.png + superstore_sales.csv
            </div>

            <div style={{ 
              fontFamily: "var(--font-mono)", 
              fontSize: "11px", 
              color: "#ffffff", 
              background: "rgba(255,255,255,0.08)", 
              padding: "3px 10px", 
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}>
              <span className="status-dot-green"></span>
              <span>workbook.twbx ready</span>
            </div>
          </div>

          <div className="showcase-grid">
            {/* Left: Input Screenshot with Bounding Boxes */}
            <div style={{ padding: "24px", background: "#060606", borderRight: "1px solid var(--border-soft)" }}>
              <div style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: "var(--muted)", marginBottom: "14px" }}>
                INPUT: VISUAL TARGET
              </div>

              <div style={{
                border: "1px dashed rgba(255,255,255,0.15)",
                borderRadius: "8px",
                padding: "16px",
                height: "260px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative"
              }}>
                {/* Bounding box 1 */}
                <div style={{ 
                  border: "1px solid rgba(255,255,255,0.3)", 
                  borderRadius: "4px", 
                  padding: "8px", 
                  background: "rgba(255,255,255,0.02)",
                  position: "relative"
                }}>
                  <span style={{ position: "absolute", top: "-8px", right: "6px", fontFamily: "var(--font-mono)", fontSize: "8px", background: "#222", padding: "1px 4px", borderRadius: "2px", color: "#ccc" }}>
                    KPI_CARD
                  </span>
                  <div style={{ fontSize: "9px", color: "#888" }}>Total Revenue</div>
                  <div style={{ fontSize: "14px", fontWeight: "700" }}>$2.45M</div>
                </div>

                {/* Bounding box 2 */}
                <div style={{ 
                  border: "1px solid rgba(255,255,255,0.3)", 
                  borderRadius: "4px", 
                  padding: "12px", 
                  background: "rgba(255,255,255,0.02)",
                  height: "120px",
                  position: "relative"
                }}>
                  <span style={{ position: "absolute", top: "-8px", right: "6px", fontFamily: "var(--font-mono)", fontSize: "8px", background: "#222", padding: "1px 4px", borderRadius: "2px", color: "#ccc" }}>
                    BAR_CHART
                  </span>
                  <div style={{ fontSize: "10px", color: "#888", marginBottom: "8px" }}>Sales by Region</div>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "60px" }}>
                    <div style={{ width: "20%", height: "70%", background: "#444" }}></div>
                    <div style={{ width: "20%", height: "90%", background: "#888" }}></div>
                    <div style={{ width: "20%", height: "50%", background: "#444" }}></div>
                    <div style={{ width: "20%", height: "75%", background: "#666" }}></div>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", fontFamily: "var(--font-mono)", color: "var(--muted)" }}>
                  <span>Overlay: Active</span>
                  <span>4 Visuals Detected</span>
                </div>
              </div>
            </div>

            {/* Center: Processing Bridge */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "16px", background: "#080808" }}>
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "#151515",
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff"
              }}>
                <ArrowRight size={14} />
              </div>
            </div>

            {/* Right: Tableau Native Output */}
            <div style={{ padding: "24px", background: "#0a0a0a" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px" }}>
                <span style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: "var(--muted)" }}>
                  OUTPUT: TABLEAU WORKBOOK (.TWBX)
                </span>
                <span style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: "#ffffff" }}>
                  Status: 100% Reconstructed
                </span>
              </div>

              <div style={{
                background: "#050505",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                padding: "16px",
                height: "260px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div style={{ background: "#111", padding: "10px", borderRadius: "4px" }}>
                    <div style={{ fontSize: "9px", color: "#888", fontFamily: "var(--font-mono)" }}>SUM(Sales)</div>
                    <div style={{ fontSize: "15px", fontWeight: "700" }}>$2,450,890</div>
                  </div>
                  <div style={{ background: "#111", padding: "10px", borderRadius: "4px" }}>
                    <div style={{ fontSize: "9px", color: "#888", fontFamily: "var(--font-mono)" }}>COUNT(Orders)</div>
                    <div style={{ fontSize: "15px", fontWeight: "700" }}>14,250</div>
                  </div>
                </div>

                <div style={{ background: "#111", padding: "12px", borderRadius: "4px", height: "120px" }}>
                  <div style={{ fontSize: "10px", fontWeight: "600", color: "#eee", marginBottom: "6px" }}>
                    Worksheet: [Sales by Region]
                  </div>
                  <div style={{ fontSize: "9px", fontFamily: "var(--font-mono)", color: "#888", marginBottom: "8px" }}>
                    Rows: Region • Cols: SUM(Sales)
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: "10px", height: "55px" }}>
                    <div style={{ width: "22%", height: "65%", background: "#666" }}></div>
                    <div style={{ width: "22%", height: "95%", background: "#e5e5e5" }}></div>
                    <div style={{ width: "22%", height: "45%", background: "#555" }}></div>
                    <div style={{ width: "22%", height: "70%", background: "#888" }}></div>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "11px", color: "var(--stat)", fontFamily: "var(--font-mono)" }}>
                  <span>Packaged: data.csv + workbook.twb</span>
                  <span style={{ color: "#fff" }}>Ready to open in Tableau</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
