"use client";

import { useEffect, useState } from "react";

export default function BackToHero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.5);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style jsx>{`
        .back-to-hero {
          position: fixed;
          bottom: 32px;
          right: 32px;
          z-index: 100;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid var(--line);
          background: rgba(41, 41, 41, 0.85);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          color: var(--fg);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.3s ease, transform 0.3s ease, border-color 0.3s ease,
            background 0.3s ease;
          pointer-events: none;
        }
        .back-to-hero.show {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .back-to-hero:hover {
          border-color: var(--accent);
          background: rgba(195, 216, 197, 0.12);
        }
        .back-to-hero svg {
          width: 20px;
          height: 20px;
          stroke: currentColor;
          stroke-width: 2;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        @media (max-width: 720px) {
          .back-to-hero {
            bottom: 20px;
            right: 20px;
            width: 42px;
            height: 42px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .back-to-hero {
            transition: none;
          }
        }
      `}</style>

      <button
        className={`back-to-hero${visible ? " show" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <svg viewBox="0 0 24 24">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </>
  );
}
