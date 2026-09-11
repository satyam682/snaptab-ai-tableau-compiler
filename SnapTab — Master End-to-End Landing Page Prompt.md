# MASTER END-TO-END LANDING PAGE PROMPT
## Product: SnapTab

You are a **senior product designer, frontend architect, UI engineer, UX engineer, motion designer, and conversion-focused SaaS landing-page specialist**.

Your task is to build a **production-quality, visually exceptional landing page for SnapTab**.

Do NOT create a generic AI SaaS landing page.

The final result must feel like a **premium next-generation data/AI infrastructure product**: minimal, cinematic, sophisticated, technical, trustworthy, and highly polished.

---

# 1. PRODUCT IDENTITY — SINGLE SOURCE OF TRUTH

## Product Name

**SnapTab**

## Product Category

AI-powered dashboard reconstruction and Tableau workbook generation platform.

## Core Product Promise

SnapTab transforms a dashboard screenshot, image, or HTML dashboard together with its underlying CSV/XLSX dataset into a **native, interactive Tableau packaged workbook (`.twbx`)**.

The generated workbook should not merely contain a screenshot.

The concept is:

```text
Dashboard Screenshot / HTML
             +
       CSV / XLSX Data
             ↓
          SnapTab
             ↓
       Vision AI Analysis
             ↓
      Semantic Field Mapping
             ↓
      Tableau Workbook XML
             ↓
         .TWBX Package
             ↓
   Native Interactive Tableau
          Dashboard
```

The PRD specifies that the system identifies visual components such as KPI cards, bar charts, line charts, donut charts, and tables, maps them to dataset fields, generates Tableau XML, and packages the workbook and data into a `.twbx` file.

---

# 2. PRIMARY MARKETING MESSAGE

The landing page must communicate this idea within the first few seconds:

> **Your dashboard design goes in. A native Tableau workbook comes out.**

Supporting idea:

> Turn screenshots and static dashboard designs into interactive Tableau workbooks using AI.

Do NOT overload the hero with technical jargon.

The visitor should immediately understand:

1. What SnapTab does.
2. What they upload.
3. What they get.
4. Why it saves enormous manual effort.

---

# 3. DESIGN DIRECTION

Use this visual language:

- Pure black background.
- Premium liquid-metal / glass aesthetic.
- White and silver typography.
- Subtle gray gradients.
- Frosted glass surfaces.
- Extremely restrained use of borders.
- Soft atmospheric lighting.
- Cinematic depth.
- Subtle grain/noise.
- High-quality micro-interactions.
- Elegant motion.
- No cheap gradients.
- No excessive glowing neon.
- No cartoon illustrations.
- No generic AI brain graphics.
- No stock photography.
- No excessive cards.
- No clutter.

The website should feel closer to:

- premium AI infrastructure
- high-end developer tooling
- modern enterprise software
- cinematic Apple-style product presentation

than a conventional startup template.

---

# 4. CRITICAL VISUAL RULE

The provided hero section/code from the user is the **highest-priority visual reference**.

When the hero code is provided:

### PRESERVE

- Hero composition.
- Hero spacing.
- Typography hierarchy.
- Animation philosophy.
- Background treatment.
- Navigation treatment.
- Button styling.
- Glass/liquid-metal visual language.
- Responsive behavior.
- Existing SVG marks.
- Existing asset references.
- Existing animation timing where practical.

Do NOT replace the supplied hero with a completely different design.

Instead:

> **Extend the visual language of the supplied hero across the SnapTab landing page.**

The rest of the page must look like it naturally belongs to the same design system.

---

# 5. IMPORTANT BRAND CORRECTION

Any references to:

- Vesper
- Vesper.ai
- SnapTab old/demo content
- unrelated AI infrastructure claims

must NOT appear in the final product.

The actual product identity is:

# SnapTab

The document title must be SnapTab-specific.

Recommended:

```text
SnapTab — AI Dashboard to Native Tableau
```

or:

