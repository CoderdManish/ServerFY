import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, CalendarDays, Sparkles } from "lucide-react";
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

const featured = (sortedPosts.find((p) => p.featured) ?? sortedPosts[0])!;
const rest = sortedPosts.filter((p) => p.slug !== featured.slug);

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
  const [active, setActive] = useState<string>("All");
  const visible = useMemo(
    () => (active === "All" ? rest : rest.filter((p) => p.category === active)),
    [active],
  );

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
              <p className="type-eyebrow inline-flex items-center gap-2 text-orange">
                <Sparkles className="size-3.5" aria-hidden="true" />
                Latest
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                Featured article
              </h2>
            </div>
            <p className="text-sm font-semibold text-muted-foreground">
              {sortedPosts.length} articles · updated monthly
            </p>
          </div>

          <article className="group relative mt-8 overflow-hidden rounded-[28px] bg-navy-gradient shadow-[0_30px_80px_-40px_rgba(6,18,40,0.75)] ring-1 ring-white/10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-80 [background:radial-gradient(55%_65%_at_12%_0%,color-mix(in_oklab,var(--orange)_26%,transparent),transparent_70%),radial-gradient(50%_60%_at_92%_15%,color-mix(in_oklab,var(--blue-bright)_30%,transparent),transparent_72%)]"
            />
            <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-12">
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-2 rounded-full bg-orange px-3 py-1 text-[0.68rem] font-black uppercase tracking-wider text-white">
                    Featured
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[0.68rem] font-black uppercase tracking-wider text-white/80 ring-1 ring-white/15">
                    {featured.category}
                  </span>
                </div>
                <h3 className="mt-5 text-[1.7rem] font-black leading-[1.12] tracking-tight text-white sm:text-4xl">
                  <Link
                    to="/blog/$slug"
                    params={{ slug: featured.slug }}
                    className="bg-[linear-gradient(var(--orange),var(--orange))] bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size,color] duration-500 hover:text-orange group-hover:bg-[length:100%_2px]"
                  >
                    {featured.title}
                  </Link>
                </h3>
                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
                  {featured.excerpt}
                </p>
                <div className="mt-6">
                  <Meta date={featured.date} minutes={featured.readMinutes} light />
                </div>
                <div className="mt-8">
                  <CtaButton href={`/blog/${featured.slug}`} size="sm">
                    Read the article
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </CtaButton>
                </div>
              </div>

              <div className="glass-dark rounded-2xl p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <span className="icon-tile-dark grid size-12 place-items-center rounded-xl">
                    <Icon name={featured.icon} className="size-6" />
                  </span>
                  <p className="text-xs font-black uppercase tracking-wider text-white/50">
                    In this article
                  </p>
                </div>
                <ol className="mt-5 space-y-3">
                  {featured.sections.slice(0, 4).map((s, i) => (
                    <li key={s.heading} className="flex items-start gap-3">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-md bg-white/10 text-[0.7rem] font-black text-orange ring-1 ring-white/10">
                        {i + 1}
                      </span>
                      <span className="text-sm leading-relaxed text-white/75">{s.heading}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Archive */}
      <section className="section-y bg-soft-tint">
        <div className="container-fy">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">All articles</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                A couple of new posts each month, written by the engineers who run the landscapes.
              </p>
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter articles by category">
              {["All", ...blogCategories].map((c) => {
                const on = c === active;
                return (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setActive(c)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                      on
                        ? "bg-orange text-white shadow-[0_10px_22px_-12px_color-mix(in_oklab,var(--orange)_80%,transparent)]"
                        : "neu-pill text-blue hover:-translate-y-0.5"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          <ul className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((post) => (
              <li key={post.slug} className="h-full">
                <article
                  className={`neu-card card-hover group relative flex h-full flex-col overflow-hidden rounded-[22px] p-6 tintcard-${post.tint}`}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-orange transition-transform duration-500 group-hover:scale-x-100"
                  />
                  <div className="flex items-start justify-between gap-3">
                    <span className={`icon-tile grid size-12 place-items-center rounded-xl ico-${post.tint}`}>
                      <Icon name={post.icon} className="size-5" />
                    </span>
                    <span className="rounded-full bg-background/70 px-2.5 py-1 text-[0.68rem] font-bold text-muted-foreground ring-1 ring-border">
                      {post.readMinutes} min
                    </span>
                  </div>
                  <p className="mt-5 text-[0.68rem] font-black uppercase tracking-wider text-orange">
                    {post.category}
                  </p>
                  <h3 className="mt-2 text-[1.05rem] font-bold leading-snug text-foreground">
                    <Link
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      className="transition-colors after:absolute after:inset-0 hover:text-orange"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                    <Meta date={post.date} minutes={post.readMinutes} />
                    <ArrowRight
                      className="size-4 text-orange opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                      aria-hidden="true"
                    />
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
