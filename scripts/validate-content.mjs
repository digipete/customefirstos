// Validates the canonical knowledge layer in /content.
// Markdown + YAML frontmatter is the durable CustomerFirst asset, so it must stay
// valid independently of this app. Run: bun run content:validate
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import * as yaml from "js-yaml";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const CONTENT = join(ROOT, "content");

const SECTIONS = [
  "philosophy",
  "operating-model",
  "delivery",
  "decisions",
  "practices",
  "evidence",
  "patterns",
  "templates",
];

const REQUIRED = ["id", "title", "description", "type", "section"];
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (entry.endsWith(".md")) out.push(full);
  }
  return out;
}

function parse(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return null;
  return { data: yaml.load(match[1] ?? "") ?? {}, body: raw.slice(match[0].length) };
}

export function validateContent() {
  const errors = [];
  const files = walk(CONTENT);
  const docs = [];

  for (const file of files) {
    const rel = relative(CONTENT, file).split(sep).join("/");
    const parsed = parse(readFileSync(file, "utf8"));
    if (!parsed) {
      errors.push(`${rel}: missing YAML frontmatter block`);
      continue;
    }
    const fm = parsed.data;
    for (const key of REQUIRED) {
      if (!fm[key]) errors.push(`${rel}: missing required frontmatter field "${key}"`);
    }
    const [folder, ...rest] = rel.replace(/\.md$/, "").split("/");
    if (!SECTIONS.includes(folder)) errors.push(`${rel}: "${folder}" is not a known section folder`);
    if (fm.section && fm.section !== folder)
      errors.push(`${rel}: frontmatter section "${fm.section}" does not match folder "${folder}"`);
    for (const part of rest) {
      if (!SLUG.test(part)) errors.push(`${rel}: filename must be kebab-case`);
    }
    if (fm.id && !/^cf-[a-z0-9-]+$/.test(fm.id))
      errors.push(`${rel}: id "${fm.id}" must match cf-kebab-case`);
    if (!parsed.body.trim()) errors.push(`${rel}: body is empty`);
    if (!/^#\s+\S/m.test(parsed.body)) errors.push(`${rel}: body needs a top-level H1 heading`);
    docs.push({ rel, fm });
  }

  const seen = new Map();
  for (const { rel, fm } of docs) {
    if (!fm.id) continue;
    if (seen.has(fm.id)) errors.push(`${rel}: duplicate id "${fm.id}" (also in ${seen.get(fm.id)})`);
    else seen.set(fm.id, rel);
  }

  for (const { rel, fm } of docs) {
    for (const ref of fm.related ?? []) {
      if (!seen.has(ref)) errors.push(`${rel}: related id "${ref}" does not resolve to any document`);
    }
  }

  return { count: docs.length, errors };
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split(sep).join("/"))) {
  const { count, errors } = validateContent();
  if (errors.length) {
    console.error(`Content validation failed (${errors.length} problem(s)):`);
    for (const e of errors) console.error(` - ${e}`);
    process.exit(1);
  }
  console.log(`Content OK — ${count} documents validated.`);
}
