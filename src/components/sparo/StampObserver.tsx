import { useEffect } from "react";

import { prefersReducedMotion } from "@/lib/motion";

/** Adds a "stamped down" hit to every .stamp badge as it scrolls into view. */
export function StampObserver() {
  useEffect(() => {
    const stamps = Array.from(document.querySelectorAll<HTMLElement>(".sparo .stamp"));
    if (!stamps.length) return;

    if (prefersReducedMotion()) {
      stamps.forEach((s) => s.classList.add("stamped"));
      return;
    }

    stamps.forEach((s) => s.classList.add("stamp-pending"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.remove("stamp-pending");
          el.classList.add("stamped");
          io.unobserve(el);
        });
      },
      { threshold: 0.6 },
    );
    stamps.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return null;
}
