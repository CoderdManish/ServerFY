import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { IncludedBand } from "@/components/sections/IncludedBand";
import { ServerCategories } from "@/components/sections/ServerCategories";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Comparison } from "@/components/sections/Comparison";
import { DashboardPreview } from "@/components/sections/DashboardPreview";
import { TrialBanner } from "@/components/sections/TrialBanner";
import { ExpertCTA } from "@/components/sections/ExpertCTA";
import { buildHead, breadcrumbList } from "@/lib/seo";
import { serverLinks } from "@/data/site-index";

const title = "SAP Servers | S/4HANA, ECC & HANA Environments — ServerFY";
const description =
  "Dedicated and shared SAP server environments — S/4HANA, ECC 6.0 and HANA — activated fast for practice, training, development, testing and demos.";
const keywords =
  "SAP server, SAP S/4HANA server, SAP ECC 6.0, SAP HANA, dedicated SAP server, shared SAP server, SAP practice server";

export const Route = createFileRoute("/servers/")({
  component: ServersPage,
  head: () =>
    buildHead({
      title,
      description,
      path: "/servers",
      type: "website",
      keywords,
      jsonLd: [
        breadcrumbList([
          { name: "Home", item: "/" },
          { name: "SAP Servers", item: "/servers" },
        ]),
      ],
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
      <section className="section-y-sm bg-soft-tint">
        <div className="container-fy">
          <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">All SAP server environments</h2>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {serverLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="neu-pill inline-flex items-center rounded-full px-4 py-2 text-sm font-bold text-blue transition-colors hover:text-orange"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <HowItWorks />
      <DashboardPreview />
      <Comparison />
      <TrialBanner />
      <IncludedBand />
      <ExpertCTA />
    </PageShell>
  );
}
