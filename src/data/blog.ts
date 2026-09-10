/**
 * Blog content. Add a new object to `blogPosts` to publish a new article —
 * the listing page, article page, sitemap and JSON-LD all read from here.
 */
import beginnersCover from "@/assets/blog-sap-server-access-beginners.webp";

export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  keywords: string;
  category: string;
  tags: string[];
  author: string;
  authorRole: string;
  date: string; // ISO
  updated?: string; // ISO
  readMinutes: number;
  featured?: boolean;
  excerpt: string;
  intro: string;
  tint: "blue" | "orange" | "green" | "violet";
  icon: string;
  /** Imported cover image URL (optional). */
  cover?: string;
  coverAlt?: string;
  sections: BlogSection[];
  takeaways: string[];
  faq?: { q: string; a: string }[];
};

export const blogCategories = [
  "SAP Learning",
  "Server Access",
  "Performance",
  "Training Batches",
  "Modules",
  "SAP Server Access",
] as const;

export const blogPosts: BlogPost[] = [
  {
    slug: "sap-server-access-for-beginners",
    title: "SAP Server Access for Beginners: Complete Guide to SAP Practice Environments",
    metaTitle: "SAP Server Access for Beginners: Complete Practice Guide",
    description:
      "Learn what SAP server access is, why beginners need a practice environment, which SAP modules you can practice, and how to choose the right SAP server.",
    keywords:
      "SAP server access, SAP server access for beginners, SAP practice server, SAP practice environment, SAP server for practice, SAP training server, SAP S/4HANA practice server, SAP online practice server",
    category: "SAP Server Access",
    tags: ["SAP Server Access", "Practice Server", "Beginners", "S/4HANA"],
    author: "ServerFY Team",
    authorRole: "SAP Server Hosting & Infrastructure",
    date: "2026-09-10",
    readMinutes: 14,
    featured: true,
    tint: "blue",
    icon: "ServerCog",
    cover: beginnersCover,
    coverAlt:
      "SAP Server Access for Beginners — learner working in an SAP Easy Access screen on a laptop with SAP GUI, Fiori, browser and development tool access",
    excerpt:
      "What SAP server access is, who needs it, which modules you can practice, ECC vs S/4HANA, what to check before you buy and how to get started.",
    intro:
      "Learning SAP from videos, books, and online courses can help you understand the concepts. But if you want to build real confidence with SAP, you eventually need to work inside an actual SAP environment. This is where SAP server access becomes important.",
    sections: [
      {
        heading: "What is SAP server access?",
        paragraphs: [
          "SAP server access is the ability to connect to an SAP system hosted on a server or cloud infrastructure and use that environment for learning, development, testing, configuration, or professional practice. Depending on the environment, users may access SAP through tools such as SAP GUI, SAP Fiori, a web browser, or development tools.",
          "For beginners, the simplest way to understand it is: you receive authorized credentials, connect to an SAP environment, log in, and practice SAP processes and transactions. A practice environment provides a configured SAP system without requiring the learner to build and maintain the complete infrastructure themselves.",
        ],
      },
      {
        heading: "Why do you need an SAP practice server?",
        paragraphs: [
          "You can learn SAP theory without server access. However, theory alone does not provide the same experience as actually working inside an SAP system. Reading about a sales order is different from creating one, checking its status, navigating related documents, and understanding how the transaction affects the business process.",
          "Learning teaches you what SAP does. Hands-on practice teaches you how SAP works.",
        ],
        bullets: [
          "SAP navigation and business processes",
          "Transactions and master data",
          "Configuration concepts",
          "User roles and authorizations",
          "Integration between modules",
          "SAP GUI and Fiori interfaces",
          "Error handling, testing and real-world workflows",
        ],
      },
      {
        heading: "Can you learn SAP without server access?",
        paragraphs: [
          "Yes, you can learn SAP fundamentals — concepts, module basics, business processes, videos, documentation, courses and certification theory — without a practice server. But hands-on access becomes important when you want to develop practical SAP skills.",
          "For example, an SAP FICO learner may study the procure-to-pay process, but practical access allows them to explore the relevant transactions and understand how financial postings move through the system.",
        ],
      },
      {
        heading: "Who needs SAP server access?",
        paragraphs: [
          "SAP server access is not limited to experienced consultants. Students use it to go beyond classroom training and prepare for interviews and certification. Beginners and career switchers use it to get comfortable executing transactions instead of only watching demonstrations.",
          "Consultants use practice environments for configuration, testing, new modules, demos and proof-of-concept work. ABAP developers practice programming, reports, enhancements and debugging. BASIS professionals need administration, user management, monitoring and transport concepts. Trainers use a controlled environment for classroom demonstrations and exercises.",
        ],
        bullets: [
          "SAP students preparing for interviews and certification",
          "Beginners and career switchers",
          "Functional consultants practising configuration and testing",
          "ABAP developers needing development access",
          "BASIS and security learners needing administrative access",
          "Trainers and institutes running batches",
        ],
      },
      {
        heading: "What SAP modules can you practice?",
        paragraphs: [
          "The module you need depends on your career path and learning objective. Availability of a particular module or function depends on the SAP environment and the access provided, so always confirm before you subscribe.",
        ],
        bullets: [
          "SAP FICO — financial accounting, controlling, financial processes",
          "SAP MM — procurement, purchasing, inventory management",
          "SAP SD — sales, orders, delivery, billing",
          "SAP PP, QM, PM, PS — production, quality, maintenance, projects",
          "SAP HCM, EWM, WM — HR, extended warehouse and warehouse management",
          "SAP ABAP, BASIS, Security — development, administration, roles and authorizations",
          "SAP HANA, BW/4HANA, S/4HANA — database, analytics and modern ERP processes",
        ],
      },
      {
        heading: "SAP ECC vs SAP S/4HANA: which should you practice?",
        paragraphs: [
          "SAP ERP Central Component (ECC) is the traditional SAP ERP platform still maintained by many organizations, so learning it stays relevant if your work or training focuses on existing landscapes.",
          "SAP S/4HANA is SAP's modern ERP family built on the SAP HANA in-memory database, with a simplified data model and the SAP Fiori user experience. If your goal is to prepare for modern SAP projects, S/4HANA should generally be part of your roadmap — but the right environment depends on your module, job requirements and course.",
        ],
        bullets: [
          "ERP generation: traditional SAP ERP vs modern SAP ERP",
          "Database: multiple supported databases vs SAP HANA",
          "User experience: primarily SAP GUI vs SAP GUI and/or Fiori",
          "Learning focus: existing landscapes vs modern implementations",
        ],
      },
      {
        heading: "SAP GUI vs SAP Fiori",
        paragraphs: [
          "SAP GUI is the traditional interface used to access many SAP systems and remains important for professionals working with existing landscapes. SAP Fiori provides a modern, role-based experience, with the Fiori Launchpad acting as the central entry point to applications.",
          "If your career path involves SAP S/4HANA, learning both the relevant SAP GUI transactions and the Fiori apps gives you broader practical exposure. The exact interface available depends on the SAP system you use.",
        ],
      },
      {
        heading: "Types of SAP practice environments",
        paragraphs: [
          "Not every SAP practice server works the same way. A shared server is used by multiple learners — affordable and fine for transaction practice, though resources are shared and administrative access may be limited. A dedicated server allocates resources to you, giving more control and customization at a higher cost.",
          "Cloud environments provide remote access without maintaining physical infrastructure. A sandbox is a more open environment intended for experimentation and testing, while a practice system is usually configured around specific courses and exercises.",
        ],
        bullets: [
          "Shared practice server — affordable, good for transaction practice",
          "Dedicated server — control, customization, development and testing",
          "Cloud practice environment — flexible remote access",
          "Sandbox — open experimentation and building use cases",
        ],
      },
      {
        heading: "What should you check before choosing an SAP practice server?",
        paragraphs: [
          "Choosing an SAP server based only on price can lead to problems later. Confirm the specifics before you subscribe, because a cheap server that lacks your module, your access level or enough resources costs you far more in lost learning time.",
        ],
        bullets: [
          "SAP version — ECC, S/4HANA, S/4HANA Cloud or another release",
          "Required module — confirm the functionality you need is actually available",
          "Access method — SAP GUI, Fiori, browser, remote desktop or VPN",
          "Server resources — RAM, CPU, storage, OS, database, connectivity",
          "User access — number of users, permissions, admin and developer access",
          "Availability — uptime, maintenance windows, support hours, backups",
          "Reset options — system, user or database reset, snapshot and restore",
          "Technical support — how to raise requests, response times, inclusions",
          "Pricing — setup fees, duration, extra users, renewal and upgrade costs",
        ],
      },
      {
        heading: "How to get SAP server access for practice",
        paragraphs: [
          "Getting started is straightforward once you know what you need. Define your learning goal, choose the environment, confirm the technical requirements, receive your credentials and start practising.",
          "Once connected, do not randomly click through SAP. Practice complete business scenarios: Procure-to-Pay (purchase requisition, purchase order, goods receipt, invoice, payment) or Order-to-Cash (sales order, delivery, goods issue, billing, accounting). That is how you understand how transactions connect.",
        ],
        bullets: [
          "Step 1 — define your learning goal (FICO, MM, SD, ABAP, BASIS, S/4HANA, Fiori)",
          "Step 2 — choose the environment: ECC or S/4HANA, shared or dedicated, sandbox or development",
          "Step 3 — check technical requirements and access method",
          "Step 4 — get your credentials: host, system details, user ID, password, client",
          "Step 5 — connect and practice end-to-end business processes",
        ],
      },
      {
        heading: "SAP server access for students and consultants",
        paragraphs: [
          "For students, the best environment is not the most powerful server. Focus on the required module, ease of access, availability, learning resources, sufficient resources, support and an affordable access duration. If you are preparing for certification, combine theory with hands-on exercises.",
          "Consultants usually need more: configuration, integration, testing, functional scenarios, troubleshooting, user roles, reporting and end-to-end workflows. Confirm the level of access available before selecting a server.",
        ],
      },
      {
        heading: "How much does SAP server access cost?",
        paragraphs: [
          "There is no single SAP server access cost. It varies with the SAP version, server specifications, RAM and CPU, storage, database, number of users, shared or dedicated infrastructure, access duration, support, and customization or development requirements.",
          "Comparing providers only by monthly price can be misleading. Compare what you actually receive for the price.",
        ],
      },
      {
        heading: "Common SAP server access mistakes",
        paragraphs: [
          "Beginners often make a few avoidable mistakes. Most of them come from buying first and checking later.",
        ],
        bullets: [
          "Choosing only on price — the cheapest server may lack resources or access",
          "Not checking the SAP version you will actually receive",
          "Not confirming the module and functionality you need",
          "Ignoring administrative or development access limitations",
          "Not asking how technical support works",
          "Picking a basic transaction server for advanced ABAP, BASIS or HANA work",
          "Practising without a structured learning plan",
        ],
      },
      {
        heading: "Get SAP server access with ServerFY",
        paragraphs: [
          "ServerFY provides SAP server access and infrastructure for learners, consultants, developers, professionals and organizations — SAP practice and training environments, S/4HANA and ECC, FICO, MM, SD, ABAP, BASIS and HANA, plus development, testing and dedicated landscapes.",
          "Tell our team which SAP module you need, which SAP version you want, how many users need access, whether you need shared or dedicated access, and how long you need the environment. We will help identify a suitable environment for your requirements.",
        ],
      },
      {
        heading: "Why hands-on SAP practice matters",
        paragraphs: [
          "SAP is a practical enterprise platform. You can memorize transaction codes, watch tutorials and read documentation, but practical experience helps you understand how everything connects — navigation, troubleshooting, business processes, configuration, integration and real SAP workflows.",
          "Learn SAP. Practice SAP. Build real hands-on confidence with ServerFY.",
        ],
      },
    ],
    takeaways: [
      "SAP server access turns SAP learning from theory into hands-on practice",
      "Check the SAP version, modules, access method, resources, permissions, availability and support before you buy",
      "S/4HANA should be part of a modern SAP roadmap; ECC still matters for existing landscapes",
      "Practice complete business processes, not individual transactions",
    ],
    faq: [
      {
        q: "What is SAP server access?",
        a: "SAP server access allows an authorized user to connect to an SAP system hosted on server or cloud infrastructure and use it for learning, development, testing, configuration, or other permitted activities.",
      },
      {
        q: "Do beginners need an SAP practice server?",
        a: "Beginners can start learning SAP without server access, but hands-on access becomes highly valuable when they want to practice transactions, business processes, configuration, or technical activities.",
      },
      {
        q: "Where can I get an SAP practice server?",
        a: "You can obtain SAP practice environments through SAP's own learning ecosystem or from providers that offer hosted SAP environments. The appropriate option depends on your SAP version, module, access requirements, and learning objectives.",
      },
      {
        q: "Can students get SAP server access?",
        a: "Yes. Students can use suitable SAP practice environments to develop hands-on skills, practice transactions, and prepare for SAP-related interviews or certifications.",
      },
      {
        q: "Can I practice SAP S/4HANA online?",
        a: "Yes, depending on the environment. S/4HANA environments can be accessed through supported interfaces such as SAP Fiori and, depending on the edition and scenario, SAP GUI.",
      },
      {
        q: "Can I practice SAP FICO on a practice server?",
        a: "Yes, provided the environment includes the required SAP Finance functionality and appropriate user access.",
      },
      {
        q: "Can I practice SAP MM and SD?",
        a: "Yes. If the selected SAP environment contains the required functionality, you can practice procurement, inventory, sales, delivery, billing, and related business processes.",
      },
      {
        q: "What is the difference between an SAP practice server and a sandbox?",
        a: "A practice system is generally configured around specific learning exercises or scenarios, while a sandbox is a more open environment intended for experimentation, testing, and building use cases.",
      },
      {
        q: "Should I choose SAP ECC or S/4HANA?",
        a: "It depends on your career requirements. ECC can still be relevant for existing SAP landscapes, while S/4HANA is important for learning modern SAP ERP environments. If you are starting a new SAP career, understanding S/4HANA should generally be part of your learning roadmap.",
      },
      {
        q: "What should I check before buying SAP server access?",
        a: "Check the SAP version, modules, server resources, access method, user permissions, availability, support, pricing, and whether development or administrative access is included.",
      },
      {
        q: "How long do I need SAP server access?",
        a: "That depends on your learning objective. A short-term environment may be sufficient for basic training, while consultants, developers, and professionals may need longer access for projects, testing, or advanced practice.",
      },
      {
        q: "Is SAP server access enough to become an SAP consultant?",
        a: "No. Server access provides hands-on experience, but becoming an SAP consultant also requires knowledge of business processes, SAP functionality, configuration, implementation methodology, problem-solving, and real-world project experience.",
      },
    ],
  },
  {
    slug: "sap-s4hana-vs-ecc-which-server-to-practice-on",
    title: "SAP S/4HANA vs ECC: which server should you practice on?",
    metaTitle: "SAP S/4HANA vs ECC: Which Server to Practice On — ServerFY",
    description:
      "A practical comparison of SAP S/4HANA and ECC practice servers: what changed, which one hiring managers ask about, and how to pick for your module.",
    keywords:
      "SAP S/4HANA vs ECC, SAP practice server, S/4HANA server access, ECC server access, SAP learning path",
    category: "SAP Learning",
    tags: ["S/4HANA", "ECC", "Career"],
    author: "ServerFY Infrastructure Team",
    authorRole: "Runs the SAP landscapes",
    date: "2026-08-28",
    readMinutes: 7,
    
    tint: "orange",
    icon: "GitCompare",
    excerpt:
      "ECC is still everywhere in live projects, S/4HANA is what interviews ask about. Here is how we tell learners to split their time.",
    intro:
      "Almost every learner asks the same question in their first call with us: should I take an ECC server or an S/4HANA server? The honest answer depends on your module, your timeline and what your next interview will look like.",
    sections: [
      {
        heading: "What actually changed between ECC and S/4HANA",
        paragraphs: [
          "S/4HANA is not a cosmetic refresh of ECC. The data model was simplified — aggregate and index tables were dropped in favour of line-item tables read in memory, so reporting that used to need a batch job now runs live.",
          "For a learner, the visible differences land in three places: the Fiori launchpad instead of only SAP GUI, the Universal Journal in finance, and business partner as the single master record for customers and vendors.",
        ],
        bullets: [
          "Finance: ACDOCA replaces the old totals tables — no more reconciliation between FI and CO",
          "Logistics: MATDOC replaces MSEG/MKPF aggregates for inventory",
          "Master data: Business Partner replaces separate customer and vendor masters",
          "UX: Fiori apps sit alongside classic transactions, which still work",
        ],
      },
      {
        heading: "Which one gets asked about in interviews",
        paragraphs: [
          "Interview panels ask about S/4HANA concepts even when the project they are staffing still runs ECC. Migration and conversion work is the single biggest source of SAP demand right now, and that work needs people who can speak both dialects.",
          "If you can only practise on one system, practise on S/4HANA and learn where the ECC equivalents were. If you have time for both, start on ECC for the fundamentals and move across after four to six weeks.",
        ],
      },
      {
        heading: "How to split your practice time by module",
        paragraphs: [
          "Functional consultants in FICO feel the difference most, because the Universal Journal changes how postings are read. MM and SD change less at transaction level but a lot at master-data level.",
          "Technical learners should spend most of their time on S/4HANA: CDS views, AMDP and code pushdown only make sense on a HANA database.",
        ],
        bullets: [
          "FICO — 70% S/4HANA, focus on Universal Journal and new asset accounting",
          "MM / SD — 50/50, the transactions carry over but Business Partner does not",
          "PP / QM — mostly ECC fundamentals first, then S/4HANA for MRP Live",
          "ABAP / Basis — S/4HANA throughout",
        ],
      },
      {
        heading: "What we recommend in practice",
        paragraphs: [
          "Take a shared S/4HANA environment for daily practice, and add an ECC landscape for a month if your target role is support or AMS. Both run on the same access setup, so switching is a matter of opening a different connection entry.",
        ],
      },
    ],
    takeaways: [
      "S/4HANA is the interview language; ECC is still the project reality",
      "The data model change matters most to finance learners",
      "Technical learners should not spend long on ECC",
      "Running both is cheaper than repeating a course later",
    ],
    faq: [
      {
        q: "Can I switch my server from ECC to S/4HANA mid-way?",
        a: "Yes. We can add the second landscape to your existing access, or move you across at renewal without losing your work.",
      },
      {
        q: "Do I need a HANA database server separately?",
        a: "No. Our S/4HANA environments already run on HANA — you get the database behaviour without a separate subscription.",
      },
    ],
  },
  {
    slug: "why-your-sap-gui-session-feels-slow",
    title: "Why your SAP GUI session feels slow (and the three real causes)",
    metaTitle: "Why Your SAP GUI Session Feels Slow — ServerFY",
    description:
      "Latency, GUI settings and background load explain almost every slow SAP GUI session. Here is how to identify which one is hurting you and fix it.",
    keywords: "slow SAP GUI, SAP server performance, SAP latency, SAP GUI settings, SAP remote access speed",
    category: "Performance",
    tags: ["SAP GUI", "Latency", "Troubleshooting"],
    author: "ServerFY Infrastructure Team",
    authorRole: "Runs the SAP landscapes",
    date: "2026-08-14",
    readMinutes: 6,
    tint: "blue",
    icon: "Gauge",
    excerpt:
      "Nine times out of ten a sluggish session is not the server. It is round trips, a heavy GUI theme, or one runaway background job.",
    intro:
      "When someone tells us their environment is slow, we ask for three numbers before touching anything. In most cases the server is comfortably idle and the delay is somewhere between the keyboard and the application server.",
    sections: [
      {
        heading: "Cause one: round trips, not bandwidth",
        paragraphs: [
          "SAP GUI is chatty. Each screen change is a round trip, so latency matters far more than raw bandwidth. A 100 Mbps connection with 250 ms of latency feels worse than a 5 Mbps connection at 30 ms.",
          "Test it before blaming the system: ping the gateway and watch the average. Under 60 ms feels instant, 60–120 ms feels normal, above 200 ms every screen change becomes visible.",
        ],
        bullets: [
          "Use a wired connection or sit close to the router",
          "Avoid public and hotel Wi-Fi for long working sessions",
          "Turn off VPNs you do not need — a second tunnel doubles the hops",
        ],
      },
      {
        heading: "Cause two: SAP GUI settings nobody changes",
        paragraphs: [
          "The default Blue Crystal theme with animation and sound enabled adds noticeable redraw time over a remote link. Switching to a classic theme and disabling animation is the fastest single improvement most people can make.",
        ],
        bullets: [
          "Options → Visual Design → set theme to Classic or Corbu",
          "Disable 'Animated focus' and system sounds",
          "Turn off the SAP Signature theme's transparency effects",
          "Set 'Low speed connection' on the connection entry if you are on mobile data",
        ],
      },
      {
        heading: "Cause three: one job eating the work processes",
        paragraphs: [
          "On shared landscapes a single badly-scoped report can hold work processes and make everyone wait. SM50 tells you in seconds — look for long-running dialog processes on the same user or program.",
          "We monitor this and kill runaway jobs, but if you are running your own extract, add restrictive selection criteria and schedule it as a background job rather than in dialog.",
        ],
      },
      {
        heading: "A two-minute diagnostic",
        paragraphs: [
          "Run this before raising a ticket and you will usually have your answer.",
        ],
        bullets: [
          "Ping the gateway — note the average latency",
          "Open ST22 and SM21 for errors in the last hour",
          "Open SM50 and look for long-running processes",
          "Switch the GUI theme to Classic and retry the slow transaction",
        ],
      },
    ],
    takeaways: [
      "Latency, not bandwidth, drives SAP GUI responsiveness",
      "Classic themes and disabled animation give an instant improvement",
      "SM50 identifies a shared-landscape hog in seconds",
      "Send us the ping figure and the transaction code when you report slowness",
    ],
  },
  {
    slug: "how-to-run-a-40-person-sap-training-batch",
    title: "How to run a 40-person SAP training batch without a single blocked login",
    metaTitle: "Running a 40-Person SAP Training Batch — ServerFY",
    description:
      "What we prepare before a large SAP training batch starts: user provisioning, client strategy, number ranges, data resets and a day-one checklist.",
    keywords:
      "SAP training batch, SAP server for institutes, SAP training server, SAP user provisioning, SAP training landscape",
    category: "Training Batches",
    tags: ["Institutes", "Provisioning", "Operations"],
    author: "ServerFY Infrastructure Team",
    authorRole: "Runs the SAP landscapes",
    date: "2026-07-30",
    readMinutes: 8,
    tint: "green",
    icon: "GraduationCap",
    excerpt:
      "Large batches fail on day one for boring reasons: duplicate number ranges, shared logins and no reset plan. Here is the prep list we use.",
    intro:
      "A training batch has one chance to make a first impression. If half the room cannot log in during the first hour, the trainer spends the session on support instead of teaching. These are the things we set up before the batch starts.",
    sections: [
      {
        heading: "One login per learner, always",
        paragraphs: [
          "Shared logins look economical and cost you the whole session. Two people posting with the same user overwrite each other's work and lock the same objects. We create individual users with an initial password and a forced change at first login.",
        ],
        bullets: [
          "Individual user IDs mapped to the learner roster",
          "A role matching the module being taught, not SAP_ALL",
          "A trainer user with display access across everyone's work",
        ],
      },
      {
        heading: "Separate the number ranges and org data",
        paragraphs: [
          "Nothing derails an MM exercise faster than forty people creating purchase orders in the same plant with the same vendor. We pre-create per-learner org objects — plants, storage locations, sales areas or company codes depending on the module — so each person's data is theirs.",
        ],
        bullets: [
          "Per-learner plant or company code prefixes",
          "Dedicated number ranges to avoid collisions",
          "IDES demo data loaded so exercises have something to work with",
        ],
      },
      {
        heading: "Plan the reset before the first session",
        paragraphs: [
          "Batches repeat. A snapshot taken before day one lets you restore a clean state for the next cohort in minutes rather than rebuilding master data by hand.",
        ],
      },
      {
        heading: "The day-one checklist",
        paragraphs: [
          "Send this to learners two days before the batch, not on the morning itself.",
        ],
        bullets: [
          "SAP GUI installed and the connection entry imported",
          "Test login completed and the initial password changed",
          "Network checked from the machine they will actually use",
          "A support channel — we run a WhatsApp thread for the trainer",
        ],
      },
    ],
    takeaways: [
      "Never share logins across learners",
      "Pre-create org data and number ranges per learner",
      "Take a snapshot before day one so the next batch starts clean",
      "Do the test logins two days early, not on the morning",
    ],
    faq: [
      {
        q: "How long does provisioning 40 users take?",
        a: "Give us the roster and it is usually ready the same working day, including roles and org data.",
      },
    ],
  },
  {
    slug: "backups-that-actually-restore",
    title: "Backups that actually restore: how we test SAP snapshots",
    metaTitle: "Testing SAP Backups and Snapshots — ServerFY",
    description:
      "A backup you have never restored is a hope, not a plan. How ServerFY tests SAP landscape snapshots and what a restore looks like for you.",
    keywords: "SAP backup, SAP snapshot restore, SAP landscape recovery, SAP server backup policy",
    category: "Server Access",
    tags: ["Backups", "Reliability"],
    author: "ServerFY Infrastructure Team",
    authorRole: "Runs the SAP landscapes",
    date: "2026-07-12",
    readMinutes: 5,
    tint: "violet",
    icon: "History",
    excerpt:
      "Daily snapshots are the easy part. Proving they restore into a working SAP system is the part that matters.",
    intro:
      "Every provider says daily backups. Fewer can tell you when they last restored one. We test restores on a schedule because a snapshot that has never been opened is an untested assumption.",
    sections: [
      {
        heading: "What we snapshot",
        paragraphs: [
          "Each landscape gets a full daily snapshot of the database and the application filesystem, held for a rolling window. Dedicated landscapes can keep a longer retention on request.",
        ],
        bullets: [
          "Database snapshot including redo logs",
          "Application server filesystem and profiles",
          "Transport directory so your changes survive a restore",
        ],
      },
      {
        heading: "How we test them",
        paragraphs: [
          "On a rotating schedule we restore a snapshot into an isolated environment, start the instance and run a short smoke test: log in, open a transaction that reads and writes, and check the update queue is clean.",
          "If a restore fails, that is a real incident for us even though no customer noticed — the point is to find it before you need it.",
        ],
      },
      {
        heading: "What a restore looks like for you",
        paragraphs: [
          "Message us with the date and time you want to go back to. We confirm the nearest available snapshot, take a fresh copy of the current state first — in case you change your mind — and restore. Shared landscapes are restored per environment so other tenants are unaffected.",
        ],
      },
    ],
    takeaways: [
      "Ask any provider when they last completed a test restore",
      "Transports and profiles matter as much as the database",
      "We copy the current state before restoring over it",
    ],
  },
  {
    slug: "sap-mm-practice-plan-first-30-days",
    title: "A 30-day SAP MM practice plan you can actually finish",
    metaTitle: "30-Day SAP MM Practice Plan on a Live Server — ServerFY",
    description:
      "A week-by-week SAP MM practice plan on a live server: master data, procure-to-pay, inventory, invoice verification and the integration points.",
    keywords: "SAP MM practice, SAP MM server access, procure to pay practice, SAP MM 30 day plan",
    category: "Modules",
    tags: ["MM", "Practice Plan"],
    author: "ServerFY Infrastructure Team",
    authorRole: "Runs the SAP landscapes",
    date: "2026-06-25",
    readMinutes: 9,
    tint: "orange",
    icon: "Boxes",
    excerpt:
      "Four weeks, one hour a day, one server. From material master to invoice verification with the integration points that interviews ask about.",
    intro:
      "Most people who buy a practice server stop after configuring a material master. This plan is deliberately small enough to finish alongside a job, and it ends with the end-to-end cycle interviewers ask you to walk through.",
    sections: [
      {
        heading: "Week 1 — Enterprise structure and master data",
        paragraphs: [
          "Set up your own slice of the org structure so nothing you do collides with other learners, then create the master data every later step depends on.",
        ],
        bullets: [
          "Define plant, storage location and purchasing organisation",
          "Assign the org units and understand each assignment",
          "Create material masters across views (MM01)",
          "Create vendor master as a Business Partner on S/4HANA (BP)",
          "Maintain purchasing info records (ME11)",
        ],
      },
      {
        heading: "Week 2 — Procure to pay, end to end",
        paragraphs: [
          "Run the full cycle at least three times with different scenarios until the document flow is second nature.",
        ],
        bullets: [
          "Purchase requisition (ME51N) and release strategy",
          "Purchase order (ME21N) with and without a requisition",
          "Goods receipt (MIGO) and the accounting document behind it",
          "Invoice verification (MIRO) and the three-way match",
          "Payment run visibility in FI",
        ],
      },
      {
        heading: "Week 3 — Inventory and special processes",
        paragraphs: [
          "This is the week that separates candidates who have read about MM from candidates who have used it.",
        ],
        bullets: [
          "Movement types: 101, 122, 261, 311, 561 — and why each exists",
          "Stock transfer orders between plants",
          "Subcontracting and consignment cycles",
          "Physical inventory count and difference posting",
        ],
      },
      {
        heading: "Week 4 — Integration and configuration",
        paragraphs: [
          "MM interviews are really integration interviews. Spend the last week where MM meets FI, SD and PP.",
        ],
        bullets: [
          "Automatic account determination (OBYC) — the topic most asked",
          "Split valuation and valuation classes",
          "MM–SD intercompany stock transfer",
          "MRP basics and how PP consumes your material master",
        ],
      },
    ],
    takeaways: [
      "Finish the P2P cycle three times before moving on",
      "OBYC is the single most-asked MM configuration topic",
      "Practise on your own plant so your data stays clean",
      "One hour a day for four weeks beats one weekend of cramming",
    ],
  },
  {
    slug: "shared-vs-dedicated-sap-server-access",
    title: "Shared or dedicated SAP server: how to choose without overpaying",
    metaTitle: "Shared vs Dedicated SAP Server Access — ServerFY",
    description:
      "When a shared SAP practice server is enough and when a dedicated landscape is worth it — by team size, workload, config freedom and budget.",
    keywords:
      "shared SAP server, dedicated SAP server, SAP server access pricing, SAP landscape for teams",
    category: "Server Access",
    tags: ["Shared", "Dedicated", "Buying"],
    author: "ServerFY Infrastructure Team",
    authorRole: "Runs the SAP landscapes",
    date: "2026-06-05",
    readMinutes: 6,
    tint: "blue",
    icon: "Server",
    excerpt:
      "Most individual learners never need a dedicated landscape. Teams doing configuration or client copies almost always do.",
    intro:
      "The difference is not speed — both run on the same class of hardware. The difference is how much of the system you are allowed to change, and whether anyone else's mistake can reach you.",
    sections: [
      {
        heading: "A shared landscape is enough when…",
        paragraphs: [
          "You are learning transactions and standard configuration in your own org slice, working alone or in a pair, and you can live without client copies or system-wide settings.",
        ],
        bullets: [
          "Individual learners and job seekers",
          "Module practice with your own plant or company code",
          "Short-term revision before an interview",
        ],
      },
      {
        heading: "Go dedicated when…",
        paragraphs: [
          "You need control over the whole system: client copies, transports across clients, kernel or patch levels, or Basis activities that would affect other tenants.",
        ],
        bullets: [
          "Basis and security practice",
          "Institutes running repeated batches with resets",
          "Project teams needing DEV/QA separation",
          "Demo and POC systems shown to a customer",
        ],
      },
      {
        heading: "The cost comparison people miss",
        paragraphs: [
          "A dedicated landscape looks expensive per month until you divide it across a batch or a project team. For ten or more users it is usually cheaper than ten shared subscriptions, and you get the reset ability as well.",
        ],
      },
    ],
    takeaways: [
      "Shared covers almost all individual practice",
      "Basis, security and client copies need dedicated",
      "Above roughly ten users, dedicated is usually the cheaper option",
    ],
  },
];

export function findPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug.toLowerCase());
}

export const sortedPosts = [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));

export function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
