import { Plus } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Primitives";
import { faqs } from "@/data/serverfy";

export function FAQ() {
  return (
    <section id="faq" className="section-y bg-soft-tint">
      <div className="container-fy grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            eyebrow="FAQ"
            align="left"
            title="Questions, answered"
            sub="Still unsure about something? Send your requirement and we will confirm availability for your exact module and version."
          />
          <Reveal delay={0.1}>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full icon-tile px-6 py-3 text-sm font-extrabold"
            >
              Ask your question
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <ul className="grid gap-3">
            {faqs.map((f, i) => (
              <li key={f.q}>
                <details className="group rounded-2xl faq-row px-5 py-1">
                  <summary className="flex cursor-pointer list-none items-center gap-4 py-4 text-left text-[0.95rem] font-extrabold text-foreground transition-colors hover:text-orange [&::-webkit-details-marker]:hidden">
                    <span className="hidden shrink-0 font-mono text-[0.7rem] font-bold tracking-widest text-muted-foreground/70 sm:block">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">{f.q}</span>
                    <span className="grid size-8 shrink-0 place-items-center rounded-full icon-tile-soft transition-transform duration-300 group-open:rotate-45">
                      <Plus className="size-4" aria-hidden="true" />
                    </span>
                  </summary>
                  <p className="border-t border-border pb-5 pt-4 text-sm leading-relaxed text-muted-foreground sm:pl-10">
                    {f.a}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
