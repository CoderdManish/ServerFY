import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll reveal that can never leave content invisible.
 *
 * - Server-rendered markup is fully visible (good for SEO, LCP and no CLS).
 * - After mount, only elements that are still below the viewport are hidden,
 *   then revealed by IntersectionObserver.
 * - A safety timer reveals anything the observer never reports.
 */
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
  const [state, setState] = useState<"idle" | "pending" | "in">("idle");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) return; // already on screen: leave as is

    setState("pending");
    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      setState("in");
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          show();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
    );
    io.observe(node);
    const timer = window.setTimeout(show, 2500);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={className}
      {...(state === "idle" ? {} : { "data-reveal": state })}
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
