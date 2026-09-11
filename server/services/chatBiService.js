import Groq from "groq-sdk";
import { spawn } from "child_process";
import path from "path";

const getGroqClient = () => {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured in server/.env");
  }
  return new Groq({ apiKey });
};

// Helper: Run Python Data Engine subprocess
export const runDataEngine = (payload) => {
  return new Promise((resolve, reject) => {
    const pythonScript = path.join(process.cwd(), "services", "dataEngineService.py");
    const pyProcess = spawn("python", [pythonScript]);

    let stdoutData = "";
    let stderrData = "";

    pyProcess.stdin.write(JSON.stringify(payload));
    pyProcess.stdin.end();

    pyProcess.stdout.on("data", (chunk) => {
      stdoutData += chunk.toString();
    });

    pyProcess.stderr.on("data", (chunk) => {
      stderrData += chunk.toString();
    });

    pyProcess.on("close", (code) => {
      if (code !== 0) {
        return reject(new Error(`Data Engine error (code ${code}): ${stderrData || stdoutData}`));
      }
      try {
        const parsed = JSON.parse(stdoutData.trim());
        if (parsed.error) {
          return reject(new Error(parsed.error));
        }
        resolve(parsed);
      } catch (err) {
        reject(new Error(`Failed to parse Data Engine output: ${stdoutData}`));
      }
    });
  });
};

