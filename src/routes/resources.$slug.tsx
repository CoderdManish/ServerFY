import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { DetailPageView, detailHead } from "@/components/DetailPageView";
import { findPage, resourcePages } from "@/data/pages";
import { legacyResourceSlugs } from "@/data/legacy-slugs";

export const Route = createFileRoute("/resources/$slug")({
  loader: ({ params }) => {
    const page = findPage(resourcePages, params.slug);
    if (!page) {
      const moved = legacyResourceSlugs[params.slug.toLowerCase()];
      if (moved) throw redirect({ to: "/resources/$slug", params: { slug: moved }, statusCode: 301 });
      throw notFound();
    }
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
