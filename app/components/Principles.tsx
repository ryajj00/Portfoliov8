"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    time: "00:01",
    title: "Motion explains, it doesn't decorate",
    desc: "Every animation should answer a question the interface is already asking — what changed, what's next, what's connected to what.",
  },
  {
    time: "00:02",
    title: "One orchestrated moment beats ten small ones",
    desc: "Scattered micro-animations read as noise. A single well-timed sequence on load or scroll lands harder and gets remembered.",
  },
  {
    time: "00:03",
    title: "Easing is the personality",
    desc: "The same move with a different ease curve reads as a different brand entirely — snappy, elastic, weighty. I pick one vocabulary and stay in it.",
  },
  {
    time: "00:04",
    title: "Reduced motion is a real state, not an afterthought",
    desc: "Every build ships with a prefers-reduced-motion path that keeps the interface fully usable with the animation stripped out.",
  },
];

export default function Principles() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = scope.current;
    if (!el) return;

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
        <div className="section-eyebrow">How I approach motion</div>
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
