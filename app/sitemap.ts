import { MetadataRoute } from 'next';
import { getAllProjects } from '@/lib/mdx';
import { siteConfig } from '@/lib/seo-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects();

  // Homepage
  const homepageEntry: MetadataRoute.Sitemap[number] = {
    url: siteConfig.url,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  };

  // Projects listing page
  const projectsPageEntry: MetadataRoute.Sitemap[number] = {
    url: `${siteConfig.url}/projects`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  };

  // Individual project pages
  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteConfig.url}/projects/${project.slug}`,
    lastModified: new Date(project.frontmatter.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [homepageEntry, projectsPageEntry, ...projectEntries];
}
