
"use client";

import Work from "../components/work";
import Contact from "../components/contact";

export default function WorkPage() {
  return (
    <>
      <style jsx>{`
        .work-page-hero {
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
        .work-page-eyebrow {
          margin-bottom: 1.5rem;
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--accent);
        }
        .work-page-title {
          max-width: 12ch;
          font-family: var(--font-display, "Unbounded", sans-serif);
          font-size: clamp(3.5rem, 11vw, 9rem);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.06em;
          text-transform: uppercase;
        }
        .work-page-description {
          max-width: 42rem;
          margin-top: 2rem;
          color: var(--fg-dim);
          font-size: clamp(1rem, 1.8vw, 1.25rem);
          line-height: 1.6;
        }
        @media (max-width: 720px) {
          .work-page-hero {
            height: 100dvh;
            min-height: 100svh;
            padding: 4rem 8vw 3rem;
          }
          .work-page-description {
            margin-top: 1.5rem;
            font-size: 1rem;
          }
        }
      `}</style>

      <section className="work-page-hero" aria-labelledby="work-page-title">
        <p className="work-page-eyebrow">Selected work</p>
        <h1 className="work-page-title" id="work-page-title">
          Built to be seen.
        </h1>
        <p className="work-page-description">
          Digital experiences, visual systems, and interactive work made with
          intention from the first frame to the final detail.
        </p>
      </section>

      <Work />
      <Contact />
    </>
  );
}
