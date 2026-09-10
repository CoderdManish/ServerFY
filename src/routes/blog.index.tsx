import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, CalendarDays } from "lucide-react";
import { Icon } from "@/components/Icon";
import { PageShell } from "@/components/PageShell";
import { CtaButton } from "@/components/CtaButton";
import { ExpertCTA } from "@/components/sections/ExpertCTA";
import { blogCategories, formatDate, sortedPosts } from "@/data/blog";
import { buildHead, breadcrumbList } from "@/lib/seo";
import { absUrl } from "@/lib/site";

const title = "SAP Server Blog | Practice, Performance & Access Guides — ServerFY";
const description =
  "Notes from the ServerFY infrastructure team: SAP S/4HANA vs ECC, practice plans by module, server performance, backups and running large training batches.";
const keywords =
  "SAP blog, SAP server blog, SAP practice guides, SAP S/4HANA articles, SAP training tips, SAP performance";

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
  head: () =>
    buildHead({
      title,
      description,
      path: "/blog",
      type: "website",
      keywords,
      jsonLd: [
        {
          "@type": "Blog",
          "@id": `${absUrl("/blog")}#blog`,
          name: "ServerFY Blog",
          url: absUrl("/blog"),
          description,
          blogPost: sortedPosts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: absUrl(`/blog/${p.slug}`),
            datePublished: p.date,
            dateModified: p.updated ?? p.date,
            author: { "@type": "Organization", name: p.author },
          })),
        },
        breadcrumbList([
          { name: "Home", item: "/" },
          { name: "Blog", item: "/blog" },
        ]),
      ],
    }),
});

const [featured, ...rest] = [
  sortedPosts.find((p) => p.featured) ?? sortedPosts[0],
  ...sortedPosts.filter((p) => p !== (sortedPosts.find((q) => q.featured) ?? sortedPosts[0])),
];

function Meta({ date, minutes, light }: { date: string; minutes: number; light?: boolean }) {
  const cls = light ? "text-white/60" : "text-muted-foreground";
  return (
    <div className={`flex flex-wrap items-center gap-4 text-xs font-semibold ${cls}`}>
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays className="size-3.5" aria-hidden="true" />
        <time dateTime={date}>{formatDate(date)}</time>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="size-3.5" aria-hidden="true" />
        {minutes} min read
      </span>
    </div>
  );
}

function BlogIndex() {
  return (
    <PageShell
      eyebrow="Blog"
      title="SAP server notes from the team that runs them"
      intro="Practical writing on SAP practice environments — what breaks, what we changed and what actually helps learners and teams get productive faster."
      crumbs={[{ name: "Home", to: "/" }, { name: "Blog" }]}
    >
      {/* Featured */}
      <section className="section-y bg-soft-mesh">
        <div className="container-fy">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="type-eyebrow text-orange">Latest</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                Featured article
              </h2>
            </div>
            <ul className="flex flex-wrap gap-2">
              {blogCategories.map((c) => (
                <li
                  key={c}
                  className="neu-pill rounded-full px-3.5 py-1.5 text-xs font-bold text-blue"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <article className="mt-8 overflow-hidden rounded-3xl bg-navy-gradient">
            <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.25fr_1fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-orange">
                  {featured.category}
                </span>
                <h3 className="mt-4 text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl">
                  <Link
                    to="/blog/$slug"
                    params={{ slug: featured.slug }}
                    className="transition-colors hover:text-orange"
                  >
                    {featured.title}
                  </Link>
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70">{featured.excerpt}</p>
                <div className="mt-6">
                  <Meta date={featured.date} minutes={featured.readMinutes} light />
                </div>
                <div className="mt-7">
                  <CtaButton href={`/blog/${featured.slug}`} size="sm">
                    Read the article
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </CtaButton>
                </div>
              </div>
              <div className="glass-dark rounded-2xl p-6">
                <span className="icon-tile-dark grid size-12 place-items-center rounded-xl">
                  <Icon name={featured.icon} className="size-6" />
                </span>
                <p className="mt-5 text-xs font-black uppercase tracking-wider text-white/50">
                  In this article
                </p>
                <ul className="mt-3 space-y-2.5">
                  {featured.sections.slice(0, 4).map((s) => (
                    <li key={s.heading} className="text-sm leading-relaxed text-white/75">
                      {s.heading}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Archive */}
      <section className="section-y bg-soft-tint">
        <div className="container-fy">
          <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">All articles</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            A couple of new posts each month, written by the engineers who run the landscapes.
          </p>

          <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <li key={post.slug} className="h-full">
                <article className={`neu-card card-hover flex h-full flex-col rounded-2xl p-6 tintcard-${post.tint}`}>
                  <span className={`icon-tile grid size-11 place-items-center rounded-xl ico-${post.tint}`}>
                    <Icon name={post.icon} className="size-5" />
                  </span>
                  <p className="mt-4 text-xs font-black uppercase tracking-wider text-orange">
                    {post.category}
                  </p>
                  <h3 className="mt-2 text-base font-bold leading-snug text-foreground">
                    <Link
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      className="transition-colors hover:text-orange"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 border-t border-border pt-4">
                    <Meta date={post.date} minutes={post.readMinutes} />
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ExpertCTA />
    </PageShell>
  );
}
