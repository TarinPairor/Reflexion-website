# AGENTS.md — Reflexion Website Repository Working Agreement
## Status: CANONICAL REPOSITORY EXECUTION RULES
## Updated: 10 August 2026

## 1. Mission

This repository implements the Reflexion consumer website.

Codex is an implementation and repository-audit tool. It is not authorised to invent or change Reflexion product strategy, public claims, commercial terms, product maturity, website IA, evidence status, or clinical positioning.

Primary website audience:
**adult-child caregivers of ageing parents**

Primary product user:
**older adult / ageing loved one**

Primary website objective:
**conversion into the Get Reflexion commercial-intent flow**, while preserving older-adult dignity and producing interpretable evidence rather than vanity metrics.

---

## 2. Current phase

Until the founder explicitly says:

**Proceed to Phase 1**

the project is:

# PHASE 0 — HANDOFF + REPOSITORY AUDIT ONLY

Phase 0 may:
- inspect the repository;
- identify framework/package manager/runtime;
- run the existing baseline where feasible;
- inspect routes, components, assets, styles, tests, analytics and deployment;
- map canonical handoff requirements to implementation;
- identify contradictions, missing assets and implementation risks;
- propose Phase 1.

Phase 0 must NOT:
- redesign pages;
- implement the new Home;
- add permanent routes;
- migrate frameworks;
- add product dependencies unless strictly required to inspect/run the existing baseline without changing manifests;
- implement Supabase/forms/analytics/funnel;
- deploy;
- modify DNS;
- change product functionality.

Stop after the Phase 0 report.

---

## 3. Locked permanent website IA

Logo → Home.

Top navigation:
- How It Works
- Products
- About
- FAQ
- EN / 中文
- Get Reflexion

Permanent website experiences:
1. Home
2. How It Works
3. Products
4. About
5. FAQ
6. Get Reflexion

Do not revive historic standalone pages such as:
- Caregiver App
- Features
- Pricing
- Pilot
- For Families
- Research
- Blog/Resources
- Contact

unless a later canonical founder decision changes the IA.

---

## 4. One job per page

Home:
**Make me want Reflexion.**

How It Works:
**Help me imagine my family living with Reflexion.**

Products:
**Help me choose the form I want.**

About:
**Make me trust why Reflexion exists and who built it.**

FAQ:
**Remove the objection stopping me.**

Get Reflexion:
**Turn interest into measurable commercial commitment.**

Avoid making every page repeat the same feature story.

---

## 5. Current product truth

Core current product system:
- Reflexion Mirror — flagship/current primary product form
- Reflexion Caregiver App — central caregiver surface

Five website form factors used for form/preference/pricing validation:
1. Reflexion Mirror — flagship/current
2. Reflexion App for the loved one — functional alternative, QA-gated
3. Bear — prototype
4. Home Hub — concept
5. Tabletop Companion / Robot — future concept

Do not imply equal readiness.

The Loved-one App may be described as currently available only after its working-demo/QA gate is passed.

Real current Mirror hardware is **21.5-inch**. Real founder-supplied hardware photography controls physical geometry.

---

## 6. Four value pillars

# INSIGHT
Structured morning cognitive & wellbeing check-in and meaningful change from the person's own usual patterns.

# COMPANIONSHIP
After the morning check-in, free/open companionship conversation.

# SUPPORT
Gentle routines/reminders integrated naturally into everyday life.

# CONNECTION
Caregiver sends text, voice and photos; older adult receives them through Reflexion and may reply by voice.

---

## 7. Closed Care Loop

Current required product story:

Loved one
→ Reflexion interaction
→ meaningful caregiver awareness
→ caregiver connects back
→ loved one replies by voice
→ relationship continues.

Loved-one voice reply is a **current product requirement as of 10 August 2026**.

Required product contract:
Caregiver App text/voice/photo
→ Mirror family message
→ Reply by voice
→ Mirror voice-reply recorder
→ service transport
→ inbound voice message in caregiver Chat thread.