```text
SnapTab — Turn Dashboard Designs Into Tableau Workbooks
```

Use the better option based on SEO and visual fit.

---

# 6. HERO SECTION

The hero is the most important part of the website.

It must immediately communicate the product.

## Badge

Use a premium small pill:

```text
AI-POWERED TABLEAU AUTOMATION
```

Alternative:

```text
FROM DESIGN TO TABLEAU
```

Keep it short.

Use a subtle sparkle/AI icon.

---

## Main headline

Preferred headline:

```text
Turn dashboard designs
into native Tableau.
```

Use the supplied hero typography treatment.

The words:

```text
native Tableau
```

or:

```text
dashboard designs
```

may use the special editorial/serif italic treatment from the provided hero implementation.

Do NOT make the entire heading serif.

Only use the accent words.

---

## Hero supporting copy

Use:

```text
Upload a dashboard screenshot or HTML with your CSV or Excel data. SnapTab uses AI to reconstruct the visual structure, map your data, and generate an interactive Tableau workbook.
```

Keep the paragraph concise.

Maximum readable width approximately 500–600px.

---

# 7. HERO CTA

Primary CTA:

```text
Start Converting
```

Secondary CTA:

```text
See How It Works
```

Alternative primary CTA:

```text
Try SnapTab Free
```

The primary button must visually dominate.

Use the liquid-glass/silver treatment from the hero implementation.

---

# 8. HERO PRODUCT VISUAL

Do not use a generic abstract illustration.

Create a visual representation of the actual SnapTab workflow.

The visual should communicate:

```text
INPUT
Screenshot / HTML + CSV/XLSX

        ↓

AI ANALYSIS

        ↓

MAPPING

        ↓

TABLEAU

        ↓

.twbx
```

This can be represented through an elegant UI composition.

The visual should look like a premium product interface rather than a marketing illustration.

Possible visual:

### Left

A dashboard screenshot preview.

Overlay subtle bounding boxes:

```text
KPI_CARD
BAR_CHART
LINE_CHART
TABLE
```

### Center

A minimal AI processing layer:

```text
Analyzing dashboard...
Mapping schema...
Building workbook...
```

### Right

A Tableau-style native dashboard preview with:

```text
Sales
Revenue
Region
Profit
Monthly Trend
```

Then show:

```text
✓ workbook.twbx ready
```

The UI should look sophisticated and believable.

---

# 9. HERO PRODUCT INTERACTION

If technically feasible, implement a subtle simulated conversion animation.

Example:

```text
Uploading dashboard...
       ↓
Vision analysis
       ↓
Detecting charts
       ↓
Mapping dataset
       ↓
Generating Tableau XML
       ↓
Packaging .twbx
       ↓
Ready
```

Do NOT make this look like a fake loading spinner.

Make it feel like a real technical pipeline.

---

# 10. ABOVE-THE-FOLD PRIORITY

Within the first viewport, the visitor should understand:

### WHAT

```text
Convert dashboard designs into Tableau workbooks.
```

### INPUT

```text
PNG / JPG / HTML
+
CSV / XLSX
```

### OUTPUT

```text
Native .twbx
```

### VALUE

```text
Minutes instead of hours of manual recreation.
```

---

# 11. VALUE PROPOSITION

The PRD identifies a major manual-recreation bottleneck: Tableau developers and analysts may spend roughly **10–40 hours per dashboard** recreating layouts, worksheets, dimensions, measures, KPI cards, and dashboard zones.

Build the marketing copy around this pain.

Use:

# Stop rebuilding dashboards by hand.

Supporting copy:

```text
Clients send screenshots. Designers send static mockups.
You shouldn't have to spend hours rebuilding every chart in Tableau.

SnapTab turns the visual reference and its dataset into a structured Tableau workbook automatically.
```

---

# 12. PROBLEM → SOLUTION SECTION

Create a visually strong section.

## LEFT — THE OLD WAY

