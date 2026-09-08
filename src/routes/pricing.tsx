import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { IncludedBand } from "@/components/sections/IncludedBand";
import { Pricing } from "@/components/sections/Pricing";
import { Comparison } from "@/components/sections/Comparison";
import { TrialBanner } from "@/components/sections/TrialBanner";
import { FAQ } from "@/components/sections/FAQ";
import { buildHead, breadcrumbList } from "@/lib/seo";

const title = "Pricing | Transparent Monthly SAP Server Plans — ServerFY";
const description =
  "Simple monthly pricing for SAP practice, training, development and dedicated server plans. Compare what each plan includes and pick the right access.";
const keywords =
  "SAP server pricing, SAP S/4HANA price, SAP practice server cost, SAP training server, dedicated SAP server, monthly SAP access";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
  head: () =>
    buildHead({
      title,
      description,
      path: "/pricing",
      type: "website",
      keywords,
      jsonLd: [
        breadcrumbList([
          { name: "Home", item: "/" },
          { name: "Pricing", item: "/pricing" },
        ]),
      ],
    }),
});

function PricingPage() {
  return (
    <PageShell
      eyebrow="Pricing"
      title="Clear plans, no surprise charges"
      intro="Pick the plan that matches your workload and scale up or down whenever your project changes."
    >
      <Pricing />
      <Comparison />
      <TrialBanner />
      <FAQ />
      <IncludedBand />
    </PageShell>
  );
}
