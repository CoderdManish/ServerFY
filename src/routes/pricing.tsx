import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { IncludedBand } from "@/components/sections/IncludedBand";
import { Pricing } from "@/components/sections/Pricing";
import { Comparison } from "@/components/sections/Comparison";
import { TrialBanner } from "@/components/sections/TrialBanner";
import { FAQ } from "@/components/sections/FAQ";
import { buildHead, breadcrumbList } from "@/lib/seo";

const title = "SAP Server Access Pricing & Plans | ServerFY";
const description =
  "Compare SAP server access prices for functional and technical modules across 1, 2, 3 and 6-month plans, plus custom dedicated environments.";
const keywords =
  "sap server access price, sap practice server price, sap server access cost, sap practice server cost, sap server access plans, sap practice server monthly price, sap ecc server access price, sap s4hana server access price, sap fico server access price, sap mm server access price, affordable sap practice server";

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
      title="Choose your module and access period"
      intro="See the exact price for functional or technical practice access. Specialist modules and dedicated environments are quoted individually."
    >
      <Pricing />
      <Comparison />
      <TrialBanner />
      <FAQ />
      <IncludedBand />
    </PageShell>
  );
}
