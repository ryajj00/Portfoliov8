"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { useMagnetic } from "@/app/hooks/useMagnetic";

const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#principles", label: "Toolkit" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoHover, setLogoHover] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".hero");
    const threshold = hero ? hero.offsetHeight * 0.75 : 120;

    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(() => {
    gsap.from(".nav-item", {
      opacity: 0,
      y: -20,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      delay: 1.6,
    });
  }, []);

  // Magnetic pull on desktop nav links (using shared hook)
  useMagnetic(navRef, {
    selector: ".nav-item",
    strength: 0.3,
    duration: 0.4,
    releaseDuration: 0.6,
    releaseEase: "elastic.out(1, 0.4)",
  });

  // Mobile menu GSAP transitions
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (menuOpen) {
      if (reduceMotion) {
        gsap.set(overlay, { display: "flex", opacity: 1 });
        gsap.set(".menu-link", { opacity: 1, y: 0 });
      } else {
        gsap.set(overlay, { display: "flex" });
        gsap.fromTo(
          overlay,
          { opacity: 0, clipPath: "circle(0% at 92% 6%)" },
          { opacity: 1, clipPath: "circle(150% at 92% 6%)", duration: 0.7, ease: "power4.inOut" }
        );
        gsap.fromTo(
          ".menu-link",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out", delay: 0.25 }
        );
      }
    } else {
      if (reduceMotion) {
        gsap.set(overlay, { display: "none" });
      } else {
        gsap.to(overlay, {
          clipPath: "circle(0% at 92% 6%)",
          opacity: 0,
          duration: 0.5,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.set(overlay, { display: "none" });
          },
        });
      }
    }
  }, [menuOpen, reduceMotion]);

  return (
    <>
      <style jsx>{`
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 130;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 28px 6vw;
          /* at top: dark ink over the bright photo */
          color: #292929;
          background: transparent;
          border-bottom: 1px solid transparent;
          transition: color 0.3s ease, background 0.3s ease,
            border-color 0.3s ease, padding 0.3s ease;
        }
        .nav.scrolled {
          color: #c3d8c5;
          background: rgba(41, 41, 41, 0.82);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid #3a3a3a;
          padding-top: 18px;
          padding-bottom: 18px;
        }
        .logo {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 18px;
          letter-spacing: 0.02em;
          display: inline-block;
          will-change: transform;
          /* keep the logo above the mobile overlay so tapping it closes the menu */
          z-index: 140;
          position: relative;
        }
        .nav-links {
          display: flex;
          gap: 32px;
          font-family: var(--font-mono);
          font-size: 13px;
          letter-spacing: 0.02em;
        }
        .nav-links a {
          position: relative;
          padding: 8px 14px;
          border-radius: 100px;
          opacity: 0.7;
          transition: opacity 0.25s ease, color 0.25s ease,
            background-color 0.25s ease;
          display: inline-block;
          will-change: transform;
        }
        /* hover: filled pill that inverts the current nav text color */
        .nav-links a:hover {
          opacity: 1;
          background-color: #292929;
          color: #c3d8c5;
        }
        .nav.scrolled .nav-links a:hover {
          background-color: #c3d8c5;
          color: #292929;
        }
        .nav-links a::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background-color: currentColor;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .nav-links a:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
        .menu-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: inherit;
          padding: 6px;
          z-index: 130;
          transition: color 0.3s ease;
        }
        .menu-toggle.open {
          color: #c3d8c5;
        }
        @media (max-width: 720px) {
          .menu-toggle.open {
            color: #c3d8c5;
          }
        }
        /* Mobile overlay menu */
        .menu-overlay {
          position: fixed;
          inset: 0;
          z-index: 120;
          display: none;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 40px;
          background: rgba(41, 41, 41, 0.97);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          color: #c3d8c5;
          will-change: transform, opacity;
        }
        .menu-link {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(2rem, 8vw, 3rem);
          text-transform: uppercase;
          color: #c3d8c5;
          opacity: 0;
          letter-spacing: 0.02em;
        }
        .menu-link:hover {
          color: var(--accent, #c3d8c5);
        }
                .menu-footer {
          position: absolute;
          bottom: 40px;
          left: 6vw;
          right: 6vw;
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--fg-dim, #9fb6a1);
        }
        @media (max-width: 720px) {
          .nav-links {
            display: none;
          }
          .menu-toggle {
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }
        }
        @media (min-width: 721px) {
          .menu-overlay {
            display: none !important;
          }
        }
      `}</style>

      <nav ref={navRef} className={`nav ${scrolled ? "scrolled" : ""}`}>
        <Link
          href="#hero"
          className="logo nav-item"
          onClick={() => setMenuOpen(false)}
          onMouseEnter={() => setLogoHover(true)}
          onMouseLeave={() => setLogoHover(false)}
        >
          {logoHover ? "JR INFANTE" : "RYAJ"}
        </Link>
        <div className="nav-links">
          {navLinks.map((link) => (
            <Link href={link.href} key={link.href} className="nav-item">
              {link.label}
            </Link>
          ))}
        </div>
        <button
          className={`menu-toggle${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
        </button>
      </nav>

      {/* Mobile fullscreen menu */}
      <div className="menu-overlay" id="mobile-menu" ref={overlayRef} aria-hidden={!menuOpen}>
        {navLinks.map((link) => (
          <Link
            href={link.href}
            key={link.href}
            className="menu-link"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <div className="menu-footer">
          <span>RYAJ</span>
          <span>infante.ryaj02@gmail.com</span>
        </div>
      </div>
    </>
  );
}