The technology team is implementing the voice-reply capability outside the website work.

Codex website work must:
- inspect/integrate with the current product contract;
- report missing/partial support;
- not duplicate product implementation by default;
- not downgrade voice reply to future scope;
- not claim it is already usable publicly until implementation/QA supports that claim.

Loved-one text reply and structured loved-one request workflows remain out of scope.

---

## 8. Morning check-in

The first conversation every morning is a structured:

**daily cognitive & wellbeing check-in**

It should feel like warm natural conversation, not a test.

After the morning check-in:
- open/free companionship may continue at any time.

Do not invent:
- clinical scores;
- thresholds;
- diagnostic interpretations;
- validated assessment claims.

---

## 9. Consumer-wellness claim boundary

Current positioning:
**consumer wellness + caregiver support**

Permitted concept territory includes:
- daily cognitive & wellbeing check-in;
- cognitive and conversational patterns;
- changes from usual;
- meaningful changes over time;
- comparison with the person's own recent usual patterns.

Do not claim:
- dementia diagnosis;
- dementia screening;
- cognitive screening;
- early dementia detection;
- prediction;
- validated cognitive assessment;
- treatment;
- prevention;
- emergency monitoring;
- guaranteed safety.

Appropriate limitations should make clear that Reflexion does not diagnose dementia or replace professional cognitive assessment.

The historical founder origin story may state that Kei-Lyn's grandmother, referred to publicly as **Mama**, had dementia. Do not imply Reflexion would have diagnosed, detected, prevented or treated Mama's dementia.

---

## 10. Camera public-website rule

Do not introduce camera-based marketing, feature copy, comparisons or FAQ content unless a later explicit decision requires it.

Internal hardware/product architecture may contain implementation detail. That does not make camera messaging public website content.

Do not claim “camera-free” unless hardware/product evidence supports that exact claim.

---

## 11. Purpose-built website product UI

Website implementation may create high-fidelity marketing UI for the Mirror and Caregiver App instead of using literal screenshots where this improves:
- legibility;
- responsive composition;
- storytelling;
- hierarchy.

However:
- product architecture controls capability truth;
- canonical Content Source controls public copy/claims;
- real 21.5-inch Mirror imagery controls geometry;
- do not invent clinical scores or unsupported states/actions;
- the assistant name “Aria” is internal/product-document language unless explicitly approved in the Content Source for public use.

---

## 11A. Public UI claim safeguards

Do not copy literal wording from internal/product UI into public marketing without Content Source approval.

Specifically:
- “Aria” remains a public-name VERIFY item; use Reflexion publicly until approved.
- routine reminders may record self-report only;
- do not show “Medication taken”, adherence percentages or verified routine completion;
- do not use clinical scores, diagnostic labels, or “all clear” health states;
- do not use old no-reply UI after the current voice-reply requirement.

## 12. Five-form pricing validation

Customer-facing label:

# Proposed Singapore launch offer

Do not use “Founding Family”.

Current website validation pricing:

### Mirror A
S$799 once + S$39.90/month

### Mirror B
S$74.90/month for 24 months, then S$39.90/month

### Loved-one App
S$29.90/month
QA-gated.

### Bear
Expected concept price: S$199 once + S$29.90/month

### Home Hub
Expected concept price: S$29.90/month

### Tabletop Companion / Robot
Expected concept price: S$999 once + S$39.90/month

All are validation prices, not guaranteed final launch pricing.

Always preserve the disclosure:

**No payment will be taken today.**

Concept-form price acceptance must not be interpreted as demand for a deliverable current product.

Mirror A and Mirror B must remain analytically separate.

---

## 13. VivoCity boundary

Reflexion is **not conducting actual product sales at VivoCity in this validation phase**.

No:
- payment;
- completed retail order;
- guaranteed stock;
- guaranteed delivery.

VivoCity may validate:
- comprehension;
- form preference;
- exact-price willingness;
- commercial intent;
- suitability-call interest;
- home-pilot interest;
- request to be contacted when orders open.

