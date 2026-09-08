import { createFileRoute } from "@tanstack/react-router";
import { DetailPageView, detailHead } from "@/components/DetailPageView";
import { supportPages } from "@/data/pages";

const page = supportPages.find((p) => p.slug === "refund-policy")!;

export const Route = createFileRoute("/refund-policy")({
  head: () => detailHead(page, "/refund-policy"),
  component: () => (
    <DetailPageView
      page={page}
      related={[
        { label: "Terms of service", to: "/terms" },
        { label: "Privacy policy", to: "/privacy" },
        { label: "SLA", to: "/sla" },
      ]}
    />
  ),
});
