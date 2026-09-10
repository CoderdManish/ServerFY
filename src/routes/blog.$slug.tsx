import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Check, Clock, User } from "lucide-react";
import { Icon } from "@/components/Icon";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaButton } from "@/components/CtaButton";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FloatingActions } from "@/components/sections/FloatingActions";
import { ExpertCTA } from "@/components/sections/ExpertCTA";
import { blogPosts, findPost, formatDate } from "@/data/blog";
import { buildHead, breadcrumbList } from "@/lib/seo";
import { absUrl } from "@/lib/site";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = findPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article not found — ServerFY" }, { name: "robots", content: "noindex" }] };
    }
    const path = `/blog/${params.slug}`;
    return buildHead({
      title: loaderData.metaTitle,
      description: loaderData.description,
      path,
      type: "article",
      keywords: loaderData.keywords,
      jsonLd: [
        {
          "@type": "BlogPosting",
          headline: loaderData.title,
          description: loaderData.description,
          url: absUrl(path),
          mainEntityOfPage: absUrl(path),
          datePublished: loaderData.date,
          dateModified: loaderData.updated ?? loaderData.date,
          keywords: loaderData.keywords,
          articleSection: loaderData.category,
          wordCount: loaderData.sections.reduce(
            (n, s) => n + s.paragraphs.join(" ").split(/\s+/).length,
            0,
          ),
          author: { "@type": "Organization", name: loaderData.author, url: absUrl("/about") },
          publisher: {
            "@type": "Organization",
            name: "ServerFY",
            url: absUrl("/"),
            logo: { "@type": "ImageObject", url: absUrl("/favicon.png") },
          },
        },
        ...(loaderData.faq?.length
          ? [
              {
                "@type": "FAQPage",
                mainEntity: loaderData.faq.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },
            ]
          : []),
        breadcrumbList([
          { name: "Home", item: "/" },
          { name: "Blog", item: "/blog" },
          { name: loaderData.title, item: path },
        ]),
      ],
    });
  },
  component: BlogArticle,
});

function slugifyHeading(h: string) {
  return h.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function BlogArticle() {
  const post = Route.useLoaderData();
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Article header */}
        <section className="relative overflow-hidden bg-navy-gradient pt-28 pb-14 lg:pt-32 lg:pb-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(60%_60%_at_15%_0%,color-mix(in_oklab,var(--orange)_22%,transparent),transparent_70%),radial-gradient(50%_50%_at_90%_20%,color-mix(in_oklab,var(--blue-bright)_28%,transparent),transparent_70%)]"
          />
          <div className="container-fy relative">
            <Breadcrumbs
              className="mb-5"
              items={[{ name: "Home", to: "/" }, { name: "Blog", to: "/blog" }, { name: post.title }]}
            />
            <p className="type-eyebrow text-orange">{post.category}</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
              {post.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">{post.intro}</p>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold text-white/60">
              <span className="inline-flex items-center gap-2">
                <User className="size-3.5" aria-hidden="true" />
                {post.author}
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="size-3.5" aria-hidden="true" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="size-3.5" aria-hidden="true" />
                {post.readMinutes} min read
              </span>
            </div>
          </div>
        </section>

        {/* Body + sidebar */}
        <section className="section-y bg-soft-mesh">
          <div className="container-fy grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
            <article className="max-w-3xl">
              {post.sections.map((s) => (
                <div key={s.heading} id={slugifyHeading(s.heading)} className="scroll-mt-28 first:mt-0 mt-10">
                  <h2 className="text-xl font-black tracking-tight text-foreground sm:text-2xl">{s.heading}</h2>
                  {s.paragraphs.map((p) => (
                    <p key={p} className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                      {p}
                    </p>
                  ))}
                  {s.bullets?.length ? (
                    <ul className="mt-5 space-y-2.5">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-sm leading-relaxed text-foreground">
                          <span className="icon-tile-soft mt-0.5 grid size-6 shrink-0 place-items-center rounded-md">
                            <Check className="size-3.5" aria-hidden="true" />
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}

              <div className="glass-panel mt-12 rounded-3xl p-6 sm:p-8">
                <h2 className="text-lg font-black tracking-tight text-foreground">Key takeaways</h2>
                <ul className="mt-5 space-y-3">
                  {post.takeaways.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-sm leading-relaxed text-foreground">
                      <span className="icon-tile-soft mt-0.5 grid size-6 shrink-0 place-items-center rounded-md">
                        <Check className="size-3.5" aria-hidden="true" />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {post.faq?.length ? (
                <div className="mt-12">
                  <h2 className="text-xl font-black tracking-tight text-foreground sm:text-2xl">
                    Questions we get about this
                  </h2>
                  <div className="mt-6 grid gap-4">
                    {post.faq.map((f) => (
                      <div key={f.q} className="neu-card rounded-2xl p-5">
                        <h3 className="text-base font-bold text-foreground">{f.q}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </article>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-28">
              <nav aria-label="On this page" className="neu-card rounded-2xl p-5">
                <p className="type-eyebrow text-muted-foreground">On this page</p>
                <ol className="mt-4 space-y-2.5">
                  {post.sections.map((s) => (
                    <li key={s.heading}>
                      <a
                        href={`#${slugifyHeading(s.heading)}`}
                        className="text-sm font-semibold leading-snug text-blue transition-colors hover:text-orange"
                      >
                        {s.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className={`neu-card mt-5 rounded-2xl p-5 tintcard-${post.tint}`}>
                <span className={`icon-tile grid size-11 place-items-center rounded-xl ico-${post.tint}`}>
                  <Icon name={post.icon} className="size-5" />
                </span>
                <p className="mt-4 text-sm font-bold text-foreground">Want a server to try this on?</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Live SAP environments with your own logins, usually activated the same working day.
                </p>
                <div className="mt-5">
                  <CtaButton href="/pricing" size="sm">
                    See pricing
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </CtaButton>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span key={t} className="neu-pill rounded-full px-3 py-1.5 text-xs font-bold text-blue">
                    #{t}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </section>

        {/* Related */}
        <section className="section-y bg-soft-tint">
          <div className="container-fy">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">Read next</h2>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue transition-colors hover:text-orange"
              >
                All articles
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <ul className="mt-8 grid gap-5 md:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <article className="neu-card card-hover flex h-full flex-col rounded-2xl p-6">
                    <p className="text-xs font-black uppercase tracking-wider text-orange">{p.category}</p>
                    <h3 className="mt-2 text-base font-bold leading-snug text-foreground">
                      <Link
                        to="/blog/$slug"
                        params={{ slug: p.slug }}
                        className="transition-colors hover:text-orange"
                      >
                        {p.title}
                      </Link>
                    </h3>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                    <p className="mt-5 border-t border-border pt-4 text-xs font-semibold text-muted-foreground">
                      {p.readMinutes} min read
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ExpertCTA />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
