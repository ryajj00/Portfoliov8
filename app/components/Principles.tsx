"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

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

export default function Principles() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = scope.current;
    if (!el) return;

    // Fallback for reduced motion + non-JS: show rows without the reveal.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.querySelectorAll<HTMLElement>(".tc-row").forEach((row) => {
        gsap.set(row, { opacity: 1, y: 0 });
      });
      return;
    }

    el.querySelectorAll(".tc-row").forEach((row) => {
      gsap.to(row, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: row,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, { scope });

  return (
    <section className="principles" id="principles" ref={scope}>
      <div className="wrap">
        <div className="section-eyebrow">Toolkit</div>
        {principles.map((principle) => (
          <div key={principle.time} className="tc-row">
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
