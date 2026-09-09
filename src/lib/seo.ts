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
  const meta: MetaTag[] = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { name: "twitter:card", content: image ? "summary_large_image" : "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "robots", content: noindex ? "noindex, nofollow" : "index, follow" },
  ];

  if (keywords) {
    meta.push({ name: "keywords", content: keywords });
  }
  if (image) {
    meta.push({ property: "og:image", content: absUrl(image) });
    meta.push({ name: "twitter:image", content: absUrl(image) });
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
    links: [{ rel: "canonical", href: path }],
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
      item: it.item,
    })),
  };
}

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": "/#organization",
    name: "ServerFY",
    url: "/",
    logo: "/favicon.png",
    sameAs: [],
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": "/#website",
    name: "ServerFY",
    url: "/",
    publisher: { "@id": "/#organization" },
  };
}
