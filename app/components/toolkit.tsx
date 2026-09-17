"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";

const principles = [
  {
    time: "00:01",
    title: "Front-end stack",
    desc: "WordPress, HTML5, CSS, JavaScript, Next.js, Tailwind & React — from layout to API-driven data visualization.",
  },
  {
    time: "00:02",
    title: "Design & productivity",
    desc: "Adobe Photoshop, Canva, MS Office, Notion — turning ideas into visuals and workflows that stay organized.",
  },
  {
    time: "00:03",
    title: "AI Tools",
    desc: "Claude Code, Cursor, and Stitch — working with AI assistants to build, ship, and iterate faster.",
  },
  {
    time: "00:04",
    title: "Networking & security",
    desc: "Basic computer networking, basic cybersecurity, and CCNA fundamentals from Cisco.",
  },
];

export default function Toolkit() {
  const scope = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = scope.current;
    if (!el) return;
    if (reduceMotion) {
      el.querySelectorAll<HTMLElement>(".tc-row").forEach((row) => {
        row.style.opacity = "1";
        row.style.transform = "none";
      });
      return;
    }
  }, [reduceMotion]);

  // CSS-based scroll reveal (handles is-visible class toggling)
  useScrollReveal(".tc-row", scope, { threshold: 0.15 });

  return (
    <section className="principles" id="toolkit" ref={scope}>
      <div className="wrap">
        <div className="section-eyebrow">Toolkit</div>
        {principles.map((principle, i) => (
          <div
            key={principle.time}
            className="tc-row"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div className="tc-code">{principle.time}</div>
            <div className="tc-body">
              <h4>{principle.title}</h4>
              <p>{principle.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
