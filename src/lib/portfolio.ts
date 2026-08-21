import { dataset } from "@/data/seed";
import type { ValueRecord, ValueState } from "@/data/types";

export const POTENTIAL_STATES: ValueState[] = ["Assumed", "Modelled"];
export const EVIDENCED_STATES: ValueState[] = ["Observed", "Evidenced"];

export const gbp = (n: number) =>
  n >= 1_000_000
    ? `£${(n / 1_000_000).toFixed(1)}m`
    : n >= 1_000
      ? `£${Math.round(n / 1000)}k`
      : `£${n}`;

const financial = (records: ValueRecord[]) => records.filter((v) => v.financial);

export function sumFinancialByStates(records: ValueRecord[], states: ValueState[]) {
  return financial(records)
    .filter((v) => states.includes(v.state))
    .reduce((total, v) => total + v.amount, 0);
}

/** Potential value NEVER includes realised or evidenced value, and vice versa. */
export function valueTotals(records: ValueRecord[] = dataset.values) {
  return {
    potential: sumFinancialByStates(records, POTENTIAL_STATES),
    evidenced: sumFinancialByStates(records, EVIDENCED_STATES),
    realised: sumFinancialByStates(records, ["Realised"]),
    nonFinancial: records.filter((v) => !v.financial).length,
  };
}

export function investment(missionId?: string) {
  return dataset.costs
    .filter((c) => !missionId || c.missionId === missionId)
    .reduce((t, c) => t + c.amount, 0);
}

function median(values: number[]) {
  if (values.length === 0) return null;
  const s = [...values].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : Math.round((s[mid - 1] + s[mid]) / 2);
}

export function portfolioSummary() {
  const { missions, experiments, decisions, hypotheses, patterns } = dataset;
  const active = missions.filter((m) => m.status === "Active");
  return {
    activeMissions: active.length,
    missions: missions.length,
    investment: investment(),
    value: valueTotals(),
    experimentsCompleted: experiments.filter((x) => x.result).length,
    experimentsRunning: experiments.filter((x) => !x.result).length,
    decisions: decisions.length,
    decisionsAwaitingReview: decisions.filter((d) => !d.outcome).length,
    hypothesesSupported: hypotheses.filter((h) => h.status === "Supported").length,
    hypothesesDisproved: hypotheses.filter((h) => h.status === "Disproved").length,
    hypothesesInconclusive: hypotheses.filter((h) => h.status === "Inconclusive").length,
    hypothesesTesting: hypotheses.filter((h) => h.status === "Testing").length,
    medianDaysToFirstExperiment: median(
      missions.map((m) => m.flow.daysToFirstExperiment).filter((n): n is number => n != null),
    ),
    medianDaysToEvidence: median(
      missions.map((m) => m.flow.daysToMeaningfulEvidence).filter((n): n is number => n != null),
    ),
    medianDecisionLatency: median(
      decisions.map(
        (d) =>
          (Date.parse(d.decisionDate) - Date.parse(d.raisedDate)) / (1000 * 60 * 60 * 24),
      ),
    ),
    emergingPatterns: patterns.filter((p) => p.status === "Emerging").length,
    provenPatterns: patterns.filter((p) => p.status === "Proven").length,
  };
}

export function missionHealthAverage(scores: number[]) {
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

export function costPerLearning(missionId: string) {
  const exps = dataset.experiments.filter((x) => x.missionId === missionId && x.result);
  const learning = exps.reduce((t, x) => t + x.learningScore, 0);
  const cost = exps.reduce((t, x) => t + x.cost, 0);
  return learning ? Math.round(cost / learning) : null;
}
