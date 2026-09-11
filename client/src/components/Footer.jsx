import React, { useState } from "react";
import { ArrowRight, Sparkles, Send } from "lucide-react";

export default function Footer({ onStartConverting }) {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const videoUrl = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4";

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail("");
    }
  };

  return (
    <footer className="premium-footer">
      {/* Ambient Looping Video in Footer Background */}
      <div className="footer-ambient-video-wrap">
        <video 
          className="footer-ambient-video" 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="auto"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        <div className="footer-ambient-overlay"></div>
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* 4-Column Directory Grid */}
        <div className="footer-main-grid">
          {/* Col 1: Identity & Status */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <div style={{
                width: "24px",
                height: "24px",
                borderRadius: "6px",
                background: "linear-gradient(135deg, #ffffff 0%, #777777 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#000",
                fontWeight: "900",
                fontSize: "13px"
              }}>
                S
              </div>
              <span style={{ fontSize: "18px", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.5px" }}>
                SnapTab
              </span>
            </div>

            <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: "1.6", marginBottom: "18px" }}>
              AI-powered dashboard reconstruction platform. Direct-to-Tableau open XML compiler with native PKZIP (<code style={{ color: "#eee", fontFamily: "var(--font-mono)", fontSize: "11px" }}>.twbx</code>) packaging.
            </p>

            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "5px 10px",
              borderRadius: "4px",
              fontSize: "11px",
              fontFamily: "var(--font-mono)",
              color: "#aaa",
              marginBottom: "20px"
            }}>
              <span className="status-dot-green"></span>
              <span>Groq LPU Active • XML 2024.x Online</span>
            </div>

            {/* Newsletter Subscription */}
            <div>
              <div style={{ fontSize: "11px", color: "#888", fontFamily: "var(--font-mono)", marginBottom: "6px" }}>
                RELEASE UPDATES (v1.1 ROADMAP)
              </div>
              <form onSubmit={handleSubscribe} className="footer-newsletter-box">
                <input 
                  type="email" 
                  placeholder="Enter developer email..." 
                  className="footer-newsletter-input" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn-liquid-primary" style={{ padding: "6px 14px", fontSize: "12px" }}>
                  {subscribed ? "Subscribed!" : <Send size={12} />}
                </button>
              </form>
            </div>
          </div>

          {/* Col 2: Platform & Engine */}
          <div>
            <div className="footer-col-title">Platform & Engine</div>
            <ul className="footer-links-list">
              <li><a href="#product" className="footer-link-item">Vision AI Parser (Groq 11B)</a></li>
              <li><a href="#product" className="footer-link-item">Semantic Field Mapper</a></li>
              <li><a href="#technology" className="footer-link-item">Tableau XML 2024.x Generator</a></li>
              <li><a href="#technology" className="footer-link-item">.TWBX Package Archiver</a></li>
              <li><a href="#demo" className="footer-link-item">Interactive Conversion Studio</a></li>
              <li><a href="#how-it-works" className="footer-link-item">5-Step Compilation Pipeline</a></li>
              <li><a href="#pricing" className="footer-link-item">Commercial & Academic Tiers</a></li>
            </ul>
          </div>

          {/* Col 3: Supported Visuals */}
          <div>
            <div className="footer-col-title">Supported Visuals</div>
            <ul className="footer-links-list">
              <li><span className="footer-link-item">Executive KPI Summary Cards</span></li>
              <li><span className="footer-link-item">Grouped & Horizontal Bar Charts</span></li>
              <li><span className="footer-link-item">Continuous Line & Trend Charts</span></li>
              <li><span className="footer-link-item">Donut & Multi-segment Pie Charts</span></li>
              <li><span className="footer-link-item">Dual-Axis Measures</span></li>
              <li><span className="footer-link-item">Structured Cross-tab Tables</span></li>
              <li><span className="footer-link-item">Color Palettes & Formats</span></li>
            </ul>
          </div>

          {/* Col 4: Trust & Academic Defense */}
          <div>
            <div className="footer-col-title">Trust & Architecture</div>
            <ul className="footer-links-list">
              <li><a href="#technology" className="footer-link-item">Zero Tableau Desktop Required</a></li>
              <li><a href="#technology" className="footer-link-item">1-Hour Ephemeral Storage</a></li>
              <li><a href="#technology" className="footer-link-item">Client-Side Sanitization</a></li>
              <li><a href="#technology" className="footer-link-item">14,400 Free Daily LPU Requests</a></li>
              <li><a href="#faq" className="footer-link-item">Open XML Spec Compliance</a></li>
              <li><a href="#faq" className="footer-link-item">College Defense Documentation</a></li>
              <li><a href="#faq" className="footer-link-item">Frequently Asked Questions</a></li>
            </ul>
          </div>
        </div>

        {/* Ambient Giant Brand Watermark */}
        <div className="footer-giant-watermark">
          SNAPTAB
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>
            &copy; {new Date().getFullYear()} SnapTab Platform. Built with React, Groq Vision & Open XML.
          </div>

          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <span style={{ color: "#777" }}>Tableau is a registered trademark of Salesforce, Inc. SnapTab is an independent software tool.</span>
          </div>

          <div style={{ display: "flex", gap: "16px" }}>
            <a href="#privacy" style={{ color: "#888", textDecoration: "none" }}>Privacy</a>
            <span>•</span>
            <a href="#terms" style={{ color: "#888", textDecoration: "none" }}>Terms</a>
            <span>•</span>
            <a href="#security" style={{ color: "#888", textDecoration: "none" }}>Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

