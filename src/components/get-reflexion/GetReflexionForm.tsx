"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  getExactPrice,
  getProduct,
  mirrorPrices,
  productOptions,
  type MirrorPlan,
  type ProductId,
} from "@/lib/get-reflexion/config";
import { recordFunnelMetric } from "@/lib/website-metrics/client";

type Details = {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  recipient: string;
  recipientOther: string;
  readiness: boolean;
};

const initialDetails: Details = {
  firstName: "",
  lastName: "",
  mobile: "",
  email: "",
  streetAddress: "",
  city: "",
  postalCode: "",
  recipient: "",
  recipientOther: "",
  readiness: false,
};

const stepLabels = ["Choose", "Your Reflexion", "Your details", "Price", "Next step", "Confirmation"];

const choicePresentation = {
  mirror: {
    image: "/reflexion-assets/generated/phase1/get-reflexion-mirror.png",
    alt: "Reflexion Mirror in a warm home setting",
    maturity: getProduct("mirror").maturity,
    description: getProduct("mirror").description,
  },
  "loved-one-app": {
    image: "/reflexion-assets/generated/phase1/get-reflexion-loved-one-app.png",
    alt: "Reflexion Loved-one App showing a morning check-in",
    maturity: getProduct("loved-one-app").maturity,
    description: getProduct("loved-one-app").description,
  },
  bear: {
    image: "/reflexion-assets/generated/phase1/get-reflexion-bear.png",
    alt: "Reflexion Bear companion form",
    maturity: getProduct("bear").maturity,
    description: getProduct("bear").description,
  },
  "home-hub": {
    image: "/reflexion-assets/generated/phase1/get-reflexion-home-hub.png",
    alt: "Reflexion Home Hub",
    maturity: getProduct("home-hub").maturity,
    description: getProduct("home-hub").description,
  },
  "tabletop-companion": {
    image: "/reflexion-assets/generated/phase1/get-reflexion-tabletop-companion.png",
    alt: "Reflexion Tabletop Companion",
    maturity: getProduct("tabletop-companion").maturity,
    description: getProduct("tabletop-companion").description,
  },
} satisfies Record<ProductId, { image: string; alt: string; maturity: string; description: string }>;

type ShareStatus = "idle" | "copied" | "shared" | "ready";
type PreviewStep = 5 | 6;

