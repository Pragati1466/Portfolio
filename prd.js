const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageNumber, ExternalHyperlink,
  LevelFormat, TabStopType, TabStopPosition
} = require('docx');
const fs = require('fs');

const BRAND = "1E3A5F";
const ACCENT = "E84855";
const GOLD = "C9A84C";
const LIGHT = "F0F4FA";
const MID = "4A7FA5";
const GRAY = "6B7280";
const WHITE = "FFFFFF";
const DARK = "111827";

const border = { style: BorderStyle.SINGLE, size: 1, color: "D1D5DB" };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: ACCENT, space: 6 } },
    children: [new TextRun({ text, bold: true, size: 36, color: BRAND, font: "Georgia" })]
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

function bullet(text, sub = false) {
  return new Paragraph({
    numbering: { reference: "bullets", level: sub ? 1 : 0 },
    spacing: { before: 30, after: 30 },
    children: [new TextRun({ text, size: 21, color: DARK, font: "Calibri" })]
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

function tag(text) {
  return new TableCell({
    borders: { top: { style: BorderStyle.SINGLE, size: 2, color: MID }, bottom: { style: BorderStyle.SINGLE, size: 2, color: MID }, left: { style: BorderStyle.SINGLE, size: 2, color: MID }, right: { style: BorderStyle.SINGLE, size: 2, color: MID } },
    shading: { fill: LIGHT, type: ShadingType.CLEAR },
    margins: { top: 40, bottom: 40, left: 80, right: 80 },
    children: [new Paragraph({ children: [new TextRun({ text, size: 18, color: MID, font: "Calibri", bold: true })] })]
  });
}

function labelValueRow(label, value) {
  return new TableRow({
    children: [
      new TableCell({
        width: { size: 2800, type: WidthType.DXA },
        borders: noBorders,
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 60, bottom: 60, left: 120, right: 120 },
        children: [new Paragraph({ children: [new TextRun({ text: label, bold: true, size: 20, color: BRAND, font: "Calibri" })] })]
      }),
      new TableCell({
        width: { size: 6560, type: WidthType.DXA },
        borders: noBorders,
        margins: { top: 60, bottom: 60, left: 120, right: 120 },
        children: [new Paragraph({ children: [new TextRun({ text: value, size: 20, color: DARK, font: "Calibri" })] })]
      })
    ]
  });
}

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
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 36, bold: true, font: "Georgia", color: BRAND }, paragraph: { spacing: { before: 400, after: 120 }, outlineLevel: 0 } },
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
            border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT, space: 4 } },
            children: [
              new TextRun({ text: "PRAGATI  |  PORTFOLIO PRD", bold: true, size: 18, color: WHITE, font: "Calibri" }),
              new TextRun({ text: "    Product Requirements Document  v1.0  |  May 2026", size: 16, color: "CCCCCC", font: "Calibri" }),
            ],
            shading: { fill: BRAND, type: ShadingType.CLEAR },
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
              new TextRun({ text: "Pragati \u2022 Personal Portfolio PRD", size: 16, color: GRAY, font: "Calibri" }),
              new TextRun({ text: "\tPage ", size: 16, color: GRAY, font: "Calibri" }),
              new PageNumber(),
            ]
          })
        ]
      })
    },
    children: [

      // ─── COVER ───
      new Paragraph({
        spacing: { before: 200, after: 0 },
        shading: { fill: BRAND, type: ShadingType.CLEAR },
        children: [new TextRun({ text: "PRODUCT REQUIREMENTS DOCUMENT", bold: true, size: 28, color: GOLD, font: "Calibri", allCaps: true })]
      }),
      new Paragraph({
        spacing: { before: 0, after: 0 },
        shading: { fill: BRAND, type: ShadingType.CLEAR },
        children: [new TextRun({ text: "Personal Portfolio Website", bold: true, size: 52, color: WHITE, font: "Georgia" })]
      }),
      new Paragraph({
        spacing: { before: 0, after: 0 },
        shading: { fill: BRAND, type: ShadingType.CLEAR },
        children: [new TextRun({ text: "Pragati  \u2014  Visual Identity + Career Showcase", size: 24, color: "B0C4DE", font: "Calibri", italics: true })]
      }),
      new Paragraph({
        spacing: { before: 60, after: 0 },
        shading: { fill: BRAND, type: ShadingType.CLEAR },
        children: [new TextRun({ text: "\u201CA designer who judges a book by its cover \u2014 because if the cover does not impress, what else can.\u201D", size: 20, color: GOLD, font: "Georgia", italics: true })]
      }),
      new Paragraph({
        spacing: { before: 60, after: 200 },
        shading: { fill: BRAND, type: ShadingType.CLEAR },
        children: [
          new TextRun({ text: "Version 1.0  \u2022  May 2026  \u2022  Confidential  \u2022  Prepared for: Pragati", size: 18, color: "8EB4D4", font: "Calibri" })
        ]
      }),

      divider(),

      // ─── METADATA TABLE ───
      h1("Document Overview"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2800, 6560],
        rows: [
          labelValueRow("Document Title", "Pragati \u2014 Personal Portfolio Website"),
          labelValueRow("Version", "1.0"),
          labelValueRow("Date", "May 2026"),
          labelValueRow("Owner", "Pragati"),
          labelValueRow("Status", "Draft \u2014 Ready for Development"),
          labelValueRow("Primary Audience", "HRs, Recruiters, Colleagues, Tech Community, General Visitors"),
          labelValueRow("Theme Direction", "TBD (see Section 5) \u2014 Unique, high-impact, fast, navigable"),
          labelValueRow("Core Tagline", "\u201CA designer who judges a book by its cover\u201D"),
        ]
      }),

      divider(),

      // ─── 1. EXECUTIVE SUMMARY ───
      h1("1. Executive Summary"),
      body("This document defines the full product requirements for Pragati\u2019s personal portfolio website. The portfolio is a digital career identity \u2014 a living, interactive resume that communicates Pragati\u2019s skills, personality, and professional value at a glance."),
      spacer(80),
      body("The site must make an unforgettable first impression while remaining fast, accessible, and easy to navigate. It will serve as the single source of truth for Pragati\u2019s professional identity \u2014 shared with recruiters, HR professionals, colleagues, and the broader tech community."),
      spacer(80),
      body("The design philosophy is expressed in Pragati\u2019s own words:", { italic: true }),
      new Paragraph({
        spacing: { before: 100, after: 100 },
        indent: { left: 720, right: 720 },
        border: { left: { style: BorderStyle.SINGLE, size: 12, color: ACCENT, space: 8 } },
        children: [new TextRun({ text: "\u201CA designer who judges a book by its cover \u2014 because if the cover does not impress, what else can.\u201D", size: 24, color: BRAND, font: "Georgia", italics: true, bold: true })]
      }),
      body("Every design and engineering decision must serve this principle: impress immediately, then deliver substance."),

      divider(),

      // ─── 2. GOALS ───
      h1("2. Goals"),
      h2("2.1 Business Goals"),
      bullet("Establish a strong, memorable online presence for Pragati as a professional and creator."),
      bullet("Differentiate from standard resume formats by delivering an interactive, visually rich experience."),
      bullet("Drive recruiter and HR interest \u2014 leading to internship, job, or collaboration opportunities."),
      bullet("Serve as a living document: easily updated with new projects, achievements, and certifications."),
      bullet("Reinforce Pragati\u2019s personal brand as someone who values design, craft, and attention to detail."),

      spacer(80),
      h2("2.2 User Experience Goals"),
      bullet("A visitor should understand who Pragati is within 5 seconds of landing on the page."),
      bullet("All key sections must be reachable within 2 clicks from anywhere on the site."),
      bullet("The site must load in under 2 seconds on a standard broadband connection."),
      bullet("Navigation must be intuitive for non-technical visitors (family, HR generalists, business stakeholders)."),
      bullet("Mobile experience must be equivalent in quality to desktop."),

      spacer(80),
      h2("2.3 Design Goals"),
      bullet("Create a visual identity that is instantly recognizable as Pragati\u2019s \u2014 not generic."),
      bullet("Use a unique theme (conceptual direction TBD) that is cohesive and purposeful."),
      bullet("Typography, color palette, motion, and layout must feel intentional and distinctive."),
      bullet("Every section should feel like it was designed, not templated."),

      divider(),

      // ─── 3. TARGET USERS ───
      h1("3. Target Users"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2200, 3580, 3580],
        rows: [
          new TableRow({
            children: [
              new TableCell({ borders, shading: { fill: BRAND, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, width: { size: 2200, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "User Type", bold: true, size: 20, color: WHITE, font: "Calibri" })] })] }),
              new TableCell({ borders, shading: { fill: BRAND, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, width: { size: 3580, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Primary Need", bold: true, size: 20, color: WHITE, font: "Calibri" })] })] }),
              new TableCell({ borders, shading: { fill: BRAND, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, width: { size: 3580, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Success Signal", bold: true, size: 20, color: WHITE, font: "Calibri" })] })] }),
            ]
          }),
          ...[
            ["HR / Recruiter", "Quickly assess skills, experience & culture fit", "Shares profile or schedules a call"],
            ["Hiring Manager / Company", "Evaluate depth of projects & technical range", "Downloads resume or sends a message"],
            ["Colleagues / Peers", "Know Pragati better; discover shared interests", "Connects on LinkedIn or GitHub"],
            ["Academic Contacts", "Review publications, certifications, education", "Cites work or reaches out to collaborate"],
            ["General Visitor", "Understand who Pragati is and what she does", "Explores at least 3 sections"],
          ].map(([type, need, signal]) =>
            new TableRow({
              children: [
                new TableCell({ borders, margins: { top: 70, bottom: 70, left: 120, right: 120 }, width: { size: 2200, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: type, bold: true, size: 19, color: BRAND, font: "Calibri" })] })] }),
                new TableCell({ borders, margins: { top: 70, bottom: 70, left: 120, right: 120 }, width: { size: 3580, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: need, size: 19, color: DARK, font: "Calibri" })] })] }),
                new TableCell({ borders, margins: { top: 70, bottom: 70, left: 120, right: 120 }, width: { size: 3580, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: signal, size: 19, color: DARK, font: "Calibri" })] })] }),
              ]
            })
          )
        ]
      }),

      divider(),

      // ─── 4. USER STORIES ───
      h1("4. User Stories"),
      h2("4.1 Identity & First Impression"),
      bullet("As an HR visiting the site for the first time, I want to immediately know Pragati\u2019s name, role, and personality so I can decide if she\u2019s worth exploring further."),
      bullet("As any visitor, I want to read Pragati\u2019s personal tagline so I understand her design philosophy and creative mindset."),
      bullet("As a recruiter, I want a clear call-to-action (email, LinkedIn, resume download) so I can reach out without effort."),

      spacer(60),
      h2("4.2 About & Background"),
      bullet("As a hiring manager, I want to read a concise \u2018About Me\u2019 summary so I can understand Pragati\u2019s background and personality."),
      bullet("As an academic contact, I want to see Pragati\u2019s education details so I know her qualifications and institutions."),

      spacer(60),
      h2("4.3 Skills"),
      bullet("As a technical recruiter, I want to see Pragati\u2019s skills displayed visually (her \u2018Skill Sketchpad\u2019) so I can quickly assess her tech stack."),
      bullet("As a non-technical HR, I want skills categorized clearly so I don\u2019t need domain knowledge to evaluate them."),

      spacer(60),
      h2("4.4 Experience"),
      bullet("As a hiring manager, I want to browse Pragati\u2019s internship experience with role, company, dates, and key contributions so I can gauge professional maturity."),
      bullet("As a colleague, I want to see what Pragati worked on so I can identify common ground or potential collaboration."),

      spacer(60),
      h2("4.5 Projects"),
      bullet("As a technical recruiter, I want to browse Pragati\u2019s projects with tech stack tags and links (GitHub / live demo) so I can verify real-world application of her skills."),
      bullet("As any visitor, I want project cards to be visually distinct and easy to scan so I don\u2019t need to read every word."),

      spacer(60),
      h2("4.6 Achievements"),
      bullet("As a recruiter, I want to see Pragati\u2019s achievements (hackathons, competitions, honors) so I can gauge her initiative and recognition."),

      spacer(60),
      h2("4.7 Publications & Certifications"),
      bullet("As an academic or industry contact, I want to see Pragati\u2019s published work and certifications so I can assess her domain credibility."),
      bullet("As any visitor, I want certifications linked to the issuing authority so I can verify them."),

      spacer(60),
      h2("4.8 Connect & Footer"),
      bullet("As any visitor, I want a footer with Pragati\u2019s GitHub, LinkedIn, Gmail, and LeetCode so I have all contact/profile links in one place."),
      bullet("As a visitor who scrolled to the bottom, I want to see a warm, personal \u2018Made with love by Pragati\u2019 note and copyright information."),

      divider(),

      // ─── 5. FEATURE LIST ───
      h1("5. Feature List"),
      h2("5.1 Section Inventory"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [3000, 1400, 4960],
        rows: [
          new TableRow({
            children: [
              new TableCell({ borders, shading: { fill: BRAND, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Section", bold: true, size: 20, color: WHITE, font: "Calibri" })] })] }),
              new TableCell({ borders, shading: { fill: BRAND, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, width: { size: 1400, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Priority", bold: true, size: 20, color: WHITE, font: "Calibri" })] })] }),
              new TableCell({ borders, shading: { fill: BRAND, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, width: { size: 4960, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Key Contents", bold: true, size: 20, color: WHITE, font: "Calibri" })] })] }),
            ]
          }),
          ...[
            ["Hero / Landing", "P0 \u2013 Critical", "Name, tagline/quote, animated intro, CTA buttons (GitHub, LinkedIn, Email, Resume)"],
            ["About Me", "P0 \u2013 Critical", "Personal summary paragraph, photo/avatar, personality snapshot"],
            ["Education", "P0 \u2013 Critical", "Degree, institution, year, relevant coursework or honors"],
            ["Skill Sketchpad", "P0 \u2013 Critical", "Visual skill display (tags, bars, or illustrated layout); categorized by domain"],
            ["Experience / Internships", "P0 \u2013 Critical", "Role, company, duration, bullet-point contributions per internship"],
            ["Projects", "P0 \u2013 Critical", "Project cards: name, description, tech stack, GitHub link, live demo link"],
            ["Achievements", "P1 \u2013 High", "Hackathons, competitions, honors, rankings with context"],
            ["Publications & Certifications", "P1 \u2013 High", "Paper titles / cert names, issuing body, date, link to verify"],
            ["Footer", "P0 \u2013 Critical", "LeetCode, Gmail, GitHub, LinkedIn icons; copyright; \u2018Made with love by Pragati\u2019"],
          ].map(([section, priority, contents], i) =>
            new TableRow({
              children: [
                new TableCell({ borders, shading: { fill: i % 2 === 0 ? WHITE : LIGHT, type: ShadingType.CLEAR }, margins: { top: 70, bottom: 70, left: 120, right: 120 }, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: section, bold: true, size: 19, color: BRAND, font: "Calibri" })] })] }),
                new TableCell({ borders, shading: { fill: i % 2 === 0 ? WHITE : LIGHT, type: ShadingType.CLEAR }, margins: { top: 70, bottom: 70, left: 120, right: 120 }, width: { size: 1400, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: priority.includes("P0") ? priority : priority, size: 18, color: priority.includes("P0") ? ACCENT : GOLD, font: "Calibri", bold: true })] })] }),
                new TableCell({ borders, shading: { fill: i % 2 === 0 ? WHITE : LIGHT, type: ShadingType.CLEAR }, margins: { top: 70, bottom: 70, left: 120, right: 120 }, width: { size: 4960, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: contents, size: 18, color: DARK, font: "Calibri" })] })] }),
              ]
            })
          )
        ]
      }),

      spacer(160),
      h2("5.2 Navigation Features"),
      bullet("Sticky top navigation bar with smooth-scroll to each section."),
      bullet("Active state indicator on nav item for the currently visible section."),
      bullet("Mobile hamburger menu with smooth open/close animation."),
      bullet("Back-to-top button appearing after scrolling past the hero section."),
      bullet("Section progress indicator (optional: dot navigation on the side)."),

      spacer(80),
      h2("5.3 Performance Features"),
      bullet("Target Lighthouse score: Performance \u2265 90, Accessibility \u2265 90, Best Practices \u2265 90."),
      bullet("All images: WebP format with lazy loading and explicit width/height attributes."),
      bullet("Fonts loaded with font-display: swap to prevent layout shift."),
      bullet("CSS and JS minified; critical CSS inlined."),
      bullet("No third-party scripts unless essential (no analytics trackers without opt-in)."),
      bullet("First Contentful Paint (FCP) target: under 1.2s on broadband."),

      spacer(80),
      h2("5.4 Uniqueness / Theme Features"),
      body("The following conceptual directions are proposed. The final choice should reflect Pragati\u2019s personality:"),
      spacer(60),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2400, 4400, 2560],
        rows: [
          new TableRow({
            children: [
              new TableCell({ borders, shading: { fill: BRAND, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, width: { size: 2400, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Theme Option", bold: true, size: 20, color: WHITE, font: "Calibri" })] })] }),
              new TableCell({ borders, shading: { fill: BRAND, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, width: { size: 4400, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Description", bold: true, size: 20, color: WHITE, font: "Calibri" })] })] }),
              new TableCell({ borders, shading: { fill: BRAND, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, width: { size: 2560, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Best Fit For", bold: true, size: 20, color: WHITE, font: "Calibri" })] })] }),
            ]
          }),
          ...[
            ["Dark Studio / Atelier", "Rich dark background, editorial layout, ink-like animations. Feels like a design studio portfolio.", "Design + Dev hybrid"],
            ["Blueprint / Architect", "Blueprint paper texture, technical grid lines, handwritten-style annotations. Very unique.", "Engineers who are visual"],
            ["Illustrated Universe", "Custom hand-drawn or SVG illustration for each section. Narrative journey feel.", "Creative technologists"],
            ["Celestial / Cosmos", "Deep space palette, star animations, sections as planets or constellations.", "STEM + creative blend"],
            ["Minimal Type-Forward", "Black and white, massive typography, razor-thin lines. Bold restraint.", "All audiences"],
          ].map(([theme, desc, fit], i) =>
            new TableRow({
              children: [
                new TableCell({ borders, shading: { fill: i % 2 === 0 ? WHITE : LIGHT, type: ShadingType.CLEAR }, margins: { top: 70, bottom: 70, left: 120, right: 120 }, width: { size: 2400, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: theme, bold: true, size: 19, color: BRAND, font: "Calibri" })] })] }),
                new TableCell({ borders, shading: { fill: i % 2 === 0 ? WHITE : LIGHT, type: ShadingType.CLEAR }, margins: { top: 70, bottom: 70, left: 120, right: 120 }, width: { size: 4400, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: desc, size: 18, color: DARK, font: "Calibri" })] })] }),
                new TableCell({ borders, shading: { fill: i % 2 === 0 ? WHITE : LIGHT, type: ShadingType.CLEAR }, margins: { top: 70, bottom: 70, left: 120, right: 120 }, width: { size: 2560, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: fit, size: 18, color: MID, font: "Calibri", italics: true })] })] }),
              ]
            })
          )
        ]
      }),

      divider(),

      // ─── 6. NON-FUNCTIONAL REQUIREMENTS ───
      h1("6. Non-Functional Requirements"),

      h2("6.1 Performance"),
      bullet("Page load time: < 2 seconds (LCP) on 4G mobile connection."),
      bullet("Zero layout shift (CLS score < 0.1)."),
      bullet("Total page weight: under 1.5 MB uncompressed."),

      spacer(60),
      h2("6.2 Accessibility"),
      bullet("WCAG 2.1 Level AA compliance."),
      bullet("All images must have descriptive alt text."),
      bullet("Color contrast ratio: minimum 4.5:1 for normal text, 3:1 for large text."),
      bullet("Full keyboard navigability."),
      bullet("Screen reader compatible structure (semantic HTML5)."),

      spacer(60),
      h2("6.3 Responsiveness"),
      bullet("Breakpoints: Mobile (< 768px), Tablet (768px\u20131024px), Desktop (> 1024px)."),
      bullet("All interactions, animations, and layouts must work across all breakpoints."),
      bullet("Touch-friendly tap targets: minimum 44px \u00D7 44px."),

      spacer(60),
      h2("6.4 Browser Compatibility"),
      bullet("Chrome, Firefox, Safari, Edge \u2014 latest 2 versions."),
      bullet("Safari on iOS 15+ must be explicitly tested (CSS animations can behave differently)."),

      spacer(60),
      h2("6.5 Maintainability"),
      bullet("Content (bio, skills, projects, etc.) should be editable without touching layout code."),
      bullet("Ideally driven by a simple data file (JSON / JS object) or CMS for non-technical updates."),
      bullet("Well-commented code with a README for future modifications."),

      divider(),

      // ─── 7. CONTENT REQUIREMENTS ───
      h1("7. Content Requirements"),
      body("The following content must be provided by Pragati before or during development. Placeholder text must not appear in any production-ready version."),
      spacer(80),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [3200, 2800, 3360],
        rows: [
          new TableRow({
            children: [
              new TableCell({ borders, shading: { fill: BRAND, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, width: { size: 3200, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Content Item", bold: true, size: 20, color: WHITE, font: "Calibri" })] })] }),
              new TableCell({ borders, shading: { fill: BRAND, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, width: { size: 2800, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Format / Length", bold: true, size: 20, color: WHITE, font: "Calibri" })] })] }),
              new TableCell({ borders, shading: { fill: BRAND, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, width: { size: 3360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Status", bold: true, size: 20, color: WHITE, font: "Calibri" })] })] }),
            ]
          }),
          ...[
            ["Full Name + Designation/Role", "Text, 1 line", "Needed from Pragati"],
            ["Personal Tagline / Quote", "1\u20132 sentences", "Confirmed: \u201CA designer who judges...\u201D"],
            ["About Me Bio", "150\u2013250 words", "Needed from Pragati"],
            ["Profile Photo / Avatar", "Square, min 400\u00D7400px", "Needed from Pragati"],
            ["Education: Degree, Institution, Year", "Per entry: 2\u20134 lines", "Needed from Pragati"],
            ["Skills List (with categories)", "Grouped tags", "Needed from Pragati"],
            ["Internship Details (2\u20135 entries)", "Role, company, dates, bullets", "Needed from Pragati"],
            ["Project Details (3\u20138 projects)", "Name, description, stack, links", "Needed from Pragati"],
            ["Achievements (3\u2013 items)", "Title, context, year", "Needed from Pragati"],
            ["Publications (if any)", "Title, venue, year, URL", "Needed from Pragati"],
            ["Certifications (3\u2013 items)", "Name, issuer, date, URL", "Needed from Pragati"],
            ["GitHub URL", "Link", "Needed from Pragati"],
            ["LinkedIn URL", "Link", "Needed from Pragati"],
            ["Gmail Address", "Email", "Needed from Pragati"],
            ["LeetCode URL", "Link", "Needed from Pragati"],
          ].map(([item, format, status], i) =>
            new TableRow({
              children: [
                new TableCell({ borders, shading: { fill: i % 2 === 0 ? WHITE : LIGHT, type: ShadingType.CLEAR }, margins: { top: 60, bottom: 60, left: 120, right: 120 }, width: { size: 3200, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: item, size: 18, bold: true, color: DARK, font: "Calibri" })] })] }),
                new TableCell({ borders, shading: { fill: i % 2 === 0 ? WHITE : LIGHT, type: ShadingType.CLEAR }, margins: { top: 60, bottom: 60, left: 120, right: 120 }, width: { size: 2800, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: format, size: 18, color: GRAY, font: "Calibri", italics: true })] })] }),
                new TableCell({ borders, shading: { fill: i % 2 === 0 ? WHITE : LIGHT, type: ShadingType.CLEAR }, margins: { top: 60, bottom: 60, left: 120, right: 120 }, width: { size: 3360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: status, size: 18, color: status.includes("Confirmed") ? "16A34A" : GOLD, font: "Calibri", bold: true })] })] }),
              ]
            })
          )
        ]
      }),

      divider(),

      // ─── 8. SUCCESS METRICS ───
      h1("8. Success Metrics"),
      body("Success will be measured across three dimensions: performance, engagement, and professional outcome."),

      spacer(80),
      h2("8.1 Technical Performance Metrics"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [3600, 2880, 2880],
        rows: [
          new TableRow({
            children: [
              new TableCell({ borders, shading: { fill: BRAND, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, width: { size: 3600, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Metric", bold: true, size: 20, color: WHITE, font: "Calibri" })] })] }),
              new TableCell({ borders, shading: { fill: BRAND, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, width: { size: 2880, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Target", bold: true, size: 20, color: WHITE, font: "Calibri" })] })] }),
              new TableCell({ borders, shading: { fill: BRAND, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, width: { size: 2880, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Measurement Tool", bold: true, size: 20, color: WHITE, font: "Calibri" })] })] }),
            ]
          }),
          ...[
            ["Lighthouse Performance Score", "\u2265 90 / 100", "Google Lighthouse"],
            ["Largest Contentful Paint (LCP)", "< 2.0 seconds", "Chrome DevTools / PageSpeed"],
            ["First Contentful Paint (FCP)", "< 1.2 seconds", "Chrome DevTools"],
            ["Cumulative Layout Shift (CLS)", "< 0.1", "Chrome DevTools"],
            ["Total Page Weight", "< 1.5 MB", "Chrome Network tab"],
            ["Mobile Usability Score", "100%", "Google Search Console"],
            ["Accessibility Score", "\u2265 90 / 100", "Lighthouse / axe DevTools"],
          ].map(([metric, target, tool], i) =>
            new TableRow({
              children: [
                new TableCell({ borders, shading: { fill: i % 2 === 0 ? WHITE : LIGHT, type: ShadingType.CLEAR }, margins: { top: 60, bottom: 60, left: 120, right: 120 }, width: { size: 3600, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: metric, size: 19, color: DARK, font: "Calibri" })] })] }),
                new TableCell({ borders, shading: { fill: i % 2 === 0 ? WHITE : LIGHT, type: ShadingType.CLEAR }, margins: { top: 60, bottom: 60, left: 120, right: 120 }, width: { size: 2880, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: target, size: 19, color: "16A34A", font: "Calibri", bold: true })] })] }),
                new TableCell({ borders, shading: { fill: i % 2 === 0 ? WHITE : LIGHT, type: ShadingType.CLEAR }, margins: { top: 60, bottom: 60, left: 120, right: 120 }, width: { size: 2880, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: tool, size: 18, color: GRAY, font: "Calibri", italics: true })] })] }),
              ]
            })
          )
        ]
      }),

      spacer(160),
      h2("8.2 User Engagement Metrics"),
      bullet("Average session duration: > 90 seconds (visitor reads multiple sections)."),
      bullet("Bounce rate: < 50% (visitors explore beyond the hero section)."),
      bullet("Social link click-through rate: > 15% of visitors click GitHub or LinkedIn."),
      bullet("Resume download rate: > 10% of recruiter / HR visitors."),
      bullet("Contact / email initiation rate: > 5% of all visitors."),

      spacer(80),
      h2("8.3 Design & First Impression Metrics"),
      bullet("Qualitative goal: 9 out of 10 people shown the site can correctly describe Pragati\u2019s field within 5 seconds."),
      bullet("Peer review: At least 3 colleagues or mentors rate the design 4/5 or above on visual impact."),
      bullet("No section should require scrolling or interaction to understand its purpose."),

      spacer(80),
      h2("8.4 Professional Outcome Metrics (30/60/90-day goals)"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [1800, 7560],
        rows: [
          new TableRow({ children: [
            new TableCell({ borders, shading: { fill: BRAND, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, width: { size: 1800, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Timeline", bold: true, size: 20, color: WHITE, font: "Calibri" })] })] }),
            new TableCell({ borders, shading: { fill: BRAND, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, width: { size: 7560, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Goal", bold: true, size: 20, color: WHITE, font: "Calibri" })] })] }),
          ]}),
          ...[
            ["30 days", "Site is live, all sections populated, Lighthouse score \u2265 90, shared with personal network."],
            ["60 days", "Site linked from LinkedIn profile, GitHub bio, and email signature. At least 50 unique visitors."],
            ["90 days", "At least 1 recruiter or company has proactively reached out after visiting the site."],
          ].map(([time, goal], i) => new TableRow({ children: [
            new TableCell({ borders, shading: { fill: i % 2 === 0 ? WHITE : LIGHT, type: ShadingType.CLEAR }, margins: { top: 70, bottom: 70, left: 120, right: 120 }, width: { size: 1800, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: time, bold: true, size: 19, color: BRAND, font: "Calibri" })] })] }),
            new TableCell({ borders, shading: { fill: i % 2 === 0 ? WHITE : LIGHT, type: ShadingType.CLEAR }, margins: { top: 70, bottom: 70, left: 120, right: 120 }, width: { size: 7560, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: goal, size: 19, color: DARK, font: "Calibri" })] })] }),
          ]}))
        ]
      }),

      divider(),

      // ─── 9. OPEN QUESTIONS ───
      h1("9. Open Questions & Next Steps"),
      h2("Decisions needed from Pragati before development begins:"),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "Which visual theme / aesthetic direction from Section 5.4? (or a new idea?)", size: 21, font: "Calibri", color: DARK })] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "Will this be a single HTML file, a React app, or a Next.js static site?", size: 21, font: "Calibri", color: DARK })] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "Is a custom domain needed? (e.g. pragati.dev) \u2014 or will it be hosted on GitHub Pages / Vercel?", size: 21, font: "Calibri", color: DARK })] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "Should there be a light/dark mode toggle?", size: 21, font: "Calibri", color: DARK })] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "Resume: linked PDF download, or rendered as an on-page section?", size: 21, font: "Calibri", color: DARK })] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "All resume content (bio, internships, projects, etc.) \u2014 to be shared so development can begin.", size: 21, font: "Calibri", color: DARK })] }),

      spacer(200),

      // ─── CLOSING ───
      new Paragraph({
        spacing: { before: 0, after: 0 },
        shading: { fill: BRAND, type: ShadingType.CLEAR },
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "\u2728  Made with love for Pragati  \u2728", bold: true, size: 28, color: GOLD, font: "Georgia" })]
      }),
      new Paragraph({
        spacing: { before: 0, after: 0 },
        shading: { fill: BRAND, type: ShadingType.CLEAR },
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Ready to build something unforgettable.", size: 22, color: "B0C4DE", font: "Calibri", italics: true })]
      }),
      new Paragraph({
        spacing: { before: 0, after: 0 },
        shading: { fill: BRAND, type: ShadingType.CLEAR },
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "\u00A9 2026 Pragati \u2022 All rights reserved \u2022 PRD v1.0", size: 18, color: "8EB4D4", font: "Calibri" })]
      }),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/mnt/user-data/outputs/Pragati_Portfolio_PRD.docx", buffer);
  console.log("Done!");
});