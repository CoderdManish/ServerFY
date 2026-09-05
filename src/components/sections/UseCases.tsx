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
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {useCases.map((u, i) => (
            <Reveal
              as="li"
              key={u.title}
              delay={(i % 4) * 0.06}
              y={16}
              className="neu-card group rounded-2xl p-5"
            >
              <span className="grid size-10 place-items-center rounded-xl icon-tile transition-transform duration-300 group-hover:scale-105">
                <Icon name={u.icon} className="size-4.5" />
              </span>
              <h3 className="mt-4 text-sm font-extrabold text-foreground sm:text-base">
                <Link to={linkFor[u.title] ?? "/solutions"} className="hover:text-orange">
                  {u.title}
                </Link>
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">{u.desc}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
