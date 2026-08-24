import { describe, it, expect } from "vitest";
import {
  healthRankings,
  flowCadence,
  decisionVelocity,
  insightFunnel,
} from "@/lib/analytics";
import { dataset } from "@/data/seed";

describe("healthRankings", () => {
  it("reports every health dimension separately", () => {
    const rows = healthRankings();
    expect(rows.length).toBe(9);
  });

  it("never produces a single blended health score", () => {
    const rows = healthRankings();
    // Each row carries one dimension; there is no aggregate/overall row.
    expect(rows.every((r) => typeof r.dimension === "string" && r.mean <= 5 && r.mean >= 1)).toBe(
      true,
    );
  });

  it("sorts weakest dimension first", () => {
    const rows = healthRankings();
    for (let i = 1; i < rows.length; i++) {
      expect(rows[i - 1].mean).toBeLessThanOrEqual(rows[i].mean);
    }
  });
});

describe("flowCadence", () => {
  it("reports all five flow milestones", () => {
    const rows = flowCadence();
    expect(rows.map((r) => r.milestone)).toEqual([
      "daysToFirstExperiment",
      "daysToMeaningfulEvidence",
      "daysToSignificantDecision",
      "daysToDeliveredOutcome",
      "daysToRealisedValue",
    ]);
  });

  it("mission counts reconcile to the dataset", () => {
    for (const row of flowCadence()) {
      expect(row.missionsReached + row.missionsNotReached).toBe(dataset.missions.length);
    }
  });

  it("handles null flow values without throwing", () => {
    // One mission with all milestones null — median null, all not reached.
    const rows = flowCadence([
      {
        ...dataset.missions[0],
        flow: {
          daysToFirstExperiment: null,
          daysToMeaningfulEvidence: null,
          daysToSignificantDecision: null,
          daysToDeliveredOutcome: null,
          daysToRealisedValue: null,
        },
      },
    ]);
    for (const row of rows) {
      expect(row.medianDays).toBeNull();
      expect(row.missionsNotReached).toBe(1);
    }
  });
});

describe("decisionVelocity", () => {
  it("groups by domain and counts decisions", () => {
    const rows = decisionVelocity();
    expect(rows.reduce((t, r) => t + r.count, 0)).toBe(dataset.decisions.length);
  });

  it("computes mean latency in days", () => {
    const rows = decisionVelocity();
    for (const r of rows) {
      expect(typeof r.meanDays).toBe("number");
      expect(r.meanDays).toBeGreaterThanOrEqual(0);
    }
  });
});

describe("insightFunnel", () => {
  it("status counts reconcile to total", () => {
    const f = insightFunnel();
    const s = f.byStatus;
    expect(s.Generated + s.Reviewing + s.Accepted + s.Actioned + s.Rejected).toBe(f.total);
  });

  it("acceptance rate matches accepted over total", () => {
    const f = insightFunnel();
    expect(f.acceptanceRate).toBe(
      Math.round((f.accepted / f.total) * 100),
    );
  });

  it("provider breakdown sums to total", () => {
    const f = insightFunnel();
    expect(f.byProvider.reduce((t, p) => t + p.count, 0)).toBe(f.total);
  });
});
