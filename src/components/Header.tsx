"use client";

import { useState, useEffect } from "react";
import { portfolioData } from "@/data/content";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "game", label: "Beat Me 😏" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const { profile } = portfolioData;
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);

  // Dark theme toggle
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.body.classList.add("dark-theme");
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.body.classList.toggle("dark-theme", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <header
      className="header"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 100,
        backgroundColor: "var(--body-color)",
        boxShadow: scrolled ? "0 1px 8px rgba(0,0,0,0.12)" : "none",
        transition: "box-shadow 0.3s, background-color 0.3s",
      }}
    >
      <nav
        className="container"
        style={{
          height: "calc(var(--header-height) + 1.5rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo("home")}
          style={{
            fontFamily: "var(--body-font)",
            fontSize: "1.125rem",
            fontWeight: 600,
            color: "var(--title-color)",
            background: "none",
            border: "none",
            cursor: "pointer",
            letterSpacing: "0.02em",
          }}
        >
          <span style={{ color: "var(--first-color)" }}>
            {profile.name.charAt(0)}
          </span>
          {profile.name.slice(1).toUpperCase()}
        </button>

        {/* Desktop nav */}
        <ul
          className="nav-list-desktop"
          style={{
            display: "flex",
            gap: "2rem",
            listStyle: "none",
          }}
        >
          {navItems.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                style={{
                  fontFamily: "var(--body-font)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color:
                    activeSection === id
                      ? "var(--first-color)"
                      : "var(--title-color)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "color 0.3s",
                  padding: "0.25rem 0",
                  borderBottom:
                    activeSection === id
                      ? "2px solid var(--first-color)"
                      : "2px solid transparent",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--first-color)")
                }
                onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color =
                  activeSection === id
                    ? "var(--first-color)"
                    : "var(--title-color)")
                }
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right: theme + hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1.25rem",
              color: "var(--title-color)",
              display: "flex",
              alignItems: "center",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = "var(--first-color)")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = "var(--title-color)")
            }
          >
            {dark ? "☀️" : "🌙"}
          </button>

          {/* Hamburger (mobile) */}
          <button
            className="nav-toggle-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1.25rem",
              color: "var(--title-color)",
              display: "none",
            }}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "var(--body-color)",
            zIndex: 99,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              color: "var(--first-color)",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                fontFamily: "var(--body-font)",
                fontSize: "1.125rem",
                fontWeight: 500,
                color:
                  activeSection === id
                    ? "var(--first-color)"
                    : "var(--title-color)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 767px) {
          .nav-list-desktop { display: none !important; }
          .nav-toggle-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
