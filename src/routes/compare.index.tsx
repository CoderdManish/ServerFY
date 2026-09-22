import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { ExpertCTA } from "@/components/sections/ExpertCTA";
import { comparisonPages } from "@/data/comparisons";
import { buildHead, breadcrumbList } from "@/lib/seo";

const title = "SAP Server Comparisons | Dedicated vs Shared, ECC vs S/4HANA — ServerFY";
const description =
  "Side-by-side comparisons to help you choose an SAP environment: dedicated vs shared, ECC vs S/4HANA, remote vs local installation and how much server memory you need.";

export const Route = createFileRoute("/compare/")({
  component: ComparePage,
  head: () =>
    buildHead({
      title,
      description,
      path: "/compare",
      keywords: "sap server comparison, dedicated vs shared sap server, sap ecc vs s4hana",
      jsonLd: [
        {
          "@type": "ItemList",
          itemListElement: comparisonPages.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: p.title,
            url: `/compare/${p.slug}`,
          })),
        },
        breadcrumbList([
          { name: "Home", item: "/" },
          { name: "Comparisons", item: "/compare" },
        ]),
      ],
    }),
});

function ComparePage() {
  return (
    <PageShell
      eyebrow="Comparisons"
      title="Compare SAP server options before you buy"
      intro="Straight answers to the choices people weigh up most often — written as side-by-side tables, not sales copy."
      crumbs={[{ name: "Home", to: "/" }, { name: "Comparisons" }]}
    >
      <section className="section-y bg-soft-mesh">
        <div className="container-fy">
          <ul className="grid gap-4 sm:grid-cols-2">
            {comparisonPages.map((p) => (
              <li key={p.slug} className="neu-card rail-card rounded-2xl p-6">
                <h2 className="text-lg font-bold text-foreground">{p.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                <Link
                  to="/compare/$slug"
                  params={{ slug: p.slug }}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue transition-colors hover:text-orange"
                >
                  Read the comparison
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ExpertCTA />
    </PageShell>
  );
}
