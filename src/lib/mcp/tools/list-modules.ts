import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { modules } from "@/data/serverfy";

export default defineTool({
  name: "list_sap_modules",
  title: "List SAP modules",
  description:
    "List the SAP functional and technical modules ServerFY offers, with platforms and current availability. Optionally filter by type, platform or a search term.",
  inputSchema: {
    type: z.enum(["functional", "technical"]).optional().describe("Filter by module type."),
    platform: z
      .enum(["S/4HANA", "ECC", "HANA"])
      .optional()
      .describe("Only modules available on this platform."),
    search: z.string().trim().optional().describe("Match module code, name or description."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ type, platform, search }) => {
    const q = search?.toLowerCase();
    const results = modules.filter((m) => {
      if (type && m.type !== type) return false;
      if (platform && !m.platforms.includes(platform)) return false;
      if (q && !`${m.code} ${m.name} ${m.desc}`.toLowerCase().includes(q)) return false;
      return true;
    });

    return {
      content: [{ type: "text" as const, text: JSON.stringify(results, null, 2) }],
      structuredContent: { count: results.length, modules: results },
    };
  },
});
