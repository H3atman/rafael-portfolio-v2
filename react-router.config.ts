import type { Config } from "@react-router/dev/config";
import { vercelPreset } from "@vercel/react-router/vite";
import { getProjects } from "./scripts/lib/projects.mjs";

const projectSlugs = getProjects().map((project) => project.slug);

export default {
  appDirectory: "app",
  ssr: true,
  presets: [vercelPreset()],
  async prerender() {
    return [
      "/",
      "/projects",
      ...projectSlugs.map((slug) => `/projects/${slug}`),
    ];
  },
} satisfies Config;
