import { createFileRoute } from "@tanstack/react-router";
import { DetailPageView, detailHead } from "@/components/DetailPageView";
import { supportPages } from "@/data/pages";

const page = supportPages.find((p) => p.slug === "sla")!;

export const Route = createFileRoute("/sla")({
  head: () => detailHead(page),
  component: () => <DetailPageView page={page} related={[{ label: "Server status", to: "/resources/server-status" }, { label: "Terms of service", to: "/terms" }, { label: "Refund policy", to: "/refund-policy" }]} />,
});
