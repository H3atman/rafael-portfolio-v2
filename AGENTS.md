# AGENTS.md - Rafael Portfolio V2

Instructions for AI agents working on this Vite + React Router portfolio project.

## Project Context

A professional portfolio website for an Operations Business Manager showcasing services in System Integration, Business Process Automation, and Data Processing. The site is built with Vite 8 and React Router v7 in framework mode, and is fully prerendered to static HTML.

**Live Site**: https://rvcodes.com

> Migrated from Next.js 16 App Router. If you find `next/*` imports, `"use client"`
> directives, `app/layout.tsx`, or `lib/mdx.ts` referenced anywhere, that reference is
> stale. The only surviving "next" package is `next-themes`, which is framework-agnostic.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                  Vite + React Router v7                     │
├─────────────────────────────────────────────────────────────┤
│  app/root.tsx (HTML shell)                                  │
│  ├── <head>: charset, viewport, <Meta/>, <Links/>, JSON-LD  │
│  ├── PostHogProvider                                        │
│  │   └── ThemeProvider                                      │
│  │       ├── Header + ThemeToggle                           │
│  │       ├── <main><Outlet/></main>                         │
│  │       └── Footer                                         │
├─────────────────────────────────────────────────────────────┤
│  Routing (app/routes.ts -> app/routes/*)                    │
│  ├── /                 home.tsx                             │
│  ├── /projects         projects.tsx                         │
│  ├── /projects/:slug   project.tsx                          │
│  └── /project          project-redirect.ts (308)            │
├─────────────────────────────────────────────────────────────┤
│  Content Layer (build time, no runtime fs)                  │
│  ├── MDX Files (content/projects/*.mdx)                     │
│  ├── @mdx-js/rollup -> component + frontmatter export       │
│  ├── lib/content.ts (import.meta.glob index)                │
│  └── plugins/remark-reading-time.ts                         │
├─────────────────────────────────────────────────────────────┤
│  UI Layer                                                   │
│  ├── Shadcn/UI (components/ui/)                             │
│  ├── Custom Components (components/)                        │
│  └── Tailwind CSS 4 + CSS Variables                         │
└─────────────────────────────────────────────────────────────┘
```

Everything renders on both server and client. `react-router.config.ts` enumerates the
prerender routes; `npm run build` writes static HTML for each. There is no request-time
rendering in production.

## Critical Files

| File | Purpose | Notes |
|------|---------|-------|
| `app/root.tsx` | HTML shell | charset/viewport, ThemeProvider, WebSite JSON-LD |
| `app/routes.ts` | Route declarations | Add new routes here |
| `app/globals.css` | Theme system | OKLCH color variables, font imports |
| `vite.config.ts` | Build config | MDX, Tailwind, React Router plugins; `envPrefix` |
| `react-router.config.ts` | Prerender list | Enumerates every static route |
| `lib/content.ts` | Content index | getAllProjects, getProjectBySlug, getRecentProjects |
| `lib/meta.ts` | SEO builder | `buildMeta()` — title template, OG, Twitter, canonical |
| `lib/config.ts` | App config | Booking URL centralized |
| `lib/seo-config.ts` | SEO data | Site metadata, Person schema |
| `plugins/remark-reading-time.ts` | Reading time | Injects into MDX frontmatter |
| `scripts/generate-seo-files.mjs` | sitemap/robots | Runs via `postbuild` |
| `components.json` | Shadcn config | Component generation settings |

## Commands

```bash
npm run dev        # Dev server on http://localhost:3000
npm run build      # Build + prerender, then emit sitemap.xml/robots.txt
npm run start      # Serve the production build
npm run test       # vitest
npm run typecheck  # react-router typegen + tsc --noEmit
npm run lint       # ESLint
```

Run `typecheck` and `test` before declaring work done. `typecheck` runs `react-router typegen`
first, which regenerates the `./+types/*` route types — a missing type import usually means
typegen has not run.

## Component Patterns

### No Server/Client Split

There are **no `"use client"` directives**. That was a Next.js concept and was removed in the
migration. Every component renders during prerender and again on the client, so anything
touching `window`, `document`, or `localStorage` must be guarded:

```tsx
useEffect(() => {
  // browser-only work belongs here
}, [])
```

### Images

`next/image` is gone. Use the shim at `components/ui/image.tsx`, which supports the `fill`
and `priority` props the old code relied on:

```tsx
import { Image } from "@/components/ui/image"

<Image src="/logo.png" alt="Logo" fill />          // absolutely positioned, edge to edge
<Image src="/hero.png" alt="Hero" priority />      // loading="eager" fetchPriority="high"
```

A `fill` image needs a positioned parent (`relative` + explicit size or aspect box).

### Links

Use `<Link to="...">` from `react-router` for internal navigation. External URLs — including
`config.bookingUrl` — must be plain `<a href target="_blank" rel="noopener noreferrer">`, not
router links.

### Shadcn/UI Usage

Components use Class Variance Authority (CVA) for variants:

```tsx
<Button variant="default" size="sm">Click</Button>
<Button variant="outline" size="icon">
  <Icon />
</Button>
```

**Shadcn components (15)**: alert-dialog, badge, button, card, combobox, dropdown-menu, field,
input, input-group, label, select, separator, sheet, textarea, toggle

**Hand-written additions**: `image.tsx` (next/image shim), `zoomable-image.tsx`

### Adding New Shadcn Components

```bash
npx shadcn@latest add [component-name]
```

Configuration in `components.json`:
- Style: `radix-lyra`
- Icons: `hugeicons`
- Path aliases configured

Generated components may ship with `"use client"` at the top — delete it.

## Styling Guidelines

### Tailwind Classes
- Use utility classes directly in JSX
- Merge with `cn()` utility from `lib/utils.ts`
- Prefer Tailwind over custom CSS
- Tailwind 4 is CSS-first: configuration lives in `app/globals.css`, not a JS config file

### Theme Colors (CSS Variables in OKLCH)
```css
/* Light mode - :root */
--background: oklch(1 0 0);
--foreground: oklch(0.141 0.005 285.823);
--primary: oklch(0.21 0.006 285.885);

/* Dark mode - .dark */
--background: oklch(0.141 0.005 285.823);
--foreground: oklch(0.985 0 0);
```

### Dark Mode
- Managed by `next-themes`
- Toggle component in header
- Use `dark:` prefix for dark-specific styles

## Content Management

### MDX Project Structure

```yaml
# content/projects/example.mdx
---
title: "Project Title"
description: "Brief description for cards and SEO"
date: "2025-01-15"
tags: ["Automation", "Integration"]
thumbnail: "/projects/thumbnail.jpg"
---

Your MDX content here with components...
```

### Drafts

**Unpublished projects live in `content/drafts/`, not behind a `hidden:` flag.** Only
`content/projects/` is globbed, so a draft's prose is never compiled into the client bundle.
A `hidden: true` flag would still ship the full text to the browser and merely hide the link,
so `lib/content.ts` throws at build time if it finds one in `content/projects/`.

To unpublish: `git mv content/projects/slug.mdx content/drafts/`

### Reading Time

`readingTime` is injected into each file's frontmatter by `plugins/remark-reading-time.ts`
during the MDX transform. Do **not** try to read MDX source via a `?raw` glob — the MDX
plugin intercepts it and you get a compiled component instead of a string.

### Available MDX Components

Mapped in `mdx-components.tsx` and supplied via `MDXProvider`:
- `<Image />` - Image with caption support
- `<Callout type="info|warning|success|danger" />` - Alert boxes
- `<Video />` - Video embedding
- `<YouTubeVideo />` - YouTube embeds

Standard markdown elements (headings, links, tables, code) are restyled there too. Bare JSX in
an MDX body resolves through `MDXProvider`, which is why `vite.config.ts` sets
`providerImportSource: "@mdx-js/react"`.

### Data Functions

```typescript
import { getAllProjects, getProjectBySlug, getRecentProjects } from '@/lib/content'

// Get all projects (sorted by date, newest first)
const projects = getAllProjects()

// Get single project; `content` is a React component, not a string
const project = getProjectBySlug('project-slug')

// Get recent N projects
const recent = getRecentProjects(3)
```

Render a project body with:

```tsx
<MDXProvider components={mdxComponents}>
  {React.createElement(project.content)}
</MDXProvider>
```

## SEO Implementation

### Page Metadata

Next's `metadata` / `generateMetadata` exports are replaced by React Router `meta()` exports.
React Router has no built-in title template, so `buildMeta()` in `lib/meta.ts` reproduces the
`"%s | Rafael Portfolio"` pattern along with canonical, OpenGraph, Twitter and robots tags.

```typescript
import { buildMeta } from "@/lib/meta"
import type { Route } from "./+types/project"

// Static
export function meta() {
  return buildMeta({ title: "Projects", description: "...", canonical: "/projects" })
}

// Dynamic
export function meta({ params }: Route.MetaArgs) {
  const project = getProjectBySlug(params.slug ?? "")
  if (!project) return buildMeta({ title: "Project Not Found" })
  return buildMeta({
    title: project.frontmatter.title,
    description: project.frontmatter.description,
    canonical: `/projects/${params.slug}`,
    og: { type: "article", url: `/projects/${params.slug}`, tags: project.frontmatter.tags },
  })
}
```

Always go through `buildMeta()` rather than returning raw descriptors, so the title template
and site-wide tags stay consistent. A canonical link needs `tagName: "link"` — plain
`{rel, href}` descriptors are silently dropped by React Router.

### Structured Data
- WebSite schema in `app/root.tsx`
- Article schema in `app/routes/project.tsx`
- Person schema from `lib/seo-config.ts`

### sitemap.xml / robots.txt

These are **not routes**. `scripts/generate-seo-files.mjs` writes them into `build/client/`
after the build, via the `postbuild` script. It runs in plain Node and cannot import the
TypeScript modules, so it duplicates `siteUrl` and date parsing — keep them in sync with
`lib/seo-config.ts` and `lib/date.ts`.

## Common Development Tasks

### Add a New Service/Section
1. Create component in `components/`
2. Import in the relevant route under `app/routes/`
3. Follow existing patterns (Hero, Services, CTASection)

### Add a New Project
1. Create `content/projects/slug-name.mdx`
2. Add complete frontmatter (title, description, date, tags, thumbnail)
3. Write content with MDX components
4. Project auto-appears in listings, the sitemap, and the prerender list

### Modify Navigation
Edit `components/header.tsx`:
```tsx
<nav className="flex items-center gap-6">
  <Link to="/">Home</Link>
  <Link to="/projects">Projects</Link>
  <Link to="/new-page">New Page</Link>  {/* Add here */}
  <ThemeToggle />
  <Button asChild size="sm">...</Button>
</nav>
```

### Add New Route
1. Create `app/routes/route-name.tsx`
2. Register it in `app/routes.ts`
3. Export a `meta()` built with `buildMeta()`
4. Add it to the `prerender()` list in `react-router.config.ts` if public
5. Add to navigation if needed

The sitemap covers `/`, `/projects` and project detail pages; extend
`scripts/generate-seo-files.mjs` for anything else that should be listed.

### Add a Redirect

Static output cannot redirect on its own. Add it to `vercel.json`, and add a route under
`app/routes/` only if it also needs to work under `npm run start` (see `/project` for the
existing example of both).

## Environment Setup

```env
# .env.local
NEXT_PUBLIC_BOOKING_URL=https://cal.com/your-booking
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

The `NEXT_PUBLIC_` prefix is retained deliberately — production already has these names set —
via `envPrefix` in `vite.config.ts`.

**Read them with `import.meta.env`, never `process.env`.** Vite rewrites `process.env` to an
empty object in the client bundle, so `process.env.ANYTHING` silently evaluates to `undefined`
in the browser and falls through to its default without raising an error. Values are inlined
at build time, so changing one requires a rebuild.

## File Structure Reference

```
rafael-portfolio-v2/
├── app/
│   ├── root.tsx                # HTML shell, providers, WebSite JSON-LD
│   ├── routes.ts               # Route declarations
│   ├── globals.css             # Theme CSS variables + font imports
│   └── routes/
│       ├── home.tsx            # Homepage
│       ├── projects.tsx        # Projects listing
│       ├── project.tsx         # Project detail
│       └── project-redirect.ts # /project -> /projects
├── components/
│   ├── ui/                     # Shadcn components + image/zoomable-image
│   ├── mdx/                    # MDX components
│   │   ├── image.tsx
│   │   ├── callout.tsx
│   │   └── video.tsx
│   ├── header.tsx              # Site navigation
│   ├── footer.tsx              # Site footer
│   ├── hero.tsx                # Landing hero
│   ├── services.tsx            # Services grid
│   ├── recent-projects.tsx     # Projects preview
│   ├── project-card.tsx        # Project card
│   ├── cta-section.tsx         # Call-to-action
│   ├── horizontal-scroll-loop.tsx  # Logo carousel
│   ├── posthog-provider.tsx    # Analytics
│   ├── theme-provider.tsx      # Theme wrapper
│   └── theme-toggle.tsx        # Dark/light toggle
├── content/
│   ├── projects/               # Published MDX projects
│   └── drafts/                 # Unpublished; never bundled
├── lib/
│   ├── config.ts               # App configuration
│   ├── seo-config.ts           # SEO metadata + schemas
│   ├── content.ts              # Build-time MDX index
│   ├── meta.ts                 # SEO meta descriptor builder
│   ├── date.ts                 # Frontmatter date parsing
│   ├── types.ts                # Project/frontmatter types
│   └── utils.ts                # Utility functions
├── plugins/
│   └── remark-reading-time.ts  # Injects readingTime into frontmatter
├── scripts/
│   └── generate-seo-files.mjs  # Emits sitemap.xml + robots.txt
├── public/
│   ├── logo.png
│   ├── logos/                  # Tech logos (WebP)
│   └── projects/               # Project images
├── mdx-components.tsx          # MDX component mapping
├── components.json             # Shadcn CLI config
├── vite.config.ts              # Vite config
├── vitest.config.ts            # Test config
├── react-router.config.ts      # Prerender config
├── vercel.json                 # Redirects
├── tsconfig.json               # TypeScript config
└── package.json                # Dependencies
```

## Testing

Vitest is configured (`vitest.config.ts`) and runs in a Node environment — no jsdom, so these
are unit tests over the content index and helpers, not component render tests.

Existing coverage:
- `lib/content.test.ts` - project index, sort order, draft exclusion, reading time
- `lib/meta.test.ts` - title template, canonical, OG/Twitter, robots
- `lib/date.test.ts` - frontmatter date parsing

`vitest.config.ts` mirrors the MDX plugin pipeline from `vite.config.ts` minus the React
Router plugin. If you change the remark plugin chain, change it in both places. Note that
`defineConfig` must be imported from `vitest/config`, not `vite`, or `tsc` rejects the `test`
key.

Playwright E2E is still unconfigured; consider it for navigation and theme-toggle coverage.

## Performance Notes

- Images: WebP where possible; `components/ui/image.tsx` is a plain `<img>` with no CDN loader,
  since all images are local `/public` paths
- Fonts: `@fontsource-variable/jetbrains-mono` and `@fontsource-variable/geist-mono`, imported
  from `app/globals.css` (replaced `next/font`)
- CSS: Tailwind purges unused styles
- MDX: compiled at build time into the bundle, not rendered per request

## Deployment

Optimized for Vercel:
```bash
npm run build    # Production build + prerender + SEO files
npm run start    # Serve the production build
```

- Automatic builds from git
- Environment variables in Vercel dashboard (rebuild required — they are inlined)
- Redirects declared in `vercel.json`
- Output is static HTML under `build/client/`

## Troubleshooting

### Hydration Errors
- Check for browser-only APIs (window, document, localStorage) outside `useEffect`
- `suppressHydrationWarning` on `<html>` for theme
- Values read from `process.env` differ between prerender and browser — use `import.meta.env`

### Env Var Is Undefined in the Browser
- You used `process.env`; switch to `import.meta.env`
- The prefix must be `VITE_` or `NEXT_PUBLIC_` (see `envPrefix` in `vite.config.ts`)
- Values are inlined at build time — rebuild after changing them

### MDX Not Rendering
- Check frontmatter YAML syntax
- Verify the file is in `content/projects/`, not `content/drafts/`
- Bare JSX components must be registered in `mdx-components.tsx`
- Check for import errors in MDX content

### Route 404s in Production but Works in Dev
- The route is missing from `prerender()` in `react-router.config.ts`

### Missing Route Types (`./+types/*`)
- Run `npm run typecheck`, which runs `react-router typegen` first

### Styling Issues
- Run `npm run build` to catch Tailwind purge issues
- Check CSS variable definitions in globals.css
- Verify dark mode classes working

### Shadcn Component Issues
- Run `npx shadcn@latest add [component]` to reinstall
- Remove any `"use client"` directive from the generated file
- Check `components.json` for correct configuration
- Verify Radix UI dependencies are installed
