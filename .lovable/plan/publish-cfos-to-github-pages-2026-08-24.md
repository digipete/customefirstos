# Publish CFOS to GitHub Pages

## Problem

`https://digipete.github.io/customefirstos/` shows plain text, not the CFOS app.

Verified causes:
- The app is **server-rendered** (TanStack Start on an edge runtime). GitHub Pages
  is static-file hosting only — it cannot run a server, so it can never serve the
  SSR app as-is.
- Nothing from the app is deployed there at all. The live URL is Jekyll rendering
  `README.md` with the stock theme; `/customefirstos/assets/` returns 404. There is
  no Pages deployment workflow (`.github/workflows/ci.yml` deliberately validates
  and builds but does not publish).
- The Lovable build wrapper forces a server-runtime output (`cloudflare-module`)
  whenever it runs inside the Lovable sandbox and deletes any preset override, so a
  static export cannot be produced by the Lovable build. A static build must run
  outside the sandbox — i.e. in GitHub Actions.

## Goal

Make CFOS reachable at `https://digipete.github.io/customefirstos/` as a working,
styled site.

The only way to host a TanStack Start app on GitHub Pages is to **prerender the
whole site to static HTML at build time** and deploy those files. Our data is all
build-time (Markdown in `/content` + a typed seed dataset — no backend), so this is
feasible. It changes nothing about the durable GitHub asset; `content/`, the
validator and the tests still work if `src/` is deleted.

## What we will do

1. **Add a static build for GitHub Actions.** Create a deploy workflow
   (`.github/workflows/deploy.yml`) that runs on pushes to `main`, installs deps,
   validates content, runs tests, then builds a **static** export
   (`nitro: { preset: "static" }`) and publishes the `dist/client` output to Pages
   via `actions/deploy-pages`. This runs outside the Lovable sandbox, so the preset
   is respected.
2. **Sub-path base.** The site must live under `/customefirstos/` (the repo/Pages
   path), so configure the Vite base to `/customefirstos/` for the static build so
   all CSS/JS assets resolve. The Lovable preview build is unaffected (it keeps its
   own root/base).
3. **Jekyll off + SPA fallback.** Add `.nojekyll` so Pages doesn't try to process
   the output, and generate a `404.html` that copies the app shell so deep links
   and refreshes still render (Pages serves real files for exact paths; unknown
   paths fall back to `404.html`).
4. **Routing check.** Verify every route (`/`, `/how-we-work/*`, `/missions`,
   `/decisions`, `/experiments`, `/evidence`, `/patterns`, `/insights`,
   `/portfolio`, `/analytics`, `/search`) renders correctly under the sub-path in a
   browser against the static output.
5. **Docs.** Update `docs/phase-1-foundations.md` with the Pages hosting decision
   and the accepted trade-offs (per-document social metadata degrades to the shell
   page; deep links return a real 404 HTTP status before JS rehydrates; Phase 2
   Cloud/auth needs a separate runtime).

## Trade-offs we accept (this is the deliberate cost of static hosting)

- **Per-document SEO/social metadata is lost.** `og:title`/`og:description` for an
  individual document collapse to the shared shell values, so unfurls in Slack/Teams
  won't describe the specific page.
- **Deep links return an HTTP 404 status** for non-file paths before JavaScript
  rehydrates and re-renders the right page. Crawlers treat this as a missing page.
- **No server runtime**, so Phase 2 (Lovable Cloud schema, auth, write flows) cannot
  run on Pages and would need a separate host.
- GitHub keeps the durable content asset and CI; Pages is only a static mirror of
  the interface.

## Verification

- Build the static export and serve it locally; drive it with Playwright against
  every route (home, a Markdown document with a Mermaid diagram, missions, decision
  detail, analytics) and confirm styling/design tokens render and navigation works.
- Confirm the deployed URL at `/customefirstos/` serves the styled app (not the
  README) after the workflow runs.

## Not in scope

- Enabling Lovable Cloud, auth, or write flows (Phase 2) — this change is static
  hosting only and deliberately stops at the foundations sign-off.
- Changing how the durable GitHub content asset is managed.
