import { parseDate } from "@/lib/date";
import type {
  Project,
  ProjectFrontmatter,
  ProjectMeta,
} from "@/lib/types";

// Only content/projects is globbed. Drafts live in content/drafts so their
// prose is never compiled into the client bundle — a `hidden` flag would still
// ship the full text to the browser, it just would not be linked.
const modules = import.meta.glob<{
  default: Project["content"];
  frontmatter: ProjectFrontmatter & { readingTime: string };
}>("/content/projects/*.mdx", { eager: true });

function buildEntries(): Project[] {
  return Object.entries(modules)
    .map(([path, module]) => {
      const slug = path
        .replace("/content/projects/", "")
        .replace(/\.mdx$/, "");

      if (module.frontmatter.hidden) {
        throw new Error(
          `content/projects/${slug}.mdx is marked "hidden", but files here are ` +
            `always published and their text is bundled for the browser. ` +
            `Move it to content/drafts/ instead.`
        );
      }

      return {
        slug,
        frontmatter: module.frontmatter,
        content: module.default,
        readingTime: module.frontmatter.readingTime,
      };
    })
    .sort((a, b) => {
      const dateB = parseDate(b.frontmatter.date)?.getTime() ?? 0;
      const dateA = parseDate(a.frontmatter.date)?.getTime() ?? 0;
      return dateB - dateA;
    });
}

// Built once: the glob is eager, so the index cannot change at runtime.
const entries = buildEntries();

export function getAllProjects(): ProjectMeta[] {
  // Content is indexed at build time; no filesystem access needed at runtime.
  return entries;
}

export function getProjectBySlug(slug: string): Project | null {
  const project = entries.find((entry) => entry.slug === slug);

  return project ?? null;
}

export function getRecentProjects(count: number = 3): ProjectMeta[] {
  return getAllProjects().slice(0, count);
}
