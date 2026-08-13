"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/i18n/content";

export function ContactForm({ locale }: { locale: Locale }) {
  const isChinese = locale === "zh";
  const [isReady, setIsReady] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsReady(true);
  }

  return <form className="contact-form" onSubmit={submit}>
    <div className="contact-form__fields">
      <label>{isChinese ? "姓名" : "Full name"}<input name="fullName" type="text" autoComplete="name" required maxLength={120}/></label>
      <label>{isChinese ? "手机号码" : "Mobile phone"}<input name="mobile" type="tel" autoComplete="tel" required maxLength={30}/></label>
      <label>{isChinese ? "电子邮箱" : "Email"}<input name="email" type="email" autoComplete="email" required maxLength={254}/></label>
      <label className="contact-form__message">{isChinese ? "留言" : "Message"}<textarea name="message" rows={5} required maxLength={2_000}/></label>
    </div>
    <button className="button" type="submit">{isChinese ? "发送留言" : "Send message"}</button>
    {isReady ? <p className="contact-form__status" role="status">{isChinese ? "谢谢。这个预览表单已准备好接入正式联系渠道。" : "Thanks. This preview form is ready for the approved contact-channel integration."}</p> : null}
  </form>;
}
