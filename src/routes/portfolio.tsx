import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell, PageHeader, Tag } from "@/components/Shell";
import { dataset } from "@/data/seed";
import { gbp, portfolioSummary, investment, valueTotals } from "@/lib/portfolio";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — CustomerFirst OS" },
      {
        name: "description",
        content:
          "Leadership view of missions, investment, value by evidence state, flow economics and cross-mission learning — not RAG reporting.",
      },
      { property: "og:title", content: "Portfolio — CustomerFirst OS" },
      {
        property: "og:description",
        content: "Investment, value confidence and learning velocity across CustomerFirst.",
      },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const s = portfolioSummary();
  return (
    <Shell>
      <PageHeader
        eyebrow="Leadership"
        title="Portfolio"
        lede="What we are investing, what we are learning and how confident we are in the value. Value is reported by evidence state, never as a single number."
      />
      <div className="mx-auto max-w-7xl space-y-14 px-6 py-12">
        <section>
          <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Stat
              label="Active missions"
              value={String(s.activeMissions)}
              note={`${s.missions} in total`}
            />
            <Stat label="Invested" value={gbp(s.investment)} note="All mission costs to date" />
            <Stat
              label="Potential value"
              value={gbp(s.value.potential)}
              note="Assumed or modelled — not bankable"
            />
            <Stat
              label="Evidenced value"
              value={gbp(s.value.evidenced)}
              note="Observed or evidenced"
            />
            <Stat
              label="Realised value"
              value={gbp(s.value.realised)}
              note="Banked and confirmed"
            />
            <Stat
              label="Experiments completed"
              value={String(s.experimentsCompleted)}
              note={`${s.experimentsRunning} running`}
            />
            <Stat
              label="Significant decisions"
              value={String(s.decisions)}
              note={`${s.decisionsAwaitingReview} awaiting review`}
            />
            <Stat
              label="Median decision latency"
              value={`${s.medianDecisionLatency} days`}
              note="Question raised to decision taken"
            />
          </dl>
          <p className="mt-6 max-w-2xl text-sm text-muted-foreground">
            Potential value is excluded from evidenced and realised totals by construction.{" "}
            {s.value.nonFinancial} non-financial value records are tracked separately and never
            converted to money.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Hypotheses</h2>
          <dl className="mt-4 grid gap-8 sm:grid-cols-4">
            <Stat label="Supported" value={String(s.hypothesesSupported)} />
            <Stat
              label="Disproved"
              value={String(s.hypothesesDisproved)}
              note="Prevented unnecessary investment"
            />
            <Stat label="Inconclusive" value={String(s.hypothesesInconclusive)} />
            <Stat label="Currently testing" value={String(s.hypothesesTesting)} />
          </dl>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Flow economics</h2>
          <dl className="mt-4 grid gap-8 sm:grid-cols-3">
            <Stat
              label="Median days to first experiment"
              value={String(s.medianDaysToFirstExperiment ?? "—")}
            />
            <Stat
              label="Median days to meaningful evidence"
              value={String(s.medianDaysToEvidence ?? "—")}
            />
            <Stat
              label="Patterns"
              value={`${s.provenPatterns} proven / ${s.emergingPatterns} emerging`}
            />
          </dl>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Missions</h2>
          <ul className="mt-4 divide-y rounded-lg border bg-card">
            {dataset.missions.map((m) => {
              const v = valueTotals(dataset.values.filter((x) => x.missionId === m.id));
              const weakest = Object.entries(m.health).sort((a, b) => a[1].score - b[1].score)[0];
              return (
                <li key={m.id} className="p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag
                      tone={
                        m.status === "Stopped"
                          ? "danger"
                          : m.status === "Paused"
                            ? "caution"
                            : "accent"
                      }
                    >
                      {m.status}
                    </Tag>
                    <Tag>{m.stage}</Tag>
                  </div>
                  <h3 className="mt-2 font-semibold">
                    <Link to="/missions/$slug" params={{ slug: m.slug }} className="underline">
                      {m.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {gbp(investment(m.id))} invested · potential {gbp(v.potential)} · evidenced{" "}
                    {gbp(v.evidenced)} · realised {gbp(v.realised)} · weakest health dimension:{" "}
                    {weakest?.[0]} ({weakest?.[1].score}/5)
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </Shell>
  );
}

function Stat({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div>
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-sans text-3xl font-bold tracking-tight">{value}</dd>
      {note && <p className="mt-1 text-xs text-muted-foreground">{note}</p>}
    </div>
  );
}
