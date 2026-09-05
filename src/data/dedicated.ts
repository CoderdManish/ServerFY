/**
 * Content for the SAP S/4HANA Dedicated Server page.
 * Mirrors the structure and information of an enterprise dedicated-server offering:
 * hero stats, use cases, differentiators, what's included, dedicated vs shared and
 * the service offering models.
 */

export const dedicatedStats = [
  { value: "99.9%", label: "Uptime SLA", icon: "Zap" },
  { value: "24/7", label: "Support", icon: "ShieldCheck" },
  { value: "100+", label: "Customers", icon: "Server" },
];

export const dedicatedTrust = ["Enterprise grade security", "ISO certified practices", "GDPR compliant"];

export const dedicatedUseCases = [
  { title: "Enterprise grade S/4HANA sandbox", icon: "Cloud" },
  { title: "Namespace development", icon: "Code2" },
  { title: "Product / add-on development", icon: "Boxes" },
  { title: "Corporate trainings", icon: "GraduationCap" },
  { title: "Customer demos", icon: "Presentation" },
  { title: "ECC to S/4HANA migration practice", icon: "Repeat" },
  { title: "Integrate with BTP based solutions", icon: "Network" },
  { title: "Integrate with external applications", icon: "Cable" },
];

export const dedicatedTags = [
  "Trainings",
  "Migrations",
  "Integration & development",
  "Localization & rollout",
  "Demo & proof of concept",
];

export const dedicatedIntro = [
  "ServerFY dedicated hosting is built for organisations that need a private, secure environment for their SAP S/4HANA system. It suits corporate training, proof of concept, practice landscapes, customer demos, ECC to S/4HANA migration rehearsals, product development and integration with third-party applications such as tax portals, BTP cloud services and analytics tools.",
  "With dedicated SAP server access your team can run hands-on learning, test real-world scenarios and validate migration activities end to end — proving processes before anything touches production.",
  "A dedicated server gives you clear advantages over shared hosting when you have medium to high performance requirements and strict security standards. The full comparison between our dedicated and shared servers is below.",
];

export const dedicatedWhy = [
  {
    title: "Exclusive access",
    desc: "The entire server infrastructure is leased solely to your organisation, giving unmatched privacy and security.",
    icon: "Lock",
  },
  {
    title: "Top-notch security",
    desc: "Superior data protection in a private environment that reduces the risk of breaches and unauthorised access.",
    icon: "ShieldCheck",
  },
  {
    title: "Custom configuration",
    desc: "Full control over server settings, so custom solutions such as embedded EWM and TM integrate cleanly.",
    icon: "Settings2",
  },
  {
    title: "Peak performance",
    desc: "Dedicated resources deliver faster, more reliable operations with no noisy neighbours.",
    icon: "Gauge",
  },
  {
    title: "Scalable solutions",
    desc: "Scale resources as your organisation grows, so the SAP environment expands with evolving demand.",
    icon: "LineChart",
  },
  {
    title: "Expert support",
    desc: "Premium support with a dedicated team on hand, so expert help is there when it matters most.",
    icon: "Headset",
  },
];

export const dedicatedPillars = [
  {
    title: "SAP best practices",
    desc: "Pre-configured SAP S/4HANA system with SAP Best Practices and demo scenarios, enabling faster onboarding, training, testing and implementation.",
    icon: "BadgeCheck",
  },
  {
    title: "SAP development",
    desc: "Comprehensive ABAP development with RAP, Fiori, CDS views, OData services and SAP NetWeaver 7.50 JAVA (J2EE) integration support.",
    icon: "Code2",
  },
  {
    title: "Latest SAP versions",
    desc: "Access SAP S/4HANA 2025 and 2023 systems on SAP HANA with SSL-enabled security for secure development, testing and training.",
    icon: "Rocket",
  },
];

export const dedicatedIncluded = [
  {
    title: "Pre-configured SAP best practices",
    desc: "An S/4HANA system featuring pre-configured SAP Best Practices and demo scenarios for streamlined implementation.",
    icon: "LayoutGrid",
  },
  {
    title: "ABAP development support",
    desc: "Robust support for ABAP development including RAP, Fiori and UI5, complemented by CDS views and OData services.",
    icon: "Terminal",
  },
  {
    title: "Latest SAP S/4HANA version",
    desc: "SAP S/4HANA 2023/2025 on the SAP HANA database, with SSL and SHA-256 for enhanced data protection.",
    icon: "Database",
  },
  {
    title: "NetWeaver integration with JAVA (J2EE)",
    desc: "Integrated with SAP NetWeaver 7.50 JAVA, featuring Adobe Document Services (ADS) for forms and output management.",
    icon: "Workflow",
  },
];

export const dedicatedComparison: { feature: string; dedicated: string; shared: string }[] = [
  {
    feature: "Access",
    dedicated: "Full access is granted to all system modules.",
    shared: "Access is restricted to the subscribed module(s) only.",
  },
  {
    feature: "Module access",
    dedicated: "All system modules are available without any restriction.",
    shared: "Module access depends on your subscription, with additional modules available separately.",
  },
  {
    feature: "Data visibility",
    dedicated: "Data remains secure, with no visibility to others, ensuring control.",
    shared: "Data accessed or created is visible to all, with no control over edits or deletions.",
  },
  {
    feature: "System stability",
    dedicated: "Stable environment, unaffected by other users, reducing the risk of disruption.",
    shared: "Any user disruption can affect the entire system, potentially needing data restoration.",
  },
  { feature: "SSL support", dedicated: "Full SSL support is available.", shared: "SSL support is unavailable." },
  {
    feature: "Concurrency issues",
    dedicated: "No concurrency issues arise due to exclusive usage.",
    shared: "User lock issues may occur if multiple users access the same application.",
  },
  { feature: "Number ranges configuration", dedicated: "Enabled.", shared: "Not enabled." },
  {
    feature: "Bandwidth",
    dedicated: "Dedicated bandwidth ensures consistent performance.",
    shared: "Bandwidth is shared among all users.",
  },
  {
    feature: "Suitability",
    dedicated: "Ideal for 10 to 500 users — corporate apps, demos, POCs and training.",
    shared: "Best suited for individual practice or small-scale projects.",
  },
  {
    feature: "Customised domain",
    dedicated: "A customised domain name is provided, such as yourcompany.serverfy.com.",
    shared: "Not available.",
  },
  {
    feature: "Support response time",
    dedicated: "Tickets acknowledged in 6-8 hours, with a 12 to 24-hour SLA based on the plan.",
    shared: "Tickets acknowledged in 18 to 24 hours, with a 48 to 72-hour SLA for failures.",
  },
  {
    feature: "Subscription model",
    dedicated: "Monthly charges, one-time installation fee, 3-month minimum commitment. Data refresh on request, renews monthly.",
    shared: "Charged quarterly, semi-annually or annually. Additional modules are extra.",
  },
  {
    feature: "Data integrity",
    dedicated: "Data is secure and maintained as long as the subscription renews every month.",
    shared: "Not guaranteed on shared servers. If issues arise, the previous week's backup is restored.",
  },
];

export const dedicatedModels = [
  {
    title: "S/4HANA private cloud & ECC",
    icon: "Server",
    items: ["Shared SAP server", "Dedicated SAP server", "Dedicated SAP client"],
  },
  {
    title: "S/4HANA public cloud",
    icon: "Cloud",
    items: ["Shared tenant", "Dedicated tenant"],
  },
  {
    title: "SAP BTP",
    icon: "Database",
    items: ["Shared tenant access", "Dedicated tenant access", "Sub-account access services and solutions"],
  },
];
