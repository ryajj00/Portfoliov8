"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Code, Layers, Monitor, Smartphone, Zap } from "lucide-react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import FooterLegal from "@/app/components/FooterLegal";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Room Booking",
    desc: "Browse rehearsal rooms by date/time with real-time availability. Prevents double-bookings and shows open slots instantly.",
    icon: Calendar,
    highlight: "Real-time sync",
  },
  {
    title: "Calendar Views",
    desc: "Monthly & weekly layouts with room-type filters. Spot scheduling gaps at a glance.",
    icon: Monitor,
    highlight: "Drag-to-book",
  },
  {
    title: "Live Availability",
    desc: "Status badges update without refresh — green for open, red for booked, yellow for pending.",
    icon: Zap,
    highlight: "WebSocket-ready",
  },
  {
    title: "Responsive UI",
    desc: "Mobile-first design. Book rooms between sessions from any device.",
    icon: Smartphone,
    highlight: "Touch-optimized",
  },
  {
    title: "Clean Interface",
    desc: "Zero-clutter booking flow. Only essential info — no ads, no upsells.",
    icon: Layers,
    highlight: "Focus mode",
  },
  {
    title: "Front-end Architecture",
    desc: "Next.js App Router, React components, TypeScript, Tailwind CSS, and GSAP-powered interactions.",
    icon: Code,
    highlight: "Interactive build",
  },
];

const techStack: Array<{ name: string; logo: string; href?: string }> = [
  { name: "Next.js", logo: "/imgs/svg/nextjs-icon-svgrepo-com.svg" },
  { name: "TypeScript", logo: "/imgs/svg/typescript-svgrepo-com.svg" },
  { name: "Tailwind CSS", logo: "/imgs/svg/tailwindcss-icon-svgrepo-com.svg" },
  {
    name: "maintenance",
    logo: "/imgs/svg/web-svgrepo-com.svg",
  },
];

// Music studio gallery images
interface MusicStudioFile {
  filename: string;
  alt: string;
  width?: number;
  height?: number;
}

const musicStudioFiles: MusicStudioFile[] = [
  { filename: "2.png", alt: "Live availability" },
  { filename: "4.png", alt: "Mobile responsive interface" },
  { filename: "1.png", alt: "Clean booking flow" },
];

const highlights = [
  { value: "24", label: "Room Slots", suffix: "/7" },
  { value: "3", label: "Calendar Views", suffix: "" },
  { value: "100", label: "Responsive", suffix: "%" },
  { value: "1", label: "Booking Flow", suffix: "" },
];


