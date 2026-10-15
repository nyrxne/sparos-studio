import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion";

const INTERACTIVE =
  "a, button, .price-card, .calc-action, .demo-tab, input[type='checkbox'], input[type='range']";

/** Small marigold dot with a thin ring — shown only over interactive elements. */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEnabled(false);
      return;
    }
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      const el = dotRef.current;
      if (el) el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      const target = e.target as Element | null;
      const control = target?.closest?.(INTERACTIVE);
      setActive(Boolean(control && !control.matches(":disabled")));
    };
    const onLeave = () => setActive(false);

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.body.classList.add("cursor-dot-on");
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.body.classList.remove("cursor-dot-on");
    };
  }, [reduced]);

  if (!enabled) return null;

  return (
    <div ref={dotRef} className={`cursor-dot${active ? " on" : ""}`} aria-hidden="true">
      <span className="cd-ring" />
      <span className="cd-core" />
    </div>
  );
}
