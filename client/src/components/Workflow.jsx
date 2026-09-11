import React from "react";
import { Upload, Cpu, Sliders, Download } from "lucide-react";

export default function Workflow() {
  const steps = [
    {
      num: "01",
      title: "Upload",
      desc: "Provide your dashboard visual (PNG, JPG, or HTML) along with your underlying CSV or XLSX dataset.",
      icon: <Upload size={18} color="#ffffff" />
    },
    {
      num: "02",
      title: "Analyze",
      desc: "Vision AI detects dashboard components (KPIs, bars, lines, tables) and understands visual structure.",
      icon: <Cpu size={18} color="#ffffff" />
    },
    {
      num: "03",
      title: "Map",
      desc: "Review and adjust AI-generated dimension, measure, and aggregation mappings in a structured preview.",
      icon: <Sliders size={18} color="#ffffff" />
    },
    {
      num: "04",
      title: "Export",
      desc: "Generate and download your native .twbx packaged workbook containing native worksheets and data extracts.",
      icon: <Download size={18} color="#ffffff" />
    }
  ];

  return (
    <section id="how-it-works" className="section-spacing" style={{ background: "#050505" }}>
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 48px" }}>
          <span className="section-label">Process Architecture</span>
          <h2 className="section-title">
            How it works in <span className="serif-italic">four stages</span>.
          </h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            A deterministic pipeline from visual mockups to native Tableau packaged workbooks.
          </p>
        </div>

        <div className="workflow-grid">
          {steps.map((step, idx) => (
            <div key={idx} className="workflow-card">
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <span className="workflow-num">STAGE // {step.num}</span>
                  {step.icon}
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#ffffff", marginBottom: "10px" }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: "1.6" }}>
                  {step.desc}
                </p>
              </div>

              <div style={{ marginTop: "24px", paddingTop: "12px", borderTop: "1px solid var(--border-soft)", fontSize: "11px", fontFamily: "var(--font-mono)", color: "#666" }}>
                PIPELINE STEP {step.num}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
