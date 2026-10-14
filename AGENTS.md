# Agent instructions

## Gotchas

- Production combines prerendered pages with request-time SSR on Vercel; it is not
  static-only. Components must render on both server and client.
- Use `bun run test`: bare `bun test` bypasses Vitest and its MDX pipeline.
- Next.js migration references are stale except `next-themes`. `PORTFOLIO.md`
  describes a separate app; `plans/` records historical work. Preserve their history.

## Standards

- **Changes and reviews**: Read [CODING_STANDARDS.md](CODING_STANDARDS.md) before editing code, content, or documentation, or reviewing changes.

## Agent skills

- **Issues, specs, and wayfinding**: Read [issue-tracker.md](docs/agents/issue-tracker.md) for tracker and wayfinder conventions.
- **Triage**: Read [triage-labels.md](docs/agents/triage-labels.md) for the canonical label vocabulary.
- **Domain exploration**: Read [domain.md](docs/agents/domain.md) for glossary and ADR conventions.
