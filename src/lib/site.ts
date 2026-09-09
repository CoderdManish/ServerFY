// Single source of truth for the public site address used in canonical URLs,
// og:url, JSON-LD and the sitemap. Change this if the site moves to another domain.
export const SITE_URL = "https://vibrant-blend-ui.lovable.app";

/** Build an absolute URL from a site-relative path. */
export function absUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return clean === "/" ? `${SITE_URL}/` : `${SITE_URL}${clean.replace(/\/+$/, "")}`;
}
