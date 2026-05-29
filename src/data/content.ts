export interface Profile {
  name: string;
  role: string;
  tagline: string;
  email: string;
  resumeUrl: string;
  avatarUrl: string;
  about: string;
  socials: {
    github: string;
    linkedin: string;
    leetcode: string;
    gmail: string;
  };
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  cgpa?: string;
  score?: string;
  details: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Internship {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  isFeatured?: boolean;
}

export interface Achievement {
  title: string;
  issuer: string;
  year: string;
  description: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  verifyUrl?: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface PortfolioData {
  profile: Profile;
  education: Education[];
  skills: SkillCategory[];
  experience: Internship[];
  projects: Project[];
  achievements: Achievement[];
  certifications: Certification[];
  stats: Stat[];
}

export const portfolioData: PortfolioData = {
  profile: {
    name: "Pragati",
    role: "B.Tech Student · ECE-AI · IGDTUW",
    tagline: "4th year student who builds things, breaks things, and learns from both.",
    email: "pragati.bathinda@gmail.com",
    resumeUrl: "#",
    avatarUrl: "/avatar.png",
    about: "Hey! I'm Pragati a 4th year B.Tech student at IGDTUW, studying ECE with AI. I genuinely enjoy building practical tech projects and understanding how systems work internally. I've worked on backend systems, data pipelines, and research and I'm always more interested in understanding things deeply than just getting them done.",
    socials: {
      github: "https://github.com/Pragati1466",
      linkedin: "https://www.linkedin.com/in/pragati-860830284",
      leetcode: "https://leetcode.com/u/Pragati09/",
      gmail: "pragati.bathinda@gmail.com"
    }
  },

  education: [
    {
      degree: "B.Tech — ECE with AI Specialization",
      institution: "Indira Gandhi Delhi Technical University for Women",
      period: "2023 — 2027",
      cgpa: "9.13 / 10",
      details: [
        "Electronics & Communication Engineering with AI specialization"
      ]
    },
    {
      degree: "Senior Secondary — CBSE Class XII",
      institution: "Saint Fateh Singh Convent School",
      period: "2023",
      score: "91.8%",
      details: ["PCM"]
    },
    {
      degree: "Secondary — CBSE Class X",
      institution: "St.Xavier's School,Bathinda",
      period: "2021",
      score: "93%",
      details: ["All subjects"]
    }
  ],

  skills: [
    {
      category: "Languages",
      skills: ["Python", "JavaScript", "SQL", "C++", "Java", "HTML", "CSS"]
    },
    {
      category: "Frameworks & Libraries",
      skills: ["React.js", "Next.js", "FastAPI", "Tailwind CSS", "Node.js"]
    },
    {
      category: "Databases",
      skills: ["MongoDB", "MySQL", "Firebase"]
    },
    {
      category: "Tools & Data",
      skills: ["Git / GitHub", "Postman", "Streamlit", "Data Cleaning", "Excel", "VS Code"]
    },
    {
      category: "Core Competencies",
      skills: ["Problem Solving", "Data Preprocessing", "Research & Documentation", "Team Collaboration", "IEEE Leadership"]
    }
  ],

  experience: [
    {
      role: "Web Development Intern",
      company: "Internshala",
      period: "Jun 2025 — Jul 2025",
      location: "Remote",
      bullets: [
        "Worked on backend systems for a healthcare logistics platform — APIs, order handling, inventory workflows.",
        "Got hands-on with how different modules communicate in real production systems.",
        "Understood how structured data flow and clean APIs make debugging and scaling much easier.",
        "Moved beyond just writing features — learned how real workflows, teamwork, and consistency actually matter."
      ]
    },
    {
      role: "Research Intern — Python & ML",
      company: "Centre of Excellence, IGDTUW",
      period: "Jun 2024 — Jul 2024",
      location: "On-Site",
      bullets: [
        "Worked with 1000+ image and video datasets — preprocessing, organizing, cleaning, and consistency checks.",
        "Learned firsthand how wrong labeling or poor-quality samples can directly hurt model performance.",
        "Built preprocessing workflows that improved pipeline performance by ~12%.",
        "Collaborated on experiments and documentation — work contributed to a research paper published at Springer ICICC 2025."
      ]
    }
  ],

  projects: [
    {
      title: "MediSwift",
      description: "A healthcare delivery platform where I worked mainly on the backend : APIs, database handling, authentication, and order/inventory workflows. Built with a focus on reliability and clean data flow across modules.",
      techStack: ["FastAPI", "MongoDB", "Python", "React"],
      githubUrl: "https://github.com/Pragati1466/MediSwift",
      liveUrl: "https://medi-swift-git-main-priyancy-singals-projects.vercel.app/",
      isFeatured: true
    },
    {
      title: "IGDTUW Marketplace",
      description: "A peer-to-peer marketplace for college students to buy and sell items. Built product listing, filtering, and real-time data handling. Focused on making search fast and the experience smooth.",
      techStack: ["React", "Firebase", "JavaScript"],
      githubUrl: "https://github.com/Pragati1466/igdtuw-marketplace",
      liveUrl: "https://updated-x3zc.onrender.com/",
      isFeatured: true
    },
    {
      title: "Signalist — Stock Tracker",
      description: "A real-time financial tracking app that pulls live stock data from APIs. Handled continuous data updates, edge cases in live streams, and built a clean dashboard for tracking signals.",
      techStack: ["Next.js", "React", "REST APIs", "Tailwind CSS"],
      githubUrl: "https://github.com/Pragati1466/signalist-stock-tracker-app",
      liveUrl: "https://signalist-stock-tracker-app-bay-gamma.vercel.app",
      isFeatured: false
    },
    {
      title: "Sepsis Detection System",
      description: "Built during Xpecto Hackathon an ML-based early sepsis detection system using patient vitals. Focused on data preprocessing, feature engineering, and model evaluation for a real clinical use case.",
      techStack: ["Python", "Machine Learning", "Pandas", "Scikit-learn"],
      githubUrl: "https://github.com/Pragati1466/sepsis-detection-system-xpecto26",
      liveUrl: "",
      isFeatured: false
    }
  ],

  achievements: [
    {
      title: "Winner — Delhi AI Grind 2025–26",
      issuer: "Delhi AI Grind",
      year: "2026",
      description: "Part of Team DEBUGHER. Proposed 'Dilli Darshan'an AI-based real-time tourism decision system for on-ground navigation."
    },
    {
      title: "Semi-Finalist — Flipkart GRiD 7.0",
      issuer: "Flipkart",
      year: "2025",
      description: "Selected among 1.6+ lakh participants by clearing multiple competitive DSA rounds."
    },
    {
      title: "Top 4% — Myntra HackerRamp",
      issuer: "Myntra",
      year: "2024",
      description: "Ranked among 1200+ teams for building an AI-based Virtual Trial Room solution."
    },
    {
      title: "1st Position — IEEE Open Source Week",
      issuer: "IEEE",
      year: "2024",
      description: "Secured first place and contributed 6+ PRs in GSSoC'24 improving codebase, UI, and documentation."
    },
    {
      title: "Reliance Foundation Undergraduate Scholarship",
      issuer: "Reliance Foundation",
      year: "2024",
      description: "Awarded to top 5% of students nationwide based on academic performance and potential."
    }
  ],

  certifications: [
    {
      name: "Enhancing Cybersecurity in Autonomous Vehicles through Adversarial Robustness",
      issuer: "Springer ICICC-2025 (Research Publication)",
      date: "2025",
      verifyUrl: "https://link.springer.com/chapter/10.1007/978-981-96-7134-2_3"
    },
    {
      name: "Python & Machine Learning Internship Certification",
      issuer: "Centre of Excellence, IGDTUW",
      date: "2024",
      verifyUrl: "https://drive.google.com/file/d/1ylCNtATB3kXzWBHcJwT5EMKBDbgOGrLy/view"
    }
  ],

  stats: [
    { value: "9.13", label: "CGPA" },
    { value: "4+", label: "Projects Built" },
    { value: "5+", label: "Hackathons" },
    { value: "2", label: "Internships" }
  ]
};
