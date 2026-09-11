import React from "react";
import { Eye, Database, Layers, CheckCircle2, Sliders, ShieldCheck } from "lucide-react";

export default function FeatureSection() {
  return (
    <section id="product" className="section-spacing">
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: "700px", marginBottom: "32px" }}>
          <span className="section-label">Core Capabilities</span>
          <h2 className="section-title">
            Engineered for <span className="serif-italic">native precision</span>.
          </h2>
          <p className="section-desc">
            SnapTab decomposes dashboard images into semantic visualization components and connects them directly to your raw data.
          </p>
        </div>

        {/* Asymmetric Feature Rows */}
        <div>
          {/* Feature 01 */}
          <div className="feature-row">
            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--muted)" }}>01 / VISION LAYER</span>
              <h3 style={{ fontSize: "28px", fontWeight: "700", color: "#ffffff", margin: "10px 0 16px" }}>
                See the dashboard. Understand the structure.
              </h3>
              <p style={{ fontSize: "15px", color: "var(--muted)", lineHeight: "1.65", marginBottom: "24px" }}>
                SnapTab's vision AI layer analyzes the uploaded visual reference and accurately isolates discrete components. It classifies individual visual regions into native visualization schemas.
              </p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {["KPI Cards", "Bar Charts", "Line Charts", "Donut Charts", "Tables"].map((type, i) => (
                  <span key={i} style={{ fontFamily: "var(--font-mono)", fontSize: "11px", background: "#111", border: "1px solid var(--border-soft)", padding: "4px 10px", borderRadius: "4px", color: "#ccc" }}>
                    {type}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ background: "#0a0a0a", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "28px" }}>
              <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--muted)", marginBottom: "16px" }}>
                VISUAL CLASSIFICATION ENGINE
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ background: "#121212", border: "1px solid var(--border-soft)", borderRadius: "6px", padding: "12px", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "13px", fontWeight: "600" }}>Region A: Headline Revenue</span>
                  <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "#aaa" }}>KPI_CARD [x:5, y:5, w:20, h:15]</span>
                </div>
                <div style={{ background: "#121212", border: "1px solid var(--border-soft)", borderRadius: "6px", padding: "12px", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "13px", fontWeight: "600" }}>Region B: Regional Volume</span>
                  <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "#aaa" }}>BAR_CHART [x:5, y:25, w:45, h:50]</span>
                </div>
                <div style={{ background: "#121212", border: "1px solid var(--border-soft)", borderRadius: "6px", padding: "12px", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "13px", fontWeight: "600" }}>Region C: Trend Over Time</span>
                  <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "#aaa" }}>LINE_CHART [x:52, y:25, w:43, h:50]</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 02 */}
          <div className="feature-row">
            <div style={{ background: "#0a0a0a", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "28px" }}>
              <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--muted)", marginBottom: "16px" }}>
                SEMANTIC FIELD MAPPING
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#111", padding: "12px 16px", borderRadius: "6px" }}>
                  <span style={{ fontSize: "13px", color: "#ddd" }}>Revenue Chart</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#fff", background: "#222", padding: "2px 8px", borderRadius: "3px" }}>SUM(Sales) [Measure]</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#111", padding: "12px 16px", borderRadius: "6px" }}>
                  <span style={{ fontSize: "13px", color: "#ddd" }}>Region Bars</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#fff", background: "#222", padding: "2px 8px", borderRadius: "3px" }}>Region [Dimension]</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#111", padding: "12px 16px", borderRadius: "6px" }}>
                  <span style={{ fontSize: "13px", color: "#ddd" }}>Monthly Trajectory</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#fff", background: "#222", padding: "2px 8px", borderRadius: "3px" }}>Month(Order_Date) [Date]</span>
                </div>
              </div>
            </div>

            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--muted)" }}>02 / DATA CORRELATION</span>
              <h3 style={{ fontSize: "28px", fontWeight: "700", color: "#ffffff", margin: "10px 0 16px" }}>
                AI maps visuals to your data.
              </h3>
              <p style={{ fontSize: "15px", color: "var(--muted)", lineHeight: "1.65" }}>
                SnapTab compares visual labels against uploaded dataset headers and categorizes fields into Dimensions and Measures. It determines relationships such as categorical grouping, time granularity, and numerical aggregations.
              </p>
            </div>
          </div>

          {/* Feature 03 / Conversational BI */}
          <div className="feature-row" style={{ marginTop: "40px" }}>
            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#60a5fa" }}>03 / CONVERSATIONAL CHAT BI</span>
              <h3 style={{ fontSize: "28px", fontWeight: "700", color: "#ffffff", margin: "10px 0 16px" }}>
                Chat with 50,000+ rows. Build dashboards in English.
              </h3>
              <p style={{ fontSize: "15px", color: "var(--muted)", lineHeight: "1.65", marginBottom: "24px" }}>
                Don't have a mockup? Just upload your raw CSV or Excel dataset. Chat in plain English to generate instant interactive bar charts, line graphs, donut charts, and KPI scorecards with live full-dataset aggregation, then export everything into a native Tableau (.twbx) package.
              </p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {["100% Full-Row Aggregation", "Groq NLP Engine", "Interactive Chat Visuals", "Direct .TWBX Export", "MongoDB History"].map((type, i) => (
                  <span key={i} style={{ fontFamily: "var(--font-mono)", fontSize: "11px", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.3)", padding: "4px 10px", borderRadius: "4px", color: "#93c5fd" }}>
                    {type}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ background: "#080c14", border: "1px solid rgba(59,130,246,0.25)", borderRadius: "var(--radius-md)", padding: "24px" }}>
              <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "#60a5fa", marginBottom: "14px", display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#3b82f6" }} />
                <span>LIVE CHAT QUERY SIMULATION</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ background: "#131a28", border: "1px solid rgba(59,130,246,0.3)", borderRadius: "8px", padding: "10px 14px", alignSelf: "flex-end", maxWidth: "85%", fontSize: "12.5px", color: "#ffffff" }}>
                  "Plot Sales vs Profit by Region as a stacked bar chart"
                </div>
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "12px", fontSize: "12px", color: "#ccc" }}>
                  <div style={{ color: "#10b981", fontSize: "11px", fontFamily: "var(--font-mono)", marginBottom: "6px" }}>
                    ✓ 50,000 ROWS AGGREGATED • BAR_CHART GENERATED
                  </div>
                  <div style={{ display: "flex", gap: "6px", height: "14px", alignItems: "center" }}>
                    <div style={{ background: "#10b981", height: "100%", width: "45%", borderRadius: "2px" }} />
                    <div style={{ background: "#3b82f6", height: "100%", width: "35%", borderRadius: "2px" }} />
                    <div style={{ background: "#f59e0b", height: "100%", width: "20%", borderRadius: "2px" }} />
                  </div>
                  <div style={{ marginTop: "8px", fontSize: "11px", color: "#888" }}>
                    Synthesized into Tableau Worksheets: Sales_by_Region
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 03 & Differentiator (Section 17) */}
          <div style={{
            background: "linear-gradient(180deg, #101010 0%, #060606 100%)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "54px 40px",
            margin: "48px 0",
            textAlign: "center"
          }}>
            <span className="section-label">Critical Differentiator</span>
            <h3 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: "800", color: "#ffffff", letterSpacing: "-1px", marginBottom: "18px" }}>
              Not a screenshot inside Tableau.
            </h3>
            <p style={{ fontSize: "16px", color: "var(--muted)", maxWidth: "680px", margin: "0 auto 24px", lineHeight: "1.7" }}>
              SnapTab is designed to reconstruct the dashboard structure around your data — not simply place an image on a canvas. The goal is a native Tableau workbook with worksheets, fields, calculations, dashboard zones, and interactive behavior.
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "8px 18px", borderRadius: "var(--radius-full)", background: "rgba(255,255,255,0.06)", border: "1px solid var(--border-soft)", fontSize: "12px", fontFamily: "var(--font-mono)", color: "#e5e5e5" }}>
              <span>Native XML Engine</span>
              <span>•</span>
              <span>Extract Bundling</span>
              <span>•</span>
              <span>.TWBX Package</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
