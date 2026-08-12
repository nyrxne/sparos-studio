import { useEffect, useRef, useState } from "react";

type TabId = "before" | "after";

export function DemoTabs() {
  const [tab, setTab] = useState<TabId>("before");
  const [rendered, setRendered] = useState<TabId>("before");
  const [exiting, setExiting] = useState<TabId | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (tab === rendered) return;
    setExiting(rendered);
    setRendered(tab);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setExiting(null), 320);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [tab, rendered]);

  const stateFor = (id: TabId) => (id === rendered ? "active" : id === exiting ? "exit" : "enter");

  return (
    <div className="demo-panel">
      <div className="demo-tabs" role="tablist" aria-label="Demo views">
        {(
          [
            ["before", "Before — the spreadsheet"],
            ["after", "After — Sparo"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            role="tab"
            id={`tab-${id}`}
            aria-selected={tab === id}
            aria-controls={`panel-${id}`}
            tabIndex={tab === id ? 0 : -1}
            className={`demo-tab${tab === id ? " active" : ""}`}
            onClick={() => setTab(id)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                e.preventDefault();
                const next: TabId = tab === "before" ? "after" : "before";
                setTab(next);
                document.getElementById(`tab-${next}`)?.focus();
              }
            }}
          >
            {label}
          </button>
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
          <div className="insight-list">
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
              <span className="val">₹4.2L</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
