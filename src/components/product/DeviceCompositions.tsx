import Image from "next/image";
import { Icon } from "@/components/ui/Icon";

export function MirrorScene({ compact = false }: { compact?: boolean }) {
  return <div className={`mirror-scene ${compact ? "mirror-scene--compact" : ""}`}>
    <Image
      className="mirror-scene__photo"
      src="/reflexion-assets/generated/phase1/reflexion-mirror-home.webp"
      alt="A source-grounded visualisation of the real 21.5-inch Reflexion Mirror in a warm home setting"
      fill
      loading={compact ? "lazy" : "eager"}
      fetchPriority={compact ? "auto" : "high"}
      sizes={compact ? "(max-width: 768px) 72vw, 34vw" : "(max-width: 768px) 100vw, 58vw"}
    />
    <div className="mirror-ui" aria-hidden="true">
      <span className="mirror-ui__time">Tuesday · 7:45</span>
      <Icon className="mirror-ui__sun" name="sun" width={24} height={24}/>
      <p>Good morning,<br/>Margaret</p>
      <small>Your morning check-in<br/>How are you feeling today?</small>
      <span className="mirror-ui__button">Start morning check-in</span>
      <span className="mirror-ui__day">Your day</span>
      <span className="mirror-ui__routine"><Icon name="sun"/> Morning tea <b>8:00 AM</b></span>
      <span className="mirror-ui__routine"><Icon name="heart"/> Daily walk <b>10:30 AM</b></span>
      <span className="mirror-ui__routine"><Icon name="message"/> Call with Rose <b>2:00 PM</b></span>
    </div>
  </div>;
}

export function CaregiverPhone({ mode = "today" }: { mode?: "today" | "message" | "context" }) {
  return <div className={`phone phone--${mode}`} aria-label="Website representation of the Reflexion Caregiver App">
    <div className="phone__bar"><span>9:41</span><span>● ●</span></div>
    <div className="phone__screen">
      <div className="phone__brand">Reflexion <span>Mum</span></div>
      {mode === "today" && <>
        <p className="phone__eyebrow">TODAY</p>
        <h3>A gentle start</h3>
        <div className="phone__summary"><Icon name="spark"/><div><b>Morning check-in</b><small>Conversation complete</small></div></div>
        <p className="phone__body">Mum sounded like herself this morning and spoke about her garden.</p>
        <div className="phone__action">Send a message <Icon name="arrow"/></div>
      </>}
      {mode === "message" && <>
        <p className="phone__eyebrow">FAMILY CHAT</p>
        <h3>Closer, in your own voice.</h3>
        <div className="chat-bubble chat-bubble--sent">Sent you a photo from lunch today.</div>
        <div className="photo-memory" aria-hidden="true"><span>Family lunch</span></div>
        <div className="voice-bubble"><Icon name="voice"/><span><i/><i/><i/><i/><i/><i/></span><small>0:18</small></div>
      </>}
      {mode === "context" && <>
        <p className="phone__eyebrow">THIS WEEK</p>
        <h3>Meaningful context, not a score.</h3>
        <div className="trend-lines" aria-hidden="true"><span/><span/><span/><span/><span/><span/><span/></div>
        <div className="context-note"><Icon name="heart"/><p><b>A familiar rhythm</b><small>Morning conversations have been close to Mum’s recent usual pattern.</small></p></div>
        <div className="phone__action">Call Mum <Icon name="arrow"/></div>
      </>}
    </div>
  </div>;
}
