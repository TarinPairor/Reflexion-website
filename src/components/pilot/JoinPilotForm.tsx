"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { productOptions, type ProductId } from "@/lib/get-reflexion/config";
import { productFormImages } from "@/lib/productAssets";
import { recordFunnelMetric } from "@/lib/website-metrics/client";

type Recipient = "My parent" | "My grandparent" | "My spouse" | "Myself" | "Someone else";

type PilotDetails = {
  fullName: string;
  mobile: string;
  email: string;
  recipient: Recipient | "";
};

const initialDetails: PilotDetails = {
  fullName: "",
  mobile: "",
  email: "",
  recipient: "",
};

const choiceImages: Record<ProductId, { image: string; alt: string }> = {
  mirror: {
    image: productFormImages.mirror,
    alt: "Reflexion Mirror in a warm home setting",
  },
  "loved-one-app": {
    image: productFormImages["loved-one-app"],
    alt: "Reflexion Loved-one App on a phone",
  },
  bear: {
    image: productFormImages.bear,
    alt: "Reflexion Bear in a warm home setting",
  },
  "home-hub": {
    image: productFormImages["home-hub"],
    alt: "Reflexion Home Hub in a warm home setting",
  },
  "tabletop-companion": {
    image: productFormImages["tabletop-companion"],
    alt: "Reflexion Tabletop Companion in a warm home setting",
  },
};

const recipientOptions: readonly Recipient[] = ["My parent", "My grandparent", "My spouse", "Myself", "Someone else"];

function referralSourceFromLocation() {
  if (typeof window === "undefined") return null;
  const referral = new URLSearchParams(window.location.search).get("ref");
  return referral === "pilot" || referral === "shared" ? referral : null;
}

