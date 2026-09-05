import { createFileRoute, notFound } from "@tanstack/react-router";
import { DetailPageView, detailHead } from "@/components/DetailPageView";
import { findPage, resourcePages } from "@/data/pages";

export const Route = createFileRoute("/resources/$slug")({
  loader: ({ params }) => {
    const page = findPage(resourcePages, params.slug);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData, params }) =>
    loaderData
      ? detailHead(loaderData, `/resources/${params.slug}`)
      : { meta: [{ title: "Resource not found — ServerFY" }, { name: "robots", content: "noindex" }] },
  component: ResourceDetail,
});

function ResourceDetail() {
  const page = Route.useLoaderData();
  const related = resourcePages
    .filter((p) => p.slug !== page.slug)
    .map((p) => ({ label: p.title, to: `/resources/${p.slug}` }));
  return <DetailPageView page={page} related={related} />;
}
