"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import type { MetricBreakdown, WebsiteMetricsSummary } from "@/lib/website-metrics/summary";

const tokenKey = "reflexion:metrics-dashboard-token:v1";

const sourceLabels: Record<string, string> = {
  vivocity_brochure: "VivoCity brochure",
  vivocity_backdrop_qr: "Backdrop QR",
  instagram: "Instagram",
  direct: "Direct link",
  referral: "Other referral",
  campaign_other: "Other tagged campaign",
};

const productLabels: Record<string, string> = {
  mirror: "Reflexion Mirror",
  "loved-one-app": "Loved-one App",
  bear: "Reflexion Bear",
  "home-hub": "Home Hub",
  "tabletop-companion": "Tabletop Companion",
};

function Breakdown({ title, items, labels = {} }: { title: string; items: MetricBreakdown; labels?: Record<string, string> }) {
  const total = items.reduce((sum, item) => sum + item.count, 0);
  return <section className="metrics-breakdown">
    <h2>{title}</h2>
    {items.length ? <div className="metrics-breakdown__rows">{items.map((item) => <div key={item.key}>
      <span>{labels[item.key] ?? item.key}</span>
      <strong>{item.count}</strong>
      <small>{total ? `${((item.count / total) * 100).toFixed(1)}%` : "—"}</small>
    </div>)}</div> : <p className="metrics-empty">No recorded data yet.</p>}
  </section>;
}

export function MetricsDashboard() {
  const [token, setToken] = useState(() => typeof window === "undefined" ? "" : window.sessionStorage.getItem(tokenKey) ?? "");
  const [summary, setSummary] = useState<WebsiteMetricsSummary | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadMetrics(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    if (!token || loading) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/website-metrics", { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
      const result = await response.json() as WebsiteMetricsSummary | { error?: string };
      if (!response.ok) throw new Error("error" in result ? result.error : "Metrics could not be loaded.");
      window.sessionStorage.setItem(tokenKey, token);
      setSummary(result as WebsiteMetricsSummary);
    } catch (loadError) {
      setSummary(null);
      setError(loadError instanceof Error ? loadError.message : "Metrics could not be loaded.");
    } finally {
      setLoading(false);
    }
  }

  const funnelRows = summary ? [
    ["Get Reflexion click rate", summary.funnel.getReflexionClicks],
    ["Exact-price reach rate", summary.funnel.exactPriceReach],
    ["Continue-after-price rate", summary.funnel.continuedAfterPrice],
    ["Details completion rate", summary.funnel.detailsCompleted],
    ["Exact-price acceptance rate", summary.funnel.exactPriceAccepted],
    ["Price rejection rate", summary.funnel.exactPriceRejected],
    ["Stronger commitment rate", summary.funnel.strongerCommitment],
    ["Funnel completion rate", summary.funnel.completed],
  ] as const : [];

  return <main className="metrics-dashboard">
    <header className="metrics-dashboard__header">
      <Link href="/" className="metrics-dashboard__brand">Reflexion</Link>
      <div><h1>Website metrics</h1><p>Commercial-intent evidence from <code>ref.WebsiteMetrics</code>.</p></div>
      <form onSubmit={loadMetrics} className="metrics-access">
        <label htmlFor="metrics-token">Access token</label>
        <div><input id="metrics-token" type="password" autoComplete="current-password" value={token} onChange={(event) => setToken(event.target.value)} placeholder="Enter WEBSITE_METRICS_TOKEN"/><button type="submit" disabled={!token || loading}>{loading ? "Loading…" : summary ? "Refresh" : "View metrics"}</button></div>
      </form>
    </header>

    {error ? <p className="metrics-dashboard__error" role="alert">{error}</p> : null}
    {!summary && !error ? <section className="metrics-dashboard__locked"><h2>Private reporting</h2><p>Enter the token configured on the server to view aggregated data. Contact details and addresses are never returned here.</p></section> : null}

    {summary ? <div className="metrics-dashboard__body">
      <section className="metrics-overview">
        <div><span>Unique visitors</span><strong>{summary.uniqueVisitors}</strong><small>Browser/device-based</small></div>
        <div><span>Get Reflexion starts</span><strong>{summary.funnel.starts}</strong><small>Distinct funnel attempts</small></div>
        <p>Updated {new Date(summary.generatedAt).toLocaleString("en-SG")}</p>
      </section>

      <Breakdown title="Traffic source" items={summary.trafficSources} labels={sourceLabels}/>

      <section className="metrics-funnel">
        <h2>Funnel rates</h2>
        <div className="metrics-funnel__head"><span>Metric</span><span>Reached</span><span>Eligible</span><span>Rate</span></div>
        {funnelRows.map(([label, metric]) => <div className="metrics-funnel__row" key={label}><strong>{label}</strong><span>{metric.count}</span><span>{metric.denominator}</span><b>{metric.rate === null ? "—" : `${metric.rate}%`}</b></div>)}
      </section>

      <div className="metrics-preferences">
        <Breakdown title="Form-factor preference" items={summary.preferences.formFactor} labels={productLabels}/>
        <Breakdown title="Parent acceptance preference" items={summary.preferences.parentAcceptance} labels={productLabels}/>
        <Breakdown title="Caregiver purchase preference" items={summary.preferences.caregiverPurchase} labels={productLabels}/>
      </div>

      <div className="metrics-decisions">
        <Breakdown title="Price rejection reasons" items={summary.rejectionReasons}/>
        <Breakdown title="Requested follow-up" items={summary.followUps}/>
      </div>
    </div> : null}
  </main>;
}
