import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhatIsServerfy } from "@/components/sections/WhatIsServerfy";
import { ServerCategories } from "@/components/sections/ServerCategories";
import { WhatCanYouDo } from "@/components/sections/WhatCanYouDo";
import { Pricing } from "@/components/sections/Pricing";
import { TrialBanner } from "@/components/sections/TrialBanner";
import { FunctionalTechnical } from "@/components/sections/FunctionalTechnical";
import { Metrics } from "@/components/sections/Metrics";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { UseCases } from "@/components/sections/UseCases";
import { Testimonials } from "@/components/sections/Testimonials";
import { ExpertCTA } from "@/components/sections/ExpertCTA";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { FloatingActions } from "@/components/sections/FloatingActions";
import { faqs, site } from "@/data/serverfy";
import { buildHead, breadcrumbList, organizationSchema, websiteSchema } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import rackDesktop from "@/assets/server-rack-hero-desktop.webp";
import rackMobile from "@/assets/server-rack-hero-mobile.webp";

const title = "ServerFY | Reliable SAP Servers for Practice, Training & Development";
const description =
  "Rent ready-to-use SAP S/4HANA, ECC and HANA server environments for functional and technical modules. Ideal for learners, trainers, consultants and project teams.";
const keywords =
  "sap server access, sap practice server, sap practice server india, sap server access india, sap online server access, sap remote server access, sap server for learning, sap server for practice, sap s4hana server access, sap ecc server access, sap training server, sap server providers in india, sap practice server providers in india, best sap practice server, best sap server access provider";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => {
    const head = buildHead({
      title,
      description,
      path: "/",
      type: "website",
      keywords,
      jsonLd: [
        organizationSchema(),
        websiteSchema(),
        {
          "@type": "WebPage",
          "@id": `${SITE_URL}/#webpage`,
          url: `${SITE_URL}/`,
          name: title,
          description,
          isPartOf: { "@id": `${SITE_URL}/#website` },
          about: { "@id": `${SITE_URL}/#organization` },
        },
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
        ]),
      ],
    });

    return {
      ...head,
      links: [
        ...head.links,
        // Only the desktop rack is above the fold; on mobile it sits below the
        // first screen, so preloading it would compete with first paint.
        { rel: "preload", as: "image", href: rackDesktop, type: "image/webp", media: "(min-width: 768px)" },
      ],
    };
  },
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
        <WhatIsServerfy />
        <TrustBar />
        <ServerCategories />
        <WhatCanYouDo />
        <FunctionalTechnical />
        <HowItWorks />
        <Pricing />
        <TrialBanner />
        <Metrics />
        <UseCases />
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
