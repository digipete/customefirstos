// Pure portfolio analytics. Mirrors the style of src/lib/portfolio.ts — no React, no
// framework, deterministic over the seed dataset. Health is reported per dimension and
// never blended into a single score.

import { dataset } from "@/data/seed";
import type { Dataset, HealthDimension, Insight, Mission, Decision } from "@/data/types";

const HEALTH_DIMENSIONS: HealthDimension[] = [
  "Outcome clarity",
  "Evidence strength",
  "Team confidence",
  "Stakeholder alignment",
  "Decision velocity",
  "Delivery flow",
  "Risk visibility",
  "Value confidence",
  "Operational readiness",
];

function median(values: number[]) {
  if (values.length === 0) return null;
  const s = [...values].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? (s[mid] ?? null) : Math.round(((s[mid - 1] ?? 0) + (s[mid] ?? 0)) / 2);
}

/** Mean across missions for each health dimension, plus how many missions score it weakly (<=2). */
export function healthRankings(ms: Mission[] = dataset.missions) {
  return HEALTH_DIMENSIONS.map((dim) => {
    const scores = ms.map((m) => m.health[dim].score);
    const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
    return {
      dimension: dim,
      mean: Math.round(mean * 10) / 10,
      missionsScored: scores.length,
      weakestCount: scores.filter((s) => s <= 2).length,
    };
  }).sort((a, b) => a.mean - b.mean || b.weakestCount - a.weakestCount);
}

/** Median days per flow milestone across missions, plus how many missions never reached it. */
export function flowCadence(ms: Mission[] = dataset.missions) {
  const keys = [
    "daysToFirstExperiment",
    "daysToMeaningfulEvidence",
    "daysToSignificantDecision",
    "daysToDeliveredOutcome",
    "daysToRealisedValue",
  ] as const;
  return keys.map((key) => {
    const values = ms.map((m) => m.flow[key]).filter((n): n is number => n != null);
    return {
      milestone: key,
      medianDays: median(values),
      missionsReached: values.length,
      missionsNotReached: ms.length - values.length,
    };
  });
}

function latencyDays(d: Decision) {
  return (Date.parse(d.decisionDate) - Date.parse(d.raisedDate)) / (1000 * 60 * 60 * 24);
}

/** Mean + median decision latency grouped by domain, with pending-decision counts. */
export function decisionVelocity(decs: Decision[] = dataset.decisions) {
  const domains = [...new Set(decs.map((d) => d.domain))].sort();
  return domains
    .map((domain) => {
      const inDomain = decs.filter((d) => d.domain === domain);
      const latencies = inDomain.map(latencyDays);
      const mean = latencies.reduce((a, b) => a + b, 0) / Math.max(latencies.length, 1);
      const awaiting = inDomain
        .filter((d) => !d.outcome)
        .sort((a, b) => Date.parse(a.decisionDate) - Date.parse(b.decisionDate))
        .map((d) => ({ question: d.question, decisionDate: d.decisionDate }));
      return {
        domain,
        count: inDomain.length,
        meanDays: Math.round(mean * 10) / 10,
        medianDays: median(latencies),
        awaitingReview: awaiting.length,
        pending: awaiting.slice(0, 3),
      };
    })
    .sort((a, b) => b.awaitingReview - a.awaitingReview || b.meanDays - a.meanDays);
}

/** Insight status funnel plus acceptance rate by provider. */
export function insightFunnel(ins: Insight[] = dataset.insights) {
  const count = (s: Insight["status"]) => ins.filter((i) => i.status === s).length;
  const accepted = ins.filter((i) => i.status === "Accepted" || i.status === "Actioned");
  const providers = [...new Set(ins.map((i) => i.provider))].sort();
  return {
    total: ins.length,
    byStatus: {
      Generated: count("Generated"),
      Reviewing: count("Reviewing"),
      Accepted: count("Accepted"),
      Actioned: count("Actioned"),
      Rejected: count("Rejected"),
    },
    accepted: accepted.length,
    acceptanceRate: ins.length ? Math.round((accepted.length / ins.length) * 100) : 0,
    acceptedWithOsChange: accepted.filter((i) => i.osChangeSuggestion).length,
    byProvider: providers.map((provider) => {
      const p = ins.filter((i) => i.provider === provider);
      const pAccepted = p.filter((i) => i.status === "Accepted" || i.status === "Actioned");
      return {
        provider,
        count: p.length,
        accepted: pAccepted.length,
        acceptanceRate: p.length ? Math.round((pAccepted.length / p.length) * 100) : 0,
      };
    }),
  };
}
