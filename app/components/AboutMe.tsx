"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "3+", label: "Years building for the web" },
  { value: "20+", label: "Projects shipped" },
  { value: "100%", label: "Motion-driven interfaces" },
];

export default function AboutMe() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = scope.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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

  return (
    <section className="about" id="about" ref={scope}>
      <div className="wrap">
        <div className="section-eyebrow">About me</div>
        <p className="about-lead about-line">
          I&apos;m JR Infante — an interactive developer and digital designer who builds
          the small moments that make interfaces feel considered instead of static.
        </p>
        <p className="about-body about-line">
          With a background in IT support and a love for motion, graphics, and pixel art,
          I care about how a page feels as much as how it looks. This site is built as a
          GSAP + ScrollTrigger reference build — every scroll, hover, and load moment here
          is intentional.
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
