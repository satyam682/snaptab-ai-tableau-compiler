import fs from "fs";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

async function run() {
  const imgBuffer = fs.readFileSync("../test1_dashboard.jpg");
  const base64 = imgBuffer.toString("base64");
  const headers = ["Region", "Category", "SubCategory", "Segment", "Sales", "Profit", "Quantity", "Discount", "Order Date"];

  const prompt = `You are an expert dashboard vision analysis engine.
Analyze this dashboard mockup image and detect ALL charts and visual components.
For each chart, detect its visual bounding box percentage (x, y, width, height where 0-100 is percentage of the image), its chart type, title, and map its dimension and measure to the best matching column from these dataset headers:
[${headers.join(", ")}]

Supported types: "BAR_CHART", "LINE_CHART", "DONUT_CHART", "AREA_CHART", "TABLE", "KPI_CARD".
DO NOT label bar/line/donut charts as KPI_CARD. Only label standalone single-number metric cards as KPI_CARD.

Return STRICTLY a JSON object with this format (no markdown fences, no explanatory text):
{
  "dashboardTitle": "Corporate Sales Performance Analytics",
  "visuals": [
    {
      "id": "visual_1",
      "type": "BAR_CHART",
      "title": "Sales by Region",
      "bounds": { "x": 2, "y": 12, "width": 30, "height": 40 },
      "mapping": {
        "dimension": "Region",
        "measure": "Sales",
        "aggregation": "SUM",
        "colorDimension": ""
      },
      "confidence": 0.98
    }
  ]
}`;

  console.log("Calling qwen/qwen3.8-27b with real image...");
  const res = await groq.chat.completions.create({
    model: "qwen/qwen3.8-27b",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64}` } }
        ]
      }
    ],
    temperature: 0.1,
    max_tokens: 1800
  });

  const raw = res.choices[0].message.content;
  console.log("Raw Response:\n", raw);

  let cleaned = raw.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json/, "").replace(/```$/, "").trim();
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```/, "").replace(/```$/, "").trim();
  }

  const parsed = JSON.parse(cleaned);
  console.log("SUCCESSFULLY PARSED!", parsed.visuals.length, "visuals detected:");
  parsed.visuals.forEach(v => {
    console.log(`- ${v.title} (${v.type}): x=${v.bounds.x}, y=${v.bounds.y}, w=${v.bounds.width}, h=${v.bounds.height}, dim=${v.mapping.dimension}, measure=${v.mapping.measure}`);
  });
}

run().catch(console.error);
