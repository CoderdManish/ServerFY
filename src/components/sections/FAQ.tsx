import { ChevronDown } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Primitives";
import { faqs } from "@/data/serverfy";

export function FAQ() {
  return (
    <section id="faq" className="section-y bg-soft-tint">
      <div className="container-fy grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <SectionHeading
          eyebrow="FAQ"
          align="left"
          title="Questions, answered"
          sub="Still unsure about something? Send your requirement and we will confirm availability for your exact module and version."
        />

        <Reveal delay={0.08}>
          <div className="w-full">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-border open:border-blue-bright/40">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-[0.95rem] font-extrabold text-foreground transition-colors hover:text-blue [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <ChevronDown
                    className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
