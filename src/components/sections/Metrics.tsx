import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { Reveal, SectionHeading } from "@/components/Primitives";
import { metrics } from "@/data/serverfy";

function Counter({ value, suffix, display }: { value: number | null; suffix?: string | undefined; display?: string | undefined }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const decimals = value !== null && !Number.isInteger(value) ? 1 : 0;

  useEffect(() => {
    const node = ref.current;
    if (!node || value === null) return;
    if (!inView) return;
    if (reduce) {
      node.textContent = value.toFixed(decimals);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        node.textContent = decimals ? v.toFixed(1) : Math.round(v).toLocaleString("en-IN");
      },
    });
    return () => controls.stop();
  }, [inView, value, reduce, decimals]);

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
