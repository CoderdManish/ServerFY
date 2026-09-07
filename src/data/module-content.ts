/**
 * Rich, per-module page content used by <ModulePageView />.
 * Every SAP module page shares the exact same section structure; only the
 * content below changes per module. Modules without an entry fall back to a
 * generated set derived from src/data/serverfy.ts.
 */
import { modules, type SapModule } from "@/data/serverfy";

export type PracticeArea = { title: string; icon: string; items: string[] };
export type Tcode = { activity: string; code: string };
export type CompareRow = { feature: string; ecc: string; s4: string };
export type Scenario = { title: string; desc: string };

export type ModuleContent = {
  whatIs: string;
  flowLabel: string;
  flow: { label: string; icon: string }[];
  areas: PracticeArea[];
  tcodes: Tcode[];
  configTitle: string;
  config: string[];
  compare: CompareRow[];
  scenarios: Scenario[];
  imgTree: { node: string; children: string[] };
  menuTree: string[];
};

/* --------------------------- Shared page furniture -------------------------- */

export const heroChips = [
  { title: "Live SAP Environment", icon: "Server" },
  { title: "ECC & S/4HANA Options", icon: "Layers" },
  { title: "Personal Login", icon: "UserCheck" },
  { title: "Configuration Access", icon: "SlidersHorizontal" },
];

export const audience = [
  { title: "Students", desc: "Practice concepts learned during training.", icon: "GraduationCap" },
  { title: "Consultants", desc: "Test transactions and configurations for projects.", icon: "Briefcase" },
  { title: "Professionals", desc: "Refresh skills and explore new processes.", icon: "Users" },
  { title: "Beginners", desc: "Gain hands-on experience on a real SAP system.", icon: "Rocket" },
  { title: "Trainers", desc: "Demonstrate real processes during training sessions.", icon: "Presentation" },
];

export const moduleSteps = [
  { no: "01", title: "Choose Your Plan", desc: "Select ECC or S/4HANA and your preferred access duration.", icon: "MousePointerClick" },
  { no: "02", title: "Get Your Login", desc: "Receive your SAP credentials and connection instructions.", icon: "KeyRound" },
  { no: "03", title: "Start Practicing", desc: "Log in and begin working on real SAP transactions.", icon: "Rocket" },
];

export const whyChoose = [
  { title: "Real SAP Environment", desc: "Practise on a live system, not a simulation.", icon: "Server" },
  { title: "Multiple Environments", desc: "ECC and S/4HANA options available.", icon: "Layers" },
  { title: "Personal Access", desc: "Your own SAP login, private workspace.", icon: "UserCheck" },
  { title: "Hands-On Learning", desc: "Practise transactions and configuration.", icon: "MousePointerClick" },
  { title: "No Setup Required", desc: "Access remotely without infrastructure hassle.", icon: "Wifi" },
  { title: "Technical Support", desc: "Get assistance whenever you need help.", icon: "Headphones" },
];

export const modulePlans = [
  {
    name: "Free Demo",
    term: "24 Hours",
    features: ["Live SAP environment", "Personal login", "Basic transactions", "Remote access"],
    cta: "Get Free Demo",
    href: "/contact",
    highlight: false,
  },
  {
    name: "Monthly Access",
    term: "30 Days",
    features: ["Full module practice access", "Transactions & configuration", "Technical support", "Best for learning & self-practice"],
    cta: "Get Started",
    href: "/pricing",
    highlight: true,
  },
  {
    name: "Consultant / Project Access",
    term: "Custom",
    features: ["Dedicated environment", "Extended access", "Custom requirements", "Priority support"],
    cta: "Talk to an Expert",
    href: "/contact",
    highlight: false,
  },
];

export function moduleSpecs(mod: SapModule) {
  return [
    { label: "SAP Environment", value: mod.platforms.join(" / ") },
    { label: "SAP Version", value: "EhP 7 / S/4HANA 2022 (varies)" },
    { label: "Database", value: mod.platforms.includes("HANA") ? "HANA" : "HANA / AnyDB" },
    { label: "RAM", value: "High performance (as per plan)" },
    { label: "CPU", value: "Dedicated resources" },
    { label: "Storage", value: "Optimised for practice" },
    { label: "Access", value: "Remote (SAP GUI / Fiori)" },
    { label: "User Login", value: "Individual credentials" },
    { label: "Availability", value: "99% uptime" },
    { label: "Support", value: "WhatsApp / Email" },
    { label: "Access Duration", value: "24 hours / 7 days / 30 days (custom)" },
  ];
}

