# AGENTS.md - Rafael Portfolio V2

Instructions for AI agents working on this Next.js portfolio project.

## Project Context

A professional portfolio website for an Operations Business Manager showcasing services in System Integration, Business Process Automation, and Data Processing. The site uses modern React patterns with Next.js App Router.

**Live Site**: https://rvcodes.com

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Next.js App                          │
├─────────────────────────────────────────────────────────────┤
│  app/layout.tsx (Server)                                    │
│  ├── ThemeProvider (Client)                                 │
│  │   ├── Header (Server) + ThemeToggle (Client)            │
│  │   ├── <main>{children}</main>                           │
│  │   └── Footer (Server)                                   │
├─────────────────────────────────────────────────────────────┤
│  Content Layer                                              │
│  ├── MDX Files (content/projects/*.mdx)                    │
│  ├── lib/mdx.ts (processing)                               │
│  └── gray-matter (frontmatter parsing)                     │
├─────────────────────────────────────────────────────────────┤
│  UI Layer                                                   │
│  ├── Shadcn/UI (components/ui/)                            │
│  ├── Custom Components (components/)                        │
│  └── Tailwind CSS + CSS Variables                          │
└─────────────────────────────────────────────────────────────┘
```

## Critical Files

| File | Purpose | Notes |
|------|---------|-------|
| `app/layout.tsx` | Root layout | Fonts, metadata, ThemeProvider |
| `app/globals.css` | Theme system | OKLCH color variables |
| `lib/mdx.ts` | Content processing | getAllProjects, getProjectBySlug |
| `lib/config.ts` | App config | Booking URL centralized |
| `lib/seo-config.ts` | SEO data | Site metadata, schemas |
| `components.json` | Shadcn config | Component generation settings |

## Component Patterns

### Server vs Client Components

```tsx
// Server Component (default) - No directive needed
export function ServerComponent() {
  return <div>Static content</div>
}

// Client Component - Required for interactivity
"use client"
export function ClientComponent() {
  const [state, setState] = useState()
  return <button onClick={() => setState(...)}>Click</button>
}
```

**Client Components in this project:**
- `theme-provider.tsx` - next-themes wrapper
- `theme-toggle.tsx` - Dark mode toggle
- `project-card.tsx` - Interactive card with hover
- `horizontal-scroll-loop.tsx` - Animated carousel

### Shadcn/UI Usage

Components use Class Variance Authority (CVA) for variants:

```tsx
// Example: Button with variants
<Button variant="default" size="sm">Click</Button>
<Button variant="outline" size="icon">
  <Icon />
</Button>
```

**Installed components (14 total)**: button, card, badge, toggle, alert-dialog, dropdown-menu, combobox, select, label, input, input-group, textarea, field, separator

### Adding New Shadcn Components

```bash
npx shadcn@latest add [component-name]
```

Configuration in `components.json`:
- Style: `radix-lyra`
- Icons: `hugeicons`
- Path aliases configured

## Styling Guidelines

### Tailwind Classes
- Use utility classes directly in JSX
- Merge with `cn()` utility from `lib/utils.ts`
- Prefer Tailwind over custom CSS

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

### Available MDX Components
- `<Image />` - Next.js optimized images with captions
- `<Callout type="info|warning|success|danger" />` - Alert boxes
- `<Video />` - Video embedding
- `<YouTubeVideo />` - YouTube embeds

### Data Functions

```typescript
import { getAllProjects, getProjectBySlug, getRecentProjects } from '@/lib/mdx'

// Get all projects (sorted by date)
const projects = getAllProjects()

// Get single project
const project = getProjectBySlug('project-slug')

// Get recent N projects
const recent = getRecentProjects(3)
```

## SEO Implementation

### Page Metadata
```typescript
// Static metadata
export const metadata: Metadata = {
  title: "Page Title",
  description: "Page description",
}

// Dynamic metadata
export async function generateMetadata({ params }): Promise<Metadata> {
  const project = getProjectBySlug(params.slug)
  return {
    title: project.frontmatter.title,
    description: project.frontmatter.description,
  }
}
```

### Structured Data
- Website schema in `app/layout.tsx`
- Article schema in project detail pages
- Person schema from `lib/seo-config.ts`

## Common Development Tasks

### Add a New Service/Section
1. Create component in `components/`
2. Import in relevant page
3. Follow existing patterns (Hero, Services, CTASection)

### Add a New Project
1. Create `content/projects/slug-name.mdx`
2. Add complete frontmatter (title, description, date, tags, thumbnail)
3. Write content with MDX components
4. Project auto-appears in listings

### Modify Navigation
Edit `components/header.tsx`:
```tsx
<nav className="flex items-center gap-6">
  <Link href="/">Home</Link>
  <Link href="/projects">Projects</Link>
  <Link href="/new-page">New Page</Link>  {/* Add here */}
  <ThemeToggle />
  <Button asChild size="sm">...</Button>
