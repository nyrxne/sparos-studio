import { useEffect, useRef, useState } from "react";

import { useMagnetic } from "@/lib/motion";
import { CountUp } from "./CountUp";

type TabId = "before" | "after";

function TabButton({
  id,
  label,
  active,
  onSelect,
  onArrow,
}: {
  id: TabId;
  label: string;
  active: boolean;
  onSelect: () => void;
  onArrow: () => void;
}) {
  const ref = useMagnetic<HTMLButtonElement>(4);

  return (
    <button
      ref={ref}
      role="tab"
      id={`tab-${id}`}
      aria-selected={active}
      aria-controls={`panel-${id}`}
      tabIndex={active ? 0 : -1}
      className={`demo-tab${active ? " active" : ""}`}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          e.preventDefault();
          onArrow();
        }
      }}
    >
      {label}
    </button>
  );
}

export function DemoTabs() {
  const [tab, setTab] = useState<TabId>("before");
  const [rendered, setRendered] = useState<TabId>("before");
  const [exiting, setExiting] = useState<TabId | null>(null);
  const [runId, setRunId] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (tab === rendered) return;
    setExiting(rendered);
    setRendered(tab);
    if (tab === "after") setRunId((n) => n + 1);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setExiting(null), 320);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [tab, rendered]);

  const stateFor = (id: TabId) => (id === rendered ? "active" : id === exiting ? "exit" : "enter");
  const afterActive = stateFor("after") === "active";

  return (
    <div className="demo-panel">
      <div className="demo-tabs" role="tablist" aria-label="Demo views">
        {(
          [
            ["before", "Before — the spreadsheet"],
            ["after", "After — Sparo"],
          ] as const
        ).map(([id, label]) => (
          <TabButton
            key={id}
            id={id}
            label={label}
            active={tab === id}
            onSelect={() => setTab(id)}
            onArrow={() => {
              const next: TabId = tab === "before" ? "after" : "before";
              setTab(next);
              document.getElementById(`tab-${next}`)?.focus();
            }}
          />
        ))}
      </div>
      <div className="demo-body">
        <div
          className="demo-view"
          data-state={stateFor("before")}
          id="panel-before"
          role="tabpanel"
          aria-labelledby="tab-before"
          hidden={stateFor("before") === "enter"}
        >
          <div className="messy">
            <div className="row">
              <span>Invoices tab</span>
              <span>47 rows, 3 buyers, no flags</span>
            </div>
            <div className="row">
              <span>Inventory tab</span>
              <span>19 SKUs, last updated Tuesday</span>
            </div>
            <div className="row">
              <span>Payments tab</span>
              <span>manually cross-checked, sometimes</span>
            </div>
            <div className="row">
              <span>Cash available</span>
              <span>"roughly fine, I think"</span>
            </div>
          </div>
        </div>

        <div
          className="demo-view"
          data-state={stateFor("after")}
          id="panel-after"
          role="tabpanel"
          aria-labelledby="tab-after"
          hidden={stateFor("after") === "enter"}
        >
          <div key={runId} className={`insight-list${afterActive ? " surfacing" : ""}`}>
            <div className="insight">
              <span className="pct">78%</span>
              <span className="desc">Winter Shawls — sales velocity down 60% in 8 weeks</span>
              <span className="risk">₹1.8L trapped</span>
            </div>
            <div className="insight">
              <span className="pct">84%</span>
              <span className="desc">Invoice #214, Retail Chain B — late on 4 of last 5 orders</span>
              <span className="risk">22d overdue</span>
            </div>
            <div className="insight">
              <span className="pct">—</span>
              <span className="desc">
                Reordering Product Y now would lock capital not actually available this month
              </span>
              <span className="risk">₹95,000 at stake</span>
            </div>
            <div className="cash-total">
              <span className="label">Combined cash at risk, this month</span>
              <span className="val">
                {afterActive ? (
                  <CountUp value={4.2} prefix="₹" suffix="L" decimals={1} duration={800} />
                ) : (
                  "₹4.2L"
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
