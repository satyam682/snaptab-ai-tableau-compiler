import { create } from "xmlbuilder2";
import crypto from "crypto";

/**
 * Generate 100% compliant, native Tableau XML (.twb) matching Tableau Desktop & Public schema
 */
export const generateTableauWorkbookXml = ({ projectName, csvFileName, headers = [], visuals = [] }) => {
  const cleanCsvName = (csvFileName || "data.csv").replace(/\.[^/.]+$/, "");
  const safeProjectName = (projectName || "Executive Dashboard").replace(/[\[\]]/g, "").substring(0, 40);

  const root = create({ version: "1.0", encoding: "utf-8" })
    .ele("workbook", {
      "original-version": "18.1",
      "source-build": "2026.2.0 (20262.26.0603.1643)",
      "source-platform": "win",
      version: "18.1",
      "xmlns:user": "http://www.tableausoftware.com/xml/user",
    });

  // 1. Document Format Change Manifest (Standard Tableau Desktop & Public manifest)
  const manifest = root.ele("document-format-change-manifest");
  manifest.ele("AccessibleZoneTabOrder");
  manifest.ele("AnimationOnByDefault");
  manifest.ele("AutoCreateAndUpdateDSDPhoneLayouts");
  manifest.ele("MarkAnimation");
  manifest.ele("ObjectModelEncapsulateLegacy");
  manifest.ele("ObjectModelExtractV2");
  manifest.ele("ObjectModelTableType");
  manifest.ele("SchemaViewerObjectModel");
  manifest.ele("SetMembershipControl");
  manifest.ele("SheetIdentifierTracking");
  manifest.ele("WindowsPersistSimpleIdentifiers");
  manifest.ele("WorksheetBackgroundTransparency");
  manifest.ele("ZoneBackgroundTransparency");

  // 2. Preferences
  const preferences = root.ele("preferences");
  preferences.ele("preference", { name: "ui.encoding.shelf.height", value: "24" });
  preferences.ele("preference", { name: "ui.shelf.height", value: "26" });

  // 3. Datasources Definition
  const datasources = root.ele("datasources");
  const datasource = datasources.ele("datasource", {
    caption: cleanCsvName,
    inline: "true",
    name: "federated.data",
    version: "18.1",
  });

  const connection = datasource.ele("connection", { class: "federated" });
  const namedConns = connection.ele("named-connections");
  const namedConn = namedConns.ele("named-connection", {
    caption: cleanCsvName,
    name: "textscan.data",
  });

  namedConn.ele("connection", {
    class: "textscan",
    directory: "Data",
    filename: `${cleanCsvName}.csv`,
    "is-single-table-union": "yes",
    name: "textscan.data",
    separator: ",",
  });

  const rel = connection.ele("relation", {
    connection: "textscan.data",
    name: `${cleanCsvName}#csv`,
    table: `[${cleanCsvName}#csv]`,
    type: "table",
  });
  rel.ele("columns", {
    "character-set": "UTF-8",
    header: "yes",
    locale: "en_US",
    separator: ",",
  });

  datasource.ele("aliases", { enabled: "yes" });

  // Define columns in Datasource
  const objectId = `[Extract_${crypto.randomUUID().replace(/-/g, "").toUpperCase()}]`;

  headers.forEach((header) => {
    const isMeasure = /sales|profit|quantity|price|revenue|amount|cost|margin|discount/i.test(header);
    const isDate = /date|year|month|day|time/i.test(header);

    datasource.ele("column", {
      datatype: isMeasure ? "real" : isDate ? "date" : "string",
      name: `[${header}]`,
      role: isMeasure ? "measure" : "dimension",
      type: isMeasure ? "quantitative" : isDate ? "ordinal" : "nominal",
    });
  });

  datasource.ele("column", {
    caption: "Extract",
    datatype: "table",
    name: `[__tableau_internal_object_id__].${objectId}`,
    role: "measure",
    type: "quantitative",
  });

  // Extract definition for Tableau Public (prevents Error Code: 3C242D89)
  const extractEle = datasource.ele("extract", {
    count: "-1",
    enabled: "true",
    "object-id": "",
    units: "records",
  });

  const extractConn = extractEle.ele("connection", {
    access_mode: "readonly",
    "author-locale": "en_US",
    class: "hyper",
    dbname: `Data/Extracts/${cleanCsvName}.hyper`,
    "default-settings": "hyper",
    schema: "Extract",
    sslmode: "",
    tablename: "Extract",
    username: "tableau_internal_user",
  });

  extractConn.ele("relation", {
    name: "Extract",
    table: "[Extract].[Extract]",
    type: "table",
  });

  const metaRecords = extractConn.ele("metadata-records");
  headers.forEach((header, idx) => {
    const isMeasure = /sales|profit|quantity|price|revenue|amount|cost|margin|discount/i.test(header);
    const isDate = /date|year|month|day|time/i.test(header);

    const rec = metaRecords.ele("metadata-record", { class: "column" });
    rec.ele("remote-name").txt(header);
    rec.ele("remote-type").txt(isMeasure ? "5" : isDate ? "133" : "129");
    rec.ele("local-name").txt(`[${header}]`);
    rec.ele("parent-name").txt("[Extract]");
    rec.ele("remote-alias").txt(header);
    rec.ele("ordinal").txt(String(idx));
    rec.ele("family").txt("Extract");
    rec.ele("local-type").txt(isMeasure ? "real" : isDate ? "date" : "string");
    rec.ele("aggregation").txt(isMeasure ? "Sum" : "Count");
    rec.ele("contains-null").txt("true");
    rec.ele("object-id").txt(objectId);
  });

  // 4. Prepare Unique Sheet Names for Worksheets
  const validVisuals = visuals.length > 0 ? visuals : [
    {
      id: "v1",
      type: "BAR_CHART",
      title: "Sales by Region",
      bounds: { x: 5, y: 10, width: 45, height: 80 },
      mapping: { dimension: headers[0] || "Region", measure: headers[1] || "Sales", aggregation: "SUM" },
    },
  ];

  const usedNames = new Set();
  const sheetNames = validVisuals.map((vis, idx) => {
    let raw = (vis.title || `Visual ${idx + 1}`).replace(/[\[\]:\?\\\/\*]/g, "").trim().substring(0, 28) || `Visual ${idx + 1}`;
    let candidate = raw;
    let counter = 2;
    while (usedNames.has(candidate)) {
      candidate = `${raw} (${counter++})`;
    }
    usedNames.add(candidate);
    return candidate;
  });

  // 5. Worksheets
  const worksheets = root.ele("worksheets");

  validVisuals.forEach((vis, idx) => {
    const sheetName = sheetNames[idx];
    const worksheet = worksheets.ele("worksheet", { name: sheetName });

    // Optional layout-options title
    const layoutOptions = worksheet.ele("layout-options");
    layoutOptions.ele("title").ele("formatted-text").ele("run").txt(sheetName);

    const table = worksheet.ele("table");
    
    // View element
    const view = table.ele("view");
    const datasourcesEle = view.ele("datasources");
    datasourcesEle.ele("datasource", {
      caption: cleanCsvName,
      name: "federated.data",
    });

    const datasourceDeps = view.ele("datasource-dependencies", {
      datasource: "federated.data",
    });

    // Find valid measure and dimension from headers
    const measureCol = (vis.mapping?.measure && headers.includes(vis.mapping.measure))
      ? vis.mapping.measure
      : headers.find((h) => /sales|profit|amount|revenue|price/i.test(h)) || headers[1] || "Sales";

    const dimensionCol = (vis.mapping?.dimension && headers.includes(vis.mapping.dimension))
      ? vis.mapping.dimension
      : headers.find((h) => /region|category|segment|city|state|product/i.test(h)) || headers[0] || "Region";

    const agg = vis.mapping?.aggregation || "SUM";
    const aggTitle = agg.charAt(0) + agg.slice(1).toLowerCase();

    datasourceDeps.ele("column", {
      datatype: "real",
      name: `[${measureCol}]`,
      role: "measure",
      type: "quantitative",
    });

    if (dimensionCol) {
      datasourceDeps.ele("column", {
        datatype: "string",
        name: `[${dimensionCol}]`,
        role: "dimension",
        type: "nominal",
      });
    }

    const aggInstanceName = `[${agg.toLowerCase()}:${measureCol}:qk]`;
    const dimInstanceName = `[none:${dimensionCol}:nk]`;

    datasourceDeps.ele("column-instance", {
      column: `[${measureCol}]`,
      derivation: aggTitle,
      name: aggInstanceName,
      pivot: "key",
      type: "quantitative",
    });

    if (dimensionCol) {
      datasourceDeps.ele("column-instance", {
        column: `[${dimensionCol}]`,
        derivation: "None",
        name: dimInstanceName,
        pivot: "key",
        type: "nominal",
      });
    }

    view.ele("aggregation", { value: "true" });

    // Style element (required between view and panes)
    table.ele("style");

    // Panes element (must come BEFORE rows and cols)
    const panes = table.ele("panes");
    const pane = panes.ele("pane", {
      id: "0",
      "selection-relaxation-option": "selection-relaxation-allow"
    });
    const paneView = pane.ele("view");
    paneView.ele("breakdown", { value: "auto" });

    // Rows and Cols
    const rows = table.ele("rows");
    const cols = table.ele("cols");

    if (vis.type === "KPI_CARD") {
      pane.ele("mark", { class: "Automatic" });
      pane.ele("encodings").ele("text", {
        column: `[federated.data].${aggInstanceName}`,
      });
      rows.txt("");
      cols.txt("");
    } else if (vis.type === "DONUT_CHART" || vis.type === "PIE_CHART") {
      pane.ele("mark", { class: "Pie" });
      const encodings = pane.ele("encodings");
      if (dimensionCol) {
        encodings.ele("color", { column: `[federated.data].${dimInstanceName}` });
      }
      encodings.ele("wedge-size", { column: `[federated.data].${aggInstanceName}` });
      rows.txt("");
      cols.txt("");
    } else {
      const markClass = vis.type === "LINE_CHART" ? "Line" : (vis.type === "AREA_CHART" ? "Area" : "Bar");
      pane.ele("mark", { class: markClass });
      rows.txt(`[federated.data].${aggInstanceName}`);
      cols.txt(`[federated.data].${dimInstanceName}`);
    }

    // Simple ID for worksheet
    worksheet.ele("simple-id", { uuid: `{${crypto.randomUUID().toUpperCase()}}` });
  });

  // 6. Dashboards & Layout Zones
  const dashboards = root.ele("dashboards");
  const dashboard = dashboards.ele("dashboard", {
    "enable-sort-zone-taborder": "true",
    name: safeProjectName,
  });
  dashboard.ele("style");
  dashboard.ele("size", {
    maxheight: "900",
    maxwidth: "1400",
    minheight: "900",
    minwidth: "1400",
    "sizing-mode": "fixed",
  });

  const zones = dashboard.ele("zones");
  const rootZone = zones.ele("zone", {
    h: "100000",
    id: "4",
    "type-v2": "layout-basic",
    w: "100000",
    x: "0",
    y: "0",
  });

  sheetNames.forEach((sheetName, idx) => {
    const vis = validVisuals[idx];
    const bounds = vis.bounds || {
      x: (idx % 2) * 50,
      y: Math.floor(idx / 2) * 50,
      width: 48,
      height: 45,
    };

    const vizZone = rootZone.ele("zone", {
      h: String(Math.max(12000, Math.round(bounds.height * 1000))),
      id: String(idx + 10),
      name: sheetName,
      w: String(Math.max(12000, Math.round(bounds.width * 1000))),
      x: String(Math.round(bounds.x * 1000)),
      y: String(Math.round(bounds.y * 1000)),
    });

    const zoneStyle = vizZone.ele("zone-style");
    zoneStyle.ele("format", { attr: "border-color", value: "#000000" });
    zoneStyle.ele("format", { attr: "border-style", value: "none" });
    zoneStyle.ele("format", { attr: "border-width", value: "0" });
    zoneStyle.ele("format", { attr: "margin", value: "4" });
  });

  dashboard.ele("simple-id", { uuid: `{${crypto.randomUUID().toUpperCase()}}` });

  // 7. Windows Block - CRITICAL FIX for Tableau logic-assert 0x2805CF18!
  // Tableau requires:
  // (a) A <window class='worksheet'> element for EVERY worksheet in the workbook.
  // (b) A <window class='dashboard'> with a <viewpoint name='...'> for EVERY worksheet placed on the dashboard.
  const windows = root.ele("windows", { "source-height": "30" });

  sheetNames.forEach((sheetName) => {
    const wsWin = windows.ele("window", {
      class: "worksheet",
      name: sheetName,
    });
    const cards = wsWin.ele("cards");
    const edgeLeft = cards.ele("edge", { name: "left" });
    const stripLeft = edgeLeft.ele("strip", { size: "160" });
    stripLeft.ele("card", { type: "pages" });
    stripLeft.ele("card", { type: "filters" });
    stripLeft.ele("card", { type: "marks" });

    const edgeTop = cards.ele("edge", { name: "top" });
    const stripTop1 = edgeTop.ele("strip", { size: "2147483647" });
    stripTop1.ele("card", { type: "columns" });
    const stripTop2 = edgeTop.ele("strip", { size: "2147483647" });
    stripTop2.ele("card", { type: "rows" });
    const stripTop3 = edgeTop.ele("strip", { size: "31" });
    stripTop3.ele("card", { type: "title" });

    wsWin.ele("simple-id", { uuid: `{${crypto.randomUUID().toUpperCase()}}` });
  });

  const dbWin = windows.ele("window", {
    class: "dashboard",
    maximized: "true",
    name: safeProjectName,
  });

  const viewpoints = dbWin.ele("viewpoints");
  sheetNames.forEach((sheetName) => {
    const vp = viewpoints.ele("viewpoint", { name: sheetName });
    vp.ele("zoom", { type: "entire-view" });
  });

  dbWin.ele("active", { id: "-1" });
  dbWin.ele("simple-id", { uuid: `{${crypto.randomUUID().toUpperCase()}}` });

  // 8. Thumbnails block
  root.ele("thumbnails");

  return root.end({ prettyPrint: true });
};
