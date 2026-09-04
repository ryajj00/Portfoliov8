"use client";

import { useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface UseGSAPRevealOptions {
  /** Selector for elements to animate (relative to scope) */
  selector?: string;
  /** GSAP from/vars for the animation */
  fromVars?: gsap.TweenVars;
  /** ScrollTrigger configuration */
  scrollTrigger?: ScrollTrigger.InstanceVars;
  /** Optional delay before starting */
  delay?: number;
  /** Stagger amount for multiple elements */
  stagger?: number;
  /** Optional cleanup function */
  onComplete?: () => void;
}

/**
 * Shared hook for GSAP ScrollTrigger reveal animations.
 * Handles reduced motion, cleanup, and consistent defaults.
 *
 * @param scopeRef - Ref to the parent element containing target elements
 * @param options - Animation configuration
 */
export function useGSAPReveal(
  scopeRef: React.RefObject<HTMLElement | null>,
  options: UseGSAPRevealOptions = {}
) {
  const {
    selector = ".reveal",
    fromVars = { opacity: 0, y: 24 },
    scrollTrigger = {
      trigger: undefined, // will be set to scope
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    delay = 0,
    stagger = 0,
    onComplete,
  } = options;

  const reduceMotion = useReducedMotion();

  useGSAP(() => {
    const scope = scopeRef.current;
    if (!scope) return;
    if (reduceMotion) {
      // Set final state immediately for reduced motion
      const elements = scope.querySelectorAll<HTMLElement>(selector);
      elements.forEach((el) => {
        gsap.set(el, { opacity: 1, y: 0 });
      });
      return;
    }

    const ctx = gsap.context(() => {
      const trigger = scrollTrigger.trigger || scope;
      gsap.from(selector, {
        ...fromVars,
        stagger,
        delay,
        scrollTrigger: {
          ...scrollTrigger,
          trigger,
        },
      });
    }, scope);

    return () => ctx.revert();
  }, { scope: scopeRef, delay, stagger, reduceMotion });

  // Also handle reduced motion changes
  useEffect(() => {
    if (reduceMotion) {
      const scope = scopeRef.current;
      if (!scope) return;
      const elements = scope.querySelectorAll<HTMLElement>(selector);
      elements.forEach((el) => {
        gsap.set(el, { opacity: 1, y: 0 });
      });
    }
  }, [reduceMotion, scopeRef, selector]);
}

/**
 * Simpler variant for single-element ScrollTrigger animations (like WordmarkReveal, section headers)
 */
interface UseGSAPSingleRevealOptions {
  /** Selector for the single element to animate */
  selector: string;
  /** GSAP from/vars for the animation */
  fromVars?: gsap.TweenVars;
  /** ScrollTrigger configuration */
  scrollTrigger?: ScrollTrigger.InstanceVars;
  /** Optional delay */
  delay?: number;
  /** Called on complete */
  onComplete?: () => void;
}

export function useGSAPSingleReveal(
  scopeRef: React.RefObject<HTMLElement | null>,
  options: UseGSAPSingleRevealOptions
) {
  const { selector, fromVars = { opacity: 0, y: 30 }, scrollTrigger, delay = 0, onComplete } = options;
  const reduceMotion = useReducedMotion();

  useGSAP(() => {
    const scope = scopeRef.current;
    if (!scope) return;
    const element = scope.querySelector<HTMLElement>(selector);
    if (!element) return;

    if (reduceMotion) {
      gsap.set(element, { opacity: 1, y: 0 });
      onComplete?.();
      return;
    }

    const ctx = gsap.context(() => {
      const trigger = scrollTrigger.trigger || element;
      gsap.fromTo(
        element,
        fromVars,
        {
          ...fromVars,
          opacity: 1,
          y: 0,
          delay,
          scrollTrigger: {
            ...scrollTrigger,
            trigger,
          },
        }
      );
    }, scope);

    return () => {
      ctx.revert();
      onComplete?.();
    };
  }, { scope: scopeRef, selector, fromVars, scrollTrigger, delay, onComplete, reduceMotion });
}