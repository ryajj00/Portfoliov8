"use client";

import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { useRef } from "react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { useMagnetic } from "@/app/hooks/useMagnetic";
import FooterLegal from "./FooterLegal";
import FooterContact from "./FooterContact";
import WordmarkReveal from "./WordmarkReveal";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const scope = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Wordmark reveal animation (GSAP-specific, keeps ScrollTrigger)
  useGSAP(() => {
    const wordmark = scope.current?.querySelector<HTMLElement>("#wordmark");
    if (wordmark) {
      if (reduceMotion) {
        gsap.set(wordmark, { y: 0 });
      } else {
        gsap.set(wordmark, { yPercent: 60 });
        gsap.to(wordmark, {
          yPercent: 30,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: wordmark,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }

    ScrollTrigger.refresh();
  }, { scope });

  // Magnetic footer contact links (using shared hook)
  useMagnetic(scope, {
    selector: ".footer-contact a",
    strength: 0.25,
    duration: 0.4,
    releaseDuration: 0.6,
    releaseEase: "elastic.out(1, 0.4)",
  });

  return (
    <footer id="contact" ref={scope}>
      <div className="footer-zone">
        <div className="footer-divider left"></div>
        <div className="footer-divider right"></div>

        <a href="https://www.linkedin.com/in/jr-infante-269514259" className="footer-side left">Write to LinkedIn →</a>
        <a href="tel:+639630445123" className="footer-side right">+ Write to Viber</a>

        <FooterContact />
      </div>

      <FooterLegal />

      <WordmarkReveal />
    </footer>
  );
}