import { Code2, SlidersHorizontal } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Primitives";
import { functionalList, technicalList } from "@/data/serverfy";
import coreAsset from "@/assets/serverfy-core.webp.asset.json";

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
  const right = align === "right";
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_50px_-30px_rgba(0,0,0,0.9)]">
      {/* pcb solder-dot texture */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, color-mix(in oklab, var(--blue-bright) 45%, transparent) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "linear-gradient(to bottom, black, transparent 75%)",
        }}
      />
      {/* edge connector strip on the side facing the core */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-8 w-px bg-gradient-to-b from-transparent via-orange/50 to-transparent ${right ? "left-0" : "right-0"}`}
      />

      <div className={`relative flex items-center gap-3 ${right ? "lg:flex-row-reverse lg:text-right" : ""}`}>
        <span className="grid size-11 shrink-0 place-items-center rounded-xl icon-tile-dark">
          <I className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="type-eyebrow text-orange">{title}</p>
          <p className="text-sm text-white/55">{items.length} environments</p>
        </div>
        <span className="hidden shrink-0 rounded-full border border-white/10 bg-navy-dark/60 px-3 py-1 font-mono text-[0.65rem] font-bold tracking-widest text-white/45 sm:inline-block">
          {right ? "BUS-02" : "BUS-01"}
        </span>
      </div>

      <ul className="relative mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {items.map((m, i) => (
          <li
            key={m}
            style={{ animationDelay: `${i * 40}ms`, animationDuration: "0.45s" }}
            className="anim-rise group flex items-center gap-2 rounded-lg border border-white/10 bg-navy-dark/60 px-3 py-2.5 text-xs font-bold text-white/80 transition-colors hover:border-orange/60 hover:text-white"
          >
            <span className="size-1.5 shrink-0 rounded-full bg-orange/70 shadow-[0_0_6px_var(--orange)] transition-transform group-hover:scale-125" />
            <span className="truncate">SAP {m}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Circuit traces fanning out of the logo core toward both boards. */
function Traces({ side }: { side: "left" | "right" }) {
  const flip = side === "left" ? "scale-x-[-1]" : "";
  return (
    <svg
      viewBox="0 0 200 260"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 hidden h-full w-[46%] opacity-70 lg:block ${side}-0 ${flip}`}
      style={side === "left" ? { left: 0 } : { right: 0 }}
    >
      <defs>
        <linearGradient id={`fy-trace-${side}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--orange)" stopOpacity="0.9" />
          <stop offset="60%" stopColor="var(--blue-bright)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--blue-bright)" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {[40, 90, 130, 170, 220].map((y, i) => (
        <g key={y}>
          <path
            d={`M0 130 H40 V${y} H200`}
            fill="none"
            stroke={`url(#fy-trace-${side})`}
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path
            d={`M0 130 H40 V${y} H200`}
            fill="none"
            stroke="var(--orange)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="6 210"
            style={{ animation: `dash-flow ${5 + i * 0.8}s linear infinite` }}
          />
          <circle cx="40" cy={y} r="2.4" fill="var(--orange)" opacity="0.75" />
        </g>
      ))}
    </svg>
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

        <div className="relative mt-14 grid items-center gap-6 lg:grid-cols-[1fr_220px_1fr] lg:gap-0">
          <Reveal>
            <div className="lg:pr-10">
              <Column title="Functional" icon={SlidersHorizontal} items={functionalList} align="left" />
            </div>
          </Reveal>

          {/* core */}
          <div className="relative mx-auto flex h-40 w-full max-w-[520px] items-center justify-center lg:h-72 lg:max-w-none">
            <Traces side="left" />
            <Traces side="right" />
            <div className="relative z-10 flex flex-col items-center">
              <span className="relative grid size-28 place-items-center rounded-[28px] border border-white/12 bg-navy-dark/70 backdrop-blur-sm shadow-[0_0_60px_-12px_color-mix(in_oklab,var(--orange)_65%,transparent)] lg:size-32">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[28px] bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--blue-bright)_35%,transparent),transparent)]"
                />
                <img
                  src={coreAsset.url}
                  alt="ServerFY core"
                  width={320}
                  height={288}
                  loading="lazy"
                  decoding="async"
                  className="relative size-20 object-contain lg:size-24"
                />
              </span>
              <span className="type-eyebrow mt-4 text-center text-white/50">ServerFY core</span>
            </div>
          </div>

          <Reveal delay={0.1}>
            <div className="lg:pl-10">
              <Column title="Technical" icon={Code2} items={technicalList} align="right" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
