"use client";

import { useEffect, useRef, useState } from "react";

interface CursorOptions {
  /** Selector for elements that trigger "Visit Site" cursor */
  visitSiteSelector?: string;
  /** Selector for elements that trigger copy cursor */
  copySelector?: string;
  /** Whether to enable the custom cursor */
  enabled?: boolean;
}

export function useCustomCursor(options: CursorOptions = {}) {
  const {
    visitSiteSelector = "[data-visit-site]",
    copySelector = ".copyable",
    enabled = true,
  } = options;

  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [cursorText, setCursorText] = useState("");
  const [cursorType, setCursorType] = useState<"default" | "visit" | "copy">("default");
  const [isVisible, setIsVisible] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const currentTargetRef = useRef<HTMLElement | null>(null);

  // Create cursor element
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    // Use inline styles with actual color values for reliability
    cursor.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 2px solid #c3d8c5;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: "Geist Mono", monospace;
      font-size: 9px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #c3d8c5;
      pointer-events: none;
      z-index: 9999;
      opacity: 1;
      transition: opacity 0.2s ease, transform 0.05s linear, width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background 0.2s ease;
      transform: translate(-50%, -50%);
      will-change: transform, opacity;
    `;
    document.body.appendChild(cursor);
    cursorRef.current = cursor;

    // Hide default cursor on body
    document.body.style.cursor = "none";

    // Set initial state to show default cursor
    setCursorType("default");
    setCursorText("");
    setIsVisible(true);

    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(updatePosition);
      }
    };

    const updatePosition = () => {
      const cursor = cursorRef.current;
      if (cursor) {
        cursor.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px) translate(-50%, -50%)`;
      }
      animationFrameRef.current = null;
    };

    // Use mouseover/mouseout which DO bubble (unlike mouseenter/mouseleave)
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const visitEl = target.closest(visitSiteSelector) as HTMLElement | null;
      const copyEl = target.closest(copySelector) as HTMLElement | null;

      if (visitEl && visitEl !== currentTargetRef.current) {
        currentTargetRef.current = visitEl;
        setCursorType("visit");
        setCursorText("VISIT");
        setIsVisible(true);
      } else if (copyEl && copyEl !== currentTargetRef.current) {
        currentTargetRef.current = copyEl;
        setCursorType("copy");
        setCursorText("Copy");
        setIsVisible(true);
      } else if (!visitEl && !copyEl) {
        // Show default cursor when over regular elements
        if (currentTargetRef.current) {
          currentTargetRef.current = null;
        }
        setCursorType("default");
        setCursorText("");
        setIsVisible(true);
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if we're actually leaving the special element (not just moving to a child)
      const visitEl = target.closest(visitSiteSelector) as HTMLElement | null;
      const copyEl = target.closest(copySelector) as HTMLElement | null;

      // If moving to a child of the same special element, don't hide
      if (visitEl === currentTargetRef.current || copyEl === currentTargetRef.current) {
        return;
      }

      // If leaving a special element entirely
      if (currentTargetRef.current) {
        currentTargetRef.current = null;
        setCursorType("default");
        setCursorText("");
        setIsVisible(true);
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      cursor.remove();
      document.body.style.cursor = "";
    };
  }, [enabled, visitSiteSelector, copySelector]);

  // Update cursor appearance based on type
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    if (!isVisible) {
      cursor.style.opacity = "0";
      return;
    }

    cursor.style.opacity = "1";

    switch (cursorType) {
      case "visit":
        cursor.style.width = "auto";
        cursor.style.height = "auto";
        cursor.style.padding = "6px 12px";
        cursor.style.borderRadius = "100px";
        cursor.style.border = "none";
        cursor.style.background = "#c3d8c5";
        cursor.style.color = "#292929";
        cursor.textContent = cursorText;
        break;
      case "copy":
        cursor.style.width = "72px";
        cursor.style.height = "72px";
        cursor.style.padding = "0";
        cursor.style.borderRadius = "50%";
        cursor.style.border = "1px solid #c3d8c5";
        cursor.style.background = "#c3d8c5";
        cursor.style.color = "#000";
        cursor.textContent = cursorText;
        break;
      default:
        cursor.style.width = "24px";
        cursor.style.height = "24px";
        cursor.style.padding = "0";
        cursor.style.borderRadius = "50%";
        cursor.style.border = "2px solid #c3d8c5";
        cursor.style.background = "transparent";
        cursor.textContent = "";
        break;
    }
  }, [cursorType, cursorText, isVisible]);

  return { isVisible, cursorType };
}