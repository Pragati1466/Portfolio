"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { portfolioData } from "@/data/content";

export default function Experience() {
  const { experience } = portfolioData;
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      id="experience"
      className="py-20 lg:py-28 px-6 md:px-16 lg:px-24 max-w-4xl select-text"
    >
      {/* Numbered Section Heading */}
      <h2 className="flex items-center font-sans text-2xl md:text-3xl font-semibold text-white tracking-tight mb-12">
        <span className="font-mono text-teal text-lg md:text-xl mr-3">03.</span>
        Where I've Worked
        <span className="h-[1px] bg-border-color/30 flex-grow ml-5 hidden sm:block"></span>
      </h2>

      <div className="flex flex-col md:flex-row items-start min-h-[300px]">
        {/* Tab Buttons (Left) */}
        <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible w-full md:w-[180px] border-b md:border-b-0 md:border-l border-border-color/40 mb-8 md:mb-0 shrink-0 scrollbar-none select-none">
          {experience.map((job, idx) => (
            <button
              key={job.company}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-3 text-left font-mono text-xs tracking-wider transition-all duration-300 border-b-2 md:border-b-0 md:border-l-2 whitespace-nowrap cursor-pointer ${
                activeTab === idx
                  ? "border-teal text-teal bg-teal/[0.04]"
                  : "border-transparent text-slate hover:text-teal hover:bg-teal/[0.01]"
              }`}
            >
              {job.company}
            </button>
          ))}
        </div>

        {/* Details Panel (Right) */}
        <div className="flex-grow md:pl-8 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {/* Job Title & Company */}
              <div>
                <h3 className="font-sans text-lg md:text-xl font-bold text-white leading-snug">
                  {experience[activeTab].role}{" "}
                  <span className="text-teal font-normal font-sans">
                    @{" "}
                    {experience[activeTab].companyUrl ? (
                      <a
                        href={experience[activeTab].companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-teal inline-flex items-center"
                      >
                        {experience[activeTab].company}
                      </a>
                    ) : (
                      experience[activeTab].company
                    )}
                  </span>
                </h3>
                
                {/* Date & Location */}
                <div className="flex flex-wrap justify-between items-center mt-1 text-xs font-mono text-slate">
                  <span>{experience[activeTab].period}</span>
                  <span className="text-teal/80">{experience[activeTab].location}</span>
                </div>
              </div>

              {/* Job Bullets */}
              <ul className="space-y-4 pt-2">
                {experience[activeTab].bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="font-sans text-slate text-sm md:text-base leading-relaxed flex items-start">
                    {/* Custom Teal Arrow Icon */}
                    <span className="text-teal mr-3 select-none pt-1 font-mono text-xs">&#9656;</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
