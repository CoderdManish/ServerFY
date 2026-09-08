/** Maps every navbar mega-menu and footer label to the page it should open. */
export const linkFor: Record<string, string> = {
  // Servers
  "S/4HANA Servers": "/servers/sap-s4hana-server-access",
  "S/4HANA": "/servers/sap-s4hana-server-access",
  "ECC Servers": "/servers/sap-ecc-server-access",
  ECC: "/servers/sap-ecc-server-access",
  "SAP Servers": "/servers/sap-server-access",
  "SAP Server": "/servers/sap-server-access",
  HANA: "/servers/sap-server-access",
  "Dedicated Servers": "/servers/sap-dedicated-server-access",
  Dedicated: "/servers/sap-dedicated-server-access",
  "Shared Servers": "/servers/sap-shared-server-access",
  Shared: "/servers/sap-shared-server-access",

  // Modules
  Functional: "/modules",
  Technical: "/modules",
  "All Modules": "/modules",
  "Module Comparison": "/pricing",
  FICO: "/modules/sap-fico-server-access-for-practice",
  MM: "/modules/sap-mm-server-access-for-practice",
  SD: "/modules/sap-sd-server-access-for-practice",
  PP: "/modules/sap-pp-server-access-for-practice",
  HCM: "/modules/sap-hcm-server-access-for-practice",
  EWM: "/modules/sap-ewm-server-access-for-practice",
  ABAP: "/modules/sap-abap-server-access-for-practice",
  Basis: "/modules/sap-basis-server-access-for-practice",
  Fiori: "/modules/sap-fiori-server-access-for-practice",
  BTP: "/modules/sap-btp-server-access-for-practice",
  Security: "/modules/sap-security-server-access-for-practice",

  // Solutions
  "SAP Training": "/solutions/sap-server-for-training-institutes",
  Training: "/solutions/sap-server-for-training-institutes",
  "Corporate Learning": "/solutions/sap-server-for-training-institutes",
  "Consultant Practice": "/solutions/sap-server-for-consultants",
  "Trainer Labs": "/solutions/sap-server-for-trainers",
  "Project Teams": "/solutions/sap-server-for-project-teams",
  Development: "/solutions/sap-development-server",
  Testing: "/solutions/sap-testing-server",
  "Demo & POC": "/solutions/sap-demo-poc-server",
  Sandbox: "/solutions/sap-sandbox-server",

  // Resources
  Blog: "/resources/sap-server-blog",
  "Knowledge Base": "/resources/sap-server-knowledge-base",
  Guides: "/resources/sap-server-guides",
  FAQs: "/resources",
  "System Requirements": "/resources/sap-server-system-requirements",
  "Server Status": "/resources/sap-server-status",

  // Company & support
  About: "/about",
  "Why ServerFY": "/why-serverfy",
  Infrastructure: "/infrastructure",
  Careers: "/careers",
  Contact: "/contact",
  "Contact Support": "/contact",
  Terms: "/terms",
  Privacy: "/privacy",
  "Refund Policy": "/refund-policy",
  SLA: "/sla",
};