/* ------------------------------ Module content ------------------------------ */

const content: Record<string, ModuleContent> = {
  MM: {
    whatIs:
      "SAP MM (Materials Management) is a key module in SAP used to manage material, master planning, inventory and purchasing-related business processes. It connects purchasing activities with inventory, goods movements, material valuation and invoice verification.",
    flowLabel: "Complete Procure-to-Pay Process",
    flow: [
      { label: "Material Requirement", icon: "Boxes" },
      { label: "Purchase Requisition", icon: "FileText" },
      { label: "Purchase Order", icon: "ShoppingCart" },
      { label: "Goods Receipt", icon: "PackageSearch" },
      { label: "Invoice Verification", icon: "Wallet" },
      { label: "Payment", icon: "Calculator" },
    ],
    areas: [
      { title: "Material Master", icon: "Boxes", items: ["Create / Change / Display", "Maintain material views", "Material types", "Units of measure"] },
      { title: "Vendor Master", icon: "Users", items: ["Create vendor", "Maintain purchasing data", "Supplier information", "Business partner (S/4HANA)"] },
      { title: "Purchasing", icon: "ShoppingCart", items: ["Purchase requisition", "RFQ and quotation", "Purchase order", "PO changes and release"] },
      { title: "Inventory Management", icon: "Warehouse", items: ["Goods receipt", "Goods issue", "Stock transfer", "Physical inventory"] },
      { title: "Invoice Verification", icon: "FileText", items: ["Invoice posting", "GR/IR concepts", "Invoice verification", "Invoice blocks"] },
      { title: "Valuation", icon: "Calculator", items: ["Material valuation", "Price control", "Valuation areas", "Account determination"] },
    ],
    tcodes: [
      { activity: "Create Purchase Requisition", code: "ME51N" },
      { activity: "Change Purchase Requisition", code: "ME52N" },
      { activity: "Display Purchase Requisition", code: "ME53N" },
      { activity: "Create Purchase Order", code: "ME21N" },
      { activity: "Change Purchase Order", code: "ME22N" },
      { activity: "Display Purchase Order", code: "ME23N" },
      { activity: "Goods Receipt", code: "MIGO" },
      { activity: "Invoice Verification", code: "MIRO" },
      { activity: "Create Material Master", code: "MM01" },
      { activity: "Display Stock", code: "MB52" },
    ],
    configTitle: "SAP MM Configuration Practice",
    config: [
      "Enterprise structure",
      "Purchasing organization",
      "Purchasing group",
      "Plant and storage locations",
      "Material types and number ranges",
      "Purchase document types",
      "Release strategy",
      "Pricing procedure",
      "Account determination",
      "Inventory management settings",
      "Output configuration",
    ],
    compare: [
      { feature: "MM Processes", ecc: "yes", s4: "yes" },
      { feature: "Purchasing", ecc: "yes", s4: "yes" },
      { feature: "Inventory Management", ecc: "yes", s4: "yes" },
      { feature: "Invoice Verification", ecc: "yes", s4: "yes" },
      { feature: "Configuration (SPRO)", ecc: "Partial", s4: "Partial" },
      { feature: "Business Partner", ecc: "—", s4: "yes" },
      { feature: "Fiori Apps", ecc: "Limited", s4: "yes" },
    ],
    scenarios: [
      { title: "Create a Material", desc: "Create and maintain a material master with required views." },
      { title: "Create a Purchase Requisition", desc: "Enter material, quantity, plant and submit." },
      { title: "Create a Purchase Order", desc: "Select vendor, enter material and price, save PO." },
      { title: "Goods Receipt", desc: "Post goods receipt and check stock." },
      { title: "Invoice Verification", desc: "Reference PO and post invoice." },
      { title: "Stock Transfer", desc: "Transfer material between storage locations / plants." },
    ],
    imgTree: {
      node: "Materials Management",
      children: ["Purchasing", "Inventory Management", "Invoice Verification", "Physical Inventory", "Valuation and Account Assignment"],
    },
    menuTree: ["Purchasing", "Inventory Management", "Invoice Verification", "Material Master", "Vendor Master", "Environment"],
  },

  FICO: {
    whatIs:
      "SAP FICO combines Financial Accounting (FI) and Controlling (CO). FI records every external accounting document — general ledger, payables, receivables and assets — while CO gives management the cost and profitability view of the same postings.",
    flowLabel: "Complete Record-to-Report Process",
    flow: [
      { label: "Master Data", icon: "Database" },
      { label: "Document Posting", icon: "FileText" },
      { label: "Open Item Clearing", icon: "Repeat" },
      { label: "Cost Allocation", icon: "GitCompare" },
      { label: "Period Close", icon: "CalendarClock" },
      { label: "Financial Reporting", icon: "BarChart3" },
    ],
    areas: [
      { title: "General Ledger", icon: "Calculator", items: ["GL master records", "Document posting", "Parking and holding", "Account balances"] },
      { title: "Accounts Payable", icon: "Wallet", items: ["Vendor invoices", "Outgoing payments", "Down payments", "Payment run F110"] },
      { title: "Accounts Receivable", icon: "Users", items: ["Customer invoices", "Incoming payments", "Dunning", "Credit memos"] },
      { title: "Asset Accounting", icon: "Building2", items: ["Asset master", "Acquisition & retirement", "Depreciation run", "Asset reports"] },
      { title: "Cost Centre Accounting", icon: "GitBranch", items: ["Cost centres", "Cost elements", "Assessments & distributions", "Plan vs actual"] },
      { title: "Internal Orders & PCA", icon: "LineChart", items: ["Internal orders", "Settlement", "Profit centres", "Profitability reporting"] },
    ],
    tcodes: [
      { activity: "Create GL Account", code: "FS00" },
      { activity: "Post GL Document", code: "FB50" },
      { activity: "Post Vendor Invoice", code: "FB60" },
      { activity: "Post Customer Invoice", code: "FB70" },
      { activity: "Outgoing Payment", code: "F-53" },
      { activity: "Automatic Payment Run", code: "F110" },
      { activity: "Display Document", code: "FB03" },
      { activity: "Create Asset Master", code: "AS01" },
      { activity: "Depreciation Run", code: "AFAB" },
      { activity: "Create Cost Centre", code: "KS01" },
    ],
    configTitle: "SAP FICO Configuration Practice",
    config: [
      "Company code and enterprise structure",
      "Chart of accounts and account groups",
      "Fiscal year and posting period variants",
      "Document types and number ranges",
      "Tolerance groups",
      "Automatic payment program",
      "Tax on sales and purchases",
      "Asset classes and depreciation areas",
      "Controlling area and cost element setup",
      "Cost centre and profit centre hierarchies",
    ],
    compare: [
      { feature: "GL / AP / AR", ecc: "yes", s4: "yes" },
      { feature: "Asset Accounting", ecc: "Classic", s4: "New" },
      { feature: "Universal Journal (ACDOCA)", ecc: "—", s4: "yes" },
      { feature: "Controlling", ecc: "yes", s4: "yes" },
      { feature: "Business Partner", ecc: "—", s4: "yes" },
      { feature: "Configuration (SPRO)", ecc: "Partial", s4: "Partial" },
      { feature: "Fiori Apps", ecc: "Limited", s4: "yes" },
    ],
    scenarios: [
      { title: "Create a GL Account", desc: "Maintain company code and chart of account segments." },
      { title: "Post a Vendor Invoice", desc: "Enter a vendor invoice with tax and cost assignment." },
      { title: "Run a Payment Proposal", desc: "Execute F110 and review the proposal list." },
      { title: "Acquire an Asset", desc: "Create an asset master and post the acquisition." },
      { title: "Run Depreciation", desc: "Execute the depreciation run and review postings." },
      { title: "Month-End Allocation", desc: "Assess cost centre balances and check the results." },
    ],
    imgTree: { node: "Financial Accounting", children: ["Global Settings", "General Ledger Accounting", "Accounts Payable", "Accounts Receivable", "Asset Accounting"] },
    menuTree: ["General Ledger", "Accounts Payable", "Accounts Receivable", "Asset Accounting", "Controlling", "Environment"],
  },

  SD: {
    whatIs:
      "SAP SD (Sales & Distribution) handles the complete order-to-cash process — from enquiry and quotation through sales orders, delivery, shipping and billing — and keeps pricing, availability and credit checks consistent across the cycle.",
    flowLabel: "Complete Order-to-Cash Process",
    flow: [
      { label: "Enquiry / Quotation", icon: "FileText" },
      { label: "Sales Order", icon: "ShoppingCart" },
      { label: "Availability Check", icon: "PackageSearch" },
      { label: "Delivery", icon: "Truck" },
      { label: "Goods Issue", icon: "Warehouse" },
      { label: "Billing", icon: "Wallet" },
    ],
    areas: [
      { title: "Customer Master", icon: "Users", items: ["Create / change customer", "Sales area data", "Partner functions", "Business partner (S/4HANA)"] },
      { title: "Sales Documents", icon: "ShoppingCart", items: ["Enquiry & quotation", "Standard order", "Rush & cash sales", "Returns"] },
      { title: "Pricing", icon: "Calculator", items: ["Condition records", "Pricing procedure", "Discounts & surcharges", "Taxes"] },
      { title: "Shipping", icon: "Truck", items: ["Outbound delivery", "Picking", "Packing", "Post goods issue"] },
      { title: "Billing", icon: "FileText", items: ["Invoice creation", "Billing plans", "Credit / debit memo", "Accounting interface"] },
      { title: "Credit & Availability", icon: "ShieldCheck", items: ["Credit master", "Credit checks", "ATP check", "Backorder handling"] },
    ],
    tcodes: [
      { activity: "Create Sales Order", code: "VA01" },
      { activity: "Change Sales Order", code: "VA02" },
      { activity: "Display Sales Order", code: "VA03" },
      { activity: "Create Outbound Delivery", code: "VL01N" },
      { activity: "Change Delivery / PGI", code: "VL02N" },
      { activity: "Create Billing Document", code: "VF01" },
      { activity: "Create Quotation", code: "VA21" },
      { activity: "Maintain Condition Records", code: "VK11" },
      { activity: "Create Customer Master", code: "XD01" },
      { activity: "List Sales Orders", code: "VA05" },
    ],
    configTitle: "SAP SD Configuration Practice",
    config: [
      "Enterprise structure and sales areas",
      "Sales document types",
      "Item categories and schedule lines",
      "Pricing procedure determination",
      "Condition types and access sequences",
      "Delivery and shipping point determination",
      "Billing types and copy control",
      "Credit management settings",
      "Account determination for revenue",
      "Output determination",
    ],
    compare: [
      { feature: "Order-to-Cash", ecc: "yes", s4: "yes" },
      { feature: "Pricing", ecc: "yes", s4: "yes" },
      { feature: "Shipping & Delivery", ecc: "yes", s4: "yes" },
      { feature: "Billing", ecc: "yes", s4: "yes" },
      { feature: "Credit Management", ecc: "Classic", s4: "FSCM" },
      { feature: "Business Partner", ecc: "—", s4: "yes" },
      { feature: "Fiori Apps", ecc: "Limited", s4: "yes" },
    ],
    scenarios: [
      { title: "Create a Sales Order", desc: "Enter customer, material and quantity, then save the order." },
      { title: "Maintain a Price", desc: "Create condition records and check pricing in the order." },
      { title: "Create a Delivery", desc: "Pick the order and create an outbound delivery." },
      { title: "Post Goods Issue", desc: "Post the goods issue and check the stock impact." },
      { title: "Create an Invoice", desc: "Bill the delivery and review the accounting document." },
      { title: "Process a Return", desc: "Create a return order, receipt and credit memo." },
    ],
    imgTree: { node: "Sales and Distribution", children: ["Master Data", "Basic Functions", "Sales", "Shipping", "Billing"] },
    menuTree: ["Master Data", "Sales", "Shipping and Transportation", "Billing", "Sales Support", "Environment"],
  },

  PP: {
    whatIs:
      "SAP PP (Production Planning) plans and executes manufacturing. It covers demand management, MRP, BOMs, work centres and routings, and the production orders that convert raw materials into finished goods.",
    flowLabel: "Complete Plan-to-Produce Process",
    flow: [
      { label: "Demand Management", icon: "LineChart" },
      { label: "MRP Run", icon: "Repeat" },
      { label: "Planned Order", icon: "FileText" },
      { label: "Production Order", icon: "Factory" },
      { label: "Confirmation", icon: "BadgeCheck" },
      { label: "Goods Receipt", icon: "PackageSearch" },
    ],
    areas: [
      { title: "Master Data", icon: "Database", items: ["Bill of material", "Work centre", "Routing", "MRP views"] },
      { title: "Demand Management", icon: "LineChart", items: ["Planned independent requirements", "Planning strategies", "Forecast", "Requirement types"] },
      { title: "MRP", icon: "Repeat", items: ["Single & total planning", "MRP list & stock requirements", "Lot sizing", "Exception messages"] },
      { title: "Production Orders", icon: "Factory", items: ["Create & release", "Component withdrawal", "Confirmations", "Technical completion"] },
      { title: "Capacity Planning", icon: "Gauge", items: ["Capacity evaluation", "Levelling", "Available capacity", "Dispatching"] },
      { title: "Costing & Close", icon: "Calculator", items: ["Order costing", "Variance calculation", "Settlement", "WIP"] },
    ],
    tcodes: [
      { activity: "Create Bill of Material", code: "CS01" },
      { activity: "Create Work Centre", code: "CR01" },
      { activity: "Create Routing", code: "CA01" },
      { activity: "MRP Run (Single Item)", code: "MD02" },
      { activity: "Stock / Requirements List", code: "MD04" },
      { activity: "Create Production Order", code: "CO01" },
      { activity: "Release / Change Order", code: "CO02" },
      { activity: "Order Confirmation", code: "CO11N" },
      { activity: "Goods Movement for Order", code: "MIGO" },
      { activity: "Planned Independent Requirements", code: "MD61" },
    ],
    configTitle: "SAP PP Configuration Practice",
    config: [
      "Plant and production organisational units",
      "MRP types and lot-sizing procedures",
      "Planning strategies and requirement types",
      "Order types and number ranges",
      "Work centre categories and formulas",
      "Routing and task list settings",
      "Confirmation parameters",
      "Availability check and scope of check",
      "Scheduling parameters",
      "Costing variants for production orders",
    ],
    compare: [
      { feature: "MRP", ecc: "Classic", s4: "MRP Live" },
      { feature: "BOM / Routing", ecc: "yes", s4: "yes" },
      { feature: "Production Orders", ecc: "yes", s4: "yes" },
      { feature: "Capacity Planning", ecc: "yes", s4: "yes" },
      { feature: "Configuration (SPRO)", ecc: "Partial", s4: "Partial" },
      { feature: "Advanced Planning", ecc: "—", s4: "yes" },
      { feature: "Fiori Apps", ecc: "Limited", s4: "yes" },
    ],
    scenarios: [
      { title: "Create a BOM", desc: "Build a multi-level bill of material for a finished product." },
      { title: "Create a Routing", desc: "Define operations, work centres and standard values." },
      { title: "Run MRP", desc: "Execute MRP and review the generated planned orders." },
      { title: "Convert to Production Order", desc: "Convert a planned order and release it." },
      { title: "Confirm Operations", desc: "Post confirmations and consume components." },
      { title: "Receive Finished Goods", desc: "Post goods receipt against the production order." },
    ],
    imgTree: { node: "Production Planning", children: ["Basic Data", "Demand Management", "Material Requirements Planning", "Capacity Planning", "Shop Floor Control"] },
    menuTree: ["Master Data", "Demand Management", "MRP", "Production Orders", "Capacity Planning", "Environment"],
  },

  ABAP: {
    whatIs:
      "SAP ABAP is the programming language and development stack behind every SAP application. On a live system you build reports, enhancements, interfaces and CDS views with real data, transports and developer keys.",
    flowLabel: "Complete Develop-to-Transport Cycle",
    flow: [
      { label: "Requirement", icon: "FileText" },
      { label: "Data Dictionary", icon: "Database" },
      { label: "Program / Object", icon: "Code2" },
      { label: "Unit Test", icon: "FlaskConical" },
      { label: "Transport Request", icon: "GitBranch" },
      { label: "Release", icon: "Rocket" },
    ],
    areas: [
      { title: "Data Dictionary", icon: "Database", items: ["Tables and views", "Data elements & domains", "Search helps", "Lock objects"] },
      { title: "Reports & ALV", icon: "BarChart3", items: ["Classical reports", "Selection screens", "ALV grid & list", "Interactive reports"] },
      { title: "Object-Oriented ABAP", icon: "Code2", items: ["Classes & interfaces", "Inheritance", "Events", "Exception classes"] },
      { title: "Enhancements", icon: "SlidersHorizontal", items: ["User exits", "BADIs", "Enhancement points", "Implicit enhancements"] },
      { title: "Interfaces", icon: "Network", items: ["BAPI", "RFC", "IDoc processing", "OData services"] },
      { title: "Modern ABAP", icon: "Layers", items: ["CDS views", "AMDP", "ABAP on HANA tuning", "Eclipse / ADT"] },
    ],
    tcodes: [
      { activity: "ABAP Editor", code: "SE38" },
      { activity: "Object Navigator", code: "SE80" },
      { activity: "Data Dictionary", code: "SE11" },
      { activity: "Class Builder", code: "SE24" },
      { activity: "Function Builder", code: "SE37" },
      { activity: "Screen Painter", code: "SE51" },
      { activity: "Smart Forms", code: "SMARTFORMS" },
      { activity: "Transport Organizer", code: "SE09" },
      { activity: "Runtime Analysis", code: "SAT" },
      { activity: "Debugger Breakpoints", code: "SE24 / SE38" },
    ],
    configTitle: "SAP ABAP Development Practice",
    config: [
      "Package and transport layer setup",
      "Developer key and object registration",
      "Naming conventions and namespaces",
      "Custom table creation and maintenance views",
      "Module pool and screen flow logic",
      "BAPI and RFC-enabled function modules",
      "IDoc extension and processing",
      "BADI implementation",
      "CDS view modelling",
      "Performance analysis and code inspector",
    ],
    compare: [
      { feature: "Classical ABAP", ecc: "yes", s4: "yes" },
      { feature: "OO ABAP", ecc: "yes", s4: "yes" },
      { feature: "CDS Views", ecc: "Limited", s4: "yes" },
      { feature: "AMDP", ecc: "—", s4: "yes" },
      { feature: "Eclipse / ADT", ecc: "Limited", s4: "yes" },
      { feature: "OData / Gateway", ecc: "Limited", s4: "yes" },
      { feature: "Fiori Extensions", ecc: "—", s4: "yes" },
    ],
    scenarios: [
      { title: "Build a Custom Table", desc: "Create a Z table with a maintenance view and test data." },
      { title: "Write an ALV Report", desc: "Build a selection screen and display results in an ALV grid." },
      { title: "Create a Class", desc: "Model business logic in an OO class and call it from a report." },
      { title: "Implement a BADI", desc: "Find the right BADI and add custom validation logic." },
      { title: "Expose an OData Service", desc: "Build a CDS view and consume it as an OData service." },
      { title: "Move a Transport", desc: "Collect objects in a request and release it." },
    ],
    imgTree: { node: "ABAP Workbench", children: ["Development", "Data Dictionary", "Enhancements", "Web Services", "Utilities"] },
    menuTree: ["ABAP Editor", "Object Navigator", "Data Dictionary", "Class Builder", "Transport Organizer", "Environment"],
  },
};

