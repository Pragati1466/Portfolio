"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { portfolioData } from "@/data/content";

const categoryEmoji: Record<string, string> = {
  "Languages": "{ }",
  "Frameworks": "⚡",
  "Databases": "🗄️",
  "Tools & Data": "🔧",
  "Core Competencies": "🧠",
};

const categoryGradient: Record<string, string> = {
  "Languages": "linear-gradient(135deg, #ff6b6b22, #ff6b6b08)",
  "Frameworks": "linear-gradient(135deg, #ffd93d22, #ffd93d08)",
  "Databases": "linear-gradient(135deg, #6bcb7722, #6bcb7708)",
  "Tools & Data": "linear-gradient(135deg, #4d96ff22, #4d96ff08)",
  "Core Competencies": "linear-gradient(135deg, #c77dff22, #c77dff08)",
};

const categoryAccent: Record<string, string> = {
  "Languages": "#e05252",
  "Frameworks": "#c9a84c",
  "Databases": "#3aaa5c",
  "Tools & Data": "#3a7bd5",
  "Core Competencies": "#9b59b6",
};

export default function Skills() {
  const { skills } = portfolioData;
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="skills" className="section" style={{ background: "var(--first-color-bg)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="section__tag">Skills &amp; Tools</span>
          <h2 className="section__title" style={{ marginTop: "0.5rem" }}>What I work with</h2>
          <p className="section__subtitle" style={{ marginBottom: 0 }}>
            Technologies I use to build things that matter
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
          {skills.map((cat, ci) => {
            const accent = categoryAccent[cat.category] ?? "var(--first-color)";
            const grad = categoryGradient[cat.category] ?? "var(--first-color-bg)";
            return (
              <motion.div key={cat.category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: ci * 0.07 }}
                style={{
                  background: "var(--container-color)",
                  borderRadius: "var(--radius-lg)",
                  border: "1.5px solid var(--border-color)",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-sm)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                whileHover={{ y: -4, boxShadow: "var(--shadow-md)" } as any}
              >
                {/* Card header */}
                <div style={{ background: grad, padding: "1.25rem 1.5rem", borderBottom: "1.5px solid var(--border-color)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ fontSize: "1.5rem", lineHeight: 1 }}>{categoryEmoji[cat.category]}</span>
                  <h3 style={{ fontSize: "0.938rem", fontWeight: 700, color: "var(--title-color)" }}>{cat.category}</h3>
                  <span style={{ marginLeft: "auto", fontSize: "0.75rem", fontWeight: 600, color: accent, background: `${accent}18`, padding: "0.2rem 0.6rem", borderRadius: 99 }}>
                    {cat.skills.length} skills
                  </span>
                </div>

                {/* Skills pills */}
                <div style={{ padding: "1.25rem 1.5rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {cat.skills.map((skill) => (
                    <motion.span key={skill}
                      onHoverStart={() => setHovered(skill)}
                      onHoverEnd={() => setHovered(null)}
                      animate={{ scale: hovered === skill ? 1.08 : 1 }}
                      style={{
                        display: "inline-block",
                        padding: "0.3rem 0.85rem",
                        borderRadius: 99,
                        fontSize: "0.8rem",
                        fontWeight: 500,
                        cursor: "default",
                        border: `1.5px solid ${hovered === skill ? accent : "var(--border-color)"}`,
                        background: hovered === skill ? `${accent}18` : "var(--body-color)",
                        color: hovered === skill ? accent : "var(--text-color)",
                        transition: "all 0.2s",
                      }}>
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
