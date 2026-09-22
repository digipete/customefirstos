import { marked } from "marked";
import { useEffect, useId, useRef, useState } from "react";
import { ArchitectureDiagram, type ArchitectureDiagramKind } from "./ArchitectureDiagram";
import { GuidanceBlock, type GuidanceTone } from "./GuidanceBlock";

// Renders canonical Markdown. Mermaid blocks stay text in Git and are rendered
// client-side only, so the Markdown remains the editable source.
type MarkdownPart =
  | { type: "md" | "mermaid"; content: string }
  | { type: "architecture-diagram"; content: ArchitectureDiagramKind }
  | { type: "guidance"; content: string; tone: GuidanceTone };

function splitEnhancedBlocks(md: string) {
  const parts: MarkdownPart[] = [];
  const re = /```(mermaid|architecture-diagram|guidance)(?:\s+([^\n]+))?\n([\s\S]*?)```/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(md))) {
    if (m.index > last) parts.push({ type: "md", content: md.slice(last, m.index) });
    const type = m[1];
    const option = (m[2] ?? "").trim();
    const content = m[3] ?? "";
    if (type === "mermaid") parts.push({ type: "mermaid", content });
    if (type === "architecture-diagram") {
      parts.push({ type: "architecture-diagram", content: option as ArchitectureDiagramKind });
    }
    if (type === "guidance") {
      parts.push({ type: "guidance", tone: option as GuidanceTone, content });
    }
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
  const parts = splitEnhancedBlocks(children);
  return (
    <div className="prose-cf max-w-[68ch]">
      {parts.map((part, i) => {
        if (part.type === "mermaid") return <Mermaid key={i} chart={part.content} />;
        if (part.type === "architecture-diagram") {
          return <ArchitectureDiagram key={i} kind={part.content} />;
        }
        if (part.type === "guidance") {
          return (
            <GuidanceBlock key={i} tone={part.tone}>
              <div
                dangerouslySetInnerHTML={{
                  __html: marked.parse(part.content, { async: false, gfm: true }) as string,
                }}
              />
            </GuidanceBlock>
          );
        }
        return (
          <div
            key={i}
            // Content is authored in-repo Markdown, not user input.
            dangerouslySetInnerHTML={{
              __html: marked.parse(part.content, { async: false, gfm: true }) as string,
            }}
          />
        );
      })}
    </div>
  );
}
