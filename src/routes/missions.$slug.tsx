import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Shell, Tag } from "@/components/Shell";
import { dataset } from "@/data/seed";
import { gbp, investment, valueTotals, costPerLearning } from "@/lib/portfolio";
import { getDocById } from "@/lib/content";

export const Route = createFileRoute("/missions/$slug")({
  loader: ({ params }) => {
    const mission = dataset.missions.find((m) => m.slug === params.slug);
    if (!mission) throw notFound();
    return { mission };
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.mission.name} — CustomerFirst OS` },
            { name: "description", content: loaderData.mission.description },
            { property: "og:title", content: `${loaderData.mission.name} — CustomerFirst OS` },
            { property: "og:description", content: loaderData.mission.description },
          ],
        }
      : {
          meta: [
            { title: "Mission unavailable — CustomerFirst OS" },
            { name: "robots", content: "noindex" },
          ],
        },
  errorComponent: () => (
    <Shell>
      <div className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="text-2xl font-semibold">This mission didn't load</h1>
      </div>
    </Shell>
  ),
  notFoundComponent: () => (
    <Shell>
      <div className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="text-2xl font-semibold">Mission not found</h1>
        <Link to="/missions" className="mt-4 inline-block underline">
          All missions
        </Link>
      </div>
    </Shell>
  ),
  component: MissionPage,
});

const person = (id: string) => dataset.people.find((p) => p.id === id)?.name ?? id;
const strengthTone = (s: string): "positive" | "accent" | "caution" =>
  s === "Strong" ? "positive" : s === "Moderate" ? "accent" : "caution";

function MissionPage() {
  const { mission: m } = Route.useLoaderData();
  const hyps = dataset.hypotheses.filter((h) => h.missionId === m.id);
  const exps = dataset.experiments.filter((x) => x.missionId === m.id);
  const decs = dataset.decisions.filter((d) => d.missionId === m.id);
  const evid = dataset.evidence.filter((e) => e.missionId === m.id);
  const vals = dataset.values.filter((v) => v.missionId === m.id);
  const costs = dataset.costs.filter((c) => c.missionId === m.id);
  const pats = dataset.patterns.filter((p) => p.missionsObserved.includes(m.id));
  const totals = valueTotals(vals);

  return (
    <Shell>
      <div className="border-b bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <Link to="/missions" className="text-sm underline">
            ← Missions
          </Link>
          <div className="mt-4 flex flex-wrap gap-2">
            <Tag
              tone={
                m.status === "Stopped" ? "danger" : m.status === "Paused" ? "caution" : "accent"
              }
            >
              {m.status}
            </Tag>
            <Tag>{m.stage}</Tag>
            <Tag>{m.partner}</Tag>
          </div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">{m.name}</h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{m.problemStatement}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-14 px-6 py-12">
        <section>
          <h2 className="text-2xl font-semibold">Current understanding</h2>
          <p className="mt-3 max-w-3xl">{m.currentUnderstanding}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Mission owner: {person(m.ownerId)} · Team: {m.team.map(person).join(", ")}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Outcomes</h2>
          <ul className="mt-4 space-y-3">
            {m.outcomes.map((o) => (
              <li key={o.id} className="rounded-lg border bg-card p-4">
                <p className="font-medium">{o.statement}</p>
                <p className="text-sm text-muted-foreground">
                  Measure: {o.measure} · Baseline: {o.baseline}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Mission health</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Nine dimensions, shown separately. There is no single score.
          </p>
          <ul className="mt-4 grid gap-3 md:grid-cols-3">
            {Object.entries(m.health).map(([dim, v]) => (
              <li key={dim} className="rounded-lg border bg-card p-4">
                <p className="font-medium">{dim}</p>
                <p className="mt-1 font-mono text-sm">{v.score} of 5</p>
                <p className="mt-1 text-sm text-muted-foreground">{v.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Hypotheses</h2>
          <ul className="mt-4 divide-y rounded-lg border bg-card">
            {hyps.map((h) => (
              <li key={h.id} className="p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag
                    tone={
                      h.status === "Disproved"
                        ? "positive"
                        : h.status === "Supported"
                          ? "positive"
                          : "neutral"
                    }
                  >
                    {h.status}
                  </Tag>
                  <span className="text-sm text-muted-foreground">
                    Importance {h.importance} · Uncertainty {h.uncertainty} · Confidence{" "}
                    {h.confidence}%
                  </span>
                </div>
                <p className="mt-2 font-medium">{h.statement}</p>
                <p className="text-sm text-muted-foreground">
                  Assumption: {h.assumption}. Evidence required: {h.evidenceRequired}.
                </p>
                {h.status === "Disproved" && (
                  <p className="mt-1 text-sm text-positive">
                    Disproved — this prevented further investment in an unsupported approach.
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Experiments</h2>
          <ul className="mt-4 divide-y rounded-lg border bg-card">
            {exps.map((x) => (
              <li key={x.id} className="p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag tone={x.result ? "accent" : "caution"}>{x.result ?? "Running"}</Tag>
                  <span className="text-sm text-muted-foreground">
                    {x.method} · {gbp(x.cost)} · {x.participants} participants · learning{" "}
                    {x.learningScore}/5
                  </span>
                </div>
                <p className="mt-2 font-medium">{x.name}</p>
                <p className="text-sm text-muted-foreground">
                  {x.description}
                  {x.recommendation ? ` Recommendation: ${x.recommendation}.` : ""}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">
            Cost per point of learning:{" "}
            {costPerLearning(m.id) ? gbp(costPerLearning(m.id)!) : "not yet measurable"}.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Recent evidence</h2>
          <ul className="mt-4 space-y-3">
            {evid.slice(0, 6).map((e) => (
              <li key={e.id} className="rounded-lg border bg-card p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag tone={strengthTone(e.strength)}>{e.strength} evidence</Tag>
                  <span className="text-sm text-muted-foreground">
                    {e.type} · {e.date}
                  </span>
                </div>
                <p className="mt-2">{e.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Significant decisions</h2>
          <ul className="mt-4 space-y-3">
            {decs.map((d) => (
              <li key={d.id} className="rounded-lg border bg-card p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag>{d.domain}</Tag>
                  <span className="text-sm text-muted-foreground">
                    Decided {d.decisionDate} · review {d.reviewDate}
                  </span>
                </div>
                <p className="mt-2 font-medium">{d.question}</p>
                <p className="text-sm text-muted-foreground">{d.outcome ?? "Awaiting review."}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Economics</h2>
          <dl className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="text-sm text-muted-foreground">Invested</dt>
              <dd className="text-3xl font-bold">{gbp(investment(m.id))}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Potential — assumed/modelled</dt>
              <dd className="text-3xl font-bold">{gbp(totals.potential)}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Evidenced — observed/evidenced</dt>
              <dd className="text-3xl font-bold">{gbp(totals.evidenced)}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Realised</dt>
              <dd className="text-3xl font-bold">{gbp(totals.realised)}</dd>
            </div>
          </dl>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold">Investment breakdown</h3>
              <ul className="mt-2 text-sm text-muted-foreground">
                {costs.map((c) => (
                  <li key={c.id}>
                    {c.type}: {gbp(c.amount)} — {c.note}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Value records</h3>
              <ul className="mt-2 space-y-2 text-sm">
                {vals.map((v) => (
                  <li key={v.id}>
                    <Tag
                      tone={
                        v.state === "Realised"
                          ? "positive"
                          : v.state === "Assumed" || v.state === "Modelled"
                            ? "caution"
                            : "accent"
                      }
                    >
                      {v.state}
                    </Tag>{" "}
                    <span className="font-medium">
                      {v.financial ? gbp(v.amount) : `${v.amount} ${v.unit}`}
                    </span>{" "}
                    — {v.description}{" "}
                    <span className="text-muted-foreground">
                      ({v.financial ? "financial" : "non-financial"}, {v.type})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">Risks and dependencies</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {m.risks.map((r) => (
                <li key={r.id}>
                  <Tag tone={r.severity === "High" ? "danger" : "caution"}>{r.severity}</Tag>{" "}
                  {r.description} — {person(r.owner)}
                </li>
              ))}
              {m.dependencies.map((d) => (
                <li key={d.id}>
                  <Tag>{d.status}</Tag> {d.description} ({d.on})
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Emerging learning</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
              {m.lessons.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            <h3 className="mt-6 font-semibold">Recommended next questions</h3>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm">
              {m.nextQuestions.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">Patterns generated</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {pats.map((p) => (
                <li key={p.id}>
                  <Link to="/patterns" className="underline">
                    {p.name}
                  </Link>{" "}
                  — {p.status}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">OS guidance used</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {m.osReferences.map((id) => {
                const doc = getDocById(id);
                return doc ? (
                  <li key={id}>
                    <Link to="/how-we-work/$" params={{ _splat: doc.slug }} className="underline">
                      {doc.title}
                    </Link>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        </section>
      </div>
    </Shell>
  );
}
