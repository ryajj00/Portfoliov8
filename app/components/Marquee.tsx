"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

const items = [
  "FRONT-END DEV",
  "AI TOOLS",
  "GRAPHICS DESIGN",
  "PIXEL ART",
];

export default function Marquee() {
  const scope = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;
    if (reduceMotion) return;

    const marqueeWidth = track.scrollWidth / 2;
    const tween = gsap.to(track, {
      x: -marqueeWidth,
      duration: 90,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, { scope });

  return (
    <div className="marquee-strip" ref={scope}>
      <div className="marquee-track" ref={trackRef}>
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
}
