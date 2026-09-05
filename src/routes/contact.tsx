import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";

const title = "Contact ServerFY | Get Your SAP Server Access";
const description =
  "Tell us the SAP module, version and number of users you need. We reply with availability, pricing and access details — usually the same working day.";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Tell us what you need access to"
      intro="Share your module, SAP version, user count and how long you need the environment. We come back with availability and pricing."
    >
      <Contact />
      <FAQ />
    </PageShell>
  );
}
