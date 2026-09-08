/**
 * Single place that builds WhatsApp links for every buy / contact button.
 * Number comes from the site data so it stays in one source of truth.
 */
import { site } from "@/data/serverfy";

const number = site.whatsapp.replace(/\D/g, "");

export function waLink(message: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const waProps = { target: "_blank", rel: "noreferrer noopener" } as const;

export const waMessages = {
  general: "Hi ServerFY, I'd like to know more about your SAP server plans.",
  buy: "Hi ServerFY, I want to buy an SAP server. Please share the details.",
  trial: "Hi ServerFY, I'd like to start the free 24-hour SAP server trial.",
  expert: "Hi ServerFY, I need help choosing the right SAP server for my requirement.",
  demo: "Hi ServerFY, I'd like a free 24-hour SAP demo environment.",
  plan: (plan: string) => `Hi ServerFY, I'm interested in the ${plan} SAP server plan. Please share the next steps.`,
  question: "Hi ServerFY, I have a question about your SAP servers.",
};
