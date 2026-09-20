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
  // posthog-js/react is a private subpackage with no "exports" map and no
  // "type" field, so Vite externalizes it into the server bundle as a bare
  // import of its raw "module" path, posthog-js/react/dist/esm/index.js.
  // Node only reads that file as ESM via syntax detection; where detection
  // does not apply it is CommonJS, the named PostHogProvider import fails to
  // link, and the SSR lambda dies at load time — every non-prerendered route
  // 500s with FUNCTION_INVOCATION_FAILED. Bundling it removes the bare import.
  ssr: { noExternal: [/^posthog-js/] },
  plugins: [mdxPlugin(), reactRouter(), tailwindcss()],
});
