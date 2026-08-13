"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import type { FollowThroughStage } from "@/lib/website-metrics/follow-through";
import type { MetricBreakdown, WebsiteMetricsSummary } from "@/lib/website-metrics/summary";

const tokenKey = "reflexion:metrics-dashboard-token:v1";

const sourceLabels: Record<string, string> = {
  vivocity_brochure: "VivoCity brochure",
  vivocity_backdrop_qr: "Backdrop QR",
  vivocity_easel_qr: "Easel QR",
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

const followThroughLabels: Record<FollowThroughStage, string> = {
  contacted: "Contacted",
  replied: "Replied",
  call_taken: "Suitability call taken",
  pilot_qualified: "Qualified for pilot",
  proceeded: "Proceeded",
  closed_no_progression: "Closed without progression",
};

const followUpLabels: Record<string, string> = {
  pilot: "Suitability call / home pilot",
  orders: "Contact when orders open",
  availability: "Availability updates",
  progress: "Concept progress updates",
  none: "No follow-up",
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
  const [selectedLeadId, setSelectedLeadId] = useState("");
  const [selectedStage, setSelectedStage] = useState<FollowThroughStage>("contacted");
  const [updateStatus, setUpdateStatus] = useState("");
  const [updating, setUpdating] = useState(false);

  async function requestSummary() {
    const response = await fetch("/api/website-metrics", { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
    const result = await response.json() as WebsiteMetricsSummary | { error?: string };
    if (!response.ok) throw new Error("error" in result ? result.error : "Metrics could not be loaded.");
    return result as WebsiteMetricsSummary;
  }

  async function loadMetrics(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    if (!token || loading) return;
    setLoading(true);
    setError("");
    try {
      window.sessionStorage.setItem(tokenKey, token);
      setSummary(await requestSummary());
    } catch (loadError) {
      setSummary(null);
      setError(loadError instanceof Error ? loadError.message : "Metrics could not be loaded.");
    } finally {
      setLoading(false);
    }
  }

  async function updateFollowThrough(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedLeadId || updating) return;
    setUpdating(true);
    setUpdateStatus("");
    try {
      const response = await fetch("/api/website-metrics", {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ submissionId: selectedLeadId, stage: selectedStage }),
      });
      const result = await response.json() as { ok?: boolean; error?: string };
      if (!response.ok) throw new Error(result.error ?? "Follow-through could not be recorded.");
      setSummary(await requestSummary());
      setUpdateStatus(`${followThroughLabels[selectedStage]} recorded.`);
    } catch (updateError) {
      setUpdateStatus(updateError instanceof Error ? updateError.message : "Follow-through could not be recorded.");
    } finally {
      setUpdating(false);
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

  const followThroughRows = summary ? [
    ["Contacted", summary.followThrough.contacted],
    ["Replied", summary.followThrough.replied],
    ["Suitability call taken", summary.followThrough.callTaken],
    ["Qualified for pilot", summary.followThrough.pilotQualified],
    ["Proceeded", summary.followThrough.proceeded],
    ["Closed without progression", summary.followThrough.closedNoProgression],
  ] as const : [];

  return <main className="metrics-dashboard">
    <header className="metrics-dashboard__header">
      <Link href="/" className="metrics-dashboard__brand">Reflexion</Link>
      <div><h1>Website metrics</h1><p>Pilot interest, contact interactions and commercial-intent evidence from <code>ref.WebsiteMetrics</code>.</p></div>
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
        <div><span>Commercial starts</span><strong>{summary.funnel.starts}</strong><small>Get Reflexion attempts</small></div>
        <div><span>Pilot registrations</span><strong>{summary.pilot.submissions}</strong><small>{summary.pilot.starts} form starts</small></div>
        <div><span>Contact messages</span><strong>{summary.contact.submissions}</strong><small>{summary.contact.starts} form starts</small></div>
        <p>Updated {new Date(summary.generatedAt).toLocaleString("en-SG")}</p>
      </section>

      <Breakdown title="Traffic source" items={summary.trafficSources} labels={sourceLabels}/>

      <section className="metrics-funnel">
        <h2>Funnel rates</h2>
        <div className="metrics-funnel__head"><span>Metric</span><span>Reached</span><span>Eligible</span><span>Rate</span></div>
        {funnelRows.map(([label, metric]) => <div className="metrics-funnel__row" key={label}><strong>{label}</strong><span>{metric.count}</span><span>{metric.denominator}</span><b>{metric.rate === null ? "—" : `${metric.rate}%`}</b></div>)}
      </section>

      <section className="metrics-dropoff">
        <div className="metrics-section-heading"><div><p>Metric 14</p><h2>Drop-off by stage</h2></div><p>A drop-off is a funnel attempt that entered a stage but did not advance to the next recorded stage.</p></div>
        <div className="metrics-dropoff__head"><span>Stage entered</span><span>Entered</span><span>Advanced</span><span>Dropped</span><span>Drop-off</span></div>
        {summary.dropOffStages.map((stage) => <div className="metrics-dropoff__row" key={stage.key}>
          <strong>{stage.label}</strong><span>{stage.entered}</span><span>{stage.advanced}</span><span>{stage.dropped}</span><b>{stage.dropOffRate === null ? "—" : `${stage.dropOffRate}%`}</b>
        </div>)}
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

      <section className="metrics-followthrough">
        <div className="metrics-section-heading"><div><p>Metric 15</p><h2>Follow-through after the website</h2></div><p>Denominator: {summary.followThrough.leadsGenerated} completed Get Reflexion {summary.followThrough.leadsGenerated === 1 ? "lead" : "leads"}. Outcomes are recorded by the team after contact.</p></div>
        <div className="metrics-followthrough__grid">
          <div className="metrics-followthrough__rates">
            <div className="metrics-funnel__head"><span>Outcome</span><span>Reached</span><span>Leads</span><span>Rate</span></div>
            {followThroughRows.map(([label, metric]) => <div className="metrics-funnel__row" key={label}><strong>{label}</strong><span>{metric.count}</span><span>{metric.denominator}</span><b>{metric.rate === null ? "—" : `${metric.rate}%`}</b></div>)}
          </div>
          <form className="metrics-followthrough__update" onSubmit={updateFollowThrough}>
            <h3>Record a lead outcome</h3>
            <p>Select a recent submission and add the latest verified milestone. Contact details remain in <code>WebsiteForms</code> and are not shown here.</p>
            <label htmlFor="follow-through-lead">Lead submission</label>
            <select id="follow-through-lead" value={selectedLeadId} onChange={(event) => setSelectedLeadId(event.target.value)} required>
              <option value="">Select a lead</option>
              {summary.recentLeads.map((lead) => <option key={lead.id} value={lead.id}>
                {lead.productName} · {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString("en-SG") : "Unknown date"} · …{lead.id.slice(-6)}
              </option>)}
            </select>
            <label htmlFor="follow-through-stage">Verified milestone</label>
            <select id="follow-through-stage" value={selectedStage} onChange={(event) => setSelectedStage(event.target.value as FollowThroughStage)}>
              {Object.entries(followThroughLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
            <button type="submit" disabled={!selectedLeadId || updating}>{updating ? "Recording…" : "Record outcome"}</button>
            {updateStatus ? <p className="metrics-followthrough__status" role="status">{updateStatus}</p> : null}
          </form>
        </div>
        <div className="metrics-leads">
          <h3>Recent lead status</h3>
          {summary.recentLeads.length ? <div className="metrics-leads__table">
            <div className="metrics-leads__head"><span>Submission</span><span>Product</span><span>Requested next step</span><span>Latest outcome</span></div>
            {summary.recentLeads.map((lead) => <div className="metrics-leads__row" key={lead.id}>
              <span><code>…{lead.id.slice(-8)}</code><small>{lead.createdAt ? new Date(lead.createdAt).toLocaleString("en-SG") : "Date unavailable"}</small></span>
              <strong>{productLabels[lead.productId] ?? lead.productName}</strong>
              <span>{lead.requestedFollowUp ? followUpLabels[lead.requestedFollowUp] ?? lead.requestedFollowUp : "Not recorded"}</span>
              <b>{lead.currentStage ? followThroughLabels[lead.currentStage as FollowThroughStage] ?? lead.currentStage : "Awaiting contact"}</b>
            </div>)}
          </div> : <p className="metrics-empty">No completed Get Reflexion leads yet.</p>}
        </div>
      </section>
    </div> : null}
  </main>;
}
