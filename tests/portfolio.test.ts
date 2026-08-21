import { describe, expect, it } from "vitest";
import { dataset } from "../src/data/seed";
import {
  EVIDENCED_STATES,
  POTENTIAL_STATES,
  gbp,
  portfolioSummary,
  valueTotals,
} from "../src/lib/portfolio";

describe("transformation economics", () => {
  it("never counts potential value as realised value", () => {
    const totals = valueTotals();
    const realisedRecords = dataset.values.filter((v) => v.financial && v.state === "Realised");
    const potentialRecords = dataset.values.filter(
      (v) => v.financial && POTENTIAL_STATES.includes(v.state),
    );
    expect(realisedRecords.some((r) => potentialRecords.includes(r))).toBe(false);
    expect(totals.realised).toBe(realisedRecords.reduce((t, r) => t + r.amount, 0));
    expect(totals.potential).toBe(potentialRecords.reduce((t, r) => t + r.amount, 0));
  });

  it("keeps the four value buckets mutually exclusive", () => {
    const states = [...POTENTIAL_STATES, ...EVIDENCED_STATES, "Realised"];
    expect(new Set(states).size).toBe(states.length);
  });

  it("sums every financial record exactly once across buckets", () => {
    const totals = valueTotals();
    const all = dataset.values
      .filter((v) => v.financial)
      .reduce((t, v) => t + v.amount, 0);
    expect(totals.potential + totals.evidenced + totals.realised).toBe(all);
  });

  it("reports a coherent portfolio summary", () => {
    const s = portfolioSummary();
    expect(s.activeMissions).toBeGreaterThan(0);
    expect(s.activeMissions).toBeLessThanOrEqual(s.missions);
    expect(s.investment).toBeGreaterThan(0);
  });

  it("formats currency for humans", () => {
    expect(gbp(950)).toBe("£950");
    expect(gbp(42_000)).toBe("£42k");
    expect(gbp(2_400_000)).toBe("£2.4m");
  });
});
