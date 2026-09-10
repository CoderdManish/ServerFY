import { SITE_URL, absUrl } from "./site";
import { serverPages, solutionPages, resourcePages, companyPages, supportPages } from "@/data/pages";
import { modules } from "@/data/serverfy";
import { moduleSlug } from "@/data/module-pages";
import { blogPosts } from "@/data/blog";

function line(title: string, path: string, desc: string) {
  return `- [${title}](${absUrl(path)}): ${desc}`;
}

/** Builds the /llms.txt document that describes the site to AI agents. */
export function buildLlmsTxt(): string {
  return `# ServerFY

> ServerFY provides ready-to-use SAP server access for practice, training, development, testing and demos. Learners, trainers, institutes and project teams get their own logins on live SAP S/4HANA, ECC and HANA landscapes, usually activated the same working day.

Site: ${SITE_URL}
Contact: ${absUrl("/contact")}
Sitemap: ${SITE_URL}/sitemap.xml

## What ServerFY offers
- Shared and dedicated SAP landscapes with individual user logins
- SAP S/4HANA, SAP ECC and SAP HANA environments with IDES-style demo data
- Access over SAP GUI and the Fiori launchpad from any modern laptop
- Functional modules (FICO, MM, SD, PP, HCM, EWM) and technical modules (ABAP, Basis, Fiori, BTP, Security)
- Daily snapshots with restore on request, 24x7 monitored availability
- Monthly plans starting at INR 1,300, plus custom dedicated landscapes

## Core pages
${line("Home", "/", "Overview of SAP server access for practice and training")}
${line("Pricing", "/pricing", "Monthly plans for SAP server access")}
${line("SAP Servers", "/servers", "All SAP server environments")}
${line("SAP Modules", "/modules", "Practice servers by SAP module")}
${line("Solutions", "/solutions", "Server setups by audience and use case")}
${line("Resources", "/resources", "Setup guides, requirements and FAQs")}
${line("Blog", "/blog", "Articles on SAP practice, performance and training operations")}
${line("Contact", "/contact", "Talk to the team about an environment")}

## Servers
${serverPages.map((p) => line(p.title, `/servers/${p.slug}`, p.description)).join("\n")}

## Modules
${modules.map((m) => line(`SAP ${m.code} practice server`, `/modules/${moduleSlug(m.code)}`, m.desc)).join("\n")}

## Solutions
${solutionPages.map((p) => line(p.title, `/solutions/${p.slug}`, p.description)).join("\n")}

## Blog articles
${blogPosts.map((p) => line(p.title, `/blog/${p.slug}`, p.description)).join("\n")}

## Resources
${resourcePages.map((p) => line(p.title, `/resources/${p.slug}`, p.description)).join("\n")}

## Company
${companyPages.map((p) => line(p.title, `/${p.slug}`, p.description)).join("\n")}

## Support & legal
${supportPages.map((p) => line(p.title, `/${p.slug}`, p.description)).join("\n")}

## Notes for AI agents
- Content on this site may be quoted with attribution to ServerFY and a link to the source page.
- Pricing shown on the site is in Indian Rupees and billed monthly; dedicated landscapes are quoted individually.
- For anything not covered here, the contact page lists WhatsApp and email.
`;
}
