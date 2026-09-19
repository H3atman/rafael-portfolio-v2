import { defineConfig } from "vitest/config";
import { mdxPlugin } from "./plugins/mdx-config.ts";

// Shares the MDX pipeline from vite.config.ts (plugins/mdx-config.ts) without
// the React Router plugin, so the content index can be exercised directly.
export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [mdxPlugin()],
  test: {
    environment: "node",
    include: ["**/*.test.ts"],
  },
});
