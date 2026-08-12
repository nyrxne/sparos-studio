import { useEffect, useRef, useState } from "react";

import { prefersReducedMotion } from "@/lib/motion";

const ITEMS = [
  { text: "INV #214 — 22d overdue ", tag: "● 84% further delay", cls: "flag" },
  { text: "SKU — Winter Shawls ", tag: "● 78% dead-stock risk", cls: "flag" },
  { text: "INV #198 — paid on time ", tag: "● buyer reliable", cls: "ok" },
  { text: "SKU — Cotton Sarees ", tag: "● healthy velocity", cls: "ok" },
  { text: "Cash at risk this month ", tag: "● ₹4.2L", cls: "flag" },
];

export function Ticker() {
  const [paused, setPaused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Flash each entry as it scrolls into the ticker window — a ledger line landing.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) el.classList.add("lit");
          else el.classList.remove("lit");
        });
      },
      { root, threshold: 0.98 },
    );
    root.querySelectorAll(".ticker-track > span").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={`ticker${paused ? " paused" : ""}`}
      onTouchStart={() => setPaused((p) => !p)}
      aria-label="Live cash-risk signals"
    >
      <div className="ticker-track">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i}>
            {item.text}
            <span className={item.cls}>{item.tag}</span>
          </span>
        ))}
      </div>
      <p className="ticker-hint">Hover or tap to pause</p>
    </div>
  );
}
