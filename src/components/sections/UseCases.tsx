import { Icon } from "@/components/Icon";
import { Reveal, SectionHeading } from "@/components/Primitives";
import { useCases } from "@/data/serverfy";

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
              className="card-hover group rounded-2xl border border-border bg-background p-5"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-navy text-white transition-colors duration-300 group-hover:bg-orange">
                <Icon name={u.icon} className="size-4.5" />
              </span>
              <h3 className="mt-4 text-sm font-extrabold text-foreground sm:text-base">{u.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">{u.desc}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
