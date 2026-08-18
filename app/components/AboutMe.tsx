"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "5+", label: "WordPress pages built & maintained" },
  { value: "486", label: "Internship hours at Oracle Petroleum Corp" },
  { value: "BSIT", label: "Info Tech graduate · ICCT Colleges" },
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
          I&apos;m JR Infante — a front-end web developer who turns layouts into
          motion-driven interfaces that feel considered instead of static.
        </p>
        <p className="about-body about-line">
          A BSIT graduate from ICCT Colleges with hands-on experience building web
          applications with HTML, CSS, JavaScript, and Node.js, plus an internship
          maintaining WordPress sites at Oracle Petroleum Corporation. I work across
          the front-end stack — from layout to API-driven data visualization — and
          pair it with design tools like Photoshop, Canva, and AI workflows to ship
          interfaces that feel as good as they look.
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
