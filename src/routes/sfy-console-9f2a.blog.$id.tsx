import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check, FileUp, Plus, Save, Trash2 } from "lucide-react";
import {
  ADMIN_BASE,
  ApiError,
  createBlogPost,
  getBlogPost,
  importBlogDocx,
  listBlogCategories,
  updateBlogPost,
  type BlogPostDraft,
  type BlogSectionDraft,
} from "@/lib/admin-api";

export const Route = createFileRoute("/sfy-console-9f2a/blog/$id")({
  ssr: false,
  component: BlogEditor,
});

const TINTS = ["blue", "orange", "green", "violet"] as const;
const ICONS = [
  "ServerCog",
  "BookOpen",
  "GraduationCap",
  "Gauge",
  "Database",
  "ShieldCheck",
  "Users",
  "Layers",
];

const emptyDraft = (): BlogPostDraft => ({
  title: "",
  slug: "",
  metaTitle: "",
  description: "",
  keywords: "",
  category: "SAP Learning",
  tags: [],
  author: "ServerFY Team",
  authorRole: "SAP Server Hosting & Infrastructure",
  date: new Date().toISOString().slice(0, 10),
  readMinutes: 6,
  featured: false,
  excerpt: "",
  intro: "",
  tint: "blue",
  icon: "ServerCog",
  cover: "",
  coverAlt: "",
  sections: [{ heading: "", paragraphs: [""], bullets: [] }],
  takeaways: [],
  faq: [],
  status: "draft",
});

const field =
  "w-full rounded-xl border border-stone-900/10 bg-white px-3 py-2.5 text-sm outline-none focus:border-stone-400";
const label = "block text-xs font-bold uppercase tracking-wider text-stone-500";
const card = "rounded-2xl border border-stone-900/10 bg-white p-5 shadow-[0_10px_30px_-26px_rgba(28,25,23,0.6)]";

function slugify(v: string) {
  return v
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 90);
}

function countWords(draft: BlogPostDraft) {
  const text = [draft.intro, ...draft.sections.flatMap((s) => [...s.paragraphs, ...(s.bullets ?? [])])]
    .join(" ")
    .replace(/<[^>]+>/g, "");
  return text.split(/\s+/).filter(Boolean).length;
}

