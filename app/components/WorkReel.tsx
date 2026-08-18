"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    num: "01",
    title: "18S Music Studio",
    desc: "A front-end web app for booking rehearsal-studio rooms — clean UI with calendar views and live availability checks.",
    tags: ["UI", "Front-end", "Web App", "Next.js", "VS Code"],
    img: "/imgs/workreel-imgs/01.png",
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
    tags: ["Mock-up", "POD", "Apparel Customizer", "Photoshop", "Canva"],
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
  const scope = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const bgBackRef = useRef<HTMLDivElement>(null);
  const bgFrontRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const track = trackRef.current;
    const counter = counterRef.current;
    const bgBack = bgBackRef.current;
    const bgFront = bgFrontRef.current;
    if (!track || !counter || !bgBack || !bgFront) return;

    let front = true;

    const show = (img: string) => {
      if (front) {
        bgBack.style.backgroundImage = `url(${img})`;
        gsap.fromTo(bgBack, { opacity: 0 }, { opacity: 0.5, duration: 0.6, overwrite: true });
        gsap.to(bgFront, { opacity: 0, duration: 0.6, overwrite: true });
      } else {
        bgFront.style.backgroundImage = `url(${img})`;
        gsap.fromTo(bgFront, { opacity: 0 }, { opacity: 0.5, duration: 0.6, overwrite: true });
        gsap.to(bgBack, { opacity: 0, duration: 0.6, overwrite: true });
      }
      front = !front;
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      track.style.overflowX = "auto";
      track.style.paddingBottom = "24px";
      bgFront.style.backgroundImage = `url(${projects[0].img})`;
      bgFront.style.opacity = "0.5";
      bgBack.style.opacity = "0";
      return;
    }

    const cards = Array.from(scope.current!.querySelectorAll(".reel-card"));
    const scrollAmount = () => track.scrollWidth - window.innerWidth + window.innerWidth * 0.06;

    gsap.to(track, {
      x: () => -scrollAmount(),
      ease: "none",
      scrollTrigger: {
        trigger: scope.current,
        start: "top top",
        end: () => "+=" + scrollAmount() * 1.4,
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.min(cards.length - 1, Math.floor(self.progress * cards.length));
          counter.textContent = `FRAME 0${idx + 1} / 0${cards.length}`;
          const img = projects[idx].img;
          if (bgFront.dataset.img !== img) {
            bgFront.dataset.img = img;
            show(img);
          }
        },
      },
    });
  }, { scope });

  return (
    <section className="reel-pin" id="work" ref={scope}>
      <div
        className="reel-bg"
        ref={bgBackRef}
        data-img={projects[0].img}
        style={{ backgroundImage: `url(${projects[0].img})`, opacity: 0.5 }}
      />
      <div className="reel-bg" ref={bgFrontRef} style={{ opacity: 0 }} />
      <div className="reel-head">
        <span>Performance and Experience</span>
        <span id="frame-counter" ref={counterRef}>
          FRAME 01 / 04
        </span>
      </div>
      <div className="reel-track" ref={trackRef}>
        {projects.map((project) => (
          <div key={project.num} className="reel-card">
            <div
              className="reel-img"
              style={{ backgroundImage: `url(${project.img})` }}
              role="img"
              aria-label={project.title}
            />
            <span className="frame-num">{project.num}</span>
            <div>
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
              <div className="tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
