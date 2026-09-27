/**
 * Single place that builds WhatsApp links for every buy / contact button.
 * Number comes from the site data so it stays in one source of truth.
 */
import { site } from "@/data/serverfy";

const number = site.whatsapp.replace(/\D/g, "");

export function waLink(message: string) {
  return `https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(message)}`;
}

export const waProps = { target: "_blank", rel: "noreferrer noopener" } as const;

export const waMessages = {
  general: "Hi ServerFY, I'd like to know more about your SAP server plans.",
  buy: "Hi ServerFY, I want to buy an SAP server. Please share the details.",
  trial: "Hi ServerFY, I'd like to start the free 24-hour SAP server trial.",
  expert: "Hi ServerFY, I need help choosing the right SAP server for my requirement.",
  demo: "Hi ServerFY, I'd like a free 24-hour SAP demo environment.",
  plan: (plan: string) => `Hi ServerFY, I'm interested in the ${plan} SAP server plan. Please share the next steps.`,
  module: (code: string) =>
    `Hi ServerFY, I need an SAP ${code} practice server. I'd like to know the available S/4HANA/ECC environments and pricing.`,
  student: "Hi ServerFY, I'm looking for an SAP practice server for learning. Please recommend a suitable plan.",
  institute: "Hi ServerFY, I need SAP environments for a training batch. Please share batch pricing and available configurations.",
  consultant: "Hi ServerFY, I'm an SAP consultant and need a practice environment to test configurations. Please share options.",
  question: "Hi ServerFY, I have a question about your SAP servers.",
  pricing: "Hi ServerFY, I'm looking for SAP server pricing. Please share the plans and prices.",
  page: (title: string) =>
    `Hi ServerFY, I'm interested in "${title}". Please share availability, pricing and the next steps.`,
  dedicated:
    "Hi ServerFY, I need a dedicated SAP server for my team/institute. Please help me plan the configuration and pricing.",
  comparison: (title: string) =>
    `Hi ServerFY, I was reading "${title}" and I'm not sure which option fits me. Can you help me choose?`,
};
