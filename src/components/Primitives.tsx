import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll reveal that can never leave content invisible.
 *
 * Performance notes:
 * - Server-rendered markup is fully visible (good for SEO, LCP and no CLS).
 * - One shared IntersectionObserver for the whole page instead of one per element.
 * - No getBoundingClientRect() and no React state updates: visibility is toggled
 *   through a data attribute, so revealing never triggers a forced reflow or a
 *   re-render of the section.
 */
let sharedObserver: IntersectionObserver | null = null;

function getObserver() {
  if (sharedObserver || typeof IntersectionObserver === "undefined") return sharedObserver;
  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          el.setAttribute("data-reveal", "in");
          sharedObserver?.unobserve(el);
        } else if (!el.hasAttribute("data-reveal")) {
          // Off-screen on first observation: hide it so it can animate in later.
          el.setAttribute("data-reveal", "pending");
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
  );
  return sharedObserver;
}

export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number | undefined;
  y?: number | undefined;
  className?: string | undefined;
  as?: "div" | "section" | "li" | "span" | "ul" | undefined;
}) {
  const Tag = as;
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = getObserver();
    if (!io) return;
    io.observe(node);
    return () => io.unobserve(node);
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={className}
      style={{ "--reveal-delay": `${Math.round(delay * 1000)}ms`, "--reveal-y": `${y}px` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}


export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <span
      className={cn(
        "type-eyebrow inline-flex items-center gap-2 rounded-full border px-3 py-1.5",
        tone === "light" ? "border-border bg-white text-blue" : "border-white/15 bg-white/5 text-white/80",
      )}
    >
      <span className="size-1.5 rounded-full bg-orange" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  tone = "light",
  align = "center",
  className,
}: {
  eyebrow?: string | undefined;
  title: ReactNode;
  sub?: ReactNode | undefined;
  tone?: "light" | "dark" | undefined;
  align?: "center" | "left" | undefined;
  className?: string | undefined;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2 className={cn("type-section max-w-3xl", tone === "dark" ? "text-white" : "text-foreground")}>{title}</h2>
      {sub ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed",
            tone === "dark" ? "text-white/65" : "text-muted-foreground",
          )}
        >
          {sub}
        </p>
      ) : null}
    </Reveal>
  );
}
