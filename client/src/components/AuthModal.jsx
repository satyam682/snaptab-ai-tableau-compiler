import React, { useState } from "react";
import { 
  X, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  Mail, 
  User, 
  ShieldCheck, 
  AlertCircle,
  Cpu,
  Layers,
  FileCode2
} from "lucide-react";

export default function AuthModal({ isOpen, onClose, initialMode = "login", onLoginSuccess }) {
  const [mode, setMode] = useState(initialMode); // 'login' or 'register'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [registeredName, setRegisteredName] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match. Please re-enter.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Registration successful! Show the requested popup
      setRegisteredName(formData.name);
      setShowSuccessPopup(true);
      setFormData({
        name: "",
        email: formData.email, // keep email for easy login
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      setErrorMessage(err.message || "Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid login credentials");
      }

      // Save token and user in localStorage
      localStorage.setItem("snaptab_token", data.token);
      localStorage.setItem("snaptab_user", JSON.stringify(data.user));

      onLoginSuccess(data.user);
      onClose();
    } catch (err) {
      setErrorMessage(err.message || "Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const handleProceedToLogin = () => {
    setShowSuccessPopup(false);
    setMode("login");
  };

  return (
    <div className="auth-backdrop" onClick={onClose}>
      <div className="split-auth-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="auth-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {/* ================= LEFT SIDE: CINEMATIC INFO SHOWCASE ================= */}
        <div className="auth-left-info">
          <div className="auth-left-glow"></div>
          
          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Brand Header */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
              <div style={{
                width: "30px",
                height: "30px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #ffffff 0%, #666666 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#000",
                fontWeight: "900",
                fontSize: "15px"
              }}>
                S
              </div>
              <span style={{ fontSize: "20px", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.5px" }}>
                SnapTab
              </span>
              <span style={{
                fontSize: "10px",
                fontFamily: "var(--font-mono)",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                padding: "2px 8px",
                borderRadius: "100px",
                color: "#ccc",
                marginLeft: "auto"
              }}>
                v1.0.4 SECURE
              </span>
            </div>

            {/* Headline */}
            <h2 style={{
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: "800",
              color: "#ffffff",
              letterSpacing: "-0.8px",
              lineHeight: "1.2",
              marginBottom: "14px"
            }}>
              Turn dashboard designs <br />
              into <span className="serif-italic">native Tableau.</span>
            </h2>

            <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: "1.6", marginBottom: "32px" }}>
              Access AI-powered visual reverse-engineering, dynamic field mapping, and instant Tableau Packaged Workbook (<code style={{ color: "#fff", fontFamily: "var(--font-mono)", fontSize: "12px" }}>.twbx</code>) exports.
            </p>

            {/* Feature Highlights Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "36px" }}>
              <div className="auth-feature-pill">
                <div className="auth-icon-circle">
                  <Cpu size={14} color="#ffffff" />
                </div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#ffffff" }}>Groq Vision AI Engine</div>
                  <div style={{ fontSize: "11px", color: "var(--muted)" }}>Sub-second visual component extraction from screenshots</div>
                </div>
              </div>

              <div className="auth-feature-pill">
                <div className="auth-icon-circle">
                  <FileCode2 size={14} color="#ffffff" />
                </div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#ffffff" }}>Native Tableau XML Compiler</div>
                  <div style={{ fontSize: "11px", color: "var(--muted)" }}>Zero screenshot tricks. 100% editable Tableau worksheets</div>
                </div>
              </div>

              <div className="auth-feature-pill">
                <div className="auth-icon-circle">
                  <ShieldCheck size={14} color="#ffffff" />
                </div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#ffffff" }}>Private & Ephemeral Storage</div>
                  <div style={{ fontSize: "11px", color: "var(--muted)" }}>Automated 1-hour cleanup and bcrypt salted authentication</div>
                </div>
              </div>
            </div>

            {/* Academic & Defense Badge */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "11px",
              fontFamily: "var(--font-mono)",
              color: "#777"
            }}>
              <span className="status-dot-green"></span>
              <span>Local MongoDB Connected • Port 27017 Active</span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE: MINIMAL GLASS FORM ================= */}
        <div className="auth-right-form">
          {/* Mode Switcher Tabs */}
          <div className="auth-tabs">
            <button 
              className={`auth-tab-btn ${mode === "login" ? "active" : ""}`}
              onClick={() => { setMode("login"); setErrorMessage(""); }}
            >
              Sign In
            </button>
            <button 
              className={`auth-tab-btn ${mode === "register" ? "active" : ""}`}
              onClick={() => { setMode("register"); setErrorMessage(""); }}
            >
              Create Account
            </button>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "22px", fontWeight: "700", color: "#ffffff", marginBottom: "6px" }}>
              {mode === "login" ? "Welcome back" : "Get started with SnapTab"}
            </h3>
            <p style={{ fontSize: "13px", color: "var(--muted)" }}>
              {mode === "login" 
                ? "Enter your credentials to access your conversion studio." 
                : "Create an account to start converting mockups into Tableau."}
            </p>
          </div>

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="auth-error-banner">
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={mode === "login" ? handleLogin : handleRegister}>
            {mode === "register" && (
              <div className="auth-field-group">
                <label className="auth-field-label">Full Name</label>
                <div className="auth-input-wrap">
                  <User size={16} className="auth-input-icon" />
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Shivam Patel" 
                    className="auth-input" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            )}

            <div className="auth-field-group">
              <label className="auth-field-label">Email Address</label>
              <div className="auth-input-wrap">
                <Mail size={16} className="auth-input-icon" />
                <input 
                  type="email" 
                  name="email" 
                  placeholder="name@company.com" 
                  className="auth-input" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="auth-field-group">
              <label className="auth-field-label">Password</label>
              <div className="auth-input-wrap">
                <Lock size={16} className="auth-input-icon" />
                <input 
                  type="password" 
                  name="password" 
                  placeholder="At least 6 characters" 
                  className="auth-input" 
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {mode === "register" && (
              <div className="auth-field-group">
                <label className="auth-field-label">Confirm Password</label>
                <div className="auth-input-wrap">
                  <Lock size={16} className="auth-input-icon" />
                  <input 
                    type="password" 
                    name="confirmPassword" 
                    placeholder="Repeat password" 
                    className="auth-input" 
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            )}

            <button 
              type="submit" 
              className="btn-liquid-primary" 
              style={{ width: "100%", justifyContent: "center", padding: "13px", marginTop: "10px" }}
              disabled={loading}
            >
              <span>{loading ? "Processing..." : mode === "login" ? "Sign In" : "Create Account"}</span>
              <ArrowRight size={15} />
            </button>
          </form>

          {/* Bottom Switch Note */}
          <div style={{ marginTop: "24px", textAlign: "center", fontSize: "12px", color: "var(--muted)" }}>
            {mode === "login" ? (
              <span>
                Don't have an account yet?{" "}
                <button 
                  type="button" 
                  className="auth-link-text"
                  onClick={() => { setMode("register"); setErrorMessage(""); }}
                >
                  Create one now
                </button>
              </span>
            ) : (
              <span>
                Already registered?{" "}
                <button 
                  type="button" 
                  className="auth-link-text"
                  onClick={() => { setMode("login"); setErrorMessage(""); }}
                >
                  Sign in here
                </button>
              </span>
            )}
          </div>
        </div>

        {/* ================= CELEBRATORY SUCCESS POPUP ================= */}
        {showSuccessPopup && (
          <div className="auth-popup-overlay">
            <div className="auth-popup-card">
              <div className="auth-popup-icon-ring">
                <Sparkles size={28} color="#ffffff" />
              </div>

              <span className="section-label" style={{ marginBottom: "8px" }}>REGISTRATION SUCCESSFUL</span>
              
              <h3 style={{
                fontSize: "24px",
                fontWeight: "800",
                color: "#ffffff",
                letterSpacing: "-0.5px",
                marginBottom: "12px"
              }}>
                You are now user of SnapTab
              </h3>

              <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: "1.6", marginBottom: "26px" }}>
                Welcome, <strong style={{ color: "#ffffff" }}>{registeredName}</strong>! Your account has been securely saved to our MongoDB database with salted encryption. Please proceed to sign in with your credentials to verify your session.
              </p>

              <button 
                className="btn-liquid-primary" 
                style={{ width: "100%", justifyContent: "center", padding: "12px" }}
                onClick={handleProceedToLogin}
              >
                <span>Proceed to Sign In</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
