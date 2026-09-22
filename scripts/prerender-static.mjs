#!/usr/bin/env node
// Prerender the CFOS app to static HTML for GitHub Pages.
//
// Why this exists: Nitro's own "static"/"github-pages" presets fail with the
// Vite/Nitro versions this template pins (the prerenderer never reaches the SSR
// handler, then the nitro environment build aborts). So instead we build the
// normal node-server output, run it, crawl every reachable page, and write the
// rendered HTML into .output/public — which is exactly what Pages wants.
//
// Usage: node scripts/prerender-static.mjs   (after a node-server build)
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { mkdir, writeFile, readFile, access, cp, rm } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const BASE = process.env["CFOS_BASE"] ?? "/customefirstos/";
const PORT = Number(process.env["CFOS_PRERENDER_PORT"] ?? 3123);
const ORIGIN = `http://127.0.0.1:${PORT}`;
const PUBLIC_DIR = path.resolve(".output/public");

async function firstExisting(paths) {
  for (const candidate of paths) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      /* try the next supported Nitro output location */
    }
  }
  throw new Error(`No server entry found in: ${paths.join(", ")}`);
}

async function startServer(serverEntry) {
  const source = await readFile(serverEntry, "utf8");
  if (source.includes("cloudflare_module_default")) {
    const { default: worker } = await import(pathToFileURL(serverEntry).href);
    const server = createServer(async (request, response) => {
      try {
        const url = new URL(request.url ?? "/", ORIGIN);
        const webResponse = await worker.fetch(new Request(url), {}, { waitUntil() {} });
        response.writeHead(webResponse.status, Object.fromEntries(webResponse.headers));
        response.end(Buffer.from(await webResponse.arrayBuffer()));
      } catch (error) {
        console.error(error);
        response.writeHead(500).end("Prerender server error");
      }
    });
    await new Promise((resolve) => server.listen(PORT, "127.0.0.1", resolve));
    return { stop: () => server.close() };
  }

  const child = spawn(process.execPath, [serverEntry], {
    env: { ...process.env, PORT: String(PORT), HOST: "127.0.0.1" },
    stdio: ["ignore", "inherit", "inherit"],
  });
  child.on("exit", (code) => {
    if (code && code !== 0) {
      console.error(`Prerender server exited early with code ${code}`);
      process.exitCode = 1;
    }
  });
  return { stop: () => child.kill("SIGTERM") };
}

async function waitForServer(timeoutMs = 60_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(`${ORIGIN}${BASE}`, { redirect: "manual" });
      if (res.status < 500) return;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("Server did not start in time");
}

/** Collect same-origin document links that live under the base path. */
function extractLinks(html) {
  const links = new Set();
  for (const match of html.matchAll(/href="([^"#?]+)/g)) {
    const href = match[1];
    if (!href.startsWith(BASE)) continue;
    if (/\.[a-z0-9]+$/i.test(href) && !href.endsWith(".html")) continue;
    links.add(href.endsWith("/") && href !== BASE ? href.slice(0, -1) : href);
  }
  return links;
}

/** /customefirstos/missions/foo -> .output/public/missions/foo/index.html */
function outputPathFor(route) {
  const rel = route.slice(BASE.length).replace(/^\/+/, "");
  return rel === ""
    ? path.join(PUBLIC_DIR, "index.html")
    : path.join(PUBLIC_DIR, rel, "index.html");
}

async function main() {
  const serverEntry = await firstExisting([
    path.resolve(".output/server/index.mjs"),
    path.resolve("dist/server/index.mjs"),
  ]);
  const clientDir = path.resolve(path.dirname(path.dirname(serverEntry)), "client");
  await rm(PUBLIC_DIR, { recursive: true, force: true });
  await mkdir(PUBLIC_DIR, { recursive: true });
  await cp(clientDir, PUBLIC_DIR, { recursive: true });
  const server = await startServer(serverEntry);

  try {
    await waitForServer();

    const queue = [BASE];
    const seen = new Set(queue);
    let rendered = 0;

    while (queue.length > 0) {
      const route = queue.shift();
      const res = await fetch(`${ORIGIN}${route}`);
      const html = await res.text();
      if (!res.ok) {
        throw new Error(`Prerender failed for ${route}: HTTP ${res.status}`);
      }
      const file = outputPathFor(route);
      await mkdir(path.dirname(file), { recursive: true });
      await writeFile(file, html, "utf8");
      rendered += 1;
      console.log(`  prerendered ${route}`);

      for (const link of extractLinks(html)) {
        if (!seen.has(link)) {
          seen.add(link);
          queue.push(link);
        }
      }
    }

    // Pages serves 404.html for unknown paths; use the app shell so client-side
    // routing can still resolve deep links after hydration.
    const shell = await readFile(path.join(PUBLIC_DIR, "index.html"), "utf8");
    await writeFile(path.join(PUBLIC_DIR, "404.html"), shell, "utf8");
    // Stop Jekyll from mangling _-prefixed asset directories.
    await writeFile(path.join(PUBLIC_DIR, ".nojekyll"), "", "utf8");

    console.log(`Prerendered ${rendered} routes into .output/public`);
  } finally {
    server.stop();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
