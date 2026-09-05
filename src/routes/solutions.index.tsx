import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { UseCases } from "@/components/sections/UseCases";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { ExpertCTA } from "@/components/sections/ExpertCTA";

const title = "Solutions | SAP Servers for Training, Dev & Testing — ServerFY";
const description =
  "SAP infrastructure shaped around how your team works: training institutes, consultants, trainer labs, project teams, development, testing, demos and sandboxes.";

export const Route = createFileRoute("/solutions/")({
  component: SolutionsPage,
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
      <ExpertCTA />
    </PageShell>
  );
}
