import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell, PageHeader, Tag } from "@/components/Shell";
import { dataset } from "@/data/seed";
import { gbp, investment, valueTotals } from "@/lib/portfolio";

export const Route = createFileRoute("/missions/")({
  head: () => ({
    meta: [
      { title: "Missions — CustomerFirst OS" },
      { name: "description", content: "Multidisciplinary missions organised around customer outcomes, shown by lifecycle stage, evidence and confidence rather than percentage complete." },
      { property: "og:title", content: "Missions — CustomerFirst OS" },
      { property: "og:description", content: "Every mission, its lifecycle stage, evidence and economics." },
    ],
  }),
  component: Missions,
});

const tone = (s: string): "danger" | "caution" | "positive" | "accent" =>
  s === "Stopped" ? "danger" : s === "Paused" ? "caution" : s === "Complete" ? "positive" : "accent";

function Missions() {
  return (
    <Shell>
      <PageHeader eyebrow="Delivery" title="Missions" lede="Focused multidisciplinary work organised around an outcome. Progress is shown as lifecycle stage, evidence and confidence — never as percentage complete." />
      <ul className="mx-auto max-w-7xl divide-y px-6 py-4">
        {dataset.missions.map((m) => {
          const values = valueTotals(dataset.values.filter((v) => v.missionId === m.id));
          return (
            <li key={m.id} className="py-8">
              <div className="flex flex-wrap items-center gap-2">
                <Tag tone={tone(m.status)}>{m.status}</Tag>
                <Tag>{m.stage}</Tag>
                <span className="text-sm text-muted-foreground">{m.partner}</span>
              </div>
              <h2 className="mt-3 text-2xl font-semibold">
                <Link to="/missions/$slug" params={{ slug: m.slug }} className="hover:underline">{m.name}</Link>
              </h2>
              <p className="mt-2 max-w-3xl text-muted-foreground">{m.description}</p>
              <dl className="mt-4 flex flex-wrap gap-x-10 gap-y-2 text-sm">
                <div><dt className="text-muted-foreground">Invested</dt><dd className="font-semibold">{gbp(investment(m.id))}</dd></div>
                <div><dt className="text-muted-foreground">Potential (assumed/modelled)</dt><dd className="font-semibold">{gbp(values.potential)}</dd></div>
                <div><dt className="text-muted-foreground">Evidenced</dt><dd className="font-semibold">{gbp(values.evidenced)}</dd></div>
                <div><dt className="text-muted-foreground">Realised</dt><dd className="font-semibold">{gbp(values.realised)}</dd></div>
                <div><dt className="text-muted-foreground">Confidence in primary hypothesis</dt><dd className="font-semibold">{m.confidence}%</dd></div>
              </dl>
            </li>
          );
        })}
      </ul>
    </Shell>
  );
}