export default function Project18SMusicStudio() {
  const [loaded, setLoaded] = useState(false);
  const scope = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  // GSAP scroll animations
  useGSAP(() => {
    if (reduceMotion) return;

    const el = scope.current;
    if (!el) return;

    gsap.from(".feature-card", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.08,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".project-features",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(".metric-value", {
      opacity: 0,
      y: 30,
      duration: 0.9,
      stagger: 0.1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".project-highlights",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(".tech-card", {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.08,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".project-tech",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(".gallery-item", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.06,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".project-gallery",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    const wordmark = scope.current?.querySelector<HTMLElement>("#wordmark");
    if (wordmark) {
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

    ScrollTrigger.refresh();
  }, { scope });

  useEffect(() => {
    if (reduceMotion) return;
    const metrics = document.querySelectorAll<HTMLElement>(".metric-value[data-count]");
    metrics.forEach((el) => {
      const target = parseInt(el.dataset.count || "0", 10);
      const duration = 1500;
      const startTime = performance.now();
      const animate = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased).toLocaleString() + (el.dataset.suffix || "");
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    });
  }, [reduceMotion]);

  const router = useRouter();
  const handleBackToWork = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      router.push("/#work");
    },
    [router]
  );

  return (
    <>
      <style jsx>{`
        /* ---- Intro loader ---- */
        .intro-loader {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #100c09;
          color: #f3e6cf;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: opacity 0.6s ease, visibility 0.6s ease;
        }
        .intro-loader.done {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }
        .intro-title {
          font-family: var(--font-display, "Unbounded", sans-serif);
          font-weight: 800;
          font-size: clamp(1.8rem, 5vw, 3.5rem);
          text-transform: uppercase;
          letter-spacing: -0.02em;
          color: var(--fg);
          opacity: 0;
          transform: translateY(14px);
          animation: introFadeUp 0.7s ease 0.3s forwards;
        }
        .intro-sub {
          font-family: var(--font-mono);
          font-size: 13px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          opacity: 0;
          animation: introFadeUp 0.6s ease 0.7s forwards;
        }
        .intro-bar {
          width: 120px;
          height: 2px;
          background: var(--line);
          border-radius: 2px;
          margin-top: 20px;
          overflow: hidden;
          opacity: 0;
          animation: introFadeUp 0.4s ease 1s forwards;
        }
        .intro-bar-fill {
          height: 100%;
          background: var(--accent);
          border-radius: 2px;
          transform: scaleX(0);
          transform-origin: left;
          animation: introBarFill 1s ease 1.1s forwards;
        }
        @keyframes introFadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes introBarFill {
          to { transform: scaleX(1); }
        }

        .project-page {
          --bg: #100c09;
          --bg-alt: #17110d;
          --fg: #f3e6cf;
          --fg-dim: #ac9d83;
          --accent: #f2c55f;
          --accent-2: #b99850;
          --line: #3a2a18;
          min-height: 100vh;
          padding: 0;
          background: var(--bg);
          color: var(--fg);
        }
        .next-footer {
          background: var(--bg);
        }

        /* ---- Hero ---- */
        .project-hero {
          position: relative;
          width: 100%;
          height: 65svh;
          min-height: 420px;
          overflow: hidden;
        }
        .project-hero-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center top;
          opacity: 0.4;
        }
        .project-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 30%, var(--bg) 100%);
        }
        .project-hero-content {
          position: relative;
          z-index: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 0 6vw 48px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .project-eyebrow {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--accent);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .project-title {
          font-family: var(--font-display, "Unbounded", sans-serif);
          font-weight: 800;
          font-size: clamp(2rem, 6vw, 4.5rem);
          line-height: 1.05;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .project-tagline {
          font-size: clamp(16px, 2vw, 20px);
          color: var(--fg-dim);
          max-width: 50ch;
          line-height: 1.6;
        }

        /* ---- Meta + Tech Stack combined ---- */
        .project-meta-tech {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 48px;
          padding: 32px 6vw;
          max-width: 1200px;
          margin: 0 auto;
          border-bottom: 1px solid var(--line);
          flex-wrap: wrap;
        }
        .meta-section {
          display: flex;
          gap: 32px;
          flex-wrap: wrap;
        }
        .meta-item { display: flex; flex-direction: column; gap: 6px; }
        .meta-label {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--fg-dim);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .meta-value {
          font-family: var(--font-display, "Unbounded", sans-serif);
          font-weight: 600;
          font-size: 15px;
          color: var(--fg);
        }
        .tech-grid-inline {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .tech-card-inline {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 12px 16px;
          border: 1px solid var(--line);
          border-radius: 8px;
          background: var(--bg-alt);
          transition: border-color 0.3s ease, transform 0.3s ease;
        }
        .tech-card-inline:hover {
          border-color: var(--accent);
          transform: translateY(-2px);
        }
        .tech-logo-inline {
          width: 38px;
          height: 38px;
          object-fit: contain;
          filter: grayscale(100%) brightness(1.2);
          transition: filter 0.3s ease, transform 0.3s ease;
        }
        .tech-card-inline:hover .tech-logo-inline {
          filter: grayscale(0%) brightness(1);
          transform: scale(1.1);
        }
        .tech-card-link {
          color: inherit;
          text-decoration: none;
        }
        /* ---- Highlights / Metrics ---- */
        .project-highlights { max-width: 1200px; margin: 80px auto 0; padding: 0 6vw; }
        .highlights-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .highlight-card {
          padding: 32px 24px;
          border: 1px solid var(--line);
          border-radius: 12px;
          background: var(--bg-alt);
          text-align: center;
          transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }
        .highlight-card:hover {
          border-color: var(--accent);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -12px rgba(195, 216, 197, 0.15);
        }
        .metric-value {
          font-family: var(--font-display, "Unbounded", sans-serif);
          font-weight: 800;
          font-size: clamp(2.5rem, 5vw, 4rem);
          line-height: 1.1;
          color: var(--accent);
          display: block;
          margin-bottom: 8px;
        }
        .metric-label {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--fg-dim);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        /* ---- Gallery ---- */
        .project-gallery { max-width: 1200px; margin: 80px auto 0; padding: 0 6vw; }
        .gallery-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 30px;
        }
        .gallery-item {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--line);
          background: var(--bg-alt);
          transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }
        .gallery-item:hover {
          border-color: var(--accent);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -12px rgba(195, 216, 197, 0.15);
        }
        .gallery-item:first-child {
          grid-column: 1 / -1;
          aspect-ratio: 16 / 9;
        }
        .gallery-item:not(:first-child) {
          aspect-ratio: 4 / 3;
        }
        .gallery-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          background: var(--bg);
        }
        .gallery-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .gallery-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 16px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--fg);
          background: linear-gradient(to top, rgba(41, 41, 41, 0.9), transparent);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* ---- Features grid ---- */
        .project-features {
          max-width: 1200px;
          margin: 80px auto 0;
          padding: 0 6vw;
        }
        .section-title {
          font-family: var(--font-display, "Unbounded", sans-serif);
          font-weight: 800;
          font-size: clamp(24px, 3.5vw, 36px);
          margin-bottom: 40px;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .feature-card {
          padding: 28px;
          border: 1px solid var(--line);
          border-radius: 10px;
          background: var(--bg-alt);
          transition: border-color 0.3s ease, transform 0.3s ease;
        }
        .feature-card:hover { border-color: var(--accent); transform: translateY(-2px); }
        .feature-num { font-family: var(--font-mono); font-size: 12px; color: var(--accent); margin-bottom: 14px; }
        .feature-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }
        .feature-icon {
          flex-shrink: 0;
          width: 20px;
          height: 20px;
          color: var(--accent);
        }
        .feature-title { font-family: var(--font-display, "Unbounded", sans-serif); font-weight: 600; font-size: 16px; }
        .feature-desc { font-size: 14px; line-height: 1.6; color: var(--fg-dim); }
        .feature-highlight {
          display: inline-block;
          margin-top: 12px;
          padding: 4px 10px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--bg);
          background: var(--accent);
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* ---- Tech Stack ---- */
        .project-tech { max-width: 1200px; margin: 80px auto 0; padding: 0 6vw; }
        .tech-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .tech-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 28px;
          border: 1px solid var(--line);
          border-radius: 10px;
          background: var(--bg-alt);
          transition: border-color 0.3s ease, transform 0.3s ease;
        }
        .tech-card:hover { border-color: var(--accent); transform: translateY(-2px); }
        .tech-logo {
          width: 60px;
          height: 60px;
          object-fit: contain;
          filter: grayscale(100%) brightness(1.2);
          margin-bottom: 16px;
          transition: filter 0.3s ease, transform 0.3s ease;
        }
        .tech-card:hover .tech-logo {
          filter: grayscale(0%) brightness(1);
          transform: scale(1.1);
        }
        .tech-name {
          font-family: var(--font-display, "Unbounded", sans-serif);
          font-weight: 600;
          font-size: 16px;
          color: var(--fg);
        }

        /* ---- Back link ---- */
        .project-back { max-width: 1200px; margin: 60px auto 0; padding: 0 6vw; }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 18px;
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--fg);
          background: var(--bg-alt);
          border: 1px solid var(--accent);
          border-radius: 999px;
          text-decoration: none;
          transition: color 0.25s ease, background 0.25s ease, gap 0.25s ease, transform 0.25s ease;
          cursor: pointer;
        }
        .back-link:hover {
          color: var(--bg);
          background: var(--accent);
          gap: 14px;
          transform: translateX(2px);
        }
        .back-link:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 4px;
        }

        /* ---- Responsive ---- */
        @media (max-width: 900px) {
          .features-grid { grid-template-columns: repeat(2, 1fr); }
          .highlights-grid { grid-template-columns: repeat(2, 1fr); }
          .gallery-grid { grid-template-columns: repeat(2, 1fr); }
          .tech-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 720px) {
          .project-hero { height: 50svh; min-height: 340px; }
          .features-grid { grid-template-columns: 1fr; }
          .highlights-grid { grid-template-columns: repeat(2, 1fr); }
          .gallery-grid { grid-template-columns: 1fr; }
          .tech-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
          .tech-card { padding: 16px; }
          .tech-logo { width: 40px; height: 40px; }
        }

        /* Override global footer-zone to remove extra space */
        .next-footer .footer-zone {
          min-height: auto;
          padding: 6vh 6vw 4vh;
        }

        @media (prefers-reduced-motion: reduce) {
          .intro-title, .intro-sub, .intro-bar { animation: none; opacity: 1; transform: none; }
          .intro-bar-fill { animation: none; transform: scaleX(1); }
          .home-intro-bar-fill { animation: none; transform: scaleX(1); }
        }
      `}</style>

      {/* Page intro loader */}
      <div className={`intro-loader${loaded ? " done" : ""}`}>
        <h1 className="intro-title">18S Music Studio</h1>
        <span className="intro-sub">Web App</span>
        <div className="intro-bar"><div className="intro-bar-fill" /></div>
      </div>

      <article className="project-page" ref={scope}>
        {/* Hero */}
        <div className="project-hero">
          <div className="project-hero-bg" style={{ backgroundImage: "url(/imgs/workreel-imgs/01.png)" }} />
          <div className="project-hero-overlay" />
          <div className="project-hero-content">
            <span className="project-eyebrow">Project 01</span>
            <h1 className="project-title">18S Music Studio</h1>
            <p className="project-tagline">
              A front-end web app for booking rehearsal-studio rooms — clean UI
              with calendar views and live availability checks.
            </p>
          </div>
        </div>

        {/* Meta + Tech Stack combined */}
        <div className="project-meta-tech">
          <div className="meta-section">
            <div className="meta-item">
              <span className="meta-label">Role</span>
              <span className="meta-value">Front-end Developer</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Type</span>
              <span className="meta-value">Web App</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Status</span>
              <span className="meta-value">Built</span>
            </div>
          </div>
          <div className="tech-grid-inline">
            {techStack.map((t) => (
              t.href ? (
                <a
                  key={t.name}
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tech-card-inline tech-card-link"
                >
                  <Image
                    src={t.logo}
                    alt={t.name}
                    width={38}
                    height={38}
                    className="tech-logo-inline"
                  />
                </a>
              ) : (
                <div key={t.name} className="tech-card-inline">
                  <Image
                    src={t.logo}
                    alt={t.name}
                    width={38}
                    height={38}
                    className="tech-logo-inline"
                  />
                </div>
              )
            ))}
          </div>
                  </div>

        {/* Highlights / Metrics */}
        <div className="project-highlights">
          <div className="highlights-grid">
            {highlights.map((h) => (
              <div key={h.label} className="highlight-card">
                <span
                  className="metric-value"
                  data-count={h.value}
                  data-suffix={h.suffix}
                >
                  0
                </span>
                <span className="metric-label">{h.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div className="project-gallery">
          <div className="gallery-grid">
            <div className="gallery-item">
              <video
                className="gallery-video"
                src="/imgs/workreel-imgs/musicstudio/Jamspace Vid.mp4"
                poster="/imgs/workreel-imgs/musicstudio/Jamspace.png"
                preload="metadata"
                playsInline
                autoPlay
                muted
                loop
              />
              <span className="gallery-caption">Studio booking experience</span>
            </div>
            {musicStudioFiles.map((item, i) => (
              <div key={i} className="gallery-item">
                {item.width && item.height ? (
                  <Image
                    className="gallery-image"
                    src={`/imgs/workreel-imgs/musicstudio/${item.filename}`}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    loading="lazy"
                    style={{ width: '100%', height: 'auto', objectFit: "contain" }}
                  />
                ) : (
                  <Image
                    className="gallery-image"
                    src={`/imgs/workreel-imgs/musicstudio/${item.filename}`}
                    alt={item.alt}
                    width={800}
                    height={600}
                    sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    loading="lazy"
                    style={{ width: '100%', height: 'auto', objectFit: "cover" }}
                  />
                )}
                <span className="gallery-caption">{item.alt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="project-features">
          <h2 className="section-title">What it does</h2>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={f.title} className="feature-card">
                <span className="feature-num">0{i + 1}</span>
                <div className="feature-header">
                  <f.icon className="feature-icon" size={20} aria-hidden="true" />
                  <h3 className="feature-title">{f.title}</h3>
                </div>
                <p className="feature-desc">{f.desc}</p>
                {f.highlight && <span className="feature-highlight">{f.highlight}</span>}
              </div>
            ))}
          </div>

        </div>

        {/* Tech Stack */}
        <div className="project-tech">
          <h2 className="section-title">Tools</h2>
          <div className="tech-grid">
            {techStack.map((t) => (
              t.href ? (
                <a
                  key={t.name}
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tech-card tech-card-link"
                >
                  <Image
                    className="tech-logo"
                    src={t.logo}
                    alt={t.name}
                    width={60}
                    height={60}
                  />
                  <span className="tech-name">{t.name}</span>
                </a>
              ) : (
                <div key={t.name} className="tech-card">
                  <Image
                    className="tech-logo"
                    src={t.logo}
                    alt={t.name}
                    width={60}
                    height={60}
                  />
                  <span className="tech-name">{t.name}</span>
                </div>
              )
            ))}
          </div>
        </div>

        {/* Back */}
        <div className="project-back">
          <a className="back-link" onClick={handleBackToWork}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Work
          </a>
        </div>

        {/* Footer - Contact style (same as main page) */}
        <footer id="contact" className="next-footer">
          <div className="footer-zone">
            <div className="footer-divider left"></div>
            <div className="footer-divider right"></div>

            <a href="https://www.linkedin.com/in/jr-infante-269514259" className="footer-side left">Write to LinkedIn →</a>
            <a href="tel:+639630445123" className="footer-side right">+ Write to Viber</a>

            <div className="footer-contact">
              <a href="/work/poster-events">
                Poster Events
              </a>
            </div>
          </div>

          <FooterLegal />

          <div className="wordmark-clip">
            <span id="wordmark">Let&apos;s Work</span>
          </div>
        </footer>
      </article>
    </>
  );
}
