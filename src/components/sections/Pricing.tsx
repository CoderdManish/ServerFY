import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, ChevronDown, Cpu, Settings2, ShieldCheck, Sparkles } from "lucide-react";
import { CtaButton } from "@/components/CtaButton";
import { waLink, waProps } from "@/lib/whatsapp";
import { Reveal, SectionHeading } from "@/components/Primitives";
import { modules } from "@/data/serverfy";
import {
  accessPrices,
  accessTypes,
  durationLabel,
  durations,
  specialistModuleCodes,
  type AccessDuration,
  type AccessType,
} from "@/data/pricing";

function AnimatedPrice({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const from = prev.current;
    prev.current = value;
    if (from === value || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.textContent = value.toLocaleString("en-IN");
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 600);
      const eased = 1 - Math.pow(1 - t, 3);
      node.textContent = Math.round(from + (value - from) * eased).toLocaleString("en-IN");
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return <span ref={ref}>{value.toLocaleString("en-IN")}</span>;
}

export function Pricing() {
  const [accessType, setAccessType] = useState<AccessType>("functional");
  const [moduleCode, setModuleCode] = useState("FICO");
  const [duration, setDuration] = useState<AccessDuration>(1);
  const availableModules = [
    ...modules.filter((module) => module.type === accessType),
    ...(accessType === "technical"
      ? [{ code: "GRC", name: "Governance, Risk & Compliance", type: "technical" as const }]
      : []),
  ];
  const selectedModule = availableModules.find((module) => module.code === moduleCode) ?? availableModules[0];
  const needsQuote = selectedModule ? specialistModuleCodes.has(selectedModule.code) : false;
  const price = accessPrices[accessType][duration];
  const accessLabel = accessTypes.find((item) => item.id === accessType)?.label ?? "SAP modules";
  const moduleLabel = selectedModule ? `SAP ${selectedModule.code}` : accessLabel;
  const enquiry = needsQuote
    ? `Hi ServerFY, I need ${moduleLabel} server access for ${durationLabel(duration)}. Please share availability and pricing.`
    : `Hi ServerFY, I want ${moduleLabel} ${accessType} server access for ${durationLabel(duration)} at ₹${price.toLocaleString("en-IN")}. Please share the next steps.`;

  function changeAccessType(nextType: AccessType) {
    setAccessType(nextType);
    const firstModule = modules.find((module) => module.type === nextType);
    if (firstModule) setModuleCode(firstModule.code);
  }

  return (
    <section id="pricing" className="section-y bg-soft-mesh">
      <div className="container-fy">
        <SectionHeading
          eyebrow="Pricing"
          title="Configure Your SAP Server Access"
          sub="Choose a module type and access period. Your exact price updates instantly."
        />

        <div className="mx-auto mt-12 grid max-w-6xl items-stretch gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(270px,0.72fr)_minmax(0,1fr)]">
          <Reveal className="order-2 h-full lg:order-1">
            <article className="relative flex h-full min-h-[34rem] flex-col overflow-hidden rounded-3xl border border-orange/40 bg-navy-gradient p-6 text-on-navy shadow-lift sm:p-8">
              <span className="type-eyebrow absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-orange px-3 py-1.5 text-on-navy shadow-glow-orange">
                <Sparkles className="size-3" aria-hidden="true" /> Your selection
              </span>
              <p className="type-eyebrow pr-28 text-orange">SAP server access</p>
              <h3 className="mt-3 text-2xl font-black">{moduleLabel}</h3>
              <p className="mt-2 text-sm text-on-navy/65">{accessLabel} · {durationLabel(duration)}</p>

              <div className="mt-7 min-h-16" aria-live="polite">
                {needsQuote ? (
                  <span className="text-4xl font-extrabold">Contact us</span>
                ) : (
                  <div className="flex flex-wrap items-end gap-2">
                    <span className="text-4xl font-extrabold">₹<AnimatedPrice value={price} /></span>
                    <span className="pb-1 text-xs font-semibold text-on-navy/60">for {durationLabel(duration)}</span>
                  </div>
                )}
              </div>
              <p className="mt-1 text-[0.7rem] font-bold uppercase text-on-navy/45">
                {needsQuote ? "Availability and configuration confirmed by our team" : "One clear price for the full selected period"}
              </p>

              <dl className="mt-6 grid grid-cols-2 gap-3 rounded-2xl border border-on-navy/10 bg-on-navy/5 p-4 text-xs">
                <div><dt className="text-on-navy/50">Access</dt><dd className="mt-1 font-bold">Individual login</dd></div>
                <div><dt className="text-on-navy/50">System</dt><dd className="mt-1 font-bold">S/4HANA / ECC</dd></div>
                <div><dt className="text-on-navy/50">Connection</dt><dd className="mt-1 font-bold">SAP GUI ready</dd></div>
                <div><dt className="text-on-navy/50">Support</dt><dd className="mt-1 font-bold">Included</dd></div>
              </dl>

              <ul className="mt-6 flex-1 space-y-3">
                {["Prepared practice client", "IDES-style sample data", "Remote access, 24/7", "Backup and login support"].map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-on-navy/80">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-orange/20 text-orange"><Check className="size-3" aria-hidden="true" /></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <CtaButton href={waLink(enquiry)} {...waProps} className="mt-7 w-full">
                {needsQuote ? "Contact us on WhatsApp" : "Get this server"}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </CtaButton>
            </article>
          </Reveal>

          <Reveal className="order-1 h-full lg:order-2" delay={0.06}>
            <aside className="flex h-full flex-col justify-center rounded-3xl border border-border bg-card p-5 shadow-card sm:p-6" aria-label="Configure SAP server access">
              <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-orange/10 text-orange"><Settings2 className="size-6" aria-hidden="true" /></span>
              <h3 className="mt-4 text-center text-lg font-black text-navy">Build your access</h3>
              <p className="mt-1 text-center text-xs leading-5 text-muted-foreground">Three quick choices. The price updates on the left.</p>

              <div className="mt-6 space-y-4">
                <label className="block text-xs font-bold text-foreground">
                  Access type
                  <span className="relative mt-2 block">
                    <select value={accessType} onChange={(event) => changeAccessType(event.target.value as AccessType)} className="h-12 w-full appearance-none rounded-xl border border-input bg-background px-4 pr-10 text-sm font-bold text-foreground outline-none focus:border-blue-bright focus:ring-2 focus:ring-blue-bright/20">
                      {accessTypes.map((type) => <option key={type.id} value={type.id}>{type.label}</option>)}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                  </span>
                </label>

                <label className="block text-xs font-bold text-foreground">
                  SAP module
                  <span className="relative mt-2 block">
                    <select value={selectedModule?.code ?? ""} onChange={(event) => setModuleCode(event.target.value)} className="h-12 w-full appearance-none rounded-xl border border-input bg-background px-4 pr-10 text-sm font-bold text-foreground outline-none focus:border-blue-bright focus:ring-2 focus:ring-blue-bright/20">
                      {availableModules.map((module) => <option key={module.code} value={module.code}>SAP {module.code} — {module.name}</option>)}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                  </span>
                </label>

                <label className="block text-xs font-bold text-foreground">
                  Access period
                  <span className="relative mt-2 block">
                    <select value={duration} onChange={(event) => setDuration(Number(event.target.value) as AccessDuration)} className="h-12 w-full appearance-none rounded-xl border border-input bg-background px-4 pr-10 text-sm font-bold text-foreground outline-none focus:border-blue-bright focus:ring-2 focus:ring-blue-bright/20">
                      {durations.map((months) => <option key={months} value={months}>{durationLabel(months)}</option>)}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                  </span>
                </label>
              </div>

              {needsQuote ? (
                <p className="mt-5 rounded-xl border border-orange/25 bg-orange/5 p-3 text-xs font-semibold leading-5 text-foreground">This specialist module needs an availability check and a custom quote.</p>
              ) : (
                <p className="mt-5 text-center text-xs text-muted-foreground">No monthly multiplication—this is the total for your selected period.</p>
              )}
            </aside>
          </Reveal>

          <Reveal className="order-3 h-full" delay={0.12}>
            <article className="neu-card flex h-full min-h-[34rem] flex-col rounded-3xl p-6 sm:p-8">
              <span className="grid size-12 place-items-center rounded-2xl bg-blue/10 text-blue"><Cpu className="size-6" aria-hidden="true" /></span>
              <p className="type-eyebrow mt-6 text-blue">Dedicated landscape</p>
              <h3 className="mt-3 text-2xl font-black text-navy">Built around your workload</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">For institutes, teams, custom landscapes and multiple user logins.</p>
              <div className="mt-7 text-4xl font-extrabold text-navy">Custom</div>
              <p className="mt-1 text-[0.7rem] font-bold uppercase text-muted-foreground">Scoped to your requirements</p>
              <ul className="mt-7 flex-1 space-y-3">
                {["Private SAP landscape", "Custom modules and data", "Multiple user logins", "Dedicated resources", "Custom backup plan", "Named support contact"].map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-orange/10 text-orange"><ShieldCheck className="size-3" aria-hidden="true" /></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <CtaButton href={waLink("Hi ServerFY, I need a dedicated SAP landscape. Please help me plan the configuration and pricing.")} {...waProps} className="mt-7 w-full" variant="outlineDark">
                Contact sales <ArrowRight className="size-4" aria-hidden="true" />
              </CtaButton>
            </article>
          </Reveal>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Prices are indicative and exclude applicable taxes.
        </p>
      </div>
    </section>
  );
}
