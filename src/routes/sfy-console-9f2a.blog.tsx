import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { BookOpen, LayoutDashboard, LogOut, PenLine } from "lucide-react";
import { ADMIN_BASE } from "@/lib/admin-api";
import { can, useAdminSession } from "@/lib/use-admin-session";

export const Route = createFileRoute("/sfy-console-9f2a/blog")({
  ssr: false,
  component: BlogPanelLayout,
  head: () => ({
    meta: [{ title: "Blog studio" }, { name: "robots", content: "noindex, nofollow, noarchive" }],
  }),
});

function BlogPanelLayout() {
  const { user, checking, signOut } = useAdminSession();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (checking) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f6f1e9]">
        <p className="text-sm font-semibold text-stone-500">Checking your access…</p>
      </div>
    );
  }

  if (!can(user, "blog")) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f6f1e9] px-6 text-center">
        <div>
          <h1 className="font-serif text-2xl text-stone-800">No access to the blog studio</h1>
          <p className="mt-3 text-sm text-stone-500">
            Ask an owner to give your account blog access.
          </p>
          <button
            type="button"
            onClick={signOut}
            className="mt-6 rounded-full bg-stone-900 px-5 py-2 text-sm font-semibold text-white"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  const isList = pathname === `${ADMIN_BASE}/blog` || pathname === `${ADMIN_BASE}/blog/`;

  return (
    <div className="min-h-screen bg-[#f6f1e9] text-stone-800 [font-feature-settings:'ss01']">
      <header className="sticky top-0 z-40 border-b border-stone-900/10 bg-[#f6f1e9]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
          <Link
            to={`${ADMIN_BASE}/blog`}
            className="flex items-center gap-2.5 text-stone-900"
            aria-label="Blog studio home"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-stone-900 text-[#f6f1e9]">
              <BookOpen className="size-4" aria-hidden="true" />
            </span>
            <span className="font-serif text-lg font-semibold tracking-tight">Blog studio</span>
          </Link>

          <nav className="ml-auto flex flex-wrap items-center gap-2 text-sm">
            <Link
              to={`${ADMIN_BASE}/blog`}
              className={`rounded-full px-3.5 py-1.5 font-semibold transition-colors ${
                isList ? "bg-stone-900 text-[#f6f1e9]" : "text-stone-600 hover:bg-stone-900/5"
              }`}
            >
              Articles
            </Link>
            <Link
              to={`${ADMIN_BASE}/blog/$id`}
              params={{ id: "new" }}
              className="inline-flex items-center gap-1.5 rounded-full bg-orange px-3.5 py-1.5 font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              <PenLine className="size-3.5" aria-hidden="true" />
              New article
            </Link>
            {can(user, "analytics") || can(user, "leads") ? (
              <Link
                to={`${ADMIN_BASE}/dashboard`}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-semibold text-stone-600 hover:bg-stone-900/5"
              >
                <LayoutDashboard className="size-3.5" aria-hidden="true" />
                Data console
              </Link>
            ) : null}
            <button
              type="button"
              onClick={signOut}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-semibold text-stone-500 hover:bg-stone-900/5"
            >
              <LogOut className="size-3.5" aria-hidden="true" />
              Sign out
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-20 pt-6 sm:px-6">
        <Outlet />
      </main>
    </div>
  );
}
