/**
 * Single source of truth for all ServerFY marketing content.
 * Edit values here — sections read from these structures.
 */

export const site = {
  name: "ServerFY",
  tagline: "Reliable SAP server infrastructure",
  phone: "+91 86053 23014",
  phoneHref: "tel:+918605323014",
  whatsapp: "https://wa.me/918605323014",
  email: "hello@serverfy.com",
  address: "Vishal Nagar, Pune, Maharashtra, India",
};

export type NavItem = {
  label: string;
  href: string;
  menu?: "servers" | "modules" | "solutions" | "resources";
};

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "SAP Servers", href: "/servers", menu: "servers" },
  { label: "SAP Modules", href: "/modules", menu: "modules" },
  { label: "Solutions", href: "/solutions", menu: "solutions" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/resources", menu: "resources" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const megaMenus = {
  servers: {
    title: "SAP Servers",
    blurb: "Ready-to-use SAP environments, activated fast and accessible remotely.",
    groups: [
      {
        heading: "Core environments",
        items: [
          { label: "S/4HANA Servers", desc: "Latest SAP suite environments", icon: "Server" },
          { label: "ECC Servers", desc: "Classic ECC 6.0 landscapes", icon: "HardDrive" },
          { label: "HANA Servers", desc: "In-memory database access", icon: "Database" },
          { label: "Dedicated Servers", desc: "Isolated resources for you", icon: "ShieldCheck" },
          { label: "Shared Servers", desc: "Cost-effective shared access", icon: "Users" },
        ],
      },
      {
        heading: "By purpose",
        items: [
          { label: "Practice Servers", desc: "Hands-on learning environments", icon: "GraduationCap" },
          { label: "Training Servers", desc: "Batch access for trainers", icon: "Presentation" },
          { label: "Development Servers", desc: "Build and extend safely", icon: "Code2" },
          { label: "Testing Servers", desc: "Validate before rollout", icon: "FlaskConical" },
          { label: "Demo / POC Servers", desc: "Show and prove quickly", icon: "MonitorPlay" },
        ],
      },
    ],
  },
  modules: {
    title: "SAP Modules",
    blurb: "Functional and technical environments across the SAP ecosystem.",
    groups: [
      {
        heading: "Functional",
        items: [
          { label: "FICO", desc: "Finance & controlling", icon: "Calculator" },
          { label: "MM", desc: "Materials management", icon: "Boxes" },
          { label: "SD", desc: "Sales & distribution", icon: "Truck" },
          { label: "PP", desc: "Production planning", icon: "Factory" },
          { label: "HCM", desc: "Human capital", icon: "Users" },
          { label: "EWM", desc: "Extended warehouse", icon: "Warehouse" },
        ],
      },
      {
        heading: "Technical",
        items: [
          { label: "ABAP", desc: "Core development stack", icon: "Code2" },
          { label: "Basis", desc: "Administration & tuning", icon: "Settings2" },
          { label: "HANA", desc: "In-memory platform", icon: "Database" },
          { label: "Fiori", desc: "Modern SAP UX", icon: "LayoutGrid" },
          { label: "BTP", desc: "Business Technology Platform", icon: "Cloud" },
          { label: "Security", desc: "Roles & authorizations", icon: "Lock" },
        ],
      },
    ],
  },
  solutions: {
    title: "Solutions",
    blurb: "Infrastructure shaped around how your team works with SAP.",
    groups: [
      {
        heading: "Teams",
        items: [
          { label: "SAP Training", desc: "Institutes & corporate batches", icon: "GraduationCap" },
          { label: "Consultant Practice", desc: "Stay sharp between projects", icon: "Briefcase" },
          { label: "Trainer Labs", desc: "Multi-user lab access", icon: "Presentation" },
          { label: "Project Teams", desc: "Parallel environments", icon: "Users" },
        ],
      },
      {
        heading: "Workloads",
        items: [
          { label: "Development", desc: "ABAP, Fiori, integrations", icon: "Code2" },
          { label: "Testing", desc: "Functional & regression", icon: "FlaskConical" },
          { label: "Demo & POC", desc: "Client-ready environments", icon: "MonitorPlay" },
          { label: "Sandbox", desc: "Experiment without risk", icon: "Boxes" },
        ],
      },
    ],
  },
  resources: {
    title: "Resources",
    blurb: "Everything you need before and after activation.",
    groups: [
      {
        heading: "Learn",
        items: [
          { label: "Blog", desc: "Notes from our infra team", icon: "FileText" },
          { label: "Knowledge Base", desc: "Setup & access guides", icon: "BookOpen" },
          { label: "Guides", desc: "Module-wise practice paths", icon: "Compass" },
        ],
      },
      {
        heading: "Support",
        items: [
          { label: "FAQs", desc: "Common questions answered", icon: "HelpCircle" },
          { label: "System Requirements", desc: "What you need locally", icon: "Laptop" },
          { label: "Server Status", desc: "Live infrastructure status", icon: "Activity" },
        ],
      },
    ],
  },
} as const;

