import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Shell, Tag } from "@/components/Shell";
import { Markdown } from "@/components/Markdown";
import { getDoc, getDocById } from "@/lib/content";
import { dataset } from "@/data/seed";

export const Route = createFileRoute("/how-we-work/$")({
  loader: ({ params }) => {
    const doc = getDoc(params._splat ?? "");
    if (!doc) throw notFound();
    return { doc };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Guidance unavailable — CustomerFirst OS" }, { name: "robots", content: "noindex" }] };
    const { doc } = loaderData;
    return {
      meta: [
        { title: `${doc.title} — CustomerFirst OS` },
        { name: "description", content: doc.description },
        { property: "og:title", content: `${doc.title} — CustomerFirst OS` },
        { property: "og:description", content: doc.description },
      ],
    };
  },
  errorComponent: () => <Shell><div className="mx-auto max-w-3xl px-6 py-24"><h1 className="text-2xl font-semibold">This guidance didn't load</h1></div></Shell>,
  notFoundComponent: () => (
    <Shell>
      <div className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="text-2xl font-semibold">Guidance not found</h1>
        <Link to="/how-we-work" className="mt-4 inline-block underline">Back to How we work</Link>
      </div>
    </Shell>
  ),
  component: DocPage,
});

function DocPage() {
  const { doc } = Route.useLoaderData();
  const related = (doc.related ?? []).map(getDocById).filter(Boolean);
  const missions = dataset.missions.filter((m) => m.osReferences.includes(doc.id));

  return (
    <Shell>
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <article>
          <Link to="/how-we-work" className="text-sm text-muted-foreground underline">← How we work</Link>
          <div className="mt-4 flex flex-wrap gap-2">
            <Tag>{doc.type}</Tag>
            {doc.maturity && <Tag tone="accent">{doc.maturity}</Tag>}
            {doc.status && <Tag>{doc.status}</Tag>}
          </div>
          <div className="mt-6">
            <Markdown>{doc.body}</Markdown>
          </div>
        </article>
        <aside className="space-y-8 text-sm lg:border-l lg:pl-8">
          <div>
            <h2 className="font-semibold">About this page</h2>
            <dl className="mt-3 space-y-1 text-muted-foreground">
              <div><dt className="inline font-medium text-foreground">ID: </dt><dd className="inline font-mono">{doc.id}</dd></div>
              <div><dt className="inline font-medium text-foreground">Owner: </dt><dd className="inline">{doc.owner?.profession}</dd></div>
              <div><dt className="inline font-medium text-foreground">Version: </dt><dd className="inline">{String(doc.version)}</dd></div>
              <div><dt className="inline font-medium text-foreground">Last reviewed: </dt><dd className="inline">{doc.reviewed}</dd></div>
            </dl>
            <a href={doc.githubPath} className="mt-4 inline-block rounded-md bg-primary px-3 py-2 text-primary-foreground" rel="noreferrer">
              Edit this page on GitHub
            </a>
          </div>
          {related.length > 0 && (
            <div>
              <h2 className="font-semibold">Related guidance</h2>
              <ul className="mt-3 space-y-2">
                {related.map((r) => (
                  <li key={r!.id}>
                    <Link to="/how-we-work/$" params={{ _splat: r!.slug }} className="underline">{r!.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {missions.length > 0 && (
            <div>
              <h2 className="font-semibold">Missions using this</h2>
              <ul className="mt-3 space-y-2">
                {missions.map((m) => (
                  <li key={m.id}><Link to="/missions/$slug" params={{ slug: m.slug }} className="underline">{m.name}</Link></li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </Shell>
  );
}
