# Blog panel + dynamic blog

## 1. Is the dashboard protected?

Yes. Both console pages are behind email + password sign-in: the dashboard asks the data service "who am I?" on load and signs you out immediately if the session is missing or expired. The address itself is hidden and blocked from search engines. One gap to close: right now the dashboard shows a flash of layout before that check finishes — I'll add a proper "checking access" screen so nothing renders until the person is confirmed.

## 2. A separate blog panel

A new sign-in area for blog writers at the same hidden address, but a different section: `/sfy-console-9f2a/blog`.

- New permission: **blog**. People with only this permission see the blog panel and nothing else — no leads, no visitor analytics, no team management.
- People with leads/analytics permission don't see the blog panel unless you give it to them.
- The team screen gets "Blog editor" as a role option so you can create writer accounts.
- Distinct look for the blog panel: lighter editorial theme (paper background, serif headings, wide writing column) versus the dark data theme of the analytics dashboard, so the two never feel like the same screen.

## 3. What the blog panel can do

- List all posts with status (draft / scheduled / published), search, category filter, and view counts.
- Create, edit, duplicate, unpublish, and delete posts.
- Full article editor matching everything the current blog articles support: title, URL slug (auto-generated, editable), excerpt, intro, cover image + alt text, category, tags, author + role, publish date, read time (auto-estimated), accent colour, icon, featured toggle, sections (heading, paragraphs, bullet points), key takeaways, and FAQs.
- Rich text inside paragraphs: bold, italic, links (internal ServerFY links and external), lists — so hyperlinked text works exactly like today's articles.
- SEO fields: meta title, meta description, keywords, with live preview of how it looks in search results.
- Category manager: add, rename, delete the categories used by the blog filter chips.
- Cover image upload.
- Live preview of the article exactly as it will appear on the public blog.

## 4. Word document import

Upload a `.docx` and the panel reads it and fills the article for you: title from the first heading, sections from the following headings, paragraphs and bullet lists preserved, hyperlinks kept as links, FAQ-style headings turned into FAQ entries, read time estimated, and images pulled out and offered as the cover. You review and edit before publishing.

## 5. The public blog becomes dynamic

`/blog` and `/blog/<slug>` read posts from the data service instead of the code file. Published posts appear immediately; drafts never appear. The existing articles are moved into the database on first start, so nothing is lost and the current design, featured carousel, categories, breadcrumbs, and SEO/structured data stay exactly as they are. If the data service is unreachable, the site falls back to the built-in copies so the blog never goes blank.

## 6. Technical notes

- **Backend (`backend/`)**: new `models/BlogPost.js` (full post shape, slug unique, status, publishedAt, views, indexes) and `models/BlogCategory.js`; new `routes/blog.js` with public `GET /api/blog` + `GET /api/blog/:slug` (published only) and protected CRUD, category CRUD, `POST /api/blog/import-docx` (mammoth → HTML → section parser), and cover upload stored as a URL. Add `blog` to `PERMISSIONS` in `AdminUser.js`, mount the router in `app.js`, add `mammoth` + `multer` deps, and a one-time seeder that copies `src/data/blog.ts` content into Mongo.
- **Frontend**: `src/lib/blog-api.ts` for typed fetches; `blog.index.tsx` / `blog.$slug.tsx` load from the API with the existing static array as SSR/offline fallback and unchanged markup; new routes `sfy-console-9f2a.blog.tsx` (panel shell + editorial theme), `.blog.index.tsx` (post list), `.blog.$id.tsx` (editor). `admin-api.ts` gains blog endpoints and the `blog` permission type; the analytics dashboard links to the panel only when permitted.
- Sitemap and `llms.txt` switch to the dynamic post list.
- Everything responsive at phone, tablet, and desktop widths, verified in the browser.
