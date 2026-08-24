# CFOS Phase 1 — foundations to review before anything else

Phase 1 exists to prove one thing: **GitHub is the durable CustomerFirst asset, and the
app is only an interface over it.** Nothing in Phase 2+ (Cloud database, auth, write
flows) should start until the points below are accepted.

## 1. Repository structure

```
content/                 canonical knowledge — Markdown + YAML frontmatter
  philosophy/            why we exist, manifesto, beliefs, principles
  operating-model/       operating model, missions, squads, professions, leadership
  delivery/              lifecycle and its stages
  decisions/             decision framework, minimum viable governance
  practices/             one file per profession
  evidence/              evidence standard, economics, value confidence, health
  patterns/              pattern library, anti-patterns
  templates/             reusable templates teams copy
scripts/validate-content.mjs   framework-free validator (plain Node + js-yaml)
tests/                   vitest: content integrity + economics rules
src/                     the interface (TanStack Start). Disposable by design.
.github/workflows/ci.yml validation, tests, lint and build on every push/PR
```

The `content/` tree and the validator have **no dependency on the app**. Clone the repo,
delete `src/`, and the knowledge still reads correctly in GitHub, in any editor, and in
any future tool.

## 2. Markdown handling contract

Every document must satisfy the rules the validator enforces:

- YAML frontmatter block first, parseable (colons inside values must be quoted).
- Required fields: `id`, `title`, `description`, `type`, `section`.
- `id` matches `cf-kebab-case` and is unique across the corpus.
- `section` matches the folder the file sits in; folder must be a known section.
- Filenames are kebab-case; the file path is the URL slug.
- Body is non-empty and starts with a single `#` H1.
- Every id listed in `related:` resolves to a real document.

Optional fields in use: `status`, `maturity`, `owner.profession`, `version`, `created`,
`reviewed`, `applies_to`, `tags`, `related`.

Rendering rules:

- Markdown is loaded at build time (`import.meta.glob`) and rendered with `marked` (GFM).
- ```` ```mermaid ```` blocks stay plain text in Git and are rendered client-side only,
  falling back to the diagram source if rendering fails. The Markdown stays the source.
- Each document page links back to its `edit/main/content/...` path on GitHub, so the
  correction path is always a pull request, never an edit inside the app.

Run locally:

```bash
bun run content:validate   # frontmatter, ids, sections, cross-references
bun run test               # content integrity + economics rules
bun run verify             # validate + test + lint + build (same as CI)
```

## 3. Routing and URLs

Routes are file-based under `src/routes/`:

| URL | File |
| --- | --- |
| `/` | `index.tsx` |
| `/how-we-work` | `how-we-work.index.tsx` |
| `/how-we-work/<section>/<slug>` | `how-we-work.$.tsx` (splat → content path) |
| `/missions`, `/missions/<slug>` | `missions.index.tsx`, `missions.$slug.tsx` |
| `/decisions` `/experiments` `/evidence` `/patterns` `/insights` `/portfolio` `/search` | one file each |

The document URL is derived directly from the file path in `content/`, so a Markdown file
and its web address never drift apart.

## 4. Deployment — the `/customefirstos/` base path decision

The spec assumed a static GitHub Pages site served from `/CFOS/`. Two facts shaped the
decision:

- This build is server-rendered (TanStack Start), which a static host like GitHub Pages
  cannot serve as-is.
- The live URL `https://digipete.github.io/customefirstos/` is a **project site**, so every
  asset must live under `/customefirstos/`.

The resolution is a **dual-build setup**:

- **Lovable publishing** (from the app's root) is the default interface. Server rendering
  is kept, deep links and refreshes work server-side, and every document gets its own
  `og:*` metadata for social sharing.
- **GitHub Pages** is additionally published from CI using a dedicated **static build**
  (`.github/workflows/deploy.yml`). In GitHub Actions the build runs outside the Lovable
  sandbox, so `vite.config.ts` can switch to the Nitro `github-pages` preset
  (`CFOS_STATIC=true`): it prerenders every reachable route, writes `.nojekyll`, emits a
  `404.html` SPA fallback, and prefixes all asset URLs with `/customefirstos/`.

### Trade-offs of the static Pages build (accepted deliberately)

- **No server rendering on Pages**: HTML is prerendered at build time. New or renamed
  content only appears after the next `main` push.
- **Social metadata degrades**: without a server, `og:*` tags come from static HTML. Each
  prerendered page still carries its own metadata, but unfurl-crawlers that re-render
  dynamic routes (e.g. a freshly added doc) may miss them until the next deploy.
- **Deep links on unknown paths**: Pages has no server to intercept 404s, so an unmatched
  URL returns a 404 status before the SPA `404.html` fallback boots the client router.
  Known routes (every prerendered page) work as full URLs.
- **Lovable preview stays unaffected**: the sandbox forces the cloudflare output regardless
  of this file, so preview/publishing from Lovable keeps its root-based server build.

The durable asset (content, validation, CI) stays on GitHub; Pages is one mirror of the
interface. To enable Pages on the repo: **Settings > Pages > Source: GitHub Actions**.

## 5. Phase 1 exit checklist

- [x] Content tree readable and useful without the app
- [x] Validator catches malformed frontmatter, bad sections, duplicate and dangling ids
- [x] Tests assert potential value is never counted as realised value
- [x] CI runs validation, tests, lint and build on every push and pull request
- [x] Every route renders server-side, including deep document links
- [x] GitHub Pages static mirror workflow (`.github/workflows/deploy.yml`)
- [ ] Repo structure, Markdown contract and deployment decision signed off by Pete
- [ ] Only then: Lovable Cloud schema, roles, auth and write flows (Phase 2)
