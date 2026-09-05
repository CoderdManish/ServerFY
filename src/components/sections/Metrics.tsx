import { useEffect, useRef } from "react";
import { Reveal, SectionHeading } from "@/components/Primitives";
import { metrics } from "@/data/serverfy";

function Counter({ value, suffix, display }: { value: number | null; suffix?: string | undefined; display?: string | undefined }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || value === null) return;
    const decimals = Number.isInteger(value) ? 0 : 1;
    const write = (v: number) => {
      node.textContent = decimals ? v.toFixed(1) : Math.round(v).toLocaleString("en-IN");
    };
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      write(value);
      return;
    }
    let raf = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1400);
        write(value * (1 - Math.pow(1 - t, 3)));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          run();
        }
      },
      { rootMargin: "-60px" },
    );
    io.observe(node);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span className="type-metric text-white">
      {value === null ? display : <span ref={ref}>0</span>}
      {suffix ? <span className="text-orange">{suffix}</span> : null}
    </span>
  );
}

export function Metrics() {
  return (
    <section id="why" className="section-y bg-navy-dark">
      <div className="container-fy">
        <SectionHeading
          eyebrow="Why ServerFY"
          tone="dark"
          title="Infrastructure built for serious SAP work"
          sub="We focus on one thing: dependable SAP environments that are quick to get and stable to use."
        />
        <ul className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((m, i) => (
            <Reveal as="li" key={m.label} delay={i * 0.05}>
              <div className="glass-dark glass-dark-hover h-full border-l-2 border-l-orange/70 p-6">
                <Counter value={m.value} suffix={m.suffix} display={m.display} />
                <p className="mt-3 text-sm font-semibold text-white/60">{m.label}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
