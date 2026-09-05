import { createFileRoute, notFound } from "@tanstack/react-router";
import { DetailPageView, detailHead } from "@/components/DetailPageView";
import { moduleDetailPage, moduleSlug } from "@/data/module-pages";
import { modules } from "@/data/serverfy";

export const Route = createFileRoute("/modules/$code")({
  loader: ({ params }) => {
    const mod = modules.find((m) => moduleSlug(m.code) === params.code.toLowerCase());
    if (!mod) throw notFound();
    return moduleDetailPage(mod);
  },
  head: ({ loaderData }) =>
    loaderData
      ? detailHead(loaderData)
      : { meta: [{ title: "Module not found — ServerFY" }, { name: "robots", content: "noindex" }] },
  component: ModuleDetail,
});

function ModuleDetail() {
  const page = Route.useLoaderData();
  const related = modules
    .filter((m) => moduleSlug(m.code) !== page.slug)
    .slice(0, 8)
    .map((m) => ({ label: m.code, to: `/modules/${moduleSlug(m.code)}` }));
  return <DetailPageView page={page} related={related} />;
}
