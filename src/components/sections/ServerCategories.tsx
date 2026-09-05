import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/Icon";
import { Reveal, SectionHeading } from "@/components/Primitives";
import { serverCategories } from "@/data/serverfy";

export function ServerCategories() {
  return (
    <section id="servers" className="section-y relative bg-soft-tint">
      <div className="container-fy">
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

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {serverCategories.map((c, i) => (
            <Reveal as="li" key={c.title} delay={(i % 4) * 0.06} y={16}>
              <a
                href="#pricing"
                className="card-hover group flex h-full items-start gap-4 rounded-2xl neu-card p-5"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl icon-tile transition-transform duration-300 group-hover:scale-105">
                  <Icon name={c.icon} className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5 text-[1rem] font-extrabold text-foreground">
                    {c.title}
                    <ArrowUpRight
                      className="size-4 text-orange opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{c.desc}</span>
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
