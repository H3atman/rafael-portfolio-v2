import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  Calendar01Icon,
  Clock01Icon,
} from "@hugeicons/core-free-icons";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@/mdx-components";
import { config } from "@/lib/config";
import { siteConfig, personSchema, getAbsoluteUrl } from "@/lib/seo-config";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all projects
export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for each project
export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const canonicalUrl = `/projects/${slug}`;
  const thumbnailUrl = project.frontmatter.thumbnail
    ? getAbsoluteUrl(project.frontmatter.thumbnail)
    : undefined;

  return {
    title: project.frontmatter.title,
    description: project.frontmatter.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: project.frontmatter.title,
      description: project.frontmatter.description,
      type: "article",
      url: canonicalUrl,
      publishedTime: project.frontmatter.date,
      modifiedTime: project.frontmatter.date,
      authors: [siteConfig.author.name],
      tags: project.frontmatter.tags,
      images: thumbnailUrl ? [{ url: thumbnailUrl }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: project.frontmatter.title,
      description: project.frontmatter.description,
      images: thumbnailUrl ? [thumbnailUrl] : [],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Get custom MDX components
  const components = useMDXComponents({});

  // Structured data for the article
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: project.frontmatter.title,
    description: project.frontmatter.description,
    author: personSchema,
    datePublished: project.frontmatter.date,
    dateModified: project.frontmatter.date,
    image: project.frontmatter.thumbnail
      ? getAbsoluteUrl(project.frontmatter.thumbnail)
      : undefined,
    publisher: personSchema,
    keywords: project.frontmatter.tags.join(', '),
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Header */}
      <article className="py-16 lg:py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/projects">
                <HugeiconsIcon
                  icon={ArrowLeft01Icon}
                  strokeWidth={2}
                  className="w-4 h-4 mr-2"
                />
                Back to Projects
              </Link>
            </Button>
          </div>

          {/* Article Header */}
          <header className="mb-12">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.frontmatter.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              {project.frontmatter.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-muted-foreground mb-6">
              {project.frontmatter.description}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-t border-b border-border py-4">
              <div className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Calendar01Icon}
                  strokeWidth={2}
                  className="w-4 h-4"
                />
                <time dateTime={project.frontmatter.date}>
                  {new Date(project.frontmatter.date).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Clock01Icon}
                  strokeWidth={2}
                  className="w-4 h-4"
                />
                <span>{project.readingTime}</span>
              </div>
            </div>
          </header>

          {/* MDX Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <MDXRemote source={project.content} components={components} />
          </div>

          {/* Footer CTA */}
          <div className="mt-16 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-medium mb-1">Interested in similar solutions?</p>
                <p className="text-sm text-muted-foreground">
                  Let's discuss how I can help with your project.
                </p>
              </div>
              <Button asChild>
                <Link href={config.bookingUrl} target="_blank">
                  Book a Consultation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
