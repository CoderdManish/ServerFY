import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { ContactStrip } from "@/components/sections/ContactStrip";
import { IncludedBand } from "@/components/sections/IncludedBand";
import { Metrics } from "@/components/sections/Metrics";
import { TrustBar } from "@/components/sections/TrustBar";
import { Testimonials } from "@/components/sections/Testimonials";
import { ExpertCTA } from "@/components/sections/ExpertCTA";

const title = "About ServerFY | Independent SAP Infrastructure Provider";
const description =
  "ServerFY runs monitored, backed-up SAP server environments for learners, trainers, consultants and project teams — with human support and no lock-in.";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

const values = [
  { title: "Uptime you can teach on", desc: "Environments are monitored around the clock so a class or sprint never stalls on infrastructure." },
  { title: "Honest, flat pricing", desc: "What you see on the pricing page is what you pay — no setup fees, no hidden add-ons." },
  { title: "Real people on support", desc: "You reach an SAP infrastructure engineer, not a ticket queue that answers next week." },
  { title: "Your data stays yours", desc: "Daily backups, isolated access and clean deletion when you finish with an environment." },
];

function AboutPage() {
  return (
    <PageShell
      eyebrow="About Us"
      title="Independent SAP infrastructure, run properly"
      intro="We keep SAP landscapes running so learners, trainers, consultants and project teams can spend their time inside SAP instead of fighting to get into it."
    >
      <TrustBar />
      <section className="section-y bg-soft-mesh">
        <div className="container-fy grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">What we stand for</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              ServerFY started because getting hands on a real SAP system was harder than learning SAP itself. We build and
              maintain ready environments so access takes hours, not weeks — and we keep them fast, backed up and reachable
              from anywhere.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              We are an independent infrastructure provider. SAP and its product names are trademarks of SAP SE; ServerFY is
              not affiliated with, endorsed by or a partner of SAP SE.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {values.map((v) => (
              <li key={v.title} className="neu-card rounded-2xl p-5">
                <h3 className="text-base font-bold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Metrics />
      <Testimonials />
      <ContactStrip />
      <IncludedBand />
      <ExpertCTA />
    </PageShell>
  );
}
