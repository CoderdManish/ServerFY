import { ArrowRight, Clock, Layers, LockKeyhole, Zap } from "lucide-react";
import { CtaButton } from "@/components/CtaButton";
import { ServerVisual } from "./ServerVisual";

const proofs = [
  { icon: Zap, label: "Instant Access" },
  { icon: Clock, label: "24/7 Availability" },
  { icon: LockKeyhole, label: "Secure Infrastructure" },
  { icon: Layers, label: "Flexible Plans" },
];

const logLines = [
  { text: "serverfy provision --module MM --release S/4HANA 2023", kind: "cmd" as const },
  { text: "→ allocating instance · 8 vCPU · 32 GB RAM", kind: "out" as const },
  { text: "→ loading SAP client 800 (IDES data)", kind: "out" as const },
  { text: "→ issuing secure VPN / SAP GUI credentials", kind: "out" as const },
  { text: "✓ environment ready — access details sent", kind: "ok" as const },
];

function ProvisionLog() {
  return (
    <div
      className="anim-rise rounded-2xl border border-white/12 bg-navy-dark/70 backdrop-blur-sm"
      style={{ animationDelay: "0.75s" }}
      aria-hidden="true"
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="size-2 rounded-full bg-orange" />
        <span className="size-2 rounded-full bg-white/25" />
        <span className="size-2 rounded-full bg-white/25" />
        <span className="ml-2 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/40">
          provision.log
        </span>
      </div>
      <div className="space-y-1.5 px-4 py-3.5 font-mono text-[0.7rem] leading-relaxed sm:text-[0.76rem]">
        {logLines.map((l, i) => (
          <p
            key={l.text}
            className="anim-rise overflow-hidden text-ellipsis whitespace-nowrap"
            style={{ animationDelay: `${0.95 + i * 0.12}s`, animationDuration: "0.45s" }}
          >
            {l.kind === "cmd" ? (
              <>
                <span className="text-orange">$ </span>
                <span className="text-white/85">{l.text}</span>
              </>
            ) : (
              <span className={l.kind === "ok" ? "text-emerald-400" : "text-blue-bright/85"}>{l.text}</span>
            )}
          </p>
        ))}
        <p className="text-white/70">
          <span className="text-orange">$ </span>
          <span className="caret inline-block h-3.5 w-1.5 translate-y-0.5 bg-white/70" />
        </p>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-navy-gradient pt-24 pb-12 lg:pt-28 lg:pb-16">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.13] [mask-image:radial-gradient(70%_60%_at_50%_35%,#000,transparent)]" />
      <div className="container-fy relative grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
        <div className="min-w-0">
          <span
            className="anim-rise type-eyebrow inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-white/80 backdrop-blur"
            style={{ animationDelay: "0.05s" }}
          >
            <span className="size-1.5 rounded-full bg-orange led" />
            All SAP landscapes operational
          </span>

          <h1 className="type-hero mt-6 text-balance text-white">
            <span className="anim-rise block" style={{ animationDelay: "0.12s" }}>
              Enterprise SAP Servers
            </span>
            <span className="anim-rise text-gradient-orange mt-1 block" style={{ animationDelay: "0.24s" }}>
              Engineered For Excellence.
            </span>
          </h1>

          <p
            className="anim-rise mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
            style={{ animationDelay: "0.34s" }}
          >
            High-performance SAP environments for Functional &amp; Technical modules. Practice, learn, develop, test and
            run your SAP operations with confidence.
          </p>

          <div
            className="anim-rise mt-8 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "0.42s" }}
          >
            <CtaButton href="#contact" size="lg">
              Get Your SAP Server
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </CtaButton>
            <CtaButton href="#modules" size="lg" variant="outlineLight">
              Explore SAP Modules
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </CtaButton>
          </div>

          <p className="anim-rise mt-4 text-sm text-white/45" style={{ animationDelay: "0.48s" }}>
            Free trial available · No setup fee · Access within hours
          </p>

          <ul
            className="anim-rise mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4"
            style={{ animationDelay: "0.56s" }}
          >
            {proofs.map(({ icon: I, label }) => (
              <li key={label} className="flex items-center gap-2 text-[0.78rem] font-semibold text-white/70">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-blue-bright">
                  <I className="size-4" aria-hidden="true" />
                </span>
                <span className="min-w-0">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="anim-rise flex min-w-0 flex-col gap-5" style={{ animationDelay: "0.3s" }}>
          <ServerVisual compact />
          <ProvisionLog />
        </div>
      </div>
    </section>
  );
}
