import type { Config } from "@react-router/dev/config";
import fs from "node:fs";
import path from "node:path";

const projectsDir = path.join(process.cwd(), "content/projects");

const projectSlugs = fs
  .readdirSync(projectsDir)
  .filter((fileName) => fileName.endsWith(".mdx"))
  .map((fileName) => fileName.replace(/\.mdx$/, ""));

export default {
  appDirectory: "app",
  ssr: true,
  async prerender() {
    return [
      "/",
      "/projects",
      ...projectSlugs.map((slug) => `/projects/${slug}`),
    ];
  },
} satisfies Config;
