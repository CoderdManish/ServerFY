import type { DetailPage } from "@/data/pages";
import type { SapModule } from "@/data/serverfy";

/** Keyword-rich URL for a module, e.g. MM -> sap-mm-server-access-for-practice. */
export function moduleSlug(code: string) {
  return `sap-${code.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-server-access-for-practice`;
}

/** Previous keyword URL (e.g. "sap-mm-module-server-access") so existing links keep working. */
export function legacyModuleSlug(code: string) {
  return `sap-${code.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-module-server-access`;
}

/** The original short URL (e.g. "mm") so old links keep working. */
export function shortModuleSlug(code: string) {
  return code.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export function moduleDetailPage(mod: SapModule): DetailPage {
  const isTechnical = mod.type === "technical";
  const platforms = mod.platforms.join(", ");
  const title = `SAP ${mod.code} server access`;

  return {
    slug: moduleSlug(mod.code),
    eyebrow: "SAP Modules",
    title,
    metaTitle: `SAP ${mod.code} Server Access | ${mod.name} Practice — ServerFY`,
    intro: `${mod.name} on a live SAP system — ${mod.desc.toLowerCase()} Available on ${platforms} with remote access and your own login.`,
    description: `Get hands-on SAP ${mod.code} (${mod.name}) server access on ${platforms}. ${mod.desc} Remote login, daily backups and same-day activation.`,
    highlights: [
      {
        title: "Live system, real screens",
        desc: `Work in the actual ${mod.code} transactions, not a simulator or recorded demo.`,
        icon: mod.icon,
      },
      {
        title: isTechnical ? "Developer access" : "Configuration access",
        desc: isTechnical
          ? "Developer keys, packages and transports so you can build and move real objects."
          : "SPRO customising rights so you can configure the module end to end, not just display it.",
        icon: isTechnical ? "Code2" : "Settings2",
      },
      {
        title: "Ready master data",
        desc: "Org structures and master data are already loaded, so complete cycles run from the first day.",
        icon: "Database",
      },
      {
        title: "Your own login",
        desc: "A personal user with a private workspace; your work stays exactly where you left it.",
        icon: "Users",
      },
    ],
    specs: [
      { label: "Module", value: `${mod.code} — ${mod.name}` },
      { label: "Platforms", value: platforms },
      { label: "Type", value: isTechnical ? "Technical" : "Functional" },
      { label: "Availability", value: mod.availability },
      { label: "Access method", value: "SAP GUI / Fiori launchpad over secure remote login" },
      { label: "Activation", value: "Usually within a few working hours" },
      { label: "Backups", value: "Daily snapshots, restore on request" },
    ],
    checklist: {
      title: `What you can practise in ${mod.code}`,
      items: isTechnical
        ? [
            "Build and test objects from scratch",
            "Work with transports and packages",
            "Debug and analyse existing code",
            "Integrate with other modules and services",
            "Prepare for certification questions",
          ]
        : [
            "Configure the module in SPRO",
            "Create master data and org structures",
            "Run complete business cycles end to end",
            "Analyse the postings and documents produced",
            "Prepare for interviews and certification",
          ],
    },
    faq: [
      {
        q: `Is ${mod.code} available right now?`,
        a:
          mod.availability === "Available"
            ? `Yes — ${mod.code} environments are in stock and usually handed over the same working day.`
            : `${mod.code} runs on limited slots. Tell us your start date and we will confirm availability before you pay.`,
      },
      {
        q: "Can I combine it with another module?",
        a: "Yes. Most learners take one functional and one technical module together, and combined access is cheaper than two separate environments.",
      },
      {
        q: "How long should I book?",
        a: "One month suits focused revision. Two to three months is more realistic if you are learning the module properly alongside a job.",
      },
    ],
  };
}
