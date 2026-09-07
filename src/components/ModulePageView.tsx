import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronRight, Plus } from "lucide-react";
import { Icon } from "@/components/Icon";
import { CtaButton } from "@/components/CtaButton";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FloatingActions } from "@/components/sections/FloatingActions";
import { Reveal } from "@/components/Primitives";
import {
  audience,
  heroChips,
  moduleContent,
  modulePlans,
  moduleSpecs,
  moduleSteps,
  whyChoose,
} from "@/data/module-content";
import type { SapModule } from "@/data/serverfy";
import { cn } from "@/lib/utils";

/* ------------------------------ Pastel cycle ------------------------------ */

const TINT_CARDS = ["tintcard-blue", "tintcard-orange", "tintcard-green", "tintcard-violet"] as const;
const TINT_ICONS = ["ico-blue", "ico-orange", "ico-green", "ico-violet"] as const;
const tintCard = (i: number) => TINT_CARDS[i % TINT_CARDS.length];
const icoTint = (i: number) => TINT_ICONS[i % TINT_ICONS.length];

/* --------------------------------- Mock UI -------------------------------- */


function EasyAccessMock({ mod, menu }: { mod: SapModule; menu: string[] }) {
  return (
    <div className="glass-panel relative overflow-hidden rounded-2xl p-3 shadow-lift">
      <div className="flex items-center gap-1.5 pb-2.5">
        <span className="size-2.5 rounded-full bg-orange" />
        <span className="size-2.5 rounded-full bg-orange/50" />
        <span className="size-2.5 rounded-full bg-blue/40" />
      </div>
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border bg-navy px-3 py-2">
          <span className="rounded bg-white/15 px-1.5 py-0.5 text-[0.6rem] font-black tracking-wider text-white">SAP</span>
          <span className="text-[0.7rem] font-bold text-white/80">SAP Easy Access</span>
        </div>
        <div className="grid gap-0 sm:grid-cols-[1.05fr_0.95fr]">
          <ul className="space-y-1.5 border-r border-border p-3 text-[0.72rem] text-muted-foreground">
            <li className="font-bold text-foreground">{mod.name}</li>
            {menu.map((m) => (
              <li key={m} className="flex items-center gap-1.5 pl-3">
                <ChevronRight className="size-3 text-orange" aria-hidden="true" />
                {m}
              </li>
            ))}
          </ul>
          <div className="relative grid place-items-center bg-soft-tint p-4">
            <p className="text-center text-sm font-black italic leading-relaxed text-navy/70">
              Practice
              <br />
              Explore
              <br />
              Build Your Skills
            </p>
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-xl bg-card px-3 py-2 shadow-card">
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-orange/15">
          <Check className="size-3.5 text-orange" aria-hidden="true" />
        </span>
        <span className="text-[0.72rem] font-bold text-foreground">
          Real SAP System <span className="font-medium text-muted-foreground">— not a simulation</span>
        </span>
      </div>
    </div>
  );
}

