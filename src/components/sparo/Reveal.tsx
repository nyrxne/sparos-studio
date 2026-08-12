import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * `prose` fades up soft and slow; `data` arrives sharper and faster, for
 * numeric/data-heavy blocks.
 */
export function Reveal({
  children,
  variant = "prose",
  bare = false,
}: {
  children: ReactNode;
  variant?: "prose" | "data";
  bare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${bare ? "" : "wrap "}reveal reveal-${variant}${inView ? " in" : ""}`}
    >
      {children}
    </div>
  );
}
