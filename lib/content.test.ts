import { describe, expect, it } from "vitest";
import { getAllProjects, getProjectBySlug, getRecentProjects } from "@/lib/content";
import { parseDate } from "@/lib/date";

describe("getAllProjects", () => {
  it("returns every published project", () => {
    const projects = getAllProjects();

    expect(projects.length).toBeGreaterThan(0);
  });

  it("excludes drafts, which live in content/drafts and are never bundled", () => {
    const slugs = getAllProjects().map((project) => project.slug);

    expect(slugs).not.toContain("crm-integration-platform");
    expect(slugs).not.toContain("automated-reporting-dashboard");
  });

  it("carries no hidden frontmatter, since the guard rejects it", () => {
    expect(
      getAllProjects().every((project) => !project.frontmatter.hidden)
    ).toBe(true);
  });

  it("sorts newest first", () => {
    const timestamps = getAllProjects().map(
      (project) => parseDate(project.frontmatter.date)?.getTime() ?? 0
    );

    expect(timestamps).toEqual([...timestamps].sort((a, b) => b - a));
  });

  it("reports a non-zero reading time for every project", () => {
    // Regression: the reading-time source was previously read through a `?raw`
    // glob that the MDX transform intercepted, yielding "0 min read" everywhere.
    for (const project of getAllProjects()) {
      expect(project.readingTime).toMatch(/^[1-9]\d* min read$/);
    }
  });

  it("exposes the frontmatter the cards and metadata depend on", () => {
    for (const project of getAllProjects()) {
      expect(project.frontmatter.title).toBeTruthy();
      expect(project.frontmatter.description).toBeTruthy();
      expect(parseDate(project.frontmatter.date)).not.toBeNull();
      expect(Array.isArray(project.frontmatter.tags)).toBe(true);
    }
  });
});

describe("getProjectBySlug", () => {
  it("returns the matching project with a renderable body", () => {
    const [first] = getAllProjects();
    const project = getProjectBySlug(first.slug);

    expect(project).not.toBeNull();
    expect(project?.slug).toBe(first.slug);
    expect(typeof project?.content).toBe("function");
  });

  it("returns null for an unknown slug", () => {
    expect(getProjectBySlug("does-not-exist")).toBeNull();
  });

  it("returns null for a draft so it cannot be reached by direct URL", () => {
    expect(getProjectBySlug("crm-integration-platform")).toBeNull();
  });
});

describe("getRecentProjects", () => {
  it("defaults to three", () => {
    expect(getRecentProjects()).toHaveLength(3);
  });

  it("respects the requested count and keeps newest-first order", () => {
    const all = getAllProjects();
    const recent = getRecentProjects(2);

    expect(recent).toHaveLength(2);
    expect(recent.map((p) => p.slug)).toEqual(all.slice(0, 2).map((p) => p.slug));
  });

  it("never returns more than it has", () => {
    expect(getRecentProjects(999)).toHaveLength(getAllProjects().length);
  });
});
