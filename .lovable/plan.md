# Analytics views — aggregate health, flow, decision & insight dimensions

## Goal

Surface the dimensions already collected in the seed dataset (mission health, flow,
decision latency, insight acceptance) as portfolio-wide analytics, so leadership can see
patterns rather than single-mission figures. Still operates on the seed dataset — no Cloud
dependency. The existing `/portfolio` page stays as the economics/ROI view; this is a
complementary analysis view.

## Scope

- New pure-aggregation module `src/lib/analytics.ts` with framework-free functions, mirroring
  the style of `src/lib/portfolio.ts`.
- New route `/analytics` with per-section insight across the whole portfolio.
- Vitest coverage for the aggregation functions (including a null-safety and
  "no single RAG score" assertion).
- Nav entry in `src/components/Shell.tsx` and SEO metadata on the route.

## What the view shows (four sections)

**1. Mission health — weakest-dimension ranking**
- For each of the 9 health dimensions, compute the portfolio mean score across missions,
  plus how many missions score it ≤ 2 (weakest). Sort to surface the most fragile dimension.
- Emphasise no single overall score — each dimension reported separately.

**2. Flow economics — delivery cadence**
- Median days to first experiment, to meaningful evidence, to significant decision, to
  delivered outcome, to realised value — across all missions.
- Count missions that never reached a given milestone (null `daysTo*`), so "not reached"
  is reported, not hidden.

**3. Decision velocity**
- Mean + median decision latency (raised → decided) by `domain` (Strategy, Commercial,
  Delivery, Architecture, AI, Investment, …) so clustering and slow domains surface.
- Count of decisions awaiting review, with the longest-pending ones listed.

**4. Insight acceptance**
- Funnel by `status`: Generated → Reviewing → Accepted → Actioned (with Rejected).
- Acceptance rate by `provider`, and whether accepted insights carry an `osChangeSuggestion`
  (i.e. how often insight actually changes the OS vs stays in the head).

## Files

| File | Change |
| --- | --- |
| `src/lib/analytics.ts` | **new** — pure aggregation: `healthRankings()`, `flowCadence()`, `decisionVelocity()`, `insightFunnel()`. All take the dataset and return plain numbers; nulls handled. |
| `src/routes/analytics.tsx` | **new** — `createFileRoute("/analytics")`, four sections above, using the existing `Tag`/`Stat`-style primitives, `head()` metadata. |
| `src/components/Shell.tsx` | add `{ to: "/analytics", label: "Analytics" }` to `NAV`. |
| `tests/analytics.test.ts` | **new** — asserts weakest-dimension ranking order, null-flow handling, domain latency grouping, insight funnel totals reconcile to dataset counts, and that no function returns a single blended health score. |

## Out of scope (deliberately)

- No Cloud database, auth, or write flows — Phase 2 still gated on your sign-off.
- No visual charts library; the seed dataset is deterministic, so numeric tables and tags
  convey the pattern with less machinery. (If you'd rather have sparklines/bars, say so and
  I'll add a lightweight bar element.)
- `/portfolio` unchanged — economics stays separate from analysis.

## Verify

Run `bun run verify` (validate content + tests + lint + build) and confirm `/analytics`
renders server-side with correct per-section figures before finishing.