```text
Screenshot
    ↓
Inspect every chart
    ↓
Identify dimensions
    ↓
Identify measures
    ↓
Recreate worksheets
    ↓
Configure shelves
    ↓
Rebuild dashboard zones
    ↓
Fix formatting
    ↓
Hours of manual work
```

Use muted styling.

## RIGHT — SNAPTAB

```text
Screenshot + Data
        ↓
AI Vision
        ↓
Semantic Mapping
        ↓
Tableau XML
        ↓
.twbx
```

Use brighter/highlighted styling.

---

# 13. TIME-SAVING MESSAGE

Use the PRD-supported comparison:

```text
8–24 hours
Manual time to first draft

< 30 seconds
SnapTab target time to first draft
```

The PRD explicitly gives this comparison.

Do NOT fabricate stronger performance numbers.

---

# 14. CORE FEATURES

Create a premium feature section.

Do not use six generic cards.

Use an editorial / asymmetric layout.

## Feature 01

### See the dashboard. Understand the structure.

SnapTab's vision layer analyzes the uploaded dashboard and identifies visual components.

Supported core visual types from the PRD include:

```text
KPI Cards
Bar Charts
Line Charts
Donut Charts
Tables
```



---

## Feature 02

### AI maps visuals to your data.

SnapTab compares dashboard labels against dataset headers and categorizes fields into:

```text
Dimensions
Measures
```

It can determine mappings such as:

```text
Revenue → Sales
Region → Region
Monthly Trend → Order_Date
```

The system is designed to return structured component information including fields, aggregation, chart type, and normalized dashboard position.

---

## Feature 03

### From pixels to Tableau structure.

SnapTab generates Tableau workbook XML containing concepts such as:

```text
Datasources
Worksheets
Dashboards
Zones
```

Then packages the workbook and data into a `.twbx`.



---

## Feature 04

### Review before you build.

Show the user exactly what AI detected.

The product UX should support:

```text
Dashboard preview
+
Detected bounding boxes
+
Editable mappings
```

The PRD specifically calls for a split-view interface with the uploaded image and editable component mappings.

---

# 15. HOW IT WORKS

Create a highly polished 4-step section.

## 01

### Upload

```text
Dashboard PNG / JPG / HTML
+
CSV / XLSX
```

## 02

### Analyze

```text
Vision AI detects dashboard components
and understands the visual structure.
```

## 03

### Map

```text
Review and adjust AI-generated
dimension and measure mappings.
```

## 04

### Export

```text
Generate and download
your native .twbx workbook.
```

These four stages directly reflect the PRD UX flow.

---

# 16. INTERACTIVE PRODUCT DEMO

Build a visually impressive simulated product interface.

It should show:

### Upload panel

```text
Dashboard
sales_dashboard.png

Dataset
superstore_sales.xlsx
```

Then:

```text
AI detected 4 components
```

Display bounding boxes on the dashboard.

Example labels:

```text
KPI
BAR CHART
LINE CHART
TABLE
```

On the right:

```text
Component
Sales by Region

Dimension
Region

Measure
Sales

Aggregation
SUM
```

Add:

```text
Generate Tableau Workbook
```

When clicked, show:

```text
Building workbook...
```

Then:

```text
✓ Tableau workbook ready

sales_dashboard.twbx
```

This should be the strongest visual section after the hero.

---

# 17. "NOT AN IMAGE EXPORT" MESSAGE

This is a critical differentiator.

Create a strong statement:

# Not a screenshot inside Tableau.

Supporting copy:

```text
SnapTab is designed to reconstruct the dashboard structure around your data — not simply place an image on a canvas.

The goal is a native Tableau workbook with worksheets, fields, calculations, dashboard zones, and interactive behavior.
```

This differentiation is explicitly supported by the PRD.

---

# 18. TECHNICAL TRUST SECTION

Create a restrained technical section for technical buyers.

Headline:

```text
Built as a pipeline, not a prompt.
```

Show:

```text
Vision AI
      ↓
Schema Inspection
      ↓
Semantic Mapping
      ↓
Tableau XML Engine
      ↓
TWBX Packaging
```

