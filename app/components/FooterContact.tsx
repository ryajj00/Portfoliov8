"use client";

import { useEffect, useRef, useState } from "react";

interface FooterContactProps {
  /** Custom link to use instead of phone/email copyable links */
  customLink?: React.ReactNode;
  /** Phone number for copyable link */
  phone?: string;
  /** Email for copyable link */
  email?: string;
}

export default function FooterContact({
  customLink,
  phone = "+639630445123",
  email = "infante.ryaj02@gmail.com",
}: FooterContactProps = {}) {
  const [copiedId, setCopiedId] = useState<null | "phone" | "email">(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

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

  // Custom copy cursor for the phone + email links
  useEffect(() => {
    const dot = document.createElement("div");
    dot.className = "copy-cursor";
    document.body.appendChild(dot);
    dotRef.current = dot;

    const links = document.querySelectorAll<HTMLAnchorElement>(".copyable");
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

  if (customLink) {
    return (
      <div className="footer-contact">
        {customLink}
      </div>
    );
  }

  return (
    <div className="footer-contact">
      <a
        href="#"
        className="copyable"
        onClick={(e) => {
          e.preventDefault();
          copyToClipboard("phone", phone);
        }}
      >
        {copiedId === "phone" ? "Copied ✓" : phone}
      </a>
      <a
        href="#"
        className="copyable"
        onClick={(e) => {
          e.preventDefault();
          copyToClipboard("email", email);
        }}
      >
        {copiedId === "email" ? "Copied ✓" : email}
      </a>
    </div>
  );
}