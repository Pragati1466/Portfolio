import { useState } from "react";

const BRAND = "#1E3A5F";
const ACCENT = "#E84855";
const GOLD = "#C9A84C";
const MID = "#4A7FA5";
const LIGHT = "#F0F4FA";
const DARK = "#111827";
const GRAY = "#6B7280";

const stack = [
  {
    category: "Frontend Framework",
    icon: "⚛️",
    winner: "Next.js 15 (App Router)",
    badge: "Top Pick",
    badgeColor: ACCENT,
    why: "The PRD demands Lighthouse ≥ 90, FCP < 1.2s, and LCP < 2s. Next.js 15 with React Server Components delivers near-zero JS on static sections, automatic image optimisation (WebP + lazy loading built-in), and font subsetting via next/font — all PRD requirements met out-of-the-box.",
    alternatives: ["Astro 5 (if truly zero-JS needed)", "Vite + React SPA (simpler, but no SSG/ISR)"],
    tags: ["SSG / ISR", "App Router", "React 19", "Built-in Image Opt."],
    prd: "Lighthouse ≥ 90 · FCP < 1.2s · LCP < 2s"
  },
  {
    category: "Styling",
    icon: "🎨",
    winner: "Tailwind CSS v4 + CSS Modules for complex animations",
    badge: "Best Fit",
    badgeColor: MID,
    why: "Tailwind v4 (released early 2025) uses a native CSS engine — no build overhead, lightning-fast HMR. For the unique theme Pragati wants, CSS Modules alongside Tailwind allow bespoke keyframe animations and GPU-accelerated effects without class pollution. Zero runtime CSS-in-JS keeps CLS < 0.1.",
    alternatives: ["Panda CSS (zero-runtime CSS-in-JS)", "Plain CSS / PostCSS (max control)"],
    tags: ["Tailwind v4", "CSS Modules", "GPU Animations", "Zero Runtime"],
    prd: "CLS < 0.1 · Unique visual identity · Custom animations"
  },
  {
    category: "Animation",
    icon: "✨",
    winner: "Motion (formerly Framer Motion) v12",
    badge: "Top Pick",
    badgeColor: ACCENT,
    why: "Motion v12 ships a standalone browser bundle independent of React, supports View Transitions API natively, and has zero layout-shift guarantees. The PRD's theme options (Celestial, Illustrated Universe, Blueprint) all require complex entrance animations and scroll-driven reveals — Motion's timeline API handles this elegantly without janking the CLS score.",
    alternatives: ["GSAP (more powerful, larger bundle)", "CSS-only (lighter, less expressive)"],
    tags: ["View Transitions", "Scroll-driven", "Spring Physics", "SSR-safe"],
    prd: "Animated intro · Scroll reveals · Theme animations"
  },
  {
    category: "Backend / API",
    icon: "⚡",
    winner: "Next.js Route Handlers (Edge Runtime)",
    badge: "Keep it Simple",
    badgeColor: GOLD,
    why: "The PRD lists no backend features beyond a contact form and possibly a resume download. Spinning up a separate Node/Express or Hono server adds operational complexity with zero benefit for a portfolio. Next.js Edge Route Handlers run on Vercel's global edge network — contact form submission, email via Resend API, and any future dynamic feature are covered with a single codebase and < 10ms cold start.",
    alternatives: ["Hono.js (if separate API ever needed)", "tRPC (if TypeScript API grows)"],
    tags: ["Edge Runtime", "Co-located", "< 10ms Cold Start", "Zero Servers"],
    prd: "Contact form · Resume download · Maintainability"
  },
  {
    category: "Authentication",
    icon: "🔐",
    winner: "None required (or Clerk if CMS/admin added later)",
    badge: "Skip for Now",
    badgeColor: GRAY,
    why: "The PRD has no login-gated content. Auth adds bundle weight and complexity with zero user-facing value at launch. If Pragati later adds a password-protected admin panel to edit content without code, Clerk (2026's leading auth-as-a-service) integrates with Next.js App Router in ~15 minutes and handles OAuth, magic links, and session management out of the box.",
    alternatives: ["NextAuth v5 / Auth.js (open source)", "Supabase Auth (if using Supabase DB)"],
    tags: ["Not Required v1", "Clerk for v2", "OAuth Ready", "Magic Links"],
    prd: "No auth features in PRD — defer until needed"
  },
  {
    category: "Database / CMS",
    icon: "🗄️",
    winner: "Content layer: JSON / MDX files (v1) → Sanity.io (v2)",
    badge: "Best Fit",
    badgeColor: MID,
    why: "The PRD explicitly says content should be editable without touching layout code. For v1, a structured data/content.ts file (projects, skills, experience as typed JSON) achieves this with zero infrastructure cost. For v2, Sanity Studio is the 2026 gold standard for non-technical content editing — hosted CMS, live preview, and a free tier that covers a portfolio forever. No database server to maintain.",
    alternatives: ["Contentlayer (MDX-based)", "Notion as CMS (via API)", "Supabase (overkill for static content)"],
    tags: ["JSON v1", "Sanity v2", "No DB Server", "Non-tech Editable"],
    prd: "Content editable without layout code · CMS recommended"
  },
  {
    category: "Email (Contact Form)",
    icon: "📨",
    winner: "Resend + React Email",
    badge: "Top Pick",
    badgeColor: ACCENT,
    why: "Resend is the developer-first email API built for exactly this use case. React Email lets Pragati design the contact notification email in JSX — consistent with the rest of the stack. Free tier: 3,000 emails/month, more than enough. Setup time: ~20 minutes. The alternative (Nodemailer + SMTP) requires managing credentials and is increasingly blocked by spam filters.",
    alternatives: ["EmailJS (client-side, simpler)", "Formspree (no-code form service)"],
    tags: ["Resend API", "React Email", "Free Tier", "TypeSafe"],
    prd: "Contact / email initiation · > 5% of visitors"
  },
  {
    category: "Deployment & Hosting",
    icon: "🚀",
    winner: "Vercel",
    badge: "No Contest",
    badgeColor: ACCENT,
    why: "The PRD targets Lighthouse ≥ 90, < 2s LCP, and 50+ unique visitors in 60 days. Vercel is purpose-built for Next.js, deploys globally on 100+ edge nodes, provides automatic HTTPS, GitHub CI/CD on push, preview deployments for every branch, built-in Web Vitals dashboard, and a free Hobby tier that costs Pragati exactly ₹0. Custom domain support (pragati.dev) takes 5 minutes.",
    alternatives: ["Netlify (comparable, slightly less Next.js optimised)", "Cloudflare Pages (cheapest, growing fast)"],
    tags: ["Global Edge CDN", "Free Tier", "CI/CD on Push", "Web Vitals Dashboard"],
    prd: "GitHub Pages / Vercel hosting · Custom domain · 30-day launch goal"
  },
  {
    category: "Analytics",
    icon: "📊",
    winner: "Vercel Analytics + Umami (self-hosted or cloud)",
    badge: "Privacy-first",
    badgeColor: MID,
    why: "The PRD requires measuring bounce rate, session duration, and link click-through — but explicitly says 'no analytics trackers without opt-in.' Vercel Analytics tracks Core Web Vitals with zero cookies. Umami is open-source, GDPR-compliant, cookieless analytics that can be self-hosted on Railway for free or used via Umami Cloud. Both combined cover every engagement metric the PRD defines.",
    alternatives: ["Plausible.io (paid, beautiful UI)", "Google Analytics 4 (requires consent banner)"],
    tags: ["Cookieless", "GDPR Safe", "Bounce Rate", "Session Duration"],
    prd: "Bounce rate < 50% · Session > 90s · No trackers without opt-in"
  },
];

