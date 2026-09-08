import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { ContactStrip } from "@/components/sections/ContactStrip";
import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";
import { buildHead, breadcrumbList, organizationSchema } from "@/lib/seo";

const title = "Contact ServerFY | Get Your SAP Server Access";
const description =
  "Tell us the SAP module, version and number of users you need. We reply with availability, pricing and access details — usually the same working day.";
const keywords =
  "contact ServerFY, SAP server enquiry, SAP access request, SAP server quote, SAP training contact";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () =>
    buildHead({
      title,
      description,
      path: "/contact",
      type: "website",
      keywords,
      jsonLd: [
        organizationSchema(),
        {
          "@type": "ContactPage",
          "@id": "/contact#contactpage",
          url: "/contact",
          name: title,
          description,
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "sales",
            availableLanguage: ["en"],
          },
        },
        breadcrumbList([
          { name: "Home", item: "/" },
          { name: "Contact", item: "/contact" },
        ]),
      ],
    }),
});

function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Tell us what you need access to"
      intro="Share your module, SAP version, user count and how long you need the environment. We come back with availability and pricing."
    >
      <ContactStrip />
      <Contact />
      <FAQ />
    </PageShell>
  );
}
