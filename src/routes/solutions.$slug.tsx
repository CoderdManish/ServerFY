import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { DetailPageView, detailHead } from "@/components/DetailPageView";
import { findPage, solutionPages } from "@/data/pages";
import { legacySolutionSlugs } from "@/data/legacy-slugs";

export const Route = createFileRoute("/solutions/$slug")({
  loader: ({ params }) => {
    const page = findPage(solutionPages, params.slug);
    if (!page) {
      const moved = legacySolutionSlugs[params.slug.toLowerCase()];
      if (moved) throw redirect({ to: "/solutions/$slug", params: { slug: moved }, statusCode: 301 });
      throw notFound();
    }
    return page;
  },
  head: ({ loaderData, params }) =>
    loaderData
      ? detailHead(loaderData, `/solutions/${params.slug}`)
      : { meta: [{ title: "Solution not found — ServerFY" }, { name: "robots", content: "noindex" }] },
  component: SolutionDetail,
});

function SolutionDetail() {
  const page = Route.useLoaderData();
  const related = solutionPages
    .filter((p) => p.slug !== page.slug)
    .slice(0, 5)
    .map((p) => ({ label: p.title, to: `/solutions/${p.slug}` }));
  return <DetailPageView page={page} related={related} />;
}