Mention technologies only where useful:

```text
React
Node.js
MongoDB
Groq Vision
Tableau XML
```

The PRD specifies a MERN architecture with Groq Vision and a Tableau XML engine.

Do not turn this into a giant technology-logo wall.

---

# 19. ARCHITECTURE VISUAL

Create a premium dark technical diagram.

```text
┌───────────────────────┐
│      USER INPUT       │
│                       │
│ Dashboard + Dataset   │
└───────────┬───────────┘
            ↓
┌───────────────────────┐
│      SNAPTAB AI       │
│                       │
│ Vision + Schema       │
│ Semantic Mapping      │
└───────────┬───────────┘
            ↓
┌───────────────────────┐
│   TABLEAU ENGINE      │
│                       │
│ TWB XML + Packaging   │
└───────────┬───────────┘
            ↓
┌───────────────────────┐
│       OUTPUT          │
│                       │
│      dashboard.twbx   │
└───────────────────────┘
```

Use subtle animated connection lines.

---

# 20. SUPPORTED INPUTS

Create a compact section:

```text
INPUT

PNG
JPG
HTML
CSV
XLSX
```

Then:

```text
OUTPUT

.TWBX
```

Do not claim support for additional formats unless implemented.

---

# 21. SECURITY / TRUST

Keep this section minimal.

Mention only capabilities supported by the PRD:

- Image upload limit: 10MB.
- CSV limit: 50MB.
- MIME/magic-number validation.
- UUID-based generated paths.
- Temporary files cleaned after one hour.



Do not overpromise enterprise security certifications.

Do not use phrases like:

```text
Military-grade security
Bank-level encryption
SOC 2 certified
GDPR certified
```

unless actually implemented and verified.

---

# 22. PERFORMANCE CLAIMS

Use only defensible PRD claims.

Preferred:

```text
Designed for fast AI-assisted dashboard reconstruction.
```

If displaying:

```text
< 30 sec
```

label it clearly as:

```text
Target time to first draft
```

because it is a PRD target, not a verified live benchmark.

---

# 23. SOCIAL PROOF

Do NOT invent:

- customer logos
- fake testimonials
- fake user counts
- fake revenue
- fake enterprise customers
- fake ratings
- fake "trusted by" companies

If real testimonials are not provided, omit the section.

Authenticity is more important than fake social proof.

---

# 24. STATISTICS

Do not use invented claims such as:

```text
4.2M workflows automated
180+ teams
92% reduction
```

Those belong to an unrelated visual reference and are not supported by the SnapTab PRD.

Instead use product facts such as:

```text
< 30 sec
Target first draft

5+
Core visual types

2
Input categories

1
Native .twbx output
```

However, only display numbers where their meaning is clear.

The PRD supports five core visual types and the `.twbx` output concept.

---

# 25. NAVIGATION

Create a minimal premium navigation.

Logo:

```text
SnapTab
```

Possible navigation:

```text
Product
How It Works
Technology
FAQ
```

Primary CTA:

```text
Start Converting
```

Do not create dead navigation links.

If a section does not exist, either:

1. create the corresponding section, or
2. remove the navigation item.

---

# 26. NAVIGATION VISUAL STYLE

Use the supplied hero's liquid-metal pill navigation language.

Each navigation item should feel like:

```text
dark metallic glass
+
subtle silver border
+
soft internal reflection
+
micro hover glow
```

Avoid excessive blur.

The navigation should remain readable.

---

# 27. BUTTON SYSTEM

Create three states:

## Primary

White/silver liquid-metal button.

Black text.

## Secondary

Transparent glass.

White text.

## Tertiary

Minimal text link with arrow.

Every button must have:

- hover state
- active state
- focus state
- subtle transition
- keyboard accessibility

Do not use huge rounded "pill" buttons everywhere.

---

# 28. TYPOGRAPHY

Use the supplied hero typography system wherever possible.

Primary UI font:

```text
Inter
```

Editorial accent:

