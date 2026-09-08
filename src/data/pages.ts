/**
 * Content for every sub-page linked from the navbar mega menus and the footer.
 * Each entry drives a detail page rendered by <DetailPageView />.
 */

export type Highlight = { title: string; desc: string; icon: string };
export type Spec = { label: string; value: string };

export type DetailPage = {
  slug: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  intro: string;
  description: string;
  keywords?: string;
  highlights: Highlight[];
  specs: Spec[];
  checklist: { title: string; items: string[] };
  faq: { q: string; a: string }[];
};

const commonAccessSpecs: Spec[] = [
  { label: "Access method", value: "SAP GUI / Fiori launchpad over secure remote login" },
  { label: "Availability", value: "24×7 with monitored uptime" },
  { label: "Backups", value: "Daily snapshots, restore on request" },
  { label: "Activation", value: "Usually within a few working hours" },
];

const commonFaq = [
  {
    q: "How soon can I start working?",
    a: "Most environments are handed over the same working day. Larger dedicated landscapes or big training batches can take a little longer, and we confirm the timeline before you pay.",
  },
  {
    q: "Can I extend or upgrade later?",
    a: "Yes. You can extend the duration, add users or move to a larger environment at any time, and your existing work carries over.",
  },
  {
    q: "Is this suitable for production use?",
    a: "No. These are learning, training, development, testing and demo environments — they are not intended for running live business data.",
  },
];

/* ---------------------------------- Servers --------------------------------- */

