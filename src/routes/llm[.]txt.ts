import { createFileRoute } from "@tanstack/react-router";
import { buildLlmsTxt } from "@/lib/llms";

/** Alias for /llms.txt so both common spellings resolve. */
export const Route = createFileRoute("/llm.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildLlmsTxt(), {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});
