/**
 * Old, short URLs kept alive so existing links and search results still land
 * on the right page. Each old slug points at its new keyword-rich slug.
 */
export const legacyServerSlugs: Record<string, string> = {
  s4hana: "sap-s4hana-server-access",
  ecc: "sap-ecc-server-access",
  hana: "sap-hana-server-access",
  dedicated: "sap-dedicated-server-access",
  shared: "sap-shared-server-access",
};

export const legacySolutionSlugs: Record<string, string> = {
  "sap-training": "sap-server-for-training-institutes",
  "consultant-practice": "sap-server-for-consultants",
  "trainer-labs": "sap-server-for-trainers",
  "project-teams": "sap-server-for-project-teams",
  development: "sap-development-server",
  testing: "sap-testing-server",
  "demo-poc": "sap-demo-poc-server",
  sandbox: "sap-sandbox-server",
};

export const legacyResourceSlugs: Record<string, string> = {
  "knowledge-base": "sap-server-knowledge-base",
  guides: "sap-server-guides",
  "system-requirements": "sap-server-system-requirements",
  blog: "sap-server-blog",
  "server-status": "sap-server-status",
};
