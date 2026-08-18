"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

function splitLineChars(line: Element) {
  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        (child.textContent || "").split("").forEach((ch) => {
          const span = document.createElement("span");
          span.className = "char";
          span.textContent = ch === " " ? " " : ch;
          frag.appendChild(span);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child); // recurse into accent-word spans, chars inherit color
      }
    });
  };
  walk(line);
}

export default function Hero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = scope.current;
    if (!el) return;

    el.querySelectorAll(".hero-title .line").forEach(splitLineChars);

    const chars = el.querySelectorAll(".hero-title .char");
    if (!chars.length) return;

    gsap.set(chars, { yPercent: 120, opacity: 0 });
    gsap.set(".hero-eyebrow span", { yPercent: 120 });
    gsap.set(".hero-sub", { opacity: 0, y: 20 });

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.to(".hero-eyebrow span", { yPercent: 0, duration: 0.7 })
      .to(chars, { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.018 }, "-=0.4")
      .to(".hero-sub", { opacity: 1, y: 0, duration: 0.7 }, "-=0.5");

    }, { scope });

  return (
    <section className="hero" id="hero" ref={scope}>
      <div className="wrap">
        <div className="hero-eyebrow">
          <span>Interactive developer — motion &amp; front-end</span>
        </div>
        <h1 className="hero-title">
          <span className="line">HI</span>
          <span className="line">
            I&apos;M <span className="accent-word">JR</span>
          </span>
          <span className="line">INFANTE</span>
        </h1>
        <p className="hero-sub">Let&apos;s work together as a team.</p>
      </div>
      <div className="hero-scroll">
        <div className="bar"></div>
        SCROLL
      </div>
    </section>
  );
}
