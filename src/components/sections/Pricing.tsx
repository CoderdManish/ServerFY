import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { CtaButton } from "@/components/CtaButton";
import { Reveal, SectionHeading } from "@/components/Primitives";
import { billingCycles, plans, type BillingCycleId } from "@/data/serverfy";
import { cn } from "@/lib/utils";

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
  const [cycle, setCycle] = useState<BillingCycleId>("monthly");
  const active = billingCycles.find((c) => c.id === cycle)!;

  return (
    <section id="pricing" className="section-y">
      <div className="container-fy">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple SAP Server Pricing"
          sub="Transparent monthly rates with longer-term discounts. Every plan includes remote access and a prepared SAP client."
        />

        <Reveal className="mt-8 flex justify-center" delay={0.12}>
          <div role="tablist" aria-label="Billing cycle" className="inline-flex rounded-2xl glass-panel p-1">
            {billingCycles.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={cycle === c.id}
                onClick={() => setCycle(c.id)}
                className={cn(
                  "relative z-10 min-h-11 rounded-xl px-4 text-[0.8rem] font-extrabold transition-colors sm:px-6",
                  cycle === c.id ? "text-white" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {cycle === c.id ? (
                  <span className="absolute inset-0 -z-10 rounded-xl bg-navy" />
                ) : null}
                {c.label}
                {c.note ? (
                  <span className={cn("ml-2 rounded-full px-2 py-0.5 text-[0.6rem]", cycle === c.id ? "bg-orange text-white" : "bg-accent text-blue")}>
                    {c.note}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan, i) => {
            const price = plan.monthly ? Math.round(plan.monthly * active.multiplier) : null;
            return (
              <Reveal as="li" key={plan.id} delay={0.06 * i} className="h-full">
                <div
                  className={cn(
                    "relative flex h-full flex-col rounded-3xl border p-6 transition-all duration-300",
                    plan.highlight
                      ? "border-orange/40 bg-navy-gradient text-white shadow-lift lg:-mt-3 lg:pb-9"
                      : "neu-card",
                  )}
                >
                  {plan.highlight ? (
                    <span className="type-eyebrow absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-orange px-3 py-1.5 text-white shadow-glow-orange">
                      <Sparkles className="size-3" aria-hidden="true" /> Most popular
                    </span>
                  ) : null}

                  <h3 className={cn("type-eyebrow", plan.highlight ? "text-orange" : "text-blue")}>{plan.name}</h3>
                  <p className={cn("mt-2 text-sm", plan.highlight ? "text-white/65" : "text-muted-foreground")}>{plan.audience}</p>

                  <div className="mt-6 flex items-end gap-1">
                    {price ? (
                      <>
                        <span className={cn("text-4xl font-extrabold tracking-tight", plan.highlight ? "text-white" : "text-navy")}>
                          ₹<AnimatedPrice value={price} />
                        </span>
                        <span className={cn("pb-1 text-xs font-semibold", plan.highlight ? "text-white/60" : "text-muted-foreground")}>
                          / month
                        </span>
                      </>
                    ) : (
                      <span className={cn("text-3xl font-extrabold", plan.highlight ? "text-white" : "text-navy")}>Custom</span>
                    )}
                  </div>
                  <p className={cn("mt-1 text-[0.7rem] font-semibold uppercase tracking-wider", plan.highlight ? "text-white/45" : "text-muted-foreground")}>
                    {price ? `Billed ${active.label.toLowerCase()}` : "Scoped to your landscape"}
                  </p>

                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <span
                          className={cn(
                            "mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full",
                            plan.highlight ? "bg-orange/20 text-orange" : "bg-orange/10 text-orange",
                          )}
                        >
                          <Check className="size-3" aria-hidden="true" />
                        </span>
                        <span className={plan.highlight ? "text-white/80" : "text-foreground"}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <CtaButton
                    href="/contact"
                    className="mt-7 w-full"
                    variant={plan.highlight ? "primary" : plan.monthly ? "outlineDark" : "blue"}
                  >
                    {plan.cta}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </CtaButton>
                </div>
              </Reveal>
            );
          })}
        </ul>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Prices are indicative and exclude applicable taxes. Longer durations reduce the effective monthly rate.
        </p>
      </div>
    </section>
  );
}
