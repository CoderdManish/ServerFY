import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export type Crumb = { name: string; to?: string };

/**
 * Visual breadcrumb trail. Pair with `breadcrumbList()` from @/lib/seo so the
 * same trail is emitted as BreadcrumbList JSON-LD.
 */
export function Breadcrumbs({
  items,
  variant = "dark",
  className = "",
}: {
  items: Crumb[];
  variant?: "dark" | "light";
  className?: string;
}) {
  const base = variant === "dark" ? "text-white/55" : "text-muted-foreground";
  const linkCls =
    variant === "dark" ? "transition-colors hover:text-white" : "transition-colors hover:text-orange";
  const currentCls = variant === "dark" ? "text-white/85" : "text-foreground";

  return (
    <nav aria-label="Breadcrumb" className={`text-xs font-semibold ${base} ${className}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.name}-${i}`} className="flex items-center gap-1.5">
              {item.to && !last ? (
                <Link to={item.to} className={linkCls}>
                  {item.name}
                </Link>
              ) : (
                <span className={last ? currentCls : undefined} aria-current={last ? "page" : undefined}>
                  {item.name}
                </span>
              )}
              {last ? null : <ChevronRight className="size-3.5 opacity-70" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
