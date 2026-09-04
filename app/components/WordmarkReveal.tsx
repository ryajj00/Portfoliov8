"use client";

import { useRef, useEffect, useState } from "react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { useGSAPSingleReveal } from "@/app/hooks/useGSAPReveal";

interface WordmarkRevealProps {
  /** Text to display in the wordmark */
  text?: string;
  /** CSS selector for the wordmark element (if not using default) */
  selector?: string;
}

export default function WordmarkReveal({
  text = "Let&apos;s Work",
  selector = "#wordmark",
}: WordmarkRevealProps = {}) {
  const scope = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(max-width: 720px)");
      setIsMobile(mq.matches);
      const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    }
  }, []);

  // Use shared hook for scroll-triggered reveal
  useGSAPSingleReveal(scope, {
    selector,
    fromVars: isMobile ? { opacity: 0 } : { yPercent: 60 },
    scrollTrigger: {
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
    delay: 0,
    onComplete: () => {
      // ScrollTrigger refresh handled by hook cleanup
    },
  });

  return (
    <div className="wordmark-clip">
      <span id="wordmark" dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
}