/* --------------------------- Generic fallback build -------------------------- */

function generic(mod: SapModule): ModuleContent {
  const technical = mod.type === "technical";
  return {
    whatIs: `SAP ${mod.code} (${mod.name}) is a core part of the SAP landscape. ${mod.desc} On our servers you work directly in the standard ${mod.code} screens with ready master data, so every step you practise behaves the way it does on a real project.`,
    flowLabel: `Typical ${mod.code} process cycle`,
    flow: [
      { label: "Master Data", icon: "Database" },
      { label: "Configuration", icon: "SlidersHorizontal" },
      { label: "Transaction Entry", icon: "FileText" },
      { label: "Processing", icon: "Repeat" },
      { label: "Documents", icon: "BadgeCheck" },
      { label: "Reporting", icon: "BarChart3" },
    ],
    areas: [
      { title: "Master Data", icon: "Database", items: ["Create master records", "Maintain views", "Number ranges", "Data consistency"] },
      { title: technical ? "Development" : "Configuration", icon: technical ? "Code2" : "SlidersHorizontal", items: technical ? ["Custom objects", "Enhancements", "Testing", "Transports"] : ["SPRO settings", "Document types", "Determination rules", "Number ranges"] },
      { title: "Daily Transactions", icon: "FileText", items: ["Create documents", "Change and display", "Reversals", "Mass processing"] },
      { title: "Integration", icon: "Network", items: ["Links to FI", "Links to MM / SD", "Interfaces", "Cross-module postings"] },
      { title: "Reporting", icon: "BarChart3", items: ["Standard reports", "List displays", "Analysis", "Fiori apps"] },
      { title: "Authorisations", icon: "Lock", items: ["Roles", "Objects", "Testing access", "Troubleshooting"] },
    ],
    tcodes: [
      { activity: "SAP Easy Access", code: "SESSION_MANAGER" },
      { activity: "Customising (IMG)", code: "SPRO" },
      { activity: "Table Display", code: "SE16N" },
      { activity: "ABAP Editor", code: "SE38" },
      { activity: "Transport Organizer", code: "SE09" },
      { activity: "User Maintenance", code: "SU01" },
      { activity: "Role Maintenance", code: "PFCG" },
      { activity: "System Status", code: "SM51" },
      { activity: "Job Monitoring", code: "SM37" },
      { activity: "Short Dump Analysis", code: "ST22" },
    ],
    configTitle: `SAP ${mod.code} configuration practice`,
    config: [
      "Enterprise structure assignment",
      "Organisational units",
      "Document types and number ranges",
      "Determination and control settings",
      "Integration with finance",
      "Output and form settings",
      "Authorisation objects",
      "Reporting variants",
    ],
    compare: [
      { feature: `${mod.code} Processes`, ecc: mod.platforms.includes("ECC") ? "yes" : "—", s4: mod.platforms.includes("S/4HANA") ? "yes" : "—" },
      { feature: "Master Data", ecc: mod.platforms.includes("ECC") ? "yes" : "—", s4: mod.platforms.includes("S/4HANA") ? "yes" : "—" },
      { feature: "Configuration (SPRO)", ecc: "Partial", s4: "Partial" },
      { feature: "Reporting", ecc: "Classic", s4: "Embedded" },
      { feature: "Business Partner", ecc: "—", s4: "yes" },
      { feature: "Fiori Apps", ecc: "Limited", s4: "yes" },
    ],
    scenarios: [
      { title: "Explore the menu", desc: `Walk the ${mod.code} area menu and understand where each task lives.` },
      { title: "Create master data", desc: "Create the master records the process depends on." },
      { title: "Run a core transaction", desc: "Execute the main daily transaction end to end." },
      { title: "Check the documents", desc: "Review the documents and postings that were produced." },
      { title: "Adjust configuration", desc: "Change a setting in SPRO and observe the effect." },
      { title: "Report on the result", desc: "Run the standard report and interpret the output." },
    ],
    imgTree: { node: mod.name, children: ["Basic Settings", "Master Data", "Transactions", "Integration", "Reporting"] },
    menuTree: ["Master Data", "Transactions", "Periodic Processing", "Information System", "Environment", "Tools"],
  };
}

export function moduleContent(mod: SapModule): ModuleContent {
  return content[mod.code] ?? generic(mod);
}

export function findModule(slugLower: string) {
  return modules.find((m) => m.code.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slugLower);
}
