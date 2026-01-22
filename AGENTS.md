# AGENTS.md - Rafael Portfolio Development Guide

This document serves as a guide for AI agents or developers to implement the portfolio project.

---

## Project Overview

**Goal**: Build a professional portfolio for an Operations Business Manager specializing in:
- System Integration
- Business Process Automation  
- Data Processing & Analysis

**Tech Stack**:
- Next.js 16 with React 19
- TypeScript
- Tailwind CSS 4
- Shadcn UI components (already configured)
- MDX for blog-style project content
- Cal.com for booking integration

---

## Implementation Tasks

### Phase 1: MDX Infrastructure Setup

1. **Install MDX dependencies**
   ```powershell
   npm install @next/mdx @mdx-js/loader @mdx-js/react gray-matter reading-time
   ```

2. **Update `next.config.ts`** to support MDX:
   ```typescript
   import type { NextConfig } from 'next'
   import createMDX from '@next/mdx'
   
   const nextConfig: NextConfig = {
     pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
   }
   
   const withMDX = createMDX({
     extension: /\.mdx?$/,
   })
   
   export default withMDX(nextConfig)
   ```

3. **Create `mdx-components.tsx`** in project root for custom MDX components

4. **Create `lib/mdx.ts`** with utilities to:
   - Read MDX files from `content/projects/`
   - Parse frontmatter with gray-matter
   - Calculate reading time

---

### Phase 2: Content Structure

Create directory structure:
```
content/
└── projects/
    ├── automated-reporting-dashboard.mdx
    ├── crm-integration-platform.mdx
    └── data-pipeline-automation.mdx
```

**MDX Frontmatter Template**:
```yaml
---
title: "Project Title"
description: "Brief project description"
date: "2024-01-15"
tags: ["Automation", "Integration"]
thumbnail: "/projects/project-thumbnail.jpg"
---
```

---

### Phase 3: Portfolio Components

Create these components in `components/`:

| Component | Purpose |
|-----------|---------|
| `hero.tsx` | Landing section with CTA buttons |
| `services.tsx` | 3-card grid for services |
| `recent-projects.tsx` | Blog-style project grid |
| `cta-section.tsx` | Cal.com booking CTA |
| `footer.tsx` | Site footer |
| `project-card.tsx` | Individual project preview card |
| `mdx/` | MDX component wrappers |

---

### Phase 4: Page Routes

| Route | File | Purpose |
|-------|------|---------|
| `/` | `app/page.tsx` | Main landing page |
| `/projects` | `app/projects/page.tsx` | All projects listing |
| `/projects/[slug]` | `app/projects/[slug]/page.tsx` | Individual project |

---

### Phase 5: Styling Guidelines

- Use existing Shadcn UI components from `components/ui/`
- Follow dark mode design with accent colors
- Ensure responsive breakpoints: mobile (< 768px), tablet (768-1024px), desktop (> 1024px)
- Add subtle animations using `tw-animate-css`

---

## Content Details

### Services (3 total)

1. **System Integration**
   - Icon: Link/Connect icon
   - Desc: "Connect disparate systems and platforms for seamless data flow and unified operations."

2. **Business Process Automation**
   - Icon: Workflow/Automation icon
   - Desc: "Streamline repetitive tasks and workflows to increase efficiency and reduce manual errors."

3. **Data Processing**
   - Icon: Database/Chart icon
   - Desc: "Transform raw data into actionable insights through cleaning, analysis, and visualization."

### Profile Stats
- 3+ years in Business Process Automation
- 6+ years in Data Processing
- Previous: Operations Manager (Startup), Crime Statistician (Government)

### CTA
- Primary: "Book a Call" → Cal.com link
- Secondary: Contact email

---

## Deployment

Target: **Vercel**

```powershell
# Build check
npm run build

# Deploy
vercel --prod
```

---

## File Reference

```
rafael-portfolio-v2/
├── app/
│   ├── page.tsx              # Main landing
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   └── projects/
│       ├── page.tsx          # Projects listing
│       └── [slug]/
│           └── page.tsx      # Individual project
├── components/
│   ├── ui/                   # Shadcn components (existing)
│   ├── hero.tsx
│   ├── services.tsx
│   ├── recent-projects.tsx
│   ├── project-card.tsx
│   ├── cta-section.tsx
│   ├── footer.tsx
│   └── mdx/
│       ├── image.tsx
│       ├── callout.tsx
│       └── video.tsx
├── content/
│   └── projects/
│       └── *.mdx
├── lib/
│   ├── utils.ts              # Existing
│   └── mdx.ts                # MDX utilities
├── public/
│   └── projects/             # Project images
├── mdx-components.tsx
├── next.config.ts
└── package.json
```
