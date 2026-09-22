import { SITE_URL, absUrl } from "./site";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "product";
  keywords?: string;
  image?: string;
  noindex?: boolean;
  jsonLd?: unknown[];
};

type MetaTag = { title: string } | { name?: string; property?: string; content: string };

/** Default share image (1200x630) used when a page has no image of its own. */
export const DEFAULT_OG_IMAGE = "/og-cover.jpg";

/** Trim to a search-friendly length at a word boundary, without a dangling separator. */
export function clampText(text: string, max: number) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const at = cut.lastIndexOf(" ");
  return (at > max * 0.6 ? cut.slice(0, at) : cut).replace(/[\s\-–—|,:;.]+$/, "");
}

export const clampTitle = (t: string) => clampText(t, 60);
export const clampDescription = (d: string) => clampText(d, 155);

/** og:/twitter: tags every page shares, so social previews are never incomplete. */
export function socialMeta({
  title,
  description,
  url,
  type = "website",
  image = DEFAULT_OG_IMAGE,
}: {
  title: string;
  description: string;
  url: string;
  type?: string;
  image?: string;
}): MetaTag[] {
  const img = absUrl(image);
  return [
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:site_name", content: "ServerFY" },
    { property: "og:locale", content: "en_IN" },
    { property: "og:image", content: img },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: title },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: img },
  ];
}

export function buildHead({
  title,
  description,
  path,
  type = "website",
  keywords,
  image,
  noindex,
  jsonLd,
}: SeoInput) {
  const url = absUrl(path);
  const t = clampTitle(title);
  const d = clampDescription(description);
  const meta: MetaTag[] = [
    { title: t },
    { name: "description", content: d },
    ...socialMeta({ title: t, description: d, url, type, image }),
    { name: "robots", content: noindex ? "noindex, nofollow" : "index, follow" },
  ];

  if (keywords) {
    meta.push({ name: "keywords", content: keywords });
  }

  const scripts: Array<{ type: string; children: string }> = [];
  if (jsonLd?.length) {
    scripts.push({
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": jsonLd,
      }),
    });
  }

  return {
    meta,
    links: [{ rel: "canonical", href: url }],
    scripts,
  };
}

export function breadcrumbList(items: { name: string; item: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: absUrl(it.item),
    })),
  };
}

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "ServerFY",
    url: `${SITE_URL}/`,
    logo: absUrl("/favicon.png"),
    sameAs: [],
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "ServerFY",
    url: `${SITE_URL}/`,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}
