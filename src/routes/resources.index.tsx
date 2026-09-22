import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { IncludedBand } from "@/components/sections/IncludedBand";
import { FAQ } from "@/components/sections/FAQ";
import { DashboardPreview } from "@/components/sections/DashboardPreview";
import { ExpertCTA } from "@/components/sections/ExpertCTA";
import { faqs } from "@/data/serverfy";
import { compareLinks } from "@/data/site-index";
import { buildHead, breadcrumbList } from "@/lib/seo";

const title = "Resources | SAP Server Guides & FAQs — ServerFY";
const description =
  "Setup guides, system requirements, access walkthroughs and answers to the most common questions about running SAP server environments with ServerFY.";
const keywords =
  "SAP server guide, SAP GUI connection, SAP system requirements, SAP server FAQ, SAP access help, SAP server status";

export const Route = createFileRoute("/resources/")({
  component: ResourcesPage,
  head: () =>
    buildHead({
      title,
      description,
      path: "/resources",
      type: "website",
      keywords,
      jsonLd: [
        {
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
        breadcrumbList([
          { name: "Home", item: "/" },
          { name: "Resources", item: "/resources" },
        ]),
      ],
    }),
});

const guides = [
  { title: "What is an SAP practice server?", desc: "A plain-English explanation of what you get and who it suits.", to: "/resources/what-is-sap-practice-server" },
  { title: "How to access an SAP server", desc: "Step-by-step remote login, from credentials to your first screen.", to: "/resources/how-to-access-sap-server" },
  { title: "SAP GUI installation guide", desc: "Install SAP GUI, add the connection entry and log in.", to: "/resources/sap-gui-installation-guide" },
  { title: "SAP practice server cost", desc: "What a practice environment costs and what changes the price.", to: "/resources/sap-practice-server-cost" },
  { title: "SAP server for FICO practice", desc: "What an FICO learner needs from a practice environment.", to: "/resources/sap-server-for-fico" },
  { title: "SAP server for BASIS practice", desc: "Admin-level access explained for BASIS practice.", to: "/resources/sap-server-for-basis" },
  { title: "System requirements", desc: "What your laptop and internet connection need for a smooth session.", to: "/resources/sap-server-system-requirements" },
  { title: "SAP server guides", desc: "Setup, access and day-to-day walkthroughs in one place.", to: "/resources/sap-server-guides" },
  { title: "Knowledge base", desc: "Answers to the questions our team is asked most often.", to: "/resources/sap-server-knowledge-base" },
  { title: "Server status", desc: "Current availability of the shared SAP landscapes.", to: "/resources/sap-server-status" },
];

function ResourcesPage() {
  return (
    <PageShell
      eyebrow="Resources"
      title="Guides, requirements and answers"
      intro="Everything you need before and after activation — from the first login to renewing an environment months later."
    >
      <section className="section-y bg-soft-mesh">
        <div className="container-fy">
          <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">Setup guides</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Short, practical walkthroughs written by the team that runs the infrastructure.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((g) => (
              <li key={g.title} className="neu-card rail-card rounded-2xl p-5">
                <h3 className="text-base font-bold text-foreground">
                  <Link to={g.to} className="transition-colors hover:text-orange">
                    {g.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section-y-sm bg-soft-tint">
        <div className="container-fy">
          <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">Compare your options</h2>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {compareLinks.map((l) => (
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
      <DashboardPreview />
      <FAQ />
      <IncludedBand />
      <ExpertCTA />
    </PageShell>
  );
}
