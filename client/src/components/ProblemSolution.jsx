import React from "react";
import { ArrowDown, Check, Clock, Zap } from "lucide-react";

export default function ProblemSolution() {
  const oldSteps = [
    "Receive static dashboard screenshot",
    "Manually inspect every visual & mark",
    "Trace and identify dimensions & measures",
    "Recreate each worksheet from scratch",
    "Drag fields to Rows, Columns & Shelves",
    "Rebuild floating/tiled layout containers",
    "Fix padding, fonts, and borders",
    "Hours of tedious, repetitive manual labor"
  ];

  const newSteps = [
    { label: "Dashboard Screenshot / HTML + CSV", detail: "Dual input ingested in seconds" },
    { label: "Vision AI Analysis", detail: "Detects charts, KPIs, titles & layout" },
    { label: "Semantic Schema Mapping", detail: "Correlates visual cues with data columns" },
    { label: "Tableau XML Synthesis", detail: "Generates native worksheets & zones" },
    { label: "Packaged .TWBX Output", detail: "Ready to double-click and open in Tableau" }
  ];

  return (
    <section className="section-spacing" style={{ borderTop: "1px solid var(--border-soft)", background: "#030303" }}>
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 48px" }}>
          <span className="section-label">The Workflow Shift</span>
          <h2 className="section-title">
            Stop rebuilding dashboards <span className="serif-italic">by hand</span>.
          </h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            Clients send screenshots. Designers send static mockups. You shouldn't have to spend hours rebuilding every chart in Tableau.
          </p>
        </div>

        {/* Time Comparison Banner (Section 13) */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
          maxWidth: "800px",
          margin: "0 auto 48px",
          background: "#080808",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)",
          padding: "24px 32px"
        }}>
          <div>
            <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--muted)" }}>
              MANUAL WORKFLOW
            </div>
            <div style={{ fontSize: "36px", fontWeight: "700", color: "#888888", margin: "6px 0" }}>
              8–24 hours
            </div>
            <div style={{ fontSize: "13px", color: "var(--muted)" }}>
              Manual time to first draft
            </div>
          </div>

          <div style={{ borderLeft: "1px solid var(--border-soft)", paddingLeft: "32px" }}>
            <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "#ffffff" }}>
              SNAPTAB AUTOMATION
            </div>
            <div style={{ fontSize: "36px", fontWeight: "700", color: "#ffffff", margin: "6px 0" }}>
              &lt; 30 seconds
            </div>
            <div style={{ fontSize: "13px", color: "var(--stat)" }}>
              Target time to first draft
            </div>
          </div>
        </div>

        {/* Two Columns: The Old Way vs SnapTab (Section 12) */}
        <div className="problem-solution-grid">
          {/* Left: The Old Way */}
          <div className="comparison-box-old">
            <div style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "#666", marginBottom: "20px" }}>
              THE OLD WAY — MANUAL RECREATION
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {oldSteps.map((step, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "14px" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#444" }}>0{idx + 1}</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "28px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: "12px", color: "#666" }}>
              Result: High turnaround time and tedious shelf dragging.
            </div>
          </div>

          {/* Right: SnapTab */}
          <div className="comparison-box-new">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <span style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "#fff" }}>
                SNAPTAB — AI WORKBOOK PIPELINE
              </span>
              <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", background: "rgba(255,255,255,0.1)", padding: "2px 8px", borderRadius: "4px" }}>
                Automated
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {newSteps.map((step, idx) => (
                <div key={idx} style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "6px",
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: "600", color: "#ffffff" }}>{step.label}</div>
                    <div style={{ fontSize: "12px", color: "var(--muted)" }}>{step.detail}</div>
                  </div>
                  <Check size={16} color="#ffffff" />
                </div>
              ))}
            </div>

            <div style={{ marginTop: "28px", paddingTop: "16px", borderTop: "1px solid var(--border-soft)", fontSize: "13px", color: "#e6e6e6", display: "flex", alignItems: "center", gap: "8px" }}>
              <Zap size={14} color="#ffffff" />
              <span>Result: Working .twbx workbook in minutes instead of hours.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
