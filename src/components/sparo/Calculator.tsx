import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/lib/motion";

function formatINR(n: number) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

/** Animates a number toward `target` with easing, and flags a pulse on change. */
function useAnimatedNumber(target: number) {
  const [display, setDisplay] = useState(target);
  const [pulse, setPulse] = useState(false);
  const fromRef = useRef(target);
  const rafRef = useRef<number | null>(null);
  const pulseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      fromRef.current = target;
      setDisplay(target);
      setPulse(false);
      return;
    }
    const from = fromRef.current;
    if (from === target) return;
    const start = performance.now();
    const duration = 280;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = from + (target - from) * eased;
      fromRef.current = value;
      setDisplay(value);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
      else fromRef.current = target;
    };
    rafRef.current = requestAnimationFrame(tick);

    setPulse(true);
    if (pulseTimer.current) clearTimeout(pulseTimer.current);
    pulseTimer.current = setTimeout(() => setPulse(false), 300);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (pulseTimer.current) clearTimeout(pulseTimer.current);
    };
  }, [target, reduced]);

  return { display, pulse };
}

export function Calculator() {
  const [invoices, setInvoices] = useState(200000);
  const [inventory, setInventory] = useState(150000);
  const [chase, setChase] = useState(true);
  const [discount, setDiscount] = useState(true);

  const trapped = invoices + inventory;
  const released = (chase ? invoices * 0.6 : 0) + (discount ? inventory * 0.7 : 0);

  const trappedAnim = useAnimatedNumber(trapped);
  const releasedAnim = useAnimatedNumber(released);

  return (
    <div className="calc-panel">
      <div className="calc-grid">
        <div>
          <div className="calc-input">
            <label htmlFor="invSlider">
              <span>Overdue invoices right now</span>
              <span className="val">{formatINR(invoices)}</span>
            </label>
            <input
              type="range"
              id="invSlider"
              min={0}
              max={1000000}
              step={10000}
              value={invoices}
              onChange={(e) => setInvoices(Number(e.target.value))}
              aria-label="Overdue invoices value in rupees"
              aria-valuetext={formatINR(invoices)}
            />
          </div>
          <div className="calc-input">
            <label htmlFor="invtSlider">
              <span>Slow-moving inventory value</span>
              <span className="val">{formatINR(inventory)}</span>
            </label>
            <input
              type="range"
              id="invtSlider"
              min={0}
              max={1000000}
              step={10000}
              value={inventory}
              onChange={(e) => setInventory(Number(e.target.value))}
              aria-label="Slow-moving inventory value in rupees"
              aria-valuetext={formatINR(inventory)}
            />
          </div>
        </div>
        <div className="calc-actions">
          <label className={`calc-action${chase ? " selected" : ""}`}>
            <input type="checkbox" checked={chase} onChange={(e) => setChase(e.target.checked)} />
            <div>
              <div className="a-title">Prioritize the highest-risk overdue invoices</div>
              <div className="a-sub">Demo assumes 60% recovery — Sparo's real model predicts this per buyer</div>
            </div>
          </label>
          <label className={`calc-action${discount ? " selected" : ""}`}>
            <input
              type="checkbox"
              checked={discount}
              onChange={(e) => setDiscount(e.target.checked)}
            />
            <div>
              <div className="a-title">Discount the slowest-moving stock first</div>
              <div className="a-sub">Demo assumes 70% conversion — Sparo's real model predicts this per SKU</div>
            </div>
          </label>
        </div>
      </div>
      <div className="calc-result">
        <div className="r-block trapped">
          <div className="r-label">Cash trapped today</div>
          <div className={`r-val${trappedAnim.pulse ? " pulse" : ""}`} aria-hidden="true">
            {formatINR(trappedAnim.display)}
          </div>
        </div>
        <div className="r-block released">
          <div className="r-label">Cash you could free up</div>
          <div className={`r-val${releasedAnim.pulse ? " pulse" : ""}`} aria-hidden="true">
            {formatINR(releasedAnim.display)}
          </div>
        </div>
      </div>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        Cash trapped today: {formatINR(trapped)}. Cash you could free up: {formatINR(released)}.
      </p>
      <p className="calc-note">
        This demo uses flat recovery rates for simplicity. Sparo's actual value is in buyer-specific
        delay prediction and per-SKU velocity decay — not a fixed percentage. Recovery rates here are
        illustrative assumptions, not claims about typical results.
      </p>
    </div>
  );
}