```text
Instrument Serif Italic
```

Use serif italic only for selected hero emphasis.

Hierarchy:

```text
Hero:
48–88px depending on viewport

Section heading:
42–64px

Body:
15–18px

Small labels:
11–14px
```

Maintain tight letter spacing for large headings.

Use optical hierarchy instead of excessive font weights.

---

# 29. COLOR SYSTEM

Primary:

```css
--bg: #000000;
--text: #ffffff;
--muted: #9a9a9a;
--stat: #d8d8d8;
--border: rgba(255,255,255,.16);
--border-soft: rgba(255,255,255,.12);
```

Additional surfaces may use:

```text
#050505
#0A0A0A
#111111
#171717
#222222
```

Do NOT introduce random colors.

If a blue accent is used, keep it extremely subtle and only where it improves interaction hierarchy.

---

# 30. BACKGROUND

The background must remain predominantly black.

Use:

```text
black base
+
subtle radial lighting
+
very subtle grain
+
soft metallic reflections
```

Do not create:

- purple AI gradients
- blue cyberpunk backgrounds
- colorful blobs
- excessive aurora effects

The product should feel expensive.

---

# 31. GRAIN

Add a very subtle film-grain/noise layer.

It must:

- be almost invisible
- cover the viewport
- not affect readability
- not interfere with interaction
- use pointer-events:none

Do not make the grain obvious.

---

# 32. GLASS SYSTEM

Use glass carefully.

Example:

```css
background:
linear-gradient(...);

border:
1px solid rgba(255,255,255,.12);

backdrop-filter:
blur(...);
```

Add subtle inner highlights.

Do not use giant glassmorphism cards with excessive blur.

---

# 33. MOTION DESIGN

Motion should feel:

```text
calm
precise
technical
premium
```

Use:

- masked text reveals
- opacity + transform entrances
- subtle blur-to-sharp transitions
- button hover movement
- border illumination
- gentle product-demo transitions
- tiny icon rotations
- subtle background movement

Avoid:

- bouncing
- spinning everything
- aggressive parallax
- excessive floating
- distracting animations

---

# 34. HERO ENTRANCE

Preserve the provided hero animation system if present.

The intended feel:

```text
Logo → navigation → badge → headline → description → CTAs → product visual
```

Each element should enter sequentially.

Use an elegant cubic-bezier such as:

```css
cubic-bezier(.16, 1, .3, 1)
```

Avoid linear movement.

---

# 35. SCROLL EXPERIENCE

Unlike the original single-viewport hero specification, the complete SnapTab marketing landing page should support vertical scrolling on desktop and mobile once additional sections are implemented.

However:

### The first hero viewport must remain visually locked and cinematic.

Do not let the hero become vertically stretched.

Use:

```text
100svh / 100dvh
```

appropriately.

---

# 36. RESPONSIVE DESIGN

The site must work perfectly at:

```text
2560px
1920px
1600px
1440px
1280px
1024px
900px
768px
560px
390px
375px
320px
```

---

# 37. DESKTOP

At large screens:

- Maintain generous negative space.
- Keep hero content centered.
- Do not enlarge everything excessively.
- Product visual should remain dominant.
- Navigation remains horizontal.
- Sections use max-width containers.
- Avoid text becoming too wide.

Maximum content width:

```text
1200–1400px
```

depending on section.

---

# 38. TABLET

At tablet widths:

- Reduce heading size.
- Reduce horizontal padding.
- Stack complex two-column sections.
- Preserve product visual hierarchy.
- Keep navigation usable.

---

# 39. MOBILE

At <=900px:

Use a fullscreen mobile menu.

Burger:

```text
42 × 42px
```

Menu should use the same liquid-metal aesthetic.

Hero:

- bottom/center aligned
- readable
- no horizontal overflow
- buttons can stack
- product visual scales down intelligently

At <=560px:

Hero CTA buttons should become:

```text
width: 100%;
```

or nearly full width.

Do not allow text to touch screen edges.

---

