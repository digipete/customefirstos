import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { portfolioSummary, gbp } from "@/lib/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CustomerFirst OS — how we think, decide, deliver and learn" },
      {
        name: "description",
        content:
          "The living operating system for public-service transformation: guidance, missions, evidence, decisions and cross-mission learning.",
      },
      { property: "og:title", content: "CustomerFirst OS" },
      {
        property: "og:description",
        content: "How we think. How we decide. How we deliver. How we learn.",
      },
    ],
  }),
  component: Home,
});

const LOOP = [
  "Customer need",
  "Mission",
  "Decisions",
  "Experiments",
  "Evidence",
  "Outcomes",
  "Patterns",
  "OS improvement",
  "Next mission",
];

const ENTRIES = [
  {
    to: "/how-we-work",
    title: "Understand CustomerFirst",
    body: "Explore the principles and operating model.",
  },
  {
    to: "/missions",
    title: "Start or explore a mission",
    body: "Understand how delivery is progressing.",
  },
  { to: "/decisions", title: "Make a decision", body: "Use the CustomerFirst Decision Framework." },
  {
    to: "/insights",
    title: "See what we're learning",
    body: "Explore patterns, evidence and intelligence.",
  },
] as const;

function Home() {
  const s = portfolioSummary();
  return (
    <Shell>
      <section className="bg-sidebar text-sidebar-foreground">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
            CustomerFirst OS
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-sidebar-foreground/85 md:text-2xl">
            How we think. How we decide. How we deliver. How we learn.
          </p>
          <p className="mt-8 max-w-2xl text-base text-sidebar-foreground/70">
            A living operating system rather than a static playbook. It captures how CustomerFirst
            works, gives teams tools for delivery, and learns from the evidence real missions
            produce.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-2xl font-semibold">Four ways in</h2>
        <div className="mt-8 grid gap-px overflow-hidden rounded-xl border bg-border md:grid-cols-2">
          {ENTRIES.map((e) => (
            <Link
              key={e.to}
              to={e.to}
              className="group bg-card p-8 transition-colors hover:bg-surface"
            >
              <h3 className="text-xl font-semibold group-hover:underline">{e.title}</h3>
              <p className="mt-2 text-muted-foreground">{e.body}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-2xl font-semibold">The loop</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Every mission feeds the operating system, and the operating system makes the next
            mission better.
          </p>
          <ol className="mt-8 flex flex-wrap items-center gap-2">
            {LOOP.map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                <span className="rounded-md border bg-card px-3 py-2 text-sm font-medium">
                  {step}
                </span>
                {i < LOOP.length - 1 && (
                  <span aria-hidden className="text-muted-foreground">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-2xl font-semibold">CustomerFirst right now</h2>
        <dl className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Active missions" value={String(s.activeMissions)} />
          <Stat label="Invested to date" value={gbp(s.investment)} />
          <Stat label="Realised value — Realised" value={gbp(s.value.realised)} />
          <Stat label="Potential value — Modelled or assumed" value={gbp(s.value.potential)} />
        </dl>
        <p className="mt-6 text-sm text-muted-foreground">
          Potential value is never counted as realised value. See{" "}
          <Link to="/portfolio" className="underline">
            the portfolio view
          </Link>{" "}
          for value by evidence state.
        </p>
      </section>
    </Shell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-sans text-4xl font-bold tracking-tight">{value}</dd>
    </div>
  );
}
