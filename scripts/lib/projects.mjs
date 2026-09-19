/**
 * Shared project enumeration for build-time tooling (react-router.config.ts and
 * scripts/generate-seo-files.mjs). Plain .mjs because the postbuild script runs
 * under bare Node and cannot import TypeScript.
 *
 * lib/content.ts cannot use this: it resolves content via import.meta.glob
 * inside the bundler, not the filesystem. For the same reason parseDate is
 * duplicated from lib/date.ts rather than imported.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const projectsDirectory = path.join(process.cwd(), "content/projects");

export function parseDate(value) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function getProjects() {
  // Deliberately not tolerant of a missing directory: an empty result here
  // would silently prerender no project pages and emit a sitemap without them.
  if (!fs.existsSync(projectsDirectory)) {
    throw new Error(`Missing content directory: ${projectsDirectory}`);
  }

  return fs
    .readdirSync(projectsDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => ({
      slug: fileName.replace(/\.mdx$/, ""),
      frontmatter: matter(fs.readFileSync(path.join(projectsDirectory, fileName), "utf8")).data,
    }))
    .sort((a, b) => {
      const dateB = parseDate(b.frontmatter.date)?.getTime() ?? 0;
      const dateA = parseDate(a.frontmatter.date)?.getTime() ?? 0;
      return dateB - dateA;
    });
}
