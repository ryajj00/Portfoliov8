"use client";

import Toolkit from "../components/toolkit";
import Contact from "../components/Contact";

export default function ToolkitPage() {
  return (
    <>
      <style jsx>{`
        .toolkit-page-hero {
          height: 100dvh;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 5rem 6vw 4rem;
          text-align: center;
          background:
            radial-gradient(circle at 50% 35%, rgba(195, 216, 197, 0.12), transparent 42%),
            var(--bg);
        }
        .toolkit-page-eyebrow {
          margin-bottom: 1.5rem;
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--accent);
        }
        .toolkit-page-title {
          max-width: 12ch;
          font-family: var(--font-display, "Unbounded", sans-serif);
          font-size: clamp(3.5rem, 11vw, 9rem);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.06em;
          text-transform: uppercase;
        }
        .toolkit-page-description {
          max-width: 42rem;
          margin-top: 2rem;
          color: var(--fg-dim);
          font-size: clamp(1rem, 1.8vw, 1.25rem);
          line-height: 1.6;
        }
        @media (max-width: 720px) {
          .toolkit-page-hero {
            height: 100dvh;
            min-height: 100svh;
            padding: 4rem 8vw 3rem;
          }
          .toolkit-page-description {
            margin-top: 1.5rem;
            font-size: 1rem;
          }
        }
      `}</style>

      <section className="toolkit-page-hero" aria-labelledby="toolkit-page-title">
        <p className="toolkit-page-eyebrow">How I work</p>
        <h1 className="toolkit-page-title" id="toolkit-page-title">
          The toolkit.
        </h1>
        <p className="toolkit-page-description">
          The technologies, design tools, and working principles behind each
          project I build.
        </p>
      </section>

      <Toolkit />
      <Contact />
    </>
  );
}
