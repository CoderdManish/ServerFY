import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { ServerCategories } from "@/components/sections/ServerCategories";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Comparison } from "@/components/sections/Comparison";
import { DashboardPreview } from "@/components/sections/DashboardPreview";
import { TrialBanner } from "@/components/sections/TrialBanner";
import { ExpertCTA } from "@/components/sections/ExpertCTA";

const title = "SAP Servers | S/4HANA, ECC & HANA Environments — ServerFY";
const description =
  "Dedicated and shared SAP server environments — S/4HANA, ECC 6.0 and HANA — activated fast for practice, training, development, testing and demos.";

export const Route = createFileRoute("/servers/")({
  component: ServersPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/servers" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "/servers" }],
  }),
});

function ServersPage() {
  return (
    <PageShell
      eyebrow="SAP Servers"
      title="SAP server environments, ready when you are"
      intro="Choose the SAP landscape that fits your work — S/4HANA, ECC or HANA, dedicated or shared — with remote access, daily backups and monitored uptime."
    >
      <ServerCategories />
      <HowItWorks />
      <DashboardPreview />
      <Comparison />
      <TrialBanner />
      <ExpertCTA />
    </PageShell>
  );
}