function BlogEditor() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const isNew = id === "new";

  const [draft, setDraft] = useState<BlogPostDraft>(emptyDraft());
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(!isNew);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [showPreview, setShowPreview] = useState(false);
  const docxRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    void (async () => {
      try {
        const cats = await listBlogCategories();
        setCategories(cats.items.map((c) => c.name));
      } catch {
        /* categories are optional */
      }
      if (isNew) return;
      try {
        const res = await getBlogPost(id);
        setDraft({ ...emptyDraft(), ...res.post });
      } catch (err) {
        setError(err instanceof ApiError ? err.message : "Could not open that article.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isNew]);

  const words = useMemo(() => countWords(draft), [draft]);

  function patch(p: Partial<BlogPostDraft>) {
    setDraft((d) => ({ ...d, ...p }));
    setSaved(null);
  }

  function patchSection(i: number, p: Partial<BlogSectionDraft>) {
    setDraft((d) => ({
      ...d,
      sections: d.sections.map((s, si) => (si === i ? { ...s, ...p } : s)),
    }));
    setSaved(null);
  }

  async function save(status?: "draft" | "published") {
    setBusy(true);
    setError(null);
    const body: Partial<BlogPostDraft> = {
      ...draft,
      status: status ?? draft.status,
      slug: draft.slug || slugify(draft.title),
      metaTitle: draft.metaTitle || draft.title,
      readMinutes: draft.readMinutes || Math.max(3, Math.round(words / 220)),
      sections: draft.sections
        .filter((s) => s.heading.trim() || s.paragraphs.some((p) => p.trim()))
        .map((s) => ({
          heading: s.heading,
          paragraphs: s.paragraphs.filter((p) => p.trim()),
          bullets: (s.bullets ?? []).filter((b) => b.trim()),
        })),
      takeaways: draft.takeaways.filter((t) => t.trim()),
      faq: draft.faq.filter((f) => f.q.trim() && f.a.trim()),
    };
    delete (body as { id?: string }).id;
    delete (body as { views?: number }).views;
    delete (body as { updatedAt?: string }).updatedAt;
    try {
      if (isNew) {
        const res = await createBlogPost(body);
        await navigate({ to: "/sfy-console-9f2a/blog/$id", params: { id: res.post.id! }, replace: true });
      } else {
        const res = await updateBlogPost(id, body);
        setDraft({ ...emptyDraft(), ...res.post });
      }
      setSaved(status === "published" ? "Published — it's live on the blog." : "Saved.");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not save this article.");
    } finally {
      setBusy(false);
    }
  }

  async function onDocx(file: File) {
    setBusy(true);
    setError(null);
    try {
      const parsed = await importBlogDocx(file);
      setDraft((d) => ({
        ...d,
        ...parsed,
        slug: d.slug || parsed.slug || "",
        sections: (parsed.sections ?? d.sections).map((s) => ({
          heading: s.heading,
          paragraphs: s.paragraphs,
          bullets: s.bullets ?? [],
        })),
      }));
      setSaved("Document imported — review it below before publishing.");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not read that document.");
    } finally {
      setBusy(false);
    }
  }

  function onCover(file: File) {
    if (file.size > 1_500_000) {
      setError("Please use a cover image under 1.5 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => patch({ cover: String(reader.result ?? "") });
    reader.readAsDataURL(file);
  }

  if (loading) {
    return <p className="py-16 text-center text-sm text-stone-500">Opening article…</p>;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Link
          to="/sfy-console-9f2a/blog"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-500 hover:text-stone-900"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          All articles
        </Link>
        <span className="ml-auto text-xs font-semibold uppercase tracking-wider text-stone-400">
          {words} words · about {draft.readMinutes} min
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2.5">
        <h1 className="font-serif text-2xl font-semibold tracking-tight text-stone-900">
          {isNew ? "New article" : "Edit article"}
        </h1>
        <span
          className={`rounded-full px-2.5 py-0.5 text-[0.68rem] font-bold uppercase tracking-wider ${
            draft.status === "published"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {draft.status}
        </span>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <input
            ref={docxRef}
            type="file"
            accept=".docx"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void onDocx(f);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            disabled={busy}
            onClick={() => docxRef.current?.click()}
            className="inline-flex items-center gap-1.5 rounded-full border border-stone-900/15 px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-white disabled:opacity-60"
          >
            <FileUp className="size-4" aria-hidden="true" />
            Import Word file
          </button>
          <button
            type="button"
            onClick={() => setShowPreview((v) => !v)}
            className="rounded-full border border-stone-900/15 px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-white"
          >
            {showPreview ? "Hide preview" : "Preview"}
          </button>
          <button
            type="button"
            disabled={busy || draft.title.trim().length < 3}
            onClick={() => void save("draft")}
            className="inline-flex items-center gap-1.5 rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            <Save className="size-4" aria-hidden="true" />
            Save draft
          </button>
          <button
            type="button"
            disabled={busy || draft.title.trim().length < 3}
            onClick={() => void save("published")}
            className="inline-flex items-center gap-1.5 rounded-full bg-orange px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            <Check className="size-4" aria-hidden="true" />
            Publish
          </button>
        </div>
      </div>

      {error ? (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>
      ) : null}
      {saved ? (
        <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          {saved}
        </p>
      ) : null}

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        {/* Writing column */}
        <div className="grid gap-5">
          <section className={card}>
            <label className={label} htmlFor="title">
              Title
            </label>
            <input
              id="title"
              value={draft.title}
              onChange={(e) => {
                const title = e.target.value;
                patch(slugTouched ? { title } : { title, slug: slugify(title) });
              }}
              className={`${field} mt-2 font-serif text-lg`}
              placeholder="SAP Server Access for Beginners"
            />

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className={label} htmlFor="slug">
                  Web address
                </label>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="text-xs text-stone-400">/blog/</span>
                  <input
                    id="slug"
                    value={draft.slug ?? ""}
                    onChange={(e) => {
                      setSlugTouched(true);
                      patch({ slug: slugify(e.target.value) });
                    }}
                    className={field}
                  />
                </div>
              </div>
              <div>
                <label className={label} htmlFor="category">
                  Category
                </label>
                <input
                  id="category"
                  list="blog-categories"
                  value={draft.category}
                  onChange={(e) => patch({ category: e.target.value })}
                  className={`${field} mt-2`}
                />
                <datalist id="blog-categories">
                  {categories.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>
            </div>

            <div className="mt-4">
              <label className={label} htmlFor="excerpt">
                Card summary
              </label>
              <textarea
                id="excerpt"
                rows={2}
                value={draft.excerpt}
                onChange={(e) => patch({ excerpt: e.target.value })}
                className={`${field} mt-2`}
              />
            </div>

            <div className="mt-4">
              <label className={label} htmlFor="intro">
                Opening paragraph
              </label>
              <textarea
                id="intro"
                rows={3}
                value={draft.intro}
                onChange={(e) => patch({ intro: e.target.value })}
                className={`${field} mt-2`}
              />
            </div>
          </section>

          {/* Sections */}
          <section className="grid gap-4">
            {draft.sections.map((s, i) => (
              <div key={i} className={card}>
                <div className="flex items-center gap-3">
                  <span className="grid size-7 place-items-center rounded-lg bg-stone-900 text-[0.7rem] font-bold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <input
                    value={s.heading}
                    onChange={(e) => patchSection(i, { heading: e.target.value })}
                    placeholder="Section heading"
                    aria-label={`Heading for section ${i + 1}`}
                    className={`${field} font-serif`}
                  />
                  <button
                    type="button"
                    aria-label={`Remove section ${i + 1}`}
                    onClick={() =>
                      patch({ sections: draft.sections.filter((_, si) => si !== i) })
                    }
                    className="grid size-9 shrink-0 place-items-center rounded-lg text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                  </button>
                </div>

                <div className="mt-3 grid gap-2.5">
                  {s.paragraphs.map((p, pi) => (
                    <div key={pi} className="flex items-start gap-2">
                      <textarea
                        rows={3}
                        value={p}
                        onChange={(e) =>
                          patchSection(i, {
                            paragraphs: s.paragraphs.map((x, xi) => (xi === pi ? e.target.value : x)),
                          })
                        }
                        placeholder='Paragraph text. Links: <a href="/pricing">see pricing</a>'
                        aria-label={`Paragraph ${pi + 1} of section ${i + 1}`}
                        className={field}
                      />
                      <button
                        type="button"
                        aria-label="Remove paragraph"
                        onClick={() =>
                          patchSection(i, { paragraphs: s.paragraphs.filter((_, xi) => xi !== pi) })
                        }
                        className="mt-1 grid size-8 shrink-0 place-items-center rounded-lg text-stone-400 hover:bg-stone-100"
                      >
                        <Trash2 className="size-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => patchSection(i, { paragraphs: [...s.paragraphs, ""] })}
                    className="inline-flex w-fit items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-stone-900"
                  >
                    <Plus className="size-3.5" aria-hidden="true" />
                    Paragraph
                  </button>
                </div>

                <div className="mt-4 rounded-xl bg-stone-50 p-3">
                  <p className={label}>Bullet points</p>
                  <div className="mt-2 grid gap-2">
                    {(s.bullets ?? []).map((b, bi) => (
                      <div key={bi} className="flex items-center gap-2">
                        <input
                          value={b}
                          onChange={(e) =>
                            patchSection(i, {
                              bullets: (s.bullets ?? []).map((x, xi) =>
                                xi === bi ? e.target.value : x,
                              ),
                            })
                          }
                          aria-label={`Bullet ${bi + 1} of section ${i + 1}`}
                          className={field}
                        />
                        <button
                          type="button"
                          aria-label="Remove bullet"
                          onClick={() =>
                            patchSection(i, {
                              bullets: (s.bullets ?? []).filter((_, xi) => xi !== bi),
                            })
                          }
                          className="grid size-8 shrink-0 place-items-center rounded-lg text-stone-400 hover:bg-white"
                        >
                          <Trash2 className="size-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => patchSection(i, { bullets: [...(s.bullets ?? []), ""] })}
                      className="inline-flex w-fit items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-stone-900"
                    >
                      <Plus className="size-3.5" aria-hidden="true" />
                      Bullet
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                patch({ sections: [...draft.sections, { heading: "", paragraphs: [""], bullets: [] }] })
              }
              className="inline-flex w-fit items-center gap-2 rounded-full border border-dashed border-stone-900/20 px-5 py-2.5 text-sm font-semibold text-stone-600 hover:bg-white"
            >
              <Plus className="size-4" aria-hidden="true" />
              Add section
            </button>
          </section>

          {/* Takeaways */}
          <section className={card}>
            <h2 className="font-serif text-lg font-semibold text-stone-900">Key takeaways</h2>
            <div className="mt-3 grid gap-2">
              {draft.takeaways.map((t, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    value={t}
                    onChange={(e) =>
                      patch({ takeaways: draft.takeaways.map((x, xi) => (xi === i ? e.target.value : x)) })
                    }
                    aria-label={`Takeaway ${i + 1}`}
                    className={field}
                  />
                  <button
                    type="button"
                    aria-label="Remove takeaway"
                    onClick={() => patch({ takeaways: draft.takeaways.filter((_, xi) => xi !== i) })}
                    className="grid size-8 shrink-0 place-items-center rounded-lg text-stone-400 hover:bg-stone-100"
                  >
                    <Trash2 className="size-3.5" aria-hidden="true" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => patch({ takeaways: [...draft.takeaways, ""] })}
                className="inline-flex w-fit items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-stone-900"
              >
                <Plus className="size-3.5" aria-hidden="true" />
                Takeaway
              </button>
            </div>
          </section>

          {/* FAQs */}
          <section className={card}>
            <h2 className="font-serif text-lg font-semibold text-stone-900">FAQs</h2>
            <div className="mt-3 grid gap-3">
              {draft.faq.map((f, i) => (
                <div key={i} className="rounded-xl bg-stone-50 p-3">
                  <div className="flex items-center gap-2">
                    <input
                      value={f.q}
                      onChange={(e) =>
                        patch({ faq: draft.faq.map((x, xi) => (xi === i ? { ...x, q: e.target.value } : x)) })
                      }
                      placeholder="Question"
                      aria-label={`Question ${i + 1}`}
                      className={field}
                    />
                    <button
                      type="button"
                      aria-label="Remove question"
                      onClick={() => patch({ faq: draft.faq.filter((_, xi) => xi !== i) })}
                      className="grid size-8 shrink-0 place-items-center rounded-lg text-stone-400 hover:bg-white"
                    >
                      <Trash2 className="size-3.5" aria-hidden="true" />
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={f.a}
                    onChange={(e) =>
                      patch({ faq: draft.faq.map((x, xi) => (xi === i ? { ...x, a: e.target.value } : x)) })
                    }
                    placeholder="Answer"
                    aria-label={`Answer ${i + 1}`}
                    className={`${field} mt-2`}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => patch({ faq: [...draft.faq, { q: "", a: "" }] })}
                className="inline-flex w-fit items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-stone-900"
              >
                <Plus className="size-3.5" aria-hidden="true" />
                Question
              </button>
            </div>
          </section>

          {showPreview ? (
            <section className={card}>
              <h2 className="font-serif text-lg font-semibold text-stone-900">Preview</h2>
              <article className="prose-none mt-4">
                {draft.cover ? (
                  <img src={draft.cover} alt={draft.coverAlt || draft.title} className="w-full rounded-xl" />
                ) : null}
                <h3 className="mt-4 font-serif text-2xl font-semibold text-stone-900">{draft.title}</h3>
                <p className="mt-2 text-sm leading-7 text-stone-600">{draft.intro}</p>
                {draft.sections.map((s, i) => (
                  <div key={i} className="mt-6">
                    <h4 className="font-serif text-lg font-semibold text-stone-900">{s.heading}</h4>
                    {s.paragraphs.map((p, pi) => (
                      <p
                        key={pi}
                        className="mt-2 text-sm leading-7 text-stone-600"
                        dangerouslySetInnerHTML={{ __html: p }}
                      />
                    ))}
                    {(s.bullets ?? []).length ? (
                      <ul className="mt-3 list-disc pl-5 text-sm leading-7 text-stone-600">
                        {(s.bullets ?? []).map((b, bi) => (
                          <li key={bi}>{b}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </article>
            </section>
          ) : null}
        </div>

        {/* Settings column */}
        <div className="grid gap-5">
          <section className={card}>
            <h2 className="font-serif text-lg font-semibold text-stone-900">Cover image</h2>
            {draft.cover ? (
              <img
                src={draft.cover}
                alt={draft.coverAlt || "Cover preview"}
                className="mt-3 w-full rounded-xl border border-stone-900/10"
              />
            ) : (
              <p className="mt-3 rounded-xl border border-dashed border-stone-900/15 p-5 text-center text-xs text-stone-500">
                No cover yet
              </p>
            )}
            <input
              ref={coverRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onCover(f);
                e.target.value = "";
              }}
            />
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => coverRef.current?.click()}
                className="flex-1 rounded-lg bg-stone-900 px-3 py-2 text-sm font-semibold text-white"
              >
                Upload
              </button>
              {draft.cover ? (
                <button
                  type="button"
                  onClick={() => patch({ cover: "" })}
                  className="rounded-lg border border-stone-900/15 px-3 py-2 text-sm font-semibold text-stone-600"
                >
                  Remove
                </button>
              ) : null}
            </div>
            <input
              value={draft.coverAlt ?? ""}
              onChange={(e) => patch({ coverAlt: e.target.value })}
              placeholder="Describe the image"
              aria-label="Cover image description"
              className={`${field} mt-3`}
            />
          </section>

          <section className={card}>
            <h2 className="font-serif text-lg font-semibold text-stone-900">Search preview</h2>
            <div className="mt-3 rounded-xl bg-stone-50 p-3">
              <p className="truncate text-sm font-semibold text-blue-700">
                {draft.metaTitle || draft.title || "Article title"}
              </p>
              <p className="mt-0.5 truncate text-xs text-emerald-700">
                serverfy.in/blog/{draft.slug || "your-article"}
              </p>
              <p className="mt-1 line-clamp-2 text-xs text-stone-600">
                {draft.description || draft.excerpt || "Short description shown in search results."}
              </p>
            </div>
            <div className="mt-3 grid gap-3">
              <div>
                <label className={label} htmlFor="metaTitle">
                  Meta title ({(draft.metaTitle || draft.title).length}/60)
                </label>
                <input
                  id="metaTitle"
                  value={draft.metaTitle}
                  onChange={(e) => patch({ metaTitle: e.target.value })}
                  className={`${field} mt-2`}
                />
              </div>
              <div>
                <label className={label} htmlFor="description">
                  Meta description ({draft.description.length}/160)
                </label>
                <textarea
                  id="description"
                  rows={3}
                  value={draft.description}
                  onChange={(e) => patch({ description: e.target.value })}
                  className={`${field} mt-2`}
                />
              </div>
              <div>
                <label className={label} htmlFor="keywords">
                  Keywords
                </label>
                <input
                  id="keywords"
                  value={draft.keywords}
                  onChange={(e) => patch({ keywords: e.target.value })}
                  className={`${field} mt-2`}
                />
              </div>
            </div>
          </section>

          <section className={card}>
            <h2 className="font-serif text-lg font-semibold text-stone-900">Article settings</h2>
            <div className="mt-3 grid gap-3">
              <div>
                <label className={label} htmlFor="tags">
                  Tags (comma separated)
                </label>
                <input
                  id="tags"
                  value={draft.tags.join(", ")}
                  onChange={(e) =>
                    patch({ tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })
                  }
                  className={`${field} mt-2`}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={label} htmlFor="date">
                    Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    value={draft.date}
                    onChange={(e) => patch({ date: e.target.value })}
                    className={`${field} mt-2`}
                  />
                </div>
                <div>
                  <label className={label} htmlFor="readMinutes">
                    Read time (min)
                  </label>
                  <input
                    id="readMinutes"
                    type="number"
                    min={1}
                    max={120}
                    value={draft.readMinutes}
                    onChange={(e) => patch({ readMinutes: Number(e.target.value) || 1 })}
                    className={`${field} mt-2`}
                  />
                </div>
              </div>
              <div>
                <label className={label} htmlFor="author">
                  Author
                </label>
                <input
                  id="author"
                  value={draft.author}
                  onChange={(e) => patch({ author: e.target.value })}
                  className={`${field} mt-2`}
                />
                <input
                  value={draft.authorRole}
                  onChange={(e) => patch({ authorRole: e.target.value })}
                  aria-label="Author role"
                  className={`${field} mt-2`}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={label} htmlFor="tint">
                    Accent colour
                  </label>
                  <select
                    id="tint"
                    value={draft.tint}
                    onChange={(e) => patch({ tint: e.target.value as BlogPostDraft["tint"] })}
                    className={`${field} mt-2`}
                  >
                    {TINTS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={label} htmlFor="icon">
                    Icon
                  </label>
                  <select
                    id="icon"
                    value={draft.icon}
                    onChange={(e) => patch({ icon: e.target.value })}
                    className={`${field} mt-2`}
                  >
                    {[...new Set([draft.icon, ...ICONS])].map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <label className="flex items-center gap-2.5 text-sm font-semibold text-stone-700">
                <input
                  type="checkbox"
                  checked={draft.featured}
                  onChange={(e) => patch({ featured: e.target.checked })}
                  className="size-4"
                />
                Show in the featured carousel
              </label>
              {!isNew && draft.status === "published" ? (
                <button
                  type="button"
                  onClick={() => void save("draft")}
                  className="rounded-lg border border-stone-900/15 px-3 py-2 text-sm font-semibold text-stone-700"
                >
                  Unpublish
                </button>
              ) : null}
            </div>
          </section>

          <p className="text-center text-xs text-stone-400">
            Console: <span className="font-mono">{ADMIN_BASE}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
