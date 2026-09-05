import { Code2, SlidersHorizontal } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Primitives";
import { functionalList, technicalList } from "@/data/serverfy";

function Column({
  title,
  icon: I,
  items,
  align,
}: {
  title: string;
  icon: typeof Code2;
  items: string[];
  align: "left" | "right";
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
      <div className={`flex items-center gap-3 ${align === "right" ? "lg:flex-row-reverse lg:text-right" : ""}`}>
        <span className="grid size-11 shrink-0 place-items-center rounded-xl icon-tile-dark">
          <I className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="type-eyebrow text-orange">{title}</p>
          <p className="text-sm text-white/55">{items.length} environments</p>
        </div>
      </div>
      <ul className="mt-5 flex flex-wrap gap-2">
        {items.map((m, i) => (
          <li
            key={m}
            style={{ animationDelay: `${i * 40}ms`, animationDuration: "0.45s" }}
            className="anim-rise rounded-lg border border-white/10 bg-navy-dark/50 px-3 py-2 text-xs font-bold text-white/80 transition-colors hover:border-blue-bright hover:text-white"
          >
            SAP {m}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FunctionalTechnical() {
  return (
    <section className="section-y relative overflow-hidden bg-navy-gradient">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.1]" />
      <div className="container-fy relative">
        <SectionHeading
          eyebrow="One platform"
          tone="dark"
          title={
            <>
              One Infrastructure.
              <br /> Every SAP Skillset.
            </>
          }
          sub="Functional configuration and technical development on the same reliable landscape — switch context without switching provider."
        />

        <div className="mt-14 grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
          <Reveal>
            <Column title="Functional" icon={SlidersHorizontal} items={functionalList} align="left" />
          </Reveal>

          <div className="relative mx-auto h-24 w-full max-w-[220px] lg:h-72 lg:w-28">
            <svg viewBox="0 0 120 300" className="size-full" aria-hidden="true">
              <defs>
                <linearGradient id="fy-bridge" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--blue-bright)" stopOpacity="0.25" />
                  <stop offset="50%" stopColor="var(--orange)" />
                  <stop offset="100%" stopColor="var(--blue-bright)" stopOpacity="0.25" />
                </linearGradient>
              </defs>
              {[60, 120, 180, 240].map((y, i) => (
                <path
                  key={y}
                  d={`M0 ${y} C40 ${y}, 80 150, 120 150`}
                  fill="none"
                  stroke="url(#fy-bridge)"
                  strokeWidth="1.6"
                  strokeDasharray="8 12"
                  style={{ animation: `dash-flow ${6 + i}s linear infinite` }}
                />
              ))}
              <circle cx="60" cy="150" r="16" fill="var(--navy-dark)" stroke="var(--orange)" strokeWidth="1.5" />
              <circle cx="60" cy="150" r="5" fill="var(--orange)" />
            </svg>
            <span className="type-eyebrow absolute inset-x-0 -bottom-2 text-center text-white/45 lg:bottom-2">ServerFY core</span>
          </div>

          <Reveal delay={0.1}>
            <Column title="Technical" icon={Code2} items={technicalList} align="right" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
