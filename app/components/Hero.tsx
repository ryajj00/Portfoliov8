"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef, useEffect } from "react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { restoreScrollPosition } from "@/app/utils/scroll";

export default function Hero() {
  const scope = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    restoreScrollPosition();
  }, []);

  useGSAP(() => {
    if (reduceMotion) return;

    const el = scope.current;
    if (!el) return;

    const loader = el.querySelector<HTMLElement>("#loader");
    const num = el.querySelector<HTMLElement>("#num");
    const bar = el.querySelector<HTMLElement>("#bar");
    if (!loader || !num || !bar) return;

    /* --- 0% -> 100% intro counter --- */
    const state = { val: 0 };
    const counter = gsap.to(state, {
      val: 100,
      duration: 2.2,
      ease: "power2.inOut",
      onUpdate: () => {
        const v = Math.round(state.val);
        num.textContent = String(v);
        bar.style.transform = "scaleX(" + v / 100 + ")";
      },
    });

    /* --- master intro timeline --- */
    const tl = gsap.timeline({ delay: 0.2 });

    tl.to(loader, {
      yPercent: -100,
      duration: 0.9,
      ease: "expo.inOut",
      onStart: () => counter.kill(),
      onComplete: () => {
        loader.style.display = "none";
      },
    }, 2.15)
      /* percent sign glows as we hit 100 (now always visible during count) */
      .fromTo(".hero .loader-count .pct", { opacity: 0.6 }, { opacity: 1, duration: 0.1 }, 2.0);

    /* reveal hero content beneath */
    tl.from(".hero .title", { y: 18, opacity: 0, duration: 0.6, ease: "power3.out" }, 2.5)
      .from(".hero .name .piece", {
        yPercent: 110,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "expo.out",
      }, 2.55)
      .from(".hero .name .period", { opacity: 0, scale: 0, duration: 0.4, ease: "back.out(2)" }, 2.85)
      .from(".hero .sub", { y: 22, opacity: 0, duration: 0.7, ease: "power3.out" }, 3.3)
      .from(".hero .scroll-cue", { y: 14, opacity: 0, duration: 0.7, ease: "power2.out" }, 3.5);

    /* --- ambient drift for blobs, never ending --- */
    gsap.to(".hero .blob-1", { x: 40, y: 30, duration: 9, yoyo: true, repeat: -1, ease: "sine.inOut" });
    gsap.to(".hero .blob-2", { x: -36, y: -24, duration: 11, yoyo: true, repeat: -1, ease: "sine.inOut" });
    gsap.to(".hero .blob-3", { x: 24, y: -18, duration: 7, yoyo: true, repeat: -1, ease: "sine.inOut" });

    /* --- scroll cue mouse wheel animation --- */
    gsap.to(".hero .scroll-cue .mouse-wheel", {
      y: 12,
      duration: 1.2,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut",
    });

    /* keep mouse wheel hidden while loading so users don't scroll during intro */
    document.body.style.overflow = "hidden";
    tl.eventCallback("onComplete", () => {
      document.body.style.overflow = "";
    });
  }, { scope });

  return (
    <section className="hero" id="hero" ref={scope}>
      {/* floating ambient shapes */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>

      {/* ---------- intro loader ---------- */}
      <div id="loader" aria-hidden="true">
        <h1 className="loader-count" id="count">
          <span id="num">0</span><span className="pct">%</span>
        </h1>
        <div className="loader-bar"><div className="loader-bar-fill" id="bar"></div></div>
        <p className="loader-label">Loading &middot; </p>
      </div>

      {/* ---------- hero content ---------- */}
      <h2 className="title">Hi, I&apos;m</h2>

      <h1 className="name">
        <span className="piece">JR </span>
        <span className="piece"> INFANTE</span><span className="period">.</span>
      </h1>

      <p className="sub">
        Personal <span className="accent">Portfolio</span>.
      </p>

      <div className="scroll-cue">
        <span className="mouse">
          <span className="mouse-wheel"></span>
        </span>
        Scroll
      </div>
    </section>
  );
}