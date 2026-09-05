import { Linkedin, Mail, MapPin, MessageCircle, Phone, Twitter, Youtube } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Link } from "@tanstack/react-router";
import { footerColumns, site } from "@/data/serverfy";

const columnHref: Record<string, string> = {
  "SAP Servers": "/servers",
  "SAP Modules": "/modules",
  Solutions: "/solutions",
  Resources: "/resources",
  Company: "/about",
  Support: "/contact",
};

const linkHref: Record<string, string> = {
  Terms: "/terms",
  Privacy: "/privacy",
  FAQs: "/resources",
  Contact: "/contact",
  "Contact Support": "/contact",
  About: "/about",
  "Why ServerFY": "/about",
};

export function Footer() {
  return (
    <footer className="bg-navy-dark pt-16 pb-8 text-white/70">
      <div className="container-fy">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2.8fr]">
          <div>
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              Reliable SAP server infrastructure for learning, training, development, testing and professional SAP
              environments.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm">
              <li>
                <a href={site.phoneHref} className="flex items-center gap-2.5 hover:text-white">
                  <Phone className="size-4 text-orange" aria-hidden="true" /> {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 hover:text-white">
                  <Mail className="size-4 text-orange" aria-hidden="true" /> {site.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="size-4 text-orange" aria-hidden="true" /> {site.address}
              </li>
            </ul>
            <ul className="mt-6 flex gap-2">
              {[
                { icon: MessageCircle, label: "WhatsApp", href: site.whatsapp },
                { icon: Linkedin, label: "LinkedIn", href: "#" },
                { icon: Twitter, label: "X", href: "#" },
                { icon: Youtube, label: "YouTube", href: "#" },
              ].map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="grid size-11 place-items-center rounded-xl border border-white/10 transition-colors hover:border-orange hover:text-white"
                  >
                    <s.icon className="size-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h2 className="type-eyebrow text-white">{col.title}</h2>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {col.links.map((l) => (
                    <li key={l}>
                      <Link
                        to={linkHref[l] ?? columnHref[col.title] ?? "/contact"}
                        className="text-white/60 transition-colors hover:text-orange"
                      >
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 ServerFY. All Rights Reserved.</p>
          <p className="max-w-xl sm:text-right">
            SAP and its product names are trademarks of SAP SE. ServerFY is an independent infrastructure provider and is
            not affiliated with, endorsed by or a partner of SAP SE.
          </p>
        </div>
      </div>
    </footer>
  );
}
