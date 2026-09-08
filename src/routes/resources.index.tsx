import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { IncludedBand } from "@/components/sections/IncludedBand";
import { FAQ } from "@/components/sections/FAQ";
import { DashboardPreview } from "@/components/sections/DashboardPreview";
import { ExpertCTA } from "@/components/sections/ExpertCTA";
import { faqs } from "@/data/serverfy";
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
  { title: "Connecting with SAP GUI", desc: "Install SAP GUI, add the connection entry and log in with your credentials." },
  { title: "System requirements", desc: "What your laptop and internet connection need for a smooth remote session." },
  { title: "Working with multiple users", desc: "Give a batch or project team their own logins on a shared landscape." },
  { title: "Backups and restore", desc: "How daily snapshots work and how to request a restore point." },
  { title: "Extending your access", desc: "Renew or upgrade an environment without losing your existing work." },
  { title: "Troubleshooting access", desc: "The quickest checks when a login, VPN or session refuses to connect." },
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
              <li key={g.title} className="neu-card rounded-2xl p-5">
                <h3 className="text-base font-bold text-foreground">{g.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.desc}</p>
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
