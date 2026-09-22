import { createFileRoute, Link } from "@tanstack/react-router";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { Shell } from "@/components/Shell";
import { architectureDocs } from "@/lib/content";

export const Route = createFileRoute("/technology-architecture/")({
  head: () => ({
    meta: [
      { title: "Architecture at CustomerFirst — CustomerFirst OS" },
      {
        name: "description",
        content:
          "Architecture creates confidence to make the next decision through principles, domains, evidence and proportionate assurance.",
      },
      { property: "og:title", content: "Architecture at CustomerFirst — CustomerFirst OS" },
      {
        property: "og:description",
        content: "Not a gate. Not a phase. Not a document.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ArchitectureHome,
});

const FEATURED = [
  ["principles", "Principles", "How we think"],
  ["domains", "Domains", "What we consider"],
  ["evidence", "Evidence", "What we know"],
  ["assurance", "Assurance", "Enough confidence to act?"],
] as const;

const JOURNEYS = [
  "test-and-learn-experiments",
  "proportional-assurance",
  "continuous-architecture",
  "patterns-and-tools",
] as const;

function ArchitectureHome() {
  const docs = architectureDocs();
  const bySlug = new Map(
    docs.map((doc) => [doc.slug.replace("technology-architecture/", ""), doc]),
  );

  return (
    <Shell>
      <section className="border-b bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link to="/" className="underline underline-offset-4">
              CustomerFirst OS
            </Link>
            <span aria-hidden="true"> / </span>
            <span>Technology & Architecture</span>
          </nav>
          <p className="mt-8 font-mono text-xs font-semibold uppercase text-muted-foreground">
            Technology & Architecture
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold md:text-6xl">
            Architecture at CustomerFirst
          </h1>
          <p className="mt-6 max-w-3xl text-xl font-medium md:text-2xl">
            Architecture creates confidence to make the next decision.
          </p>
          <p className="mt-5 max-w-3xl text-lg text-muted-foreground">
            Architecture helps CustomerFirst teams understand uncertainty, make proportionate
            technology decisions and safely learn what should happen next.
          </p>
          <p className="mt-8 border-l-4 border-lime pl-5 text-xl font-bold">
            Not a gate. Not a phase. Not a document.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <section aria-labelledby="model-title">
          <h2 id="model-title" className="text-2xl font-semibold">
            The confidence-building model
          </h2>
          <ArchitectureDiagram kind="four-part-model" />
          <div className="grid gap-px overflow-hidden border bg-border md:grid-cols-2 lg:grid-cols-4">
            {FEATURED.map(([slug, title, description]) => (
              <Link
                key={slug}
                to="/technology-architecture/$"
                params={{ _splat: slug }}
                className="bg-card p-5 hover:bg-surface"
              >
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t pt-10" aria-labelledby="delivery-title">
          <h2 id="delivery-title" className="text-2xl font-semibold">
            Architecture in delivery
          </h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Architecture helps us make the experiment safe enough to run, and the resulting decision
            strong enough to act on.
          </p>
          <ArchitectureDiagram kind="evidence-led-delivery" />
        </section>

        <section className="mt-16 border-t pt-10" aria-labelledby="guidance-title">
          <h2 id="guidance-title" className="text-2xl font-semibold">
            Use the guidance
          </h2>
          <ul className="mt-6 divide-y border-y">
            {JOURNEYS.map((slug) => {
              const doc = bySlug.get(slug);
              if (!doc) return null;
              return (
                <li key={doc.id}>
                  <Link
                    to="/technology-architecture/$"
                    params={{ _splat: slug }}
                    className="block py-5 hover:bg-surface"
                  >
                    <h3 className="text-lg font-semibold underline underline-offset-4">
                      {doc.title}
                    </h3>
                    <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
                      {doc.description}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </Shell>
  );
}
