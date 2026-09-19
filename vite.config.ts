import { reactRouter } from "@react-router/dev/vite";
import { mdxPlugin } from "./plugins/mdx-config.ts";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  // Keep the NEXT_PUBLIC_ prefix: production already has these var names set.
  envPrefix: ["VITE_", "NEXT_PUBLIC_"],
  // Matches the port the Next.js dev server used, as documented in CLAUDE.md.
  server: { port: 3000 },
  // Resolves the "@/*" alias from tsconfig.json.
  resolve: { tsconfigPaths: true },
  plugins: [mdxPlugin(), reactRouter(), tailwindcss()],
});
