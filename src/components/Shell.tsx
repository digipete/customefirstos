import { Link } from "@tanstack/react-router";

export const OS_VERSION = "0.4.2";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/how-we-work", label: "How we work" },
  { to: "/missions", label: "Missions" },
  { to: "/decisions", label: "Decisions" },
  { to: "/experiments", label: "Experiments" },
  { to: "/patterns", label: "Patterns" },
  { to: "/evidence", label: "Evidence" },
  { to: "/insights", label: "Insights" },
  { to: "/portfolio", label: "Portfolio" },
] as const;

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
      >
        Skip to content
      </a>
      <header className="border-b bg-sidebar text-sidebar-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-6 py-4">
          <Link to="/" className="flex items-baseline gap-2">
            <span className="font-sans text-lg font-bold tracking-tight">CustomerFirst</span>
            <span className="rounded bg-accent px-1.5 py-0.5 font-mono text-xs font-semibold text-accent-foreground">
              OS
            </span>
          </Link>
          <nav aria-label="Primary" className="flex flex-1 flex-wrap items-center gap-x-4 gap-y-2">
            {NAV.slice(1).map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm text-sidebar-foreground/80 underline-offset-4 hover:text-sidebar-foreground hover:underline"
                activeProps={{ className: "text-sidebar-foreground font-semibold underline" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/search"
            className="rounded-md border border-sidebar-border px-3 py-1.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent"
          >
            Search
          </Link>
        </div>
      </header>
      <main id="main" className="flex-1">
        {children}
      </main>
      <footer className="border-t bg-surface">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground">
          <p>
            CustomerFirst OS — how we think, how we decide, how we deliver and how we learn.
          </p>
          <p className="font-mono text-xs">
            OS version {OS_VERSION} · knowledge in Markdown on GitHub
          </p>
        </div>
      </footer>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="border-b bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {eyebrow && (
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
        {lede && <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{lede}</p>}
      </div>
    </div>
  );
}

export function Tag({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "accent" | "positive" | "caution" | "danger";
}) {
  const tones: Record<string, string> = {
    neutral: "bg-muted text-muted-foreground",
    accent: "bg-accent text-accent-foreground",
    positive: "bg-positive/15 text-positive",
    caution: "bg-caution/20 text-foreground",
    danger: "bg-destructive/15 text-destructive",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
