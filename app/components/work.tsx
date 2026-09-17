"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { useGSAPSingleReveal } from "@/app/hooks/useGSAPReveal";

const projects = [
  {
    num: "01",
    title: "Music Studio Booking App",
    desc: "A front-end web app for booking rehearsal-studio rooms — clean UI with calendar views and live availability checks.",
    tags: ["UI", "Front-end", "Web App", "Next.js", "VS Code"],
    img: "/imgs/workreel-imgs/01.png",
    link: "/work/18s-music-studio",
  },
  {
    num: "02",
    title: "Poster Events",
    desc: "Event posters as graphic design pieces — bold typography and layout that turns a gig into a visual story.",
    tags: ["Graphic design", "Poster Events", "Photoshop", "Canva"],
    img: "/imgs/workreel-imgs/02.png",
    link: "/work/poster-events",
  },
  {
    num: "03",
    title: "T-shirt Layouts",
    desc: "Print-on-demand apparel mock-ups — t-shirt layouts for an apparel customizer, from placement to production-ready renders.",
    tags: ["Mock-up", "Apparel Customizer", "Photoshop", "Canva"],
    img: "/imgs/workreel-imgs/03.png",
    link: "/work/tshirt-layouts",
  },
  {
    num: "04",
    title: "PIXEL ART/ANIMATION",
    desc: "Hand-crafted pixel-art sprites and animation — character work built frame by frame as a pixel and sprite artist.",
    tags: ["Sprite Artist", "Pixel Artist", "Aseprite"],
    img: "/imgs/workreel-imgs/04.png",
    link: "/work/pixel-art",
  },
];

const VisitSiteButton = ({ href }: { href: string }) => (
  <a
    href={href}
    className="visit-site-btn"
    style={{ textDecoration: "none", color: "inherit" }}
  >
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
    Visit Site
  </a>
);

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(max-width: 720px)").matches;
    }
    return false;
  });
  const reduceMotion = useReducedMotion();

  
  // Use shared hook for "Performance and Experience" text reveal
  useGSAPSingleReveal(sectionRef, {
    selector: ".reel-head span:first-child, .reel-mobile-head-card span",
    fromVars: { opacity: 0, y: 30 },
    scrollTrigger: {
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 720px)");
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    if (!section) return;
    if (reduceMotion) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = -rect.top;
      const sectionHeight = rect.height - window.innerHeight;
      if (sectionHeight <= 0) return;
      const progress = Math.max(0, Math.min(1, sectionTop / sectionHeight));
      const idx = Math.min(
        projects.length - 1,
        Math.floor(progress * projects.length)
      );
      setActiveIdx(idx);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile, reduceMotion]);

  const renderProjectCard = (project: typeof projects[0], _i: number, isActive: boolean) => (
    <div
      key={project.num}
      className={`reel-copy-frame${isActive ? " is-active" : ""}`}
    >
      <span className="frame-num">{project.num}</span>
      <h3>{project.title}</h3>
      <p>{project.desc}</p>
      <div className="tags">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <VisitSiteButton href={project.link} />
    </div>
  );

  /* ---- Desktop: sticky pinned scroll ---- */
  if (!isMobile) {
    const currentProject = projects[activeIdx];
    const currentImg = currentProject.img;

    return (
      <section className="reel-section" id="work" ref={sectionRef}>
        <div className="reel-sticky">
          <div className="reel-bg-layer" style={{ backgroundImage: `url(${currentImg})` }} />
          <div className="reel-head">
            <span>Performance and Experience</span>
            <span>
              FRAME 0{activeIdx + 1} / 0{projects.length}
            </span>
          </div>
          {renderProjectCard(currentProject, activeIdx, true)}
        </div>
      </section>
    );
  }

  /* ---- Mobile: vertical card stack ---- */
  return (
    <section className="reel-mobile" id="work" ref={sectionRef}>
      {projects.map((project) => (
        <div key={project.num} className="reel-mobile-card">
          <a href={project.link} className="reel-mobile-card-link" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="reel-mobile-bg" style={{ backgroundImage: `url(${project.img})` }} />
            <div className="reel-mobile-overlay" />
            <div className="reel-mobile-head-card">
              <span>Performance and Experience</span>
            </div>
            <div className="reel-mobile-content">
              <span className="reel-mobile-num">{project.num} / 0{projects.length}</span>
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
              <div className="reel-mobile-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </a>
          <VisitSiteButton href={project.link} />
        </div>
      ))}
    </section>
  );
}
