# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
npx shadcn@latest add [component]  # Add new shadcn component
```

## Architecture

This is a Next.js 16 portfolio site using App Router with React 19, TypeScript, and Tailwind CSS 4.

### Content System

Projects are MDX files in `content/projects/` with YAML frontmatter:
```yaml
---
title: "Project Name"
description: "Brief description"
date: "2025-12-15"
tags: ["Tag1", "Tag2"]
thumbnail: "/projects/image.jpg"
---
```

Data functions in `lib/mdx.ts`:
- `getAllProjects()` - Returns all projects sorted by date (newest first)
- `getProjectBySlug(slug)` - Returns single project with content
- `getRecentProjects(count)` - Returns latest N projects

### Component Architecture

- **Server Components** (default): Pages, layouts, static sections
- **Client Components**: Require `"use client"` directive - used for theme-toggle, project-card, horizontal-scroll-loop

### Shadcn/UI Configuration

Configured in `components.json`:
- Style: `radix-lyra`
- Icon library: `hugeicons` (@hugeicons/react)
- Path aliases: `@/components`, `@/lib`, `@/components/ui`

Components use Class Variance Authority (CVA) for variants.

### Theming

- Dark/light mode via `next-themes` with ThemeProvider in `app/layout.tsx`
- CSS variables defined in `app/globals.css` using OKLCH color format
- Light mode: `:root` selector, Dark mode: `.dark` selector

### Configuration

Environment variables (`.env.local`):
- `NEXT_PUBLIC_BOOKING_URL` - Cal.com booking link
- `NEXT_PUBLIC_SITE_URL` - Production domain (defaults to rvcodes.com)

Centralized config in `lib/config.ts` and SEO metadata in `lib/seo-config.ts`.

### SEO

- Metadata in `app/layout.tsx`
- JSON-LD structured data (Website, Person, Article schemas)
- Dynamic sitemap at `app/sitemap.ts`
- Robots config at `app/robots.ts`

## Key Files

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout with fonts, ThemeProvider, metadata |
| `app/globals.css` | Theme CSS variables (OKLCH format) |
| `lib/mdx.ts` | MDX content processing functions |
| `lib/config.ts` | Booking URL configuration |
| `components.json` | Shadcn CLI configuration |
| `mdx-components.tsx` | Custom MDX component mappings |
