import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { site } from "@/data/serverfy";

/** Local contact details — also the human-readable source for the LocalBusiness markup. */
export function ContactStrip() {
  return (
    <section className="section-y bg-soft-mesh">
      <div className="container-fy">
        <p className="type-eyebrow text-orange">Talk to us</p>
        <h2 className="mt-3 text-2xl font-black tracking-tight text-foreground sm:text-3xl">
          Call, message or write — we answer the same working day
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <li className="neu-card rounded-2xl p-5">
            <span className="icon-tile grid size-11 place-items-center rounded-xl">
              <Phone className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-sm font-black uppercase tracking-wider text-muted-foreground">Phone</h3>
            <a href={site.phoneHref} className="mt-1 block text-base font-bold text-foreground hover:text-orange">
              {site.phone}
            </a>
          </li>
          <li className="neu-card rounded-2xl p-5">
            <span className="icon-tile grid size-11 place-items-center rounded-xl">
              <MessageCircle className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-sm font-black uppercase tracking-wider text-muted-foreground">WhatsApp</h3>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-1 block text-base font-bold text-foreground hover:text-orange"
            >
              Chat on {site.phone}
            </a>
          </li>
          <li className="neu-card rounded-2xl p-5">
            <span className="icon-tile grid size-11 place-items-center rounded-xl">
              <Mail className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-sm font-black uppercase tracking-wider text-muted-foreground">Email</h3>
            <a href={`mailto:${site.email}`} className="mt-1 block text-base font-bold text-foreground hover:text-orange">
              {site.email}
            </a>
          </li>
          <li className="neu-card rounded-2xl p-5">
            <span className="icon-tile grid size-11 place-items-center rounded-xl">
              <MapPin className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-sm font-black uppercase tracking-wider text-muted-foreground">Office</h3>
            <address className="mt-1 text-base font-bold not-italic text-foreground">{site.address}</address>
          </li>
        </ul>
      </div>
    </section>
  );
}
