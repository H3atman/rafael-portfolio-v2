# AGENTS.md - Rafael Portfolio V2

Instructions for AI agents working on this Vite + React Router portfolio project.

## Project context

A portfolio website for an Operations Business Manager. It describes services in System
Integration, Business Process Automation, and Data Processing. The site runs on Vite 8 and
React Router v7 in framework mode, and prerenders to static HTML.

Live site: https://rvcodes.com

> This project migrated from Next.js 16 App Router. If you find `next/*` imports,
> `"use client"` directives, `app/layout.tsx`, or `lib/mdx.ts` referenced anywhere, that
> reference is stale. The only surviving "next" package is `next-themes`, which works with
> any framework.

## Architecture overview

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

Everything renders on both server and client. `react-router.config.ts` lists the prerender
routes, and `npm run build` writes static HTML for each one. Production does no request-time
rendering.

## Critical files

| File | Purpose | Notes |
|------|---------|-------|
| `app/root.tsx` | HTML shell | charset/viewport, ThemeProvider, WebSite JSON-LD |
| `app/routes.ts` | Route declarations | Add new routes here |
| `app/globals.css` | Theme system | OKLCH color variables, font imports |
| `vite.config.ts` | Build config | MDX, Tailwind, React Router plugins; `envPrefix` |
| `react-router.config.ts` | Prerender list | Lists every static route |
| `lib/content.ts` | Content index | getAllProjects, getProjectBySlug, getRecentProjects |
| `lib/meta.ts` | SEO builder | `buildMeta()` covers the title template, OG, Twitter, canonical |
| `lib/config.ts` | App config | Booking URL centralized |
| `lib/seo-config.ts` | SEO data | Site metadata, Person schema |
| `plugins/mdx-config.ts` | MDX pipeline | Remark chain shared by vite + vitest configs |
| `plugins/remark-reading-time.ts` | Reading time | Injects into MDX frontmatter |
| `scripts/lib/projects.mjs` | Project list | Build-time enumeration for node tooling |
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
first, which regenerates the `./+types/*` route types. A missing type import usually means
typegen has not run.

## Component patterns

### No server/client split

There are no `"use client"` directives. That was a Next.js concept, removed during the
migration. Every component renders during prerender and again on the client, so guard anything
that touches `window`, `document`, or `localStorage`:

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

A `fill` image needs a positioned parent (`relative` plus an explicit size or aspect box).

### Links

Use `<Link to="...">` from `react-router` for internal navigation. External URLs, including
`config.bookingUrl`, must be plain `<a href target="_blank" rel="noopener noreferrer">` rather
than router links.

### Shadcn/UI usage

Components use Class Variance Authority (CVA) for variants:

```tsx
<Button variant="default" size="sm">Click</Button>
<Button variant="outline" size="icon">
  <Icon />
</Button>
```

The 15 installed shadcn components are alert-dialog, badge, button, card, combobox,
dropdown-menu, field, input, input-group, label, select, separator, sheet, textarea, and
toggle.

Two files in `components/ui/` are hand-written rather than generated: `image.tsx` (the
`next/image` shim) and `zoomable-image.tsx`.

### Adding new shadcn components

```bash
npx shadcn@latest add [component-name]
```

`components.json` sets the style to `radix-lyra`, the icon library to `hugeicons`, and the
path aliases.

Generated components may ship with `"use client"` at the top. Delete it.

## Styling guidelines

### Tailwind classes

- Use utility classes directly in JSX.
- Merge them with the `cn()` utility from `lib/utils.ts`.
- Prefer Tailwind over custom CSS.
- Tailwind 4 is CSS-first, so its configuration lives in `app/globals.css` rather than a JS
  config file.

### Theme colors (CSS variables in OKLCH)

```css
/* Light mode - :root */
--background: oklch(1 0 0);
--foreground: oklch(0.141 0.005 285.823);
--primary: oklch(0.21 0.006 285.885);

/* Dark mode - .dark */
--background: oklch(0.141 0.005 285.823);
--foreground: oklch(0.985 0 0);
```

