import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/Icon";
import { Reveal, SectionHeading } from "@/components/Primitives";
import { Link } from "@tanstack/react-router";
import { useCases } from "@/data/serverfy";
import { linkFor } from "@/data/links";

export function UseCases() {
  return (
    <section id="use-cases" className="section-y bg-soft-mesh">
      <div className="container-fy">
        <SectionHeading
          eyebrow="Use cases"
          title="Built for how SAP people actually work"
          sub="Students, consultants, trainers and project teams all use ServerFY environments for different outcomes."
        />

        <ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {useCases.map((u, i) => (
            <Reveal as="li" key={u.title} delay={(i % 4) * 0.06} y={16} className="h-full">
              <Link
                to={linkFor[u.title] ?? "/solutions"}
                className="group flex h-full flex-col rounded-2xl neu-card rail-card p-5"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl icon-tile transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
                    <Icon name={u.icon} className="size-5" />
                  </span>
                  <h3 className="min-w-0 flex-1 text-sm font-extrabold text-foreground transition-colors group-hover:text-orange sm:text-base">
                    {u.title}
                  </h3>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-orange opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-4 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {u.desc}
                </p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
