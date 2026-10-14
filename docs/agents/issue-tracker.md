# Issue tracker

- **Tracker**: GitHub Issues, through `gh` in this checkout. Publishing a spec means creating an issue; fetching a ticket includes its comments and labels.
- **PRs as a request surface: no.** External PRs stay outside the feature-request triage queue.
- **References**: Issues and PRs share a number space. Resolve an ambiguous `#number` with `gh pr view`, falling back to `gh issue view`.

## Wayfinding operations

- **Map**: A GitHub issue labelled `wayfinder:map`.
- **Children**: Link tickets as GitHub sub-issues. Where unavailable, list children as tasks in the map and put `Part of #<map>` atop each child.
- **Types**: Label children `wayfinder:research`, `wayfinder:prototype`, `wayfinder:grilling`, or `wayfinder:task`.
- **Blocking**: Use native issue dependencies. The `issues/<child>/dependencies/blocked_by` endpoint takes the blocker's numeric database `issue_id` (`gh api repos/<owner>/<repo>/issues/<n> --jq .id`), distinct from its issue number and GraphQL node ID.
- **Fallback**: Where native dependencies are unavailable, put `Blocked by: #<n>, #<n>` atop the child.
- **Queries**: Fetch children with `gh api repos/<owner>/<repo>/issues/<map>/sub_issues --paginate`; filter for `state: open`, empty `assignees`, and `issue_dependencies_summary.blocked_by: 0` (the open-blocker count), then use map order. For fallback task lists, fetch each child and its listed blockers with `gh issue view` to check state and assignees.
