import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { ModuleExplorer } from "@/components/sections/ModuleExplorer";
import { FunctionalTechnical } from "@/components/sections/FunctionalTechnical";
import { TrialBanner } from "@/components/sections/TrialBanner";
import { ExpertCTA } from "@/components/sections/ExpertCTA";

const title = "SAP Modules | Functional & Technical Access — ServerFY";
const description =
  "Explore SAP functional and technical modules — FICO, MM, SD, PP, HCM, ABAP, Basis, HANA, Fiori and BTP — with platform availability and instant access.";

export const Route = createFileRoute("/modules")({
  component: ModulesPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  }),
});

function ModulesPage() {
  return (
    <PageShell
      eyebrow="SAP Modules"
      title="Every SAP module, on the platform you need"
      intro="Filter functional and technical modules by platform and availability, then get access on S/4HANA, ECC or HANA without waiting on procurement."
    >
      <ModuleExplorer />
      <FunctionalTechnical />
      <TrialBanner />
      <ExpertCTA />
    </PageShell>
  );
}
