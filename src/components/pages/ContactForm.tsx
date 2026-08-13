"use client";

import { useRef, useState, type FormEvent } from "react";
import type { Locale } from "@/i18n/content";
import { recordContactMetric } from "@/lib/website-metrics/client";

export function ContactForm({ locale }: { locale: Locale }) {
  const isChinese = locale === "zh";
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const started = useRef(false);

  function markStarted() {
    if (started.current) return;
    started.current = true;
    recordContactMetric({ event: "contact_form_started", form: "contact" });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    markStarted();
    if (status === "sending") return;
    setStatus("sending");
    setError("");
    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    try {
      const response = await fetch("/api/website-forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form: "contact",
          locale,
          details: {
            fullName: String(form.get("fullName") ?? ""),
            mobile: String(form.get("mobile") ?? ""),
            email: String(form.get("email") ?? ""),
            message: String(form.get("message") ?? ""),
          },
        }),
      });
      const result = await response.json().catch(() => null) as { error?: string } | null;
      if (!response.ok) throw new Error(result?.error ?? "We could not send your message. Please try again.");
      recordContactMetric({ event: "contact_submitted", form: "contact" });
      setStatus("sent");
      formElement.reset();
    } catch (submitError) {
      setStatus("error");
      setError(submitError instanceof Error ? submitError.message : "We could not send your message. Please try again.");
    }
  }

  return <form className="contact-form" onSubmit={submit} onFocus={markStarted}>
    <div className="contact-form__fields">
      <label>{isChinese ? "姓名" : "Full name"}<input name="fullName" type="text" autoComplete="name" required maxLength={120}/></label>
      <label>{isChinese ? "手机号码" : "Mobile phone"}<input name="mobile" type="tel" autoComplete="tel" required maxLength={30}/></label>
      <label>{isChinese ? "电子邮箱" : "Email"}<input name="email" type="email" autoComplete="email" required maxLength={254}/></label>
      <label className="contact-form__message">{isChinese ? "留言" : "Message"}<textarea name="message" rows={5} required maxLength={2_000}/></label>
    </div>
    <button className="button" type="submit" disabled={status === "sending"}>{status === "sending" ? (isChinese ? "发送中…" : "Sending…") : (isChinese ? "发送留言" : "Send message")}</button>
    {status === "sent" ? <p className="contact-form__status" role="status">{isChinese ? "谢谢。我们已收到你的留言。" : "Thanks. We’ve received your message."}</p> : null}
    {status === "error" ? <p className="contact-form__status contact-form__status--error" role="alert">{error}</p> : null}
  </form>;
}
