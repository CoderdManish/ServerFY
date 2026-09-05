import { cn } from "@/lib/utils";
import mark from "@/assets/serverfy-mark.webp";

/** ServerFY brand lockup — official mark artwork plus the wordmark. */
export function Logo({ variant = "dark", className }: { variant?: "dark" | "light"; className?: string }) {
  const wordColor = variant === "light" ? "text-white" : "text-navy";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <img
        src={mark}
        alt="ServerFY"
        width={72}
        height={83}
        decoding="async"
        fetchPriority="high"
        className="h-9 w-auto shrink-0 object-contain"
      />
      <span className={cn("text-[1.35rem] font-extrabold leading-none tracking-tight", wordColor)} aria-hidden="true">
        Server<span className="text-orange">FY</span>
      </span>
    </span>
  );
}
