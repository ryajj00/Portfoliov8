"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";

type SkillCategory = "frontend" | "design" | "ai" | "other";
type SkillSize = "lg" | "sm";

interface Skill {
  name: string;
  icon: string;
  category: SkillCategory;
  description: string;
  size: SkillSize;
  color: string;
}

const skills: Skill[] = [
  // Front-end / Development
  { name: "HTML5", icon: "html-5-svgrepo-com.svg", category: "frontend", description: "Semantic, accessible markup", size: "sm", color: "#E34F26" },
  { name: "CSS3", icon: "css-3-svgrepo-com.svg", category: "frontend", description: "Modern layouts, animations, variables", size: "sm", color: "#1572B6" },
  { name: "JavaScript", icon: "javascript-svgrepo-com.svg", category: "frontend", description: "ES6+, DOM, async patterns", size: "sm", color: "#F7DF1E" },
  { name: "TypeScript", icon: "typescript-svgrepo-com.svg", category: "frontend", description: "Type-safe applications", size: "sm", color: "#3178C6" },
  { name: "React", icon: "react-svgrepo-com.svg", category: "frontend", description: "Components, hooks, state management", size: "lg", color: "#61DAFB" },
  { name: "Next.js", icon: "nextjs-icon-svgrepo-com.svg", category: "frontend", description: "App Router, SSR, ISR, API routes", size: "sm", color: "#FFFFFF" },
  { name: "Tailwind CSS", icon: "tailwindcss-icon-svgrepo-com.svg", category: "frontend", description: "Utility-first styling", size: "sm", color: "#06B6D4" },
  { name: "GSAP", icon: "gsap.svg", category: "frontend", description: "Scroll-triggered, timeline animations", size: "sm", color: "#88CE02" },
  { name: "WordPress", icon: "wordpress-svgrepo-com.svg", category: "frontend", description: "Custom themes, blocks, maintenance", size: "sm", color: "#21759B" },
  { name: "Git", icon: "git-svgrepo-com.svg", category: "frontend", description: "Version control, collaboration", size: "sm", color: "#F05032" },

  // Design
  { name: "Photoshop", icon: "photoshop-cc-logo-svgrepo-com.svg", category: "design", description: "Photo editing, compositing, mockups", size: "lg", color: "#31A8FF" },
  { name: "Canva", icon: "canva-svgrepo-com.svg", category: "design", description: "Rapid social & marketing assets", size: "sm", color: "#00C4CC" },
  { name: "Figma", icon: "figma.svg", category: "design", description: "UI design, prototyping, design systems", size: "sm", color: "#F24E1E" },
  { name: "Aseprite", icon: "aseprite-svgrepo-com.svg", category: "design", description: "Pixel art, sprite animation", size: "sm", color: "#FF9966" },

  // AI Tools
  { name: "Claude Code", icon: "claude-color.svg", category: "ai", description: "AI-assisted development workflows", size: "lg", color: "#D97757" },
  { name: "Cursor", icon: "cursor.svg", category: "ai", description: "AI-first code editor", size: "sm", color: "#A8A8A8" },
  { name: "Stitch", icon: "stitch.svg", category: "ai", description: "AI-generated UI components", size: "sm", color: "#C084FC" },

  // Other / Productivity
  { name: "Notion", icon: "notion-logo-svgrepo-com.svg", category: "other", description: "Documentation, project tracking", size: "sm", color: "#FFFFFF" },
  { name: "CapCut", icon: "capcut-svgrepo-com.svg", category: "other", description: "Short-form video editing", size: "sm", color: "#000000" },
  { name: "Python", icon: "python-svgrepo-com.svg", category: "other", description: "Scripting, automation, data", size: "lg", color: "#3776AB" },
  { name: "MySQL", icon: "mysql-logo-svgrepo-com.svg", category: "other", description: "Relational databases, queries", size: "sm", color: "#4479A1" },
];

const categoryLabels: Record<SkillCategory, { label: string; color: string }> = {
  frontend: { label: "Front-end", color: "var(--accent)" },
  design: { label: "Design", color: "var(--accent-2)" },
  ai: { label: "AI Tools", color: "#f472b6" },
  other: { label: "Other", color: "var(--fg-dim)" },
};