const summaryTable = [
  { layer: "Framework", choice: "Next.js 15", why: "Performance + SSG" },
  { layer: "Styling", choice: "Tailwind v4 + CSS Modules", why: "Speed + custom themes" },
  { layer: "Animation", choice: "Motion v12", why: "Scroll reveals, entrance anim." },
  { layer: "Backend", choice: "Next.js Edge Routes", why: "Zero infra, co-located" },
  { layer: "Auth", choice: "None (Clerk later)", why: "Not needed at launch" },
  { layer: "Database", choice: "JSON → Sanity.io", why: "Non-tech editable content" },
  { layer: "Email", choice: "Resend + React Email", why: "Simple, typed, free tier" },
  { layer: "Hosting", choice: "Vercel", why: "Purpose-built for Next.js" },
  { layer: "Analytics", choice: "Vercel + Umami", why: "GDPR-safe, all PRD metrics" },
];

export default function TechStack() {
  const [open, setOpen] = useState(null);

  return (
    <div style={{
      fontFamily: "'Georgia', serif",
      background: "#F8FAFC",
      minHeight: "100vh",
      padding: "0 0 80px 0",
      color: DARK,
    }}>
      {/* Header */}
      <div style={{
        background: BRAND,
        padding: "40px 40px 32px",
        borderBottom: `6px solid ${ACCENT}`,
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ fontSize: 11, color: GOLD, fontFamily: "Calibri, sans-serif", letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>
            Tech Stack Recommendation · May 2026
          </div>
          <h1 style={{ margin: 0, fontSize: 36, color: "#fff", fontWeight: "bold", lineHeight: 1.2 }}>
            Pragati's Portfolio
          </h1>
          <div style={{ fontSize: 18, color: "#B0C4DE", marginTop: 6, fontStyle: "italic", fontFamily: "Calibri, sans-serif" }}>
            Every choice justified against the PRD
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>

        {/* Summary table */}
        <div style={{ marginTop: 40, marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: MID, fontFamily: "Calibri, sans-serif", fontWeight: "bold", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>
            Quick Reference
          </div>
          <div style={{ borderRadius: 10, overflow: "hidden", border: `1px solid #E2E8F0`, boxShadow: "0 2px 16px rgba(30,58,95,0.07)" }}>
            {summaryTable.map((row, i) => (
              <div key={i} style={{
                display: "grid",
                gridTemplateColumns: "140px 1fr 1fr",
                background: i % 2 === 0 ? "#fff" : LIGHT,
                borderBottom: i < summaryTable.length - 1 ? "1px solid #E2E8F0" : "none",
                padding: "12px 20px",
                alignItems: "center",
                gap: 16,
              }}>
                <div style={{ fontSize: 12, color: BRAND, fontFamily: "Calibri, sans-serif", fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1 }}>{row.layer}</div>
                <div style={{ fontSize: 14, color: DARK, fontFamily: "Calibri, sans-serif", fontWeight: "600" }}>{row.choice}</div>
                <div style={{ fontSize: 13, color: GRAY, fontFamily: "Calibri, sans-serif", fontStyle: "italic" }}>{row.why}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed cards */}
        <div style={{ fontSize: 13, color: MID, fontFamily: "Calibri, sans-serif", fontWeight: "bold", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>
          Full Justification — click any card to expand
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {stack.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                onClick={() => setOpen(isOpen ? null : i)}
                style={{
                  background: "#fff",
                  borderRadius: 10,
                  border: isOpen ? `2px solid ${item.badgeColor}` : "2px solid #E2E8F0",
                  boxShadow: isOpen ? `0 4px 24px ${item.badgeColor}22` : "0 1px 4px rgba(0,0,0,0.05)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  overflow: "hidden",
                }}
              >
                {/* Card header */}
                <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px" }}>
                  <span style={{ fontSize: 22 }}>{item.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, color: GRAY, fontFamily: "Calibri, sans-serif", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 2 }}>
                      {item.category}
                    </div>
                    <div style={{ fontSize: 17, fontWeight: "bold", color: DARK, fontFamily: "Calibri, sans-serif" }}>
                      {item.winner}
                    </div>
                  </div>
                  <div style={{
                    fontSize: 11, fontWeight: "bold", color: "#fff",
                    background: item.badgeColor, borderRadius: 20,
                    padding: "4px 12px", fontFamily: "Calibri, sans-serif",
                    letterSpacing: 0.5, whiteSpace: "nowrap"
                  }}>
                    {item.badge}
                  </div>
                  <div style={{ fontSize: 18, color: GRAY, marginLeft: 8, transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                    ▾
                  </div>
                </div>

                {/* Expanded content */}
                {isOpen && (
                  <div style={{ padding: "0 20px 20px", borderTop: `1px solid #F0F4FA` }}>
                    {/* PRD link */}
                    <div style={{
                      background: LIGHT, borderRadius: 6, padding: "8px 14px",
                      marginTop: 14, marginBottom: 14, fontFamily: "Calibri, sans-serif",
                      fontSize: 12, color: MID, display: "flex", gap: 8, alignItems: "center"
                    }}>
                      <span style={{ fontWeight: "bold", color: BRAND }}>PRD Requirement:</span>
                      <span style={{ fontStyle: "italic" }}>{item.prd}</span>
                    </div>

                    {/* Justification */}
                    <p style={{ margin: "0 0 16px 0", fontSize: 14, lineHeight: 1.7, color: DARK, fontFamily: "Calibri, sans-serif" }}>
                      {item.why}
                    </p>

                    {/* Tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
                      {item.tags.map((t, j) => (
                        <span key={j} style={{
                          fontSize: 12, color: MID, background: LIGHT,
                          borderRadius: 4, padding: "3px 10px",
                          fontFamily: "Calibri, sans-serif", fontWeight: "bold",
                          border: `1px solid #C7D9EC`
                        }}>{t}</span>
                      ))}
                    </div>

                    {/* Alternatives */}
                    <div style={{ fontSize: 12, color: GRAY, fontFamily: "Calibri, sans-serif" }}>
                      <span style={{ fontWeight: "bold", color: DARK }}>Alternatives considered: </span>
                      {item.alternatives.join(" · ")}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div style={{
          marginTop: 48, background: BRAND, borderRadius: 12,
          padding: "28px 32px", textAlign: "center"
        }}>
          <div style={{ fontSize: 20, color: GOLD, fontWeight: "bold", fontFamily: "Georgia, serif", marginBottom: 8 }}>
            ✨ Made with love for Pragati ✨
          </div>
          <div style={{ fontSize: 14, color: "#B0C4DE", fontFamily: "Calibri, sans-serif", fontStyle: "italic" }}>
            This stack is entirely free to deploy, TypeScript-first, and built around every requirement in the PRD — from the 30-day launch goal to the 90-day recruiter outreach target.
          </div>
        </div>
      </div>
    </div>
  );
}