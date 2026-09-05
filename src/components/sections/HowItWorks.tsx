import { Icon } from "@/components/Icon";
import { SectionHeading } from "@/components/Primitives";
import { steps } from "@/data/serverfy";

export function HowItWorks() {
  return (
    <section className="section-y bg-soft-mesh">
      <div className="container-fy">
        <SectionHeading
          eyebrow="How it works"
          title="From request to working SAP session"
          sub="Four steps, no complex setup on your side. You only need a client machine and an internet connection."
        />

        <div className="relative mt-14">
          {/* desktop line */}
          <div className="absolute inset-x-0 top-9 hidden h-0.5 bg-border lg:block">
            <div className="h-full origin-left bg-gradient-to-r from-blue to-orange" />
          </div>
          {/* mobile line */}
          <div className="absolute bottom-0 left-[19px] top-4 w-0.5 bg-border lg:hidden">
            <div className="h-full w-full origin-top bg-gradient-to-b from-blue to-orange" />
          </div>

          <ol className="grid gap-8 lg:grid-cols-4 lg:gap-6">
            {steps.map((s, i) => (
              <li key={s.no} className="anim-rise relative pl-14 lg:pl-0" style={{ animationDelay: `${i * 110}ms` }}>
                <span className="absolute left-0 top-0 grid size-10 place-items-center rounded-xl icon-tile lg:relative lg:mb-6 lg:size-[4.5rem] lg:rounded-2xl">
                  <Icon name={s.icon} className="size-5 lg:size-7" />
                  <span className="absolute -right-1.5 -top-1.5 rounded-full bg-navy px-1.5 py-0.5 text-[0.6rem] font-extrabold text-white lg:-right-2 lg:-top-2 lg:px-2 lg:text-[0.68rem]">
                    {s.no}
                  </span>
                </span>
                <h3 className="text-lg font-extrabold text-foreground">{s.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
