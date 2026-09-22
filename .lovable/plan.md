# Technology & Architecture — phased implementation plan

## Goal

Add Technology & Architecture as a first-class CFOS capability without changing the existing Markdown-first architecture, navigation model, visual system, analytics, or GitHub Pages deployment approach.

## Phase 1 — Content foundation and primary experience

- Extend the existing content taxonomy with a `technology-architecture` section and validate it through the current Markdown checks.
- Create the substantive Markdown guidance for:
  - Architecture at CustomerFirst
  - Principles overview and eight practical principle pages
  - Architecture domains
  - Evidence
  - Test & Learn Experiments
  - Assurance and proportional assurance
  - Continuous Architecture
  - Patterns & Tools
- Use existing frontmatter conventions, stable `cf-*` IDs, related-document links, UK English, and GitHub edit links.
- Add a dedicated `/technology-architecture` landing page and Markdown-backed detail routes while preserving `/how-we-work` and every current URL.
- Add “Technology & Architecture” to the existing top navigation and search index.
- Add breadcrumbs, section navigation, related guidance, and previous/next links using the current CFOS typography and semantic colour tokens.
- Add reusable inset guidance treatments for Principle, Evidence, Assurance, Stop condition, and Team question.

## Phase 1 diagrams

Build six responsive, accessible guidance diagrams as reusable React/CSS components, with text alternatives:

1. Four-part architecture model around “The next good decision”
2. Evidence-led delivery
3. Architecture domains around “The whole service”
4. Test & Learn Experiment boundary
5. Proportional assurance
6. Continuous Architecture with the Test again / Modify loop

These will use the existing CFOS tokens and restrained guidance-page styling. They will not imply waterfall stages or use decorative architecture imagery.

## Phase 1 integration

- Link architecture guidance to the existing Decision Framework, Test and Learn, Delivery Lifecycle, evidence, value, operating model, practices, and templates where relevant.
- Add small reciprocal architecture prompts to the most relevant existing Markdown pages rather than duplicating guidance.
- Reuse the existing Architecture Decision template and expand it to the requested lightweight structure.
- Add lightweight Markdown templates for Options Appraisal and Experiment Architecture Checklist.
- Include partner-environment and sustainable-ownership guidance across the relevant principle, domain, and tools content.

## Validation before review

- Run content validation, tests, lint, and the normal app build.
- Verify the landing page, a principle page, diagrams, navigation, search, and cross-links in desktop and mobile layouts.
- Run the existing GitHub Pages static export and confirm the `/customefirstos/` base path, generated deep-link files, assets, `.nojekyll`, and `404.html` fallback remain correct.
- Check keyboard focus, semantic headings, table accessibility, diagram text alternatives, colour independence, and narrow-screen overflow.

## Review gate

Stop after this complete first section for review. Do not introduce Lovable Cloud, a CMS, an external database, a new analytics provider, or broader CFOS restructuring.

## Technical approach

- Keep TanStack Start file-based routing and the current `Shell`, Markdown loader, renderer, design tokens, and Pages crawler.
- Add the new content folder to the validator and section ordering rather than creating a parallel content system.
- Keep long-form content in Markdown; React will only provide navigation, layout, diagram, and reusable guidance-block rendering.
- Preserve the current static export workflow; new routes will be discoverable from rendered links so the existing crawler prerenders them automatically.