export const serverCategories = [
  { title: "S/4HANA", desc: "Current-generation SAP suite environments.", icon: "Server" },
  { title: "ECC", desc: "Classic ECC landscapes for core practice.", icon: "HardDrive" },
  { title: "HANA", desc: "In-memory database and modelling access.", icon: "Database" },
  { title: "Functional", desc: "Configuration-ready functional clients.", icon: "SlidersHorizontal" },
  { title: "Technical", desc: "Developer keys and technical access.", icon: "Code2" },
  { title: "Dedicated", desc: "Isolated resources, full control.", icon: "ShieldCheck" },
  { title: "Shared", desc: "Affordable shared infrastructure.", icon: "Users" },
  { title: "Training", desc: "Multi-user batches for trainers.", icon: "GraduationCap" },
  { title: "Development", desc: "Build, extend and transport.", icon: "Terminal" },
  { title: "Testing", desc: "Validate flows and releases.", icon: "FlaskConical" },
  { title: "Demo", desc: "Client demos and quick POCs.", icon: "MonitorPlay" },
];

export type SapModule = {
  code: string;
  name: string;
  desc: string;
  type: "functional" | "technical";
  platforms: ("S/4HANA" | "ECC" | "HANA")[];
  availability: "Available" | "Limited slots";
  icon: string;
};

