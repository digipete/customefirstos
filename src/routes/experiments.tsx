import { createFileRoute } from "@tanstack/react-router";
import { Shell, PageHeader, Tag } from "@/components/Shell";
import { dataset } from "@/data/seed";
import { gbp } from "@/lib/portfolio";

export const Route = createFileRoute("/experiments")({
  head: () => ({
    meta: [
      { title: "Experiments — CustomerFirst OS" },
      {
        name: "description",
        content:
          "Experiments turning uncertainty into evidence, measured by learning per pound invested rather than by success rate.",
      },
      { property: "og:title", content: "Experiments — CustomerFirst OS" },
      {
        property: "og:description",
        content: "Learning per pound invested across the CustomerFirst portfolio.",
      },
    ],
  }),
  component: Experiments,
});

function Experiments() {
  const xs = dataset.experiments;
  const done = xs.filter((x) => x.result);
  const spend = done.reduce((t, x) => t + x.cost, 0);
  const learning = done.reduce((t, x) => t + x.learningScore, 0);
  return (
    <Shell>
      <PageHeader
        eyebrow="Test and learn"
        title="Experiments"
        lede="Small deliberate tests, each attached to a hypothesis and a decision. We measure learning relative to investment, not the share of experiments that 'succeed'."
      />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <p className="text-sm text-muted-foreground">
          {done.length} completed · {xs.length - done.length} running · {gbp(spend)} invested ·{" "}
          {gbp(Math.round(spend / learning))} per point of learning
        </p>
        <ul className="mt-8 divide-y rounded-lg border bg-card">
          {xs.map((x) => {
            const mission = dataset.missions.find((m) => m.id === x.missionId)!;
            return (
              <li key={x.id} className="p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag
                    tone={x.result === "Disproved" ? "positive" : x.result ? "accent" : "caution"}
                  >
                    {x.result ?? "Running"}
                  </Tag>
                  <span className="text-sm text-muted-foreground">
                    {mission.name} · {x.method} · {gbp(x.cost)} · learning {x.learningScore}/5
                  </span>
                </div>
                <p className="mt-2 font-medium">{x.name}</p>
                <p className="text-sm text-muted-foreground">
                  {x.description}
                  {x.recommendation ? ` Recommendation: ${x.recommendation}.` : ""}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </Shell>
  );
}
