import { createFileRoute } from "@tanstack/react-router";
import { modules } from "@/data/serverfy";
import { moduleSlug } from "@/data/module-pages";
import { resourcePages, serverPages, solutionPages } from "@/data/pages";

const staticPaths = [
  "/",
  "/servers",
  "/modules",
  "/solutions",
  "/pricing",
  "/resources",
  "/about",
  "/contact",
  "/why-serverfy",
  "/infrastructure",
  "/careers",
  "/sla",
  "/refund-policy",
  "/terms",
  "/privacy",
];

function allPaths(): string[] {
  return [
    ...staticPaths,
    ...serverPages.map((p) => `/servers/${p.slug}`),
    ...solutionPages.map((p) => `/solutions/${p.slug}`),
    ...resourcePages.map((p) => `/resources/${p.slug}`),
    ...modules.map((m) => `/modules/${moduleSlug(m.code)}`),
  ];
}

function originFrom(request: Request): string {
  const url = new URL(request.url);
  const forwarded = url.hostname === "localhost" ? request.headers.get("x-forwarded-host") : null;
  return forwarded ? `https://${forwarded}` : url.origin;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = originFrom(request);
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPaths()
  .map(
    (p) =>
      `  <url><loc>${origin}${p === "/" ? "/" : p}</loc><changefreq>weekly</changefreq><priority>${
        p === "/" ? "1.0" : p.split("/").length > 2 ? "0.6" : "0.8"
      }</priority></url>`,
  )
  .join("\n")}
</urlset>
`;
        return new Response(body, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
