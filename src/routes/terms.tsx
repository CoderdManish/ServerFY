import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { LegalBody } from "@/components/LegalBody";

const title = "Terms of Service | ServerFY";
const description =
  "The terms that apply when you use a ServerFY SAP server environment: access, acceptable use, billing, renewals and cancellation.";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/terms" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
});

const sections = [
  {
    heading: "Using your environment",
    body: "Access is granted to the person or organisation named on the order for the agreed period and user count. Credentials must not be resold or shared outside that group.",
  },
  {
    heading: "Acceptable use",
    body: "Environments are for learning, training, development, testing and demonstration. Running production business data, mining, or any unlawful activity is not permitted.",
  },
  {
    heading: "Billing and renewals",
    body: "Plans are billed in advance for the chosen cycle. Renewals are confirmed with you before they are charged, and you can stop at the end of any cycle.",
  },
  {
    heading: "Availability",
    body: "We monitor infrastructure continuously and aim for uninterrupted access. Planned maintenance is announced in advance wherever possible.",
  },
  {
    heading: "Data and deletion",
    body: "Daily backups are retained during your subscription. When an environment ends, its data is deleted after a short grace period on request.",
  },
  {
    heading: "Trademarks",
    body: "SAP and its product names are trademarks of SAP SE. ServerFY is an independent infrastructure provider and is not affiliated with, endorsed by or a partner of SAP SE.",
  },
];

function TermsPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Terms of Service"
      intro="Plain-language terms covering access, acceptable use, billing and what happens to your data."
    >
      <LegalBody sections={sections} />
    </PageShell>
  );
}
