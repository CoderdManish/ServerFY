/**
 * Lightweight link index used by the footer so every SAP page is reachable
 * from any page (no orphan pages, and every page has several internal links).
 * Kept as plain strings so it adds no weight to the page bundle.
 */
export const serverLinks: { label: string; to: string }[] = [
  { label: "SAP S/4HANA server access", to: "/servers/sap-s4-hana-server-access" },
  { label: "SAP ECC server access", to: "/servers/sap-ecc-server-access" },
  { label: "SAP server access", to: "/servers/sap-server-access" },
  { label: "SAP dedicated server access", to: "/servers/sap-dedicated-server-access" },
  { label: "SAP shared server access", to: "/servers/sap-shared-server-access" },
  { label: "SAP practice servers", to: "/servers/sap-practice-servers" },
  { label: "SAP training servers", to: "/servers/sap-training-servers" },
];

export const compareLinks: { label: string; to: string }[] = [
  { label: "Cloud vs practice server", to: "/compare/sap-cloud-server-vs-sap-practice-server" },
  { label: "Dedicated vs shared", to: "/compare/dedicated-sap-server-vs-shared-sap-environment" },
  { label: "ECC vs S/4HANA", to: "/compare/sap-ecc-vs-sap-s4hana-practice-environment" },
  { label: "Server vs local install", to: "/compare/sap-server-vs-local-installation" },
  { label: "8 GB vs 16 GB vs 32 GB", to: "/compare/8gb-vs-16gb-vs-32gb-sap-server" },
];

export const guideLinks: { label: string; to: string }[] = [
  { label: "What is an SAP practice server?", to: "/resources/what-is-sap-practice-server" },
  { label: "How to access an SAP server", to: "/resources/how-to-access-sap-server" },
  { label: "SAP GUI installation guide", to: "/resources/sap-gui-installation-guide" },
  { label: "SAP practice server cost", to: "/resources/sap-practice-server-cost" },
  { label: "SAP server for FICO practice", to: "/resources/sap-server-for-fico" },
  { label: "SAP server for BASIS practice", to: "/resources/sap-server-for-basis" },
  { label: "SAP server knowledge base", to: "/resources/sap-server-knowledge-base" },
  { label: "SAP server system requirements", to: "/resources/sap-server-system-requirements" },
  { label: "SAP server guides", to: "/resources/sap-server-guides" },
  { label: "SAP server status", to: "/resources/sap-server-status" },
];

export const solutionLinks: { label: string; to: string }[] = [
  { label: "SAP server for students", to: "/solutions/sap-server-for-students" },
  { label: "SAP server for working professionals", to: "/solutions/sap-server-for-working-professionals" },
  { label: "SAP server for consultants", to: "/solutions/sap-server-for-consultants" },
  { label: "SAP server for trainers", to: "/solutions/sap-server-for-trainers" },
  { label: "SAP server for training institutes", to: "/solutions/sap-server-for-training-institutes" },
  { label: "SAP server for project teams", to: "/solutions/sap-server-for-project-teams" },
  { label: "SAP development server", to: "/solutions/sap-development-server" },
  { label: "SAP testing server", to: "/solutions/sap-testing-server" },
  { label: "SAP demo & POC server", to: "/solutions/sap-demo-poc-server" },
  { label: "SAP sandbox server", to: "/solutions/sap-sandbox-server" },
];
