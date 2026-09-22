export type GuidanceTone = "principle" | "evidence" | "assurance" | "stop-condition" | "team-question";

const LABELS: Record<GuidanceTone, string> = {
  principle: "Principle",
  evidence: "Evidence",
  assurance: "Assurance",
  "stop-condition": "Stop condition",
  "team-question": "Team question",
};

export function GuidanceBlock({ tone, children }: { tone: GuidanceTone; children: React.ReactNode }) {
  return (
    <aside className={`guidance-block guidance-block-${tone}`}>
      <p className="guidance-block-label">{LABELS[tone]}</p>
      <div>{children}</div>
    </aside>
  );
}