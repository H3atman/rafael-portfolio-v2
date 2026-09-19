import type { ComponentType } from "react";

export interface ProjectFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  thumbnail: string;
  hidden?: boolean;
}

export interface Project {
  slug: string;
  frontmatter: ProjectFrontmatter;
  /** MDX body, compiled to a component by @mdx-js/rollup. */
  content: ComponentType;
  readingTime: string;
}

export interface ProjectMeta {
  slug: string;
  frontmatter: ProjectFrontmatter;
  readingTime: string;
}