export const modules: SapModule[] = [
  { code: "FICO", name: "Financial Accounting & Controlling", desc: "GL, AP, AR, asset accounting and cost controlling.", type: "functional", platforms: ["S/4HANA", "ECC"], availability: "Available", icon: "Calculator" },
  { code: "MM", name: "Materials Management", desc: "Procurement, inventory and invoice verification.", type: "functional", platforms: ["S/4HANA", "ECC"], availability: "Available", icon: "Boxes" },
  { code: "SD", name: "Sales & Distribution", desc: "Order-to-cash, pricing, shipping and billing.", type: "functional", platforms: ["S/4HANA", "ECC"], availability: "Available", icon: "Truck" },
  { code: "PP", name: "Production Planning", desc: "MRP, routings, BOMs and shop-floor execution.", type: "functional", platforms: ["S/4HANA", "ECC"], availability: "Available", icon: "Factory" },
  { code: "PM", name: "Plant Maintenance", desc: "Equipment, notifications and maintenance orders.", type: "functional", platforms: ["ECC"], availability: "Available", icon: "Wrench" },
  { code: "QM", name: "Quality Management", desc: "Inspection lots, plans and quality notifications.", type: "functional", platforms: ["ECC"], availability: "Available", icon: "BadgeCheck" },
  { code: "PS", name: "Project System", desc: "WBS, networks, budgeting and settlement.", type: "functional", platforms: ["ECC"], availability: "Limited slots", icon: "GitBranch" },
  { code: "HCM", name: "Human Capital Management", desc: "PA, OM, time management and payroll basics.", type: "functional", platforms: ["ECC"], availability: "Available", icon: "Users" },
  { code: "EWM", name: "Extended Warehouse Management", desc: "Warehouse tasks, RF and stock strategies.", type: "functional", platforms: ["S/4HANA"], availability: "Available", icon: "Warehouse" },
  { code: "WM", name: "Warehouse Management", desc: "Classic bins, transfer orders and putaway.", type: "functional", platforms: ["ECC"], availability: "Available", icon: "PackageSearch" },
  { code: "TM", name: "Transportation Management", desc: "Freight orders, planning and settlement.", type: "functional", platforms: ["S/4HANA"], availability: "Limited slots", icon: "Route" },
  { code: "IBP", name: "Integrated Business Planning", desc: "Demand, supply and response planning practice.", type: "functional", platforms: ["S/4HANA"], availability: "Limited slots", icon: "LineChart" },
  { code: "Ariba", name: "SAP Ariba", desc: "Sourcing and procurement process exposure.", type: "functional", platforms: ["S/4HANA"], availability: "Limited slots", icon: "ShoppingCart" },
  { code: "SF", name: "SuccessFactors", desc: "Employee central and talent process practice.", type: "functional", platforms: ["S/4HANA"], availability: "Limited slots", icon: "UserCheck" },

  { code: "ABAP", name: "SAP ABAP", desc: "Reports, ALV, OO ABAP, enhancements and CDS.", type: "technical", platforms: ["S/4HANA", "ECC"], availability: "Available", icon: "Code2" },
  { code: "Basis", name: "SAP Basis", desc: "Client admin, transports, users and monitoring.", type: "technical", platforms: ["S/4HANA", "ECC", "HANA"], availability: "Available", icon: "Settings2" },
  { code: "HANA", name: "SAP HANA", desc: "Modelling, calculation views and SQLScript.", type: "technical", platforms: ["HANA"], availability: "Available", icon: "Database" },
  { code: "Fiori", name: "SAP Fiori", desc: "Launchpad, catalogs, groups and app configuration.", type: "technical", platforms: ["S/4HANA"], availability: "Available", icon: "LayoutGrid" },
  { code: "UI5", name: "SAP UI5", desc: "Custom app development with OData services.", type: "technical", platforms: ["S/4HANA"], availability: "Available", icon: "AppWindow" },
  { code: "BTP", name: "SAP BTP", desc: "Extensions, CAP basics and cloud services.", type: "technical", platforms: ["S/4HANA"], availability: "Limited slots", icon: "Cloud" },
  { code: "Security", name: "SAP Security", desc: "Roles, authorizations, PFCG and audits.", type: "technical", platforms: ["S/4HANA", "ECC"], availability: "Available", icon: "Lock" },
  { code: "BW", name: "SAP BW", desc: "InfoObjects, DSOs, transformations and loads.", type: "technical", platforms: ["ECC", "HANA"], availability: "Available", icon: "Layers" },
  { code: "BI", name: "SAP BI", desc: "Reporting, queries and analytics practice.", type: "technical", platforms: ["HANA"], availability: "Limited slots", icon: "BarChart3" },
  { code: "PI/PO", name: "SAP Integration", desc: "Interfaces, IDocs, proxies and mappings.", type: "technical", platforms: ["ECC", "S/4HANA"], availability: "Available", icon: "Network" },
  { code: "SolMan", name: "Solution Manager", desc: "ChaRM, monitoring and system landscape setup.", type: "technical", platforms: ["ECC"], availability: "Limited slots", icon: "Workflow" },
];

export const billingCycles = [
  { id: "monthly", label: "Monthly", multiplier: 1, months: 1, note: "" },
  { id: "quarterly", label: "Quarterly", multiplier: 0.9, months: 3, note: "Save 10%" },
  { id: "yearly", label: "Yearly", multiplier: 0.75, months: 12, note: "Save 25%" },
] as const;

export type BillingCycleId = (typeof billingCycles)[number]["id"];

