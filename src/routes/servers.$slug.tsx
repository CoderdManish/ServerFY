import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { DetailPageView, detailHead } from "@/components/DetailPageView";
import { DedicatedServerView } from "@/components/DedicatedServerView";
import { findPage, serverPages } from "@/data/pages";
import { legacyServerSlugs } from "@/data/legacy-slugs";

export const Route = createFileRoute("/servers/$slug")({
  loader: ({ params }) => {
    const page = findPage(serverPages, params.slug);
    if (!page) {
      const moved = legacyServerSlugs[params.slug.toLowerCase()];
      if (moved) throw redirect({ to: "/servers/$slug", params: { slug: moved }, statusCode: 301 });
      throw notFound();
    }
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
  if (page.slug === "sap-dedicated-server-access") return <DedicatedServerView page={page} />;
  const related = serverPages
    .filter((p) => p.slug !== page.slug)
    .slice(0, 5)
    .map((p) => ({ label: p.title.replace(" server access", "").replace("SAP ", ""), to: `/servers/${p.slug}` }));
  return <DetailPageView page={page} related={related} />;
}
