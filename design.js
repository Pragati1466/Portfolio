const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageNumber, LevelFormat, TabStopType
} = require('docx');
const fs = require('fs');

// ── PALETTE (drawn from the 3 reference sites + Pragati PRD brand) ──
const NAVY    = "0A192F";   // Brittany bg
const TEAL    = "64FFDA";   // Brittany accent
const DARK_BG = "10101A";   // Adeola bg
const OFF_WH  = "CCD6F6";   // Brittany body text
const SLATE   = "8892B0";   // Brittany muted
const CREAM   = "F5F0EB";   // light block bg
const BRAND   = "1E3A5F";   // Pragati PRD navy
const GOLD    = "C9A84C";   // Pragati PRD gold
const MID     = "4A7FA5";
const WHITE   = "FFFFFF";
const DARK    = "111827";
const GRAY    = "6B7280";
const ACCENT  = "64FFDA";   // teal CTA
const ORANGE  = "FF6B35";   // warm alternative

const border   = { style: BorderStyle.SINGLE, size: 1, color: "D1D5DB" };
const borders  = { top: border, bottom: border, left: border, right: border };
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders= { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

// ── HELPERS ──────────────────────────────────────────────────────────
function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 440, after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: "64FFDA", space: 6 } },
    children: [new TextRun({ text, bold: true, size: 34, color: BRAND, font: "Georgia" })]
  });
}
function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 80 },
    children: [new TextRun({ text, bold: true, size: 26, color: MID, font: "Georgia" })]
  });
}
function h3(text) {
  return new Paragraph({
    spacing: { before: 200, after: 60 },
    children: [new TextRun({ text, bold: true, size: 22, color: BRAND, font: "Calibri" })]
  });
}
function body(text, opts = {}) {
  return new Paragraph({
    spacing: { before: 40, after: 40 },
    children: [new TextRun({ text, size: 21, color: opts.color || DARK, font: "Calibri", bold: opts.bold || false, italics: opts.italic || false })]
  });
}
function bullet(text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { before: 30, after: 30 },
    children: [new TextRun({ text, size: 21, color: DARK, font: "Calibri" })]
  });
}
function subbullet(text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 1 },
    spacing: { before: 20, after: 20 },
    children: [new TextRun({ text, size: 20, color: GRAY, font: "Calibri" })]
  });
}
function spacer(size = 120) {
  return new Paragraph({ spacing: { before: size, after: 0 }, children: [new TextRun("")] });
}
function divider() {
  return new Paragraph({
    spacing: { before: 160, after: 160 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: "E5E7EB", space: 1 } },
    children: [new TextRun("")]
  });
}
function callout(text, color = "0A192F", textColor = "64FFDA") {
  return new Paragraph({
    spacing: { before: 100, after: 100 },
    shading: { fill: color, type: ShadingType.CLEAR },
    indent: { left: 200, right: 200 },
    children: [new TextRun({ text, size: 20, color: textColor, font: "Calibri", italics: true })]
  });
}
function labelRow(label, value, labelColor = BRAND) {
  return new TableRow({
    children: [
      new TableCell({
        width: { size: 2800, type: WidthType.DXA }, borders: noBorders,
        shading: { fill: CREAM, type: ShadingType.CLEAR },
        margins: { top: 60, bottom: 60, left: 120, right: 120 },
        children: [new Paragraph({ children: [new TextRun({ text: label, bold: true, size: 20, color: labelColor, font: "Calibri" })] })]
      }),
      new TableCell({
        width: { size: 6560, type: WidthType.DXA }, borders: noBorders,
        margins: { top: 60, bottom: 60, left: 120, right: 120 },
        children: [new Paragraph({ children: [new TextRun({ text: value, size: 20, color: DARK, font: "Calibri" })] })]
      })
    ]
  });
}

// ── COLOR SWATCH row helper ──────────────────────────────────────────
function swatchRow(hex, name, role, usage) {
  return new TableRow({
    children: [
      new TableCell({
        width: { size: 800, type: WidthType.DXA }, borders,
        shading: { fill: hex, type: ShadingType.CLEAR },
        margins: { top: 60, bottom: 60, left: 60, right: 60 },
        children: [new Paragraph({ children: [new TextRun({ text: "", size: 20 })] })]
      }),
      new TableCell({
        width: { size: 1600, type: WidthType.DXA }, borders,
        margins: { top: 60, bottom: 60, left: 120, right: 120 },
        children: [new Paragraph({ children: [new TextRun({ text: `#${hex}`, size: 19, font: "Courier New", color: DARK, bold: true })] })]
      }),
      new TableCell({
        width: { size: 2000, type: WidthType.DXA }, borders,
        margins: { top: 60, bottom: 60, left: 120, right: 120 },
        children: [new Paragraph({ children: [new TextRun({ text: name, size: 19, font: "Calibri", color: DARK, bold: true })] })]
      }),
      new TableCell({
        width: { size: 1800, type: WidthType.DXA }, borders,
        margins: { top: 60, bottom: 60, left: 120, right: 120 },
        children: [new Paragraph({ children: [new TextRun({ text: role, size: 19, font: "Calibri", color: MID })] })]
      }),
      new TableCell({
        width: { size: 3160, type: WidthType.DXA }, borders,
        margins: { top: 60, bottom: 60, left: 120, right: 120 },
        children: [new Paragraph({ children: [new TextRun({ text: usage, size: 18, font: "Calibri", color: GRAY, italics: true })] })]
      })
    ]
  });
}

