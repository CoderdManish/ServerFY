import { createFileRoute } from "@tanstack/react-router";
import { DetailPageView, detailHead } from "@/components/DetailPageView";
import { companyPages } from "@/data/pages";

const page = companyPages.find((p) => p.slug === "infrastructure")!;

export const Route = createFileRoute("/infrastructure")({
  head: () => detailHead(page, "/infrastructure"),
  component: () => <DetailPageView page={page} related={[{ label: "Why ServerFY", to: "/why-serverfy" }, { label: "Server status", to: "/resources/sap-server-status" }, { label: "SLA", to: "/sla" }]} />,
});
