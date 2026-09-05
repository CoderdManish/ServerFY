import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp, Headphones, MessageCircle } from "lucide-react";
import { site } from "@/data/serverfy";

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2.5 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {showTop ? (
          <motion.button
            key="top"
            type="button"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="grid size-11 place-items-center rounded-full glass-panel text-navy transition-colors hover:border-blue-bright hover:text-blue"
          >
            <ArrowUp className="size-4" aria-hidden="true" />
          </motion.button>
        ) : null}
      </AnimatePresence>

      <a
        href="#contact"
        aria-label="Contact support"
        className="grid size-11 place-items-center rounded-full bg-navy text-white shadow-card transition-transform hover:-translate-y-0.5"
      >
        <Headphones className="size-4" aria-hidden="true" />
      </a>

      <a
        href={site.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with ServerFY on WhatsApp"
        className="flex min-h-11 items-center gap-2 rounded-full bg-[#25D366] px-4 text-sm font-bold text-white shadow-lift transition-transform hover:-translate-y-0.5"
      >
        <MessageCircle className="size-4" aria-hidden="true" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
}
