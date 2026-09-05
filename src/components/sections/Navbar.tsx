import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Phone, X, ChevronDown, MessageCircle, ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Icon } from "@/components/Icon";
import { CtaButton } from "@/components/CtaButton";
import { megaMenus, nav, site } from "@/data/serverfy";
import { cn } from "@/lib/utils";

type MenuKey = keyof typeof megaMenus;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("#top");
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = nav.map((n) => n.href).filter((h) => h.startsWith("#"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0.01, 0.25, 0.6] },
    );
    ids.forEach((id) => {
      const el = document.querySelector(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const hoverOpen = (key: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(key);
  };
  const hoverClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-white/10 bg-navy-dark/85 backdrop-blur-xl" : "bg-transparent",
      )}
      onMouseLeave={hoverClose}
    >
      <div className="container-fy flex h-16 items-center justify-between gap-4 lg:h-[76px]">
        <a href="#top" className="shrink-0" aria-label="ServerFY home">
          <Logo variant="light" />
        </a>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden items-center gap-0.5 xl:flex">
          {nav.map((item) => {
            const isActive = active === item.href;
            return (
              <div key={item.label} className="relative" onMouseEnter={() => (item.menu ? hoverOpen(item.menu) : hoverClose())}>
                <a
                  href={item.href}
                  aria-haspopup={item.menu ? "true" : undefined}
                  aria-expanded={item.menu ? openMenu === item.menu : undefined}
                  onFocus={() => (item.menu ? hoverOpen(item.menu) : setOpenMenu(null))}
                  className={cn(
                    "relative flex items-center gap-1 rounded-lg px-3 py-2 text-[0.82rem] font-semibold transition-colors",
                    isActive ? "text-white" : "text-white/70 hover:text-white",
                  )}
                >
                  {item.label}
                  {item.menu ? (
                    <ChevronDown
                      className={cn("size-3.5 transition-transform duration-300", openMenu === item.menu && "rotate-180")}
                      aria-hidden="true"
                    />
                  ) : null}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-orange"
                    />
                  ) : null}
                </a>
              </div>
            );
          })}
        </nav>

        {/* Desktop right */}
        <div className="hidden items-center gap-2 xl:flex">
          <a
            href={site.phoneHref}
            className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-[0.8rem] font-semibold text-white/70 transition-colors hover:text-white"
          >
            <Phone className="size-4" aria-hidden="true" />
            <span className="hidden 2xl:inline">{site.phone}</span>
            <span className="sr-only 2xl:hidden">Call ServerFY</span>
          </a>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
            className="grid size-10 place-items-center rounded-lg border border-white/15 text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
          </a>
          <CtaButton href="/contact" size="sm" className="whitespace-nowrap">
            Get Your SAP Server
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </CtaButton>
        </div>

        {/* Mobile right */}
        <div className="flex items-center gap-1.5 xl:hidden">
          <a
            href={site.phoneHref}
            aria-label="Call ServerFY"
            className="grid size-11 place-items-center rounded-lg border border-white/15 text-white/80"
          >
            <Phone className="size-4" aria-hidden="true" />
          </a>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
            className="grid size-11 place-items-center rounded-lg border border-white/15 text-white/80"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-lg bg-white/10 text-white"
          >
            {mobileOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mega menu */}
      <AnimatePresence>
        {openMenu ? (
          <motion.div
            key={openMenu}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full hidden xl:block"
            onMouseEnter={() => hoverOpen(openMenu)}
          >
            <div className="container-fy pb-6">
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lift">
                <div className="grid grid-cols-[280px_repeat(2,minmax(0,1fr))]">
                  <div className="bg-navy-gradient p-7 text-white">
                    <p className="type-eyebrow text-orange">{megaMenus[openMenu].title}</p>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">{megaMenus[openMenu].blurb}</p>
                    <CtaButton href="/contact" size="sm" variant="outlineLight" className="mt-6">
                      Talk to an expert
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </CtaButton>
                  </div>
                  {megaMenus[openMenu].groups.map((group) => (
                    <div key={group.heading} className="p-6">
                      <p className="type-eyebrow text-muted-foreground">{group.heading}</p>
                      <ul className="mt-3 space-y-1">
                        {group.items.map((it) => (
                          <li key={it.label}>
                            <a
                              href="/modules"
                              className="flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-accent"
                              onClick={() => setOpenMenu(null)}
                            >
                              <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg icon-tile-soft">
                                <Icon name={it.icon} className="size-4" />
                              </span>
                              <span className="min-w-0">
                                <span className="block text-sm font-bold text-foreground">{it.label}</span>
                                <span className="block truncate text-xs text-muted-foreground">{it.desc}</span>
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 bg-navy-dark/95 backdrop-blur-xl xl:hidden"
          >
            <nav aria-label="Mobile" className="container-fy max-h-[70vh] overflow-y-auto py-4">
              <ul className="space-y-1">
                {nav.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex min-h-11 items-center justify-between rounded-xl px-3 text-[0.95rem] font-semibold text-white/85 hover:bg-white/5"
                    >
                      {item.label}
                      <ArrowRight className="size-4 text-orange" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
              <CtaButton href="/contact" className="mt-4 w-full" onClick={() => setMobileOpen(false)}>
                Get Your SAP Server
                <ArrowRight className="size-4" aria-hidden="true" />
              </CtaButton>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
