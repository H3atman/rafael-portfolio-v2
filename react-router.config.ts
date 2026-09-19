import type { Config } from "@react-router/dev/config";
import { getProjects } from "./scripts/lib/projects.mjs";

const projectSlugs = getProjects().map((project) => project.slug);

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
