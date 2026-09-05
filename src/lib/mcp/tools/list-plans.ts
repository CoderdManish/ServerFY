import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { billingCycles, plans, type BillingCycleId } from "@/data/serverfy";

export default defineTool({
  name: "list_plans",
  title: "List server plans",
  description:
    "List ServerFY SAP server plans with specs, features and pricing in INR for a chosen billing cycle.",
  inputSchema: {
    billingCycle: z
      .enum(["monthly", "quarterly", "yearly"])
      .default("monthly")
      .describe("Billing cycle used to compute the discounted price."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ billingCycle }) => {
    const cycleId = (billingCycle ?? "monthly") as BillingCycleId;
    const cycle = billingCycles.find((c) => c.id === cycleId)!;
    const rows = plans.map((p) => ({
      id: p.id,
      name: p.name,
      audience: p.audience,
      currency: "INR",
      pricePerMonth: p.monthly === null ? null : Math.round(p.monthly * cycle.multiplier),
      totalForCycle:
        p.monthly === null ? null : Math.round(p.monthly * cycle.multiplier * cycle.months),
      customPricing: p.monthly === null,
      features: p.features,
      cta: p.cta,
      recommended: Boolean(p.highlight),
    }));

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({ billingCycle: cycle.id, note: cycle.note, plans: rows }, null, 2),
        },
      ],
      structuredContent: { billingCycle: cycle.id, plans: rows },
    };
  },
});
