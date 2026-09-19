import MDX from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig } from "vitest/config";
import { remarkReadingTime } from "./plugins/remark-reading-time.ts";

// Mirrors the MDX pipeline from vite.config.ts without the React Router plugin,
// so the content index can be exercised directly.
export default defineConfig({
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
  ],
  test: {
    environment: "node",
    include: ["**/*.test.ts"],
  },
});
