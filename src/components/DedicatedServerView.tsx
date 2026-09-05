import { ArrowRight, Check, Minus } from "lucide-react";
import { Icon } from "@/components/Icon";
import { CtaButton } from "@/components/CtaButton";
import { PageShell } from "@/components/PageShell";
import { Reveal, SectionHeading } from "@/components/Primitives";
import { ExpertCTA } from "@/components/sections/ExpertCTA";
import { IncludedBand } from "@/components/sections/IncludedBand";
import type { DetailPage } from "@/data/pages";
import {
  dedicatedComparison,
  dedicatedIncluded,
  dedicatedIntro,
  dedicatedModels,
  dedicatedPillars,
  dedicatedStats,
  dedicatedTags,
  dedicatedTrust,
  dedicatedUseCases,
  dedicatedWhy,
} from "@/data/dedicated";

/** Rich, reference-styled page for the dedicated SAP S/4HANA server offering. */
export function DedicatedServerView({ page }: { page: DetailPage }) {
  return (
    <PageShell eyebrow={page.eyebrow} title={page.title} intro={page.intro}>
      {/* Stats + trust strip */}
      <section className="relative overflow-hidden bg-navy pb-14 pt-2">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid opacity-[0.12] [mask-image:radial-gradient(70%_70%_at_50%_0%,#000,transparent)]"
        />
        <div className="container-fy relative">
          <ul className="grid gap-4 sm:grid-cols-3">
            {dedicatedStats.map((s) => (
              <li key={s.label} className="glass-dark flex items-center gap-4 rounded-2xl px-5 py-4">
                <span className="icon-tile-dark grid size-12 shrink-0 place-items-center rounded-xl text-orange">
                  <Icon name={s.icon} className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-2xl font-black tracking-tight text-white">{s.value}</p>
                  <p className="text-xs font-bold uppercase tracking-wider text-white/55">{s.label}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-white/45">
              Trusted by teams worldwide
            </span>
            {dedicatedTrust.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-xs font-bold text-white/75 backdrop-blur"
              >
                <Check className="size-3.5 text-orange" aria-hidden="true" />
                {t}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <CtaButton href="/contact">
              Get started
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </CtaButton>
            <CtaButton href="/pricing" variant="outlineLight">
              See pricing
            </CtaButton>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="section-y bg-soft-mesh">
        <div className="container-fy">
          <SectionHeading
            eyebrow="Use cases"
            title="What teams run on a dedicated server"
            sub="One private landscape covering sandbox, development, training, demos, migration rehearsals and integration work."
            align="left"
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {dedicatedUseCases.map((u, i) => (
              <Reveal as="li" key={u.title} delay={(i % 4) * 0.05}>
                <div className="neu-card rail-card flex h-full items-start gap-3.5 rounded-2xl p-5">
                  <span className="icon-tile grid size-11 shrink-0 place-items-center rounded-xl">
                    <Icon name={u.icon} className="size-5" />
                  </span>
                  <p className="mt-1 text-sm font-bold leading-snug text-foreground">{u.title}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <ul className="mt-8 flex flex-wrap gap-2.5">
            {dedicatedTags.map((t) => (
              <li
                key={t}
                className="neu-inset inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-foreground"
              >
                <Check className="size-3.5 text-orange" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Narrative */}
      <section className="section-y bg-soft-tint">
        <div className="container-fy grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="type-eyebrow text-orange">Your private SAP landscape</p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-foreground sm:text-3xl">
              No sharing, no compromises
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {dedicatedIntro.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <CtaButton href="/contact" size="sm">
                Get started
                <ArrowRight className="size-4" aria-hidden="true" />
              </CtaButton>
              <CtaButton href="#compare" size="sm" variant="outlineDark">
                Dedicated vs shared
              </CtaButton>
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {dedicatedPillars.map((p) => (
              <li key={p.title} className="glass-panel rounded-2xl p-5">
                <span className="icon-tile grid size-11 place-items-center rounded-xl">
                  <Icon name={p.icon} className="size-5" />
                </span>
                <h3 className="mt-4 text-base font-bold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why choose */}
      <section className="section-y bg-soft-mesh">
        <div className="container-fy">
          <SectionHeading
            eyebrow="Why choose ServerFY"
            title="Unmatched performance & reliability"
            sub="Secure, scalable dedicated SAP S/4HANA servers engineered for enterprise performance."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dedicatedWhy.map((w, i) => (
              <Reveal as="li" key={w.title} delay={(i % 3) * 0.05}>
                <div className="neu-card rail-card h-full rounded-2xl p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="icon-tile grid size-12 place-items-center rounded-2xl">
                      <Icon name={w.icon} className="size-5" />
                    </span>
                    <span className="font-mono text-[0.65rem] font-bold tracking-widest text-muted-foreground/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[1.05rem] font-extrabold text-foreground">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* What's included */}
      <section className="section-y bg-soft-tint">
        <div className="container-fy">
          <SectionHeading
            eyebrow="What's included"
            title="Included in every dedicated plan"
            sub="Every ServerFY dedicated server ships with the same configuration, tooling and support baseline."
            align="left"
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {dedicatedIncluded.map((it, i) => (
              <Reveal as="li" key={it.title} delay={(i % 2) * 0.05}>
                <div className="glass-panel rail-card flex h-full gap-4 rounded-2xl p-6">
                  <span className="icon-tile grid size-12 shrink-0 place-items-center rounded-2xl">
                    <Icon name={it.icon} className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-foreground">{it.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Dedicated vs shared */}
      <section id="compare" className="section-y scroll-mt-24 bg-soft-mesh">
        <div className="container-fy">
          <SectionHeading
            eyebrow="Feature comparison"
            title="Dedicated server vs shared server"
            sub="The same SAP system, two very different levels of control, isolation and support."
          />

          {/* Desktop table */}
          <div className="mt-12 hidden overflow-hidden rounded-3xl glass-panel lg:block">
            <table className="w-full border-collapse text-sm">
              <caption className="sr-only">Dedicated SAP server compared with shared SAP server</caption>
              <thead>
                <tr className="bg-navy text-white">
                  <th scope="col" className="w-56 px-6 py-4 text-left type-eyebrow">
                    Features
                  </th>
                  <th scope="col" className="px-6 py-4 text-left type-eyebrow text-orange">
                    Dedicated server
                  </th>
                  <th scope="col" className="px-6 py-4 text-left type-eyebrow">
                    Shared server
                  </th>
                </tr>
              </thead>
              <tbody>
                {dedicatedComparison.map((row, i) => (
                  <tr key={row.feature} className={i % 2 ? "bg-background" : "bg-card"}>
                    <th scope="row" className="px-6 py-4 text-left align-top font-bold text-foreground">
                      {row.feature}
                    </th>
                    <td className="px-6 py-4 align-top text-foreground">
                      <span className="flex gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-orange" aria-hidden="true" />
                        {row.dedicated}
                      </span>
                    </td>
                    <td className="px-6 py-4 align-top text-muted-foreground">
                      <span className="flex gap-2">
                        <Minus className="mt-0.5 size-4 shrink-0 text-muted-foreground/60" aria-hidden="true" />
                        {row.shared}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <ul className="mt-10 grid gap-4 lg:hidden">
            {dedicatedComparison.map((row) => (
              <li key={row.feature} className="neu-card rounded-2xl p-5">
                <p className="type-eyebrow text-orange">{row.feature}</p>
                <div className="mt-3 space-y-3 text-sm">
                  <div className="rounded-xl border border-orange/25 bg-orange/[0.06] p-3">
                    <p className="text-[0.7rem] font-black uppercase tracking-wider text-orange">Dedicated</p>
                    <p className="mt-1 leading-relaxed text-foreground">{row.dedicated}</p>
                  </div>
                  <div className="neu-inset rounded-xl p-3">
                    <p className="text-[0.7rem] font-black uppercase tracking-wider text-muted-foreground">Shared</p>
                    <p className="mt-1 leading-relaxed text-muted-foreground">{row.shared}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Service offering models */}
      <section className="section-y bg-soft-tint">
        <div className="container-fy">
          <SectionHeading
            eyebrow="Service models"
            title="Our service offering models"
            sub="Flexible solutions tailored to your organisation's specific needs."
          />
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {dedicatedModels.map((m, i) => (
              <Reveal as="li" key={m.title} delay={i * 0.05}>
                <div className="glass-panel rail-card h-full rounded-2xl p-6">
                  <span className="icon-tile grid size-12 place-items-center rounded-2xl">
                    <Icon name={m.icon} className="size-5" />
                  </span>
                  <h3 className="mt-5 text-[1.05rem] font-extrabold text-foreground">{m.title}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {m.items.map((it) => (
                      <li key={it} className="flex items-start gap-2 text-sm font-semibold text-muted-foreground">
                        <Check className="mt-0.5 size-4 shrink-0 text-orange" aria-hidden="true" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <IncludedBand />

      {/* FAQ */}
      <section className="section-y bg-soft-mesh">
        <div className="container-fy">
          <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">Common questions</h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {page.faq.map((f) => (
              <div key={f.q} className="neu-card rounded-2xl p-5">
                <h3 className="text-base font-bold text-foreground">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ExpertCTA />
    </PageShell>
  );
}