export const serverPages: DetailPage[] = [
  {
    slug: "sap-s4hana-server-access",
    eyebrow: "SAP Servers",
    title: "SAP S/4HANA server access",
    metaTitle: "SAP S/4HANA Server Access | Practice & Development — ServerFY",
    intro:
      "A fully activated S/4HANA landscape with Fiori launchpad, core functional modules and sample data, ready for practice, configuration and development.",
    description:
      "Rent a fully configured SAP S/4HANA environment with Fiori, core modules and sample data for learning, configuration, ABAP development and testing.",
    highlights: [
      { title: "Fully activated appliance", desc: "Core functional and technical scope switched on, so you can configure from day one.", icon: "Server" },
      { title: "Fiori launchpad included", desc: "Catalogs, groups and standard apps configured for realistic S/4HANA screens.", icon: "LayoutGrid" },
      { title: "Sample business data", desc: "Master data and documents already loaded so end-to-end cycles actually run.", icon: "Database" },
      { title: "Developer access", desc: "ABAP Workbench, CDS views and developer keys available on request.", icon: "Code2" },
    ],
    specs: [
      { label: "Platform", value: "SAP S/4HANA on HANA database" },
      { label: "Modules", value: "FICO, MM, SD, PP, EWM, TM, plus ABAP, Basis, Fiori" },
      ...commonAccessSpecs,
    ],
    checklist: {
      title: "Good fit for",
      items: [
        "Consultants moving from ECC to S/4HANA",
        "Configuration practice on live cycles",
        "Fiori and UI5 app development",
        "Client demos and proof of concept builds",
        "Corporate upskilling batches",
      ],
    },
    faq: commonFaq,
  },
  {
    slug: "sap-ecc-server-access",
    eyebrow: "SAP Servers",
    title: "SAP ECC 6.0 server access",
    metaTitle: "SAP ECC 6.0 Server Access | IDES Practice Systems — ServerFY",
    intro:
      "Classic ECC 6.0 landscapes with the full functional footprint and IDES-style sample data — still the fastest way to learn core SAP processes.",
    description:
      "Rent an SAP ECC 6.0 environment with all core functional modules and sample data for hands-on practice, training batches and ABAP development.",
    highlights: [
      { title: "Complete core scope", desc: "FICO, MM, SD, PP, PM, QM, HCM and WM configured and ready to use.", icon: "Boxes" },
      { title: "Sample company data", desc: "Plants, org structures and master data so scenarios run end to end.", icon: "Factory" },
      { title: "ABAP Workbench", desc: "Full development access for reports, enhancements and forms.", icon: "Code2" },
      { title: "Budget friendly", desc: "The lowest-cost way to build genuine hands-on SAP experience.", icon: "Wallet" },
    ],
    specs: [
      { label: "Platform", value: "SAP ECC 6.0 EhP8" },
      { label: "Modules", value: "All core functional modules plus ABAP and Basis" },
      ...commonAccessSpecs,
    ],
    checklist: {
      title: "Good fit for",
      items: [
        "Students building first hands-on experience",
        "Institutes running module-wise batches",
        "Certification preparation",
        "ABAP practice on classic screens",
        "Support consultants keeping skills sharp",
      ],
    },
    faq: commonFaq,
  },
  {
    slug: "sap-server-access",
    eyebrow: "SAP Servers",
    title: "SAP HANA database access",
    metaTitle: "SAP HANA Server Access | Modelling & SQLScript — ServerFY",
    intro:
      "In-memory HANA access for modelling, calculation views, SQLScript and administration practice, with HANA Studio or Web IDE connectivity.",
    description:
      "Rent SAP HANA database access for calculation views, SQLScript, modelling and administration practice with secure remote connectivity.",
    highlights: [
      { title: "Full modelling scope", desc: "Attribute, analytic and calculation views with your own schema.", icon: "Database" },
      { title: "SQLScript workspace", desc: "Procedures, functions and performance tuning on real data volumes.", icon: "Terminal" },
      { title: "Admin practice", desc: "Users, roles, privileges and monitoring through HANA Cockpit.", icon: "Settings2" },
      { title: "Tooling ready", desc: "Connect with HANA Studio, Web IDE or your preferred SQL client.", icon: "Laptop" },
    ],
    specs: [
      { label: "Platform", value: "SAP HANA in-memory database" },
      { label: "Access", value: "Own schema with modelling and admin privileges" },
      ...commonAccessSpecs,
    ],
    checklist: {
      title: "Good fit for",
      items: [
        "HANA modelling and CDS practice",
        "Basis and DBA administration training",
        "Report and performance tuning work",
        "Data migration rehearsals",
      ],
    },
    faq: commonFaq,
  },
  {
    slug: "sap-dedicated-server-access",
    eyebrow: "Enterprise-grade SAP server access",
    title: "SAP S/4HANA dedicated server",
    metaTitle: "SAP S/4HANA Dedicated Server | Private SAP Environment — ServerFY",
    intro:
      "ServerFY is a leading provider of enterprise-grade, customised dedicated SAP S/4HANA servers running the latest fully activated S/4HANA appliance — your private, isolated environment with no sharing and no compromises.",
    description:
      "Enterprise-grade dedicated SAP S/4HANA server hosting with exclusive access, SSL security, ABAP and Fiori development support, custom domain and 99.9% uptime.",
    highlights: [
      { title: "Exclusive access", desc: "The entire server infrastructure is leased solely to your organisation.", icon: "Lock" },
      { title: "Top-notch security", desc: "Private environment with SSL, reducing the risk of breaches and unauthorised access.", icon: "ShieldCheck" },
      { title: "Custom configuration", desc: "Full control over server settings, including embedded EWM and TM.", icon: "Settings2" },
      { title: "Peak performance", desc: "Dedicated resources for faster, more reliable operations.", icon: "Gauge" },
    ],
    specs: [
      { label: "Isolation", value: "Single-tenant landscape, no shared clients" },
      { label: "Platform", value: "SAP S/4HANA 2025 / 2023 fully activated appliance on SAP HANA" },
      { label: "Security", value: "SSL enabled with SHA-256 certificates" },
      { label: "Development", value: "ABAP with RAP, Fiori, UI5, CDS views and OData services" },
      { label: "Integration", value: "SAP NetWeaver 7.50 JAVA (J2EE) with Adobe Document Services" },
      { label: "Custom domain", value: "Provided, such as yourcompany.serverfy.com" },
      { label: "Users", value: "Ideal for 10 to 500 users" },
      { label: "Support SLA", value: "Acknowledged in 6-8 hours, 12 to 24-hour SLA by plan" },
      { label: "Subscription", value: "Monthly charges, one-time installation fee, 3-month minimum" },
      ...commonAccessSpecs,
    ],
    checklist: {
      title: "Good fit for",
      items: [
        "Enterprise-grade S/4HANA sandboxes",
        "Namespace and product/add-on development",
        "Corporate training and customer demos",
        "ECC to S/4HANA migration practice",
        "Integration with SAP BTP and external applications",
      ],
    },
    faq: commonFaq,
  },
  {
    slug: "sap-shared-server-access",
    eyebrow: "SAP Servers",
    title: "Shared SAP servers",
    metaTitle: "Shared SAP Server Access | Affordable Practice — ServerFY",
    intro:
      "A personal user on a well-maintained shared landscape — the most affordable way to get genuine hands-on SAP time.",
    description:
      "Affordable shared SAP server access with your own login on a monitored landscape, ideal for individual practice and certification prep.",
    highlights: [
      { title: "Your own login", desc: "A personal user and workspace on a landscape shared with other learners.", icon: "Users" },
      { title: "Lowest entry cost", desc: "Start practising for a fraction of a dedicated environment.", icon: "Wallet" },
      { title: "Well maintained", desc: "Monitored, backed up and reset on a schedule so it stays usable.", icon: "Activity" },
      { title: "Upgrade anytime", desc: "Move to a private client or dedicated server whenever you outgrow it.", icon: "ArrowUpRight" },
    ],
    specs: [
      { label: "Isolation", value: "Shared landscape, personal user and workspace" },
      { label: "Best for", value: "Individual learners and freelancers" },
      ...commonAccessSpecs,
    ],
    checklist: {
      title: "Good fit for",
      items: [
        "Students and job seekers",
        "Freelancers between projects",
        "Certification practice",
        "Trying a module before committing",
      ],
    },
    faq: commonFaq,
  },
];