export type Plan = {
  id: string;
  name: string;
  audience: string;
  monthly: number | null;
  highlight?: boolean;
  cta: string;
  features: string[];
};

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    audience: "For learners",
    monthly: 1300,
    cta: "Get Starter Server",
    features: ["SAP ECC & S/4HANA Access", "SAP GUI & Fiori Ready", "Remote Access, 24/7", "Pre-configured Modules", "Weekly Backups", "Standard Support"],
  },
  {
    id: "professional",
    name: "Professional",
    audience: "For working professionals",
    monthly: 2000,
    highlight: true,
    cta: "Get Professional Server",
    features: ["Everything in Starter", "All Functional Modules", "IDES Sample Data Included", "Daily Snapshots", "Longer Practice Sessions", "Priority Support"],
  },
  {
    id: "advanced",
    name: "Advanced",
    audience: "For consultants",
    monthly: 3000,
    cta: "Get Advanced Server",
    features: ["Everything in Professional", "Technical Modules (ABAP, Basis, HANA)", "Up to 5 User Logins", "Custom Client Copies", "Migration Practice Access", "Priority Support"],
  },
  {
    id: "dedicated",
    name: "Dedicated",
    audience: "Custom",
    monthly: null,
    cta: "Contact Sales",
    features: ["Everything in Advanced", "Fully Private Landscape", "Custom Modules & Data", "Unlimited User Logins", "Dedicated Resources", "Named Support Contact"],
  },
];

export const comparison = {
  plans: ["Starter", "Professional", "Advanced", "Dedicated"],
  rows: [
    { feature: "Functional Modules", values: ["Core", "All", "All", "Custom"] },
    { feature: "Technical Modules", values: ["—", "—", "Yes", "Custom"] },
    { feature: "IDES Sample Data", values: ["—", "Yes", "Yes", "Custom"] },
    { feature: "SAP Version", values: ["ECC / S/4HANA", "ECC / S/4HANA", "ECC / S/4HANA / HANA", "Any supported"] },
    { feature: "Users", values: ["1", "2", "5", "Custom"] },
    { feature: "Remote Access", values: ["Yes", "Yes", "Yes", "Yes"] },
    { feature: "Support", values: ["Standard", "Priority", "Priority", "Named contact"] },
    { feature: "Backup", values: ["Weekly", "Daily", "Daily", "Custom"] },
    { feature: "Monitoring", values: ["Basic", "Standard", "Advanced", "Advanced"] },
    { feature: "Duration", values: ["1–12 months", "1–12 months", "1–12 months", "Custom term"] },
    { feature: "Dedicated Resources", values: ["No", "No", "Partial", "Yes"] },
  ],
};

export const metrics = [
  { value: 99.9, suffix: "%", label: "Target platform uptime" },
  { value: 10000, suffix: "+", label: "Sessions delivered" },
  { value: 50, suffix: "+", label: "SAP environments" },
  { value: 24, suffix: "/7", label: "Access & support window" },
  { value: null, display: "Instant", label: "Server activation" },
  { value: 100, suffix: "%", label: "Private access credentials" },
];

export const steps = [
  { no: "01", title: "Choose Server", desc: "Pick your SAP version, module and plan duration.", icon: "MousePointerClick" },
  { no: "02", title: "Configure Environment", desc: "We prepare the client, users and module access.", icon: "Settings2" },
  { no: "03", title: "Receive Access", desc: "Credentials and connection details are shared with you.", icon: "KeyRound" },
  { no: "04", title: "Start Working", desc: "Log in from SAP GUI or browser and get to work.", icon: "Rocket" },
];

export const useCases = [
  { title: "SAP Training", desc: "Institute batches with per-student clients.", icon: "GraduationCap" },
  { title: "Hands-on Practice", desc: "Repeat end-to-end cycles without limits.", icon: "Repeat" },
  { title: "Consultant Practice", desc: "Stay current between billable projects.", icon: "Briefcase" },
  { title: "Trainer Labs", desc: "Shared labs with trainer-level control.", icon: "Presentation" },
  { title: "Development", desc: "ABAP, Fiori and integration builds.", icon: "Code2" },
  { title: "Testing", desc: "Functional and regression validation.", icon: "FlaskConical" },
  { title: "POC", desc: "Prove an approach before committing.", icon: "Lightbulb" },
  { title: "Demo", desc: "Client-facing walkthrough environments.", icon: "MonitorPlay" },
  { title: "Sandbox", desc: "Break things safely, reset quickly.", icon: "Boxes" },
  { title: "Integration Testing", desc: "IDocs, proxies and middleware flows.", icon: "Network" },
  { title: "Certification Prep", desc: "Structured practice before exams.", icon: "BadgeCheck" },
  { title: "Corporate Learning", desc: "Upskilling programs at team scale.", icon: "Building2" },
];

