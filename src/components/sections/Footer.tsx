import { Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone, Youtube } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Link } from "@tanstack/react-router";
import { footerColumns, modules, site } from "@/data/serverfy";
import { linkFor } from "@/data/links";
import { moduleSlug } from "@/data/module-pages";
import { compareLinks, guideLinks, serverLinks, solutionLinks } from "@/data/site-index";

function LinkRow({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="type-eyebrow text-white/80">{title}</h2>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[0.78rem]">{children}</ul>
    </div>
  );
}

function LinkChip({ to, label }: { to: string; label: string }) {
  return (
    <li>
      <Link to={to} className="text-white/55 transition-colors hover:text-orange">
        {label}
      </Link>
    </li>
  );
}

const columnHref: Record<string, string> = {
  "SAP Servers": "/servers",
  "SAP Modules": "/modules",
  Solutions: "/solutions",
  Resources: "/resources",
  Company: "/about",
  Support: "/contact",
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
                { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/serverfy/" },
                { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/profile.php?id=61594163638065" },
                { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/server_fy/?hl=en" },
                { icon: Youtube, label: "YouTube", href: "#" },
              ].map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
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
                        to={linkFor[l] ?? columnHref[col.title] ?? "/contact"}
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

        <nav aria-label="Browse everything" className="mt-12 space-y-6 border-t border-white/10 pt-8">
          <LinkRow title="SAP module server access">
            {modules.map((m) => (
              <LinkChip key={m.code} to={`/modules/${moduleSlug(m.code)}`} label={`SAP ${m.code}`} />
            ))}
          </LinkRow>
          <LinkRow title="SAP server environments">
            {serverLinks.map((l) => (
              <LinkChip key={l.to} to={l.to} label={l.label} />
            ))}
          </LinkRow>
          <LinkRow title="Solutions by need">
            {solutionLinks.map((l) => (
              <LinkChip key={l.to} to={l.to} label={l.label} />
            ))}
          </LinkRow>
          <LinkRow title="Comparisons">
            {compareLinks.map((l) => (
              <LinkChip key={l.to} to={l.to} label={l.label} />
            ))}
          </LinkRow>
          <LinkRow title="Guides & knowledge base">
            {guideLinks.map((l) => (
              <LinkChip key={l.to} to={l.to} label={l.label} />
            ))}
          </LinkRow>
        </nav>

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
