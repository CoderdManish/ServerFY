import { Reveal, SectionHeading } from "@/components/Primitives";
import { metrics } from "@/data/serverfy";
import {
  Boxes,
  Clock3,
  KeyRound,
  MonitorCheck,
  ServerCog,
  Zap,
  type LucideIcon,
} from "lucide-react";

const metricIcons: LucideIcon[] = [Zap, Clock3, Boxes, ServerCog, MonitorCheck, KeyRound];

export function Metrics() {
  return (
    <section id="why" className="section-y relative overflow-hidden bg-navy-dark">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-35" />
      <div className="container-fy">
        <div className="relative grid gap-10 xl:grid-cols-[0.72fr_1.28fr] xl:items-start xl:gap-14">
          <Reveal className="xl:sticky xl:top-28">
            <SectionHeading
              eyebrow="Why ServerFY"
              tone="dark"
              title="Built for hands-on SAP work"
              sub="Clear access, practical environments and dependable setup — without inflated claims."
              align="left"
            />

            <div className="mt-8 overflow-hidden rounded-xl border border-white/15 bg-navy-soft/55 shadow-glow-orange">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                <div className="flex items-center gap-2">
                  <span className="relative flex size-2.5" aria-hidden="true">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-orange opacity-60" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-orange" />
                  </span>
                  <span className="text-xs font-extrabold uppercase text-white/75">Environment status</span>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.65rem] font-bold uppercase text-white/55">
                  Ready to configure
                </span>
              </div>
              <div className="grid grid-cols-3 divide-x divide-white/10 px-2 py-5 text-center">
                <div>
                  <span className="block text-lg font-extrabold text-white">Remote</span>
                  <span className="mt-1 block text-[0.65rem] font-bold uppercase text-white/45">Access</span>
                </div>
                <div>
                  <span className="block text-lg font-extrabold text-white">Secure</span>
                  <span className="mt-1 block text-[0.65rem] font-bold uppercase text-white/45">Handover</span>
                </div>
                <div>
                  <span className="block text-lg font-extrabold text-white">Flexible</span>
                  <span className="mt-1 block text-[0.65rem] font-bold uppercase text-white/45">Modules</span>
                </div>
              </div>
            </div>
          </Reveal>

          <ul className="relative grid gap-4 sm:grid-cols-2">
            <div aria-hidden="true" className="absolute left-1/2 top-8 hidden h-[calc(100%-4rem)] w-px bg-gradient-to-b from-orange/0 via-orange/35 to-orange/0 sm:block" />
            {metrics.map((m, i) => {
              const MetricIcon = metricIcons[i] ?? Boxes;
              return (
                <Reveal as="li" key={m.label} delay={i * 0.04}>
                  <div className="group relative h-full min-h-44 overflow-hidden rounded-xl border border-white/12 bg-navy-soft/60 p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:border-orange/45 hover:bg-navy-soft/80 hover:shadow-glow-orange sm:p-6">
                    <div aria-hidden="true" className="absolute right-0 top-0 h-20 w-20 rounded-bl-full border-b border-l border-orange/10 bg-orange/5 transition-colors group-hover:bg-orange/10" />
                    <div className="relative flex items-start justify-between gap-4">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-orange/30 bg-orange/10 text-orange shadow-glow-orange">
                        <MetricIcon aria-hidden="true" className="size-5" strokeWidth={1.8} />
                      </span>
                      <span className="text-[0.65rem] font-extrabold uppercase text-white/35">Capability {String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="relative mt-7">
                      <span className="block text-2xl font-extrabold leading-tight text-white sm:text-[1.75rem]">{m.value}</span>
                      <p className="mt-2 max-w-sm text-sm font-semibold leading-6 text-white/60">{m.label}</p>
                    </div>
                    <div aria-hidden="true" className="absolute inset-x-5 bottom-0 h-px origin-left scale-x-0 bg-orange transition-transform duration-300 group-hover:scale-x-100" />
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
