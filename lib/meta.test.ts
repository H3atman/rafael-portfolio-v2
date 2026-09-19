import { describe, expect, it } from "vitest";
import { buildMeta } from "@/lib/meta";
import { siteConfig } from "@/lib/seo-config";

type Descriptor = Record<string, unknown>;

function title(descriptors: Descriptor[]): string | undefined {
  return descriptors.find((d) => "title" in d)?.title as string | undefined;
}

function byName(descriptors: Descriptor[], name: string): string | undefined {
  return descriptors.find((d) => d.name === name)?.content as string | undefined;
}

function byProperty(descriptors: Descriptor[], property: string): string[] {
  return descriptors
    .filter((d) => d.property === property)
    .map((d) => d.content as string);
}

function canonical(descriptors: Descriptor[]): string | undefined {
  return descriptors.find((d) => d.rel === "canonical")?.href as string | undefined;
}

describe("buildMeta", () => {
  it("applies the title template to a page title", () => {
    expect(title(buildMeta({ title: "Projects" }))).toBe("Projects | Rafael Portfolio");
  });

  it("uses the bare default title when no page title is given", () => {
    expect(title(buildMeta())).toBe("Rafael | Operations Business Manager");
    expect(title(buildMeta())).not.toContain("|  ");
  });

  it("resolves a relative canonical against the site URL", () => {
    expect(canonical(buildMeta({ canonical: "/projects" }))).toBe(
      `${siteConfig.url}/projects`
    );
  });

  it("does not emit a trailing slash for the root canonical", () => {
    expect(canonical(buildMeta({ canonical: "/" }))).toBe(siteConfig.url);
  });

  it("leaves an absolute canonical untouched", () => {
    const url = "https://example.com/elsewhere";
    expect(canonical(buildMeta({ canonical: url }))).toBe(url);
  });

  it("omits the canonical link entirely when none is given", () => {
    expect(canonical(buildMeta({ title: "Projects" }))).toBeUndefined();
  });

  it("marks pages indexable by default and honours an explicit noindex", () => {
    expect(byName(buildMeta(), "robots")).toBe("index, follow");
    expect(byName(buildMeta({ robots: { index: false } }), "robots")).toBe(
      "noindex, follow"
    );
  });

  it("emits one og:image and one article:tag per entry", () => {
    const descriptors = buildMeta({
      title: "A project",
      og: { type: "article", images: ["https://a.test/1.png"], tags: ["n8n", "Automation"] },
    });

    expect(byProperty(descriptors, "og:type")).toEqual(["article"]);
    expect(byProperty(descriptors, "og:image")).toEqual(["https://a.test/1.png"]);
    expect(byProperty(descriptors, "article:tag")).toEqual(["n8n", "Automation"]);
  });

  it("always carries the site name and description", () => {
    const descriptors = buildMeta();

    expect(byProperty(descriptors, "og:site_name")).toEqual(["Rafael Portfolio"]);
    expect(byName(descriptors, "description")).toBeTruthy();
  });

  it("uses a page's own description for og:description, even without an og block", () => {
    const descriptors = buildMeta({
      title: "Projects",
      description: "Case studies and projects.",
    });

    expect(byProperty(descriptors, "og:description")).toEqual([
      "Case studies and projects.",
    ]);
    expect(byName(descriptors, "twitter:description")).toBe(
      "Case studies and projects."
    );
  });

  it("falls back to the short site blurb for og:description when none is given", () => {
    const descriptors = buildMeta();

    expect(byProperty(descriptors, "og:description")).toEqual([
      "Specializing in System Integration, Business Process Automation, and Data Processing.",
    ]);
  });

  it("emits article:modified_time and article:author when supplied", () => {
    const descriptors = buildMeta({
      title: "A project",
      og: {
        type: "article",
        publishedTime: "2025-06-20T00:00:00.000Z",
        modifiedTime: "2025-06-20T00:00:00.000Z",
        authors: ["Rafael Villanueva"],
      },
    });

    expect(byProperty(descriptors, "article:modified_time")).toEqual([
      "2025-06-20T00:00:00.000Z",
    ]);
    expect(byProperty(descriptors, "article:author")).toEqual([
      "Rafael Villanueva",
    ]);
  });
});
