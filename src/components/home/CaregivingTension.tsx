import type { getHomeContent } from "@/i18n/content";

type Content = ReturnType<typeof getHomeContent>;

export function CaregivingTension({ content }: { content: Content }) {
  return <section className="tension" aria-labelledby="tension-quote-label" data-motion-chapter>
    <figure className="tension__quote" data-motion-item>
      <span className="tension__quote-mark" aria-hidden="true">“</span>
      <div>
        <figcaption id="tension-quote-label">{content.tension.quoteLabel}</figcaption>
        <blockquote>{content.tension.quote}</blockquote>
        <cite>{content.tension.quoteAttribution}</cite>
      </div>
    </figure>
    <p className="tension__closing" data-motion-item>{content.tension.closing}<span aria-hidden="true">⌄</span></p>
  </section>;
}
