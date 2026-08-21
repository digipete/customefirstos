import { createFileRoute } from "@tanstack/react-router";
import { Shell, PageHeader, Tag } from "@/components/Shell";
import { dataset } from "@/data/seed";

export const Route = createFileRoute("/decisions")({
  head: () => ({ meta: [
    { title: "Decisions — CustomerFirst OS" },
    { name: "description", content: "Every significant CustomerFirst decision: question, evidence, options, trade-offs, owner and review date." },
    { property: "og:title", content: "Decisions — CustomerFirst OS" },
    { property: "og:description", content: "The CustomerFirst Decision Framework and the decision record." }]}),
  component: Decisions,
});

function Decisions() {
  const d = dataset.decisions;
  const latency = Math.round(d.reduce((t, x) => t + (Date.parse(x.decisionDate) - Date.parse(x.raisedDate)) / 86400000, 0) / d.length);
  return (
    <Shell>
      <PageHeader eyebrow="Decision framework" title="Decisions" lede="Question → Evidence → Options → Trade-offs → Decision → Review. Every significant decision is recorded, owned and given a review date." />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <p className="text-sm text-muted-foreground">{d.length} recorded decisions · mean decision latency {latency} days · {d.filter((x) => !x.outcome).length} awaiting review</p>
        <ul className="mt-8 space-y-4">
          {d.map((x) => (
            <li key={x.id} className="rounded-lg border bg-card p-6">
              <div className="flex flex-wrap items-center gap-2">
                <Tag tone="accent">{x.domain}</Tag>
                <Tag>{x.outcome ? "Reviewed" : "Awaiting review"}</Tag>
                <span className="text-sm text-muted-foreground">Raised {x.raisedDate} · decided {x.decisionDate} · review {x.reviewDate}</span>
              </div>
              <h2 className="mt-3 text-lg font-semibold">{x.question}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{x.context}</p>
              <details className="mt-3 text-sm">
                <summary className="cursor-pointer font-medium">Options, trade-offs and evidence</summary>
                <ul className="mt-2 list-disc pl-5">{x.options.map((o) => <li key={o.option}><span className="font-medium">{o.option}</span> — {o.note}</li>)}</ul>
                <p className="mt-2">Trade-offs accepted: {x.tradeOffs.join(" ")}</p>
                <p className="mt-2 text-muted-foreground">Evidence: {x.evidenceIds.join(", ")}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </Shell>
  );
}
