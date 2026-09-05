import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { IncludedBand } from "@/components/sections/IncludedBand";
import { Pricing } from "@/components/sections/Pricing";
import { Comparison } from "@/components/sections/Comparison";
import { TrialBanner } from "@/components/sections/TrialBanner";
import { FAQ } from "@/components/sections/FAQ";

const title = "Pricing | Transparent SAP Server Plans — ServerFY";
const description =
  "Simple monthly, quarterly and yearly pricing for SAP practice, training, development and dedicated server plans. Compare what each plan includes.";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/pricing" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
});

function PricingPage() {
  return (
    <PageShell
      eyebrow="Pricing"
      title="Clear plans, no surprise charges"
      intro="Pick a billing cycle, pick the plan that matches your workload, and scale up or down whenever your project changes."
    >
      <Pricing />
      <Comparison />
      <TrialBanner />
      <FAQ />
      <IncludedBand />
    </PageShell>
  );
}
