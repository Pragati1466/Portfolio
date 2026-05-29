"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { portfolioData } from "@/data/content";

const projectColors = [
  { bg: "linear-gradient(135deg, #ff6b6b18, #ff6b6b05)", accent: "#e05252", num: "01" },
  { bg: "linear-gradient(135deg, #4d96ff18, #4d96ff05)", accent: "#3a7bd5", num: "02" },
  { bg: "linear-gradient(135deg, #6bcb7718, #6bcb7705)", accent: "#3aaa5c", num: "03" },
];

export default function Projects() {
  const { projects } = portfolioData;
  const [active, setActive] = useState(0);
  const project = projects[active];
  const colors = projectColors[active % projectColors.length];

  return (
    <section id="projects" className="section">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="section__tag">Projects</span>
          <h2 className="section__title" style={{ marginTop: "0.5rem" }}>Things I&apos;ve Built</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }}>
          {/* Left: project list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {projects.map((p, i) => {
              const c = projectColors[i % projectColors.length];
              const isActive = i === active;
              return (
                <motion.button key={p.title} onClick={() => setActive(i)}
                  whileHover={{ x: 4 }}
                  style={{
                    display: "flex", alignItems: "center", gap: "1rem",
                    padding: "1rem 1.25rem", borderRadius: "var(--radius-md)",
                    border: `1.5px solid ${isActive ? c.accent : "var(--border-color)"}`,
                    background: isActive ? `${c.accent}12` : "var(--container-color)",
                    cursor: "pointer", textAlign: "left", fontFamily: "var(--body-font)",
                    transition: "all 0.25s", boxShadow: isActive ? `0 4px 16px ${c.accent}22` : "var(--shadow-sm)",
                  }}>
                  <span style={{ fontSize: "1.5rem", fontWeight: 800, color: isActive ? c.accent : "var(--border-color)", fontFamily: "monospace", lineHeight: 1, minWidth: 32 }}>
                    {c.num}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.938rem", fontWeight: 600, color: isActive ? "var(--title-color)" : "var(--text-color)" }}>{p.title}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-color-light)", marginTop: "0.2rem" }}>
                      {p.techStack.slice(0, 3).join(" · ")}
                    </div>
                  </div>
                  {isActive && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c.accent} strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Right: project detail */}
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}
              style={{ background: "var(--container-color)", borderRadius: "var(--radius-lg)", border: `1.5px solid ${colors.accent}30`, overflow: "hidden", boxShadow: `0 8px 32px ${colors.accent}18` }}>
              {/* Visual header */}
              <div style={{ background: colors.bg, padding: "2.5rem 2rem", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1.5px solid var(--border-color)", minHeight: 140 }}>
                <span style={{ fontSize: "5rem", fontWeight: 800, color: colors.accent, opacity: 0.15, fontFamily: "monospace", lineHeight: 1, userSelect: "none" }}>
                  {colors.num}
                </span>
                <div style={{ position: "absolute", fontSize: "2.5rem", fontWeight: 700, color: colors.accent }}>
                  {project.title.charAt(0)}
                </div>
              </div>

              <div style={{ padding: "1.5rem" }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--title-color)", marginBottom: "0.5rem" }}>{project.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-color)", lineHeight: 1.75, marginBottom: "1.25rem" }}>{project.description}</p>

                {/* Tech pills */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
                  {project.techStack.map(t => (
                    <span key={t} style={{ padding: "0.25rem 0.75rem", borderRadius: 99, fontSize: "0.75rem", fontWeight: 500, background: `${colors.accent}14`, color: colors.accent, border: `1px solid ${colors.accent}30` }}>{t}</span>
                  ))}
                </div>

                {/* Links */}
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn--sm btn--ghost">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.372 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.111.82-.261.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.763-1.605-2.665-.305-5.466-1.333-5.466-5.93 0-1.31.468-2.381 1.236-3.222-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.958-.266 1.984-.399 3.003-.404 1.02.005 2.046.138 3.006.404 2.29-1.552 3.295-1.23 3.295-1.23.655 1.653.243 2.873.12 3.176.77.841 1.235 1.913 1.235 3.222 0 4.61-2.804 5.625-5.476 5.921.43.372.814 1.102.814 2.222 0 1.606-.014 2.898-.014 3.293 0 .319.216.694.825.576C20.565 21.796 24 17.298 24 12 24 5.373 18.627 0 12 0z" /></svg>
                      Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn--sm">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #projects .container > div > div:last-child { display: none; }
          #projects .container > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
