import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal, SectionHeading } from "@/components/Primitives";
import { faqs } from "@/data/serverfy";

export function FAQ() {
  return (
    <section id="faq" className="section-y">
      <div className="container-fy grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <SectionHeading
          eyebrow="FAQ"
          align="left"
          title="Questions, answered"
          sub="Still unsure about something? Send your requirement and we will confirm availability for your exact module and version."
        />

        <Reveal delay={0.08}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="border-b border-border data-[state=open]:border-blue-bright/40"
              >
                <AccordionTrigger className="py-5 text-left text-[0.95rem] font-extrabold text-foreground hover:text-blue hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
