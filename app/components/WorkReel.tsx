"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

const projects = [
  {
    num: "01",
    title: "18S Music Studio",
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
  },
  {
    num: "03",
    title: "T-shirt Layouts",
    desc: "Print-on-demand apparel mock-ups — t-shirt layouts for an apparel customizer, from placement to production-ready renders.",
    tags: ["Mock-up", "Apparel Customizer", "Photoshop", "Canva"],
    img: "/imgs/workreel-imgs/03.png",
  },
  {
    num: "04",
    title: "PIXEL ART/ANIMATION",
    desc: "Hand-crafted pixel-art sprites and animation — character work built frame by frame as a pixel and sprite artist.",
    tags: ["Sprite Artist", "Pixel Artist", "Aseprite"],
    img: "/imgs/workreel-imgs/04.png",
  },
];

export default function WorkReel() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 720px)");
    setIsMobile(mq.matches);
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
  }, [isMobile]);

  /* ---- Desktop: sticky pinned scroll ---- */
  if (!isMobile) {
    const currentImg = projects[activeIdx].img;
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
          {projects.map((project, i) => (
            <div
              key={project.num}
              className={`reel-copy-frame${i === activeIdx ? " is-active" : ""}`}
            >
              <span className="frame-num">{project.num}</span>
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
              <div className="tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
                          </div>
          ))}
        </div>
      </section>
    );
  }

  /* ---- Mobile: vertical card stack ---- */
  return (
    <section className="reel-mobile" id="work">
      <div className="reel-mobile-head">
        <span>Performance and Experience</span>
      </div>
      {projects.map((project) => (
        <article key={project.num} className="reel-mobile-card">
          <div className="reel-mobile-bg" style={{ backgroundImage: `url(${project.img})` }} />
          <div className="reel-mobile-overlay" />
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
        </article>
      ))}
    </section>
  );
}