function ImgTreeMock({ tree }: { tree: { node: string; children: string[] } }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
      <div className="flex items-center gap-2 border-b border-border bg-navy px-3 py-2">
        <span className="rounded bg-white/15 px-1.5 py-0.5 text-[0.6rem] font-black tracking-wider text-white">SAP</span>
        <span className="text-[0.7rem] font-bold text-white/80">Display IMG</span>
      </div>
      <ul className="space-y-1.5 p-4 text-[0.75rem] text-muted-foreground">
        <li className="font-bold text-foreground">SAP Customizing Implementation Guide</li>
        <li className="pl-4">Enterprise Structure</li>
        <li className="pl-4">Cross-Application Components</li>
        <li className="pl-4 font-bold text-foreground">{tree.node}</li>
        {tree.children.map((c) => (
          <li key={c} className="flex items-center gap-1.5 pl-9">
            <ChevronRight className="size-3 text-orange" aria-hidden="true" />
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* --------------------------------- Page ---------------------------------- */

export function ModulePageView({ mod }: { mod: SapModule }) {
  const c = moduleContent(mod);
  const specs = moduleSpecs(mod);
  const faqs = moduleFaqs(mod);
  const half = Math.ceil(faqs.length / 2);

  return (
    <div className="min-h-screen">
      <Navbar solid />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-soft-mesh pt-28 pb-14 lg:pt-32 lg:pb-16">
          <div className="container-fy grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="type-eyebrow text-orange">Practice | Learn | Grow</p>
              <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                <span className="text-blue">SAP {mod.code}</span> Server Access
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Practice {mod.name} on a live SAP environment. {mod.desc} Available on {mod.platforms.join(" and ")} with
                remote access and your own login.
              </p>

              <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {heroChips.map((chip) => (
                  <li key={chip.title} className="flex items-center gap-2.5">
                    <span className="icon-tile grid size-9 shrink-0 place-items-center rounded-lg">
                      <Icon name={chip.icon} className="size-4" />
                    </span>
                    <span className="text-[0.72rem] font-bold leading-tight text-foreground">{chip.title}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <CtaButton href="/contact">
                  Get Free 24-Hour Demo
                  <ArrowRight className="size-4" aria-hidden="true" />
                </CtaButton>
                <CtaButton href="/pricing" variant="outlineDark">
                  View Plans
                </CtaButton>
              </div>
              <p className="mt-4 text-xs font-semibold text-muted-foreground">
                No credit card required &nbsp;|&nbsp; Instant access &nbsp;|&nbsp; Technical support
              </p>
            </div>

            <EasyAccessMock mod={mod} menu={c.menuTree} />
          </div>
        </section>

        {/* What is + process flow */}
        <section className="section-y">
          <div className="container-fy grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">What is SAP {mod.code}?</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{c.whatIs}</p>
              <CtaButton href="/contact" size="sm" variant="outlineDark" className="mt-6">
                Learn More About SAP {mod.code}
              </CtaButton>
            </div>

            <div className="neu-card rounded-3xl p-6">
              <ol className="flex flex-wrap items-start justify-between gap-y-6">
                {c.flow.map((f, i) => (
                  <li key={f.label} className="flex items-center gap-2">
                    <div className="w-20 text-center">
                      <span className="icon-tile mx-auto grid size-12 place-items-center rounded-full">
                        <Icon name={f.icon} className="size-5" />
                      </span>
                      <p className="mt-2 text-[0.68rem] font-bold leading-tight text-foreground">{f.label}</p>
                    </div>
                    {i < c.flow.length - 1 ? (
                      <ArrowRight className="mb-6 size-4 shrink-0 text-orange/70" aria-hidden="true" />
                    ) : null}
                  </li>
                ))}
              </ol>
              <p className="mt-5 border-t border-border pt-4 text-center text-xs font-bold text-muted-foreground">
                {c.flowLabel}
              </p>
            </div>
          </div>
        </section>

        {/* Practice areas */}
        <section className="section-y bg-soft-tint">
          <div className="container-fy">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                  What Can You Practice on Our SAP {mod.code} Server?
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Get hands-on experience with all major {mod.code} activities and processes.
                </p>
              </div>
              <Link to="/modules" className="text-sm font-bold text-blue transition-colors hover:text-orange">
                Explore all modules →
              </Link>
            </div>

            <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {c.areas.map((a, i) => (
                <Reveal as="li" key={a.title} delay={i * 0.04}>
                  <div className={cn("h-full rounded-2xl p-4", tintCard(i))}>
                    <span className={cn("grid size-11 place-items-center rounded-xl", icoTint(i))}>
                      <Icon name={a.icon} className="size-5" />
                    </span>
                    <h3 className="mt-3 text-[0.92rem] font-bold leading-tight text-foreground">{a.title}</h3>
                    <ul className="mt-3 space-y-1.5">
                      {a.items.map((it) => (
                        <li key={it} className="flex items-start gap-1.5 text-[0.74rem] leading-relaxed text-muted-foreground">
                          <Check className="mt-0.5 size-3 shrink-0 text-green" aria-hidden="true" />
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

        {/* T-codes + configuration */}
        <section className="section-y">
          <div className="container-fy grid gap-8 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                Popular SAP {mod.code} Transaction Codes
              </h2>
              <div className="mt-6 overflow-hidden rounded-2xl glass-panel">
                <table className="w-full border-collapse text-sm">
                  <caption className="sr-only">Common SAP {mod.code} transaction codes</caption>
                  <thead>
                    <tr className="bg-navy text-white">
                      <th scope="col" className="px-5 py-3 text-left type-eyebrow">Activity</th>
                      <th scope="col" className="px-5 py-3 text-left type-eyebrow">Transaction Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    {c.tcodes.map((t, i) => (
                      <tr key={t.activity} className={cn(i % 2 ? "bg-background" : "bg-card")}>
                        <td className="px-5 py-2.5 text-muted-foreground">{t.activity}</td>
                        <td className="px-5 py-2.5 font-mono text-[0.78rem] font-bold text-foreground">{t.code}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">{c.configTitle}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Practice key {mod.code} configuration activities (SPRO) and customise the system as per your learning or
                project needs.
              </p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 sm:items-start">
                <ul className="space-y-2">
                  {c.config.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[0.82rem] leading-relaxed text-foreground">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-orange" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <ImgTreeMock tree={c.imgTree} />
              </div>
            </div>
          </div>
        </section>

        {/* Compare + audience */}
        <section className="section-y bg-soft-mesh">
          <div className="container-fy grid gap-8 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                SAP ECC vs S/4HANA for {mod.code}
              </h2>
              <div className="mt-6 overflow-hidden rounded-2xl glass-panel">
                <table className="w-full border-collapse text-sm">
                  <caption className="sr-only">SAP {mod.code} feature comparison between ECC and S/4HANA</caption>
                  <thead>
                    <tr className="bg-navy text-white">
                      <th scope="col" className="px-5 py-3 text-left type-eyebrow">Feature</th>
                      <th scope="col" className="px-5 py-3 text-left type-eyebrow">ECC</th>
                      <th scope="col" className="px-5 py-3 text-left type-eyebrow text-orange">S/4HANA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {c.compare.map((row, i) => (
                      <tr key={row.feature} className={cn(i % 2 ? "bg-background" : "bg-card")}>
                        <th scope="row" className="px-5 py-2.5 text-left font-bold text-foreground">{row.feature}</th>
                        <CompareCell value={row.ecc} />
                        <CompareCell value={row.s4} />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">Who Can Use This Server?</h2>
              <ul className="mt-6 grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                {audience.map((a, i) => (
                  <li key={a.title} className="rounded-2xl border border-border bg-card p-3.5 text-center shadow-card">
                    <span className={cn("mx-auto grid size-11 place-items-center rounded-full", icoTint(i))}>
                      <Icon name={a.icon} className="size-5" />
                    </span>
                    <h3 className="mt-3 text-[0.82rem] font-bold text-foreground">{a.title}</h3>
                    <p className="mt-1.5 text-[0.7rem] leading-relaxed text-muted-foreground">{a.desc}</p>
                  </li>
                ))}
              </ul>

            </div>
          </div>
        </section>

        {/* Scenarios + specs */}
        <section className="section-y">
          <div className="container-fy grid gap-8 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">Real-World Practice Scenarios</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Work on practical exercises and build end-to-end understanding.
              </p>
              <ol className="mt-6 space-y-4">
                {c.scenarios.map((s, i) => (
                  <li key={s.title} className="flex items-start gap-3">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-blue text-[0.7rem] font-black text-white">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      <span className="font-bold text-foreground">{s.title}</span> — {s.desc}
                    </p>
                  </li>
                ))}
              </ol>
              <CtaButton href="/contact" size="sm" variant="outlineDark" className="mt-7">
                View More Practice Scenarios
              </CtaButton>
            </div>

            <div className="neu-card rounded-3xl p-6 sm:p-7">
              <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">Server Specifications</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Technical details of our SAP {mod.code} practice environment.
              </p>
              <table className="mt-6 w-full border-collapse text-sm">
                <caption className="sr-only">SAP {mod.code} server specifications</caption>
                <thead>
                  <tr className="bg-accent">
                    <th scope="col" className="px-4 py-2.5 text-left type-eyebrow text-blue">Specification</th>
                    <th scope="col" className="px-4 py-2.5 text-left type-eyebrow text-blue">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {specs.map((s) => (
                    <tr key={s.label} className="border-t border-border">
                      <th scope="row" className="px-4 py-2.5 text-left font-bold text-foreground">{s.label}</th>
                      <td className="px-4 py-2.5 text-muted-foreground">{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="section-y bg-soft-tint">
          <div className="container-fy">
            <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">How It Works?</h2>
            <p className="mt-2 text-sm text-muted-foreground">Start practising {mod.code} in just 3 simple steps.</p>
            <ol className="mt-9 grid items-center gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
              {moduleSteps.map((s, i) => (
                <li key={s.no} className="contents">
                  <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-card">
                    <span className={cn("grid size-12 shrink-0 place-items-center rounded-full", icoTint(i))}>
                      <Icon name={s.icon} className="size-5" />
                    </span>
                    <div>
                      <p className="type-eyebrow text-blue">{s.no}</p>
                      <h3 className="mt-1 text-base font-bold text-foreground">{s.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                  {i < moduleSteps.length - 1 ? (
                    <ArrowRight className="mx-auto hidden size-5 text-blue/50 lg:block" aria-hidden="true" />
                  ) : null}
                </li>
              ))}
            </ol>

          </div>
        </section>

        {/* Why choose */}
        <section className="section-y">
          <div className="container-fy">
            <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">Why Choose ServerFY?</h2>
            <p className="mt-2 text-sm text-muted-foreground">A reliable partner for your SAP learning and practice journey.</p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {whyChoose.map((w) => (
                <li key={w.title} className="neu-card rounded-2xl p-4">
                  <span className="icon-tile grid size-10 place-items-center rounded-lg">
                    <Icon name={w.icon} className="size-4" />
                  </span>
                  <h3 className="mt-3 text-[0.85rem] font-bold leading-tight text-foreground">{w.title}</h3>
                  <p className="mt-1.5 text-[0.72rem] leading-relaxed text-muted-foreground">{w.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Plans */}
        <section className="section-y bg-soft-mesh">
          <div className="container-fy">
            <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
              Choose Your SAP {mod.code} Practice Access
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">Flexible plans for students, professionals and consultants.</p>
            <ul className="mt-9 grid gap-5 lg:grid-cols-3">
              {modulePlans.map((p) => (
                <li
                  key={p.name}
                  className={cn(
                    "relative flex flex-col rounded-2xl p-6",
                    p.highlight ? "glass-panel ring-2 ring-orange/40" : "neu-card",
                  )}
                >
                  {p.highlight ? (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange px-3 py-1 text-[0.62rem] font-black uppercase tracking-wider text-white">
                      Most popular
                    </span>
                  ) : null}
                  <h3 className="text-center text-base font-bold text-foreground">{p.name}</h3>
                  <p className="mt-1 text-center text-lg font-black text-blue">{p.term}</p>
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-[0.82rem] leading-relaxed text-muted-foreground">
                        <Check className="mt-0.5 size-3.5 shrink-0 text-orange" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <CtaButton
                    href={p.href}
                    size="sm"
                    variant={p.highlight ? "blue" : "outlineDark"}
                    className="mt-6 w-full"
                  >
                    {p.cta}
                  </CtaButton>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-y">
          <div className="container-fy">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">Frequently Asked Questions</h2>
              <Link to="/resources" className="text-sm font-bold text-blue transition-colors hover:text-orange">
                View all FAQs →
              </Link>
            </div>
            <div className="mt-8 grid gap-3 lg:grid-cols-2">
              {[faqs.slice(0, half), faqs.slice(half)].map((col, ci) => (
                <ul key={ci} className="grid content-start gap-3">
                  {col.map((f) => (
                    <li key={f.q}>
                      <details className="group rounded-2xl faq-row px-5 py-1">
                        <summary className="flex cursor-pointer list-none items-center gap-4 py-3.5 text-left text-[0.88rem] font-extrabold text-foreground transition-colors hover:text-orange [&::-webkit-details-marker]:hidden">
                          <span className="min-w-0 flex-1">{f.q}</span>
                          <span className="grid size-7 shrink-0 place-items-center rounded-full icon-tile-soft transition-transform duration-300 group-open:rotate-45">
                            <Plus className="size-3.5" aria-hidden="true" />
                          </span>
                        </summary>
                        <p className="border-t border-border pb-4 pt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                      </details>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="bg-navy-gradient py-12">
          <div className="container-fy flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-black tracking-tight text-white sm:text-2xl">
                Ready to Practice SAP {mod.code} on a Live SAP Environment?
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-white/70">
                Whether you are a student, consultant or professional — get hands-on access and build real skills.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <CtaButton href="/contact">Get Free 24-Hour Demo</CtaButton>
              <CtaButton href="/contact" variant="outlineLight">
                Talk to an Expert
              </CtaButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

function CompareCell({ value }: { value: string }) {
  if (value === "yes") {
    return (
      <td className="px-5 py-2.5">
        <Check className="size-4 text-green" aria-label="Available" />
      </td>
    );
  }
  return <td className="px-5 py-2.5 text-muted-foreground">{value}</td>;
}

export function moduleFaqs(mod: SapModule) {
  return [
    { q: `What is an SAP ${mod.code} practice server?`, a: `It is a live SAP system with ${mod.code} activated and master data loaded, where you get your own login to practise transactions and configuration remotely.` },
    { q: `Can I practise SAP ${mod.code} configuration?`, a: "Yes. You get SPRO access for the module so you can change settings and immediately see the effect on the process." },
    { q: `Can I practise SAP ${mod.code} on ECC?`, a: mod.platforms.includes("ECC") ? `Yes, ${mod.code} is available on ECC 6.0 as well as on S/4HANA where applicable.` : `${mod.code} runs on ${mod.platforms.join(" / ")} in our landscape. Tell us your target release and we will confirm.` },
    { q: "How do I access the server?", a: "You connect over a secure remote login using SAP GUI, or the Fiori launchpad in a browser for S/4HANA systems. We send step-by-step instructions with your credentials." },
    { q: "Do I get my own SAP login?", a: "Yes. Every user receives individual credentials and a private workspace, so your work stays exactly where you left it." },
    { q: "Is the free demo really available?", a: "Yes — a 24-hour demo lets you log in and try the system before you decide. No credit card is required." },
    { q: `Which transactions are available for practice?`, a: `All standard ${mod.code} transactions are available, including the ones listed above, plus reporting and integration with the connected modules.` },
    { q: "Do you provide technical support?", a: "Yes. You can reach an SAP infrastructure engineer on WhatsApp or email for connection, access and system issues." },
  ];
}
