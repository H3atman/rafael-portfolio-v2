/**
 * Emits sitemap.xml and robots.txt into the built client output.
 *
 * These were Next.js metadata routes (app/sitemap.ts, app/robots.ts). Vite has no
 * equivalent, so they are generated after the build instead. Run via `postbuild`.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const projectsDirectory = path.join(process.cwd(), "content/projects");
const outputDirectory = path.join(process.cwd(), "build/client");

// Mirrors siteConfig.url in lib/seo-config.ts. Kept in sync manually because this
// script runs in plain Node and cannot import the TypeScript module.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rvcodes.com";

function parseDate(value) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function getProjects() {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
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

function urlEntry({ loc, lastModified, changeFrequency, priority }) {
  return [
    "<url>",
    `<loc>${loc}</loc>`,
    `<lastmod>${lastModified.toISOString()}</lastmod>`,
    `<changefreq>${changeFrequency}</changefreq>`,
    `<priority>${priority}</priority>`,
    "</url>",
  ].join("");
}

function buildSitemap(projects) {
  const now = new Date();

  const entries = [
    { loc: siteUrl, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { loc: `${siteUrl}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...projects.map((project) => ({
      loc: `${siteUrl}/projects/${project.slug}`,
      lastModified: parseDate(project.frontmatter.date) ?? now,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ];

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map(urlEntry),
    "</urlset>",
    "",
  ].join("\n");
}

function buildRobots() {
  return ["User-Agent: *", "Allow: /", "", `Sitemap: ${siteUrl}/sitemap.xml`, ""].join("\n");
}

if (!fs.existsSync(outputDirectory)) {
  console.error(`[seo] build output not found at ${outputDirectory} — run the build first`);
  process.exit(1);
}

const projects = getProjects();
fs.writeFileSync(path.join(outputDirectory, "sitemap.xml"), buildSitemap(projects));
fs.writeFileSync(path.join(outputDirectory, "robots.txt"), buildRobots());

console.log(`[seo] wrote sitemap.xml (${projects.length + 2} urls) and robots.txt`);
