import { createFileRoute, notFound } from "@tanstack/react-router";
import { ComparisonView, comparisonHead } from "@/components/ComparisonView";
import { findComparison } from "@/data/comparisons";

export const Route = createFileRoute("/compare/$slug")({
  loader: ({ params }) => {
    const page = findComparison(params.slug);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData, params }) =>
    loaderData
      ? comparisonHead(loaderData, `/compare/${params.slug}`)
      : { meta: [{ title: "Comparison not found — ServerFY" }, { name: "robots", content: "noindex" }] },
  component: () => <ComparisonView page={Route.useLoaderData()} />,
});
