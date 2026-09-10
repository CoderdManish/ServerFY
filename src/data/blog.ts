/**
 * Blog content. Add a new object to `blogPosts` to publish a new article —
 * the listing page, article page, sitemap and JSON-LD all read from here.
 */

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
] as const;

export const blogPosts: BlogPost[] = [
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
    featured: true,
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
