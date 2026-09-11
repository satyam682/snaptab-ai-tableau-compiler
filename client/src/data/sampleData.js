export const SAMPLES = [
  {
    id: "sales-performance",
    name: "Sales Performance Overview",
    filename: "sales_dashboard.png",
    datasetName: "superstore_sales.csv",
    detectedComponents: [
      { id: "kpi_1", title: "Total Revenue", type: "KPI_CARD", field: "Sales", agg: "SUM", value: "$2.45M" },
      { id: "kpi_2", title: "Total Orders", type: "KPI_CARD", field: "Orders", agg: "SUM", value: "14,250" },
      { id: "chart_1", title: "Sales by Region", type: "BAR_CHART", dim: "Region", measure: "Sales", agg: "SUM" },
      { id: "chart_2", title: "Revenue Trend", type: "LINE_CHART", dim: "Order_Date", measure: "Sales", agg: "SUM" }
    ],
    csvData: `Order_Date,Region,Category,Sales,Profit,Orders
2024-01-15,East,Technology,45000,12000,320
2024-02-18,West,Furniture,38000,8500,290
2024-03-22,Central,Office Supplies,52000,14200,410
2024-04-10,South,Technology,29000,6100,210`
  },
  {
    id: "saas-mrr",
    name: "SaaS MRR & Churn",
    filename: "saas_metrics.png",
    datasetName: "subscriptions.csv",
    detectedComponents: [
      { id: "kpi_mrr", title: "Current MRR", type: "KPI_CARD", field: "MRR", agg: "SUM", value: "$148,200" },
      { id: "chart_mrr", title: "MRR Growth", type: "LINE_CHART", dim: "Month", measure: "MRR", agg: "SUM" },
      { id: "chart_churn", title: "Churn by Tier", type: "BAR_CHART", dim: "Tier", measure: "Churn_Rate", agg: "AVG" }
    ],
    csvData: `Month,Tier,MRR,Churn_Rate
2024-01,Starter,42000,2.1
2024-02,Pro,65000,1.5
2024-03,Enterprise,95000,0.8`
  }
];
