import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { LegalBody } from "@/components/LegalBody";

const title = "Privacy Policy | ServerFY";
const description =
  "What ServerFY collects when you request an SAP server, how that information is used, how long it is kept and how to have it removed.";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  }),
});

const sections = [
  {
    heading: "What we collect",
    body: "Only what you send us: your name, email, phone or WhatsApp number, the SAP module, version, user count and duration you need, plus anything you write in the requirement box.",
  },
  {
    heading: "Why we collect it",
    body: "To reply with availability and pricing, to set up your environment, and to contact you about renewals or maintenance affecting your access.",
  },
  {
    heading: "Sharing",
    body: "We do not sell or rent your details. Information is shared only with the infrastructure and communication providers needed to deliver your environment.",
  },
  {
    heading: "Retention",
    body: "Enquiries are kept while they are active and for a reasonable period afterwards for accounting and support history. You can ask us to delete them sooner.",
  },
  {
    heading: "Your choices",
    body: "Write to us at any time to see, correct or delete the information we hold about you, or to stop receiving messages from us.",
  },
  {
    heading: "Contact",
    body: "Questions about this policy can be sent to our team through the contact page or by email, and we will respond within a few working days.",
  },
];

function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy Policy"
      intro="What we collect when you enquire, why we need it, and how to have it removed."
    >
      <LegalBody sections={sections} />
    </PageShell>
  );
}
