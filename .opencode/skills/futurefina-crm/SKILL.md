---
name: futurefina-crm
description: Project conventions for the Futurefina WhatsApp CRM monorepo. Use for any implementation, review, audit, or documentation task in this repository — dashboard UI, inbox, lead management, settings, mock data, tests, or backend integration. Enforces the Obsidian-Mint design system, the 10 official lead statuses, the 6 service categories, WCAG 2.2 AA, the phased delivery loop, and the no-automatic-commit boundary.
metadata:
  owner: Futurefina
  version: "1.0"
---

# Futurefina CRM Project Skill

## Source of Truth

Read these before changing code or docs:

1. `.github/README.md`
2. `.github/docs/PRD.md`
3. `.github/docs/ARCHITECTURE.md`
4. `.github/docs/DESIGN_GUIDELINES.md`
5. `.github/docs/DECISIONS.md`
6. `.github/docs/DEVELOPMENT_WORKFLOW.md`
7. `.github/docs/GIT_CONVENTIONS.md`
8. `.github/docs/CONTRIBUTING.md`
9. `.github/docs/SECURITY.md`

If a requirement is ambiguous, mark it `[PENDING CONFIRMATION]` and ask. Never
invent client requirements. Never commit or push without explicit approval.

## Project Shape

- `apps/web` — Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4,
  shadcn/ui on Radix primitives. Routes: `/`, `/inbox`, `/leads`, `/settings`.
- `packages/shared` — framework-agnostic domain types, constants, and labels.
- `apps/api` — planned for Phase 5 (Node.js/Express + PostgreSQL).
- Phases 1–4 use typed fixtures in `apps/web/src/lib/mock-data.ts`. Fixtures must
  never enter `packages/shared`; replace the module with API-backed functions in
  Phase 5 without changing shared domain types.

## Delivery Loop

For every phase: implement → `npm run lint` → `npm run typecheck` → `npm run test`
→ `npm run build` → `npm run test:e2e` → visual/a11y audit → sync docs → present
diff → wait for approval → branch/commit/push.

- Feature branch + PR per phase (for example `feat/dashboard-foundation`).
- Conventional Commits 1.0.0. Never auto-commit or auto-push.
- Keep `.agents/`, `.gemini/`, `.env*`, secrets, and unrelated files out of commits.

## Design System

Obsidian-Mint palette:

| Token | Value |
| :--- | :--- |
| Canvas | `#212227` |
| Card | `#2A2D34` |
| Muted pill | `#343842` |
| Hairline | `#32353E` |
| Mint | `#13AD87` |
| Mint hover | `#109B78` |
| Mint subtle | `#11382E` |

Use the semantic utilities in `apps/web/src/app/globals.css`:
`bg-canvas`, `bg-card`, `bg-pill`, `border-hairline`, `text-mint`,
`text-text-primary`, `text-text-secondary`, `text-text-tertiary`.

Text ramp (AA verified on canvas and card): primary `#FFFFFF`, secondary
`#A7ADBB`, tertiary `#969AA8`. Do not place small tertiary text on `bg-pill`.
Use `font-mono` for phone numbers, lead codes, fees, and tabular figures.

Service accents (`apps/web/src/lib/service-colors.ts`):

| Category | Colour |
| :--- | :--- |
| Mutual Funds | Purple `#8B5CF6` |
| Stocks & Demat | Blue `#156DF5` |
| Insurance | Coral `#FC5C46` |
| Loans | Peach `#FA7D52` |
| ITR & Tax | Amber `#FBBF24` |
| Customer Support | Mint `#13AD87` |

Status pills must use the exact pairs in `globals.css` via `data-lead-status`.
The official 10 statuses are `NEW`, `QUALIFICATION_IN_PROGRESS`, `QUALIFIED`,
`ASSIGNED`, `CONTACT_ATTEMPTED`, `FOLLOW_UP_REQUIRED`, `CONVERTED`,
`NOT_INTERESTED`, `CLOSED`, `ESCALATED_COMPLAINT`. Use `StatusBadge`; do not
invent status labels or colours. `CLOSED` uses `#9CA3AF` on `#1F2228` so it
passes AA (the original `#6B7280` was 3.3:1).

Rules: 4px spacing grid, 16px card radius, full-radius pills, 44px touch targets
(36px compact desktop rows), visible focus rings, reduced-motion support. Use ₹,
never `$`. Use the Indian numbering system (`formatInr`, `formatCompactInr`).

## Accessibility

Target WCAG 2.2 AA. Run axe in both jsdom (color-contrast disabled) and
Playwright (full rules). Fix real violations rather than suppressing them.
Every icon-only control needs an accessible name. Scrollable table regions need
`role="region"`, `tabIndex={0}`, and an `aria-label`.

## Code Conventions

- TypeScript strict; no `any`, no `@ts-ignore`, no non-null assertions without a
  documented reason.
- Components in `PascalCase.tsx`; utilities and fixtures in `kebab-case.ts`.
- Keep server/client boundaries explicit. Add `"use client"` only where hooks or
  browser APIs require it.
- Preserve generated shadcn imports (`cn` from `"cn"`, Radix from `"radix-ui"`).
- Use `next/link` for navigation and the shared `PageHeader`, `AppShell`,
  `SectionHeading`, and formatter utilities instead of duplicating markup.
- Dates and times use the `Asia/Kolkata` timezone; the deterministic reference
  instant is `MOCK_NOW` in `apps/web/src/lib/mock-data.ts`.

## Quality Commands

```bash
npm run lint
npm run typecheck
npm run test
npm run test:coverage
npm run build
npm run test:e2e
npm run format:check
```

`npm run test:e2e` uses the system Chrome channel and writes screenshots to
`apps/web/test-results/` (git-ignored). Inspect screenshots, not just pass/fail.

## Documentation

Update docs in the same change whenever behaviour, tokens, schema, stack, or
commands change. Keep the 7-section ADR format and never rewrite history; mark
superseded decisions explicitly. Keep the decision index status in sync.
