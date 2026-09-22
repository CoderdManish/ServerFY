import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { CtaButton } from "@/components/CtaButton";
import { QuickAnswer } from "@/components/sections/QuickAnswer";
import { ExpertCTA } from "@/components/sections/ExpertCTA";
import { absUrl } from "@/lib/site";
import type { ComparisonPage } from "@/data/comparisons";

export function ComparisonView({ page }: { page: ComparisonPage }) {
  const three = page.columns.length === 3;
  return (
    <PageShell
      eyebrow={page.eyebrow}
      title={page.title}
      intro={page.answer.split(". ").slice(0, 2).join(". ") + "."}
      crumbs={[{ name: "Home", to: "/" }, { name: "Comparisons", to: "/compare" }, { name: page.title }]}
    >
      <QuickAnswer question={page.question} answer={page.answer} />

      <section className="section-y bg-soft-mesh">
        <div className="container-fy">
          <p className="type-eyebrow text-orange">Side by side</p>
          <h2 className="mt-3 type-section text-foreground">The differences that matter</h2>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr>
                  <th scope="col" className="w-48 px-4 py-3 text-xs font-black uppercase tracking-wider text-muted-foreground">
                    Criteria
                  </th>
                  {page.columns.map((c) => (
                    <th key={c} scope="col" className="px-4 py-3 text-sm font-black text-foreground">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {page.rows.map((r) => (
                  <tr key={r.label} className="border-t border-border align-top">
                    <th scope="row" className="px-4 py-4 text-xs font-black uppercase tracking-wider text-muted-foreground">
                      {r.label}
                    </th>
                    <td className="px-4 py-4 text-sm leading-relaxed text-foreground">{r.a}</td>
                    <td className="px-4 py-4 text-sm leading-relaxed text-foreground">{r.b}</td>
                    {three ? <td className="px-4 py-4 text-sm leading-relaxed text-foreground">{r.c ?? "—"}</td> : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section-y bg-soft-tint">
        <div className="container-fy grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div className="neu-card rail-card rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-black tracking-tight text-foreground">{page.verdict.title}</h2>
            <ul className="mt-6 space-y-3">
              {page.verdict.items.map((item) => (
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
                Ask which fits you
                <ArrowRight className="size-4" aria-hidden="true" />
              </CtaButton>
              <CtaButton href="/pricing" size="sm" variant="outlineDark">
                See pricing
              </CtaButton>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-black tracking-tight text-foreground">Common questions</h2>
            <div className="mt-6 space-y-5">
              {page.faq.map((f) => (
                <div key={f.q}>
                  <h3 className="text-base font-bold text-foreground">{f.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </div>
            <nav aria-label="Related pages" className="mt-7 flex flex-wrap gap-2.5">
              {page.related.map((r) => (
                <Link
                  key={r.to}
                  to={r.to}
                  className="neu-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-blue transition-colors hover:text-orange"
                >
                  {r.label}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>

      <ExpertCTA />
    </PageShell>
  );
}

export function comparisonHead(page: ComparisonPage, path: string) {
  const url = absUrl(path);
  const title = clampTitle(page.metaTitle);
  const description = clampDescription(page.description);
  const meta: Array<{ title: string } | { name?: string; property?: string; content: string }> = [
    { title },
    { name: "description", content: description },
    ...socialMeta({ title, description, url, type: "article" }),
    { name: "robots", content: "index, follow" },
  ];
  if (page.keywords) meta.push({ name: "keywords", content: page.keywords });
  return {
    meta,
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "FAQPage",
              mainEntity: [
                { "@type": "Question", name: page.question, acceptedAnswer: { "@type": "Answer", text: page.answer } },
                ...page.faq.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              ],
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
                { "@type": "ListItem", position: 2, name: "Comparisons", item: absUrl("/compare") },
                { "@type": "ListItem", position: 3, name: page.title, item: url },
              ],
            },
          ],
        }),
      },
    ],
  };
}
