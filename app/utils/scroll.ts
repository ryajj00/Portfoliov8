"use client";

/**
 * Restores scroll position from localStorage.
 * Call on component mount to return user to previous position.
 */
export function restoreScrollPosition(key = "scrollY"): void {
  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      requestAnimationFrame(() => {
        window.scrollTo(0, parseInt(saved, 10));
        localStorage.removeItem(key);
      });
    }
  } catch {
    // Ignore localStorage errors
  }
}

/**
 * Hook to automatically restore scroll position on mount.
 */
import { useEffect } from "react";

export function useRestoreScrollPosition(key = "scrollY"): void {
  useEffect(() => {
    restoreScrollPosition(key);
  }, [key]);
}