/* --------------------------------- Solutions -------------------------------- */

export const solutionPages: DetailPage[] = [
  {
    slug: "sap-server-for-training-institutes",
    eyebrow: "Solutions",
    title: "SAP training institutes & corporate batches",
    metaTitle: "SAP Server for Training Institutes & Batches — ServerFY",
    intro:
      "Give every learner a working system on day one, with logins prepared ahead of the batch and an admin user for the trainer.",
    description:
      "SAP server infrastructure for training institutes and corporate batches: per-learner logins, trainer admin access and term-based pricing.",
    highlights: [
      { title: "Ready before day one", desc: "Logins, roles and exercise data prepared before your batch starts.", icon: "GraduationCap" },
      { title: "One admin, many learners", desc: "The trainer resets passwords and data without waiting on us.", icon: "Presentation" },
      { title: "Predictable cost", desc: "Priced per batch length so course fees stay easy to plan.", icon: "Wallet" },
      { title: "Repeatable", desc: "Refresh the environment and run the next batch on the same setup.", icon: "Repeat" },
    ],
    specs: [
      { label: "Batch size", value: "5 to 100+ learners" },
      { label: "Environment", value: "S/4HANA or ECC, functional or technical" },
      ...commonAccessSpecs,
    ],
    checklist: {
      title: "What you get",
      items: [
        "Per-learner SAP users",
        "Trainer admin account",
        "Data refresh between batches",
        "Support during class hours",
        "Flexible batch durations",
      ],
    },
    faq: commonFaq,
  },
  {
    slug: "sap-server-for-consultants",
    eyebrow: "Solutions",
    title: "Practice environments for consultants",
    metaTitle: "SAP Practice Environment for Consultants — ServerFY",
    intro:
      "Stay sharp between projects, prepare for a certification, or rehearse a configuration before you do it on a client system.",
    description:
      "Personal SAP practice environments for working consultants: rehearse configuration, prepare certifications and stay current between projects.",
    highlights: [
      { title: "Private workspace", desc: "Your own client or user, with your customising left untouched.", icon: "ShieldCheck" },
      { title: "Rehearse safely", desc: "Try the change here before you touch a client landscape.", icon: "FlaskConical" },
      { title: "Cross-module", desc: "Add a second module when you want to broaden your profile.", icon: "Boxes" },
      { title: "Month to month", desc: "Keep it while you need it and stop without penalty.", icon: "CalendarClock" },
    ],
    specs: [
      { label: "Access", value: "Individual login, private client optional" },
      { label: "Duration", value: "Monthly, quarterly or yearly" },
      ...commonAccessSpecs,
    ],
    checklist: {
      title: "Popular with",
      items: [
        "Freelance SAP consultants",
        "Consultants preparing certifications",
        "Support engineers moving to implementation",
        "Anyone switching modules",
      ],
    },
    faq: commonFaq,
  },
  {
    slug: "sap-server-for-trainers",
    eyebrow: "Solutions",
    title: "Trainer labs with multi-user access",
    metaTitle: "SAP Trainer Lab | Multi-user Server Access — ServerFY",
    intro:
      "Lab environments sized for live classes, with concurrent logins that hold up when thirty people press enter at the same time.",
    description:
      "Multi-user SAP lab environments for trainers, sized for concurrent classroom logins with monitored performance and quick resets.",
    highlights: [
      { title: "Concurrency tested", desc: "Sized for the whole class working at once, not one login at a time.", icon: "Users" },
      { title: "Exercise data", desc: "We load your exercise master data before the session.", icon: "Database" },
      { title: "Quick resets", desc: "Clear a session's changes between classes in minutes.", icon: "History" },
      { title: "Live-class support", desc: "Someone reachable while your class is running.", icon: "Headset" },
    ],
    specs: [
      { label: "Concurrency", value: "Sized to your class size" },
      { label: "Reset", value: "Between sessions on request" },
      ...commonAccessSpecs,
    ],
    checklist: {
      title: "What you get",
      items: [
        "Class-sized concurrent logins",
        "Pre-loaded exercise data",
        "Session resets",
        "Trainer admin rights",
      ],
    },
    faq: commonFaq,
  },
  {
    slug: "sap-server-for-project-teams",
    eyebrow: "Solutions",
    title: "Parallel environments for project teams",
    metaTitle: "SAP Environments for Project Teams — ServerFY",
    intro:
      "Separate clients for build, test and demo so your team stops queueing for a single system.",
    description:
      "Parallel SAP environments for project teams: separate build, test and demo clients with transports and coordinated access.",
    highlights: [
      { title: "Client per stream", desc: "Build, test and demo run side by side without stepping on each other.", icon: "Layers" },
      { title: "Transport path", desc: "Move objects between clients the way your process expects.", icon: "GitBranch" },
      { title: "Team accounts", desc: "Named users with the roles each person actually needs.", icon: "Users" },
      { title: "Scale on demand", desc: "Add capacity for a crunch and release it afterwards.", icon: "Gauge" },
    ],
    specs: [
      { label: "Clients", value: "Multiple, with transport routes" },
      { label: "Users", value: "Named accounts per team member" },
      ...commonAccessSpecs,
    ],
    checklist: {
      title: "Good fit for",
      items: [
        "Implementation partners",
        "Product teams building on SAP",
        "Rollout and migration projects",
        "Distributed teams across time zones",
      ],
    },
    faq: commonFaq,
  },
  {
    slug: "sap-development-server",
    eyebrow: "Solutions",
    title: "Development workloads",
    metaTitle: "SAP Development Environments | ABAP & Fiori — ServerFY",
    intro:
      "Everything a developer needs on day one: keys, packages, transports and the tooling to build ABAP, Fiori and integrations.",
    description:
      "SAP development environments for ABAP, Fiori, UI5 and integration work, with developer keys, packages and transport handling.",
    highlights: [
      { title: "Keys on arrival", desc: "Developer registration handled before handover.", icon: "KeyRound" },
      { title: "Full tooling", desc: "ABAP Workbench, Eclipse ADT, CDS and OData.", icon: "Code2" },
      { title: "Version control friendly", desc: "abapGit-style workflows supported on request.", icon: "GitBranch" },
      { title: "Room to grow", desc: "Add developers as the project ramps up.", icon: "Users" },
    ],
    specs: [
      { label: "Stack", value: "ABAP, CDS, OData, Fiori, UI5" },
      { label: "Access", value: "Eclipse ADT and SAP GUI" },
      ...commonAccessSpecs,
    ],
    checklist: {
      title: "What you can build",
      items: [
        "Custom reports and enhancements",
        "Fiori and UI5 applications",
        "OData services and APIs",
        "Interfaces and integrations",
      ],
    },
    faq: commonFaq,
  },
  {
    slug: "sap-testing-server",
    eyebrow: "Solutions",
    title: "Testing workloads",
    metaTitle: "SAP Testing Environments | Functional & Regression — ServerFY",
    intro:
      "Dedicated space for functional, regression and integration cycles, with restore points so a failed run costs minutes, not days.",
    description:
      "SAP testing environments for functional, regression and integration cycles with snapshots, parallel clients and short-term terms.",
    highlights: [
      { title: "Restore points", desc: "Snapshot before the run, roll back after it.", icon: "History" },
      { title: "Parallel streams", desc: "Several test cycles at once in separate clients.", icon: "Layers" },
      { title: "Clean baselines", desc: "Start every cycle from a known state.", icon: "ShieldCheck" },
      { title: "Short terms", desc: "Take the environment only for the test window.", icon: "CalendarClock" },
    ],
    specs: [
      { label: "Snapshots", value: "On request, before and after cycles" },
      { label: "Duration", value: "Weekly or monthly test windows" },
      ...commonAccessSpecs,
    ],
    checklist: {
      title: "Good fit for",
      items: [
        "Regression suites",
        "UAT rehearsals",
        "Interface testing",
        "Performance sanity checks",
      ],
    },
    faq: commonFaq,
  },
  {
    slug: "sap-demo-poc-server",
    eyebrow: "Solutions",
    title: "Demo & proof of concept",
    metaTitle: "SAP Demo & POC Environments — ServerFY",
    intro:
      "Show the idea working on a real SAP system instead of a slide, with an environment that looks tidy on a shared screen.",
    description:
      "Short-term SAP demo and proof of concept environments with clean data, reserved performance and restorable baselines.",
    highlights: [
      { title: "Looks the part", desc: "Clean, curated data your audience can follow.", icon: "MonitorPlay" },
      { title: "Reserved capacity", desc: "Performance held steady for the session.", icon: "Gauge" },
      { title: "Baseline restore", desc: "Reset to a pristine state between prospects.", icon: "History" },
      { title: "Fast turnaround", desc: "Days, not procurement cycles.", icon: "Zap" },
    ],
    specs: [
      { label: "Duration", value: "One week to three months" },
      { label: "Data", value: "Curated demo baseline" },
      ...commonAccessSpecs,
    ],
    checklist: {
      title: "Good fit for",
      items: [
        "Sales demos",
        "Proof of concept builds",
        "Webinars and workshops",
        "Client evaluations",
      ],
    },
    faq: commonFaq,
  },
  {
    slug: "sap-sandbox-server",
    eyebrow: "Solutions",
    title: "Sandbox environments",
    metaTitle: "SAP Sandbox Environment | Experiment Safely — ServerFY",
    intro:
      "A throwaway landscape for experiments: change anything, break anything, and reset when you are done.",
    description:
      "SAP sandbox environments for safe experimentation, with full customising freedom and a reset whenever you need a clean slate.",
    highlights: [
      { title: "Nothing is precious", desc: "Experiment without a change board or approval chain.", icon: "FlaskConical" },
      { title: "Reset on demand", desc: "Return to a clean baseline whenever you like.", icon: "History" },
      { title: "Full customising", desc: "SPRO access to configure the way you want.", icon: "Settings2" },
      { title: "Low commitment", desc: "Keep it for a month and walk away.", icon: "CalendarClock" },
    ],
    specs: [
      { label: "Freedom", value: "Full customising and developer access" },
      { label: "Reset", value: "Anytime, on request" },
      ...commonAccessSpecs,
    ],
    checklist: {
      title: "Good fit for",
      items: [
        "Evaluating a new module",
        "Trying a configuration approach",
        "Learning by breaking things",
        "Internal experiments",
      ],
    },
    faq: commonFaq,
  },
];

