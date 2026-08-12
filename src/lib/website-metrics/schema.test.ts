import { describe, expect, it } from "vitest";
import { websiteMetricSchema } from "./schema";
import { followThroughUpdateSchema } from "./follow-through";
import { buildDropOffStages } from "./summary";

const base = {
  visitorId: "cb8a7bb6-cf2d-49f9-a580-b882ab2224cc",
  funnelSessionId: "9f1820ad-d4f4-4a40-a88a-4d7ae85ee36d",
  path: "/get-reflexion",
  attribution: {
    trafficSource: "direct" as const,
    utmSource: null,
    utmMedium: null,
    utmCampaign: null,
    utmContent: null,
  },
};

describe("websiteMetricSchema", () => {
  it("accepts the three distinct pre-price preferences", () => {
    expect(websiteMetricSchema.safeParse({
      ...base,
      event: "pre_price_preferences",
      productId: "mirror",
      parentAcceptancePreference: "home-hub",
      caregiverPurchasePreference: "loved-one-app",
    }).success).toBe(true);
  });

  it("rejects unsupported product values", () => {
    expect(websiteMetricSchema.safeParse({
      ...base,
      event: "price_viewed",
      productId: "camera",
      mirrorPlan: null,
    }).success).toBe(false);
  });

  it("requires a funnel session for funnel events", () => {
    const withoutSession = { visitorId: base.visitorId, path: base.path };
    expect(websiteMetricSchema.safeParse({ ...withoutSession, event: "funnel_completed" }).success).toBe(false);
  });

  it("accepts an anonymous site visit without a funnel session", () => {
    expect(websiteMetricSchema.safeParse({
      visitorId: base.visitorId,
      path: "/",
      event: "site_visit",
      referrerHost: null,
      attribution: base.attribution,
    }).success).toBe(true);
  });

  it("accepts the distinct VivoCity easel attribution", () => {
    expect(websiteMetricSchema.safeParse({
      visitorId: base.visitorId,
      path: "/?utm_source=vivocity&utm_medium=easel_qr&utm_campaign=launch",
      event: "site_visit",
      referrerHost: null,
      attribution: {
        ...base.attribution,
        trafficSource: "vivocity_easel_qr",
        utmSource: "vivocity",
        utmMedium: "easel_qr",
        utmCampaign: "launch",
      },
    }).success).toBe(true);
  });
});

describe("follow-through reporting", () => {
  it("accepts a supported milestone for a WebsiteForms submission", () => {
    expect(followThroughUpdateSchema.safeParse({
      submissionId: "64b7abdecf2160b649ab6085",
      stage: "pilot_qualified",
    }).success).toBe(true);
  });

  it("rejects arbitrary statuses", () => {
    expect(followThroughUpdateSchema.safeParse({
      submissionId: "64b7abdecf2160b649ab6085",
      stage: "sold",
    }).success).toBe(false);
  });

  it("calculates drop-off at each visible funnel stage", () => {
    expect(buildDropOffStages({ starts: 100, priceReached: 80, continued: 50, detailsCompleted: 40, decisions: 30, completed: 24 }))
      .toEqual([
        { key: "product_choice", label: "Product choice", entered: 100, advanced: 80, dropped: 20, dropOffRate: 20 },
        { key: "price", label: "Exact price", entered: 80, advanced: 50, dropped: 30, dropOffRate: 37.5 },
        { key: "details", label: "Personal details", entered: 50, advanced: 40, dropped: 10, dropOffRate: 20 },
        { key: "price_confirmation", label: "Price confirmation", entered: 40, advanced: 30, dropped: 10, dropOffRate: 25 },
        { key: "next_step", label: "Next step", entered: 30, advanced: 24, dropped: 6, dropOffRate: 20 },
      ]);
  });
});
