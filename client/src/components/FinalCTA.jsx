import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FinalCTA({ onStartConverting }) {
  return (
    <section className="section-spacing" style={{ paddingBottom: "140px" }}>
      <div className="container">
        <div className="final-cta-box">
          <span className="section-label">Get Started</span>
          <h2 style={{
            fontSize: "clamp(34px, 5vw, 56px)",
            fontWeight: "800",
            letterSpacing: "-1.5px",
            lineHeight: "1.1",
            color: "#ffffff",
            maxWidth: "720px",
            margin: "0 auto 20px"
          }}>
            Your dashboard is already designed. <br />
            Now make it <span className="serif-italic">interactive</span>.
          </h2>

          <p style={{
            fontSize: "17px",
            color: "var(--muted)",
            maxWidth: "520px",
            margin: "0 auto 36px",
            lineHeight: "1.6"
          }}>
            Upload the visual. Connect the data. Let SnapTab build the workbook.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <button className="btn-liquid-primary" style={{ fontSize: "16px", padding: "14px 34px" }} onClick={onStartConverting}>
              <span>Start Converting</span>
              <ArrowRight size={16} />
            </button>

            <a href="#how-it-works" className="btn-liquid-secondary" style={{ fontSize: "16px", padding: "14px 28px" }}>
              See How It Works →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
