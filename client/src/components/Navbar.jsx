import React from "react";
import { ArrowRight, User as UserIcon, LogOut, Sparkles } from "lucide-react";

export default function Navbar({ onStartConverting, user, onOpenAuth, onLogout, onOpenDashboard, onOpenChatDashboard }) {
  return (
    <header className="nav-wrapper">
      <div className="nav-pill">
        {/* Brand */}
        <a href="#" className="nav-brand">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#171717" stroke="rgba(255,255,255,0.2)" />
            <path d="M8 10L16 22L24 10" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>SnapTab</span>
        </a>

        {/* Center Links (Desktop) */}
        <nav className="nav-links hide-mobile" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <a href="#product" className="nav-link">Product</a>
          <div 
            onClick={user ? onOpenChatDashboard : () => onOpenAuth("login")}
            className="nav-link"
            style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap" }}
          >
            <Sparkles size={13} color="#60a5fa" />
            <span>Chat Dashboard</span>
            <span style={{
              fontSize: "9px",
              background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              color: "#fff",
              padding: "1px 5px",
              borderRadius: "8px",
              fontWeight: "700",
              whiteSpace: "nowrap"
            }}>
              AI NEW
            </span>
          </div>
          <a href="#how-it-works" className="nav-link" style={{ whiteSpace: "nowrap" }}>How It Works</a>
          <a href="#technology" className="nav-link" style={{ whiteSpace: "nowrap" }}>Technology</a>
          <a href="#faq" className="nav-link" style={{ whiteSpace: "nowrap" }}>FAQ</a>
        </nav>

        {/* Auth & CTA Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
          {user ? (
            /* Logged In State */
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
              <div 
                onClick={onOpenDashboard}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  padding: "6px 14px",
                  borderRadius: "var(--radius-full)",
                  fontSize: "12px",
                  fontFamily: "var(--font-mono)",
                  color: "#ffffff",
                  cursor: "pointer",
                  whiteSpace: "nowrap"
                }}
                title="Go to Conversion Studio Dashboard"
              >
                <div style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: "#ffffff",
                  color: "#000000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "700",
                  fontSize: "11px"
                }}>
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <span>{user.name}</span>
              </div>

              <button 
                className="btn-liquid-primary" 
                style={{ padding: "8px 16px", fontSize: "13px", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "6px" }}
                onClick={onOpenDashboard}
                title="Open Visual Mockup Studio"
              >
                <span>Vision Studio</span>
                <ArrowRight size={13} />
              </button>

              <button 
                className="btn-liquid-secondary" 
                style={{
                  padding: "8px 16px",
                  fontSize: "13px",
                  borderColor: "rgba(59,130,246,0.5)",
                  background: "rgba(59,130,246,0.12)",
                  color: "#93c5fd",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  whiteSpace: "nowrap"
                }}
                onClick={onOpenChatDashboard}
                title="Open Conversational Chat Dashboard"
              >
                <Sparkles size={13} color="#60a5fa" />
                <span>Chat BI</span>
              </button>

              <button 
                className="btn-liquid-secondary" 
                style={{ padding: "8px 14px", fontSize: "12px", gap: "6px", whiteSpace: "nowrap", display: "flex", alignItems: "center" }}
                onClick={onLogout}
                title="Sign out of your account"
              >
                <LogOut size={13} />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            /* Guest / Logged Out State */
            <>
              <button 
                className="btn-liquid-secondary" 
                style={{ padding: "8px 16px", fontSize: "13px" }}
                onClick={() => onOpenAuth("login")}
              >
                Sign In
              </button>

              <button className="btn-liquid-primary" onClick={onStartConverting}>
                <span>Start Converting</span>
                <ArrowRight size={14} />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
