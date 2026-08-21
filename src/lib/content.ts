import yaml from "js-yaml";

// Markdown in /content is the canonical source of truth. It is loaded at build
// time so the repository remains usable (and readable) without this app.
const files = import.meta.glob("../../content/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export interface Frontmatter {
  id: string;
  title: string;
  description: string;
  type: string;
  section: string;
  status?: string;
  maturity?: string;
  owner?: { profession?: string };
  version?: string | number;
  created?: string;
  reviewed?: string;
  applies_to?: string[];
  tags?: string[];
  related?: string[];
}

export interface Doc extends Frontmatter {
  slug: string;
  path: string;
  body: string;
  githubPath: string;
}

export const GITHUB_REPO = "https://github.com/digipete/CFOS";

function parse(raw: string): { data: Record<string, unknown>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return { data: {}, body: raw };
  const data = (yaml.load(match[1] ?? "") ?? {}) as Record<string, unknown>;
  return { data, body: raw.slice(match[0].length) };
}

function build(): Doc[] {
  const docs: Doc[] = [];
  for (const [path, raw] of Object.entries(files)) {
    const { data, body } = parse(raw);
    const rel = path.replace("../../content/", "").replace(/\.md$/, "");
    const fm = data as unknown as Frontmatter;
    if (!fm?.id || !fm?.title) {
      throw new Error(`Malformed frontmatter in content/${rel}.md — id and title are required`);
    }
    docs.push({
      ...fm,
      slug: rel,
      path: `content/${rel}.md`,
      body,
      githubPath: `${GITHUB_REPO}/edit/main/content/${rel}.md`,
    });
  }
  return docs.sort((a, b) => a.slug.localeCompare(b.slug));
}

export const docs: Doc[] = build();

export const SECTION_ORDER = [
  "philosophy",
  "operating-model",
  "delivery",
  "decisions",
  "practices",
  "evidence",
  "patterns",
  "templates",
] as const;

export const SECTION_LABELS: Record<string, string> = {
  philosophy: "Why we exist",
  "operating-model": "Operating model",
  delivery: "Delivery lifecycle",
  decisions: "Decisions and governance",
  practices: "Practices",
  evidence: "Evidence and economics",
  patterns: "Patterns",
  templates: "Templates",
};

export function docsBySection() {
  return SECTION_ORDER.map((section) => ({
    section,
    label: SECTION_LABELS[section],
    docs: docs.filter((doc) => doc.section === section),
  })).filter((group) => group.docs.length > 0);
}

export function getDoc(slug: string): Doc | undefined {
  return docs.find((doc) => doc.slug === slug);
}

export function getDocById(id: string): Doc | undefined {
  return docs.find((doc) => doc.id === id);
}