// ── DOCUMENT ─────────────────────────────────────────────────────────
const doc = new Document({
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [
          { level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
          { level: 1, format: LevelFormat.BULLET, text: "\u25E6", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 1080, hanging: 360 } } } }
        ]
      },
      {
        reference: "numbers",
        levels: [
          { level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }
        ]
      }
    ]
  },
  styles: {
    default: { document: { run: { font: "Calibri", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 34, bold: true, font: "Georgia", color: BRAND }, paragraph: { spacing: { before: 440, after: 120 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 26, bold: true, font: "Georgia", color: MID }, paragraph: { spacing: { before: 300, after: 80 }, outlineLevel: 1 } },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 }
      }
    },
    headers: {
      default: new Header({
        children: [
          new Paragraph({
            spacing: { before: 0, after: 0 },
            border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "64FFDA", space: 4 } },
            shading: { fill: NAVY, type: ShadingType.CLEAR },
            children: [
              new TextRun({ text: "PRAGATI  |  PORTFOLIO DESIGN DOCUMENT", bold: true, size: 18, color: WHITE, font: "Calibri" }),
              new TextRun({ text: "    v1.0  |  May 2026", size: 16, color: SLATE, font: "Calibri" }),
            ]
          })
        ]
      })
    },
    footers: {
      default: new Footer({
        children: [
          new Paragraph({
            border: { top: { style: BorderStyle.SINGLE, size: 4, color: MID, space: 4 } },
            tabStops: [{ type: TabStopType.RIGHT, position: 9360 }],
            spacing: { before: 80 },
            children: [
              new TextRun({ text: "Pragati \u2022 Portfolio Design Document", size: 16, color: GRAY, font: "Calibri" }),
              new TextRun({ text: "\tPage ", size: 16, color: GRAY, font: "Calibri" }),
              new PageNumber(),
            ]
          })
        ]
      })
    },
    children: [

      // ── COVER ──────────────────────────────────────────────────────
      new Paragraph({
        spacing: { before: 200, after: 0 },
        shading: { fill: NAVY, type: ShadingType.CLEAR },
        children: [new TextRun({ text: "DESIGN DOCUMENT", bold: true, size: 26, color: ACCENT, font: "Calibri", allCaps: true })]
      }),
      new Paragraph({
        spacing: { before: 0, after: 0 },
        shading: { fill: NAVY, type: ShadingType.CLEAR },
        children: [new TextRun({ text: "Personal Portfolio Website", bold: true, size: 56, color: WHITE, font: "Georgia" })]
      }),
      new Paragraph({
        spacing: { before: 0, after: 0 },
        shading: { fill: NAVY, type: ShadingType.CLEAR },
        children: [new TextRun({ text: "Pragati  \u2014  Visual Design System + Aesthetic Direction", size: 24, color: SLATE, font: "Calibri", italics: true })]
      }),
      new Paragraph({
        spacing: { before: 60, after: 0 },
        shading: { fill: NAVY, type: ShadingType.CLEAR },
        children: [new TextRun({ text: "\u201CInspired by victoreke.com \u00B7 v4.brittanychiang.com \u00B7 adeolaadeoti.site\u201D", size: 20, color: GOLD, font: "Georgia", italics: true })]
      }),
      new Paragraph({
        spacing: { before: 60, after: 200 },
        shading: { fill: NAVY, type: ShadingType.CLEAR },
        children: [new TextRun({ text: "Version 1.0  \u2022  May 2026  \u2022  Confidential  \u2022  Prepared for: Pragati", size: 18, color: SLATE, font: "Calibri" })]
      }),

      divider(),

      // ── SECTION 1: ANALYSIS OF REFERENCE SITES ────────────────────
      h1("1. Reference Site Analysis"),
      body("Before defining Pragati\u2019s design system, three industry-benchmark developer portfolios were analyzed for their design language, layout patterns, color choices, and component style. The synthesis of these three aesthetics forms the foundation of Pragati\u2019s design direction."),

      spacer(120),

      // ── 1.1 Victor Eke ──
      h2("1.1 victoreke.com \u2014 Dark Minimal + Content-Dense"),
      new Table({
        width: { size: 9360, type: WidthType.DXA }, columnWidths: [2800, 6560],
        rows: [
          labelRow("Theme", "Dark minimal with structured information hierarchy"),
          labelRow("Background", "#0D1117 (GitHub-dark near-black) / #161B22 surface"),
          labelRow("Accent Color", "Emerald / teal for links and highlights"),
          labelRow("Typography", "System sans-serif stack; tight line-height; heavy contrast"),
          labelRow("Layout", "Single-column centered content; max-width container; generous whitespace"),
          labelRow("Navigation", "Minimal top nav (4 links); no hamburger on desktop; clean logo mark"),
          labelRow("Components", "Contribution graph (GitHub-style); timeline cards for experience; icon links"),
          labelRow("Motion", "Subtle; no gratuitous animation; fast loads prioritized"),
          labelRow("Distinctive Trait", "Content-first — personality through writing, not visual spectacle"),
        ]
      }),
      spacer(80),
      callout("Design Takeaway: The power is in restraint. Clean dark background with structured grid and strong typographic hierarchy creates trust and professionalism. Works because the content is rich."),

      spacer(160),

      // ── 1.2 Brittany Chiang ──
      h2("1.2 v4.brittanychiang.com \u2014 Dark Navy + Teal Signature"),
      new Table({
        width: { size: 9360, type: WidthType.DXA }, columnWidths: [2800, 6560],
        rows: [
          labelRow("Theme", "Deep navy dark mode; cool-toned, calm but sophisticated"),
          labelRow("Background", "#0A192F (deep navy) with #112240 surface cards"),
          labelRow("Accent Color", "#64FFDA (electric teal) for links, highlights, and numbered headings"),
          labelRow("Body Text", "#CCD6F6 (near-white lavender); #8892B0 for secondary/muted"),
          labelRow("Typography", "SF Mono / Calibre; numbered section headings (01. About); mono for labels"),
          labelRow("Layout", "Fixed left sidebar nav on desktop; right-side sticky nav dots; single column scroll"),
          labelRow("Navigation", "Fixed left sidebar; smooth-scroll; numbered items; 'Resume' CTA button"),
          labelRow("Components", "Numbered headings; project cards with hover overlay; skill list as plain text"),
          labelRow("Motion", "Page-load fade-in sequence; hover state transitions on cards and links"),
          labelRow("Distinctive Trait", "The numbered section headings (01. / 02. / 03.) and the teal accent are instantly iconic"),
        ]
      }),
      spacer(80),
      callout("Design Takeaway: Brittany\u2019s palette is the gold standard for developer portfolios. Navy + teal + lavender body text is high contrast, readable, and sophisticated. The numbered heading system is a signature device that Pragati should adopt or riff on."),

      spacer(160),

      // ── 1.3 Adeola Adeoti ──
      h2("1.3 adeolaadeoti.site \u2014 Dark Editorial + Motion-First"),
      new Table({
        width: { size: 9360, type: WidthType.DXA }, columnWidths: [2800, 6560],
        rows: [
          labelRow("Theme", "Ultra-dark editorial; agency-level motion design; dramatic entries"),
          labelRow("Background", "#10101A (near-black with a violet undertone)"),
          labelRow("Accent Color", "White on dark; orange/warm tones for hover states"),
          labelRow("Typography", "Large display type; all-caps section labels; editorial whitespace"),
          labelRow("Layout", "Horizontal scroll for projects; full-screen hero; preloader sequence"),
          labelRow("Navigation", "Minimal hamburger; social links always visible in corner"),
          labelRow("Components", "Full-page project reveals; skill ticker (horizontal scroll loop); testimonials"),
          labelRow("Motion", "Heavy: GSAP/Framer Motion for page transitions, text reveals, scroll parallax"),
          labelRow("Distinctive Trait", "Feels like a design agency, not a developer CV. The motion IS the message."),
        ]
      }),
      spacer(80),
      callout("Design Takeaway: Bold agency-level motion creates instant impression. The all-caps labels, editorial spacing, and full-screen reveals turn a portfolio into an experience. High effort but high reward. Adopt the energy, balance with usability."),

      divider(),

      // ── SECTION 2: DESIGN DIRECTION FOR PRAGATI ───────────────────
      h1("2. Recommended Design Direction for Pragati"),
      body("Based on the three reference sites and Pragati\u2019s PRD tagline \u2014 \u201CA designer who judges a book by its cover\u201D \u2014 the recommended aesthetic is a synthesis of all three, weighted toward Brittany Chiang\u2019s structural clarity with Adeola\u2019s motion energy and Victor\u2019s content density."),
      spacer(80),
      new Paragraph({
        spacing: { before: 100, after: 100 },
        indent: { left: 720, right: 720 },
        border: { left: { style: BorderStyle.SINGLE, size: 14, color: ACCENT, space: 8 } },
        children: [new TextRun({ text: "Aesthetic Direction: \u201CDark Studio \u00D7 Numbered Editorial\u201D \u2014 a deep navy/charcoal base with an electric teal signature accent, numbered section headings, motion-enhanced entry reveals, and editorial whitespace. Approachable but unmistakably designed.", size: 23, color: NAVY, font: "Georgia", italics: true, bold: true })]
      }),

      divider(),

      // ── SECTION 3: COLOR SYSTEM ────────────────────────────────────
      h1("3. Color System"),
      body("The palette is derived directly from Brittany Chiang\u2019s iconic navy-teal-lavender triad, refined with Adeola\u2019s deep near-black background and Victor\u2019s clean card surfaces."),
      spacer(100),

      h2("3.1 Primary Palette"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [800, 1600, 2000, 1800, 3160],
        rows: [
          new TableRow({ children: [
            new TableCell({ borders, shading: { fill: NAVY, type: ShadingType.CLEAR }, width: { size: 800, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 80, right: 80 }, children: [new Paragraph({ children: [new TextRun({ text: "Swatch", bold: true, size: 18, color: WHITE, font: "Calibri" })] })] }),
            new TableCell({ borders, shading: { fill: NAVY, type: ShadingType.CLEAR }, width: { size: 1600, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "Hex", bold: true, size: 18, color: WHITE, font: "Calibri" })] })] }),
            new TableCell({ borders, shading: { fill: NAVY, type: ShadingType.CLEAR }, width: { size: 2000, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "Name", bold: true, size: 18, color: WHITE, font: "Calibri" })] })] }),
            new TableCell({ borders, shading: { fill: NAVY, type: ShadingType.CLEAR }, width: { size: 1800, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "Role", bold: true, size: 18, color: WHITE, font: "Calibri" })] })] }),
            new TableCell({ borders, shading: { fill: NAVY, type: ShadingType.CLEAR }, width: { size: 3160, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "Usage", bold: true, size: 18, color: WHITE, font: "Calibri" })] })] }),
          ]}),
          swatchRow("0A192F", "Deep Navy",       "Page Background",   "Body bg, hero bg, nav bg"),
          swatchRow("112240", "Surface Navy",     "Card / Section Bg", "About card, project cards, floating panels"),
          swatchRow("1E2D40", "Elevated Navy",    "Hover Surface",     "Card hover state, code blocks"),
          swatchRow("64FFDA", "Electric Teal",    "Primary Accent",    "Links, highlights, numbered headings, CTA border"),
          swatchRow("CCD6F6", "Lavender White",   "Primary Text",      "All body copy, headings"),
          swatchRow("8892B0", "Slate",            "Secondary Text",    "Captions, dates, metadata, muted labels"),
          swatchRow("C9A84C", "Warm Gold",        "Special Accent",    "Achievement badges, tagline, 'made with love' footer"),
          swatchRow("FFFFFF", "Pure White",       "High Contrast",     "Hero name, critical headings only"),
        ]
      }),

      spacer(120),
      h2("3.2 Semantic Color Tokens"),
      new Table({
        width: { size: 9360, type: WidthType.DXA }, columnWidths: [3200, 2400, 3760],
        rows: [
          new TableRow({ children: [
            new TableCell({ borders, shading: { fill: NAVY, type: ShadingType.CLEAR }, width: { size: 3200, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "Token", bold: true, size: 19, color: WHITE, font: "Calibri" })] })] }),
            new TableCell({ borders, shading: { fill: NAVY, type: ShadingType.CLEAR }, width: { size: 2400, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "Value", bold: true, size: 19, color: WHITE, font: "Calibri" })] })] }),
            new TableCell({ borders, shading: { fill: NAVY, type: ShadingType.CLEAR }, width: { size: 3760, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "Usage", bold: true, size: 19, color: WHITE, font: "Calibri" })] })] }),
          ]}),
          ...[
            ["--color-bg",         "#0A192F", "Main page background"],
            ["--color-bg-surface", "#112240", "Card and section surfaces"],
            ["--color-bg-elevated","#1E2D40", "Hover states, tooltips"],
            ["--color-accent",     "#64FFDA", "Primary interactive accent"],
            ["--color-accent-dim", "#64FFDA33","Accent at 20% opacity for fills"],
            ["--color-text-primary","#CCD6F6","All body copy"],
            ["--color-text-secondary","#8892B0","Muted metadata, captions"],
            ["--color-text-heading","#FFFFFF", "Hero name, section H1"],
            ["--color-gold",       "#C9A84C", "Special callouts, badges"],
            ["--color-border",     "#233554", "Card borders, dividers"],
          ].map(([token, val, usage], i) => new TableRow({ children: [
            new TableCell({ borders, shading: { fill: i % 2 === 0 ? "0D1B2E" : "0A192F", type: ShadingType.CLEAR }, width: { size: 3200, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: token, size: 18, font: "Courier New", color: ACCENT, bold: true })] })] }),
            new TableCell({ borders, shading: { fill: i % 2 === 0 ? "0D1B2E" : "0A192F", type: ShadingType.CLEAR }, width: { size: 2400, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: val, size: 18, font: "Courier New", color: GOLD })] })] }),
            new TableCell({ borders, shading: { fill: i % 2 === 0 ? "0D1B2E" : "0A192F", type: ShadingType.CLEAR }, width: { size: 3760, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: usage, size: 18, font: "Calibri", color: SLATE, italics: true })] })] }),
          ]}))
        ]
      }),

      divider(),

      // ── SECTION 4: TYPOGRAPHY ──────────────────────────────────────
      h1("4. Typography System"),
      body("The type system blends Brittany Chiang\u2019s SF Mono / Calibre approach (monospace for labels, sans for body) with Adeola\u2019s large editorial display type. Display headlines feel bold and atmospheric; body text stays readable and light."),
      spacer(100),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2400, 2400, 1600, 1400, 1560],
        rows: [
          new TableRow({ children: [
            ...["Element", "Font", "Size", "Weight", "Color"].map(h => new TableCell({ borders, shading: { fill: NAVY, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 19, color: WHITE, font: "Calibri" })] })] }))
          ]}),
          ...[
            ["Hero Name",         "Calibre / Inter",    "64–80px",  "700",    "#FFFFFF"],
            ["Hero Tagline",      "SF Mono / JetBrains","14–16px",  "400",    "#64FFDA"],
            ["Section Number",    "SF Mono / JetBrains","13–14px",  "400",    "#64FFDA"],
            ["Section Heading H1","Calibre / Inter",    "32–40px",  "600",    "#CCD6F6"],
            ["Sub-heading H2",    "Calibre / Inter",    "24–28px",  "600",    "#CCD6F6"],
            ["Body Copy",         "Calibre / Inter",    "16–18px",  "400",    "#8892B0"],
            ["Card Title",        "Calibre / Inter",    "20–22px",  "600",    "#CCD6F6"],
            ["Card Meta / Date",  "SF Mono / JetBrains","12–13px",  "400",    "#8892B0"],
            ["Skill Tags",        "SF Mono / JetBrains","12–13px",  "400",    "#64FFDA"],
            ["Nav Links",         "SF Mono / JetBrains","13px",     "400",    "#CCD6F6"],
            ["CTA Button",        "Calibre / Inter",    "14px",     "500",    "#64FFDA"],
            ["Footer",            "SF Mono / JetBrains","12px",     "400",    "#8892B0"],
          ].map(([el, font, size, weight, color], i) => new TableRow({ children: [
            new TableCell({ borders, shading: { fill: i%2===0?"0D1B2E":"0A192F", type: ShadingType.CLEAR }, margins: { top: 60, bottom: 60, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: el, size: 19, font: "Calibri", color: OFF_WH, bold: true })] })] }),
            new TableCell({ borders, shading: { fill: i%2===0?"0D1B2E":"0A192F", type: ShadingType.CLEAR }, margins: { top: 60, bottom: 60, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: font, size: 18, font: "Calibri", color: GRAY, italics: true })] })] }),
            new TableCell({ borders, shading: { fill: i%2===0?"0D1B2E":"0A192F", type: ShadingType.CLEAR }, margins: { top: 60, bottom: 60, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: size, size: 18, font: "Courier New", color: ACCENT })] })] }),
            new TableCell({ borders, shading: { fill: i%2===0?"0D1B2E":"0A192F", type: ShadingType.CLEAR }, margins: { top: 60, bottom: 60, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: weight, size: 18, font: "Calibri", color: GOLD })] })] }),
            new TableCell({ borders, shading: { fill: i%2===0?"0D1B2E":"0A192F", type: ShadingType.CLEAR }, margins: { top: 60, bottom: 60, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: color, size: 17, font: "Courier New", color: MID })] })] }),
          ]}))
        ]
      }),

      spacer(100),
      h2("4.1 Font Loading"),
      bullet("Primary: Inter (Google Fonts) \u2014 fallback: -apple-system, BlinkMacSystemFont, system-ui"),
      bullet("Mono: JetBrains Mono or SF Mono \u2014 fallback: 'Fira Code', 'Fira Mono', monospace"),
      bullet("Both loaded with font-display: swap to prevent FOIT/FOUT layout shift"),
      bullet("Preconnect to fonts.googleapis.com and fonts.gstatic.com in <head>"),

      divider(),

      // ── SECTION 5: LAYOUT SYSTEM ────────────────────────────────────
      h1("5. Layout System"),
      h2("5.1 Grid & Spacing"),
      new Table({
        width: { size: 9360, type: WidthType.DXA }, columnWidths: [2800, 6560],
        rows: [
          labelRow("Page Max-Width",   "1200px (matches Brittany\u2019s Calibre-optimized line length)"),
          labelRow("Content Width",    "700px for body text columns; 900px for full-width sections"),
          labelRow("Side Padding",     "24px mobile / 48px tablet / 0px desktop (centering handles it)"),
          labelRow("Section Padding",  "80px–120px top/bottom per section"),
          labelRow("Base Unit",        "8px grid (all spacing multiples of 8: 8, 16, 24, 32, 48, 64, 96)"),
          labelRow("Card Padding",     "24px internal padding on all project / experience cards"),
          labelRow("Gutter",           "24px between grid columns"),
        ]
      }),

      spacer(120),
      h2("5.2 Navigation Layout (Desktop)"),
      body("Inspired by Brittany Chiang\u2019s fixed left sidebar:"),
      bullet("Fixed left sidebar (width: 280px) containing: name, tagline, nav links, social icons"),
      bullet("Right content area scrolls; sidebar stays pinned"),
      bullet("Active section highlighted in sidebar with teal accent left border"),
      bullet("Resume download button pinned at bottom of sidebar"),
      spacer(60),
      body("Mobile (< 768px):"),
      bullet("Sidebar collapses into top sticky navbar with hamburger icon"),
      bullet("Full-screen overlay menu on hamburger tap with staggered link reveal animation"),
      bullet("Social icons remain accessible in footer"),

      spacer(120),
      h2("5.3 Section Number Convention (from Brittany Chiang)"),
      body("Every major section uses a numbered heading device:"),
      new Paragraph({
        spacing: { before: 80, after: 80 },
        shading: { fill: "0D1B2E", type: ShadingType.CLEAR },
        indent: { left: 200, right: 200 },
        children: [
          new TextRun({ text: "01.  About Me     02.  Skills     03.  Experience     04.  Projects     05.  Achievements     06.  Contact", size: 20, font: "Courier New", color: ACCENT })
        ]
      }),
      bullet("Number rendered in teal monospace; section title in lavender-white sans-serif"),
      bullet("Decorative horizontal line after number+title (fades to transparent)"),
      bullet("Creates rhythm and predictability \u2014 visitor always knows where they are"),

      divider(),

      // ── SECTION 6: COMPONENT DESIGN ─────────────────────────────────
      h1("6. Component Design Specs"),

      h2("6.1 Hero Section"),
      new Table({
        width: { size: 9360, type: WidthType.DXA }, columnWidths: [2800, 6560],
        rows: [
          labelRow("Layout",         "Left-aligned (NOT centered) \u2014 matches Brittany + Victor"),
          labelRow("Intro Line",     "Small mono label: \u201CHi, my name is\u201D in teal monospace"),
          labelRow("Name",           "Pragati \u2014 display size 64\u201372px, white, 700 weight"),
          labelRow("Role Subtitle",  "Tagline line in slate color, 32\u201340px"),
          labelRow("Quote",          "\u201CA designer who judges a book by its cover\u201D \u2014 teal italic mono, smaller"),
          labelRow("Body Paragraph", "150\u2013200 char summary in body text color; max-width 540px"),
          labelRow("CTAs",           "Two buttons: [View My Work] bordered teal + [Download Resume] text link"),
          labelRow("Background",     "Deep navy; optional subtle noise texture or grid overlay at 3\u20135% opacity"),
          labelRow("Animation",      "Staggered fade-up reveal: intro line \u2192 name \u2192 subtitle \u2192 body \u2192 buttons (150ms each)"),
        ]
      }),

      spacer(120),
      h2("6.2 Project Cards"),
      new Table({
        width: { size: 9360, type: WidthType.DXA }, columnWidths: [2800, 6560],
        rows: [
          labelRow("Base Style",      "#112240 card background; 1px #233554 border; 4px border-radius"),
          labelRow("Hover State",     "Translate Y(-4px) + drop shadow + border turns teal"),
          labelRow("Card Header",     "Folder icon (teal) top-left; GitHub + External link icons top-right"),
          labelRow("Project Name",    "H3 in lavender-white; 20\u201322px; 600 weight; hover color: teal"),
          labelRow("Description",     "Body text in slate; 3\u20134 lines max; clamped with ellipsis"),
          labelRow("Tech Stack Tags", "Mono font, 12px, teal color, no background (plain text list at bottom)"),
          labelRow("Grid",            "3 columns desktop / 2 tablet / 1 mobile; auto-fill with gap: 24px"),
          labelRow("Featured Project","Full-width card with project screenshot; 2-col layout (description left, image right)"),
        ]
      }),

      spacer(120),
      h2("6.3 Experience / Timeline"),
      new Table({
        width: { size: 9360, type: WidthType.DXA }, columnWidths: [2800, 6560],
        rows: [
          labelRow("Layout",         "Tab list on left (company names); content panel on right (Victor Eke style)"),
          labelRow("Tab Active",     "Teal left border + teal text; inactive tabs: slate text"),
          labelRow("Content Panel",  "Role in lavender-white H3; Company link in teal; Date in mono slate"),
          labelRow("Bullets",        "Custom teal arrow (\u25B6) list marker instead of standard bullet"),
          labelRow("Company Logos",  "Small 32px greyscale logos that brighten to full color on hover"),
          labelRow("Animation",      "Tab content fades in on tab switch (200ms opacity transition)"),
        ]
      }),

      spacer(120),
      h2("6.4 Skill Sketchpad"),
      new Table({
        width: { size: 9360, type: WidthType.DXA }, columnWidths: [2800, 6560],
        rows: [
          labelRow("Style",          "Tag cloud (no bars) \u2014 inspired by Victor Eke\u2019s clean list approach"),
          labelRow("Tag Design",     "Monospace font; teal text; #112240 bg; 1px teal border; 4px radius; 8px padding"),
          labelRow("Categories",     "Frontend / Backend / Tools / Languages / Design \u2014 with filter buttons"),
          labelRow("Filter",         "Click a category button to show only those skills (fade out others)"),
          labelRow("Layout",         "Wrapping flex row; gap: 12px; center-aligned"),
          labelRow("Hover",          "Tag bg lightens to teal at 20% opacity; smooth 200ms transition"),
        ]
      }),

      spacer(120),
      h2("6.5 Navigation (Sidebar)"),
      new Table({
        width: { size: 9360, type: WidthType.DXA }, columnWidths: [2800, 6560],
        rows: [
          labelRow("Width",          "280px fixed; height 100vh; position: sticky top-0"),
          labelRow("Background",     "#0A192F (same as page) \u2014 blends; no visible sidebar border"),
          labelRow("Logo",           "Pragati initials logo mark or stylized P; teal/white; top of sidebar"),
          labelRow("Nav Items",      "Mono numbered list (01\u201306); lavender text; hover: teal + left-indent"),
          labelRow("Active State",   "Teal left border (2px) + teal text on currently-visible section"),
          labelRow("Social Icons",   "GitHub, LinkedIn, LeetCode, Gmail \u2014 icon-only; bottom of sidebar; teal on hover"),
          labelRow("Resume Button",  "Bordered teal button; 'Resume' in teal mono; download on click"),
        ]
      }),

      spacer(120),
      h2("6.6 Footer"),
      new Table({
        width: { size: 9360, type: WidthType.DXA }, columnWidths: [2800, 6560],
        rows: [
          labelRow("Style",          "Centered; no heavy border; minimal"),
          labelRow("Credit Line",    "\u201CDesigned & Built by Pragati\u201D in mono slate; \u201Cwith love\u201D in gold"),
          labelRow("Social Icons",   "GitHub, LinkedIn, LeetCode, Gmail \u2014 same as sidebar but centered row"),
          labelRow("Copyright",      "\u00A9 2026 Pragati in muted slate; bottom of page"),
          labelRow("Inspiration",    "Adeola\u2019s footer uses SVG logo art \u2014 consider a custom Pragati SVG wordmark here"),
        ]
      }),

      divider(),

      // ── SECTION 7: MOTION DESIGN ────────────────────────────────────
      h1("7. Motion & Animation Design"),
      body("Motion philosophy: purposeful and performant. Every animation communicates state change or directs attention \u2014 never decoration for its own sake. Inspired by Brittany\u2019s restrained micro-interactions and Adeola\u2019s scroll-triggered reveals."),
      spacer(80),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2800, 2400, 4160],
        rows: [
          new TableRow({ children: [
            new TableCell({ borders, shading: { fill: NAVY, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, width: { size: 2800, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Animation", bold: true, size: 19, color: WHITE, font: "Calibri" })] })] }),
            new TableCell({ borders, shading: { fill: NAVY, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, width: { size: 2400, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Duration / Easing", bold: true, size: 19, color: WHITE, font: "Calibri" })] })] }),
            new TableCell({ borders, shading: { fill: NAVY, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, width: { size: 4160, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Notes", bold: true, size: 19, color: WHITE, font: "Calibri" })] })] }),
          ]}),
          ...[
            ["Page Load Sequence",     "300ms / ease-out",   "Hero elements stagger fade-up; 150ms between each"],
            ["Scroll-Enter Sections",  "400ms / ease-out",   "Fade + 20px translateY; trigger at 80px from viewport bottom"],
            ["Nav Link Hover",         "200ms / ease",       "Color to teal + teal left-border slides in"],
            ["Project Card Hover",     "200ms / ease-out",   "translateY(-4px) + shadow deepens"],
            ["Skill Tag Hover",        "200ms / ease",       "Bg fill teal at 15% opacity"],
            ["CTA Button Hover",       "200ms / ease",       "Teal fill bg + navy text (invert)"],
            ["Tab Switch (Experience)","200ms / ease",       "Content panel opacity 0 \u2192 1"],
            ["Preloader (optional)",   "800ms total",        "Adeola-style initials reveal; only if load > 1s"],
            ["Back-to-Top",            "300ms / ease-in-out","Smooth scroll; button fades in after 300px scroll"],
          ].map(([anim, dur, notes], i) => new TableRow({ children: [
            new TableCell({ borders, shading: { fill: i%2===0?"0D1B2E":"0A192F", type: ShadingType.CLEAR }, width: { size: 2800, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: anim, size: 19, font: "Calibri", color: OFF_WH, bold: true })] })] }),
            new TableCell({ borders, shading: { fill: i%2===0?"0D1B2E":"0A192F", type: ShadingType.CLEAR }, width: { size: 2400, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: dur, size: 18, font: "Courier New", color: ACCENT })] })] }),
            new TableCell({ borders, shading: { fill: i%2===0?"0D1B2E":"0A192F", type: ShadingType.CLEAR }, width: { size: 4160, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: notes, size: 18, font: "Calibri", color: GRAY, italics: true })] })] }),
          ]}))
        ]
      }),
      spacer(80),
      callout("Accessibility note: All animations must respect prefers-reduced-motion. Wrap all transitions in @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }"),

      divider(),

      // ── SECTION 8: DESIGN TOKENS (CSS) ──────────────────────────────
      h1("8. CSS Design Tokens (Copy-Paste Ready)"),
      body("These CSS custom property declarations define the complete design system. Drop them into a :root block."),
      spacer(80),
      new Paragraph({
        spacing: { before: 60, after: 60 },
        shading: { fill: "0D1B2E", type: ShadingType.CLEAR },
        indent: { left: 200, right: 200 },
        children: [
          new TextRun({ text: ":root {", size: 19, font: "Courier New", color: SLATE, bold: true }),
        ]
      }),
      ...[
        "  /* Colors */",
        "  --color-bg:              #0A192F;",
        "  --color-bg-surface:      #112240;",
        "  --color-bg-elevated:     #1E2D40;",
        "  --color-accent:          #64FFDA;",
        "  --color-accent-dim:      rgba(100,255,218,0.15);",
        "  --color-text-primary:    #CCD6F6;",
        "  --color-text-secondary:  #8892B0;",
        "  --color-text-heading:    #FFFFFF;",
        "  --color-gold:            #C9A84C;",
        "  --color-border:          #233554;",
        "",
        "  /* Typography */",
        "  --font-sans:   'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;",
        "  --font-mono:   'JetBrains Mono', 'Fira Code', monospace;",
        "",
        "  /* Spacing (8px base grid) */",
        "  --space-1: 8px;   --space-2: 16px;  --space-3: 24px;",
        "  --space-4: 32px;  --space-5: 48px;  --space-6: 64px;",
        "  --space-7: 80px;  --space-8: 96px;  --space-9: 120px;",
        "",
        "  /* Layout */",
        "  --max-width:        1200px;",
        "  --sidebar-width:    280px;",
        "  --content-width:    700px;",
        "  --border-radius:    4px;",
        "  --border-radius-lg: 8px;",
        "",
        "  /* Transitions */",
        "  --transition-fast:   all 0.15s ease;",
        "  --transition-base:   all 0.20s ease;",
        "  --transition-slow:   all 0.40s ease-out;",
        "",
        "  /* Shadows */",
        "  --shadow-card:  0 10px 30px -15px rgba(2,12,27,0.7);",
        "  --shadow-hover: 0 20px 30px -15px rgba(2,12,27,0.7);",
        "}",
      ].map(line => new Paragraph({
        spacing: { before: 0, after: 0 },
        shading: { fill: "0D1B2E", type: ShadingType.CLEAR },
        indent: { left: 200, right: 200 },
        children: [new TextRun({ text: line || " ", size: 18, font: "Courier New", color: line.includes("/*") ? SLATE : line.includes(":") ? (line.trim().startsWith("--color") ? ACCENT : line.trim().startsWith("--font") ? GOLD : OFF_WH) : GRAY })]
      })),

      divider(),

      // ── SECTION 9: DESIGN DOS & DON'TS ──────────────────────────────
      h1("9. Design Do\u2019s & Don\u2019ts"),

      h2("9.1 Do\u2019s \u2014 Steal These from the References"),
      bullet("DO use teal (#64FFDA) sparingly as a true accent \u2014 links, numbers, borders only. Brittany never fills large areas with it."),
      bullet("DO left-align the hero. Centered hero text feels generic; left-aligned feels editorial and confident."),
      bullet("DO use monospace font for small labels, tech stack tags, section numbers, and metadata. It signals \u2018developer\u2019."),
      bullet("DO number your sections (01. About, 02. Skills) \u2014 it is Brittany\u2019s most copied design signature for good reason."),
      bullet("DO add hover micro-interactions to EVERY interactive element \u2014 Victor\u2019s site feels alive because nothing is inert."),
      bullet("DO use card translateY(-4px) on hover \u2014 the universal dev portfolio hover cue. Instant polish."),
      bullet("DO keep body text at #8892B0 slate on dark bg \u2014 not white. Pure white body copy causes eye strain on dark backgrounds."),
      bullet("DO include the \u2018Made with love by Pragati\u2019 footer line \u2014 Adeola has it; it humanizes the page."),

      spacer(80),
      h2("9.2 Don\u2019ts \u2014 Avoid These Pitfalls"),
      bullet("DON\u2019T use light mode. All three references are dark. It\u2019s the developer portfolio standard and Pragati\u2019s tagline demands impact."),
      bullet("DON\u2019T use skill progress bars (e.g. \u201CPython: 80%\u201D). Nobody knows what 80% means. Use tags instead."),
      bullet("DON\u2019T center-align all text. Only the footer and hero quote are center-aligned. Everything else: left."),
      bullet("DON\u2019T use too many accent colors \u2014 teal + gold is the limit. Adding red or purple dilutes the brand."),
      bullet("DON\u2019T use stock illustrations. The three reference sites use zero stock art. Real screenshots, custom SVGs, or nothing."),
      bullet("DON\u2019T animate too aggressively on load. Adeola can get away with heavy motion; as a first-time portfolio, keep it under 800ms total."),
      bullet("DON\u2019T forget keyboard navigation and focus states. Use teal outline on focus \u2014 it matches the accent and passes WCAG AA."),

      divider(),

      // ── SECTION 10: IMPLEMENTATION NOTES ────────────────────────────
      h1("10. Implementation Recommendations"),
      new Table({
        width: { size: 9360, type: WidthType.DXA }, columnWidths: [2800, 6560],
        rows: [
          labelRow("Stack",          "Next.js 14 (App Router) + Tailwind CSS v3 + Framer Motion"),
          labelRow("Deployment",     "Vercel (free; all three references are on Vercel)"),
          labelRow("Fonts",          "next/font with Google Fonts: Inter + JetBrains Mono"),
          labelRow("Icons",          "react-icons (Fi set for links; Si set for tech stack logos)"),
          labelRow("Animation",      "Framer Motion for scroll-triggered reveals; CSS transitions for hover"),
          labelRow("3D / Canvas",    "Optional: Three.js for subtle hero background geometry (low poly/particles)"),
          labelRow("Content Source", "Local JS/TS data files (projects.ts, experience.ts, skills.ts) \u2014 easy to update"),
          labelRow("Domain",         "Consider pragati.dev or pragati.codes (short, memorable, professional)"),
          labelRow("Analytics",      "Vercel Analytics (privacy-first, no cookie banner needed)"),
          labelRow("SEO",            "next-seo + og:image with design matching site palette"),
        ]
      }),

      spacer(200),

      // ── CLOSING BLOCK ────────────────────────────────────────────────
      new Paragraph({
        spacing: { before: 0, after: 0 },
        shading: { fill: NAVY, type: ShadingType.CLEAR },
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "\u2728  Designed for Pragati  \u2728", bold: true, size: 28, color: GOLD, font: "Georgia" })]
      }),
      new Paragraph({
        spacing: { before: 0, after: 0 },
        shading: { fill: NAVY, type: ShadingType.CLEAR },
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "A portfolio worthy of the cover it promises.", size: 22, color: SLATE, font: "Calibri", italics: true })]
      }),
      new Paragraph({
        spacing: { before: 0, after: 0 },
        shading: { fill: NAVY, type: ShadingType.CLEAR },
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "\u00A9 2026 Pragati \u2022 All rights reserved \u2022 Design Doc v1.0", size: 18, color: GRAY, font: "Calibri" })]
      }),

    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/mnt/user-data/outputs/Pragati_Portfolio_Design_Doc.docx", buffer);
  console.log("Done!");
});