/* --------------------------------- Resources -------------------------------- */

export const resourcePages: DetailPage[] = [
  {
    slug: "sap-server-knowledge-base",
    eyebrow: "Resources",
    title: "Knowledge base",
    metaTitle: "Knowledge Base | SAP Server Setup & Access — ServerFY",
    intro:
      "Step-by-step articles for connecting, working and troubleshooting on your ServerFY environment.",
    description:
      "ServerFY knowledge base: connecting with SAP GUI, Fiori access, user administration, backups, resets and troubleshooting articles.",
    highlights: [
      { title: "Connecting", desc: "Install SAP GUI, add the connection entry and log in the first time.", icon: "Laptop" },
      { title: "Fiori access", desc: "Open the launchpad, find catalogs and pin the apps you use.", icon: "LayoutGrid" },
      { title: "Users & roles", desc: "Add learners, reset passwords and unlock accounts.", icon: "Users" },
      { title: "Backups", desc: "How daily snapshots work and how to ask for a restore.", icon: "History" },
    ],
    specs: [
      { label: "Updated", value: "Reviewed monthly by the infrastructure team" },
      { label: "Format", value: "Short, screenshot-led walkthroughs" },
      { label: "Support", value: "Anything not covered goes to a human" },
    ],
    checklist: {
      title: "Most read articles",
      items: [
        "First login checklist",
        "Fixing a stuck SAP GUI session",
        "Requesting a developer key",
        "Transport request basics",
        "Extending your subscription",
      ],
    },
    faq: commonFaq,
  },
  {
    slug: "sap-server-guides",
    eyebrow: "Resources",
    title: "Module-wise practice guides",
    metaTitle: "SAP Practice Guides by Module | FICO, MM, SD — ServerFY",
    intro:
      "Suggested practice paths for each module, so your time on the server has a plan behind it.",
    description:
      "Module-wise SAP practice guides for FICO, MM, SD, PP, HCM, ABAP, Basis and more — structured paths for building real hands-on experience.",
    highlights: [
      { title: "FICO path", desc: "Org structure, GL, AP, AR, asset accounting, month-end.", icon: "Calculator" },
      { title: "MM path", desc: "Purchase requisition to invoice verification, end to end.", icon: "Boxes" },
      { title: "SD path", desc: "Enquiry, quotation, order, delivery, billing.", icon: "Truck" },
      { title: "ABAP path", desc: "Reports, ALV, module pool, enhancements, CDS.", icon: "Code2" },
    ],
    specs: [
      { label: "Level", value: "Beginner to intermediate" },
      { label: "Time", value: "Roughly four to eight weeks per path" },
      { label: "Cost", value: "Free with any active environment" },
    ],
    checklist: {
      title: "Each guide includes",
      items: [
        "A recommended order of topics",
        "Key transaction codes",
        "A practice scenario to complete",
        "Common mistakes to avoid",
      ],
    },
    faq: commonFaq,
  },
  {
    slug: "sap-server-system-requirements",
    eyebrow: "Resources",
    title: "System requirements",
    metaTitle: "System Requirements for SAP Remote Access — ServerFY",
    intro:
      "Everything runs on our infrastructure, so your own machine only needs to be good enough to display the screens.",
    description:
      "What you need locally to use a ServerFY SAP environment: SAP GUI or a browser, a stable internet connection and modest hardware.",
    highlights: [
      { title: "Any modern laptop", desc: "4 GB RAM and a dual-core processor is enough for SAP GUI.", icon: "Laptop" },
      { title: "Stable internet", desc: "2 Mbps works; 10 Mbps feels comfortable for a full day.", icon: "Wifi" },
      { title: "Windows, macOS or Linux", desc: "SAP GUI for Windows or Java, or the browser for Fiori.", icon: "MonitorPlay" },
      { title: "No local install of SAP", desc: "The system runs on our servers — you only install the client.", icon: "Server" },
    ],
    specs: [
      { label: "Client software", value: "SAP GUI 7.60 or newer, or a modern browser" },
      { label: "Bandwidth", value: "2 Mbps minimum, 10 Mbps recommended" },
      { label: "Hardware", value: "4 GB RAM, dual-core CPU, any OS" },
      { label: "Network", value: "Outbound access to our gateway; VPN details supplied" },
    ],
    checklist: {
      title: "Before your first login",
      items: [
        "Install SAP GUI (we send the download link)",
        "Add the connection entry we provide",
        "Test the VPN or gateway login",
        "Change your initial password",
      ],
    },
    faq: commonFaq,
  },
  {
    slug: "sap-server-blog",
    eyebrow: "Resources",
    title: "From the infrastructure team",
    metaTitle: "Blog | SAP Infrastructure Notes — ServerFY",
    intro:
      "Practical notes on running SAP landscapes: what breaks, what we changed, and what actually helps learners get productive faster.",
    description:
      "Notes from the ServerFY infrastructure team on running SAP landscapes, performance, access, backups and helping learners work faster.",
    highlights: [
      { title: "S/4HANA vs ECC for learners", desc: "Which one to start on, and when the answer changes.", icon: "GitCompare" },
      { title: "Why sessions feel slow", desc: "The three causes we see most, and how to fix each one.", icon: "Gauge" },
      { title: "Running a 40-person batch", desc: "What we prepare before a large training class begins.", icon: "GraduationCap" },
      { title: "Backups that actually restore", desc: "How we test snapshots rather than assuming them.", icon: "History" },
    ],
    specs: [
      { label: "Cadence", value: "A couple of posts each month" },
      { label: "Written by", value: "The engineers who run the systems" },
      { label: "Cost", value: "Free to read" },
    ],
    checklist: {
      title: "Topics we cover",
      items: [
        "Access and connectivity",
        "Performance and sizing",
        "Training-batch operations",
        "Module learning paths",
      ],
    },
    faq: commonFaq,
  },
  {
    slug: "sap-server-status",
    eyebrow: "Resources",
    title: "Server status",
    metaTitle: "Server Status | SAP Environment Uptime — ServerFY",
    intro:
      "Current state of our SAP landscapes and gateways, plus how we announce planned maintenance.",
    description:
      "Live status of ServerFY SAP landscapes and access gateways, with maintenance windows and how incidents are communicated.",
    highlights: [
      { title: "S/4HANA landscapes", desc: "Operational — no incidents reported.", icon: "Server" },
      { title: "ECC landscapes", desc: "Operational — no incidents reported.", icon: "HardDrive" },
      { title: "HANA databases", desc: "Operational — no incidents reported.", icon: "Database" },
      { title: "Access gateways", desc: "Operational — logins responding normally.", icon: "ShieldCheck" },
    ],
    specs: [
      { label: "Monitoring", value: "Continuous, with alerting to on-call engineers" },
      { label: "Maintenance", value: "Announced by email at least 48 hours ahead" },
      { label: "Incidents", value: "Affected customers notified directly" },
    ],
    checklist: {
      title: "If you cannot log in",
      items: [
        "Check your internet connection and VPN",
        "Confirm the connection entry details",
        "Try a different network",
        "Message us on WhatsApp — we answer fast",
      ],
    },
    faq: commonFaq,
  },
];

