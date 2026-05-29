"use client";

import { motion } from "motion/react";
import { portfolioData } from "@/data/content";

const medals = ["🥇", "🥈", "🥉", "🏅", "🎖️"];

export default function Achievements() {
  const { achievements, certifications } = portfolioData;

  return (
    <section id="achievements" className="section" style={{ background: "var(--first-color-bg)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="section__tag">Achievements</span>
          <h2 className="section__title" style={{ marginTop: "0.5rem" }}>Wins &amp; Milestones</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2.5rem" }}>
          {/* Achievements column */}
          <div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--title-color)", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              🏆 Awards &amp; Honors
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {achievements.map((a, i) => (
                <motion.div key={i} className="card"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  style={{ padding: "1.1rem 1.25rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "1.75rem", lineHeight: 1, flexShrink: 0, marginTop: "0.1rem" }}>{medals[i] ?? "🏅"}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", flexWrap: "wrap" }}>
                      <h4 style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--title-color)", lineHeight: 1.4 }}>{a.title}</h4>
                      <span style={{ fontSize: "0.7rem", fontWeight: 600, background: "var(--first-color-bg)", color: "var(--first-color)", padding: "0.15rem 0.5rem", borderRadius: 99, border: "1px solid var(--first-color-light)", whiteSpace: "nowrap" }}>{a.year}</span>
                    </div>
                    <p style={{ fontSize: "0.75rem", color: "var(--first-color)", fontWeight: 500, margin: "0.2rem 0 0.4rem" }}>{a.issuer}</p>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-color)", lineHeight: 1.6 }}>{a.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications column */}
          <div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--title-color)", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              📜 Certifications &amp; Publications
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {certifications.map((c, i) => (
                <motion.div key={i} className="card"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  style={{ padding: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.75rem" }}>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--title-color)", lineHeight: 1.5, flex: 1 }}>{c.name}</h4>
                    {c.verifyUrl && (
                      <a href={c.verifyUrl} target="_blank" rel="noopener noreferrer"
                        style={{ flexShrink: 0, width: 32, height: 32, borderRadius: "50%", border: "1.5px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-color)", transition: "all 0.2s" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--first-color)"; (e.currentTarget as HTMLElement).style.color = "var(--first-color)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-color)"; (e.currentTarget as HTMLElement).style.color = "var(--text-color)"; }}
                        aria-label="Verify">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                      </a>
                    )}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: "1px solid var(--border-color)" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-color-light)", fontWeight: 500 }}>{c.issuer}</span>
                    <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--first-color)" }}>{c.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
