import MDX, { type Options as MdxOptions } from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkGfm from "remark-gfm";
import { remarkReadingTime } from "./remark-reading-time.ts";

// Shared MDX pipeline for vite.config.ts and vitest.config.ts, so the two
// configs cannot drift apart. Must match the remark plugin order expected by
// lib/content.ts (frontmatter export + injected readingTime).
const mdxOptions: MdxOptions = {
  providerImportSource: "@mdx-js/react",
  remarkPlugins: [
    remarkGfm,
    remarkFrontmatter,
    remarkReadingTime,
    [remarkMdxFrontmatter, { name: "frontmatter" }],
  ],
};

export function mdxPlugin() {
  return { enforce: "pre" as const, ...MDX(mdxOptions) };
}
