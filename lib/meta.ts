import type { MetaDescriptor } from "react-router";
import { siteConfig } from "@/lib/seo-config";

const SITE_NAME = "Rafael Portfolio";
const DEFAULT_TITLE = "Rafael | Operations Business Manager";
const DEFAULT_DESCRIPTION =
  "Operations Business Manager specializing in System Integration, Business Process Automation, and Data Processing. 6+ years of experience transforming business operations through technology.";
// The old app/layout.tsx set a shorter openGraph.description than its meta
// description. Pages that supply their own description use it for both.
const DEFAULT_OG_DESCRIPTION =
  "Specializing in System Integration, Business Process Automation, and Data Processing.";

interface MetaInput {
  /** Page title; rendered through the "%s | Rafael Portfolio" template. Omit for the default. */
  title?: string;
  description?: string;
  canonical?: string;
  og?: {
    type?: string;
    url?: string;
    images?: string[];
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    tags?: string[];
  };
  twitter?: {
    images?: string[];
  };
  robots?: {
    index?: boolean;
    follow?: boolean;
  };
}

/**
 * Builds the RR7 meta descriptor array, mirroring the Next.js metadata the
 * site shipped with: "%s | Rafael Portfolio" title template, canonical via
 * getAbsoluteUrl, OpenGraph, Twitter card and robots directives.
 */
export function buildMeta({
  title,
  description,
  canonical,
  og,
  twitter,
  robots,
}: MetaInput = {}): MetaDescriptor[] {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const canonicalUrl = canonical ? getCanonicalUrl(canonical) : undefined;

  const pageDescription = description ?? DEFAULT_DESCRIPTION;
  const ogTitle = title ?? DEFAULT_TITLE;
  const ogDescription = description ?? DEFAULT_OG_DESCRIPTION;
  const ogUrl = og?.url ? getCanonicalUrl(og.url) : canonicalUrl;
  const ogType = og?.type ?? "website";

  const descriptors: MetaDescriptor[] = [
    { title: fullTitle },
    { name: "description", content: pageDescription },
    {
      name: "keywords",
      content: [...siteConfig.defaultMetadata.keywords].join(", "),
    },
    { name: "author", content: siteConfig.author.name },
    {
      name: "robots",
      content:
        robots && (robots.index === false || robots.follow === false)
          ? `${robots.index === false ? "noindex" : "index"}, ${
              robots.follow === false ? "nofollow" : "follow"
            }`
          : "index, follow",
    },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: siteConfig.defaultMetadata.locale },
    { property: "og:type", content: ogType },
    { property: "og:title", content: ogTitle },
    { property: "og:description", content: ogDescription },
  ];

  if (ogUrl) {
    descriptors.push({ property: "og:url", content: ogUrl });
  }

  for (const image of og?.images ?? []) {
    descriptors.push({ property: "og:image", content: image });
  }

  if (og?.publishedTime) {
    descriptors.push({
      property: "article:published_time",
      content: og.publishedTime,
    });
  }

  if (og?.modifiedTime) {
    descriptors.push({
      property: "article:modified_time",
      content: og.modifiedTime,
    });
  }

  for (const author of og?.authors ?? []) {
    descriptors.push({ property: "article:author", content: author });
  }

  if (og?.tags?.length) {
    for (const tag of og.tags) {
      descriptors.push({ property: "article:tag", content: tag });
    }
  }

  descriptors.push(
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: ogTitle },
    { name: "twitter:description", content: ogDescription }
  );

  for (const image of twitter?.images ?? []) {
    descriptors.push({ name: "twitter:image", content: image });
  }

  if (canonicalUrl) {
    descriptors.push({
      tagName: "link",
      rel: "canonical",
      href: canonicalUrl,
    });
  }

  return descriptors;
}

function getCanonicalUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${cleanPath === "/" ? "" : cleanPath}`;
}
