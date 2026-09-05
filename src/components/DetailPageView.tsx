import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Icon } from "@/components/Icon";
import { CtaButton } from "@/components/CtaButton";
import { PageShell } from "@/components/PageShell";
import { ExpertCTA } from "@/components/sections/ExpertCTA";
import { IncludedBand } from "@/components/sections/IncludedBand";
import type { DetailPage } from "@/data/pages";

type RelatedLink = { label: string; to: string };

export function DetailPageView({ page, related = [] }: { page: DetailPage; related?: RelatedLink[] }) {
  return (
    <PageShell eyebrow={page.eyebrow} title={page.title} intro={page.intro}>
      {/* Highlights */}
      <section className="section-y bg-soft-mesh">
        <div className="container-fy">
          <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">What you get</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {page.highlights.map((h) => (
              <li key={h.title} className="neu-card rounded-2xl p-5">
                <span className="icon-tile grid size-11 place-items-center rounded-xl">
                  <Icon name={h.icon} className="size-5" />
                </span>
                <h3 className="mt-4 text-base font-bold text-foreground">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Specs + checklist */}
      <section className="section-y bg-soft-tint">
        <div className="container-fy grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div className="glass-panel rounded-3xl p-6 sm:p-8">
            <h2 className="text-xl font-black tracking-tight text-foreground">Specification</h2>
            <dl className="mt-6 divide-y divide-border">
              {page.specs.map((s) => (
                <div key={s.label} className="grid gap-1 py-3.5 sm:grid-cols-[190px_1fr] sm:gap-4">
                  <dt className="text-xs font-black uppercase tracking-wider text-muted-foreground">{s.label}</dt>
                  <dd className="text-sm leading-relaxed text-foreground">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="neu-card rounded-3xl p-6 sm:p-8">
            <h2 className="text-xl font-black tracking-tight text-foreground">{page.checklist.title}</h2>
            <ul className="mt-6 space-y-3">
              {page.checklist.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-foreground">
                  <span className="icon-tile-soft mt-0.5 grid size-6 shrink-0 place-items-center rounded-md">
                    <Check className="size-3.5" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <CtaButton href="/contact" size="sm">
                Get this environment
                <ArrowRight className="size-4" aria-hidden="true" />
              </CtaButton>
              <CtaButton href="/pricing" size="sm" variant="outlineDark">
                See pricing
              </CtaButton>
            </div>
          </div>
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

          {related.length ? (
            <nav aria-label="Related pages" className="mt-10">
              <p className="type-eyebrow text-muted-foreground">Explore next</p>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {related.map((r) => (
                  <li key={r.to}>
                    <Link
                      to={r.to}
                      className="neu-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-blue transition-colors hover:text-orange"
                    >
                      {r.label}
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>
      </section>

      <ExpertCTA />
    </PageShell>
  );
}

export function detailHead(page: DetailPage, path: string) {
  return {
    meta: [
      { title: page.metaTitle },
      { name: "description", content: page.description },
      { property: "og:title", content: page.metaTitle },
      { property: "og:description", content: page.description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: path },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: page.metaTitle },
      { name: "twitter:description", content: page.description },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: path }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "FAQPage",
              mainEntity: page.faq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "/" },
                { "@type": "ListItem", position: 2, name: page.eyebrow, item: path.split("/").slice(0, 2).join("/") },
                { "@type": "ListItem", position: 3, name: page.title, item: path },
              ],
            },
          ],
        }),
      },
    ],
  };
}
