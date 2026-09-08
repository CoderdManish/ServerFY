import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { ModulePageView, moduleFaqs } from "@/components/ModulePageView";
import { legacyModuleSlug, moduleSlug, shortModuleSlug } from "@/data/module-pages";
import { modules } from "@/data/serverfy";
import { buildHead, breadcrumbList } from "@/lib/seo";

export const Route = createFileRoute("/modules/$code")({
  loader: ({ params }) => {
    const code = params.code.toLowerCase();
    const mod = modules.find((m) => moduleSlug(m.code) === code);
    if (!mod) {
      const moved = modules.find(
        (m) => legacyModuleSlug(m.code) === code || shortModuleSlug(m.code) === code,
      );
      if (moved) throw redirect({ to: "/modules/$code", params: { code: moduleSlug(moved.code) }, statusCode: 301 });
      throw notFound();
    }
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
    const keywords = `SAP ${mod.code}, SAP ${mod.name}, SAP ${mod.code} server, SAP ${mod.code} practice, SAP ${mod.code} training, ${mod.platforms.join(", ")}`;
    return buildHead({
      title,
      description,
      path,
      type: "article",
      keywords,
      jsonLd: [
        {
          "@type": "FAQPage",
          mainEntity: moduleFaqs(mod).map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
        breadcrumbList([
          { name: "Home", item: "/" },
          { name: "SAP Modules", item: "/modules" },
          { name: `SAP ${mod.code}`, item: path },
        ]),
      ],
    });
  },
  component: ModuleDetail,
});

function ModuleDetail() {
  return <ModulePageView mod={Route.useLoaderData()} />;
}
