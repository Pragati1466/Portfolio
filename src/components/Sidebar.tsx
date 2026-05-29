"use client";

import { useEffect, useState } from "react";
import { Mail, Code2 } from "lucide-react";
import { portfolioData } from "@/data/content";

const navItems = [
  { id: "about", number: "01", name: "About" },
  { id: "skills", number: "02", name: "Skills" },
  { id: "projects", number: "03", name: "Projects" },
  { id: "statistics", number: "04", name: "Statistics" },
  { id: "recommendations", number: "05", name: "Recommendations" },
  { id: "achievements", number: "06", name: "Achievements" },
  { id: "contact", number: "07", name: "Contact" },
];

function GitHubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.372 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.111.82-.261.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.763-1.605-2.665-.305-5.466-1.333-5.466-5.93 0-1.31.468-2.381 1.236-3.222-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.958-.266 1.984-.399 3.003-.404 1.02.005 2.046.138 3.006.404 2.29-1.552 3.295-1.23 3.295-1.23.655 1.653.243 2.873.12 3.176.77.841 1.235 1.913 1.235 3.222 0 4.61-2.804 5.625-5.476 5.921.43.372.814 1.102.814 2.222 0 1.606-.014 2.898-.014 3.293 0 .319.216.694.825.576C20.565 21.796 24 17.298 24 12 24 5.373 18.627 0 12 0z" />
    </svg>
  );
}

function LinkedInIcon({ size = 20 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19 0h-14c-1.657 0-3 1.343-3 3v18c0 1.657 1.343 3 3 3h14c1.657 0 3-1.343 3-3v-18c0-1.657-1.343-3-3-3zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.785-1.75-1.75s.784-1.75 1.75-1.75 1.75.785 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.5c0-1.378-.028-3.152-1.922-3.152-1.922 0-2.218 1.5-2.218 3.047v5.605h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.597 1.998 3.597 4.593v5.603z" />
    </svg>
  );
}

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState("");
  const { profile } = portfolioData;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside className="hidden lg:flex fixed top-0 left-0 w-[280px] h-screen flex-col justify-between py-16 px-10 bg-navy z-40 select-none">
      {/* Top logo */}
      <div className="flex flex-col">
        <a
          href="#"
          className="group flex items-center justify-center w-12 h-12 rounded border-2 border-teal text-teal font-mono text-xl font-bold hover:bg-teal/10 transition-all duration-300 shadow-card hover:shadow-[0_0_15px_rgba(100,255,218,0.3)]"
          aria-label="Home"
        >
          {profile.name.charAt(0)}
        </a>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-6 my-auto">
        <ul className="space-y-6">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollTo(item.id)}
                className={`group flex items-center text-left font-mono text-[13px] tracking-wider transition-all duration-300 focus:outline-none ${activeSection === item.id
                    ? "text-teal translate-x-2"
                    : "text-slate hover:text-teal hover:translate-x-2"
                  }`}
              >
                <span className="text-teal mr-2.5 group-hover:text-teal">{item.number}.</span>
                <span className={`transition-colors duration-300 ${activeSection === item.id ? "text-teal font-medium" : "text-slate group-hover:text-teal"
                  }`}>
                  {item.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Footer Details (Socials + Resume) */}
      <div className="flex flex-col space-y-8">
        {/* Social Icons */}
        <div className="flex items-center space-x-5">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate hover:text-teal -translate-y-0 hover:-translate-y-1 transition-all duration-300"
            aria-label="GitHub"
          >
            <GitHubIcon size={20} />
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate hover:text-teal -translate-y-0 hover:-translate-y-1 transition-all duration-300"
            aria-label="LinkedIn"
          >
            <LinkedInIcon size={20} />
          </a>
          <a
            href={profile.socials.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate hover:text-teal -translate-y-0 hover:-translate-y-1 transition-all duration-300"
            aria-label="LeetCode"
          >
            <Code2 size={20} />
          </a>
          <a
            href={`mailto:${profile.socials.gmail}`}
            className="text-slate hover:text-teal -translate-y-0 hover:-translate-y-1 transition-all duration-300"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>

        {/* Resume Button */}
        <div>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 py-3 rounded border border-teal text-teal font-mono text-xs tracking-wide hover:bg-teal/10 hover:shadow-[0_0_12px_rgba(100,255,218,0.2)] transition-all duration-300"
          >
            Resume
          </a>
        </div>
      </div>
    </aside>
  );
}
