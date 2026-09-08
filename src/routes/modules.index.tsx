import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { IncludedBand } from "@/components/sections/IncludedBand";
import { ModuleExplorer } from "@/components/sections/ModuleExplorer";
import { FunctionalTechnical } from "@/components/sections/FunctionalTechnical";
import { TrialBanner } from "@/components/sections/TrialBanner";
import { ExpertCTA } from "@/components/sections/ExpertCTA";
import { buildHead, breadcrumbList } from "@/lib/seo";

const title = "SAP Modules | Functional & Technical Access — ServerFY";
const description =
  "Explore SAP functional and technical modules — FICO, MM, SD, PP, HCM, ABAP, Basis, HANA, Fiori and BTP — with platform availability and instant access.";
const keywords =
  "SAP modules, SAP FICO, SAP MM, SAP SD, SAP PP, SAP ABAP, SAP Basis, SAP HANA, SAP Fiori, SAP BTP, SAP WM, SAP EWM";

export const Route = createFileRoute("/modules/")({
  component: ModulesPage,
  head: () =>
    buildHead({
      title,
      description,
      path: "/modules",
      type: "website",
      keywords,
      jsonLd: [
        breadcrumbList([
          { name: "Home", item: "/" },
          { name: "SAP Modules", item: "/modules" },
        ]),
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
      <IncludedBand />
      <ExpertCTA />
    </PageShell>
  );
}
