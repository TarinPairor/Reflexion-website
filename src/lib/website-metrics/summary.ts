import { getRefDatabase } from "@/lib/mongodb";

export type MetricBreakdown = { key: string; count: number }[];
export type FunnelMeasure = { count: number; denominator: number; rate: number | null };

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

export async function getWebsiteMetricsSummary(): Promise<WebsiteMetricsSummary> {
  const database = await getRefDatabase();
  const collection = database.collection("WebsiteMetrics");

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
    clicks,
    starts,
    priceReached,
    continued,
    detailsCompleted,
    decisions,
    accepted,
    rejected,
    strongerCommitments,
    completed,
  ] = await Promise.all([
    collection.countDocuments({ documentType: "visitor" }),
    breakdown("visitor", "trafficSource"),
    breakdown("funnel", "formFactorPreference"),
    breakdown("funnel", "parentAcceptancePreference"),
    breakdown("funnel", "caregiverPurchasePreference"),
    breakdown("funnel", "priceRejectionReason"),
    breakdown("funnel", "followUp"),
    exists("getReflexionClickedAt"),
    exists("funnelStartedAt"),
    exists("exactPriceReachedAt"),
    exists("continuedAfterPriceAt"),
    exists("detailsCompletedAt"),
    exists("priceDecisionRecordedAt"),
    collection.countDocuments({ documentType: "funnel", exactPriceAccepted: true }),
    collection.countDocuments({ documentType: "funnel", exactPriceAccepted: false }),
    collection.countDocuments({ documentType: "funnel", exactPriceAccepted: true, strongerCommitment: true }),
    exists("funnelCompletedAt"),
  ]);

  return {
    generatedAt: new Date().toISOString(),
    uniqueVisitors,
    trafficSources,
    preferences: { formFactor, parentAcceptance, caregiverPurchase },
    rejectionReasons,
    followUps,
    funnel: {
      getReflexionClicks: measure(clicks, uniqueVisitors),
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