export default function WhatICanDo() {
  const scope = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = scope.current;
    if (!el) return;
    if (reduceMotion) {
      el.querySelectorAll<HTMLElement>(".reveal").forEach((item) => {
        item.style.opacity = "1";
        item.style.transform = "none";
      });
      return;
    }
  }, [reduceMotion]);

  // CSS-based scroll reveal (handles is-visible class toggling)
  useScrollReveal(".reveal", scope, { threshold: 0.12 });

  const categories: SkillCategory[] = ["frontend", "design", "ai", "other"];
  const groupedSkills = categories.map((cat) => ({
    category: cat,
    skills: skills.filter((s) => s.category === cat),
  })).filter((g) => g.skills.length > 0);

  return (
    <section className="what-i-can-do" id="skills" ref={scope}>
      <div className="wrap">
        <div className="section-eyebrow reveal">What I Can Do</div>

        {groupedSkills.map((group) => (
          <div key={group.category} className="skill-category">
            <div className="category-header reveal">
              <span
                className="category-label"
                style={{ color: categoryLabels[group.category].color }}
              >
                {categoryLabels[group.category].label}
              </span>
              <div
                className="category-line"
                style={{ background: categoryLabels[group.category].color }}
              />
            </div>

            <div className="bento-grid">
              {group.skills.map((skill, i) => (
                <article
                  key={skill.name}
                  className={`skill-card ${skill.size === "lg" ? "bento-lg" : "bento-sm"} reveal`}
                  style={{
                    transitionDelay: `${i * 40}ms`,
                    "--card-color": skill.color,
                    "--card-color-15": skill.color + "26",
                  } as React.CSSProperties}
                  tabIndex={0}
                  aria-label={`${skill.name}: ${skill.description}`}
                >
                  {skill.size === "lg" ? (
                    <>
                      <div className="skill-icon-lg">
                        <Image
                          src={`/imgs/svg/${skill.icon}`}
                          alt=""
                          width={40}
                          height={40}
                          loading="lazy"
                        />
                      </div>
                      <div className="skill-content-lg">
                        <h4 className="skill-name-lg">{skill.name}</h4>
                        <p className="skill-desc-lg">{skill.description}</p>
                      </div>
                      <div className="bento-glow" />
                    </>
                  ) : (
                    <>
                      <div className="skill-icon-sm">
                        <Image
                          src={`/imgs/svg/${skill.icon}`}
                          alt=""
                          width={22}
                          height={22}
                          loading="lazy"
                        />
                      </div>
                      <span className="skill-name-sm">{skill.name}</span>
                    </>
                  )}
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .what-i-can-do {
          padding: 14vh 0;
          border-bottom: 1px solid var(--line);
          text-align: center;
        }

        .what-i-can-do .section-eyebrow {
          font-family: var(--font-display, "Unbounded", sans-serif);
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 800;
          letter-spacing: -0.02em;
          text-transform: none;
          color: var(--fg);
        }

        /* ---- Reveal animation ---- */
        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .skill-category {
          margin-bottom: 80px;
        }

        .skill-category:last-child {
          margin-bottom: 0;
        }

        .category-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 32px;
        }

        .category-label {
          font-family: var(--font-mono);
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 600;
          white-space: nowrap;
        }

        .category-line {
          flex: 1;
          height: 1px;
        }

        /* ---- Bento Grid ---- */
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        /* ---- Shared card base ---- */
        .skill-card {
          position: relative;
          display: flex;
          border: 1px solid var(--line);
          border-radius: 10px;
          overflow: hidden;
          background: var(--bg-alt);
          transition: border-color 0.35s ease, background 0.35s ease, transform 0.3s ease,
            box-shadow 0.35s ease;
          cursor: default;
        }

        .skill-card:hover {
          border-color: var(--card-color);
          background: var(--card-color-15);
          box-shadow: 0 0 24px -4px var(--card-color-15);
        }

        .skill-card:focus-visible {
          outline: 2px solid var(--ring);
          outline-offset: 2px;
        }

        /* ---- Large (featured) card ---- */
        .bento-lg {
          grid-column: span 2;
          flex-direction: row;
          align-items: center;
          gap: 20px;
          padding: 24px 28px;
        }

        .skill-icon-lg {
          flex-shrink: 0;
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(195, 216, 197, 0.08);
          border: 1px solid var(--line);
          border-radius: 12px;
          transition: transform 0.35s ease, border-color 0.35s ease,
            background 0.35s ease, box-shadow 0.35s ease;
        }

        .skill-card:hover .skill-icon-lg {
          transform: perspective(400px) rotateY(-8deg) rotateX(4deg) scale(1.06);
          border-color: var(--card-color);
          background: var(--card-color-15);
          box-shadow: 0 4px 18px -2px var(--card-color-15);
        }

        .skill-icon-lg img {
          width: 40px;
          height: 40px;
          object-fit: contain;
        }

        .skill-content-lg {
          flex: 1;
          min-width: 0;
          position: relative;
          z-index: 1;
        }

        .skill-name-lg {
          font-family: var(--font-display, "Unbounded", sans-serif);
          font-weight: 600;
          font-size: 20px;
          color: var(--fg);
          margin: 0 0 6px;
          letter-spacing: -0.01em;
          transition: color 0.3s ease;
        }

        .skill-card:hover .skill-name-lg {
          color: var(--card-color);
        }

        .skill-desc-lg {
          margin: 0;
          font-size: 14px;
          line-height: 1.5;
          color: var(--fg-dim);
        }

        .bento-glow {
          position: absolute;
          top: 0;
          right: 0;
          width: 140px;
          height: 140px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--card-color-15), transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .skill-card:hover .bento-glow {
          opacity: 1;
        }

        /* ---- Small (compact) card ---- */
        .bento-sm {
          flex-direction: row;
          align-items: center;
          gap: 12px;
          padding: 16px 18px;
        }

        .skill-icon-sm {
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(195, 216, 197, 0.08);
          border: 1px solid var(--line);
          border-radius: 8px;
          transition: transform 0.3s ease, border-color 0.3s ease,
            background 0.3s ease, box-shadow 0.3s ease;
        }

        .skill-card:hover .skill-icon-sm {
          transform: perspective(300px) rotateY(-6deg) rotateX(3deg) scale(1.1);
          border-color: var(--card-color);
          background: var(--card-color-15);
          box-shadow: 0 3px 14px -2px var(--card-color-15);
        }

        .skill-icon-sm img {
          width: 22px;
          height: 22px;
          object-fit: contain;
        }

        .skill-name-sm {
          font-family: var(--font-display, "Unbounded", sans-serif);
          font-weight: 600;
          font-size: 14px;
          color: var(--fg);
          letter-spacing: -0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.3s ease;
        }

        .skill-card:hover .skill-name-sm {
          color: var(--card-color);
        }

        /* ---- Responsive ---- */
        @media (max-width: 900px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .bento-lg {
            padding: 20px;
            gap: 16px;
          }
          .skill-icon-lg {
            width: 44px;
            height: 44px;
          }
          .skill-icon-lg img {
            width: 32px;
            height: 32px;
          }
          .skill-name-lg {
            font-size: 17px;
          }
          .skill-desc-lg {
            font-size: 13px;
          }
        }

        @media (max-width: 720px) {
          .what-i-can-do {
            padding: 10vh 0;
          }

          .bento-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .bento-lg {
            grid-column: span 1;
            min-height: 0;
            padding: 20px;
            flex-direction: row;
            align-items: center;
            gap: 16px;
          }

          .skill-icon-lg {
            margin-bottom: 0;
            flex-shrink: 0;
          }

          .skill-content-lg {
            min-width: 0;
          }

          .skill-desc-lg {
            font-size: 13px;
          }

          .bento-sm {
            padding: 14px 16px;
            gap: 10px;
          }

          .skill-icon-sm {
            width: 32px;
            height: 32px;
          }

          .skill-name-sm {
            font-size: 13px;
          }

          .bento-glow {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
          .skill-card:hover {
            transform: none;
          }
          .skill-card:hover .skill-icon-lg,
          .skill-card:hover .skill-icon-sm {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
