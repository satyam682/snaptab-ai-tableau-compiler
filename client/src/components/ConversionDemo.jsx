import React, { useState, useEffect, useRef } from "react";
import { Upload, FileSpreadsheet, Sparkles, Check, Download, FileCode2, ArrowRight, RefreshCw, Layers } from "lucide-react";
import { SAMPLES } from "../data/sampleData";

export default function ConversionDemo() {
  const [selectedSample, setSelectedSample] = useState(SAMPLES[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stepIndex, setStepIndex] = useState(0); // 0 to 4 during processing
  const [isCompleted, setIsCompleted] = useState(false);
  const [customFile, setCustomFile] = useState(null);
  const [customCsv, setCustomCsv] = useState(null);
  const fileInputRef = useRef(null);
  const csvInputRef = useRef(null);

  // Global Ctrl + V paste listener
  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const blob = items[i].getAsFile();
          setCustomFile({
            name: `pasted_dashboard_${Date.now()}.png`,
            preview: URL.createObjectURL(blob)
          });
          setIsCompleted(false);
          break;
        }
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  const handleStartGeneration = () => {
    setIsProcessing(true);
    setStepIndex(0);

    const interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev >= 4) {
          clearInterval(interval);
          setIsProcessing(false);
          setIsCompleted(true);
          return 4;
        }
        return prev + 1;
      });
    }, 400);
  };

  const handleDownloadTwb = () => {
    const xmlContent = `<?xml version='1.0' encoding='utf-8' ?>
<workbook source-build='2024.1.0' version='18.1' xmlns:user='http://www.tableausoftware.com/xml/user'>
  <datasources>
    <datasource caption='${customCsv ? customCsv.name : selectedSample.datasetName}' inline='true' name='federated.datasource' version='18.1'>
      <connection class='federated'>
        <named-connections>
          <named-connection caption='dataset' name='textscan.connection'>
            <connection class='textscan' directory='Data' filename='${customCsv ? customCsv.name : selectedSample.datasetName}' />
          </named-connection>
        </named-connections>
      </connection>
    </datasource>
  </datasources>
  <worksheets>
${selectedSample.detectedComponents.map(c => `    <worksheet name='${c.title}'>
      <table>
        <rows>[federated.datasource].[none:${c.dim || "Category"}:nk]</rows>
        <cols>[federated.datasource].[sum:${c.field || c.measure || "Sales"}:qk]</cols>
      </table>
    </worksheet>`).join('\n')}
  </worksheets>
  <dashboards>
    <dashboard name='SnapTab_Reconstructed_Dashboard'>
      <size maxheight='800' maxwidth='1200' minheight='800' minwidth='1200' type='fixed' />
    </dashboard>
  </dashboards>
</workbook>`;

    const blob = new Blob([xmlContent], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedSample.name.replace(/\s+/g, '_')}.twb`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadTwbx = () => {
    handleDownloadTwb();
  };

  return (
    <section id="demo" className="section-spacing">
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 40px" }}>
          <span className="section-label">Interactive Product Preview</span>
          <h2 className="section-title">
            See the pipeline in <span className="serif-italic">action</span>.
          </h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            Test with our sample dataset or attach your own visual reference and CSV.
          </p>
        </div>

        {/* Studio Box */}
        <div className="studio-box">
          {/* Top Bar with Samples Picker & Paste badge */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "24px",
            borderBottom: "1px solid var(--border-soft)",
            marginBottom: "28px",
            flexWrap: "wrap",
            gap: "16px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--muted)" }}>
                SELECT SAMPLE:
              </span>
              {SAMPLES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => { setSelectedSample(sample); setCustomFile(null); setIsCompleted(false); }}
                  style={{
                    background: selectedSample.id === sample.id && !customFile ? "#222222" : "transparent",
                    color: selectedSample.id === sample.id && !customFile ? "#ffffff" : "var(--muted)",
                    border: "1px solid",
                    borderColor: selectedSample.id === sample.id && !customFile ? "rgba(255,255,255,0.3)" : "var(--border-soft)",
                    borderRadius: "4px",
                    padding: "4px 12px",
                    fontSize: "12px",
                    cursor: "pointer",
                    fontFamily: "var(--font-mono)"
                  }}
                >
                  {sample.name}
                </button>
              ))}
            </div>

            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--muted)",
              background: "#111",
              padding: "4px 10px",
              borderRadius: "4px",
              border: "1px solid var(--border-soft)"
            }}>
              <span>Or paste image:</span>
              <kbd style={{ background: "#222", padding: "1px 5px", borderRadius: "3px", color: "#fff" }}>Ctrl + V</kbd>
            </div>
          </div>

          {/* 3-Column Demo Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "32px"
          }}>
            {/* Left Column: Upload Reference & Bounding Box Overlays */}
            <div>
              <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--muted)", marginBottom: "12px" }}>
                STAGE 1: INPUT VISUAL & DATASET
              </div>

              <div style={{
                background: "#050505",
                border: "1px solid var(--border-soft)",
                borderRadius: "var(--radius-md)",
                padding: "20px",
                marginBottom: "16px"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                  <span style={{ fontSize: "14px", fontWeight: "600", color: "#fff" }}>
                    {customFile ? customFile.name : selectedSample.filename}
                  </span>
                  <span style={{ fontSize: "10px", fontFamily: "var(--font-mono)", background: "#1a1a1a", padding: "2px 6px", borderRadius: "3px", color: "#888" }}>
                    {selectedSample.detectedComponents.length} Visuals Found
                  </span>
                </div>

                {/* Visual Representation with Bounding Boxes */}
                <div style={{
                  border: "1px dashed rgba(255,255,255,0.12)",
                  borderRadius: "6px",
                  padding: "16px",
                  background: "#080808",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px"
                }}>
                  {selectedSample.detectedComponents.map((comp) => (
                    <div key={comp.id} style={{
                      background: "#101010",
                      border: "1px solid rgba(255,255,255,0.18)",
                      borderRadius: "4px",
                      padding: "10px 12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}>
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: "600", color: "#eee" }}>{comp.title}</div>
                        <div style={{ fontSize: "11px", color: "#777", fontFamily: "var(--font-mono)" }}>
                          Mapped: {comp.field || comp.measure} ({comp.agg})
                        </div>
                      </div>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#aaa", background: "#1c1c1c", padding: "2px 6px", borderRadius: "3px" }}>
                        {comp.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              {!isCompleted && !isProcessing && (
                <button 
                  className="btn-liquid-primary" 
                  style={{ width: "100%", justifyContent: "center", padding: "14px" }}
                  onClick={handleStartGeneration}
                >
                  <Sparkles size={16} />
                  <span>Generate Tableau Workbook</span>
                </button>
              )}
            </div>

            {/* Right Column: AI Pipeline Execution or Completed Ready Output */}
            <div>
              <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--muted)", marginBottom: "12px" }}>
                STAGE 2: TECHNICAL PIPELINE STATUS
              </div>

              <div style={{
                background: "#050505",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                padding: "24px",
                minHeight: "340px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}>
                <div>
                  <div style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--muted)", marginBottom: "18px" }}>
                    SNAPTAB AI COMPILATION LOG
                  </div>

                  {/* Section 47 Status List */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontFamily: "var(--font-mono)", fontSize: "13px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", color: stepIndex >= 0 ? "#ffffff" : "#444" }}>
                      <span>1. Analyzing visual structure</span>
                      <span>{stepIndex >= 1 ? "✓" : stepIndex === 0 && isProcessing ? "•" : "—"}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: stepIndex >= 1 ? "#ffffff" : "#444" }}>
                      <span>2. Inspecting dataset schema</span>
                      <span>{stepIndex >= 2 ? "✓" : stepIndex === 1 && isProcessing ? "•" : "—"}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: stepIndex >= 2 ? "#ffffff" : "#444" }}>
                      <span>3. Mapping dimensions & measures</span>
                      <span>{stepIndex >= 3 ? "✓" : stepIndex === 2 && isProcessing ? "•" : "—"}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: stepIndex >= 3 ? "#ffffff" : "#444" }}>
                      <span>4. Constructing Tableau workbook XML</span>
                      <span>{stepIndex >= 4 ? "✓" : stepIndex === 3 && isProcessing ? "•" : "—"}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: stepIndex >= 4 ? "#ffffff" : "#444" }}>
                      <span>5. Packaging .twbx archive</span>
                      <span>{isCompleted ? "✓" : stepIndex === 4 && isProcessing ? "•" : "—"}</span>
                    </div>
                  </div>
                </div>

                {/* Section 47 After Completion State */}
                {isCompleted ? (
                  <div style={{
                    marginTop: "24px",
                    paddingTop: "20px",
                    borderTop: "1px solid var(--border-soft)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "#aaa" }}>WORKBOOK READY</div>
                        <div style={{ fontSize: "15px", fontWeight: "700", color: "#fff" }}>
                          {selectedSample.filename.replace(/\.[^/.]+$/, "")}.twbx
                        </div>
                      </div>
                      <button 
                        onClick={() => { setIsCompleted(false); setStepIndex(0); }}
                        style={{ background: "transparent", border: "none", color: "#666", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", fontSize: "12px" }}
                      >
                        <RefreshCw size={12} /> Reset
                      </button>
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                      <button 
                        className="btn-liquid-primary" 
                        style={{ flex: 1, justifyContent: "center" }}
                        onClick={handleDownloadTwbx}
                      >
                        <Download size={14} />
                        <span>Download .TWBX</span>
                      </button>

                      <button 
                        className="btn-liquid-secondary" 
                        style={{ flex: 1, justifyContent: "center" }}
                        onClick={handleDownloadTwb}
                      >
                        <FileCode2 size={14} />
                        <span>Download .TWB</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ fontSize: "12px", color: "var(--muted)", fontFamily: "var(--font-mono)", paddingTop: "16px", borderTop: "1px solid var(--border-soft)" }}>
                    {isProcessing ? "Processing pipeline steps in real-time..." : "Click 'Generate Tableau Workbook' to run the pipeline."}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
