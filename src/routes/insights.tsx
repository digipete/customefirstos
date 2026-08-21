import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell, PageHeader, Tag } from "@/components/Shell";
import { dataset } from "@/data/seed";

export const Route = createFileRoute("/insights")({
  head: () => ({ meta: [
    { title: "Insights — CustomerFirst OS" },
    { name: "description", content: "Cross-mission observations with evidence, confidence, a suggested question and a suggested action — reviewed by people before they count." },
    { property: "og:title", content: "Insights — CustomerFirst OS" },
    { property: "og:description", content: "What CustomerFirst is learning about how transformation works." }]}),
  component: Insights,
});

function Insights() {
  return (
    <Shell>
      <PageHeader eyebrow="Intelligence" title="What we're learning" lede="Generated observations across missions. These are observations, not facts: correlation is not causation, and every insight is reviewed by a person before it counts." />
      <ul className="mx-auto max-w-4xl space-y-6 px-6 py-10">
        {dataset.insights.map((i) => (
          <li key={i.id} className="rounded-lg border bg-card p-6">
            <div className="flex flex-wrap items-center gap-2">
              <Tag tone={i.status === "Accepted" || i.status === "Actioned" ? "positive" : i.status === "Rejected" ? "danger" : "caution"}>{i.status}</Tag>
              <Tag>Confidence {i.confidence}%</Tag>
              <span className="text-sm text-muted-foreground">{i.generatedAt} · {i.provider}</span>
            </div>
            <h2 className="mt-3 text-lg font-semibold">{i.observation}</h2>
            <p className="mt-2 text-sm"><span className="font-medium">Why it matters: </span>{i.whyItMatters}</p>
            <p className="mt-2 text-sm"><span className="font-medium">Suggested question: </span>{i.suggestedQuestion}</p>
            <p className="mt-1 text-sm"><span className="font-medium">Suggested action: </span>{i.suggestedAction}</p>
            <p className="mt-2 text-sm text-muted-foreground">Evidence: {i.evidenceIds.join(", ")} · Missions: {i.missionIds.map((id) => {
              const m = dataset.missions.find((x) => x.id === id)!;
              return <Link key={id} to="/missions/$slug" params={{ slug: m.slug }} className="mr-2 underline">{m.name}</Link>;
            })}</p>
            {i.reviewer && <p className="mt-2 text-sm">Reviewed by {i.reviewer}{i.reviewerFeedback ? `: ${i.reviewerFeedback}` : ""}</p>}
            {i.osChangeSuggestion && <p className="mt-2 rounded-md bg-surface p-3 text-sm">Suggested OS change (via GitHub pull request only): {i.osChangeSuggestion}</p>}
          </li>
        ))}
      </ul>
    </Shell>
  );
}