export const testimonials = [
  { name: "Placeholder Name", role: "SAP MM Consultant", quote: "Access details arrived quickly and the environment stayed stable through a full procurement cycle.", stars: 5, initials: "PN" },
  { name: "Placeholder Name", role: "SAP Trainer", quote: "Running a batch of learners on separate clients removed all the setup work from my week.", stars: 5, initials: "PN" },
  { name: "Placeholder Name", role: "SAP ABAP Developer", quote: "Developer access with transport handling meant I could test enhancements the same day.", stars: 5, initials: "PN" },
  { name: "Placeholder Name", role: "SAP FICO Consultant", quote: "Clean client, realistic master data, and support that answered configuration questions fast.", stars: 5, initials: "PN" },
  { name: "Placeholder Name", role: "SAP Basis Administrator", quote: "Useful for practising client copies, transports and monitoring without touching production.", stars: 5, initials: "PN" },
];

export const faqs = [
  { q: "What SAP versions are available?", a: "We provide SAP ECC and SAP S/4HANA based environments, along with SAP HANA database access. Tell us your target version and we will confirm current availability." },
  { q: "Which SAP modules are available?", a: "Functional modules such as FICO, MM, SD, PP, PM, QM, PS, HCM, EWM, WM and TM, plus technical stacks including ABAP, Basis, HANA, Fiori, UI5, BTP, Security, BW, BI and Integration." },
  { q: "Do you provide S/4HANA?", a: "Yes. S/4HANA based practice, development and demo environments are available in shared and dedicated configurations." },
  { q: "Do you provide SAP HANA?", a: "Yes. HANA database access is available for modelling, SQLScript and administration practice." },
  { q: "Can trainers use the environment?", a: "Yes. Trainer setups support multiple learners with separate users or clients, and can be sized for your batch." },
  { q: "Can I get a dedicated server?", a: "Yes. Dedicated plans give you isolated resources with a custom RAM, CPU, storage and landscape configuration." },
  { q: "How quickly is the server activated?", a: "Standard plans are typically prepared shortly after your requirement is confirmed. Custom and dedicated landscapes take longer depending on scope." },
  { q: "Can I extend my server?", a: "Yes. You can extend an active plan before expiry and keep the same environment and data." },
  { q: "Do you provide technical support?", a: "Yes. Our team helps with connection, access and environment issues during the support window included in your plan." },
  { q: "What happens after expiration?", a: "Access is disabled at the end of your term. Data is retained for a short grace period so you can renew without losing your work." },
];

export const footerColumns = [
  { title: "SAP Servers", links: ["S/4HANA", "ECC", "HANA", "Dedicated", "Shared", "Practice"] },
  { title: "SAP Modules", links: ["Functional", "Technical", "All Modules", "Module Comparison"] },
  { title: "Solutions", links: ["Training", "Development", "Testing", "Demo & POC", "Consultant Practice", "Corporate Learning"] },
  { title: "Resources", links: ["Blog", "Knowledge Base", "Guides", "FAQs", "System Requirements"] },
  { title: "Company", links: ["About", "Why ServerFY", "Infrastructure", "Careers", "Contact"] },
  { title: "Support", links: ["Contact Support", "Server Status", "Terms", "Privacy", "Refund Policy", "SLA"] },
];

export const functionalList = ["FICO", "MM", "SD", "PP", "PM", "QM", "HCM", "EWM", "TM"];
export const technicalList = ["ABAP", "Basis", "HANA", "Fiori", "UI5", "BTP", "Security", "Integration", "BW"];