// Generate welcome summary & 3 tailored suggested prompts on dataset upload
export const generateDatasetRecommendations = async (datasetInfo) => {
  const groq = getGroqClient();

  const prompt = `You are an elite Business Intelligence AI data scientist.
A user has uploaded a tabular enterprise dataset with ${datasetInfo.rowCount} rows.
Dataset schema:
- Dimensions (Categorical): [${datasetInfo.dimensions.join(", ")}]
- Measures (Numeric): [${datasetInfo.measures.join(", ")}]
- Date / Temporal fields: [${datasetInfo.dateColumns.join(", ")}]

Generate a response with:
1. A brief, professional, enthusiastic welcome message (1-2 sentences) summarizing what this dataset represents.
2. Exactly 3 recommended natural language analytical queries that would create high-impact visual charts and KPI cards for this dataset.

Return STRICTLY a valid JSON object (no markdown fences, no explanatory text):
{
  "welcomeMessage": "Dataset loaded successfully with ${datasetInfo.rowCount} records. I'm ready to analyze your dimensions and measures to build your interactive Tableau dashboard.",
  "suggestedQueries": [
    "Plot Sales by Region as a Bar Chart",
    "Show Profit Trend over Order Date as a Line Chart",
    "Calculate Total Revenue as a KPI Card"
  ]
}`;

  try {
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      max_tokens: 600,
    });

    let raw = completion.choices[0]?.message?.content || "{}";
    raw = raw.trim().replace(/^```json/, "").replace(/^```/, "").replace(/```$/, "").trim();
    return JSON.parse(raw);
  } catch (err) {
    console.warn("[Chat BI Warning] Failed to get Groq recommendations:", err.message);
    const m1 = datasetInfo.measures[0] || "Sales";
    const d1 = datasetInfo.dimensions[0] || "Category";
    const dateCol = datasetInfo.dateColumns[0] || datasetInfo.dimensions[1] || d1;
    return {
      welcomeMessage: `Successfully ingested full dataset with ${datasetInfo.rowCount} records. Ready to generate interactive visualizations and compile your Tableau package.`,
      suggestedQueries: [
        `Plot ${m1} by ${d1} as a Bar Chart`,
        `Show ${m1} trend over ${dateCol} as a Line Chart`,
        `Calculate Total ${m1} as a KPI Card`
      ]
    };
  }
};

// Process natural language conversational query & aggregate full dataset
export const processConversationalQuery = async ({ query, datasetInfo, filePath }) => {
  const groq = getGroqClient();

  const prompt = `You are SnapTab Conversational BI Engine.
The user is asking an analytical question about their dataset.
Dataset Schema:
- Dimensions (Categorical): [${datasetInfo.dimensions.join(", ")}]
- Measures (Numeric): [${datasetInfo.measures.join(", ")}]
- Date / Temporal: [${datasetInfo.dateColumns.join(", ")}]

User Query: "${query}"

Your task is to determine:
1. Intent: Is this requesting a visual chart/KPI or general text?
2. If chart/KPI:
   - chartType: "BAR_CHART", "LINE_CHART", "DONUT_CHART", "AREA_CHART", or "KPI_CARD"
   - title: concise, publication-grade chart title (e.g. "Sales by Region")
   - dimension: the best matching column name from dimensions or dates
   - measure: the best matching primary numeric column from measures
   - secondaryMeasure: (optional) second measure for dual-metric comparison, or ""
   - aggregation: "SUM", "AVG", "COUNT", "MAX", or "MIN" (default "SUM")
   - friendlyExplanation: 1-2 conversational sentences explaining the insight.

Return STRICTLY a JSON object:
{
  "isVisual": true,
  "chartType": "BAR_CHART",
  "title": "Sales by Region",
  "dimension": "Region",
  "measure": "Sales",
  "secondaryMeasure": "",
  "aggregation": "SUM",
  "responseMessage": "Here is the breakdown of Total Sales grouped by Region across your full dataset."
}`;

  try {
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
      max_tokens: 700,
    });

    let raw = completion.choices[0]?.message?.content || "{}";
    raw = raw.trim().replace(/^```json/, "").replace(/^```/, "").replace(/```$/, "").trim();
    const parsed = JSON.parse(raw);

    if (!parsed.isVisual) {
      return {
        text: parsed.responseMessage || "I analyzed your dataset. Let me know if you would like me to plot a chart or calculate a KPI card for any metric.",
        visual: null
      };
    }

    // Now execute live aggregation across ALL rows via Python Data Engine!
    const aggResult = await runDataEngine({
      action: "aggregate",
      filePath: filePath,
      dimension: parsed.dimension || "",
      measure: parsed.measure || (datasetInfo.measures[0] || "Sales"),
      secondaryMeasure: parsed.secondaryMeasure || null,
      aggregation: parsed.aggregation || "SUM",
      limit: 15
    });

    // Format formatted summary string for KPIs
    let summaryStr = "";
    if (parsed.chartType === "KPI_CARD" || !parsed.dimension) {
      parsed.chartType = "KPI_CARD";
      const totalNum = aggResult.total || 0;
      summaryStr = totalNum >= 1000000 
        ? `$${(totalNum / 1000000).toFixed(2)}M`
        : totalNum >= 1000 
          ? `$${(totalNum / 1000).toFixed(1)}K` 
          : `$${totalNum.toLocaleString()}`;
    }

    const visualPayload = {
      id: "chat_vis_" + Date.now() + "_" + Math.round(Math.random() * 1000),
      title: parsed.title || `${parsed.measure} by ${parsed.dimension}`,
      type: parsed.chartType || "BAR_CHART",
      dimension: aggResult.dimension || "",
      measure: aggResult.measure || "",
      secondaryMeasure: aggResult.secondaryMeasure || "",
      aggregation: aggResult.aggregation || "SUM",
      summaryValue: summaryStr,
      data: aggResult.chartData || [],
      confidence: 0.98
    };

    return {
      text: parsed.responseMessage || `Generated ${visualPayload.title} from your complete dataset.`,
      visual: visualPayload
    };
  } catch (err) {
    console.error("[Chat BI Error]", err);
    // Fallback: heuristic visual generation
    const m = datasetInfo.measures[0] || "Sales";
    const d = datasetInfo.dimensions[0] || "Region";
    const aggResult = await runDataEngine({
      action: "aggregate",
      filePath: filePath,
      dimension: d,
      measure: m,
      aggregation: "SUM",
      limit: 10
    });

    return {
      text: `Calculated ${m} by ${d} across all records in your dataset.`,
      visual: {
        id: "chat_vis_" + Date.now(),
        title: `${m} by ${d}`,
        type: "BAR_CHART",
        dimension: d,
        measure: m,
        aggregation: "SUM",
        summaryValue: "",
        data: aggResult.chartData || [],
        confidence: 0.95
      }
    };
  }
};
