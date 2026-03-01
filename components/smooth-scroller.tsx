"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroller() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 4.0, // Slower scrolling
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.6, // Feel more "weighty"
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
