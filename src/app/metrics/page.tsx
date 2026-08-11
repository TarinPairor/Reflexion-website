import type { Metadata } from "next";
import { MetricsDashboard } from "@/components/analytics/MetricsDashboard";

export const metadata: Metadata = {
  title: "Website metrics — Reflexion",
  robots: { index: false, follow: false },
};

export default function MetricsPage() {
  return <MetricsDashboard/>;
}

