import { useState } from "react";

const ITEMS = [
  { text: "INV #214 — 22d overdue ", tag: "● 84% further delay", cls: "flag" },
  { text: "SKU — Winter Shawls ", tag: "● 78% dead-stock risk", cls: "flag" },
  { text: "INV #198 — paid on time ", tag: "● buyer reliable", cls: "ok" },
  { text: "SKU — Cotton Sarees ", tag: "● healthy velocity", cls: "ok" },
  { text: "Cash at risk this month ", tag: "● ₹4.2L", cls: "flag" },
];

export function Ticker() {
  const [paused, setPaused] = useState(false);

  return (
    <div
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
