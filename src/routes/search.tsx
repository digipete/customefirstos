import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Shell, PageHeader, Tag } from "@/components/Shell";
import { docs } from "@/lib/content";
import { dataset } from "@/data/seed";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Search — CustomerFirst OS" },
      {
        name: "description",
        content:
          "Search guidance, missions, decisions, experiments, evidence, patterns, templates and insights across CustomerFirst OS.",
      },
      { property: "og:title", content: "Search — CustomerFirst OS" },
      { property: "og:description", content: "One search across the whole operating system." },
    ],
  }),
  component: Search,
});

interface Hit {
  group: string;
  title: string;
  text: string;
  to: string;
  params?: Record<string, string>;
}

function buildIndex(): Hit[] {
  const hits: Hit[] = [];
  for (const d of docs)
    hits.push({
      group: d.section === "templates" ? "Templates" : "Guidance",
      title: d.title,
      text: `${d.description} ${d.body}`,
      to: "/how-we-work/$",
      params: { _splat: d.slug },
    });
  for (const m of dataset.missions)
    hits.push({
      group: "Missions",
      title: m.name,
      text: `${m.description} ${m.problemStatement} ${m.currentUnderstanding}`,
      to: "/missions/$slug",
      params: { slug: m.slug },
    });
  for (const d of dataset.decisions)
    hits.push({
      group: "Decisions",
      title: d.question,
      text: `${d.context} ${d.domain}`,
      to: "/decisions",
    });
  for (const x of dataset.experiments)
    hits.push({
      group: "Experiments",
      title: x.name,
      text: `${x.description} ${x.method}`,
      to: "/experiments",
    });
  for (const e of dataset.evidence)
    hits.push({
      group: "Evidence",
      title: e.description,
      text: `${e.type} ${e.strength}`,
      to: "/evidence",
    });
  for (const p of dataset.patterns)
    hits.push({
      group: "Patterns",
      title: p.name,
      text: `${p.context} ${p.approach}`,
      to: "/patterns",
    });
  for (const i of dataset.insights)
    hits.push({ group: "Insights", title: i.observation, text: i.whyItMatters, to: "/insights" });
  return hits;
}

function Search() {
  const [q, setQ] = useState("");
  const index = useMemo(buildIndex, []);
  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (term.length < 2) return [];
    return index.filter((h) => `${h.title} ${h.text}`.toLowerCase().includes(term)).slice(0, 60);
  }, [q, index]);
  const groups = [...new Set(results.map((r) => r.group))];

  return (
    <Shell>
      <PageHeader
        eyebrow="Everything"
        title="Search"
        lede="One search across guidance, missions, decisions, experiments, evidence, patterns, templates and insights."
      />
      <div className="mx-auto max-w-4xl px-6 py-10">
        <label htmlFor="q" className="block text-sm font-medium">
          What are you looking for?
        </label>
        <input
          id="q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="e.g. evidence reuse, first-time fix, decision latency"
          className="mt-2 w-full rounded-md border bg-card px-4 py-3 text-base"
          autoComplete="off"
        />
        {q.trim().length >= 2 && results.length === 0 && (
          <p className="mt-8 text-muted-foreground">
            No results for “{q}”. This no-result search is the kind of signal the OS analytics view
            uses to improve guidance.
          </p>
        )}
        <div className="mt-10 space-y-10">
          {groups.map((g) => (
            <section key={g}>
              <h2 className="text-lg font-semibold">{g}</h2>
              <ul className="mt-3 divide-y rounded-lg border bg-card">
                {results
                  .filter((r) => r.group === g)
                  .map((r, i) => (
                    <li key={`${g}-${i}`} className="p-4">
                      <Link to={r.to} params={r.params as never} className="font-medium underline">
                        {r.title}
                      </Link>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {r.text.slice(0, 200)}
                      </p>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
        {q.trim().length < 2 && (
          <p className="mt-8 text-sm text-muted-foreground">
            <Tag>Architecture note</Tag> Search runs over a typed index built from Markdown and
            operational records, so semantic search can replace the matcher later without changing
            the pages.
          </p>
        )}
      </div>
    </Shell>
  );
}
