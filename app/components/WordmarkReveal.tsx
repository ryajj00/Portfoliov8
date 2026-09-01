"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

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

  useGSAP(() => {
    const wordmark = scope.current?.querySelector<HTMLElement>(selector);
    if (wordmark) {
      if (reduceMotion) {
        gsap.set(wordmark, { y: 0 });
      } else {
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

    ScrollTrigger.refresh();
  }, { scope });

  return (
    <div className="wordmark-clip">
      <span id="wordmark" dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
}