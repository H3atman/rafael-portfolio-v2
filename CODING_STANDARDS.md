# Coding standards

## UI

- **Styling**: Prefer Tailwind utilities and theme tokens; merge conditional classes with `cn()` from `lib/utils.ts`.
- **Images**: Use `components/ui/image.tsx` for application images and the mappings in `mdx-components.tsx` for MDX images. Give `fill` images a positioned, explicitly sized parent.
- **Navigation**: Use React Router links internally; open external destinations, including booking links, with `<a target="_blank" rel="noopener noreferrer">`.

## Runtime

- **Environment**: Read public env values in bundled app code through `import.meta.env` with `VITE_` or `NEXT_PUBLIC_` prefixes. Values are inlined at build time; rebuild after changing them. Use `process.env` in Node scripts.

## Content and SEO

- **Draft isolation**: Keep unpublished prose in `content/drafts/`. Files in `content/projects/` ship to the browser, including prose hidden from listings.
- **MDX source**: Compute source-derived fields in the remark pipeline; the MDX plugin intercepts `?raw` imports and returns compiled components.
- **Metadata**: Build route metadata through `lib/meta.ts`'s `buildMeta()` so the title template and site-wide tags remain consistent.
- **SEO parity**: Keep site URL behavior aligned between `lib/seo-config.ts` and `scripts/generate-seo-files.mjs`, and date parsing aligned between `lib/date.ts` and `scripts/lib/projects.mjs`. The Node tooling deliberately carries separate implementations.
- **Public routes**: Include new public routes in both `react-router.config.ts`'s prerender list and `scripts/generate-seo-files.mjs`'s sitemap. Route registration alone updates neither list; registered routes can still render through SSR.
- **Redirects**: Declare deployment redirects in `vercel.json` so they apply at the hosting layer.

## Documentation and verification

- **Verification**: Run `bun run typecheck` and `bun run test` for code changes.
