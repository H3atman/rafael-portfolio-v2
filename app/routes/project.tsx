import React from "react";
import { Link } from "react-router";
import { buildMeta } from "@/lib/meta";
import { getProjectBySlug } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  Calendar01Icon,
  Clock01Icon,
} from "@hugeicons/core-free-icons";
import { MDXProvider } from "@mdx-js/react";
import { mdxComponents } from "@/mdx-components";
import { config } from "@/lib/config";
import { personSchema, getAbsoluteUrl } from "@/lib/seo-config";
import { parseDate } from "@/lib/date";
import type { Route } from "./+types/project";

// Reuses the loader's lookup rather than repeating it. `data` is undefined when
// the loader threw a 404.
export function meta({ data: project, params }: Route.MetaArgs) {
  if (!project) {
    return buildMeta({ title: "Project Not Found" });
  }

  const canonicalUrl = `/projects/${params.slug}`;
  const thumbnailUrl = project.frontmatter.thumbnail
    ? getAbsoluteUrl(project.frontmatter.thumbnail)
    : undefined;
  const publishedDate = parseDate(project.frontmatter.date);
  const publishedIso = publishedDate?.toISOString();

  return buildMeta({
    title: project.frontmatter.title,
    description: project.frontmatter.description,
    canonical: canonicalUrl,
    og: {
      type: "article",
      url: canonicalUrl,
      images: thumbnailUrl ? [thumbnailUrl] : [],
      publishedTime: publishedIso,
      modifiedTime: publishedIso,
      authors: [personSchema.name],
      tags: project.frontmatter.tags,
    },
    twitter: {
      images: thumbnailUrl ? [thumbnailUrl] : [],
    },
  });
}

export async function loader({ params }: Route.LoaderArgs) {
  const project = getProjectBySlug(params.slug ?? "");
  if (!project) {
    throw new Response("Not Found", { status: 404 });
  }

  // Only the serializable fields: `content` is a React component and cannot
  // cross the loader boundary, so the route component looks that up itself.
  return {
    frontmatter: project.frontmatter,
    readingTime: project.readingTime,
  };
}

export default function Project({ params, loaderData }: Route.ComponentProps) {
  const { frontmatter, readingTime } = loaderData;
  // The MDX body is the one field the loader cannot serialize, so it is the
  // only thing looked up here.
  const content = getProjectBySlug(params.slug ?? "")?.content;

  if (!content) {
    throw new Response("Not Found", { status: 404 });
  }

  const publishedDate = parseDate(frontmatter.date);
  const publishedIso = publishedDate?.toISOString();
  const publishedDateDisplay = publishedDate
    ? publishedDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date TBD";

  // Structured data for the article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.description,
    author: personSchema,
    datePublished: publishedIso,
    dateModified: publishedIso,
    image: frontmatter.thumbnail
      ? getAbsoluteUrl(frontmatter.thumbnail)
      : undefined,
    publisher: personSchema,
    keywords: frontmatter.tags.join(", "),
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Header */}
      <article className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <div className="mb-6 sm:mb-8">
            <Button variant="ghost" size="sm" asChild className="h-10">
              <Link to="/projects">
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
          <header className="mb-8 sm:mb-12">
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              {frontmatter.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs sm:text-sm">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight sm:text-5xl mb-3 sm:mb-4">
              {frontmatter.title}
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-muted-foreground mb-4 sm:mb-6">
              {frontmatter.description}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground border-t border-b border-border py-3 sm:py-4">
              <div className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Calendar01Icon}
                  strokeWidth={2}
                  className="w-4 h-4"
                />
                {publishedIso ? (
                  <time dateTime={publishedIso}>{publishedDateDisplay}</time>
                ) : (
                  <span>{publishedDateDisplay}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Clock01Icon}
                  strokeWidth={2}
                  className="w-4 h-4"
                />
                <span>{readingTime}</span>
              </div>
            </div>
          </header>

          {/* MDX Content */}
          <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">
            <MDXProvider components={mdxComponents}>
              {React.createElement(content)}
            </MDXProvider>
          </div>

          {/* Footer CTA */}
          <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="font-medium mb-1">Interested in similar solutions?</p>
                <p className="text-sm text-muted-foreground">
                  Let&apos;s discuss how I can help with your project.
                </p>
              </div>
              <Button asChild className="w-full sm:w-auto h-12">
                <a href={config.bookingUrl} target="_blank" rel="noopener noreferrer">
                  Book a Call
                </a>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
