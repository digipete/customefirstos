import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell, PageHeader, Tag } from "@/components/Shell";
import { docsBySection } from "@/lib/content";

export const Route = createFileRoute("/how-we-work/")({
  head: () => ({
    meta: [
      { title: "How we work — CustomerFirst OS" },
      {
        name: "description",
        content:
          "Principles, operating model, delivery lifecycle, practices, governance and templates — all canonical Markdown held in GitHub.",
      },
      { property: "og:title", content: "How we work — CustomerFirst OS" },
      {
        property: "og:description",
        content: "The CustomerFirst operating manual, written in Markdown and reviewed through Git.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HowWeWork,
});

function HowWeWork() {
  const groups = docsBySection();
  return (
    <Shell>
      <PageHeader
        eyebrow="Operating manual"
        title="How we work"
        lede="Canonical guidance lives as Markdown in GitHub. This is a reading experience for it, not its home."
      />
      <div className="mx-auto max-w-7xl px-6 py-12">
        {groups.map((group) => (
          <section key={group.section} className="mb-14">
            <h2 className="text-2xl font-semibold">{group.label}</h2>
            <ul className="mt-6 grid gap-px overflow-hidden rounded-xl border bg-border md:grid-cols-2 lg:grid-cols-3">
              {group.docs.map((doc) => (
                <li key={doc.id} className="bg-card">
                  <Link
                    to="/how-we-work/$"
                    params={{ _splat: doc.slug }}
                    className="block h-full p-6 hover:bg-surface"
                  >
                    <div className="flex items-center gap-2">
                      <Tag>{doc.type}</Tag>
                      {doc.maturity && <Tag tone="accent">{doc.maturity}</Tag>}
                    </div>
                    <h3 className="mt-3 text-lg font-semibold">{doc.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{doc.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Shell>
  );
}
