"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { portfolioData } from "@/data/content";

export default function About() {
  const { profile, education, experience, stats } = portfolioData;
  const [tab, setTab] = useState<"work" | "edu">("work");

  return (
    <section id="about" className="section">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="section__tag">About Me</span>
          <h2 className="section__title" style={{ marginTop: "0.5rem" }}>Who am I?</h2>
        </div>

        {/* Intro card */}
        <motion.div className="card"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          style={{ padding: "2rem", marginBottom: "2rem", borderLeft: "4px solid var(--first-color)" }}>
          <p style={{ lineHeight: 1.9, color: "var(--text-color)", fontSize: "0.938rem" }}>
            Hey! I&apos;m Pragati a 4th year B.Tech student at IGDTUW, studying ECE with AI.
            I genuinely enjoy building practical tech and understanding how systems work internally.
            I&apos;m more interested in <em>understanding things deeply</em> than just getting them done quickly.
          </p>
          <p style={{ lineHeight: 1.9, color: "var(--text-color)", fontSize: "0.938rem", marginTop: "1rem" }}>
            I have also been the <strong style={{ color: "var(--first-color)" }}>Technical Head at IEEE </strong> in college so I&apos;ve worked a lot in collaborative environments,
            coordinating with teams, handling technical responsibilities during events, mentoring juniors, and managing execution under deadlines.
            That experience improved my communication and ownership mindset a lot.
          </p>
          <p style={{ lineHeight: 1.9, color: "var(--text-color)", fontSize: "0.938rem", marginTop: "1rem" }}>
            Recently I also <strong style={{ color: "var(--title-color)" }}>co-authored a research paper</strong> on cybersecurity in autonomous vehicles
            that got accepted at Springer ICICC 2025 which pushed me to explore things beyond coursework and approach real problems properly.
          </p>
        </motion.div>

        {/* Stats strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: "var(--border-color)", borderRadius: "var(--radius-md)", overflow: "hidden", marginBottom: "3rem" }}>
          {stats.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.08 }}
              style={{ background: "var(--container-color)", padding: "1.4rem 1rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--first-color)", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-color)", marginTop: "0.3rem" }}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Timeline tabs */}
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          {/* Pill switcher */}
          <div style={{ display: "flex", background: "var(--input-color)", borderRadius: 99, padding: "0.2rem", width: "fit-content", margin: "0 auto 2.5rem", gap: "0.2rem" }}>
            {(["work", "edu"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{
                  padding: "0.45rem 1.4rem", borderRadius: 99, border: "none", cursor: "pointer", fontFamily: "var(--body-font)", fontSize: "0.875rem", fontWeight: 600, transition: "all 0.25s",
                  background: tab === t ? "var(--first-color)" : "transparent",
                  color: tab === t ? "#fff" : "var(--text-color)",
                  boxShadow: tab === t ? "0 2px 8px hsla(0,69%,61%,0.28)" : "none"
                }}>
                {t === "work" ? "💼 Experience" : "🎓 Education"}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={tab}
              initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.22 }}>

              {tab === "work" && experience.map((job, i) => (
                <div key={i} style={{ display: "flex", gap: "1.1rem", marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ width: 11, height: 11, borderRadius: "50%", background: "var(--first-color)", border: "2px solid var(--first-color-light)", marginTop: "0.35rem" }} />
                    {i < experience.length - 1 && <div style={{ width: 2, flexGrow: 1, background: "var(--first-color-light)", marginTop: 4, minHeight: 28 }} />}
                  </div>
                  <div className="card" style={{ flex: 1, padding: "1.1rem 1.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.3rem", marginBottom: "0.3rem" }}>
                      <h4 style={{ fontSize: "0.938rem", fontWeight: 700, color: "var(--title-color)" }}>{job.role}</h4>
                      <span style={{ fontSize: "0.7rem", background: "var(--first-color-bg)", color: "var(--first-color)", padding: "0.18rem 0.55rem", borderRadius: 99, fontWeight: 600, whiteSpace: "nowrap", border: "1px solid var(--first-color-light)" }}>{job.period}</span>
                    </div>
                    <p style={{ fontSize: "0.813rem", color: "var(--first-color)", fontWeight: 600, marginBottom: "0.6rem" }}>
                      {job.company} · <span style={{ color: "var(--text-color-light)", fontWeight: 400 }}>{job.location}</span>
                    </p>
                    <ul style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                      {job.bullets.map((b, bi) => (
                        <li key={bi} style={{ fontSize: "0.813rem", color: "var(--text-color)", lineHeight: 1.65, display: "flex", gap: "0.5rem" }}>
                          <span style={{ color: "var(--first-color)", flexShrink: 0, marginTop: "0.15rem" }}>▸</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

              {tab === "edu" && education.map((edu, i) => (
                <div key={i} style={{ display: "flex", gap: "1.1rem", marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ width: 11, height: 11, borderRadius: "50%", background: "var(--first-color)", border: "2px solid var(--first-color-light)", marginTop: "0.35rem" }} />
                    {i < education.length - 1 && <div style={{ width: 2, flexGrow: 1, background: "var(--first-color-light)", marginTop: 4, minHeight: 28 }} />}
                  </div>
                  <div className="card" style={{ flex: 1, padding: "1.1rem 1.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.3rem", marginBottom: "0.3rem" }}>
                      <h4 style={{ fontSize: "0.938rem", fontWeight: 700, color: "var(--title-color)" }}>{edu.degree}</h4>
                      <span style={{ fontSize: "0.7rem", background: "var(--first-color-bg)", color: "var(--first-color)", padding: "0.18rem 0.55rem", borderRadius: 99, fontWeight: 600, whiteSpace: "nowrap", border: "1px solid var(--first-color-light)" }}>{edu.period}</span>
                    </div>
                    <p style={{ fontSize: "0.813rem", color: "var(--first-color)", fontWeight: 600, marginBottom: "0.5rem" }}>{edu.institution}</p>
                    {/* Score badge */}
                    {(edu.cgpa || edu.score) && (
                      <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 700, background: "linear-gradient(135deg, var(--first-color), var(--first-color-alt))", color: "#fff", padding: "0.2rem 0.7rem", borderRadius: 99, marginBottom: "0.6rem" }}>
                        {edu.cgpa ? `CGPA: ${edu.cgpa}` : `Score: ${edu.score}`}
                      </span>
                    )}
                    <ul style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                      {edu.details.map((d, di) => (
                        <li key={di} style={{ fontSize: "0.8rem", color: "var(--text-color)", lineHeight: 1.6, display: "flex", gap: "0.5rem" }}>
                          <span style={{ color: "var(--first-color)", flexShrink: 0 }}>▸</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
