"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "5+", label: "WordPress pages built & maintained" },
  { value: "486", label: "Internship hours at Oracle Petroleum Corp" },
  { value: "BSIT", label: "Info Tech graduate · ICCT Colleges" },
];

export default function AboutMe() {
  const scope = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // GSAP-based scroll reveal for about-line elements (preserves original animation)
  useGSAP(() => {
    const el = scope.current;
    if (!el) return;
    if (reduceMotion) return;

    el.querySelectorAll(".about-line").forEach((line, i) => {
      gsap.from(line, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        delay: i * 0.1,
        scrollTrigger: {
          trigger: line,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, { scope });

  // Also add CSS-based reveal for compatibility
  useScrollReveal(".about-line", scope, { threshold: 0.15 });

  return (
    <section className="about" id="about" ref={scope}>
      <div className="wrap">
        <p className="about-lead about-line">
          I&apos;m JR Infante — a front-end web developer who turns layouts into
          motion-driven interfaces that feel considered instead of static.
        </p>
        <p className="about-body about-line">
          Front-end developer with a background in digital art, an obsession with
          fluid motion, and an eye for sharp, modern aesthetics.
          I don't do static layouts, I build motion-driven web applications that
          turn visitors into believers.
        </p>
        <div className="about-stats">
          {stats.map((s) => (
            <div key={s.label} className="about-stat">
              <span className="about-value">{s.value}</span>
              <span className="about-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
