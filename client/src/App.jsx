import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProblemSolution from "./components/ProblemSolution";
import FeatureSection from "./components/FeatureSection";
import Workflow from "./components/Workflow";
import ConversionDemo from "./components/ConversionDemo";
import TechnicalTrust from "./components/TechnicalTrust";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import Dashboard from "./components/Dashboard";
import ChatDashboard from "./components/ChatDashboard";

export default function App() {
  const [user, setUser] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // 'login' or 'register'
  const [view, setView] = useState("landing"); // 'landing', 'dashboard', or 'chat'

  // Load persistent user session from localStorage on initial mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("snaptab_user");
      const storedToken = localStorage.getItem("snaptab_token");
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error("Failed to restore session", e);
    }
  }, []);

  const handleOpenAuth = (mode = "login") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleCloseAuth = () => {
    setAuthModalOpen(false);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setView("dashboard"); // Auto-redirect to main dashboard upon login!
  };

  const handleLogout = () => {
    localStorage.removeItem("snaptab_token");
    localStorage.removeItem("snaptab_user");
    setUser(null);
    setView("landing");
  };

  const scrollToDemo = () => {
    if (user) {
      setView("dashboard");
      return;
    }
    const el = document.getElementById("demo");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (view === "dashboard") {
    return (
      <Dashboard 
        user={user} 
        onLogout={handleLogout} 
        onBackToLanding={() => setView("landing")} 
        onSwitchToChat={() => setView("chat")}
      />
    );
  }

  if (view === "chat") {
    return (
      <ChatDashboard 
        user={user} 
        onLogout={handleLogout} 
        onBackToLanding={() => setView("landing")} 
        onSwitchToVisionStudio={() => setView("dashboard")}
      />
    );
  }

  return (
    <div style={{ background: "#000000", minHeight: "100vh", position: "relative" }}>
      {/* Subtle Grain Overlay */}
      <div className="grain-overlay" />

      {/* 1. Liquid-metal Navigation with User State */}
      <Navbar 
        onStartConverting={scrollToDemo} 
        user={user}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onOpenDashboard={() => setView("dashboard")}
        onOpenChatDashboard={() => setView("chat")}
      />

      {/* 2. Hero Section with Integrated Product Visual */}
      <Hero onStartConverting={scrollToDemo} />

      {/* 3. Problem -> Solution Section & Time-Saving Metrics */}
      <ProblemSolution />

      {/* 4. Core Features & "Not a Screenshot" Differentiator */}
      <FeatureSection />

      {/* 5. 4-Stage Workflow */}
      <Workflow />

      {/* 6. Interactive Product Demo (Section 16, 46, 47) */}
      <ConversionDemo user={user} onOpenAuth={handleOpenAuth} />

      {/* 7. Technical Trust & Architecture Diagram */}
      <TechnicalTrust />

      {/* 8. Compact Pricing Section */}
      <Pricing onStartConverting={scrollToDemo} />

      {/* 9. FAQ Section */}
      <FAQ />

      {/* 10. Final CTA */}
      <FinalCTA onStartConverting={scrollToDemo} />

      {/* 11. Ultra-Premium Footer with Ambient Video Background */}
      <Footer onStartConverting={scrollToDemo} />

      {/* Split-Screen Authentication Modal */}
      <AuthModal 
        isOpen={authModalOpen}
        onClose={handleCloseAuth}
        initialMode={authMode}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