# 40. MOBILE HERO HEADLINE

Ensure the hero headline does not produce awkward line breaks.

For example:

```text
Turn dashboard
designs into
native Tableau.
```

But use responsive typography rather than hardcoded `<br>` tags everywhere.

---

# 41. ACCESSIBILITY

Implement:

- semantic HTML
- proper heading hierarchy
- accessible buttons
- accessible navigation
- `aria-label`
- `aria-expanded`
- visible keyboard focus
- sufficient contrast
- reduced-motion support
- no interaction dependent solely on hover

Mobile menu must close using:

```text
Escape
navigation click
resize
```

---

# 42. REDUCED MOTION

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

Disable/reduce:

- entrance animations
- parallax
- large transforms
- continuous background movement

The interface must remain fully functional.

---

# 43. PERFORMANCE

Optimize aggressively.

Requirements:

- no unnecessary dependencies
- no huge image assets
- lazy-load below-the-fold visual assets
- optimize SVG
- avoid excessive DOM nodes
- avoid expensive continuous JavaScript animations
- prefer CSS transitions
- use `transform` and `opacity`
- avoid layout thrashing

Do not introduce:

```text
Three.js
WebGL
Lottie
heavy animation libraries
```

unless explicitly required by the provided hero implementation.

---

# 44. IMAGES

Do not use random stock imagery.

Use:

- actual product UI mockups
- SVG diagrams
- CSS-generated effects
- supplied hero assets
- supplied hero code assets

If a dashboard image is needed for demonstration, create a realistic **synthetic dashboard UI** rather than using copyrighted third-party imagery.

---

# 45. ICONS

Use:

```text
Lucide React
```

or clean inline SVG.

Keep icons:

- thin
- geometric
- minimal
- consistent

Do not mix multiple icon styles.

---

# 46. PRODUCT DEMO DETAILS

The demo should visually show a realistic dashboard.

Example dataset:

```text
Order_Date
Region
Category
Sales
Profit
```

Example detected components:

```text
Total Revenue
Sales by Region
Monthly Revenue Trend
Profit by Category
```

These examples align with the PRD's dashboard/data mapping examples.

---

# 47. AI PROCESSING UI

Create a technical status interface:

```text
SNAPTAB AI

Analyzing visual structure             ✓
Inspecting dataset schema              ✓
Mapping dimensions & measures          ✓
Constructing Tableau workbook          •
Packaging .twbx                        —
```

After completion:

```text
WORKBOOK READY

sales_dashboard.twbx

Download workbook →
```

This should feel like a real system status interface.

---

# 48. FAQ

Create a concise FAQ.

Recommended questions:

### What does SnapTab convert?

```text
SnapTab is designed to convert dashboard screenshots or HTML representations together with CSV/XLSX data into a native Tableau packaged workbook.
```

### Is the output just an image?

```text
No. The intended output is a Tableau workbook structure rather than simply embedding the source screenshot.
```

### What files can I upload?

```text
Dashboard visual: PNG/JPG/HTML
Dataset: CSV/XLSX
```

### Can I review AI mappings?

```text
Yes. The intended workflow includes a mapping-review stage where detected components and dataset mappings can be inspected and adjusted.
```

### What is the final output?

```text
A .twbx Tableau packaged workbook containing the generated workbook structure and associated dataset.
```

### Which charts are supported?

```text
The initial specification covers KPI cards, bar charts, line charts, donut charts, and tables.
```

Do not promise features that are not implemented.

---

# 49. FINAL CTA

End the marketing experience with a strong minimal CTA.

Headline:

# Your dashboard is already designed.
# Now make it interactive.

Supporting:

```text
Upload the visual.
Connect the data.
Let SnapTab build the workbook.
```

CTA:

```text
Start Converting
```

Secondary:

```text
See How It Works →
```

---

# 50. FOOTER

Keep the footer minimal.

Include:

```text
SnapTab
AI-powered dashboard → Tableau automation
```

Links:

```text
Product
How It Works
FAQ
Privacy
Terms
```

