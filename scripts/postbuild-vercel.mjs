// Runs automatically after `npm run build` / `npm run build:dev`.
// Two jobs:
// 1. Always emit a dist/ directory (static output) — the hosting check
//    requires the build to write there.
// 2. On Vercel the Nitro build emits .vercel/output but does not write the
//    config.json / .vc-config.json files Vercel requires, which makes every
//    route return 404. Write them here when a Vercel build output exists.
import { cpSync, existsSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cwd = process.cwd();

// --- 1. dist/ static output -------------------------------------------------
const publicOut = join(cwd, ".output", "public");
const distDir = join(cwd, "dist");
if (existsSync(publicOut)) {
  rmSync(distDir, { recursive: true, force: true });
  cpSync(publicOut, distDir, { recursive: true });
  console.log("[postbuild] Wrote dist/ from .output/public.");
}

// --- 2. Vercel Build Output API config --------------------------------------
const outputDir = join(cwd, ".vercel", "output");

if (existsSync(outputDir)) {
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
}
