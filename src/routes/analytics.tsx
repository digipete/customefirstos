import { createFileRoute } from "@tanstack/react-router";
import { Shell, PageHeader, Tag } from "@/components/Shell";
import { healthRankings, flowCadence, decisionVelocity, insightFunnel } from "@/lib/analytics";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — CustomerFirst OS" },
      {
        name: "description",
        content:
          "Portfolio-wide patterns in mission health, delivery flow, decision velocity and insight acceptance — dimension by dimension, never a single RAG score.",
      },
      { property: "og:title", content: "Analytics — CustomerFirst OS" },
      {
        property: "og:description",
        content: "How CustomerFirst is learning, deciding and delivering across the portfolio.",
      },
    ],
  }),
  component: Analytics,
});

function Analytics() {
  const health = healthRankings();
  const flow = flowCadence();
  const decisions = decisionVelocity();
  const insights = insightFunnel();

  return (
    <Shell>
      <PageHeader
        eyebrow="Analysis"
        title="Analytics"
        lede="Patterns across the whole portfolio — where health is fragile, how delivery cadence varies, where decisions are slow and whether insight actually changes the OS. Each dimension is reported separately; there is no single blended score."
      />
      <div className="mx-auto max-w-7xl space-y-14 px-6 py-12">
        <section>
          <h2 className="text-2xl font-semibold">Mission health — weakest dimensions first</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Mean 1–5 score per dimension across all missions, plus how many missions score it weakly
            (2 or below). Sorted most fragile first.
          </p>
          <ul className="mt-4 divide-y rounded-lg border bg-card">
            {health.map((h) => (
              <li
                key={h.dimension}
                className="flex flex-wrap items-center justify-between gap-3 p-4"
              >
                <div>
                  <p className="font-medium">{h.dimension}</p>
                  <p className="text-sm text-muted-foreground">
                    {h.weakestCount} of {h.missionsScored} missions score it weakly
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Tag tone={h.mean <= 2.5 ? "caution" : h.mean <= 3.5 ? "accent" : "positive"}>
                    mean {h.mean}
                  </Tag>
                  <span className="font-mono text-sm text-muted-foreground">/ 5</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Flow economics — delivery cadence</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Median days to each milestone. Missions that never reached a milestone are counted, not
            hidden.
          </p>
          <dl className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {flow.map((f) => (
              <div key={f.milestone} className="rounded-lg border bg-card p-4">
                <dt className="text-sm text-muted-foreground">
                  {f.milestone.replace("daysTo", "Days to ")}
                </dt>
                <dd className="mt-1 text-2xl font-bold">
                  {f.medianDays ?? "—"}
                  {f.medianDays != null && (
                    <span className="text-sm font-normal text-muted-foreground"> days</span>
                  )}
                </dd>
                <p className="mt-1 text-xs text-muted-foreground">
                  {f.missionsReached} reached · {f.missionsNotReached} never reached
                </p>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Decision velocity by domain</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Mean and median latency from question raised to decision taken, grouped by domain. Slow
            or backlogged domains surface first.
          </p>
          <ul className="mt-4 divide-y rounded-lg border bg-card">
            {decisions.map((d) => (
              <li key={d.domain} className="p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag tone="accent">{d.domain}</Tag>
                    <span className="text-sm text-muted-foreground">
                      {d.count} decisions · awaiting review {d.awaitingReview}
                    </span>
                  </div>
                  <span className="font-mono text-sm">
                    mean {d.meanDays} days · median {d.medianDays ?? "—"} days
                  </span>
                </div>
                {d.pending.length > 0 && (
                  <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                    {d.pending.map((p) => (
                      <li key={p.question}>
                        Longest pending · decided {p.decisionDate}: {p.question}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Insight acceptance</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            From generated to actioned. The final column asks whether accepted insight actually
            changed the operating manual.
          </p>
          <dl className="mt-4 grid gap-6 sm:grid-cols-3 lg:grid-cols-5">
            <Metric label="Generated" value={String(insights.byStatus.Generated)} />
            <Metric label="Reviewing" value={String(insights.byStatus.Reviewing)} />
            <Metric label="Accepted" value={String(insights.byStatus.Accepted)} />
            <Metric label="Actioned" value={String(insights.byStatus.Actioned)} />
            <Metric label="Rejected" value={String(insights.byStatus.Rejected)} />
          </dl>
          <dl className="mt-4 grid gap-6 sm:grid-cols-3">
            <Metric
              label="Acceptance rate"
              value={`${insights.acceptanceRate}%`}
              note={`${insights.accepted} of ${insights.total} accepted or actioned`}
            />
            <Metric
              label="Accepted → changed the OS"
              value={`${insights.acceptedWithOsChange} of ${insights.accepted}`}
              note="Have an osChangeSuggestion"
            />
          </dl>
          <ul className="mt-4 space-y-2">
            {insights.byProvider.map((p) => (
              <li
                key={p.provider}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-card px-4 py-3"
              >
                <span className="font-mono text-sm">{p.provider}</span>
                <span className="text-sm text-muted-foreground">
                  {p.accepted} of {p.count} accepted ({p.acceptanceRate}%)
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Shell>
  );
}

function Metric({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div>
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-2xl font-bold tracking-tight">{value}</dd>
      {note && <p className="mt-1 text-xs text-muted-foreground">{note}</p>}
    </div>
  );
}
