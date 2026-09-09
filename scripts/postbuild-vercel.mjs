// Runs automatically after `npm run build` (npm postbuild hook).
// On Vercel the Nitro build emits .vercel/output but does not write the
// config.json / .vc-config.json files Vercel requires, which makes every
// route return 404. Write them here when a Vercel build output exists.
import { existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outputDir = join(process.cwd(), ".vercel", "output");

if (!existsSync(outputDir)) {
  process.exit(0); // Not a Vercel build (e.g. Lovable hosting) — nothing to do.
}

// Build Output API v3 config: serve prerendered static files first,
// fall back to the catch-all server function for anything dynamic.
writeFileSync(
  join(outputDir, "config.json"),
  JSON.stringify(
    {
      version: 3,
      routes: [
        { handle: "filesystem" },
        { src: "/(.*)", dest: "/__server" },
      ],
    },
    null,
    2,
  ),
);

const funcDir = join(outputDir, "functions", "__server.func");
if (existsSync(funcDir)) {
  writeFileSync(
    join(funcDir, ".vc-config.json"),
    JSON.stringify(
      {
        handler: "index.mjs",
        launcherType: "Nodejs",
        runtime: "nodejs22.x",
        shouldAddHelpers: false,
        supportsResponseStreaming: true,
      },
      null,
      2,
    ),
  );
}

console.log("[postbuild] Wrote Vercel output config files.");
