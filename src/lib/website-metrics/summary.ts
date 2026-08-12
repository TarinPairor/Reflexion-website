import { getRefDatabase } from "@/lib/mongodb";

export type MetricBreakdown = { key: string; count: number }[];
export type FunnelMeasure = { count: number; denominator: number; rate: number | null };
export type DropOffStage = {
  key: "product_choice" | "price" | "details" | "price_confirmation" | "next_step";
  label: string;
  entered: number;
  advanced: number;
  dropped: number;
  dropOffRate: number | null;
};
export type FollowThroughLead = {
  id: string;
  createdAt: string;
  productId: string;
  productName: string;
  requestedFollowUp: string | null;
  currentStage: string | null;
};

export type WebsiteMetricsSummary = {
  generatedAt: string;
  uniqueVisitors: number;
  trafficSources: MetricBreakdown;
  preferences: {
    formFactor: MetricBreakdown;
    parentAcceptance: MetricBreakdown;
    caregiverPurchase: MetricBreakdown;
  };
  rejectionReasons: MetricBreakdown;
  followUps: MetricBreakdown;
  dropOffStages: DropOffStage[];
  followThrough: {
    leadsGenerated: number;
    contacted: FunnelMeasure;
    replied: FunnelMeasure;
    callTaken: FunnelMeasure;
    pilotQualified: FunnelMeasure;
    proceeded: FunnelMeasure;
    closedNoProgression: FunnelMeasure;
  };
  recentLeads: FollowThroughLead[];
  funnel: {
    getReflexionClicks: FunnelMeasure;
    starts: number;
    exactPriceReach: FunnelMeasure;
    continuedAfterPrice: FunnelMeasure;
    detailsCompleted: FunnelMeasure;
    exactPriceAccepted: FunnelMeasure;
    exactPriceRejected: FunnelMeasure;
    strongerCommitment: FunnelMeasure;
    completed: FunnelMeasure;
  };
};

function measure(count: number, denominator: number): FunnelMeasure {
  return { count, denominator, rate: denominator ? Number(((count / denominator) * 100).toFixed(1)) : null };
}

export function buildDropOffStages(counts: {
  starts: number;
  priceReached: number;
  continued: number;
  detailsCompleted: number;
  decisions: number;
  completed: number;
}): DropOffStage[] {
  const stage = (key: DropOffStage["key"], label: string, entered: number, advanced: number): DropOffStage => {
    const dropped = Math.max(0, entered - advanced);
    return { key, label, entered, advanced, dropped, dropOffRate: entered ? Number(((dropped / entered) * 100).toFixed(1)) : null };
  };

  return [
    stage("product_choice", "Product choice", counts.starts, counts.priceReached),
    stage("price", "Exact price", counts.priceReached, counts.continued),
    stage("details", "Personal details", counts.continued, counts.detailsCompleted),
    stage("price_confirmation", "Price confirmation", counts.detailsCompleted, counts.decisions),
    stage("next_step", "Next step", counts.decisions, counts.completed),
  ];
}

