import { createFileRoute, notFound } from "@tanstack/react-router";
import { ModulePageView, moduleFaqs } from "@/components/ModulePageView";
import { moduleSlug } from "@/data/module-pages";
import { modules } from "@/data/serverfy";

export const Route = createFileRoute("/modules/$code")({
  loader: ({ params }) => {
    const mod = modules.find((m) => moduleSlug(m.code) === params.code.toLowerCase());
    if (!mod) throw notFound();
    return mod;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Module not found — ServerFY" }, { name: "robots", content: "noindex" }] };
    }
    const mod = loaderData;
    const path = `/modules/${params.code}`;
    const title = `SAP ${mod.code} Server Access | ${mod.name} Practice — ServerFY`;
    const description = `Practice SAP ${mod.code} (${mod.name}) on a live server. ${mod.desc} Available on ${mod.platforms.join(" / ")} with your own login, configuration access and support.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: path },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
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
                mainEntity: moduleFaqs(mod).map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "/" },
                  { "@type": "ListItem", position: 2, name: "SAP Modules", item: "/modules" },
                  { "@type": "ListItem", position: 3, name: `SAP ${mod.code}`, item: path },
                ],
              },
            ],
          }),
        },
      ],
    };
  },
  component: ModuleDetail,
});

function ModuleDetail() {
  return <ModulePageView mod={Route.useLoaderData()} />;
}