### Dark mode

`next-themes` manages the theme, and the toggle component sits in the header. Use the `dark:`
prefix for dark-specific styles.

## Content management

### MDX project structure

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

Unpublished projects live in `content/drafts/`, not behind a `hidden:` flag. Only
`content/projects/` is globbed, so a draft's prose never compiles into the client bundle.
A `hidden: true` flag would still ship the full text to the browser and merely hide the link,
so `lib/content.ts` throws at build time if it finds one in `content/projects/`.

To unpublish: `git mv content/projects/slug.mdx content/drafts/`

### Reading time

`plugins/remark-reading-time.ts` injects `readingTime` into each file's frontmatter during the
MDX transform. Do not try to read MDX source through a `?raw` glob. The MDX plugin intercepts
it and hands back a compiled component instead of a string.

### Available MDX components

`mdx-components.tsx` maps these, and `MDXProvider` supplies them:
- `<Image />` - Image with caption support
- `<Callout type="info|warning|success|danger" />` - Alert boxes
- `<Video />` - Video embedding
- `<YouTubeVideo />` - YouTube embeds

The same file restyles the standard markdown elements (headings, links, tables, code). Bare
JSX in an MDX body resolves through `MDXProvider`, which is why `vite.config.ts` sets
`providerImportSource: "@mdx-js/react"`.

### Data functions

```typescript
import { getAllProjects, getProjectBySlug, getRecentProjects } from '@/lib/content'

// Get all projects (sorted by date, newest first)
const projects = getAllProjects()

// Get single project; `content` is a React component, not a string.
// Returns null for an unknown slug.
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

## SEO implementation

### Page metadata

React Router `meta()` exports replace Next's `metadata` and `generateMetadata` exports. React
Router has no built-in title template, so `buildMeta()` in `lib/meta.ts` reproduces the
`"%s | Rafael Portfolio"` pattern along with canonical, OpenGraph, Twitter, and robots tags.

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
and site-wide tags stay consistent. A canonical link needs `tagName: "link"`. React Router
silently drops plain `{rel, href}` descriptors.

### Structured data

- `app/root.tsx` emits the WebSite schema.
- `app/routes/project.tsx` emits the Article schema.
- `lib/seo-config.ts` supplies the Person schema.

### sitemap.xml and robots.txt

These are not routes. `scripts/generate-seo-files.mjs` writes them into `build/client/` after
the build, through the `postbuild` script. It runs in plain Node and cannot import the
TypeScript modules, so it duplicates `siteUrl` and date parsing. Keep those copies in sync
with `lib/seo-config.ts` and `lib/date.ts`.

## Common development tasks

### Add a new service or section

1. Create the component in `components/`.
2. Import it in the relevant route under `app/routes/`.
3. Match the structure of `hero.tsx`, `services.tsx`, or `cta-section.tsx`.

### Add a new project

1. Create `content/projects/slug-name.mdx`.
2. Fill in the frontmatter: title, description, date, tags, thumbnail.
3. Write the body with MDX components.
4. The project then appears in the listings, the sitemap, and the prerender list without
   further work.

### Modify navigation

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

### Add a new route

1. Create `app/routes/route-name.tsx`.
2. Register it in `app/routes.ts`.
3. Export a `meta()` built with `buildMeta()`.
4. Add it to the `prerender()` list in `react-router.config.ts` if it is public.
5. Add it to the navigation if it needs a link.

The sitemap covers `/`, `/projects`, and the project detail pages. Extend
`scripts/generate-seo-files.mjs` for anything else that should appear there.

### Add a redirect

Static output cannot redirect on its own, and the Node server (`npm run start`) does not add
redirects either. The built server only serves the routes declared in `app/routes.ts`. Add
redirects to `vercel.json` only. The `/project` to `/projects` rule is the existing example.

## Environment setup

```env
# .env.local
NEXT_PUBLIC_BOOKING_URL=https://cal.com/your-booking
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

