import { describe, expect, it } from "vitest";
import { canonicalContent, getHomeSection } from "./source";
import { getHomeContent } from "../../i18n/content";

describe("canonical content access", () => {
  it("validates the canonical handoff source", () => {
    expect(canonicalContent.meta.status).toBe("CANONICAL_CONTENT_SOURCE");
    expect(canonicalContent.pages.home.sections).toHaveLength(8);
  });

  it("preserves product maturity distinctions", () => {
    expect(canonicalContent.products.mirror.maturity_label).toBe("Flagship");
    expect(canonicalContent.products.loved_one_app.maturity_status).toBe("QA_GATE");
    expect(canonicalContent.products.bear.maturity_label).toBe("Coming soon");
    expect(canonicalContent.products.home_hub.maturity_label).toBe("Coming soon");
    expect(canonicalContent.products.tabletop_companion.maturity_label).toBe("Coming soon");
  });

  it("fails closed for unknown Home sections", () => {
    expect(() => getHomeSection("home.not_real")).toThrow(/missing/);
  });

  it("keeps prohibited product language out of rendered working copy", () => {
    const publicCopy = JSON.stringify([getHomeContent("en"), getHomeContent("zh")]);
    for (const prohibited of ["Aria", "Medication taken", "early dementia detection", "cognitive screening", "guaranteed safety"]) {
      expect(publicCopy).not.toContain(prohibited);
    }
  });
});
