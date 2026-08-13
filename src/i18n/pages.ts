import type { Locale } from "./content";

const pages = {
  en: {
    common: {
      get: "Join our pilot",
      products: "Explore Products",
      how: "See How It Works",
      limitation: "Reflexion supports consumer wellness and caregiving. It does not diagnose dementia, replace professional cognitive assessment or provide emergency monitoring.",
    },
    how: {
      heroTitle: "A day shaped around the relationship.",
      heroBody: "Reflexion begins with your loved one—their morning, their voice and their routines—then gives family enough context to know when a human moment may matter.",
      heroNote: "Gently checking in on your wellbeing daily.",
      dayTitle: "Morning, naturally.",
      dayBody: "The first conversation each morning is a short, structured cognitive and wellbeing check-in. It is designed to feel like warm conversation, without scores, diagnostic labels or clinical assessment screens.",
      dayMoments: [
        ["Morning check-in", "A familiar greeting opens a short conversation about how they feel and how the morning is beginning."],
        ["Open companionship", "After the check-in, they can talk freely about memories, family, food, hobbies, plans and everyday life."],
        ["Gentle routine support", "Configured reminders and plans can surface naturally. Reflexion records only what the person reports."],
        ["Family stays close", "Messages, voice notes and photos arrive through Reflexion without turning the home into a monitoring space."],
      ],
      familyTitle: "A message becomes a conversation.",
      familyBody: "Family communication moves both ways, so awareness leads back to relationship.",
      familyFlow: [
        ["Caregiver sends", "A text, voice note or photo from the Caregiver App."],
        ["Loved one receives", "The family message arrives through Reflexion."],
        ["Loved one replies", "They can record a reply in their own voice."],
        ["Caregiver receives", "The voice reply returns to the family chat thread."],
      ],
      appTitle: "Your Caregiver App, organised around real questions.",
      appBody: "Useful context should make the next human step clearer—not create another dashboard to watch.",
      caregiverQuestions: [
        ["How are they today?", "See concise morning context and the latest permitted interaction."],
        ["Has anything meaningfully changed?", "Notice changes from their own recent usual patterns in plain, non-clinical language."],
        ["Do I need to keep checking?", "A push-first approach surfaces meaningful updates without asking you to monitor constantly."],
        ["What has been happening over time?", "Look back across recent patterns and history when more context is useful."],
        ["What happened before?", "Review permitted summaries and relevant context—not an assumed full transcript."],
        ["How can I stay part of their day?", "Send text, voice and photos, and receive a loved-one voice reply when available."],
        ["What should I do?", "Call, message or check in. Reflexion is designed to promote human care, not replace it."],
      ],
      relationshipTitle: "Designed around the relationship.",
      relationshipBody: "The experience is built around active participation, understandable boundaries and family connection.",
      relationshipPoints: [
        ["Dignity", "Your loved one participates actively rather than being passively observed."],
        ["Privacy", "Only permitted context should move through the connected experience."],
        ["Consent and control", "Commercial interest is not a substitute for the loved one’s participation or consent."],
        ["Human connection", "Every useful update should point back towards a call, message or meaningful visit."],
        ["Clear limits", "Reflexion is not a diagnostic, emergency or guaranteed-safety service."],
      ],
    },
    products: {
      heroTitle: "Find the Reflexion that feels right at home.",
      heroBody: "Start with the form that feels natural for your loved one’s routines and space. The five directions are not equally developed or available.",
      mirrorTitle: "Reflexion Mirror",
      mirrorBody: "The current flagship: a 21.5-inch home experience for morning check-ins, companionship, gentle routine support and reciprocal family connection, connected to the Reflexion Caregiver App.",
      otherTitle: "Different homes may call for different forms.",
      otherBody: "Explore alternatives by familiarity, likely placement and companion feel—while keeping their maturity clear.",
      compareTitle: "Compare the human fit.",
      compareBody: "These dimensions describe how each form may feel at home. They are not invented technical specifications or claims of equal readiness.",
      compareHeadings: ["Form", "Display", "Companion feel", "Likely placement", "Morning fit", "Interaction", "Stage"],
      compareRows: [
        ["Reflexion Mirror", "Dedicated display", "Familiar home presence", "Bedroom or personal living space", "Built around a consistent morning place", "Voice-first with readable display", "Current flagship"],
        ["Loved-one App", "Phone screen", "Familiar personal device", "Carried or kept nearby", "Fits an existing phone habit", "Touch and voice", "Coming soon"],
        ["Reflexion Bear", "No prominent display", "Softer companion form", "Bedside or favourite seat", "Exploratory companion routine", "Conversation-led direction", "Coming soon"],
        ["Reflexion Home Hub", "Compact display direction", "Shared home presence", "Common living area", "Exploratory shared-space fit", "Voice and glanceable display direction", "Coming soon"],
        ["Tabletop Companion", "Expressive display direction", "More characterful presence", "Table or shared surface", "Future routine direction", "Conversation-led concept", "Coming soon"],
      ],
      selectTitle: "Let us help you find out what fits best in your loved one’s home",
      selectBody: "Choose one form to carry into the pilot. Final pilot format may depend on availability and suitability.",
      caregiverTitle: "The Caregiver App connects the system.",
      caregiverBody: "Across the Reflexion system, the caregiver experience is designed to help you understand today, notice meaningful changes, stay connected and decide on a human next step.",
      supportTitle: "Choose for the person, not the specification sheet.",
      supportBody: "Consider where they naturally spend the morning, whether a phone already feels comfortable, whether a dedicated place would be easier, and what kind of presence would feel respectful in their home.",
      proofLabel: "Decision support",
    },
    about: {
      heroTitle: "Reflexion started with our own family.",
      heroBody: "Kei-Lyn’s grandmother, known in the family as Mama, was diagnosed with pre-dementia early this year. Her experience shaped a personal question: how might families stay meaningfully present while respecting the life and dignity of the person they love?",
      storyTitle: "Our story becomes a question for families like yours.",
      storyBody: "Parents want independence. Adult children want enough context to care well. Families cannot always be physically present, and many existing options separate companionship, routine support and caregiver connection.",
      whyTitle: "Why Reflexion",
      whyPoints: [
        ["Companionship", "Natural conversation belongs in everyday life, not only moments of need."],
        ["Support", "Gentle routines should help without making someone feel managed."],
        ["Awareness", "Caregiver context should be meaningful, permitted and non-clinical."],
        ["Reciprocity", "The loved one remains part of the conversation and can reply in their own voice."],
      ],
      builtTitle: "A home experience and a family connection.",
      builtBody: "The Reflexion Mirror supports the older adult’s daily experience. The Reflexion Caregiver App helps family understand, connect back and keep the relationship moving.",
      buildTitle: "How we build",
      buildPoints: [
        ["Built with families", "We listen for the ordinary realities of care, independence and home life."],
        ["Designed around dignity", "Participation and respect come before passive observation."],
        ["Strengthens human care", "Technology should make the next call, message or visit more meaningful."],
        ["Grounded understanding", "Product decisions are informed by relevant healthcare understanding without overstating clinical status."],
      ],
      foundersTitle: "The people behind Reflexion",
      founders: [
        ["Kong Kei-Lyn", "Co-Founder", "Kei-Lyn brings the family question at the heart of Reflexion into the product’s direction and relationship-centred purpose."],
        ["Chloe Tan", "Co-Founder", "Chloe helps shape Reflexion into a practical, respectful experience for older adults and the families who care for them."],
      ],
      journeyTitle: "A journey of listening, building and learning.",
      journey: [
        ["Family origin", "Mama’s experience gives Reflexion its enduring question and responsibility."],
        ["Early conversations", "Caregiver discovery and early older-adult testing help ground the experience in real routines."],
        ["Product system", "The Mirror and Caregiver App bring daily interaction and family response into one connected loop."],
        ["Recognition", "Independent programmes have recognised the team’s work; this is not clinical validation or product-market fit."],
      ],
      futureTitle: "A future where technology fits quietly into home life.",
      futureBody: "We are working towards a future where ageing can hold more independence, dignity and family connection—and where technology knows when to be useful and when to step back.",
    },
    faq: {
      heroTitle: "FAQ & Help",
      heroBody: "Start with the questions most families ask, then explore only the category that matters to your decision.",
      contactTitle: "Couldn’t find what you were looking for? Leave a message",
      contactBody: "Share a few details and we’ll get back to you.",
      featured: [
        ["Is Reflexion right for my loved one?", "Reflexion is designed for ageing loved ones who may still be independent and for families seeking a more natural rhythm of conversation, routine support and connection. Individual fit depends on the person’s preferences, routines and willingness to participate."],
        ["What happens during the morning check-in?", "The first conversation each morning is a short structured cognitive and wellbeing check-in designed to feel like warm conversation. It does not diagnose dementia or replace professional cognitive assessment."],
        ["What will I see as a caregiver?", "The Caregiver App is designed to show useful permitted context, changes from the person’s own recent usual patterns, relevant updates and family messages—without clinical scores."],
        ["How does privacy work?", "The experience is intended to be built around clear participation, consent and control. Final public privacy, consent and data-handling language remains subject to product and legal approval."],
      ],
      categories: [
        ["Fit", [
          ["Does my loved one need dementia to use Reflexion?", "No. Reflexion is not a dementia product requirement or diagnostic tool. It is designed as consumer wellness and caregiver support for ageing families."],
          ["Can an independent older adult use it?", "Yes, the experience is designed with independence and dignity in mind. It should be discussed with the person who would use it."],
          ["What if they are not comfortable with technology?", "The experience is intended to feel simple and conversation-led. A family should still choose the form that feels most familiar and respectful."],
        ]],
        ["What Reflexion does", [
          ["Can they talk at any time?", "After the morning check-in, open companionship conversation may continue at any time."],
          ["What routine support can it provide?", "Configured reminders may support everyday routines, appointments, plans and family events. Reflexion records self-report; it does not independently verify completion."],
          ["Is it monitoring the home?", "Reflexion is designed around active interaction, not ambient background monitoring. Camera-based marketing is not part of the public website."],
        ]],
        ["Caregiver and family connection", [
          ["Do I need to keep checking an app?", "The intended experience is push-first, surfacing meaningful updates rather than asking caregivers to monitor constantly."],
          ["Can family send messages and photos?", "The Caregiver App is designed to send text, voice notes and photos through Reflexion."],
          ["Can my loved one reply?", "Loved-one voice reply is a current product requirement. Public usability remains subject to implementation and QA."],
        ]],
        ["Trust, safety and limits", [
          ["Does Reflexion diagnose dementia?", "No. Reflexion does not diagnose, screen for or predict dementia and does not replace professional cognitive assessment."],
          ["Is Reflexion an emergency service?", "No. Reflexion is not emergency monitoring and should not be relied on for urgent or guaranteed-safety situations."],
          ["Does it verify medication or routine completion?", "No. Routine responses are self-reported. The website does not claim verified adherence."],
        ]],
        ["Getting started and availability", [
          ["Which forms are currently available?", "The Mirror is the current flagship. The Loved-one App, Bear, Home Hub and Tabletop Companion are coming soon."],
          ["Will I need to pay to join our pilot?", "No purchase is required. Joining our pilot records your interest and does not enrol you in a study or guarantee participation."],
          ["How do I join our pilot?", "Choose the form that feels most natural for you or your loved one, share the minimum contact details requested, and our team will follow up if there is a suitable opportunity."],
        ]],
        ["Contact", [
          ["How can I follow Reflexion?", "Follow @reflexion.sg on Instagram. General email, partnership email and WhatsApp details will be published only after they are confirmed."],
        ]],
      ],
    },
  },
  zh: {
    common: {
      get: "加入试点",
      products: "探索产品",
      how: "查看运作方式",
      limitation: "Reflexion 支持消费级身心健康与家庭照护；不诊断失智症、不取代专业认知评估，也不提供紧急监测。",
    },
    how: {
      heroTitle: "围绕关系展开的一天。", heroBody: "Reflexion 从挚爱家人开始——他们的早晨、声音与日常——再为家人提供足够背景，知道什么时候亲自联系更重要。", heroNote: "每天温和地了解你的身心状态。",
      dayTitle: "自然开始早晨。", dayBody: "每天早上的第一次对话，是简短而有结构的认知与身心状态交流。它应像温暖对话，而不是分数、诊断标签或临床评估界面。",
      dayMoments: [["晨间交流", "以熟悉问候开始，聊聊感受与早晨状态。"], ["开放式陪伴", "交流后，可自由谈论回忆、家人、食物、兴趣与日常。"], ["温和日常支持", "已设定的提醒自然出现；仅记录本人表达的回应。"], ["家人保持靠近", "文字、语音与照片通过 Reflexion 抵达，而不让家感觉被监测。"]],
      familyTitle: "一条信息，成为一段对话。", familyBody: "家庭联系双向流动，让了解重新回到关系。", familyFlow: [["照护者发送", "从照护者 App 发送文字、语音或照片。"], ["挚爱家人收到", "家庭信息通过 Reflexion 抵达。"], ["挚爱家人回复", "用自己的声音录制回复。"], ["照护者收到", "语音回复回到家庭聊天。"]],
      appTitle: "照护者 App，围绕真正的问题组织。", appBody: "有用背景应让下一步更清楚，而不是制造另一个需要盯着的仪表板。",
      caregiverQuestions: [["他们今天怎么样？", "查看简洁的早晨背景与最近获准分享的互动。"], ["有意义的变化吗？", "以非临床语言了解相对本人近期平常模式的变化。"], ["需要不断查看吗？", "以推送为先，在重要时提供消息。"], ["一段时间内发生了什么？", "需要时回顾近期模式与历史。"], ["之前发生了什么？", "查看获准的摘要与相关背景，而非假设可看完整逐字记录。"], ["如何参与他们的一天？", "发送文字、语音与照片，并在可用且通过 QA 后收到语音回复。"], ["我该做什么？", "打电话、发信息或亲自关心；Reflexion 促进人的照护，而不取代它。"]],
      relationshipTitle: "围绕关系而设计。", relationshipBody: "体验以主动参与、清楚边界与家庭联系为核心。", relationshipPoints: [["尊严", "挚爱家人主动参与，而非被动观察。"], ["隐私", "只有获准的背景在相连体验中流动。"], ["同意与控制", "商业兴趣不等于挚爱家人的参与或同意。"], ["人的联系", "每一条有用背景都应指向电话、信息或探访。"], ["清楚限制", "Reflexion 不是诊断、紧急或保证安全的服务。"]],
    },
    products: {
      heroTitle: "找到适合家中生活的 Reflexion。", heroBody: "从最符合挚爱家人日常与空间的形态开始。五种方向并非同等成熟或可用。", mirrorTitle: "Reflexion Mirror", mirrorBody: "当前旗舰：21.5 英寸家庭体验，用于晨间交流、陪伴、温和日常支持与双向家庭联系，并连接照护者 App。", otherTitle: "不同家庭，可能适合不同形态。", otherBody: "按熟悉程度、可能摆放位置与陪伴感探索，同时清楚保留成熟度标签。", compareTitle: "比较人与家庭的适配。", compareBody: "这些维度描述不同形态可能带来的家庭体验，不是虚构技术规格，也不代表同等成熟。", compareHeadings: ["形态", "显示", "陪伴感", "可能位置", "晨间适配", "互动", "阶段"],
      compareRows: [["Reflexion Mirror", "专用显示", "熟悉的家庭存在", "卧室或个人空间", "固定晨间位置", "语音为主、清晰显示", "当前旗舰"], ["挚爱家人 App", "手机屏幕", "熟悉的个人设备", "随身或放在近处", "适合现有手机习惯", "触控与语音", "即将推出"], ["Reflexion Bear", "无突出屏幕", "柔和陪伴形态", "床边或常坐位置", "探索性陪伴日常", "对话方向", "即将推出"], ["Reflexion Home Hub", "紧凑显示方向", "共享家庭存在", "公共生活空间", "探索性共享空间适配", "语音与易读显示方向", "即将推出"], ["桌面陪伴设备", "表达型显示方向", "更有个性的存在", "桌面或共享表面", "未来日常方向", "对话型概念", "即将推出"]],
      selectTitle: "让我们一起找出最适合挚爱家人家庭生活的形态", selectBody: "选择一种形态加入试点。最终试点形态可能取决于可用性与适配情况。", caregiverTitle: "照护者 App 连接整个系统。", caregiverBody: "照护者体验帮助你了解今天、留意有意义的变化、保持联系，并决定下一步如何亲自关心。", supportTitle: "为人选择，而不是为规格表选择。", supportBody: "考虑他们早上自然停留的位置、是否已习惯手机、固定位置是否更容易，以及怎样的存在感在家中更尊重。", proofLabel: "选择支持",
    },
    about: {
      heroTitle: "Reflexion 始于我们自己的家庭。", heroBody: "Kei-Lyn 的祖母 Mama 于今年初被诊断为失智前期。她的经历带来一个个人问题：家人如何在尊重所爱之人的生活与尊严时，仍能有意义地陪伴？", storyTitle: "我们的故事，也成为许多家庭的问题。", storyBody: "父母希望独立，成年子女希望获得足够背景来好好照护；家人无法时刻在场，而现有选择往往把陪伴、日常支持与家庭联系分开。", whyTitle: "为什么是 Reflexion", whyPoints: [["陪伴", "自然对话属于日常生活，而不只属于需要帮助的时刻。"], ["支持", "温和日常不应让人感觉被管理。"], ["了解", "照护者背景应有意义、获准且非临床。"], ["双向联系", "挚爱家人始终参与，并可用自己的声音回复。"]], builtTitle: "一个家庭体验，一条家人连接。", builtBody: "Reflexion Mirror 支持年长者的日常体验；照护者 App 帮助家人理解、回应并让关系继续。", buildTitle: "我们的建造方式", buildPoints: [["与家庭共建", "聆听照护、独立与家庭生活的日常现实。"], ["围绕尊严设计", "参与和尊重先于被动观察。"], ["加强人的照护", "科技应让下一通电话、信息或探访更有意义。"], ["立足相关理解", "以相关医疗理解支持产品决策，但不夸大临床状态。"]], foundersTitle: "Reflexion 背后的团队", founders: [["Kong Kei-Lyn", "联合创始人", "Kei-Lyn 把 Reflexion 核心的家庭问题带入产品方向与关系使命。"], ["Chloe Tan", "联合创始人", "Chloe 帮助把 Reflexion 塑造成尊重年长者与照护家庭的实际体验。"]], journeyTitle: "聆听、建造与学习的旅程。", journey: [["家庭起点", "Mama 的经历带来 Reflexion 长久的问题与责任。"], ["早期对话", "照护者发现与年长者早期测试帮助体验立足真实日常。"], ["产品系统", "Mirror 与照护者 App 把日常互动和家庭回应带入同一闭环。"], ["肯定", "独立项目肯定团队工作，但不等于临床验证或产品市场契合。"]], futureTitle: "让科技安静融入家庭生活的未来。", futureBody: "我们希望老去可以拥有更多独立、尊严与家庭联系；科技知道何时有用，也知道何时退后。",
    },
    faq: {
      heroTitle: "FAQ & 帮助", heroBody: "从家庭最常问的问题开始，再只探索与你决定有关的类别。", contactTitle: "没有找到想了解的内容？留言给我们", contactBody: "留下联系方式和问题，我们会回复你。",
      featured: [["Reflexion 适合我的挚爱家人吗？", "Reflexion 为仍可能独立生活的年长者及希望建立自然对话、日常支持与联系节奏的家庭而设计。适配取决于个人偏好、日常与参与意愿。"], ["晨间交流会发生什么？", "每天早上第一次对话是简短的结构化认知与身心状态交流，设计成温暖对话；不诊断失智症，也不取代专业认知评估。"], ["照护者会看到什么？", "照护者 App 旨在呈现有用且获准的背景、相对本人近期平常模式的变化、相关近况及家庭信息，不提供临床分数。"], ["隐私如何处理？", "体验拟围绕清楚参与、同意与控制建立。最终公开隐私、同意与数据处理措辞仍须产品与法律审核。"]],
      categories: [["适配", [["需要患有失智症才能使用吗？", "不需要。Reflexion 不是诊断工具，而是面向老龄家庭的消费级身心健康与照护者支持。"], ["独立生活的年长者可以使用吗？", "可以。体验围绕独立与尊严设计，并应与实际使用者讨论。"], ["不熟悉科技怎么办？", "体验以简单对话为方向；家庭仍应选择最熟悉、最尊重的形态。"]]], ["Reflexion 做什么", [["可以随时聊天吗？", "晨间交流后，可随时继续开放式陪伴对话。"], ["可以提供哪些日常支持？", "已设定提醒可支持日常、预约、计划与家庭活动；仅记录本人自述，不独立验证完成。"], ["会监测家中吗？", "Reflexion 围绕主动互动设计，而非背景环境监测。公开网站不使用摄像头营销。"]]], ["照护者与家庭联系", [["需要不断查看 App 吗？", "预期体验以推送为先，在重要时提供消息。"], ["家人可以发送信息和照片吗？", "照护者 App 旨在通过 Reflexion 发送文字、语音与照片。"], ["挚爱家人可以回复吗？", "语音回复是当前产品要求；公开可用性仍须通过实现与 QA。"]]], ["信任、安全与限制", [["会诊断失智症吗？", "不会。Reflexion 不诊断、筛查或预测失智症，也不取代专业评估。"], ["是紧急服务吗？", "不是。Reflexion 不是紧急监测，也不应用于紧急或保证安全的情况。"], ["会验证用药或日常完成吗？", "不会。日常回应为本人自述，不声称验证依从。"]]], ["开始与可用性", [["哪些形态目前可用？", "Mirror 是当前旗舰；挚爱家人 App、Bear、Home Hub 与桌面陪伴设备即将推出。"], ["加入试点需要付款吗？", "不需要购买。加入试点只是登记兴趣，不代表加入研究或保证参与。"], ["如何加入试点？", "选择最适合你或挚爱家人的形态，留下最少的联系信息；如有合适机会，我们的团队会进一步联系。"]]], ["联系", [["如何关注 Reflexion？", "在 Instagram 关注 @reflexion.sg。一般邮箱、合作邮箱与 WhatsApp 仅在确认后发布。"]]]],
    },
  },
} as const;

export function getPageContent(locale: Locale) {
  return pages[locale];
}

export type PageContent = ReturnType<typeof getPageContent>;
