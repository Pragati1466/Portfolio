"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { portfolioData } from "@/data/content";

const roles = [
  "B.Tech Student @ IGDTUW",
  "Backend Developer",
  "Data Enthusiast",
  "ML Explorer",
];

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      style={{ width: 38, height: 38, borderRadius: "50%", border: "1.5px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-color)", transition: "all 0.25s", background: "var(--container-color)" }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--first-color)"; el.style.color = "var(--first-color)"; el.style.transform = "translateY(-3px)"; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border-color)"; el.style.color = "var(--text-color)"; el.style.transform = "translateY(0)"; }}>
      {children}
    </a>
  );
}

export default function Hero() {
  const { profile } = portfolioData;
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const target = roles[roleIdx];
    if (typing) {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 75);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2000);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
        return () => clearTimeout(t);
      } else {
        setRoleIdx(i => (i + 1) % roles.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, roleIdx]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: "5rem", paddingBottom: "3rem", position: "relative", overflow: "hidden" }}>
      {/* Soft bg blobs */}
      <div style={{ position: "absolute", top: "-100px", right: "-60px", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle, hsla(0,69%,61%,0.09) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "5%", left: "-80px", width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, hsla(0,69%,61%,0.06) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "4rem", alignItems: "center" }}>

          {/* ── Left: text ── */}
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
              <span className="section__tag">👋 Open to internships &amp; collabs</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }}
              style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 700, lineHeight: 1.15, marginTop: "0.9rem", marginBottom: "0.5rem" }}>
              Hi, I&apos;m{" "}
              <span style={{ color: "var(--first-color)", position: "relative" }}>
                {profile.name}
                <svg viewBox="0 0 200 12" style={{ position: "absolute", bottom: -6, left: 0, width: "100%", height: 10 }} preserveAspectRatio="none">
                  <path d="M0,8 Q50,0 100,8 Q150,16 200,8" fill="none" stroke="var(--first-color-light)" strokeWidth="2.5" />
                </svg>
              </span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.18 }}
              style={{ fontSize: "clamp(1rem, 2.2vw, 1.3rem)", fontWeight: 500, color: "var(--text-color)", marginBottom: "1.1rem", minHeight: "1.8rem", display: "flex", alignItems: "center", gap: "0.2rem" }}>
              <span style={{ color: "var(--first-color)" }}>{displayed}</span>
              <span className="cursor-blink" style={{ color: "var(--first-color)", fontWeight: 300, fontSize: "1.2em" }}>|</span>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.26 }}
              style={{ maxWidth: 500, lineHeight: 1.85, color: "var(--text-color)", marginBottom: "2rem", fontSize: "0.938rem" }}>
              4th year student who builds things, breaks things, and learns from both.
              I like understanding how systems actually work not just making them run.
              Backend, data pipelines, research that&apos;s where I spend most of my time.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.34 }}
              style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap", marginBottom: "2.2rem" }}>
              <button className="btn" onClick={() => scrollTo("contact")}>
                Let&apos;s Connect
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
              <button className="btn btn--ghost" onClick={() => scrollTo("projects")}>
                See My Work
              </button>
            </motion.div>

            {/* Socials */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              style={{ display: "flex", gap: "0.65rem", alignItems: "center" }}>
              <SocialLink href={profile.socials.linkedin} label="LinkedIn">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-1.657 0-3 1.343-3 3v18c0 1.657 1.343 3 3 3h14c1.657 0 3-1.343 3-3v-18c0-1.657-1.343-3-3-3zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.785-1.75-1.75s.784-1.75 1.75-1.75 1.75.785 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.5c0-1.378-.028-3.152-1.922-3.152-1.922 0-2.218 1.5-2.218 3.047v5.605h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.597 1.998 3.597 4.593v5.603z" /></svg>
              </SocialLink>
              <SocialLink href={profile.socials.github} label="GitHub">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.372 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.111.82-.261.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.763-1.605-2.665-.305-5.466-1.333-5.466-5.93 0-1.31.468-2.381 1.236-3.222-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.958-.266 1.984-.399 3.003-.404 1.02.005 2.046.138 3.006.404 2.29-1.552 3.295-1.23 3.295-1.23.655 1.653.243 2.873.12 3.176.77.841 1.235 1.913 1.235 3.222 0 4.61-2.804 5.625-5.476 5.921.43.372.814 1.102.814 2.222 0 1.606-.014 2.898-.014 3.293 0 .319.216.694.825.576C20.565 21.796 24 17.298 24 12 24 5.373 18.627 0 12 0z" /></svg>
              </SocialLink>
              <SocialLink href={profile.socials.leetcode} label="LeetCode">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" /></svg>
              </SocialLink>
              <SocialLink href={`mailto:${profile.email}`} label="Email">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              </SocialLink>
              <span style={{ width: 1, height: 22, background: "var(--border-color)", margin: "0 0.2rem" }} />
              <span style={{ fontSize: "0.75rem", color: "var(--text-color-light)" }}>📍 New Delhi</span>
            </motion.div>
          </div>

          {/* ── Right: avatar ── */}
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.25 }}
            className="hero-avatar-col"
            style={{ display: "none", flexShrink: 0, position: "relative", width: 280, height: 280 }}>
            {/* Spinning dashed ring */}
            <div className="animate-spin-slow" style={{ position: "absolute", inset: -18, borderRadius: "50%", border: "2px dashed var(--first-color-light)", pointerEvents: "none" }} />
            {/* Solid ring */}
            <div style={{ position: "absolute", inset: -6, borderRadius: "50%", border: "2px solid var(--first-color-bg)", pointerEvents: "none" }} />
            {/* Avatar image */}
            <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", border: "3px solid var(--first-color-light)", boxShadow: "0 12px 40px hsla(0,69%,61%,0.2)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/avatar.png" alt="Pragati" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
            </div>
            {/* Floating badge */}
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "absolute", bottom: 10, right: -20, background: "var(--container-color)", border: "1.5px solid var(--border-color)", borderRadius: "var(--radius-sm)", padding: "0.4rem 0.8rem", fontSize: "0.75rem", fontWeight: 600, color: "var(--title-color)", boxShadow: "var(--shadow-sm)", whiteSpace: "nowrap" }}>
              🎓 4th Year · IGDTUW
            </motion.div>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              style={{ position: "absolute", top: 20, left: -24, background: "var(--container-color)", border: "1.5px solid var(--border-color)", borderRadius: "var(--radius-sm)", padding: "0.4rem 0.8rem", fontSize: "0.75rem", fontWeight: 600, color: "var(--title-color)", boxShadow: "var(--shadow-sm)", whiteSpace: "nowrap" }}>
              ⚡ CGPA 9.13
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          style={{ marginTop: "3rem" }}>
          <button onClick={() => scrollTo("about")}
            style={{ background: "none", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--text-color-light)", fontSize: "0.813rem", fontFamily: "var(--body-font)" }}>
            <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
            </motion.span>
            scroll to explore
          </button>
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 768px) { .hero-avatar-col { display: block !important; } }
      `}</style>
    </section>
  );
}
