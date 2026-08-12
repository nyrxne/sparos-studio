import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "problem", label: "Problem" },
  { id: "how", label: "How it works" },
  { id: "try", label: "Try it" },
  { id: "demo", label: "Demo" },
  { id: "pricing", label: "Pricing" },
];

export function StickyNav() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState<string>("");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y > window.innerHeight * 0.7);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);

      let active = "";
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 120) active = s.id;
      }
      setCurrent(active);
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
    <header className={`sparo-nav${visible ? " visible" : ""}`} aria-hidden={!visible}>
      <div className="nav-inner">
        <a className="nav-mark" href="#top">
          Sparo
        </a>
        <nav aria-label="Section navigation">
          <ul>
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={current === s.id ? "current" : undefined}
                  aria-current={current === s.id ? "true" : undefined}
                  tabIndex={visible ? 0 : -1}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div
        className="nav-progress"
        style={{ transform: `scaleX(${progress})` }}
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
      />
    </header>
  );
}
