/**
 * Public blog data. Articles live in the data service and are managed from the
 * blog panel; the bundled articles in `@/data/blog` are the offline fallback so
 * the blog never renders empty.
 */
import { blogPosts, blogCategories, type BlogPost } from "@/data/blog";

const API_URL = (import.meta.env["VITE_API_URL"] as string | undefined)?.replace(/\/$/, "");

const byDate = (a: BlogPost, b: BlogPost) => (a.date < b.date ? 1 : -1);

function merge(remote: BlogPost[]): BlogPost[] {
  const map = new Map<string, BlogPost>();
  for (const p of blogPosts) map.set(p.slug, p);
  for (const p of remote) map.set(p.slug, p);
  return [...map.values()].sort(byDate);
}

export type BlogIndexData = { posts: BlogPost[]; categories: string[] };

export async function loadBlogIndex(): Promise<BlogIndexData> {
  const fallback: BlogIndexData = {
    posts: [...blogPosts].sort(byDate),
    categories: [...blogCategories],
  };
  if (!API_URL) return fallback;
  try {
    const res = await fetch(`${API_URL}/api/blog`, { headers: { accept: "application/json" } });
    if (!res.ok) return fallback;
    const data = (await res.json()) as { items?: BlogPost[]; categories?: string[] };
    const posts = merge(data.items ?? []);
    const categories = [
      ...new Set([...(data.categories ?? []), ...posts.map((p) => p.category)]),
    ].filter(Boolean);
    return { posts, categories: categories.length ? categories : fallback.categories };
  } catch {
    return fallback;
  }
}

export async function loadBlogPost(slug: string): Promise<BlogPost | null> {
  if (API_URL) {
    try {
      const res = await fetch(`${API_URL}/api/blog/post/${encodeURIComponent(slug)}`, {
        headers: { accept: "application/json" },
      });
      if (res.ok) {
        const data = (await res.json()) as { post?: BlogPost };
        if (data.post) return data.post;
      }
    } catch {
      /* fall through to the bundled articles */
    }
  }
  return blogPosts.find((p) => p.slug === slug) ?? null;
}
