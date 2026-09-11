import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "What does SnapTab convert?",
      a: "SnapTab is designed to convert dashboard screenshots or HTML representations together with CSV/XLSX data into a native Tableau packaged workbook."
    },
    {
      q: "Is the output just an image?",
      a: "No. The intended output is a Tableau workbook structure rather than simply embedding the source screenshot."
    },
    {
      q: "What files can I upload?",
      a: "Dashboard visual: PNG, JPG, or HTML. Dataset: CSV or XLSX tabular data."
    },
    {
      q: "Can I review AI mappings?",
      a: "Yes. The intended workflow includes a mapping-review stage where detected components and dataset mappings can be inspected and adjusted."
    },
    {
      q: "What is the final output?",
      a: "A .twbx Tableau packaged workbook containing the generated workbook structure and associated dataset."
    },
    {
      q: "Which charts are supported?",
      a: "The initial specification covers KPI cards, bar charts, line charts, donut charts, and tables."
    }
  ];

  return (
    <section id="faq" className="section-spacing" style={{ background: "#030303", borderTop: "1px solid var(--border-soft)" }}>
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 40px" }}>
          <span className="section-label">Common Questions</span>
          <h2 className="section-title">
            Frequently asked <span className="serif-italic">questions</span>.
          </h2>
        </div>

        <div className="faq-accordion">
          {faqs.map((faq, idx) => (
            <div key={idx} className="faq-row">
              <button 
                className="faq-btn" 
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                aria-expanded={openIdx === idx}
              >
                <span>{faq.q}</span>
                <ChevronDown 
                  size={16} 
                  style={{ 
                    transform: openIdx === idx ? "rotate(180deg)" : "rotate(0)", 
                    transition: "transform 0.2s",
                    color: "var(--muted)",
                    flexShrink: 0
                  }} 
                />
              </button>
              {openIdx === idx && (
                <div className="faq-answer">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
