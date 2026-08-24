# Fix the failing GitHub Actions on push to main

## What's actually wrong

Both workflows fail, and they fail in the same place — the shared install step — which is why CI (`verify`) and the Pages deploy are red together.

Confirmed by reading `bun.lock`: every dependency is pinned to a **private Lovable sandbox registry** URL, e.g.

```text
"marked": ["marked@18.0.10", "https://europe-west1-npm.pkg.dev/lovable-core-prod/sandbox-npm-cache/marked/-/marked-18.0.10.tgz", ...]
```

GitHub Actions runners have no credentials for that registry, so `bun install --frozen-lockfile` cannot download those tarballs. Frozen mode forbids re-resolving them against the public npm registry, so the step exits 1 and everything after it (validate, test, lint, build, deploy) never runs.

Second, smaller issue: `bunfig.toml` sets `minimumReleaseAge` and an excludes list aimed at the sandbox — fine locally, unnecessary friction in CI.

The `actions/checkout@v4` Node 20 message in the log is only a deprecation **warning**, not the failure. It is still worth clearing.

## The fix

1. **Install against the public registry in CI.** In both workflows, before installing, remove the sandbox-pinned lockfile and the sandbox `bunfig.toml`, then install normally:
   ```yaml
   - name: Prepare public-registry install
     run: rm -f bun.lock bunfig.toml
   - name: Install dependencies
     run: bun install
     env:
       npm_config_registry: https://registry.npmjs.org
   ```
   Version ranges in `package.json` stay the source of truth, so CI installs the same versions from public npm. `bun.lock` remains committed for the Lovable sandbox and is untouched in the repo.
2. **Clear the Node 20 deprecation warning.** Bump `actions/checkout@v4` to `@v5` in both workflows (and `configure-pages`/`upload-pages-artifact`/`deploy-pages` stay on their current major versions, which already run on Node 24).
3. **Make failures diagnosable.** Keep CI's steps individually named (validate → test → lint → build) so a future red run names the failing stage instead of just "verify exit code 1".
4. **Harden the Pages job.** Fix the mislabelled `configure-pages` step name, add a guard that fails with a clear message if `.output/public/index.html` is missing after the static build, and run content validation before the build so a bad Markdown file never publishes.

## Verification

- Re-read both workflow files for correctness after editing.
- Locally confirm `bun run content:validate`, `bun run test`, `bun run lint` and the static `CFOS_STATIC=true` build all pass, so the only CI variable left is the install source.
- After the next push to `main`, check both workflow runs are green and `https://digipete.github.io/customefirstos/` serves the styled app.

## Notes

- No app code, content, or design changes — this is CI/CD only.
- If the public-registry install ever resolves a newer patch than the sandbox lockfile, CI catches it in the build step rather than silently drifting.
