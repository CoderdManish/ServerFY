import { defineMcp } from "@lovable.dev/mcp-js";
import listPlansTool from "./tools/list-plans";
import listModulesTool from "./tools/list-modules";
import listFaqsTool from "./tools/list-faqs";
import companyInfoTool from "./tools/company-info";

export default defineMcp({
  name: "vibrant-ui-forge",
  title: "Vibrant UI Forge",
  version: "0.1.0",
  instructions:
    "Public tools for ServerFY, a provider of SAP S/4HANA, ECC and HANA server environments. Use `list_plans` for plans and pricing, `list_sap_modules` for available SAP modules, `list_faqs` for common questions, and `get_company_info` for contact details.",
  tools: [listPlansTool, listModulesTool, listFaqsTool, companyInfoTool],
});