export function GetReflexionForm({ initialProduct, previewStep }: { initialProduct?: ProductId; previewStep?: PreviewStep }) {
  const isPreview = previewStep !== undefined;
  const previewProduct = initialProduct ?? "mirror";
  const previewFollowUp = previewProduct === "mirror"
    ? "pilot"
    : previewProduct === "loved-one-app"
      ? "availability"
      : "progress";
  const [step, setStep] = useState(previewStep ?? 1);
  const [productId, setProductId] = useState<ProductId>(initialProduct ?? "mirror");
  const [parentAcceptancePreference, setParentAcceptancePreference] = useState<ProductId | "">("");
  const [caregiverPurchasePreference, setCaregiverPurchasePreference] = useState<ProductId | "">("");
  const [mirrorPlan, setMirrorPlan] = useState<MirrorPlan>("a");
  const [details, setDetails] = useState<Details>(initialDetails);
  const [priceDecision, setPriceDecision] = useState<"yes" | "no" | "">(isPreview ? "yes" : "");
  const [followUp, setFollowUp] = useState(isPreview ? previewFollowUp : "");
  const [noReason, setNoReason] = useState("");
  const [noReasonOther, setNoReasonOther] = useState("");
  const [decisionReason, setDecisionReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [shareStatus, setShareStatus] = useState<ShareStatus>("idle");
  const [shareLink, setShareLink] = useState("");

  const product = getProduct(productId);
  const exactPrice = getExactPrice(productId, mirrorPlan);
  const progress = `${Math.round((step / stepLabels.length) * 100)}%`;

  useEffect(() => {
    recordFunnelMetric({ event: "funnel_started" });
  }, []);

  useEffect(() => {
    if (step !== 2) return;
    recordFunnelMetric({ event: "price_viewed", productId, mirrorPlan: productId === "mirror" ? mirrorPlan : null });
  }, [mirrorPlan, productId, step]);

  function advance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step === 1 && parentAcceptancePreference && caregiverPurchasePreference) {
      recordFunnelMetric({ event: "pre_price_preferences", productId, parentAcceptancePreference, caregiverPurchasePreference });
    }
    if (step === 2) recordFunnelMetric({ event: "continued_after_price" });
    if (step === 3) recordFunnelMetric({ event: "details_completed" });
    if (step === 4 && priceDecision) recordFunnelMetric({ event: "price_decision", accepted: priceDecision === "yes" });
    setStep((current) => Math.min(current + 1, stepLabels.length));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    setSubmissionError("");
    setStep((current) => Math.max(current - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updateDetails<Key extends keyof Details>(key: Key, value: Details[Key]) {
    setDetails((current) => ({ ...current, [key]: value }));
  }

  async function shareReflexion() {
    const shareUrl = typeof window !== "undefined"
      ? `${window.location.origin}/get-reflexion?ref=shared`
      : "/get-reflexion?ref=shared";
    const shareData = {
      title: "Reflexion",
      text: "Explore Reflexion for families caring for ageing parents.",
      url: shareUrl,
    };

    setShareLink(shareUrl);
    setShareStatus("ready");

    try {
      if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
        await navigator.share(shareData);
        setShareStatus("shared");
        return;
      }
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setShareStatus("copied");
        return;
      }
      setShareLink(shareUrl);
      setShareStatus("ready");
    } catch {
      setShareLink(shareUrl);
      setShareStatus("ready");
    }
  }

  async function submitInterest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isPreview || !priceDecision || isSubmitting) return;

    setIsSubmitting(true);
    setSubmissionError("");

    try {
      const response = await fetch("/api/website-forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          mirrorPlan: productId === "mirror" ? mirrorPlan : null,
          details,
          priceDecision,
          followUp: priceDecision === "yes" ? followUp : null,
          noReason: priceDecision === "no" ? noReason : null,
          noReasonOther: priceDecision === "no" && noReason === "Other" ? noReasonOther : null,
          decisionReason: decisionReason.trim() || null,
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null) as { error?: string } | null;
        throw new Error(result?.error ?? "We could not save your details. Please try again.");
      }

      if (priceDecision === "no") recordFunnelMetric({ event: "price_rejection", reason: noReason });
      if (priceDecision === "yes") recordFunnelMetric({ event: "follow_up_selected", followUp });
      recordFunnelMetric({ event: "funnel_completed" });
      setStep(6);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setSubmissionError(error instanceof Error ? error.message : "We could not save your details. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const followUpOptions = productId === "mirror"
    ? [
        ["pilot", "Book a parent suitability call + Apply for the Reflexion Home Pilot"],
        ["orders", "Contact me when orders open"],
      ]
    : productId === "loved-one-app"
      ? [
          ["availability", "Contact me when availability is confirmed"],
          ["none", "No follow-up for now"],
        ]
      : [
          ["progress", "Keep me updated of Singapore launch"],
          ["none", "No follow-up for now"],
        ];

  return <main className="interest-flow" id="main">
    <aside className="interest-flow__rail" aria-label="Your progress">
      <p className="eyebrow">Get Reflexion</p>
      <ol>
        {stepLabels.map((label, index) => <li key={label} data-active={index + 1 === step} data-complete={index + 1 < step}>
          <span>{index + 1}</span><small>{label}</small>
        </li>)}
      </ol>
      <p className="interest-flow__rail-note">A simple expression of interest. No payment will be taken today.</p>
    </aside>

    <section className="interest-flow__panel" aria-live="polite">
      <div className="interest-flow__mobile-progress" aria-hidden="true"><span style={{ width: progress }}/></div>
      <p className="interest-flow__step">Step {step} of {stepLabels.length}</p>

      {step === 1 ? <form onSubmit={advance} className="interest-form">
        <header className="interest-form__heading">
          <p className="eyebrow">Choose your Reflexion</p>
          <h1>Which form feels most natural for your family?</h1>
          <p>Choose one for now. You can go back and change it before confirming.</p>
        </header>
        <fieldset className="choice-grid">
          <legend className="sr-only">Choose a Reflexion form</legend>
          {productOptions.map((option) => <label className={`choice-card choice-card--${option.id}`} key={option.id} data-selected={productId === option.id}>
            <input type="radio" name="product" value={option.id} checked={productId === option.id} onChange={() => setProductId(option.id)}/>
            <span className="choice-card__media"><Image src={choicePresentation[option.id].image} alt={choicePresentation[option.id].alt} fill loading="eager" sizes="(max-width: 520px) 38vw, (max-width: 820px) 30vw, 220px"/></span>
            <span className="choice-card__check" aria-hidden="true"/>
            <span className="choice-card__body">
              <strong>{option.name}</strong>
              <small>{choicePresentation[option.id].maturity}</small>
              <p>{choicePresentation[option.id].description}</p>
            </span>
          </label>)}
        </fieldset>
        <div className="preference-questions">
          <label className="field"><span>Which form would your parent be most likely to accept at home?</span><select required value={parentAcceptancePreference} onChange={(event) => setParentAcceptancePreference(event.target.value as ProductId)}><option value="">Choose one</option>{productOptions.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}</select></label>
          <label className="field"><span>Which form would you personally be most willing to pay for?</span><select required value={caregiverPurchasePreference} onChange={(event) => setCaregiverPurchasePreference(event.target.value as ProductId)}><option value="">Choose one</option>{productOptions.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}</select></label>
        </div>
        <div className="interest-form__actions"><button className="interest-button" type="submit">See package and price <span aria-hidden="true">→</span></button></div>
      </form> : null}

      {step === 2 ? <form onSubmit={advance} className="interest-form">
        <header className="interest-form__heading">
          <p className="eyebrow">Your Reflexion</p>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
        </header>
        <div className="package-summary">
          <div className="package-summary__top"><span>{product.maturity}</span><strong>Singapore launch offer</strong></div>
          <div className="package-summary__body">
            <div><p className="package-summary__label">What is included</p><ul>{product.included.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div className="package-summary__price"><p className="package-summary__label">Proposed price</p><strong>{exactPrice}</strong></div>
          </div>
        </div>
        {productId === "mirror" ? <fieldset className="price-options">
          <legend>Choose a Mirror price option</legend>
          {(Object.entries(mirrorPrices) as [MirrorPlan, string][]).map(([id, price]) => <label key={id} data-selected={mirrorPlan === id}>
            <input type="radio" name="mirror-plan" checked={mirrorPlan === id} onChange={() => setMirrorPlan(id)}/>
            <span><b>Mirror {id.toUpperCase()}</b><small>{price}</small></span>
          </label>)}
        </fieldset> : null}
        <p className="no-payment"><span className="no-payment__icon" aria-hidden="true">○</span><strong>No payment will be taken today.</strong><span className="no-payment__body">Prices are being validated and are not guaranteed final launch pricing.</span></p>
        <div className="interest-form__actions"><button className="interest-button interest-button--quiet" type="button" onClick={goBack}>Back</button><button className="interest-button" type="submit">Continue <span aria-hidden="true">→</span></button></div>
      </form> : null}

      {step === 3 ? <form onSubmit={advance} className="interest-form">
        <header className="interest-form__heading">
          <p className="eyebrow">Your details</p>
          <h1>Who should we stay in touch with?</h1>
        </header>
        <div className="field-grid">
          <label className="field"><span>First name</span><input required autoComplete="given-name" maxLength={80} value={details.firstName} onChange={(event) => updateDetails("firstName", event.target.value)}/></label>
          <label className="field"><span>Last name</span><input required autoComplete="family-name" maxLength={80} value={details.lastName} onChange={(event) => updateDetails("lastName", event.target.value)}/></label>
          <label className="field"><span>Mobile</span><input required type="tel" autoComplete="tel" inputMode="tel" value={details.mobile} onChange={(event) => updateDetails("mobile", event.target.value)}/></label>
          <label className="field"><span>Email</span><input required type="email" autoComplete="email" value={details.email} onChange={(event) => updateDetails("email", event.target.value)}/></label>
          <label className="field field--wide"><span>Street address</span><input required autoComplete="street-address" maxLength={160} value={details.streetAddress} onChange={(event) => updateDetails("streetAddress", event.target.value)}/></label>
          <label className="field"><span>Town / City <small>(optional)</small></span><input autoComplete="address-level2" maxLength={100} value={details.city} onChange={(event) => updateDetails("city", event.target.value)}/></label>
          <label className="field"><span>Postcode / ZIP</span><input required autoComplete="postal-code" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} placeholder="6 digits" title="Enter a 6-digit postcode" value={details.postalCode} onChange={(event) => updateDetails("postalCode", event.target.value.replace(/\D/g, "").slice(0, 6))}/></label>
          <label className="field"><span>Intended recipient</span><select required value={details.recipient} onChange={(event) => setDetails((current) => ({ ...current, recipient: event.target.value, recipientOther: event.target.value === "Other" ? current.recipientOther : "" }))}><option value="">Choose one</option><option>Parent</option><option>Grandparent</option><option>Spouse</option><option>Other</option></select></label>
          {details.recipient === "Other" ? <label className="field field--wide"><span>Other relationship</span><input required autoComplete="off" maxLength={100} value={details.recipientOther} onChange={(event) => updateDetails("recipientOther", event.target.value)} placeholder="Tell us who this is for"/></label> : null}
        </div>
        <label className="acknowledgement"><input required type="checkbox" checked={details.readiness} onChange={(event) => updateDetails("readiness", event.target.checked)}/><span>I have discussed—or am willing to discuss—this with my loved one.<small>This acknowledgement is not older-adult consent.</small></span></label>
        <div className="interest-form__actions"><button className="interest-button interest-button--quiet" type="button" onClick={goBack}>Back</button><button className="interest-button" type="submit">Continue <span aria-hidden="true">→</span></button></div>
      </form> : null}

      {step === 4 ? <form onSubmit={advance} className="interest-form">
        <header className="interest-form__heading">
          <p className="eyebrow">Confirm your interest at this price</p>
          <h1>Confirm this price</h1>
        </header>
        <div className="price-confirmation"><span>{product.name}</span><strong>{exactPrice}</strong><small>{product.maturity}</small></div>
        <fieldset className="decision-options">
          <legend className="sr-only">Confirm interest at the exact price</legend>
          <label data-selected={priceDecision === "yes"}><input required type="radio" name="price-decision" value="yes" checked={priceDecision === "yes"} onChange={() => setPriceDecision("yes")}/><span><b>Yes, contact me at this price</b><small>I understand this is not a purchase or reservation.</small></span></label>
          <label data-selected={priceDecision === "no"}><input required type="radio" name="price-decision" value="no" checked={priceDecision === "no"} onChange={() => setPriceDecision("no")}/><span><b>No, not at this price</b><small>I can share the main reason on the next screen.</small></span></label>
        </fieldset>
        <p className="no-payment"><span className="no-payment__icon" aria-hidden="true">○</span><strong>No payment will be taken today.</strong><span className="no-payment__body">Reflexion is preparing its Singapore launch. By confirming, you are telling us that you would seriously consider purchasing this option at {exactPrice}, subject to final specifications, availability and commercial terms.</span></p>
        <div className="interest-form__actions"><button className="interest-button interest-button--quiet" type="button" onClick={goBack}>Back</button><button className="interest-button" type="submit">Continue <span aria-hidden="true">→</span></button></div>
      </form> : null}

      {step === 5 ? <form onSubmit={isPreview ? (event) => event.preventDefault() : submitInterest} className="interest-form">
        {priceDecision === "yes" ? <p className="eyebrow interest-form__step-heading">Choose a follow-up</p> : <header className="interest-form__heading">
          <p className="eyebrow">Help us understand</p>
          <h1>What is the main reason?</h1>
          <p>Your answer helps us understand the price decision without treating it as a sale.</p>
        </header>}
        {isPreview ? <p className="preview-notice" role="status">Preview only — this form will not submit.</p> : null}
        {priceDecision === "yes" ? <fieldset className="decision-options">
          <legend className="sr-only">Choose a follow-up</legend>
          {followUpOptions.map(([value, label]) => <label key={value} data-selected={followUp === value}><input required type="radio" name="follow-up" value={value} checked={followUp === value} onChange={() => setFollowUp(value)}/><span><b>{label}</b></span></label>)}
        </fieldset> : <div className="field-stack"><label className="field field--wide"><span>Primary reason</span><select required value={noReason} onChange={(event) => { setNoReason(event.target.value); if (event.target.value !== "Other") setNoReasonOther(""); }}><option value="">Choose one</option><option>The price is higher than I would consider</option><option>The monthly cost is higher than I would consider</option><option>We do not need it yet</option><option>My parent may not use it</option><option>I have a privacy concern</option><option>I need to discuss it with my family</option><option>I need more product information</option><option>The form does not suit my loved one</option><option>Other</option></select></label>{noReason === "Other" ? <label className="field field--wide"><span>Please specify</span><input required autoComplete="off" maxLength={160} value={noReasonOther} onChange={(event) => setNoReasonOther(event.target.value)} placeholder="Tell us what matters most"/></label> : null}</div>}
        <label className="field field--wide decision-driver"><span>What drove your decision? <small>Optional</small></span><textarea rows={4} value={decisionReason} onChange={(event) => setDecisionReason(event.target.value)} placeholder="Tell us what mattered most to you."/></label>
        {submissionError ? <p className="interest-form__error" role="alert">{submissionError}</p> : null}
        <div className="interest-form__actions"><button className="interest-button interest-button--quiet" type="button" onClick={goBack} disabled={isSubmitting}>Back</button><button className="interest-button" type="submit" disabled={isSubmitting || isPreview}>{isPreview ? "Preview only" : isSubmitting ? "Saving…" : "Finish"}{!isSubmitting && !isPreview ? <span aria-hidden="true">→</span> : null}</button></div>
      </form> : null}

      {step === 6 ? <div className="interest-form interest-confirmation">
        {isPreview ? <p className="preview-notice" role="status">Preview only — no submission was made.</p> : null}
        <span className="interest-confirmation__mark" aria-hidden="true">✓</span>
        <header className="interest-form__heading">
          <p className="eyebrow">Thank you</p>
          <h1>Your interest has been recorded.</h1>
          <p>Your form was saved securely. No payment has been taken and this is not a purchase or reservation.</p>
        </header>
        <dl className="confirmation-summary"><div><dt>Selected form</dt><dd>{product.name}</dd></div><div><dt>Exact price considered</dt><dd>{exactPrice}</dd></div><div><dt>Your response</dt><dd>{priceDecision === "yes" ? "Would consider at this price" : "Not at this price"}</dd></div><div><dt>Requested next step</dt><dd>{priceDecision === "no" ? "No follow-up requested" : followUpOptions.find(([value]) => value === followUp)?.[1] ?? "Recorded"}</dd></div></dl>
        <p className="no-payment"><span className="no-payment__icon" aria-hidden="true">○</span><strong>No payment has been taken.</strong><span className="no-payment__body">This is not a purchase, order or reservation.</span></p>
        {priceDecision === "yes" ? <aside className="share-invite" aria-labelledby="share-invite-title">
          <p className="eyebrow">Share with someone you care about</p>
          <h2 id="share-invite-title">Know another family exploring care?</h2>
          <p>Invite them to explore Reflexion and choose the form that feels right for their home.</p>
          <button className="interest-button" type="button" onClick={shareReflexion}>Share Reflexion <span aria-hidden="true">↗</span></button>
          {shareStatus === "copied" ? <small role="status">Link copied.</small> : null}
          {shareStatus === "shared" ? <small role="status">Thanks for sharing Reflexion.</small> : null}
          {shareStatus === "ready" ? <div className="share-invite__fallback" role="status">
            <label htmlFor="reflexion-share-link">Copy this link to share Reflexion</label>
            <input id="reflexion-share-link" type="text" readOnly value={shareLink} onFocus={(event) => event.currentTarget.select()}/>
          </div> : null}
        </aside> : null}
        <div className="interest-form__actions"><Link className="interest-button interest-button--quiet" href="/">Return home</Link></div>
      </div> : null}
    </section>
  </main>;
}