Do not call funnel completion a sale.

---

## 14. Get Reflexion funnel

Target approximately six visible screens.

### Step 1
Choose form only if not already selected.

Five form factors:
- Mirror
- Loved-one App
- Bear
- Home Hub
- Tabletop Companion

Preserve maturity labels.

### Step 2
Selected form + exact proposed price.

For Mirror, require choice between Mirror A and Mirror B.

Show:
- selected form;
- maturity status;
- what is included;
- Caregiver App relationship;
- exact applicable price;
- no-payment disclosure.

### Step 3
Personal details:
- Full name
- Email
- Mobile number
- Postal sector / first two postal digits only
- Intended recipient: Parent / Grandparent / Spouse / Other
- required readiness acknowledgement:
  “I have discussed—or am willing to discuss—this with my loved one.”

Do not collect full address or sensitive health information in this commercial-intent form.

This acknowledgement is not older-adult consent.

### Step 4
Explicit price confirmation.

Ask whether the visitor would seriously consider the selected form at the exact selected price, subject to final specifications, availability and commercial terms.

### Step 5 — YES
Follow-up must branch by product maturity.

For the current Mirror:
1. request a suitability call + apply for a home pilot, if that pilot is actually accepting interest;
2. contact me when orders open.

Use “Book” instead of “Request” only if the website actually provides immediate scheduling.

For the QA-gated Loved-one App:
- show only follow-up actions that match its verified testing/availability status.

For Bear / Home Hub / Tabletop concepts:
- do not show a current-product home-pilot or guaranteed “orders open” path unless that programme genuinely exists;
- use clearly conditional concept follow-up, such as keeping the visitor updated if the concept progresses.

A home-pilot expression/application is not automatic research-study enrolment and does not guarantee acceptance.
If the home pilot is a research study, route recruitment/consent through the separately approved research workflow rather than treating this commercial form as study enrolment.

### Step 5 — NO
Capture one primary reason and optionally allow future updates.

### Step 6
Confirmation:
- show what they chose;
- explain exactly what happens next;
- no purchase/reservation language.

Follow up by email and/or SMS based on the chosen action and consent/contact-preference implementation.

---

## 15. Communications / PDPA / DNC implementation gate

Before production SMS/WhatsApp launch marketing:
- implement clear purpose notification;
- capture appropriate communication preference/consent where required;
- ensure Singapore DNC/PDPA handling is compliant;
- keep service-request follow-up distinct from future marketing/update messages;
- provide appropriate withdrawal/unsubscribe handling.

Do not ask Codex to invent legal wording.

This is a production/legal gate, not a Phase 0 blocker.

---

## 16. Lead storage

Planned datastore:
**Supabase**

Implementation is not part of Phase 0.

Store the minimum data needed for:
- commercial-intent analysis;
- selected form/price;
- requested follow-up;
- home-pilot interest;
- consent/preferences;
- source/UTM analytics.

Do not store unnecessary sensitive health data.

---

## 17. Funnel evidence interpretation

Keep distinct:
visitor
→ Get Reflexion click
→ form selection
→ Mirror price option selection if applicable
→ price viewed
→ continued after price
→ details completed
→ exact-price yes/no
→ next-step commitment
→ actual future order/payment.

None of the pre-payment steps is a sale.

Track Mirror A and B separately.

Track each concept form separately.

---

## 18. Human proof

Do not invent a real person's verbatim testimonial.

Founder-approved evidence pool includes:
- caregiver discovery: Jason, 54; Sharon, 51; Jennifer, 52
- early-product-user pool: approximately 10 older-adult/grandparent testers and Jack, 55

Rules:
- exact sourced/permissioned words may be quoted;
- otherwise use a clearly labelled paraphrase/insight without quotation marks;
- customer discovery = problem resonance, not product efficacy;
- early product-user testimonials may claim only what actual use supports;
- anonymous/light attribution is permitted where source/consent supports it.

Never invent names, ages, faces or outcomes.

---

## 19. Recognition

Use organiser-supported wording only.

