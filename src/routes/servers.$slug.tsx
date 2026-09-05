import { createFileRoute, notFound } from "@tanstack/react-router";
import { DetailPageView, detailHead } from "@/components/DetailPageView";
import { findPage, serverPages } from "@/data/pages";

export const Route = createFileRoute("/servers/$slug")({
  loader: ({ params }) => {
    const page = findPage(serverPages, params.slug);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData, params }) =>
    loaderData
      ? detailHead(loaderData, `/servers/${params.slug}`)
      : { meta: [{ title: "Server not found — ServerFY" }, { name: "robots", content: "noindex" }] },
  component: ServerDetail,
});

function ServerDetail() {
  const page = Route.useLoaderData();
  const related = serverPages
    .filter((p) => p.slug !== page.slug)
    .slice(0, 5)
    .map((p) => ({ label: p.title.replace(" server access", "").replace("SAP ", ""), to: `/servers/${p.slug}` }));
  return <DetailPageView page={page} related={related} />;
}
