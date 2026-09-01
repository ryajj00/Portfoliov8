"use client";

import { useEffect, useState } from "react";

/**
 * Returns true if the device has a fine pointer (mouse, trackpad).
 * Useful to skip hover/magnetic effects on touch devices.
 */
export function useFinePointer(): boolean {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setFine(mq.matches);

    const onChange = (e: MediaQueryListEvent) => setFine(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return fine;
}