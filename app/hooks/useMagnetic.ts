"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface UseMagneticOptions {
  /** Magnetic pull strength (0-1) */
  strength?: number;
  /** Duration of pull animation */
  duration?: number;
  /** Duration of release animation */
  releaseDuration?: number;
  /** Release ease function */
  releaseEase?: string;
  /** Selector for elements to make magnetic (relative to scope) */
  selector?: string;
}

/**
 * Hook for magnetic hover effect on elements.
 * Elements follow the mouse cursor with a spring-like motion.
 *
 * @param scopeRef - Ref to the parent element containing magnetic items
 * @param options - Configuration options
 */
export function useMagnetic(
  scopeRef: React.RefObject<HTMLElement | null>,
  options: UseMagneticOptions = {}
) {
  const {
    strength = 0.25,
    duration = 0.4,
    releaseDuration = 0.6,
    releaseEase = "elastic.out(1, 0.4)",
    selector = ".magnetic",
  } = options;

  const handlersRef = useRef<
    Map<HTMLElement, { onMove: (e: MouseEvent) => void; onLeave: () => void }>
  >(new Map());

  useEffect(() => {
    const root = scopeRef.current;
    if (!root) return;

    const items = root.querySelectorAll<HTMLElement>(selector);
    if (items.length === 0) return;

    items.forEach((item) => {
      const onMove = (e: MouseEvent) => {
        const rect = item.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;
        gsap.to(item, {
          x: relX * strength,
          y: relY * strength,
          duration,
          ease: "power3.out",
        });
      };
      const onLeave = () => {
        gsap.to(item, { x: 0, y: 0, duration: releaseDuration, ease: releaseEase });
      };
      item.addEventListener("mousemove", onMove);
      item.addEventListener("mouseleave", onLeave);
      handlersRef.current.set(item, { onMove, onLeave });
    });

    return () => {
      handlersRef.current.forEach(({ onMove, onLeave }, item) => {
        item.removeEventListener("mousemove", onMove);
        item.removeEventListener("mouseleave", onLeave);
      });
      handlersRef.current.clear();
    };
  }, [scopeRef, selector, strength, duration, releaseDuration, releaseEase]);
}