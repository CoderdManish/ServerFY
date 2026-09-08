import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { IncludedBand } from "@/components/sections/IncludedBand";
import { UseCases } from "@/components/sections/UseCases";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { ExpertCTA } from "@/components/sections/ExpertCTA";
import { buildHead, breadcrumbList } from "@/lib/seo";

const title = "Solutions | SAP Servers for Training, Dev & Testing — ServerFY";
const description =
  "SAP infrastructure shaped around how your team works: training institutes, consultants, trainer labs, project teams, development, testing, demos and sandboxes.";
const keywords =
  "SAP training server, SAP consultant practice, SAP trainer lab, SAP development server, SAP testing environment, SAP demo server";

export const Route = createFileRoute("/solutions/")({
  component: SolutionsPage,
  head: () =>
    buildHead({
      title,
      description,
      path: "/solutions",
      type: "website",
      keywords,
      jsonLd: [
        breadcrumbList([
          { name: "Home", item: "/" },
          { name: "Solutions", item: "/solutions" },
        ]),
      ],
    }),
});

function SolutionsPage() {
  return (
    <PageShell
      eyebrow="Solutions"
      title="Built around how your team works with SAP"
      intro="From a single consultant keeping skills sharp to a full training batch or project team, we shape the environment, access and duration around the work."
    >
      <UseCases />
      <HowItWorks />
      <Testimonials />
      <IncludedBand />
      <ExpertCTA />
    </PageShell>
  );
}
