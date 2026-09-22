import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Markdown } from "@/components/Markdown";
import { Shell, Tag } from "@/components/Shell";
import { architectureDocs, getDoc, getDocById } from "@/lib/content";

export const Route = createFileRoute("/technology-architecture/$")({
  loader: ({ params }) => {
    const doc = getDoc(`technology-architecture/${params._splat ?? ""}`);
    if (!doc) throw notFound();
    return { doc };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Architecture guidance unavailable — CustomerFirst OS" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { doc } = loaderData;
    return {
      meta: [
        { title: `${doc.title} — Technology & Architecture — CustomerFirst OS` },
        { name: "description", content: doc.description },
        { property: "og:title", content: `${doc.title} — CustomerFirst OS` },
        { property: "og:description", content: doc.description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ArchitectureNotFound,
  component: ArchitectureDoc,
});

function ArchitectureNotFound() {
  return (
    <Shell>
      <div className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="text-3xl font-semibold">Architecture guidance not found</h1>
        <Link to="/technology-architecture" className="mt-5 inline-block underline">
          Back to Technology & Architecture
        </Link>
      </div>
    </Shell>
  );
}

function DocLink({ id, title }: { id: string; title: string }) {
  const doc = getDocById(id);
  if (!doc) return null;
  if (doc.section === "technology-architecture") {
    return (
      <Link
        to="/technology-architecture/$"
        params={{ _splat: doc.slug.replace("technology-architecture/", "") }}
        className="underline underline-offset-4"
      >
        {title}
      </Link>
    );
  }
  return (
    <Link
      to="/how-we-work/$"
      params={{ _splat: doc.slug }}
      className="underline underline-offset-4"
    >
      {title}
    </Link>
  );
}

function ArchitectureDoc() {
  const { doc } = Route.useLoaderData();
  const docs = architectureDocs();
  const currentIndex = docs.findIndex((item) => item.id === doc.id);
  const previous = currentIndex > 0 ? docs[currentIndex - 1] : undefined;
  const next = currentIndex >= 0 ? docs[currentIndex + 1] : undefined;
  const related = (doc.related ?? []).map(getDocById).filter((item) => item !== undefined);

  return (
    <Shell>
      <div className="mx-auto max-w-7xl px-6 py-10">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link to="/" className="underline underline-offset-4">
            CustomerFirst OS
          </Link>
          <span aria-hidden="true"> / </span>
          <Link to="/technology-architecture" className="underline underline-offset-4">
            Technology & Architecture
          </Link>
          <span aria-hidden="true"> / </span>
          <span>{doc.title}</span>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <article className="min-w-0">
            <div className="flex flex-wrap gap-2">
              <Tag>architecture guidance</Tag>
              {doc.status && <Tag>{doc.status}</Tag>}
            </div>
            <div className="mt-6">
              <Markdown>{doc.body}</Markdown>
            </div>

            <nav
              aria-label="Previous and next architecture guidance"
              className="mt-14 grid gap-4 border-t pt-6 sm:grid-cols-2"
            >
              <div>
                {previous && (
                  <>
                    <span className="block text-xs text-muted-foreground">Previous</span>
                    <Link
                      to="/technology-architecture/$"
                      params={{ _splat: previous.slug.replace("technology-architecture/", "") }}
                      className="mt-1 inline-block font-semibold underline underline-offset-4"
                    >
                      ← {previous.title}
                    </Link>
                  </>
                )}
              </div>
              <div className="sm:text-right">
                {next && (
                  <>
                    <span className="block text-xs text-muted-foreground">Next</span>
                    <Link
                      to="/technology-architecture/$"
                      params={{ _splat: next.slug.replace("technology-architecture/", "") }}
                      className="mt-1 inline-block font-semibold underline underline-offset-4"
                    >
                      {next.title} →
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </article>

          <aside className="space-y-8 text-sm lg:border-l lg:pl-8">
            <section>
              <h2 className="font-semibold">In this section</h2>
              <ul className="mt-3 space-y-2">
                {docs.map((item) => (
                  <li key={item.id}>
                    <Link
                      to="/technology-architecture/$"
                      params={{ _splat: item.slug.replace("technology-architecture/", "") }}
                      aria-current={item.id === doc.id ? "page" : undefined}
                      className={
                        item.id === doc.id ? "font-semibold" : "underline underline-offset-4"
                      }
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
            {related.length > 0 && (
              <section>
                <h2 className="font-semibold">Related guidance</h2>
                <ul className="mt-3 space-y-2">
                  {related.map((item) => (
                    <li key={item.id}>
                      <DocLink id={item.id} title={item.title} />
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <section>
              <h2 className="font-semibold">About this page</h2>
              <p className="mt-3 text-muted-foreground">Last reviewed {doc.reviewed}</p>
              <a
                href={doc.githubPath}
                rel="noreferrer"
                className="mt-4 inline-block bg-primary px-3 py-2 text-primary-foreground"
              >
                Edit this page on GitHub
              </a>
            </section>
          </aside>
        </div>
      </div>
    </Shell>
  );
}
