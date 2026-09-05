import { Icon } from "@/components/Icon";

const items = [
  { icon: "Zap", title: "Activated in hours", desc: "Most environments are handed over the same working day, with credentials and a quick-start note." },
  { icon: "ShieldCheck", title: "Secure remote access", desc: "Encrypted logins, isolated users and clean deletion when your environment ends." },
  { icon: "Database", title: "Daily backups", desc: "Snapshots every day with restore on request, so a wrong transport never costs you a week." },
  { icon: "Headphones", title: "Human support", desc: "Reach an SAP infrastructure engineer on call, WhatsApp or email — not a ticket queue." },
];

/** Reusable reassurance band shown across the inner pages. */
export function IncludedBand({
  eyebrow = "Included as standard",
  title = "Everything below comes with every environment",
}: {
  eyebrow?: string;
  title?: string;
}) {
  return (
    <section className="section-y bg-soft-tint">
      <div className="container-fy">
        <p className="type-eyebrow text-orange">{eyebrow}</p>
        <h2 className="mt-3 max-w-2xl text-2xl font-black tracking-tight text-foreground sm:text-3xl">{title}</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <li key={it.title} className="glass-panel rounded-2xl p-5">
              <span className="icon-tile grid size-11 place-items-center rounded-xl">
                <Icon name={it.icon} className="size-5" />
              </span>
              <h3 className="mt-4 text-base font-bold text-foreground">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