export async function getWebsiteMetricsSummary(): Promise<WebsiteMetricsSummary> {
  const database = await getRefDatabase();
  const collection = database.collection("WebsiteMetrics");
  const forms = database.collection("WebsiteForms");

  const breakdown = async (documentType: "visitor" | "funnel", field: string): Promise<MetricBreakdown> => collection.aggregate<{ _id: string; count: number }>([
    { $match: { documentType, [field]: { $exists: true, $ne: null } } },
    { $group: { _id: `$${field}`, count: { $sum: 1 } } },
    { $sort: { count: -1, _id: 1 } },
  ]).map((item) => ({ key: item._id, count: item.count })).toArray();

  const exists = (field: string) => collection.countDocuments({ documentType: "funnel", [field]: { $exists: true } });

  const [
    uniqueVisitors,
    trafficSources,
    formFactor,
    parentAcceptance,
    caregiverPurchase,
    rejectionReasons,
    followUps,
    clickVisitors,
    starts,
    priceReached,
    continued,
    detailsCompleted,
    decisions,
    accepted,
    rejected,
    strongerCommitments,
    completed,
    leadsGenerated,
    contacted,
    replied,
    callTaken,
    pilotQualified,
    proceeded,
    closedNoProgression,
    recentLeadDocuments,
  ] = await Promise.all([
    collection.countDocuments({ documentType: "visitor" }),
    breakdown("visitor", "trafficSource"),
    breakdown("funnel", "formFactorPreference"),
    breakdown("funnel", "parentAcceptancePreference"),
    breakdown("funnel", "caregiverPurchasePreference"),
    breakdown("funnel", "priceRejectionReason"),
    breakdown("funnel", "followUp"),
    collection.distinct("visitorId", { documentType: "funnel", getReflexionClickedAt: { $exists: true } }),
    exists("funnelStartedAt"),
    exists("exactPriceReachedAt"),
    exists("continuedAfterPriceAt"),
    exists("detailsCompletedAt"),
    exists("priceDecisionRecordedAt"),
    collection.countDocuments({ documentType: "funnel", exactPriceAccepted: true }),
    collection.countDocuments({ documentType: "funnel", exactPriceAccepted: false }),
    collection.countDocuments({ documentType: "funnel", exactPriceAccepted: true, strongerCommitment: true }),
    exists("funnelCompletedAt"),
    forms.countDocuments({ form: "get-reflexion" }),
    forms.countDocuments({ form: "get-reflexion", "followThrough.milestones.contactedAt": { $exists: true } }),
    forms.countDocuments({ form: "get-reflexion", "followThrough.milestones.repliedAt": { $exists: true } }),
    forms.countDocuments({ form: "get-reflexion", "followThrough.milestones.callTakenAt": { $exists: true } }),
    forms.countDocuments({ form: "get-reflexion", "followThrough.milestones.pilotQualifiedAt": { $exists: true } }),
    forms.countDocuments({ form: "get-reflexion", "followThrough.milestones.proceededAt": { $exists: true } }),
    forms.countDocuments({ form: "get-reflexion", "followThrough.milestones.closedNoProgressionAt": { $exists: true } }),
    forms.find(
      { form: "get-reflexion" },
      { projection: { createdAt: 1, product: 1, decision: 1, followThrough: 1 } },
    ).sort({ createdAt: -1 }).limit(50).toArray(),
  ]);

  const recentLeads: FollowThroughLead[] = recentLeadDocuments.map((document) => {
    const product = document.product as { id?: string; name?: string } | undefined;
    const decision = document.decision as { followUp?: string | null } | undefined;
    const followThrough = document.followThrough as { currentStage?: string | null } | undefined;
    const createdAt = document.createdAt instanceof Date ? document.createdAt : new Date(String(document.createdAt));
    return {
      id: document._id.toHexString(),
      createdAt: Number.isNaN(createdAt.valueOf()) ? "" : createdAt.toISOString(),
      productId: product?.id ?? "unknown",
      productName: product?.name ?? "Unknown product",
      requestedFollowUp: decision?.followUp ?? null,
      currentStage: followThrough?.currentStage ?? null,
    };
  });

  return {
    generatedAt: new Date().toISOString(),
    uniqueVisitors,
    trafficSources,
    preferences: { formFactor, parentAcceptance, caregiverPurchase },
    rejectionReasons,
    followUps,
    dropOffStages: buildDropOffStages({ starts, priceReached, continued, detailsCompleted, decisions, completed }),
    followThrough: {
      leadsGenerated,
      contacted: measure(contacted, leadsGenerated),
      replied: measure(replied, leadsGenerated),
      callTaken: measure(callTaken, leadsGenerated),
      pilotQualified: measure(pilotQualified, leadsGenerated),
      proceeded: measure(proceeded, leadsGenerated),
      closedNoProgression: measure(closedNoProgression, leadsGenerated),
    },
    recentLeads,
    funnel: {
      getReflexionClicks: measure(clickVisitors.length, uniqueVisitors),
      starts,
      exactPriceReach: measure(priceReached, starts),
      continuedAfterPrice: measure(continued, priceReached),
      detailsCompleted: measure(detailsCompleted, continued),
      exactPriceAccepted: measure(accepted, decisions),
      exactPriceRejected: measure(rejected, decisions),
      strongerCommitment: measure(strongerCommitments, accepted),
      completed: measure(completed, starts),
    },
  };
}