Preferred current wording:
- HealthHack 2025 — 1st Place, Silver Generation Healthcare
- TigerLaunch Asia Regionals 2026 — Grand Champion
- MBEC 2026 — Top Four Winning Team / one of four winning teams
- Huawei Tech4City 2025 — Third Prize, Budding Youths Track
- Selected for MedTech Actuator Origin Singapore 2026
- Accepted into BLOCK71 Start-up Runway

Use official source logos/assets only. Never AI-generate third-party logos.

Recognition does not prove:
- clinical validity;
- product-market fit;
- willingness to pay;
- sales;
- regulatory approval.

No generic “partners” logo strip should be created from informal relationships.

---

## 20. Founders / public story

Public founder titles:
- Kong Kei-Lyn — Co-Founder
- Chloe Tan — Co-Founder

Founder/family imagery is approved in principle, subject to asset-level consent/privacy/context QA.

Hospital/institutional imagery must not imply institutional endorsement.

---

## 21. Contact / languages

Current public-contact state:
- general email: TBC
- partnership email: TBC
- Instagram: @reflexion.sg
- WhatsApp: yes; number TBC

Do not publish TBC placeholders.

WhatsApp is not an emergency/clinical channel.

Launch language requirement:
- English
- Simplified Chinese

Mandarin copy requires manual language, claims, responsive-layout and accessibility QA.

---

## 22. Visual system

Visual thesis:

# QUIET PRESENCE

Reflexion should feel:
- warm;
- premium;
- domestic;
- human;
- editorial;
- calm;
- trustworthy.

Avoid:
- generic SaaS;
- medical dashboards;
- hospital blue;
- AI-purple gradients;
- fake clinical charts;
- excessive cards;
- cartoon seniors;
- surveillance aesthetics.

Mobile is a first-class design target.

Target at least WCAG 2.2 AA.

---

## 23. Canonical handoff files

Read:
- `/AGENTS.md`
- `/docs/reflexion-handoff/00_READ_ME_FIRST.md`
- `/docs/reflexion-handoff/01_WEBSITE_ARCHITECTURE_FINAL_2026-08-10.md`
- `/docs/reflexion-handoff/02_WEBSITE_CONTENT_SOURCE_FINAL_2026-08-10.json`
- `/docs/reflexion-handoff/03_VISUAL_DIRECTION_FINAL_2026-08-10.md`
- `/docs/reflexion-handoff/04_ASSET_REGISTRY_FINAL_2026-08-10.xlsx`
- `/docs/reflexion-handoff/04_ASSET_REGISTRY_FINAL_2026-08-10.json`
- `/docs/reflexion-handoff/05_CAREGIVER_APP_ARCHITECTURE_FINAL_2026-08-10.md`
- `/docs/reflexion-handoff/06_MIRROR_APP_ARCHITECTURE_FINAL_2026-08-10.md`
- `/docs/reflexion-handoff/07_PRODUCT_UI_SCREEN_INDEX_FINAL_2026-08-10.json`
- `/docs/reflexion-handoff/07_PRODUCT_UI_PHASE0_CURATED/`
- `/docs/reflexion-handoff/08_DECISION_OVERRIDES_AND_SUPERSEDED_ITEMS_2026-08-10.md`
- `/docs/reflexion-handoff/09_FOUNDER_APPROVAL_RECORD_2026-08-10.md`
- `/docs/reflexion-handoff/10_CRITICAL_AUDIT_AND_RISK_REGISTER_2026-08-10.md`
- `/docs/reflexion-handoff/11_PHASE0_PACKAGE_MANIFEST_2026-08-10.md`
- `/docs/reflexion-handoff/12_CODEX_PHASE0_PROMPT_FINAL_2026-08-10.md`
- `/docs/reflexion-handoff/13_FINAL_PACKAGE_SANITY_CHECK_2026-08-10.md`

Historic files are evidence/history only unless explicitly incorporated.

---

## 24. Authority order

