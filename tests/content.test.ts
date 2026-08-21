import { describe, expect, it } from "vitest";
// @ts-expect-error - plain ESM script, intentionally framework-free
import { validateContent } from "../scripts/validate-content.mjs";

describe("knowledge layer", () => {
  const { count, errors } = validateContent() as { count: number; errors: string[] };

  it("has no frontmatter, section, id or cross-reference errors", () => {
    expect(errors).toEqual([]);
  });

  it("contains the canonical starter corpus", () => {
    expect(count).toBeGreaterThanOrEqual(40);
  });
});
