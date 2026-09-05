import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServerCategories } from "@/components/sections/ServerCategories";
import { ModuleExplorer } from "@/components/sections/ModuleExplorer";
import { Pricing } from "@/components/sections/Pricing";
import { TrialBanner } from "@/components/sections/TrialBanner";
import { FunctionalTechnical } from "@/components/sections/FunctionalTechnical";
import { Metrics } from "@/components/sections/Metrics";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { UseCases } from "@/components/sections/UseCases";
import { Comparison } from "@/components/sections/Comparison";
import { DashboardPreview } from "@/components/sections/DashboardPreview";
import { Testimonials } from "@/components/sections/Testimonials";
import { ExpertCTA } from "@/components/sections/ExpertCTA";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { FloatingActions } from "@/components/sections/FloatingActions";
import { faqs } from "@/data/serverfy";

const title = "ServerFY | Reliable SAP Servers for Functional & Technical SAP";
const description =
  "Get reliable SAP S/4HANA, ECC, HANA, Functional and Technical SAP server environments for training, practice, development and testing.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: "ServerFY",
              description:
                "Independent provider of SAP server environments for practice, training, development and testing.",
              url: "/",
            },
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen">
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-orange focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <ServerCategories />
        <ModuleExplorer />
        <FunctionalTechnical />
        <HowItWorks />
        <Pricing />
        <TrialBanner />
        <Metrics />
        <UseCases />
        <DashboardPreview />
        <Comparison />
        <Testimonials />
        <FAQ />
        <ExpertCTA />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