1. `AGENTS.md` — execution/safety/phase rules
2. `08_DECISION_OVERRIDES...md` — explicit current conflict resolution
3. `01_WEBSITE_ARCHITECTURE...md` — IA/UX/funnel structure
4. `02_WEBSITE_CONTENT_SOURCE...json` — exact copy/status/claims/pricing/content gates
5. `05` / `06` product architecture — actual product behaviour
6. `04_ASSET_REGISTRY...` — asset permission/status
7. `03_VISUAL_DIRECTION...md` — visual treatment
8. `07_PRODUCT_UI...` — product UI inventory/reference mapping
9. `09_FOUNDER_APPROVAL_RECORD...md` — governance/audit record; current decisions should already be reflected in files 01–08
10. Existing repository — implementation evidence, not strategy authority

If current canonical sources still conflict, report the contradiction. Do not guess.

---

## 25. Asset discipline

Presence in the repository does not mean permission to publish.

Distinguish:
- production assets;
- product-truth references;
- approved visual references;
- missing assets;
- replace-before-publication;
- do-not-use.

Generated mockups never override real hardware geometry or canonical product truth.

---

## 26. Repository-first behaviour

Before proposing implementation:
1. inspect repository;
2. identify stack;
3. identify package manager/runtime;
4. inspect routes;
5. inspect components;
6. inspect styles/tokens;
7. inspect content architecture;
8. inspect assets;
9. inspect forms/backend;
10. inspect analytics;
11. inspect deployment;
12. run baseline checks where feasible.

Do not force a framework rewrite if the existing stack is viable.

Do not change package manifests/lockfiles simply to make Phase 0 pass.

---

## 27. Git / privacy safety

Do not:
- force push;
- rewrite shared history;
- delete unrelated work;
- expose secrets;
- commit credentials;
- place real private health data in fixtures/logs/screenshots;
- use identifiable private conversations as demo data without approval.

Use synthetic example data unless a canonical public asset is explicitly approved.

---

## 28. Required Phase 0 report

Produce:
1. Executive summary
2. Current stack and repository baseline
3. Build/lint/typecheck/test results
4. Route map
5. Component map
6. Style/token map
7. Content architecture
8. Asset map
9. Existing form/backend/analytics/deployment integrations
10. Locked page → proposed route/component mapping
11. Content-ID mapping
12. Asset-ID mapping
13. Missing assets/content
14. Contradictions/superseded implementation
15. Voice-reply integration status
16. Loved-one App QA/readiness implementation evidence
17. Accessibility risks
18. Performance risks
19. Privacy/consent/form risks visible in current implementation
20. SEO/metadata/i18n foundations: titles/descriptions, canonical URLs, Open Graph, sitemap, robots, structured data where appropriate, EN/中文 hreflang and localised metadata plan
21. Form reliability/security risks: validation, duplicate submission, failure states, spam/rate limiting, secrets, Supabase RLS/least privilege and client/server boundaries
22. Analytics/funnel implementation plan, including proposed event-property schema and experiment/version identifiers
23. Proposed Phase 1 plan
24. Exact Phase 1 file-change plan
25. Only genuinely blocking unresolved decisions

Then STOP.

---

## 29. Phase 1 gate

Phase 1 begins only after explicit:

**Proceed to Phase 1**

Initial Phase 1 scope:
- design tokens;
- typography;
- colour/spacing;
- header/mobile nav;
- EN/中文 architecture;
- footer;
- sticky CTA where appropriate;
- Home only.

Home is the visual-system approval gate before the remaining pages are implemented.

---

## 30. Completion standard

Never claim success because code was written.

When implementation begins, validate:
- lint;
- typecheck;
- tests;
- production build;
- responsive behaviour;
- real flows;
- keyboard/focus;
- reduced motion;
- console/runtime errors.

Report:
- what changed;
- why;
- files;
- tests;
- exact results;
- assumptions;
- limitations;
- next action.

When uncertain:
**preserve product truth, older-adult dignity, caregiver trust, evidence integrity and conversion validity. Do not invent.**
