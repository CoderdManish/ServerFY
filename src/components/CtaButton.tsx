import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const cta = cva(
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold tracking-wide transition-all duration-300 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-orange text-white hover:-translate-y-0.5 hover:bg-orange-light hover:shadow-glow-orange",
        blue: "bg-blue text-white hover:-translate-y-0.5 hover:bg-blue-bright hover:shadow-lift",
        outlineLight:
          "border border-white/25 bg-white/5 text-white backdrop-blur hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10",
        outlineDark:
          "border border-border bg-white text-navy hover:-translate-y-0.5 hover:border-blue-bright hover:shadow-card",
        outlineBlue:
          "border border-blue/40 bg-white text-blue hover:-translate-y-0.5 hover:border-blue hover:shadow-card",
        ghost: "text-blue hover:text-blue-bright",
      },
      size: {
        sm: "h-10 px-4 text-[0.8rem]",
        md: "h-12 px-6",
        lg: "h-14 px-7 text-[0.95rem]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Props = ComponentProps<"a"> & VariantProps<typeof cta> & { as?: "a" | "button" };

export function CtaButton({ className, variant, size, as = "a", ...props }: Props) {
  const Tag = as as "a";
  return <Tag className={cn(cta({ variant, size }), className)} {...props} />;
}

export const ctaClasses = cta;
