// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// The Lovable preview/build sandbox always targets the cloudflare-module server
// output regardless of this file (it forces it), so these overrides only take
// effect when the build runs OUTSIDE the sandbox — i.e. in GitHub Actions.
//
// GitHub Pages is a static host, so the CI build switches TanStack Start to the
// "github-pages" nitro preset (static prerender + .nojekyll + /404.html) and
// prefixes all asset URLs with /customefirstos/ to match the project site path.
const isGithubPages = process.env.CFOS_STATIC === "true";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  ...(isGithubPages
    ? {
        vite: { base: "/customefirstos/" },
        nitro: { preset: "github-pages" },
      }
    : {}),
});