Do not create a giant corporate footer.

---

# 51. PRICING

The PRD contains a commercialization roadmap:

```text
Community
Pro
Enterprise Agency
```

However, do NOT create a huge pricing section if the visual direction calls for a focused premium landing page.

If pricing is included, keep it compact and elegant.

The PRD specifies:

```text
Community: Free
Pro: $29/month
Enterprise Agency: $199/month
```



Do not invent additional prices.

---

# 52. SEO

Implement proper metadata.

Title:

```text
SnapTab — Turn Dashboard Designs Into Native Tableau Workbooks
```

Description:

```text
SnapTab uses AI to transform dashboard screenshots or HTML and your CSV or Excel data into native, interactive Tableau packaged workbooks.
```

Open Graph:

```text
og:title
og:description
og:image
og:type
```

Use:

```html
lang="en"
```

Add appropriate semantic headings.

---

# 53. TECH STACK

Frontend:

```text
React
Vite
Modern CSS
Lucide React
```

Backend architecture if the repository includes backend work:

```text
Node.js
Express.js
MongoDB
```

AI:

```text
Groq Vision
```

Tableau generation:

```text
Tableau XML
xmlbuilder2
archiver
```

Data parsing:

```text
csv-parser
xlsx
```

These technologies are based on the supplied PRD.

---

# 54. COMPONENT ARCHITECTURE

Build reusable components.

Suggested:

```text
src/
├── components/
│   ├── Navbar
│   ├── Hero
│   ├── HeroBadge
│   ├── HeroActions
│   ├── ProductPreview
│   ├── ProblemSolution
│   ├── FeatureSection
│   ├── Workflow
│   ├── ConversionDemo
│   ├── Architecture
│   ├── InputOutput
│   ├── FAQ
│   ├── CTA
│   └── Footer
│
├── sections/
│   ├── HeroSection
│   ├── WorkflowSection
│   ├── FeaturesSection
│   ├── DemoSection
│   ├── ArchitectureSection
│   ├── FAQSection
│   └── CTASection
│
├── assets/
├── styles/
└── App.jsx
```

Adapt to the existing repository rather than blindly replacing its architecture.

---

# 55. CODE QUALITY

Do not create one giant component.

Use:

- reusable components
- clean props
- semantic names
- CSS variables
- no duplicated styles
- no unnecessary inline styles
- no hardcoded magic numbers everywhere
- no dead code
- no unused imports
- no console errors

---

# 56. FUNCTIONALITY

The landing page must not be merely static.

At minimum:

### Navigation

Works.

### Mobile menu

Works.

### CTA buttons

Have meaningful destinations/actions.

### Demo

Has realistic interaction.

### FAQ

Expandable/collapsible.

### Upload CTA

If backend is connected, route to the actual conversion experience.

If backend is not connected, create a clearly marked placeholder route rather than pretending conversion works.

---

# 57. DO NOT FAKE FUNCTIONALITY

Never show:

```text
Conversion successful
```

unless the actual conversion happened.

Never claim:

```text
AI analyzed your file
```

unless a real file was processed.

For a marketing/demo animation, label it visually as:

```text
Interactive demo
```

or make it obvious that it is a product preview.

---

# 58. CRITICAL "DO NOT" LIST

DO NOT:

- use Vesper branding
- use unrelated product names
- use fake customer logos
- invent testimonials
- invent user counts
- invent revenue
- invent performance benchmarks
- use generic AI brain illustrations
- use random stock photos
- use excessive gradients
- use purple AI aesthetics
- use neon cyberpunk styling
- add unnecessary sections
- create giant text walls
- create dozens of cards
- use excessive border-radius
- make every component a glass card
- add unnecessary libraries
- add Three.js
- add WebGL
- add Lottie
- add random videos
- add fake conversion results
- claim Tableau certification/partnership
- claim official Tableau affiliation
- claim features not present in the PRD
- make unsupported security claims

---

# 59. TABLEAU BRANDING RULE