/* ------------------------------ Company & legal ----------------------------- */

export const companyPages: DetailPage[] = [
  {
    slug: "why-serverfy",
    eyebrow: "Company",
    title: "Why teams choose ServerFY",
    metaTitle: "Why ServerFY | Reliable SAP Server Access",
    intro:
      "Uptime you can teach on, pricing you can predict, and an engineer who answers when something needs attention.",
    description:
      "Why learners, trainers and project teams choose ServerFY for SAP server access: monitored uptime, flat pricing and real human support.",
    highlights: [
      { title: "Monitored around the clock", desc: "Alerts reach an engineer, not an empty inbox.", icon: "Activity" },
      { title: "Flat, published pricing", desc: "No setup fees, no surprise add-ons at renewal.", icon: "Wallet" },
      { title: "Fast activation", desc: "Most environments are usable the same working day.", icon: "Zap" },
      { title: "Human support", desc: "WhatsApp or email reaches a person who knows SAP Basis.", icon: "Headset" },
    ],
    specs: [
      { label: "Uptime target", value: "99.5% monthly on dedicated environments" },
      { label: "Support hours", value: "Extended hours, including weekend batches" },
      { label: "Contract", value: "Monthly, quarterly or yearly — cancel at cycle end" },
    ],
    checklist: {
      title: "What that means day to day",
      items: [
        "Your class starts on time",
        "Your sprint is not blocked by infrastructure",
        "You know next month's bill today",
        "Someone answers when you message",
      ],
    },
    faq: commonFaq,
  },
  {
    slug: "infrastructure",
    eyebrow: "Company",
    title: "Our infrastructure",
    metaTitle: "Infrastructure | How ServerFY Runs SAP Landscapes",
    intro:
      "How the environments are built, secured, monitored and backed up — in plain terms.",
    description:
      "How ServerFY builds and secures SAP landscapes: enterprise hardware, isolated tenants, encrypted access, daily backups and continuous monitoring.",
    highlights: [
      { title: "Enterprise hardware", desc: "Server-grade compute with fast NVMe storage for HANA workloads.", icon: "Server" },
      { title: "Isolated tenants", desc: "Dedicated customers get their own landscape, never a shared client.", icon: "ShieldCheck" },
      { title: "Encrypted access", desc: "Logins travel over encrypted channels with per-user credentials.", icon: "Lock" },
      { title: "Daily backups", desc: "Snapshots taken every day and periodically test-restored.", icon: "History" },
    ],
    specs: [
      { label: "Storage", value: "NVMe-backed, sized for in-memory workloads" },
      { label: "Monitoring", value: "Continuous system and service checks with alerting" },
      { label: "Backups", value: "Daily snapshots, restore on request" },
      { label: "Access", value: "Per-user credentials over an encrypted gateway" },
    ],
    checklist: {
      title: "Operational practices",
      items: [
        "Maintenance announced in advance",
        "Capacity reviewed before each large batch",
        "Restores tested, not assumed",
        "Environments wiped cleanly when a term ends",
      ],
    },
    faq: commonFaq,
  },
  {
    slug: "careers",
    eyebrow: "Company",
    title: "Careers at ServerFY",
    metaTitle: "Careers | Join the ServerFY Team",
    intro:
      "We are a small, remote-first team that keeps SAP landscapes running. If that sounds like your kind of work, say hello.",
    description:
      "Open roles and how to apply at ServerFY, a remote-first team running SAP infrastructure for learners, trainers and project teams.",
    highlights: [
      { title: "SAP Basis Engineer", desc: "Own landscape health, transports, upgrades and performance.", icon: "Settings2" },
      { title: "Customer Success", desc: "Onboard learners and institutes and keep their batches running.", icon: "Headset" },
      { title: "Full-stack Engineer", desc: "Build the portal, provisioning tooling and dashboards.", icon: "Code2" },
      { title: "Content & Guides", desc: "Write the practice paths and knowledge base articles.", icon: "FileText" },
    ],
    specs: [
      { label: "Location", value: "Remote-first, India time zone overlap" },
      { label: "Work style", value: "Small team, direct ownership, no layers" },
      { label: "How to apply", value: "Send a note through the contact page" },
    ],
    checklist: {
      title: "What we look for",
      items: [
        "Care about the people using the systems",
        "Comfortable owning a problem end to end",
        "Clear, plain writing",
        "SAP experience helps but is not required for every role",
      ],
    },
    faq: commonFaq,
  },
];

