"use client";

import { portfolioData } from "@/data/content";

export default function Footer() {
  const { profile } = portfolioData;
  const year = new Date().getFullYear();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const links = ["about", "skills", "projects", "achievements", "game", "contact"];

  return (
    <footer style={{ background: "var(--title-color)", color: "#fff", paddingTop: "3rem" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: "2.5rem", paddingBottom: "2.5rem", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          {/* Brand */}
          <div>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>
              <span style={{ color: "var(--first-color)" }}>{profile.name.charAt(0)}</span>
              {profile.name.slice(1)}
            </div>
            <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, maxWidth: 260 }}>
              Developer &amp; Data Enthusiast building things that matter, one commit at a time.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ fontSize: "0.813rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)", marginBottom: "1rem" }}>
              Navigate
            </h4>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {links.map((l) => (
                <li key={l}>
                  <button onClick={() => scrollTo(l)}
                    style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--body-font)", fontSize: "0.875rem", color: "rgba(255,255,255,0.7)", textTransform: "capitalize", transition: "color 0.2s", padding: 0 }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--first-color)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}>
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 style={{ fontSize: "0.813rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)", marginBottom: "1rem" }}>
              Connect
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { label: "GitHub", href: profile.socials.github },
                { label: "LinkedIn", href: profile.socials.linkedin },
                { label: "LeetCode", href: profile.socials.leetcode },
                { label: "Email", href: `mailto:${profile.email}` },
              ].map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.7)", transition: "color 0.2s", display: "flex", alignItems: "center", gap: "0.4rem" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--first-color)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}>
                  <span style={{ color: "var(--first-color)", fontSize: "0.6rem" }}>▶</span>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 0", flexWrap: "wrap", gap: "0.5rem" }}>
          <p style={{ fontSize: "0.813rem", color: "rgba(255,255,255,0.4)" }}>
            © {year} {profile.name} · All rights reserved
          </p>
          <p style={{ fontSize: "0.813rem", color: "rgba(255,255,255,0.4)" }}>
            Built with Next.js &amp; ❤️
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          footer .container > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