`envPrefix` in `vite.config.ts` keeps the `NEXT_PUBLIC_` prefix working, because production
already has these names set.

Read them with `import.meta.env`, never `process.env`. Vite rewrites `process.env` to an empty
object in the client bundle, so `process.env.ANYTHING` evaluates to `undefined` in the browser
and falls through to its default without raising an error. Vite inlines the values at build
time, so changing one requires a rebuild.

## File structure reference

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
│   ├── mdx-config.ts           # Remark chain shared by vite + vitest
│   └── remark-reading-time.ts  # Injects readingTime into frontmatter
├── scripts/
│   ├── lib/projects.mjs        # Build-time project enumeration
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

`vitest.config.ts` runs Vitest in a Node environment with no jsdom, so these are unit tests
over the content index and the helpers rather than component render tests.

Existing coverage:
- `lib/content.test.ts` covers the project index, sort order, draft exclusion, and reading
  time.
- `lib/meta.test.ts` covers the title template, canonical, OG/Twitter, and robots tags.
- `lib/date.test.ts` covers frontmatter date parsing.

`vitest.config.ts` and `vite.config.ts` both pull the MDX pipeline from
`plugins/mdx-config.ts`, so the remark plugin chain has one definition and cannot drift. The
vitest config just omits the React Router plugin. Import `defineConfig` from `vitest/config`,
not from `vite`, or `tsc` rejects the `test` key.

Playwright E2E is unconfigured. Navigation and the theme toggle are the first cases to cover
if someone adds it.

## Performance notes

- Images use WebP where possible. `components/ui/image.tsx` is a plain `<img>` with no CDN
  loader, since every image is a local `/public` path.
- Fonts come from `@fontsource-variable/jetbrains-mono` and `@fontsource-variable/geist-mono`,
  imported in `app/globals.css`. They replaced `next/font`.
- Tailwind purges unused styles.
- MDX compiles at build time into the bundle rather than rendering per request.

## Deployment

This project targets Vercel.

```bash
npm run build    # Production build + prerender + SEO files
npm run start    # Serve the production build
```

Vercel builds automatically from git. Set environment variables in the Vercel dashboard and
rebuild afterwards, since the build inlines them. Redirects live in `vercel.json`. The output
is static HTML under `build/client/`.

## Troubleshooting

### Hydration errors

- Look for browser-only APIs (`window`, `document`, `localStorage`) called outside
  `useEffect`.
- `app/root.tsx` sets `suppressHydrationWarning` on `<html>` for the theme class.
- Values read from `process.env` differ between prerender and browser. Use `import.meta.env`.

### An env var is undefined in the browser

- You used `process.env`. Switch to `import.meta.env`.
- The prefix must be `VITE_` or `NEXT_PUBLIC_`. See `envPrefix` in `vite.config.ts`.
- Vite inlines the values at build time, so rebuild after changing one.

### MDX not rendering

- Check the frontmatter YAML syntax.
- Verify the file is in `content/projects/`, not `content/drafts/`.
- Register any bare JSX component in `mdx-components.tsx`.
- Check for import errors in the MDX content.

### A route 404s in production but works in dev

The route is missing from `prerender()` in `react-router.config.ts`.

### Missing route types (`./+types/*`)

Run `npm run typecheck`, which runs `react-router typegen` first.

### Styling issues

- Run `npm run build` to catch Tailwind purge problems that dev mode hides.
- Check the CSS variable definitions in `app/globals.css`.
- Check that the `.dark` class reaches the element you are styling.

### Shadcn component issues

- Re-run `npx shadcn@latest add [component]` to reinstall the component.
- Delete any `"use client"` directive from the generated file.
- Check `components.json` for the correct style, icon library, and aliases.
- Check that the component's Radix UI dependencies are installed.

## Agent skills

### Issue tracker

Issues live in this repo's GitHub Issues (`H3atman/rafael-portfolio-v2`), managed with the
`gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical triage labels, used verbatim. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` plus `docs/adr/` at the repo root. See `docs/agents/domain.md`.
