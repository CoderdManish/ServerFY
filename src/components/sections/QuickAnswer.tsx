/**
 * Answer-first block: a direct answer to the page's core question,
 * placed high on the page so people and AI search engines can extract it.
 */
export function QuickAnswer({ question, answer }: { question: string; answer: string }) {
  return (
    <section className="section-y-sm bg-soft-tint">
      <div className="container-fy">
        <div className="glass-panel rounded-2xl border-l-4 border-l-orange p-6 sm:p-8">
          <p className="type-eyebrow text-orange">In short</p>
          <h2 className="mt-3 text-xl font-black tracking-tight text-foreground sm:text-2xl">{question}</h2>
          <p className="mt-4 max-w-4xl text-[0.98rem] leading-relaxed text-muted-foreground">{answer}</p>
        </div>
      </div>
    </section>
  );
}
