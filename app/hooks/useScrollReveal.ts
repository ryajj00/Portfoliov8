"use client";

import { useEffect, useRef } from "react";

interface UseScrollRevealOptions extends IntersectionObserverInit {
  /** Callback when element becomes visible */
  onReveal?: (entry: IntersectionObserverEntry) => void;
  /** Callback when element becomes hidden (for toggleActions: reverse) */
  onHide?: (entry: IntersectionObserverEntry) => void;
}

/**
 * Hook for scroll-triggered reveal animations using IntersectionObserver.
 * Adds/removes 'is-visible' class on target elements.
 *
 * @param selector - CSS selector for elements to observe (relative to scope)
 * @param scopeRef - Ref to the parent element (defaults to document)
 * @param options - IntersectionObserver options + optional callbacks
 */
export function useScrollReveal(
  selector: string,
  scopeRef: React.RefObject<HTMLElement | null>,
  options: UseScrollRevealOptions = {}
) {
  const { onReveal, onHide, ...observerOptions } = options;

  useEffect(() => {
    const root = scopeRef.current ?? document;
    const elements = root.querySelectorAll<HTMLElement>(selector);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            onReveal?.(entry);
          } else {
            el.classList.remove("is-visible");
            onHide?.(entry);
          }
        });
      },
      { threshold: 0.12, ...observerOptions }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selector, scopeRef, onReveal, onHide, observerOptions.threshold, observerOptions.rootMargin]);
}

/**
 * Variant that triggers once (no toggleActions reverse)
 */
export function useScrollRevealOnce(
  selector: string,
  scopeRef: React.RefObject<HTMLElement | null>,
  options: Omit<UseScrollRevealOptions, "onHide"> = {}
) {
  const { onReveal, ...observerOptions } = options;

  useEffect(() => {
    const root = scopeRef.current ?? document;
    const elements = root.querySelectorAll<HTMLElement>(selector);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add("is-visible");
            onReveal?.(entry);
            observer.unobserve(el); // Only trigger once
          }
        });
      },
      { threshold: 0.12, ...observerOptions }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selector, scopeRef, onReveal, observerOptions.threshold, observerOptions.rootMargin]);
}