</nav>
```

### Add New Route
1. Create `app/route-name/page.tsx`
2. Export metadata
3. Add to navigation if needed
4. Update `app/sitemap.ts` if public

## Environment Setup

```env
# .env.local
NEXT_PUBLIC_BOOKING_URL=https://cal.com/your-booking
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## File Structure Reference

```
rafael-portfolio-v2/
├── app/
│   ├── layout.tsx              # Root layout with ThemeProvider
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Theme CSS variables
│   ├── sitemap.ts              # Dynamic sitemap
│   ├── robots.ts               # Robots.txt config
│   └── projects/
│       ├── page.tsx            # Projects listing
│       └── [slug]/page.tsx     # Project detail
├── components/
│   ├── ui/                     # Shadcn components (14)
│   ├── mdx/                    # MDX components
│   │   ├── image.tsx
│   │   ├── callout.tsx
│   │   └── video.tsx
│   ├── header.tsx              # Site navigation
│   ├── footer.tsx              # Site footer
│   ├── hero.tsx                # Landing hero
│   ├── services.tsx            # Services grid
│   ├── recent-projects.tsx     # Projects preview
│   ├── project-card.tsx        # Project card (client)
│   ├── cta-section.tsx         # Call-to-action
│   ├── horizontal-scroll-loop.tsx  # Logo carousel (client)
│   ├── theme-provider.tsx      # Theme wrapper (client)
│   └── theme-toggle.tsx        # Dark/light toggle (client)
├── content/
│   └── projects/               # MDX project files
├── lib/
│   ├── config.ts               # App configuration
│   ├── seo-config.ts           # SEO metadata
│   ├── mdx.ts                  # MDX utilities
│   └── utils.ts                # Utility functions
├── public/
│   ├── logo.png
│   ├── logos/                  # Tech logos (WebP)
│   └── projects/               # Project images
├── mdx-components.tsx          # MDX component mapping
├── components.json             # Shadcn CLI config
├── next.config.ts              # Next.js config
├── tsconfig.json               # TypeScript config
└── package.json                # Dependencies
```

## Testing Considerations

No test framework currently configured. When adding tests:
- Consider Vitest for unit tests
- Playwright for E2E tests
- Test MDX frontmatter parsing
- Test component rendering

## Performance Notes

- Images: Use WebP format, Next.js Image component
- Fonts: Loaded via next/font (Geist, JetBrains Mono)
- CSS: Tailwind purges unused styles
- MDX: Server-rendered via next-mdx-remote/rsc

## Deployment

Optimized for Vercel:
```bash
npm run build    # Production build
npm run start    # Start production server
```

- Automatic builds from git
- Environment variables in Vercel dashboard
- Image optimization via Vercel CDN

## Troubleshooting

### Hydration Errors
- Ensure client components have `"use client"`
- Check for browser-only APIs (window, document)
- `suppressHydrationWarning` on `<html>` for theme

### MDX Not Rendering
- Check frontmatter YAML syntax
- Verify file is in `content/projects/`
- Check for import errors in MDX content

### Styling Issues
- Run `npm run build` to catch Tailwind purge issues
- Check CSS variable definitions in globals.css
- Verify dark mode classes working

### Shadcn Component Issues
- Run `npx shadcn@latest add [component]` to reinstall
- Check `components.json` for correct configuration
- Verify Radix UI dependencies are installed
