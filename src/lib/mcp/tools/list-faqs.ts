import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { faqs } from "@/data/serverfy";

export default defineTool({
  name: "list_faqs",
  title: "List FAQs",
  description: "Return ServerFY's published frequently asked questions and answers.",
  inputSchema: {
    search: z.string().trim().optional().describe("Only FAQs matching this text."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ search }) => {
    const q = search?.toLowerCase();
    const results = q ? faqs.filter((f) => `${f.q} ${f.a}`.toLowerCase().includes(q)) : faqs;
    return {
      content: [{ type: "text" as const, text: JSON.stringify(results, null, 2) }],
      structuredContent: { count: results.length, faqs: results },
    };
  },
});
