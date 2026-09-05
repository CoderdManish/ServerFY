import * as Lucide from "lucide-react";
import type { LucideProps } from "lucide-react";

type IconRegistry = Record<string, React.ComponentType<LucideProps>>;

/**
 * Renders a Lucide icon by name (icon names are stored in src/data/serverfy.ts).
 * Falls back to a neutral icon when a name is unknown.
 */
export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const registry = Lucide as unknown as IconRegistry;
  const Cmp = registry[name] ?? Lucide.Circle;
  return <Cmp aria-hidden="true" {...props} />;
}
