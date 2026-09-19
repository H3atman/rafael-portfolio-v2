import { reactRouter } from "@react-router/dev/vite";
import MDX from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkGfm from "remark-gfm";
import { remarkReadingTime } from "./plugins/remark-reading-time.ts";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  // Keep the NEXT_PUBLIC_ prefix: production already has these var names set.
  envPrefix: ["VITE_", "NEXT_PUBLIC_"],
  // Matches the port the Next.js dev server used, as documented in CLAUDE.md.
  server: { port: 3000 },
  // Resolves the "@/*" alias from tsconfig.json.
  resolve: { tsconfigPaths: true },
  plugins: [
    {
      enforce: "pre",
      ...MDX({
        providerImportSource: "@mdx-js/react",
        remarkPlugins: [
          remarkGfm,
          remarkFrontmatter,
          remarkReadingTime,
          [remarkMdxFrontmatter, { name: "frontmatter" }],
        ],
      }),
    },
    reactRouter(),
    tailwindcss(),
  ],
});
