type Section = { heading: string; body: string };

export function LegalBody({ sections }: { sections: Section[] }) {
  return (
    <section className="section-y bg-soft-mesh">
      <div className="container-fy">
        <div className="glass-panel mx-auto max-w-3xl rounded-3xl p-6 sm:p-10">
          <ol className="space-y-8">
            {sections.map((s, i) => (
              <li key={s.heading}>
                <h2 className="flex items-start gap-3 text-lg font-black tracking-tight text-foreground">
                  <span className="icon-tile-soft mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg text-xs font-black">
                    {i + 1}
                  </span>
                  {s.heading}
                </h2>
                <p className="mt-2.5 pl-10 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
