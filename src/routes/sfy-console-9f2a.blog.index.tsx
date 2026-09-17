import { useCallback, useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Copy, Eye, FileText, Search, Tag, Trash2 } from "lucide-react";
import {
  ADMIN_BASE,
  ApiError,
  createBlogCategory,
  deleteBlogCategory,
  deleteBlogPost,
  duplicateBlogPost,
  listBlogCategories,
  listBlogPosts,
  renameBlogCategory,
  type BlogPostDraft,
} from "@/lib/admin-api";

export const Route = createFileRoute("/sfy-console-9f2a/blog/")({
  ssr: false,
  component: BlogList,
});

type Category = { id: string; name: string };

function BlogList() {
  const [items, setItems] = useState<BlogPostDraft[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [posts, cats] = await Promise.all([
        listBlogPosts({ q, status, category }),
        listBlogCategories(),
      ]);
      setItems(posts.items);
      setCategories(cats.items);
      setError(null);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not load articles.");
    } finally {
      setLoading(false);
    }
  }, [q, status, category]);

  useEffect(() => {
    const t = setTimeout(() => void load(), 250);
    return () => clearTimeout(t);
  }, [load]);

  async function onDuplicate(id: string) {
    await duplicateBlogPost(id);
    await load();
  }

  async function onDelete(id: string, title: string) {
    if (!window.confirm(`Delete “${title}”? This cannot be undone.`)) return;
    await deleteBlogPost(id);
    await load();
  }

  async function onAddCategory(e: React.FormEvent) {
    e.preventDefault();
    if (newCategory.trim().length < 2) return;
    try {
      await createBlogCategory(newCategory.trim());
      setNewCategory("");
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not add that category.");
    }
  }

  async function onRenameCategory(c: Category) {
    const name = window.prompt("Rename category", c.name);
    if (!name || name.trim() === c.name) return;
    await renameBlogCategory(c.id, name.trim());
    await load();
  }

  async function onDeleteCategory(c: Category) {
    try {
      await deleteBlogCategory(c.id);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not remove that category.");
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
      <section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
              Articles
            </h1>
            <p className="mt-1.5 text-sm text-stone-500">
              Everything published here appears on the public blog straight away.
            </p>
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
            {items.length} article{items.length === 1 ? "" : "s"}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2.5">
          <label className="relative flex-1 min-w-[190px]">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400"
              aria-hidden="true"
            />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by title or link"
              aria-label="Search articles"
              className="w-full rounded-xl border border-stone-900/10 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-stone-400"
            />
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            aria-label="Filter by status"
            className="rounded-xl border border-stone-900/10 bg-white px-3 py-2.5 text-sm outline-none focus:border-stone-400"
          >
            <option value="">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by category"
            className="rounded-xl border border-stone-900/10 bg-white px-3 py-2.5 text-sm outline-none focus:border-stone-400"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {error ? (
          <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </p>
        ) : null}

        <ul className="mt-5 grid gap-3">
          {loading && items.length === 0 ? (
            <li className="rounded-2xl border border-stone-900/10 bg-white p-6 text-sm text-stone-500">
              Loading articles…
            </li>
          ) : null}
          {!loading && items.length === 0 ? (
            <li className="rounded-2xl border border-dashed border-stone-900/15 bg-white/60 p-8 text-center">
              <FileText className="mx-auto size-6 text-stone-400" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-stone-700">No articles yet</p>
              <p className="mt-1 text-sm text-stone-500">
                Start one from scratch or upload a Word document.
              </p>
              <Link
                to="/sfy-console-9f2a/blog/$id"
                params={{ id: "new" }}
                className="mt-5 inline-block rounded-full bg-stone-900 px-5 py-2 text-sm font-semibold text-white"
              >
                Write your first article
              </Link>
            </li>
          ) : null}

          {items.map((post) => (
            <li
              key={post.id}
              className="rounded-2xl border border-stone-900/10 bg-white p-4 shadow-[0_10px_30px_-24px_rgba(28,25,23,0.6)] sm:p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[0.68rem] font-bold uppercase tracking-wider ${
                        post.status === "published"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {post.status}
                    </span>
                    <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[0.68rem] font-bold uppercase tracking-wider text-stone-500">
                      {post.category}
                    </span>
                    {post.featured ? (
                      <span className="rounded-full bg-orange/15 px-2.5 py-0.5 text-[0.68rem] font-bold uppercase tracking-wider text-orange">
                        Featured
                      </span>
                    ) : null}
                  </div>
                  <h2 className="mt-2 truncate font-serif text-lg font-semibold text-stone-900">
                    <Link
                      to="/sfy-console-9f2a/blog/$id"
                      params={{ id: post.id! }}
                      className="hover:text-orange"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-1 truncate text-xs text-stone-500">
                    /blog/{post.slug} · {post.readMinutes} min · {post.views ?? 0} views
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-1.5">
                  {post.status === "published" ? (
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      title="View on the site"
                      className="grid size-9 place-items-center rounded-lg text-stone-500 hover:bg-stone-100"
                    >
                      <Eye className="size-4" aria-hidden="true" />
                    </a>
                  ) : null}
                  <button
                    type="button"
                    title="Duplicate"
                    onClick={() => void onDuplicate(post.id!)}
                    className="grid size-9 place-items-center rounded-lg text-stone-500 hover:bg-stone-100"
                  >
                    <Copy className="size-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    title="Delete"
                    onClick={() => void onDelete(post.id!, post.title)}
                    className="grid size-9 place-items-center rounded-lg text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                  </button>
                  <Link
                    to="/sfy-console-9f2a/blog/$id"
                    params={{ id: post.id! }}
                    className="rounded-full bg-stone-900 px-4 py-2 text-xs font-semibold text-white"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <aside className="rounded-2xl border border-stone-900/10 bg-white p-5">
        <h2 className="inline-flex items-center gap-2 font-serif text-lg font-semibold text-stone-900">
          <Tag className="size-4 text-orange" aria-hidden="true" />
          Categories
        </h2>
        <p className="mt-1.5 text-xs text-stone-500">These become the filter chips on the blog.</p>
        <ul className="mt-4 space-y-2">
          {categories.map((c) => (
            <li key={c.id} className="flex items-center gap-2 rounded-lg bg-stone-50 px-3 py-2">
              <span className="flex-1 truncate text-sm font-semibold text-stone-700">{c.name}</span>
              <button
                type="button"
                onClick={() => void onRenameCategory(c)}
                className="text-xs font-semibold text-stone-500 hover:text-stone-900"
              >
                Rename
              </button>
              <button
                type="button"
                onClick={() => void onDeleteCategory(c)}
                className="text-xs font-semibold text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </li>
          ))}
          {categories.length === 0 ? (
            <li className="text-sm text-stone-500">No categories yet.</li>
          ) : null}
        </ul>
        <form onSubmit={onAddCategory} className="mt-4 flex gap-2">
          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category"
            aria-label="New category name"
            className="min-w-0 flex-1 rounded-lg border border-stone-900/10 px-3 py-2 text-sm outline-none focus:border-stone-400"
          />
          <button
            type="submit"
            className="rounded-lg bg-stone-900 px-3 py-2 text-sm font-semibold text-white"
          >
            Add
          </button>
        </form>
      </aside>
    </div>
  );
}
