import React from "react";
import { ArrowDown, Shield, FileCheck, Database, Cpu, Terminal } from "lucide-react";

export default function TechnicalTrust() {
  const stats = [
    { value: "< 30 sec", label: "Target first draft" },
    { value: "5+", label: "Core visual types" },
    { value: "2", label: "Input categories (Visual + Data)" },
    { value: "1", label: "Native .twbx packaged output" }
  ];

  const securitySpecs = [
    "Image payload limit: 10MB maximum",
    "Dataset CSV/XLSX limit: 50MB streaming",
    "Strict MIME-type & magic-number inspection",
    "Cryptographic UUID generation for scratch files",
    "Automated one-hour transient file cleanup"
  ];

  return (
    <section id="technology" className="section-spacing" style={{ background: "#040404", borderTop: "1px solid var(--border-soft)" }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 48px" }}>
          <span className="section-label">Technical Architecture</span>
          <h2 className="section-title">
            Built as a pipeline, <span className="serif-italic">not a prompt</span>.
          </h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            SnapTab decomposes dashboard understanding into deterministic, verifiable software modules.
          </p>
        </div>

        {/* Section 24: Defensible Statistics */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginBottom: "64px"
        }}>
          {stats.map((stat, idx) => (
            <div key={idx} style={{
              background: "#080808",
              border: "1px solid var(--border-soft)",
              borderRadius: "var(--radius-md)",
              padding: "24px 20px",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "32px", fontWeight: "700", color: "#ffffff", marginBottom: "4px" }}>
                {stat.value}
              </div>
              <div style={{ fontSize: "12px", color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Architecture Grid (Section 19 & 20) */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "40px",
          alignItems: "stretch"
        }}>
          {/* Left: Section 19 Architecture Diagram */}
          <div style={{
            background: "#080808",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            padding: "32px"
          }}>
            <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--muted)", marginBottom: "20px" }}>
              SYSTEM ARCHITECTURE // REVERSE-ENGINEERED TABLEAU FLOW
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
              <div style={{ width: "100%", background: "#101010", border: "1px solid var(--border-soft)", borderRadius: "6px", padding: "14px 20px" }}>
                <div style={{ fontSize: "11px", color: "#888", fontFamily: "var(--font-mono)" }}>01 USER INGESTION</div>
                <div style={{ fontSize: "14px", fontWeight: "600", color: "#fff" }}>Dashboard Visual (PNG/JPG/HTML) + Dataset (CSV/XLSX)</div>
              </div>

              <ArrowDown size={16} color="#666" />

              <div style={{ width: "100%", background: "#101010", border: "1px solid var(--border-soft)", borderRadius: "6px", padding: "14px 20px" }}>
                <div style={{ fontSize: "11px", color: "#888", fontFamily: "var(--font-mono)" }}>02 SNAPTAB AI ENGINE</div>
                <div style={{ fontSize: "14px", fontWeight: "600", color: "#fff" }}>Vision AI Component Analysis & Semantic Field Mapping</div>
              </div>

              <ArrowDown size={16} color="#666" />

              <div style={{ width: "100%", background: "#101010", border: "1px solid var(--border-soft)", borderRadius: "6px", padding: "14px 20px" }}>
                <div style={{ fontSize: "11px", color: "#888", fontFamily: "var(--font-mono)" }}>03 TABLEAU COMPILATION ENGINE</div>
                <div style={{ fontSize: "14px", fontWeight: "600", color: "#fff" }}>XMLBuilder2 Schema Synthesis & Archiver PKZIP Bundling</div>
              </div>

              <ArrowDown size={16} color="#666" />

              <div style={{ width: "100%", background: "#151515", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "6px", padding: "14px 20px" }}>
                <div style={{ fontSize: "11px", color: "#aaa", fontFamily: "var(--font-mono)" }}>04 OUTPUT DELIVERABLE</div>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "#fff" }}>dashboard.twbx (Native Tableau Packaged Workbook)</div>
              </div>
            </div>

            <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid var(--border-soft)", fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--muted)" }}>
              Tech stack: React • Node.js • Express • MongoDB • Groq Vision • Tableau XML
            </div>
          </div>

          {/* Right: Section 20 & 21 Inputs, Outputs & Security */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Input / Output Matrix (Section 20) */}
            <div style={{ background: "#080808", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "24px" }}>
              <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--muted)", marginBottom: "12px" }}>
                SUPPORTED FORMATS
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <div style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>INPUTS:</div>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {["PNG", "JPG", "HTML", "CSV", "XLSX"].map((ext, i) => (
                      <span key={i} style={{ fontFamily: "var(--font-mono)", fontSize: "11px", background: "#141414", border: "1px solid var(--border-soft)", padding: "2px 8px", borderRadius: "3px" }}>
                        {ext}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>OUTPUT:</div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", background: "#ffffff", color: "#000", fontWeight: "700", padding: "3px 10px", borderRadius: "4px" }}>
                    .TWBX / .TWB
                  </span>
                </div>
              </div>
            </div>

            {/* Security & Sanitation Specs (Section 21) */}
            <div style={{ background: "#080808", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "24px", flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--muted)", marginBottom: "14px" }}>
                <Shield size={14} color="#aaa" />
                <span>DATA HANDLING SPECIFICATIONS</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px", color: "var(--muted)" }}>
                {securitySpecs.map((spec, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#666" }}></div>
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
