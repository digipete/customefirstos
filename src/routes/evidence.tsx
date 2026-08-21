import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell, PageHeader, Tag } from "@/components/Shell";
import { dataset } from "@/data/seed";

export const Route = createFileRoute("/evidence")({
  head: () => ({ meta: [
    { title: "Evidence — CustomerFirst OS" },
    { name: "description", content: "Every evidence record with an explicit strength, so weak evidence never looks like strong evidence." },
    { property: "og:title", content: "Evidence — CustomerFirst OS" },
    { property: "og:description", content: "Evidence records, strengths and what they support or challenge." }]}),
  component: Evidence,
});

function Evidence() {
  const e = dataset.evidence;
  const count = (s: string) => e.filter((x) => x.strength === s).length;
  return (
    <Shell>
      <PageHeader eyebrow="Evidence standard" title="Evidence" lede="Evidence may support or challenge a hypothesis, a decision, an outcome or a pattern. Strength is always explicit." />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <p className="text-sm text-muted-foreground">{e.length} records · {count("Strong")} strong · {count("Moderate")} moderate · {count("Weak")} weak</p>
        <ul className="mt-8 divide-y rounded-lg border bg-card">
          {e.map((x) => {
            const m = dataset.missions.find((mm) => mm.id === x.missionId)!;
            return (
              <li key={x.id} className="p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag tone={x.strength === "Strong" ? "positive" : x.strength === "Moderate" ? "accent" : "caution"}>{x.strength}</Tag>
                  <span className="text-sm text-muted-foreground">{x.type} · {x.date} · <Link to="/missions/$slug" params={{ slug: m.slug }} className="underline">{m.name}</Link></span>
                </div>
                <p className="mt-2">{x.description}</p>
                <p className="text-sm text-muted-foreground">Supports: {x.supports.join(", ") || "—"} · source: {x.source}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </Shell>
  );
}
