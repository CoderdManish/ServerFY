import { Reveal, SectionHeading } from "@/components/Primitives";
import { metrics } from "@/data/serverfy";

export function Metrics() {
  return (
    <section id="why" className="section-y bg-navy-dark">
      <div className="container-fy">
        <SectionHeading
          eyebrow="Why ServerFY"
          tone="dark"
          title="What you actually get with ServerFY"
          sub="Specific, checkable facts about the service — no inflated numbers."
        />
        <ul className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((m, i) => (
            <Reveal as="li" key={m.label} delay={i * 0.05}>
              <div className="glass-dark glass-dark-hover h-full border-l-2 border-l-orange/70 p-6">
                <span className="type-metric text-white">{m.value}</span>
                <p className="mt-3 text-sm font-semibold text-white/60">{m.label}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
