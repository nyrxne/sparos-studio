import { useEffect, useState } from "react";

import { prefersReducedMotion } from "@/lib/motion";

/**
 * Vertical stitched thread. Fills downward with scroll progress, reaching a
 * fully stitched state by the time the close section is on screen.
 */
export function ThreadLine() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setProgress(1);
      return;
    }
    const onScroll = () => {
      const close = document.querySelector(".close") as HTMLElement | null;
      const end = close
        ? close.offsetTop
        : document.documentElement.scrollHeight - window.innerHeight;
      const denom = Math.max(1, end - window.innerHeight * 0.4);
      setProgress(Math.max(0, Math.min(1, window.scrollY / denom)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="thread" aria-hidden="true">
      <div className="thread-fill" style={{ transform: `scaleY(${progress})` }} />
    </div>
  );
}
