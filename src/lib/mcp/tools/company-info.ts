import { defineTool } from "@lovable.dev/mcp-js";
import { serverCategories, site } from "@/data/serverfy";

export default defineTool({
  name: "get_company_info",
  title: "Get company info",
  description:
    "Return ServerFY's public contact details and the categories of SAP server environments offered.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      name: site.name,
      tagline: site.tagline,
      phone: site.phone,
      email: site.email,
      whatsapp: site.whatsapp,
      address: site.address,
      serverCategories: serverCategories.map(({ title, desc }) => ({ title, desc })),
      disclaimer:
        "ServerFY is an independent infrastructure provider and is not affiliated with or endorsed by SAP SE.",
    };
    return {
      content: [{ type: "text" as const, text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
