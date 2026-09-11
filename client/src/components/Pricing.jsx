import React from "react";
import { Check, ArrowRight } from "lucide-react";

export default function Pricing({ onStartConverting }) {
  const plans = [
    {
      name: "Community",
      price: "Free",
      period: "forever",
      desc: "For testing and student projects.",
      features: [
        "5 conversions per month",
        "Standard chart detection",
        "Native .TWB XML preview",
        "Community support"
      ],
      highlight: false,
      btn: "Get Started Free"
    },
    {
      name: "Pro",
      price: "$29",
      period: "/ month",
      desc: "For analysts and independent BI consultants.",
      features: [
        "Unlimited conversions",
        "Full .TWBX packaging & extract bundling",
        "Sub-30 second Groq LPU inference",
        "Custom field mapping overrides",
        "Direct email support"
      ],
      highlight: true,
      badge: "Most Popular",
      btn: "Start Pro Plan"
    },
    {
      name: "Enterprise Agency",
      price: "$199",
      period: "/ month",
      desc: "For consulting teams migrating client dashboards.",
      features: [
        "Everything in Pro",
        "Shared team workspace & audit logs",
        "Batch migration CLI access",
        "Custom XML template schemas",
        "Priority engineering support"
      ],
      highlight: false,
      btn: "Contact Agency Sales"
    }
  ];

  return (
    <section id="pricing" className="section-spacing">
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 48px" }}>
          <span className="section-label">Straightforward Pricing</span>
          <h2 className="section-title">
            Simple tiers for <span className="serif-italic">every team</span>.
          </h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            Start for free to test the reconstruction pipeline. Upgrade as your migration volume expands.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px"
        }}>
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              style={{
                background: plan.highlight ? "linear-gradient(180deg, #111111 0%, #070707 100%)" : "#080808",
                border: "1px solid",
                borderColor: plan.highlight ? "rgba(255, 255, 255, 0.35)" : "var(--border-soft)",
                borderRadius: "var(--radius-md)",
                padding: "32px 26px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                boxShadow: plan.highlight ? "0 10px 40px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.2)" : "none"
              }}
            >
              {plan.badge && (
                <div style={{
                  position: "absolute",
                  top: "-11px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#ffffff",
                  color: "#000",
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  fontWeight: "700",
                  padding: "2px 10px",
                  borderRadius: "var(--radius-full)",
                  textTransform: "uppercase"
                }}>
                  {plan.badge}
                </div>
              )}

              <div>
                <div style={{ fontSize: "17px", fontWeight: "700", color: "#ffffff" }}>{plan.name}</div>
                <div style={{ fontSize: "13px", color: "var(--muted)", margin: "4px 0 16px" }}>{plan.desc}</div>

                <div style={{ fontSize: "36px", fontWeight: "700", color: "#ffffff", marginBottom: "20px" }}>
                  {plan.price}
                  <span style={{ fontSize: "14px", fontWeight: "400", color: "var(--muted)" }}>{plan.period}</span>
                </div>

                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {plan.features.map((feat, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "var(--stat)" }}>
                      <Check size={14} color="#fff" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: "32px" }}>
                <button 
                  className={plan.highlight ? "btn-liquid-primary" : "btn-liquid-secondary"}
                  style={{ width: "100%", justifyContent: "center" }}
                  onClick={onStartConverting}
                >
                  <span>{plan.btn}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
