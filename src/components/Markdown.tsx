import { marked } from "marked";
import { useEffect, useId, useRef, useState } from "react";

// Renders canonical Markdown. Mermaid blocks stay text in Git and are rendered
// client-side only, so the Markdown remains the editable source.
function splitMermaid(md: string) {
  const parts: { type: "md" | "mermaid"; content: string }[] = [];
  const re = /```mermaid\n([\s\S]*?)```/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(md))) {
    if (m.index > last) parts.push({ type: "md", content: md.slice(last, m.index) });
    parts.push({ type: "mermaid", content: m[1] });
    last = m.index + m[0].length;
  }
  if (last < md.length) parts.push({ type: "md", content: md.slice(last) });
  return parts;
}

function Mermaid({ chart }: { chart: string }) {
  const id = useId().replace(/[:]/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({ startOnLoad: false, securityLevel: "strict", theme: "neutral" });
        const { svg } = await mermaid.render(`m${id}`, chart);
        if (!cancelled && ref.current) ref.current.innerHTML = svg;
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  if (failed) {
    return (
      <pre aria-label="Diagram source">
        <code>{chart}</code>
      </pre>
    );
  }

  return (
    <figure className="my-6 overflow-x-auto rounded-lg border bg-card p-6">
      <div ref={ref} role="img" aria-label="Diagram described by the surrounding text" />
      <figcaption className="sr-only">{chart}</figcaption>
    </figure>
  );
}

export function Markdown({ children }: { children: string }) {
  const parts = splitMermaid(children);
  return (
    <div className="prose-cf max-w-[68ch]">
      {parts.map((part, i) =>
        part.type === "mermaid" ? (
          <Mermaid key={i} chart={part.content} />
        ) : (
          <div
            key={i}
            // Content is authored in-repo Markdown, not user input.
            dangerouslySetInnerHTML={{
              __html: marked.parse(part.content, { async: false, gfm: true }) as string,
            }}
          />
        ),
      )}
    </div>
  );
}
