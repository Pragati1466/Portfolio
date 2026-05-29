"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { portfolioData } from "@/data/content";

const contactInfo = [
  {
    emoji: "💼",
    label: "LinkedIn",
    getValue: (p: typeof portfolioData.profile) => "Connect on LinkedIn",
    getHref: (p: typeof portfolioData.profile) => p.socials.linkedin,
  },
  {
    emoji: "📧",
    label: "Email",
    getValue: (p: typeof portfolioData.profile) => p.email,
    getHref: (p: typeof portfolioData.profile) => `mailto:${p.email}`,
  },
  {
    emoji: "📍",
    label: "Location",
    getValue: () => "New Delhi, India",
    getHref: () => undefined,
  },
];

export default function ContactForm() {
  const { profile } = portfolioData;
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { setStatus("success"); setForm({ name: "", email: "", subject: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="section__tag">Contact</span>
          <h2 className="section__title" style={{ marginTop: "0.5rem" }}>Let&apos;s work together</h2>
          <p style={{ maxWidth: 480, margin: "0 auto", color: "var(--text-color)", lineHeight: 1.8 }}>
            Open to internships, collaborations, and interesting projects. Drop a message!
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "2.5rem", alignItems: "start", maxWidth: 860, margin: "0 auto" }}>
          {/* Left: info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {contactInfo.map((item, i) => {
              const val = item.getValue(profile);
              const href = item.getHref(profile);
              return (
                <motion.div key={i} className="card"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  style={{ padding: "1rem 1.25rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "var(--radius-sm)", background: "var(--first-color-bg)", border: "1.5px solid var(--first-color-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", flexShrink: 0 }}>
                    {item.emoji}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-color-light)", fontWeight: 500, marginBottom: "0.15rem" }}>{item.label}</div>
                    {href ? (
                      <a href={href} style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--title-color)", transition: "color 0.2s" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "var(--first-color)")}
                        onMouseLeave={e => (e.currentTarget.style.color = "var(--title-color)")}>
                        {val}
                      </a>
                    ) : (
                      <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--title-color)" }}>{val}</span>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {/* Social links */}
            <motion.div className="card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              style={{ padding: "1.25rem" }}>
              <p style={{ fontSize: "0.75rem", color: "var(--text-color-light)", fontWeight: 500, marginBottom: "0.75rem" }}>Find me on</p>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                {[
                  { href: profile.socials.github, label: "GitHub", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.372 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.111.82-.261.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.763-1.605-2.665-.305-5.466-1.333-5.466-5.93 0-1.31.468-2.381 1.236-3.222-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.958-.266 1.984-.399 3.003-.404 1.02.005 2.046.138 3.006.404 2.29-1.552 3.295-1.23 3.295-1.23.655 1.653.243 2.873.12 3.176.77.841 1.235 1.913 1.235 3.222 0 4.61-2.804 5.625-5.476 5.921.43.372.814 1.102.814 2.222 0 1.606-.014 2.898-.014 3.293 0 .319.216.694.825.576C20.565 21.796 24 17.298 24 12 24 5.373 18.627 0 12 0z" /></svg> },
                  { href: profile.socials.linkedin, label: "LinkedIn", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-1.657 0-3 1.343-3 3v18c0 1.657 1.343 3 3 3h14c1.657 0 3-1.343 3-3v-18c0-1.657-1.343-3-3-3zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.785-1.75-1.75s.784-1.75 1.75-1.75 1.75.785 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.5c0-1.378-.028-3.152-1.922-3.152-1.922 0-2.218 1.5-2.218 3.047v5.605h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.597 1.998 3.597 4.593v5.603z" /></svg> },
                  { href: profile.socials.leetcode, label: "LeetCode", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" /></svg> },
                ].map(({ href, label, icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    style={{ width: 38, height: 38, borderRadius: "var(--radius-sm)", border: "1.5px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-color)", transition: "all 0.2s", background: "var(--body-color)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--first-color)"; (e.currentTarget as HTMLElement).style.color = "var(--first-color)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-color)"; (e.currentTarget as HTMLElement).style.color = "var(--text-color)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                    {icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: form */}
          <motion.div className="card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ padding: "2rem" }}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {[
                  { id: "name", label: "Your Name", type: "text", key: "name" as const, placeholder: "Pragati" },
                  { id: "email", label: "Email Address", type: "email", key: "email" as const, placeholder: "you@email.com" },
                ].map(field => (
                  <div key={field.id}>
                    <label htmlFor={field.id} style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--text-color)", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {field.label}
                    </label>
                    <input id={field.id} type={field.type} required placeholder={field.placeholder}
                      value={form[field.key]}
                      onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                      disabled={status === "loading" || status === "success"}
                      style={{ width: "100%", padding: "0.65rem 0.9rem", borderRadius: "var(--radius-sm)", border: "1.5px solid var(--border-color)", background: "var(--body-color)", color: "var(--title-color)", fontFamily: "var(--body-font)", fontSize: "0.875rem", outline: "none", transition: "border-color 0.2s" }}
                      onFocus={e => (e.target.style.borderColor = "var(--first-color)")}
                      onBlur={e => (e.target.style.borderColor = "var(--border-color)")} />
                  </div>
                ))}
              </div>

              <div>
                <label htmlFor="subject" style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--text-color)", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Subject
                </label>
                <input id="subject" type="text" placeholder="Internship / Collaboration / Project"
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  disabled={status === "loading" || status === "success"}
                  style={{ width: "100%", padding: "0.65rem 0.9rem", borderRadius: "var(--radius-sm)", border: "1.5px solid var(--border-color)", background: "var(--body-color)", color: "var(--title-color)", fontFamily: "var(--body-font)", fontSize: "0.875rem", outline: "none", transition: "border-color 0.2s" }}
                  onFocus={e => (e.target.style.borderColor = "var(--first-color)")}
                  onBlur={e => (e.target.style.borderColor = "var(--border-color)")} />
              </div>

              <div>
                <label htmlFor="message" style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--text-color)", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Message
                </label>
                <textarea id="message" required rows={5} placeholder="Tell me about your project or opportunity..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  disabled={status === "loading" || status === "success"}
                  style={{ width: "100%", padding: "0.65rem 0.9rem", borderRadius: "var(--radius-sm)", border: "1.5px solid var(--border-color)", background: "var(--body-color)", color: "var(--title-color)", fontFamily: "var(--body-font)", fontSize: "0.875rem", outline: "none", transition: "border-color 0.2s", resize: "none" }}
                  onFocus={e => (e.target.style.borderColor = "var(--first-color)")}
                  onBlur={e => (e.target.style.borderColor = "var(--border-color)")} />
              </div>

              <button type="submit" className="btn" disabled={status === "loading" || status === "success"}
                style={{ width: "100%", justifyContent: "center", opacity: status === "loading" || status === "success" ? 0.75 : 1 }}>
                {status === "idle" && <>Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg></>}
                {status === "loading" && "Sending…"}
                {status === "success" && "✅ Message Sent!"}
                {status === "error" && "❌ Try Again"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #contact .container > div > div:first-child { display: none; }
          #contact .container > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
