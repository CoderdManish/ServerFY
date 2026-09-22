import type { DetailPage } from "./pages";

/**
 * SAP Server Knowledge Hub — answer-first articles that link into the
 * commercial server, module and pricing pages (topical cluster).
 */
export const resourceArticles: DetailPage[] = [
  {
    slug: "what-is-sap-practice-server",
    eyebrow: "Resources",
    title: "What is an SAP practice server?",
    metaTitle: "What Is an SAP Practice Server? Plain-English Guide — ServerFY",
    intro:
      "A hosted, non-production SAP system rented for learning, configuration practice, development and demos — accessed remotely with SAP GUI.",
    description:
      "An SAP practice server is a hosted non-production SAP system you rent for learning and configuration. Here is what it includes, who uses it and how access works.",
    keywords: "what is sap practice server, sap practice environment, sap server for learning",
    highlights: [
      { title: "Hosted, not installed", desc: "The SAP system runs on our infrastructure; you only install SAP GUI.", icon: "Server" },
      { title: "Sample data", desc: "IDES-style master data so end-to-end business cycles actually run.", icon: "Database" },
      { title: "Your own user", desc: "A personal login and workspace, so your configuration stays yours.", icon: "UserCheck" },
      { title: "Rented by period", desc: "Pay for an access window instead of buying hardware or licences.", icon: "CalendarClock" },
    ],
    specs: [
      { label: "System types", value: "SAP S/4HANA or SAP ECC" },
      { label: "Access method", value: "SAP GUI, plus Fiori launchpad on S/4HANA" },
      { label: "Intended users", value: "Students, consultants, developers, trainers, project teams" },
      { label: "Not intended for", value: "Live business data or production processing" },
      { label: "Activation", value: "Usually the same working day" },
    ],
    checklist: {
      title: "You would use one to",
      items: [
        "Practise module transactions and IMG configuration",
        "Prepare for interviews or certification",
        "Write and test ABAP without touching a client system",
        "Run a demo or proof of concept for a customer",
        "Train a batch of learners with separate logins",
      ],
    },
    faq: [
      { q: "Is a practice server the same as an IDES server?", a: "IDES refers to SAP's demonstration dataset. Most practice systems are loaded with IDES-style sample data, so the terms are often used interchangeably." },
      { q: "Do I need my own SAP licence?", a: "No — access to the learning environment is included in what you rent." },
      { q: "How long can I keep it?", a: "As long as you keep renewing. Most learners start with a month and extend." },
    ],
  },
  {
    slug: "how-to-access-sap-server",
    eyebrow: "Resources",
    title: "How to access an SAP server remotely",
    metaTitle: "How to Access an SAP Server Remotely (Step by Step) — ServerFY",
    intro:
      "Install SAP GUI, add the connection entry we send you, log on with your client and user, and change your password on first login.",
    description:
      "Step-by-step guide to accessing a remote SAP server: SAP GUI setup, connection entry, logging on, first-password change and what to do if the connection fails.",
    keywords: "how to access sap server, sap gui connection, remote sap login",
    highlights: [
      { title: "Install SAP GUI", desc: "SAP GUI for Windows, or SAP GUI for Java on macOS and Linux.", icon: "Download" },
      { title: "Add the connection", desc: "Enter application server, instance number and system ID from the handover mail.", icon: "Plug" },
      { title: "Log on", desc: "Use your client, user and password; set a new password at first login.", icon: "LogIn" },
      { title: "Get help fast", desc: "If a login fails, our team checks the system and your user the same day.", icon: "LifeBuoy" },
    ],
    specs: [
      { label: "Client software", value: "SAP GUI 7.70 or later" },
      { label: "Connection details issued", value: "Application server, instance number, system ID, client, user, password" },
      { label: "Internet", value: "Stable connection, roughly 2 Mbps or better" },
      { label: "VPN", value: "Not required for standard access" },
      { label: "Support", value: "Guided setup on request" },
    ],
    checklist: {
      title: "If you cannot log on",
      items: [
        "Check the instance number and system ID were typed exactly as issued",
        "Confirm you are using the correct client number",
        "Try a different network — some office firewalls block SAP ports",
        "Make sure your access period has not expired",
        "Message us with a screenshot of the error and we will check the system",
      ],
    },
    faq: [
      { q: "Can I log in from more than one machine?", a: "Yes, as long as it is the same user and you are not required to hold multiple parallel sessions." },
      { q: "Does SAP GUI work on a Mac?", a: "Yes — SAP GUI for Java connects to the same system." },
      { q: "Is my connection secure?", a: "Credentials are sent privately at handover and are never published; passwords are changed by you at first login." },
    ],
  },
  {
    slug: "sap-gui-installation-guide",
    eyebrow: "Resources",
    title: "SAP GUI installation guide",
    metaTitle: "SAP GUI Installation Guide for Windows, macOS & Linux — ServerFY",
    intro:
      "What SAP GUI is, which version to use, how to install it on each operating system and how to create your first connection entry.",
    description:
      "How to install SAP GUI on Windows, macOS and Linux, choose the right version, create a connection entry and fix the most common installation problems.",
    keywords: "sap gui installation, install sap gui windows, sap gui for java mac",
    highlights: [
      { title: "One light client", desc: "SAP GUI is a small desktop client — the SAP system itself stays on the server.", icon: "MonitorSmartphone" },
      { title: "Windows", desc: "SAP GUI for Windows 7.70 or later is the most feature-complete option.", icon: "Laptop" },
      { title: "macOS and Linux", desc: "SAP GUI for Java provides the same logon and transaction experience.", icon: "Apple" },
      { title: "Connection entry", desc: "Add one entry per system; you can keep several systems side by side.", icon: "ListPlus" },
    ],
    specs: [
      { label: "Recommended version", value: "SAP GUI 7.70 or later" },
      { label: "Disk space", value: "Roughly 1 GB for a standard installation" },
      { label: "Laptop RAM", value: "4 GB is sufficient — the SAP system runs remotely" },
      { label: "Java option", value: "SAP GUI for Java for macOS and Linux" },
      { label: "Where to get it", value: "Provided with your ServerFY handover instructions" },
    ],
    checklist: {
      title: "Installation checklist",
      items: [
        "Close other SAP sessions before installing or upgrading",
        "Install with an administrator account on Windows",
        "Allow SAP GUI through your firewall when prompted",
        "Create the connection entry with the details from your handover mail",
        "Log on once and change the initial password",
      ],
    },
    faq: [
      { q: "Do I need a specific SAP GUI version?", a: "Any recent release connects; we recommend 7.70 or later for Fiori-era systems." },
      { q: "Can I use a browser instead?", a: "On S/4HANA you can use the Fiori launchpad in a browser for Fiori apps; classic transactions still need SAP GUI." },
      { q: "Will SAP GUI slow my laptop down?", a: "No — it is a thin client and uses very little memory." },
    ],
  },
  {
    slug: "sap-practice-server-cost",
    eyebrow: "Resources",
    title: "How much does an SAP practice server cost?",
    metaTitle: "SAP Practice Server Cost — What You Pay and Why | ServerFY",
    intro:
      "Cost depends on the SAP system, whether the environment is shared or dedicated, how much memory it needs and how long you keep it.",
    description:
      "What drives the price of an SAP practice server: system type, shared versus dedicated, memory sizing, number of users and access duration.",
    keywords: "sap practice server cost, sap server price, sap server access cost",
    highlights: [
      { title: "System type", desc: "S/4HANA environments need more memory than classic ECC systems.", icon: "Server" },
      { title: "Shared or dedicated", desc: "Sharing the infrastructure is the cheapest route; exclusivity costs more.", icon: "Users" },
      { title: "Sizing", desc: "More memory and vCPU for development, batches and POCs.", icon: "Gauge" },
      { title: "Duration", desc: "Longer access periods reduce the effective monthly cost.", icon: "CalendarClock" },
    ],
    specs: [
      { label: "Billing", value: "Fixed monthly access periods" },
      { label: "Cheapest option", value: "Shared environment, single user, one month" },
      { label: "Higher cost drivers", value: "Dedicated system, admin rights, larger memory, many users" },
      { label: "Included", value: "Environment, user setup, support during the period" },
      { label: "Current plans", value: "See the pricing page for live figures" },
    ],
    checklist: {
      title: "Before you pay, confirm",
      items: [
        "Which SAP system and release you need",
        "The modules you will actually practise",
        "How many people need a login",
        "Whether you need administrator rights or transports",
        "How long you realistically need access",
      ],
    },
    faq: [
      { q: "Are there hidden charges?", a: "No. The access period covers the environment, your user setup and support for the period." },
      { q: "Can I extend later?", a: "Yes, and your existing work carries over when you extend." },
      { q: "Do you offer batch pricing?", a: "Yes — tell us the number of participants and duration and we will size and quote it." },
    ],
  },
  {
    slug: "sap-server-for-fico",
    eyebrow: "Resources",
    title: "Which server do you need for SAP FICO practice?",
    metaTitle: "SAP Server for FICO Practice — What You Need | ServerFY",
    intro:
      "FICO practice needs a system with an activated finance and controlling scope, company code data and posting periods open — on S/4HANA that means the Universal Journal.",
    description:
      "What an SAP FICO practice server must have: activated FI and CO scope, company code and chart of accounts data, open posting periods and reporting access.",
    keywords: "sap server for fico, sap fico practice server, fico server access",
    highlights: [
      { title: "Configured company code", desc: "Chart of accounts, fiscal year variant and posting periods ready to use.", icon: "Building2" },
      { title: "FI and CO scope", desc: "GL, AP, AR, asset accounting and controlling switched on.", icon: "Calculator" },
      { title: "Universal Journal", desc: "On S/4HANA you post into ACDOCA and see the simplified data model first-hand.", icon: "Database" },
      { title: "Reporting", desc: "Standard reports and Fiori analytical apps to check your own postings.", icon: "BarChart3" },
    ],
    specs: [
      { label: "Recommended system", value: "SAP S/4HANA (ECC also available)" },
      { label: "Must be active", value: "FI: GL, AP, AR, AA — CO: cost centres, internal orders, profit centres" },
      { label: "Data", value: "Sample company code, vendors, customers and open items" },
      { label: "Interface", value: "SAP GUI plus Fiori apps for finance" },
      { label: "Typical user", value: "One learner; batches use a dedicated environment" },
    ],
    checklist: {
      title: "You should be able to",
      items: [
        "Create a GL account and post a journal entry",
        "Run vendor and customer invoice and payment cycles",
        "Configure a cost centre hierarchy and post to it",
        "Execute month-end and period-close transactions",
        "Run standard finance reports on your own data",
      ],
    },
    faq: [
      { q: "ECC or S/4HANA for FICO?", a: "S/4HANA if you are starting now; ECC if your target role supports an ECC landscape." },
      { q: "Can I get admin rights to configure?", a: "Configuration access for FICO is included; full administrator freedom comes with a dedicated environment." },
      { q: "How long do learners usually need?", a: "Most FICO learners take one to three months alongside their course." },
    ],
  },
  {
    slug: "sap-server-for-basis",
    eyebrow: "Resources",
    title: "Which server do you need for SAP BASIS practice?",
    metaTitle: "SAP Server for BASIS Practice — Admin Access Explained | ServerFY",
    intro:
      "BASIS practice needs administrator-level access: user administration, client handling, transports, background jobs and system monitoring — which means a dedicated environment.",
    description:
      "What an SAP BASIS practice environment requires: administrator rights, client administration, transport management, job scheduling and monitoring transactions.",
    keywords: "sap server for basis, sap basis practice server, sap basis admin access",
    highlights: [
      { title: "Administrator rights", desc: "SU01, PFCG, client tools and system parameters at your disposal.", icon: "ShieldCheck" },
      { title: "Client administration", desc: "Create and copy clients to rehearse real Basis tasks.", icon: "Layers" },
      { title: "Transports", desc: "Work with the transport management system end to end.", icon: "GitBranch" },
      { title: "Monitoring", desc: "Work processes, locks, dumps, logs and background jobs.", icon: "Activity" },
    ],
    specs: [
      { label: "Environment type", value: "Dedicated (shared systems cannot grant admin rights)" },
      { label: "Key transactions", value: "SU01, PFCG, SM50, SM37, SM12, ST22, STMS, SCC4" },
      { label: "Database", value: "SAP HANA on S/4HANA environments" },
      { label: "Users", value: "You control user creation on your own system" },
      { label: "Typical duration", value: "One to three months, extendable" },
    ],
    checklist: {
      title: "You should be able to",
      items: [
        "Create users and assign roles",
        "Create and copy a client",
        "Release and import a transport",
        "Schedule and monitor background jobs",
        "Analyse a short dump and a lock entry",
      ],
    },
    faq: [
      { q: "Can I practise Basis on a shared server?", a: "Only partly — monitoring transactions work, but client and transport administration need a dedicated system." },
      { q: "Do I get the underlying operating system?", a: "Standard access is at SAP application level; tell us if you need OS or DB level tasks and we will confirm what is possible." },
      { q: "Is HANA administration included?", a: "HANA-side practice can be arranged on dedicated environments — ask before you order." },
    ],
  },
];