export const supportPages: DetailPage[] = [
  {
    slug: "refund-policy",
    eyebrow: "Legal",
    title: "Refund policy",
    metaTitle: "Refund Policy | ServerFY",
    intro:
      "When a refund applies, how to request one, and how quickly it is processed.",
    description:
      "ServerFY refund policy: eligibility windows, how to request a refund, what is not covered and how long processing takes.",
    highlights: [
      { title: "First 48 hours", desc: "If we cannot deliver a working environment, you get a full refund.", icon: "ShieldCheck" },
      { title: "Extended outages", desc: "Prolonged downtime caused by us is credited or refunded pro rata.", icon: "Activity" },
      { title: "Unused time", desc: "Cancelled long cycles are assessed case by case for unused months.", icon: "CalendarClock" },
      { title: "Not covered", desc: "Change of mind after substantial use, or misuse of the environment.", icon: "Info" },
    ],
    specs: [
      { label: "Request window", value: "Within 7 days of the issue" },
      { label: "How to request", value: "Email or WhatsApp with your order details" },
      { label: "Processing", value: "5 to 10 working days to the original payment method" },
    ],
    checklist: {
      title: "To request a refund, send us",
      items: [
        "Your name and registered email",
        "The environment and plan you purchased",
        "What went wrong and when",
        "Your payment reference",
      ],
    },
    faq: commonFaq,
  },
  {
    slug: "sla",
    eyebrow: "Legal",
    title: "Service level agreement",
    metaTitle: "Service Level Agreement (SLA) | ServerFY",
    intro:
      "What we commit to on availability, response times and maintenance — and what happens if we miss it.",
    description:
      "ServerFY service level agreement: uptime targets, support response times, maintenance windows and service credits.",
    highlights: [
      { title: "99.5% uptime target", desc: "Measured monthly on dedicated environments, excluding planned maintenance.", icon: "Activity" },
      { title: "Fast first response", desc: "Critical access issues answered within a few hours during support hours.", icon: "Headset" },
      { title: "Announced maintenance", desc: "Planned windows communicated at least 48 hours in advance.", icon: "CalendarClock" },
      { title: "Service credits", desc: "Missed targets are credited against your next cycle.", icon: "Wallet" },
    ],
    specs: [
      { label: "Availability target", value: "99.5% monthly (dedicated)" },
      { label: "Critical response", value: "Within 4 hours in support hours" },
      { label: "General response", value: "Within one working day" },
      { label: "Maintenance notice", value: "48 hours minimum" },
    ],
    checklist: {
      title: "Exclusions",
      items: [
        "Planned, announced maintenance",
        "Issues on your own network or device",
        "Misuse or unauthorised changes",
        "Events outside our reasonable control",
      ],
    },
    faq: commonFaq,
  },
];

export const allDetailPages = {
  servers: serverPages,
  solutions: solutionPages,
  resources: resourcePages,
  company: companyPages,
  support: supportPages,
};

export function findPage(list: DetailPage[], slug: string) {
  return list.find((p) => p.slug === slug);
}
