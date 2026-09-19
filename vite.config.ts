import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

const PAGES = [
  "/",
  "/servers",
  "/modules",
  "/solutions",
  "/resources",
  "/pricing",
  "/about",
  "/contact",
  "/why-serverfy",
  "/infrastructure",
  "/careers",
  "/sla",
  "/refund-policy",
  "/terms",
  "/privacy",
].map((path) => ({ path }));

export default defineConfig({
  server: { port: 8080, host: true },
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      pages: PAGES,
      prerender: { enabled: true, autoStaticPathsDiscovery: false },
      // Use src/server.ts (our SSR error wrapper) as the server entry.
      server: { entry: "server" },
    }),
    react(),
    nitro({ preset: process.env["VERCEL"] ? "vercel" : "node-server" }),
  ],
});
