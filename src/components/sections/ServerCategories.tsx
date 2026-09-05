import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/Icon";
import { Reveal, SectionHeading } from "@/components/Primitives";
import { Link } from "@tanstack/react-router";
import { serverCategories } from "@/data/serverfy";
import { linkFor } from "@/data/links";

export function ServerCategories() {
  return (
    <section id="servers" className="section-y relative bg-soft-tint">
      <div className="container-fy">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <SectionHeading
            eyebrow="Server types"
            title={
              <>
                Every SAP environment,
                <br className="hidden sm:block" /> ready when you are.
              </>
            }
            sub="Choose the landscape that matches your work — from a shared practice client to a fully dedicated SAP server."
            align="left"
          />
          <Reveal className="lg:justify-self-end">
            <Link
              to="/servers"
              className="group inline-flex items-center gap-2 rounded-full glass-panel px-5 py-3 text-sm font-extrabold text-foreground"
            >
              Browse all server types
              <ArrowUpRight className="size-4 text-orange transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {serverCategories.map((c, i) => (
            <Reveal as="li" key={c.title} delay={(i % 4) * 0.06} y={16}>
              <Link
                to={linkFor[c.title] ?? "/servers"}
                className="group flex h-full flex-col rounded-2xl neu-card rail-card p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl icon-tile transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
                    <Icon name={c.icon} className="size-5" />
                  </span>
                  <span className="font-mono text-[0.65rem] font-bold tracking-widest text-muted-foreground/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-5 text-[1.05rem] font-extrabold text-foreground">{c.title}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>

                <span className="mt-5 flex items-center gap-1.5 border-t border-border pt-4 text-xs font-extrabold text-blue transition-colors group-hover:text-orange">
                  View details
                  <ArrowUpRight
                    className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