export function JoinPilotForm({ initialProduct }: { initialProduct?: ProductId }) {
  const router = useRouter();
  const [productId, setProductId] = useState<ProductId>(initialProduct ?? "mirror");
  const [details, setDetails] = useState<PilotDetails>(initialDetails);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

  useEffect(() => {
    recordFunnelMetric({ event: "pilot_started" });
  }, []);

  function updateDetails<Key extends keyof PilotDetails>(key: Key, value: PilotDetails[Key]) {
    setDetails((current) => ({ ...current, [key]: value }));
  }

  async function submitPilotInterest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmissionError("");

    try {
      const response = await fetch("/api/website-forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form: "join-pilot",
          productId,
          details: {
            ...details,
            mobile: `+65 ${details.mobile.trim()}`,
          },
          referralSource: referralSourceFromLocation(),
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null) as { error?: string } | null;
        throw new Error(result?.error ?? "We could not save your details. Please try again.");
      }

      const referralSource = referralSourceFromLocation();
      recordFunnelMetric({ event: "pilot_form_factor_selected", productId });
      recordFunnelMetric({ event: "pilot_details_completed" });
      recordFunnelMetric({ event: "pilot_submitted", productId, recipient: details.recipient, referralSource });
      router.push("/get-reflexion/thank-you");
    } catch (error) {
      setSubmissionError(error instanceof Error ? error.message : "We could not save your details. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return <main className="pilot-page-main" id="main">
    <section className="pilot-hero" id="top" aria-labelledby="pilot-title">
      <div className="pilot-hero__copy">
        <p className="pilot-hero__label">Reflexion home pilot</p>
        <h1 id="pilot-title">Join our pilot</h1>
        <p className="pilot-hero__lead"><strong>Changes in the way we speak may offer early clues about changes in cognitive health.</strong></p>
        <div className="pilot-hero__body">
          <p>Our research team is bringing <strong>voice and speech analysis from everyday conversations</strong> to help identify subtle changes in speech, memory and thinking over time — including changes associated with <strong>Mild Cognitive Impairment (MCI) and dementia</strong> — to Singapore.</p>
          <details className="pilot-hero__more">
            <summary>Read more</summary>
            <div className="pilot-hero__more-content">
              <p>Speech-based biomarkers are a promising <strong>non-invasive and accessible approach to cognitive screening</strong>. Research suggests that changes in language and speech may appear before more obvious symptoms of cognitive decline, creating an opportunity to recognise people who may benefit from further assessment earlier.</p>
              <p>That matters because cognitive impairment and dementia are often identified only after symptoms have become more noticeable. Earlier recognition may allow individuals and families to <strong>seek appropriate assessment, support and care sooner.</strong></p>
              <p><strong>Be part of our journey to healthier ageing and family connection.</strong></p>
              <p>We’re inviting individuals and families to experience <strong>Reflexion at home</strong>. While contributing to our research into how patterns in everyday conversation may change over time, your loved ones also stay cognitively engaged over this period.</p>
              <div className="pilot-hero__closing">
                <p><strong>Join our pilot and help shape a connected approach to earlier cognitive health screening together.</strong></p>
                <p className="pilot-hero__research"><strong>Research background:</strong> <em>Evaluating spoken language as a biomarker for automated screening of cognitive impairment</em> — published in <em>Communications Medicine</em> and available through PubMed Central (U.S. National Library of Medicine, NIH).</p>
                <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12770543/" target="_blank" rel="noreferrer">Read the research <span aria-hidden="true">→</span></a>
                <p className="pilot-hero__contact">Contact us for any queries: <a href="tel:+6590012005">+65 9001 2005</a></p>
              </div>
            </div>
          </details>
        </div>
      </div>
    </section>

    <form className="pilot-form" onSubmit={submitPilotInterest}>
      <section className="pilot-form-section pilot-form-section--forms" aria-labelledby="pilot-form-title">
        <div className="pilot-section-heading">
          <h2 id="pilot-form-title">Choose your Reflexion</h2>
          <p>Which form feels most natural for you and your family?</p>
        </div>
        <fieldset className="pilot-choice-grid">
          <legend className="sr-only">Choose one Reflexion form</legend>
          {productOptions.map((option) => {
            const presentation = choiceImages[option.id];
            return <label className="pilot-choice" data-selected={productId === option.id} key={option.id}>
              <input type="radio" name="product" value={option.id} checked={productId === option.id} onChange={() => setProductId(option.id)}/>
              <span className="pilot-choice__image"><Image src={presentation.image} alt={presentation.alt} fill sizes="(max-width: 560px) 43vw, (max-width: 1040px) 28vw, 18vw"/></span>
              <span className="pilot-choice__name">{option.name}</span>
              <span className="pilot-choice__indicator" aria-hidden="true"/>
            </label>;
          })}
        </fieldset>
        <p className="pilot-form-note">Final pilot format may depend on availability and suitability.</p>
      </section>

      <section className="pilot-form-section pilot-form-section--details" aria-labelledby="pilot-details-title">
        <div className="pilot-section-heading">
          <h2 id="pilot-details-title">Tell us a little about you</h2>
          <p>We’ll use these details to follow up on your pilot interest.</p>
        </div>
        <div className="pilot-fields">
          <label className="pilot-field">
            <span>Your name</span>
            <input required id="pilot-name" name="fullName" autoComplete="name" maxLength={120} placeholder="Amy Wong" value={details.fullName} onChange={(event) => updateDetails("fullName", event.target.value)}/>
          </label>
          <label className="pilot-field">
            <span>Mobile number</span>
            <span className="pilot-phone-field"><span className="pilot-phone-field__prefix">+65</span><input required id="pilot-mobile" name="mobile" type="tel" autoComplete="tel-national" inputMode="tel" pattern="[0-9\\s()\\-]{6,20}" maxLength={20} placeholder="8123 4567" title="Enter a Singapore mobile number" value={details.mobile} onChange={(event) => updateDetails("mobile", event.target.value.replace(/[^0-9\\s()\\-]/g, "").slice(0, 20))}/></span>
          </label>
          <label className="pilot-field">
            <span>Email address</span>
            <input required id="pilot-email" name="email" type="email" autoComplete="email" maxLength={254} placeholder="you@email.com" value={details.email} onChange={(event) => updateDetails("email", event.target.value)}/>
          </label>
        </div>
        <fieldset className="pilot-recipient">
          <legend>Who are you considering Reflexion for?</legend>
          <div className="pilot-recipient__options">
            {recipientOptions.map((recipient) => <label data-selected={details.recipient === recipient} key={recipient}>
              <input required type="radio" name="recipient" value={recipient} checked={details.recipient === recipient} onChange={() => updateDetails("recipient", recipient)}/>
              <span>{recipient}</span>
            </label>)}
          </div>
        </fieldset>
      </section>

      {submissionError ? <p className="pilot-form__error" role="alert">{submissionError}</p> : null}
      <div className="pilot-submit">
        <button className="pilot-submit__button" type="submit" disabled={isSubmitting}>{isSubmitting ? "Joining…" : "Join our pilot"}<Icon name="arrow" width={19} height={19}/></button>
      </div>
      <div className="pilot-disclaimer" id="pilot-disclaimer">
        <p><strong>Interest only.</strong> Submitting this form registers your interest; it does not enrol you in a study or guarantee participation.</p>
        <p><strong>What happens next.</strong> If there is a suitable opportunity, our team may contact you about eligibility, consent, data collection and next steps.</p>
        <p><strong>As Reflexion develops.</strong> Pilot formats, devices, procedures and availability may change. Any research requiring ethics, institutional or regulatory approval will proceed only with the relevant approvals and informed consent. No purchase is required.</p>
        <p className="pilot-disclaimer__privacy">Privacy and data-handling details will be shared before any pilot activity.</p>
      </div>
    </form>
  </main>;
}
