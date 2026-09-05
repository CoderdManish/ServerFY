import { createFileRoute } from "@tanstack/react-router";
import { DetailPageView, detailHead } from "@/components/DetailPageView";
import { companyPages } from "@/data/pages";

const page = companyPages.find((p) => p.slug === "careers")!;

export const Route = createFileRoute("/careers")({
  head: () => detailHead(page, "/careers"),
  component: () => <DetailPageView page={page} related={[{ label: "About us", to: "/about" }, { label: "Contact", to: "/contact" }]} />,
});
