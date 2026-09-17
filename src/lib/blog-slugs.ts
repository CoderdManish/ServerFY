/** Server-side helper: published article slugs from the data service, merged with the seeded ones. */
import { blogPosts } from "@/data/blog";

type ApiPost = { slug: string };

export async function publishedBlogSlugs(): Promise<string[]> {
  const base = (process.env["API_URL"] ?? process.env["VITE_API_URL"] ?? "").replace(/\/$/, "");
  const seeded = blogPosts.map((p) => p.slug);
  if (!base) return seeded;
  try {
    const res = await fetch(`${base}/api/blog`);
    if (!res.ok) return seeded;
    const data = (await res.json()) as { items?: ApiPost[] };
    const remote = (data.items ?? []).map((p) => p.slug);
    return [...new Set([...remote, ...seeded])];
  } catch {
    return seeded;
  }
}
