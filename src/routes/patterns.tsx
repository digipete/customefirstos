import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell, PageHeader, Tag } from "@/components/Shell";
import { dataset } from "@/data/seed";

export const Route = createFileRoute("/patterns")({
  head: () => ({
    meta: [
      { title: "Patterns — CustomerFirst OS" },
      {
        name: "description",
        content:
          "Reusable organisational learning, strengthened as independent missions accumulate evidence.",
      },
      { property: "og:title", content: "Patterns — CustomerFirst OS" },
      {
        property: "og:description",
        content: "Candidate, Emerging, Proven and Retired patterns with the evidence behind them.",
      },
    ],
  }),
  component: Patterns,
});

function Patterns() {
  return (
    <Shell>
      <PageHeader
        eyebrow="Organisational learning"
        title="Pattern library"
        lede="Patterns get stronger as independent missions produce evidence. A pattern observed once never looks like one supported across seven missions."
      />
      <ul className="mx-auto grid max-w-7xl gap-4 px-6 py-10 md:grid-cols-2">
        {dataset.patterns.map((p) => (
          <li key={p.id} className="rounded-lg border bg-card p-6">
            <div className="flex flex-wrap items-center gap-2">
              <Tag
                tone={
                  p.status === "Proven"
                    ? "positive"
                    : p.status === "Emerging"
                      ? "accent"
                      : "neutral"
                }
              >
                {p.status}
              </Tag>
              <Tag>
                {p.missionsObserved.length === 1
                  ? "Observed in 1 mission"
                  : `Evidence from ${p.missionsObserved.length} missions`}
              </Tag>
            </div>
            <h2 className="mt-3 text-lg font-semibold">{p.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Context:</span> {p.context}
            </p>
            <p className="mt-2 text-sm">{p.approach}</p>
            <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground">
              {p.lessons.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            <p className="mt-3 text-sm">
              Missions:{" "}
              {p.missionsObserved.map((id) => {
                const m = dataset.missions.find((x) => x.id === id)!;
                return (
                  <Link
                    key={id}
                    to="/missions/$slug"
                    params={{ slug: m.slug }}
                    className="mr-2 underline"
                  >
                    {m.name}
                  </Link>
                );
              })}
            </p>
          </li>
        ))}
      </ul>
    </Shell>
  );
}