SnapTab works around Tableau workbook generation.

Do NOT imply:

```text
Official Tableau product
Official Tableau partner
Built by Tableau
Certified by Tableau
```

unless independently verified.

Use wording such as:

```text
Generate Tableau-compatible workbook packages.
```

or:

```text
Generate native Tableau workbook structures.
```

depending on what is actually implemented.

---

# 60. CONTENT STYLE

Copy should be:

- confident
- concise
- technical when necessary
- easy for non-technical buyers
- premium
- specific

Avoid:

```text
Revolutionize your workflow with our cutting-edge AI-powered solution!
```

Prefer:

```text
Turn a dashboard reference into a Tableau workbook without rebuilding every chart by hand.
```

---

# 61. VISUAL HIERARCHY

Every section should answer one question.

Hero:

```text
What is SnapTab?
```

Problem:

```text
Why does it matter?
```

Workflow:

```text
How does it work?
```

Demo:

```text
What does it actually do?
```

Technology:

```text
Why should I trust the process?
```

FAQ:

```text
What else do I need to know?
```

CTA:

```text
What should I do next?
```

---

# 62. LANDING PAGE FLOW

The complete page should flow approximately as:

```text
NAVBAR
   ↓
HERO
   ↓
PRODUCT VISUAL
   ↓
PROBLEM / MANUAL RECREATION
   ↓
SNAPTAB SOLUTION
   ↓
HOW IT WORKS
   ↓
INTERACTIVE PRODUCT DEMO
   ↓
AI + SEMANTIC MAPPING
   ↓
TABLEAU XML / TECHNICAL TRUST
   ↓
INPUT → OUTPUT
   ↓
FAQ
   ↓
FINAL CTA
   ↓
MINIMAL FOOTER
```

Every transition should feel intentional.

---

# 63. DESIGN PRINCIPLE

The website should communicate:

```text
Simple on the surface.
Complex underneath.
```

A non-technical user should understand SnapTab immediately.

A developer should see enough technical depth to trust that there is a real system underneath.

---

# 64. FINAL IMPLEMENTATION STANDARD

Before considering the work complete, inspect the result as a senior designer would.

Ask:

### First 3 seconds

Can I understand SnapTab?

### First 10 seconds

Do I understand the input and output?

### First scroll

Do I understand why this saves time?

### Product demo

Does the interface look like a real product?

### Mobile

Does it feel intentionally designed or simply responsive?

### Typography

Does it look premium?

### Motion

Does it feel smooth rather than gimmicky?

### Content

Is every claim defensible?

### Brand

Does everything clearly belong to SnapTab?

---

# 65. FINAL QA CHECKLIST

Before delivering:

- [ ] SnapTab branding everywhere
- [ ] No Vesper references
- [ ] No fake claims
- [ ] Hero visually follows supplied hero code
- [ ] Hero communicates dashboard → Tableau
- [ ] CTA works
- [ ] Mobile menu works
- [ ] FAQ works
- [ ] Responsive at all major breakpoints
- [ ] No horizontal overflow
- [ ] No console errors
- [ ] No unused imports
- [ ] No broken images
- [ ] No broken links
- [ ] Keyboard navigation works
- [ ] Reduced motion supported
- [ ] Page loads efficiently
- [ ] SEO metadata exists
- [ ] Product demo feels realistic
- [ ] `.twbx` is explained correctly
- [ ] Tableau claims are carefully worded
- [ ] PRD functionality is reflected accurately
- [ ] No unsupported statistics

---

# 66. MOST IMPORTANT INSTRUCTION

Do not simply generate a beautiful marketing page.

Generate a page that makes someone immediately think:

> **"Wait — I can give this thing a dashboard screenshot and my data, and it can turn that into a Tableau workbook?"**

That is the core product moment.

The visual design, copy, animations, product demo, information architecture, and CTA hierarchy should all reinforce that single idea.

Build **SnapTab** as a premium, technically credible, AI-native product — not as another generic AI SaaS landing page.