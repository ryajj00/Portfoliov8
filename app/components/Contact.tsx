"use client";

import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const EMAIL = "infante.ryaj02@gmail.com";
const PHONE = "+639630445123";

export default function Contact() {
  const scope = useRef<HTMLElement>(null);
  const [copiedId, setCopiedId] = useState<null | "phone" | "email">(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  /* ---------- copy-on-click ---------- */
  const copyToClipboard = async (id: "phone" | "email", text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      dotRef.current?.classList.add("is-copied");
      setTimeout(() => {
        setCopiedId(null);
        dotRef.current?.classList.remove("is-copied");
      }, 1600);
    } catch {
      // clipboard API unavailable — fall back to a prompt-free selection method
    }
  };

  useEffect(() => {
    // custom copy cursor for the phone + email links
    const dot = document.createElement("div");
    dot.className = "copy-cursor";
    document.body.appendChild(dot);
    dotRef.current = dot;

    const links = scope.current?.querySelectorAll<HTMLAnchorElement>(
      ".copyable"
    );
    if (!links || links.length === 0) return;

    const onMove = (e: MouseEvent) => {
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };
    const onEnter = () => dot.classList.add("is-visible");
    const onLeave = () => dot.classList.remove("is-visible");

    links.forEach((link) => {
      link.addEventListener("mousemove", onMove);
      link.addEventListener("mouseenter", onEnter);
      link.addEventListener("mouseleave", onLeave);
    });
    return () => {
      links.forEach((link) => {
        link.removeEventListener("mousemove", onMove);
        link.removeEventListener("mouseenter", onEnter);
        link.removeEventListener("mouseleave", onLeave);
      });
      dot.remove();
    };
  }, []);

  useGSAP(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    /* ---------- footer wordmark reveal ---------- */
    const wordmark = scope.current?.querySelector<HTMLElement>("#wordmark");
    if (wordmark) {
      if (reduceMotion) {
        gsap.set(wordmark, { y: 0 });
      } else {
        // Wordmark rests at translateY(30%) inside the clip (clean-up lock);
        // set a known start then reveal upward into the visible band.
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

    /* ---------- magnetic footer contact links ---------- */
    if (window.matchMedia("(pointer: fine)").matches) {
      const strength = 0.25;
      scope.current?.querySelectorAll<HTMLElement>(".footer-contact a").forEach((link) => {
        const onMove = (e: MouseEvent) => {
          // Offset from the link's anchor origin (x/y), not the bounding box,
          // so the pull stays centered on the text as it translates.
          const x = gsap.getProperty(link, "x") as number;
          const y = gsap.getProperty(link, "y") as number;
          const rect = link.getBoundingClientRect();
          const relX = e.clientX - (rect.left - x) - rect.width / 2;
          const relY = e.clientY - (rect.top - y) - rect.height / 2;
          gsap.to(link, {
            x: relX * strength,
            y: relY * strength,
            duration: 0.4,
            ease: "power3.out",
          });
        };
        const onLeave = () => {
          gsap.to(link, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
        };

        if (reduceMotion) {
          gsap.set(link, { x: 0, y: 0 });
        } else {
          link.addEventListener("mousemove", onMove);
          link.addEventListener("mouseleave", onLeave);
        }
      });
    }

    ScrollTrigger.refresh();
  }, { scope });

  return (
    <footer id="contact" ref={scope}>
      <div className="footer-zone">
        <div className="footer-divider left"></div>
        <div className="footer-divider right"></div>

        <a href="https://www.linkedin.com/in/jr-infante-269514259" className="footer-side left">Write to LinkedIn →</a>
        <a href="tel:+639630445123" className="footer-side right">+ Write to Viber</a>

        <div className="footer-contact">
          <a
            href="#"
            className="copyable"
            onClick={(e) => {
              e.preventDefault();
              copyToClipboard("phone", PHONE);
            }}
          >
            {copiedId === "phone" ? "Copied ✓" : "+63 963 044 5123"}
          </a>
          <a
            href="#"
            className="copyable"
            onClick={(e) => {
              e.preventDefault();
              copyToClipboard("email", EMAIL);
            }}
          >
            {copiedId === "email" ? "Copied ✓" : "infante.ryaj02@gmail.com"}
          </a>
        </div>
      </div>

      <div className="footer-legal-row">
        <div className="col">
          <strong>All rights reserved</strong><br />
          © 2026 — JR Dev
        </div>
        <div className="col center">
          <strong>Contact Me Anytime</strong><br />
          Remote — working worldwide
        </div>
        <div className="col right">
          <strong>Built with GSAP</strong><br />
          <a href="mailto:infante.ryaj02@gmail.com?subject=Privacy">Privacy</a>
        </div>
      </div>

      <div className="wordmark-clip">
        <span id="wordmark">Let&apos;s Work</span>
      </div>
    </footer>
  );
}