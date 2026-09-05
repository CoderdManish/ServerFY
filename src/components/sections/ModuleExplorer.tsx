import { Link } from "@tanstack/react-router";
import { moduleSlug } from "@/data/module-pages";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Icon } from "@/components/Icon";
import { SectionHeading } from "@/components/Primitives";
import { modules } from "@/data/serverfy";
import { cn } from "@/lib/utils";

const filters = ["All", "Functional", "Technical", "S/4HANA", "ECC", "HANA"] as const;
type Filter = (typeof filters)[number];

export function ModuleExplorer() {
  const [tab, setTab] = useState<"functional" | "technical">("functional");
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return modules.filter((m) => {
      const matchesTab =
        filter === "Functional" ? m.type === "functional" : filter === "Technical" ? m.type === "technical" : m.type === tab;
      const platformOk =
        filter === "S/4HANA" || filter === "ECC" || filter === "HANA" ? m.platforms.includes(filter) : true;
      const inTab = filter === "S/4HANA" || filter === "ECC" || filter === "HANA" ? m.type === tab : matchesTab;
      const matchesQuery = !q || `${m.code} ${m.name} ${m.desc}`.toLowerCase().includes(q);
      return inTab && platformOk && matchesQuery;
    });
  }, [tab, filter, query]);

  return (
    <section id="modules" className="section-y bg-soft-mesh">
      <div className="container-fy">
        <SectionHeading
          eyebrow="Module explorer"
          title="Explore SAP Modules"
          sub="Search the catalogue, filter by platform, and see which functional and technical environments are ready to provision."
        />

        <div className="mt-10 glass-panel rounded-3xl p-4 sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center">
            <div
              role="tablist"
              aria-label="Module type"
              className="relative inline-flex w-full rounded-xl border border-border bg-card p-1 sm:w-auto"
            >
              {(["functional", "technical"] as const).map((t) => (
                <button
                  key={t}
                  role="tab"
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                  className={cn(
                    "relative z-10 min-h-11 flex-1 rounded-lg px-5 text-[0.78rem] font-extrabold uppercase tracking-wider transition-colors sm:flex-none",
                    tab === t ? "text-white" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {tab === t ? (
                    <span className="absolute inset-0 -z-10 rounded-lg bg-navy" />
                  ) : null}
                  {t} modules
                </button>
              ))}
            </div>

            <label className="relative block">
              <span className="sr-only">Search SAP module</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search SAP Module..."
                className="h-12 w-full rounded-xl border border-border bg-card pl-11 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-blue-bright"
              />
            </label>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-bold transition-all",
                  filter === f
                    ? "border-blue bg-blue text-white"
                    : "border-border bg-card text-muted-foreground hover:border-blue-bright hover:text-blue",
                )}
              >
                {f}
              </button>
            ))}
          </div>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {list.map((m) => (
              <li key={m.code} className="group neu-card rail-card flex flex-col rounded-2xl p-5">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl icon-tile transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
                    <Icon name={m.icon} className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <h3 className="truncate text-base font-extrabold text-foreground">
                      <Link to="/modules/$code" params={{ code: moduleSlug(m.code) }} className="hover:text-orange">
                        SAP {m.code}
                      </Link>
                    </h3>
                    <span className="block truncate text-xs font-semibold text-blue">{m.name}</span>
                  </span>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2.5 py-1 text-[0.62rem] font-extrabold uppercase tracking-wider",
                      m.availability === "Available"
                        ? "bg-accent text-blue"
                        : "bg-orange/12 text-orange ring-1 ring-orange/25",
                    )}
                  >
                    {m.availability}
                  </span>
                </div>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>

                <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-4">
                  <span className="flex min-w-0 flex-wrap gap-1">
                    {m.platforms.map((p) => (
                      <span
                        key={p}
                        className="rounded-md neu-inset px-2 py-1 text-[0.62rem] font-bold text-muted-foreground"
                      >
                        {p}
                      </span>
                    ))}
                  </span>
                  <Link
                    to="/modules/$code"
                    params={{ code: moduleSlug(m.code) }}
                    className="inline-flex shrink-0 items-center gap-1 text-xs font-extrabold text-blue transition-colors group-hover:text-orange"
                  >
                    View details
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>


          {list.length === 0 ? (
            <p className="py-14 text-center text-sm text-muted-foreground">
              No modules match that search. Try another module name or clear the filters.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
