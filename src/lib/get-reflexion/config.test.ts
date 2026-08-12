import { describe, expect, it } from "vitest";
import { getExactPrice, getProduct, productOptions } from "./config";

describe("Get Reflexion commercial-intent configuration", () => {
  it("keeps all five form factors analytically separate", () => {
    expect(productOptions.map((product) => product.id)).toEqual([
      "mirror",
      "loved-one-app",
      "bear",
      "home-hub",
      "tabletop-companion",
    ]);
  });

  it("keeps Mirror A and Mirror B pricing separate", () => {
    expect(getExactPrice("mirror", "a")).toBe("S$799 once + S$39.90/month");
    expect(getExactPrice("mirror", "b")).toBe("S$74.90/month for 24 months, then S$39.90/month");
  });

  it("keeps form maturity visible instead of presenting every direction as equally ready", () => {
    expect(getProduct("loved-one-app").maturity).toBe("Functional alternative · QA gate");
    expect(getProduct("bear").maturity).toBe("Prototype");
    expect(getProduct("home-hub").maturity).toBe("Concept");
    expect(getProduct("tabletop-companion").maturity).toBe("Future concept");
  });
});
