"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { recordFunnelMetric } from "@/lib/website-metrics/client";

type ShareStatus = "idle" | "copied" | "ready";

export function PilotThankYou() {
  const referralLink = "https://reflexion.sg/get-reflexion?ref=pilot";
  const [shareStatus, setShareStatus] = useState<ShareStatus>("idle");

  const whatsappLink = useMemo(() => {
    const message = `Hi! I came across Reflexion, a new project exploring whether everyday conversations could help identify subtle changes in memory, speech and thinking to detect dementia earlier.

They’re currently inviting people to join their pilot and try Reflexion with themselves or a loved one, while helping shape how it develops.

Thought you might be interested, or know someone who would be!

Join here: ${referralLink}`;
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  }, [referralLink]);

  async function copyReferralLink() {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(referralLink);
      setShareStatus("copied");
      recordFunnelMetric({ event: "pilot_referral_shared", method: "copy" });
    } catch {
      setShareStatus("ready");
    }
  }

  function shareOnWhatsApp() {
    setShareStatus("idle");
    recordFunnelMetric({ event: "pilot_referral_shared", method: "whatsapp" });
  }

  return <main className="pilot-thank-you" id="main">
    <section className="pilot-thank-you__intro" aria-labelledby="pilot-thank-you-title">
      <span className="pilot-thank-you__mark" aria-hidden="true"><Icon name="check" width={24} height={24}/></span>
      <p className="pilot-hero__label">Reflexion home pilot</p>
      <h1 id="pilot-thank-you-title">Thank you for joining us!</h1>
      <p>We’ve received your interest in the Reflexion pilot.</p>
      <p>Our team will review your submission and get in touch with more information soon.</p>
    </section>

    <section className="pilot-referral" aria-labelledby="pilot-referral-title">
      <div className="pilot-referral__copy">
        <p className="pilot-hero__label">Pass it on</p>
        <h2 id="pilot-referral-title">Know someone who might be interested too?</h2>
        <p><strong>Help us reach more individuals and families who want to shape the future of Reflexion.</strong></p>
        <p>Sharing is optional and does not affect pilot consideration.</p>
      </div>
      <div className="pilot-referral__actions">
        <a className="pilot-share-button pilot-share-button--whatsapp" href={whatsappLink} target="_blank" rel="noreferrer" onClick={shareOnWhatsApp}>Share Reflexion<Icon name="arrow" width={18} height={18}/></a>
        <div className="pilot-copy-link">
          <label htmlFor="pilot-referral-link">Referral link</label>
          <div className="pilot-copy-link__row"><input id="pilot-referral-link" type="text" readOnly value={referralLink} onFocus={(event) => event.currentTarget.select()}/><button type="button" onClick={copyReferralLink}>{shareStatus === "copied" ? "Copied" : "Copy"}</button></div>
          {shareStatus === "ready" ? <small role="status">Select the link above to copy it.</small> : null}
          {shareStatus === "copied" ? <small role="status">Link copied.</small> : null}
        </div>
      </div>
    </section>
  </main>;
}
