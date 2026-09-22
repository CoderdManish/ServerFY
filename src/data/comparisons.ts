/**
 * Comparison pages — for visitors who are already evaluating options
 * (and for AI answers that need a side-by-side table in crawlable HTML).
 */
export type ComparisonRow = { label: string; a: string; b: string; c?: string };

export type ComparisonPage = {
  slug: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  description: string;
  keywords?: string;
  question: string;
  answer: string;
  columns: string[];
  rows: ComparisonRow[];
  verdict: { title: string; items: string[] };
  faq: { q: string; a: string }[];
  related: { label: string; to: string }[];
};

export const comparisonPages: ComparisonPage[] = [
  {
    slug: "sap-cloud-server-vs-sap-practice-server",
    eyebrow: "Comparison",
    title: "SAP cloud server vs SAP practice server",
    metaTitle: "SAP Cloud Server vs SAP Practice Server — What's the Difference? | ServerFY",
    description:
      "A plain comparison of a full SAP cloud deployment and a rented SAP practice server: purpose, cost, licensing, data, admin effort and who each one suits.",
    keywords: "sap cloud server vs practice server, sap practice server, sap cloud hosting",
    question: "What is the difference between an SAP cloud server and an SAP practice server?",
    answer:
      "An SAP cloud server is a full deployment you own and license, sized for real business operations and managed by your Basis team. An SAP practice server is a rented, pre-installed non-production system used only for learning, configuration practice, development and demos. The practice server costs a fraction of the price because you rent a user on an already-built system instead of buying licences and infrastructure.",
    columns: ["SAP cloud server", "SAP practice server"],
    rows: [
      { label: "Purpose", a: "Run live business processes", b: "Learn, configure, develop, test, demo" },
      { label: "Data", a: "Your real business data", b: "Sample / IDES-style data" },
      { label: "Licensing", a: "Your own SAP licence agreement", b: "Included in the access rental" },
      { label: "Setup time", a: "Weeks to months", b: "Usually the same working day" },
      { label: "Administration", a: "Your Basis team or partner", b: "Handled by the provider" },
      { label: "Typical commitment", a: "Annual contracts", b: "Monthly access periods" },
      { label: "Suits", a: "Businesses running SAP", b: "Learners, consultants, trainers, project teams" },
    ],
    verdict: {
      title: "Which should you choose?",
      items: [
        "Choose a practice server if the goal is skills, configuration rehearsal, ABAP development or a demo.",
        "Choose a cloud deployment if you are running actual company transactions and need support SLAs and compliance.",
        "Many teams use both: a practice environment for preparation and their own landscape for delivery.",
      ],
    },
    faq: [
      {
        q: "Can I use a practice server for client work?",
        a: "You can use it to prepare, prototype and rehearse configuration, but it is not intended for live business data or production processing.",
      },
      {
        q: "Do I need my own SAP licence for a practice server?",
        a: "No. You rent access to an already-licensed learning environment for the agreed period.",
      },
    ],
    related: [
      { label: "SAP practice servers", to: "/servers/sap-practice-servers" },
      { label: "Pricing", to: "/pricing" },
    ],
  },
  {
    slug: "dedicated-sap-server-vs-shared-sap-environment",
    eyebrow: "Comparison",
    title: "Dedicated SAP server vs shared SAP environment",
    metaTitle: "Dedicated SAP Server vs Shared SAP Environment — Which to Pick | ServerFY",
    description:
      "Compare a dedicated SAP environment with a shared SAP server: control, performance, data isolation, cost and the situations each one fits.",
    keywords: "dedicated sap server, shared sap server, sap server comparison",
    question: "Should I take a dedicated SAP server or a shared SAP environment?",
    answer:
      "A shared SAP environment gives you your own user on a system other learners also use — the cheapest way to practise transactions and configuration. A dedicated SAP server reserves the whole system for you or your team, with administrator freedom, isolated data and no contention. Individuals learning modules are well served by shared access; trainers, batches and project teams normally need dedicated.",
    columns: ["Dedicated", "Shared"],
    rows: [
      { label: "Users on the system", a: "Only you or your team", b: "Several learners, separate users" },
      { label: "Admin rights", a: "Administrator-level access", b: "Standard practice user" },
      { label: "Data isolation", a: "Complete", b: "Separate users, common system" },
      { label: "Performance", a: "No contention", b: "Shared compute at peak times" },
      { label: "Client / transport control", a: "Yes", b: "Limited" },
      { label: "Relative cost", a: "Higher", b: "Lowest" },
      { label: "Best for", a: "Trainers, batches, project teams, POCs", b: "Individual practice and interview prep" },
    ],
    verdict: {
      title: "Which should you choose?",
      items: [
        "Pick shared if you are one learner practising module transactions and configuration.",
        "Pick dedicated if you need client creation, transports, custom development or guaranteed performance for a batch.",
        "You can start shared and move to dedicated later; we carry your work across where possible.",
      ],
    },
    faq: [
      {
        q: "Will other users see my work on a shared server?",
        a: "Each learner works with their own user and practice data range, but the system is common, so treat it as a classroom rather than a private landscape.",
      },
      {
        q: "Can a dedicated server host my whole training batch?",
        a: "Yes. We create the users before the batch starts and size the environment to the number of participants.",
      },
    ],
    related: [
      { label: "SAP dedicated server access", to: "/servers/sap-dedicated-server-access" },
      { label: "SAP shared server access", to: "/servers/sap-shared-server-access" },
    ],
  },
  {
    slug: "sap-ecc-vs-sap-s4hana-practice-environment",
    eyebrow: "Comparison",
    title: "SAP ECC vs SAP S/4HANA practice environment",
    metaTitle: "SAP ECC vs SAP S/4HANA Practice Environment — Which to Learn | ServerFY",
    description:
      "Compare an ECC practice system with an S/4HANA practice environment: database, user interface, data model, module scope and which one to learn first.",
    keywords: "sap ecc vs s4hana, sap s4hana practice server, sap ecc practice server",
    question: "Should I practise on SAP ECC or SAP S/4HANA?",
    answer:
      "SAP S/4HANA is the current generation — it runs on the SAP HANA database, uses the Fiori launchpad alongside SAP GUI, and has a simplified data model (for example the Universal Journal in finance). SAP ECC is the older ERP release that many companies still run, so ECC skills remain in demand for support and migration projects. If you are starting today, learn S/4HANA; add ECC if your target employers or clients still run it.",
    columns: ["SAP ECC", "SAP S/4HANA"],
    rows: [
      { label: "Database", a: "Any supported DB (Oracle, DB2, MaxDB…)", b: "SAP HANA in-memory" },
      { label: "Interface", a: "SAP GUI", b: "SAP GUI plus Fiori launchpad" },
      { label: "Finance data model", a: "Separate FI and CO tables", b: "Universal Journal (ACDOCA)" },
      { label: "Logistics", a: "Classic MM / SD tables", b: "Simplified tables, business partner model" },
      { label: "Still used in the market", a: "Widely, in support and migration projects", b: "New implementations and migrations" },
      { label: "Best for", a: "Support roles, ECC-based interviews", b: "New projects, migration and future-proof skills" },
    ],
    verdict: {
      title: "Which should you choose?",
      items: [
        "Learning from scratch: start with S/4HANA.",
        "Working on an ECC support project or interviewing for one: practise on ECC.",
        "Preparing for a migration role: use both, so you can explain before-and-after behaviour.",
      ],
    },
    faq: [
      {
        q: "Do ECC skills still transfer to S/4HANA?",
        a: "Largely yes — the business processes and much of the configuration logic carry over; the data model, Fiori apps and some transactions differ.",
      },
      {
        q: "Can I take both systems?",
        a: "Yes. Many learners rent both for a period so they can compare the same process on each release.",
      },
    ],
    related: [
      { label: "SAP S/4HANA server access", to: "/servers/sap-s4-hana-server-access" },
      { label: "SAP ECC server access", to: "/servers/sap-ecc-server-access" },
    ],
  },
  {
    slug: "sap-server-vs-local-installation",
    eyebrow: "Comparison",
    title: "Remote SAP server vs local SAP installation",
    metaTitle: "Remote SAP Server vs Local SAP Installation — Which Is Better | ServerFY",
    description:
      "Compare renting a remote SAP practice server with installing SAP on your own laptop: hardware, setup time, stability, maintenance and cost.",
    keywords: "sap local installation, install sap on laptop, remote sap server access",
    question: "Is it better to install SAP locally or use a remote SAP server?",
    answer:
      "Installing SAP locally needs a powerful machine — realistically 32 GB or more of RAM for an S/4HANA appliance — plus days of setup and ongoing maintenance, and it ties up your laptop whenever you study. A remote SAP server runs on hosted infrastructure; you only install SAP GUI and connect, so an ordinary laptop with a stable internet connection is enough and the system is ready the same day.",
    columns: ["Remote SAP server", "Local installation"],
    rows: [
      { label: "Your hardware", a: "Any laptop that runs SAP GUI", b: "High-RAM workstation" },
      { label: "Setup time", a: "Same working day", b: "Days, plus troubleshooting" },
      { label: "Maintenance", a: "Handled for you", b: "You patch, back up and fix" },
      { label: "Portability", a: "Log in from any machine", b: "Tied to one machine" },
      { label: "Upfront cost", a: "Monthly access fee", b: "Hardware purchase" },
      { label: "Risk", a: "Depends on internet connection", b: "A broken install stops your study" },
    ],
    verdict: {
      title: "Which should you choose?",
      items: [
        "Rent remote access if you want to start practising this week without buying hardware.",
        "Install locally only if you specifically want Basis installation experience and already own the hardware.",
      ],
    },
    faq: [
      {
        q: "How much internet speed do I need?",
        a: "SAP GUI is light on bandwidth — a stable connection of about 2 Mbps is comfortable; stability matters more than raw speed.",
      },
      {
        q: "Can I install SAP GUI on macOS?",
        a: "Yes, SAP GUI for Java runs on macOS and Linux and connects to the same system.",
      },
    ],
    related: [
      { label: "SAP server system requirements", to: "/resources/sap-server-system-requirements" },
      { label: "SAP server access", to: "/servers/sap-server-access" },
    ],
  },
  {
    slug: "8gb-vs-16gb-vs-32gb-sap-server",
    eyebrow: "Comparison",
    title: "8 GB vs 16 GB vs 32 GB SAP server",
    metaTitle: "8 GB vs 16 GB vs 32 GB SAP Server — How Much RAM Do You Need | ServerFY",
    description:
      "How much memory an SAP practice environment needs: what 8 GB, 16 GB and 32 GB configurations comfortably run, and how many users each supports.",
    keywords: "sap server ram requirements, sap hana memory requirements, how much ram for sap",
    question: "How much RAM does an SAP practice server need?",
    answer:
      "Memory is the limiting resource for SAP, especially on HANA. As a general guide, an 8 GB configuration suits light SAP GUI practice for a single learner on an ECC-style system; 16 GB is the comfortable middle for S/4HANA with Fiori and a small group; 32 GB and above is for dedicated environments, development work and training batches where several people work at once.",
    columns: ["8 GB", "16 GB", "32 GB+"],
    rows: [
      { label: "Typical use", a: "Single learner, GUI transactions", b: "S/4HANA with Fiori, small group", c: "Batches, development, POCs" },
      { label: "Concurrent users", a: "1", b: "A few", c: "Many" },
      { label: "Fiori launchpad", a: "Limited", b: "Comfortable", c: "Comfortable with heavy use" },
      { label: "Custom ABAP development", a: "Basic", b: "Suitable", c: "Recommended" },
      { label: "Relative cost", a: "Lowest", b: "Balanced", c: "Highest" },
    ],
    verdict: {
      title: "Which should you choose?",
      items: [
        "Practising module transactions alone: the smaller configuration is usually enough.",
        "Working with S/4HANA, Fiori and configuration: choose the mid configuration.",
        "Running a batch, a POC or heavy development: take a dedicated, higher-memory environment.",
        "Tell us your module and number of users and we will confirm the exact sizing before you pay.",
      ],
    },
    faq: [
      {
        q: "Does the RAM refer to my laptop?",
        a: "No. It is the memory allocated to the hosted SAP system. Your own machine only needs to run SAP GUI.",
      },
      {
        q: "Can I upgrade memory mid-rental?",
        a: "Yes. Environments can be moved to a larger configuration during the access period and your work carries over.",
      },
    ],
    related: [
      { label: "SAP server system requirements", to: "/resources/sap-server-system-requirements" },
      { label: "Pricing", to: "/pricing" },
    ],
  },
];

export function findComparison(slug: string) {
  return comparisonPages.find((p) => p.slug === slug);
}
