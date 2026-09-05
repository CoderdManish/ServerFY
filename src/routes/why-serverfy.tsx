import { createFileRoute } from "@tanstack/react-router";
import { DetailPageView, detailHead } from "@/components/DetailPageView";
import { companyPages } from "@/data/pages";

const page = companyPages.find((p) => p.slug === "why-serverfy")!;

export const Route = createFileRoute("/why-serverfy")({
  head: () => detailHead(page, "/why-serverfy"),
  component: () => <DetailPageView page={page} related={[{ label: "Our infrastructure", to: "/infrastructure" }, { label: "About us", to: "/about" }, { label: "Pricing", to: "/pricing" }]} />,
});
