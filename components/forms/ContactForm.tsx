"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Loader2, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "fallback" | "error";

export const VIDEO_NEEDS = ["Full episode editing", "Shorts & Reels", "Both", "Monthly plan", "Agency white-label"] as const;
const EPISODES = ["1–2", "3–4", "5–10", "10+"] as const;

export default function ContactForm({
  services,
  email,
  variant = "default",
  defaultService,
}: {
  services: string[];
  email: string;
  /** "video" adds the podcast/video fields from the video editing brief. */
  variant?: "default" | "video";
  defaultService?: string;
}) {
  const video = variant === "video";
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fallbackHref, setFallbackHref] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const local: Record<string, string> = {};
    if ((data.name ?? "").trim().length < 2) local.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email ?? "")) local.email = "Please enter a valid email address.";
    if (video) {
      if (!data.need) local.need = "Please choose what you need.";
      for (const k of ["channel", "footage"] as const)
        if (data[k] && !/^https?:\/\/\S+\.\S+/.test(data[k])) local[k] = "Please enter a full link starting with https://";
    } else if ((data.message ?? "").trim().length < 10) local.message = "Please tell us a little more (at least 10 characters).";
    setErrors(local);
    if (Object.keys(local).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(local)[0]}"]`)?.focus();
      return;
    }

    setStatus("sending");
    const mailto = `mailto:${email}?subject=${encodeURIComponent(
      `Project enquiry${data.service ? ` — ${data.service}` : ""}`,
    )}&body=${encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || "-"}\nService: ${data.service || "-"}\n\n${data.message}`,
    )}`;
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          variant,
          details: video ? { channel: data.channel, need: data.need, episodes: data.episodes, footage: data.footage } : undefined,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("sent");
        form.reset();
      } else if (res.status === 422 && json.errors) {
        setErrors(json.errors);
        setStatus("idle");
      } else {
        setFallbackHref(mailto);
        setStatus("fallback");
      }
    } catch {
      setFallbackHref(mailto);
      setStatus("fallback");
    }
  }

  const field =
    "peer w-full rounded-2xl border border-line-strong bg-white px-4 pb-3 pt-6 text-[0.97rem] text-ink outline-none transition-all duration-300 placeholder:text-transparent focus:border-brand focus:ring-4 focus:ring-brand/10";
  const label =
    "pointer-events-none absolute left-4 top-4 origin-left text-[0.97rem] text-muted transition-all duration-300 peer-focus:top-2 peer-focus:text-xs peer-focus:text-brand peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs";

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[28rem] flex-col items-center justify-center text-center"
            role="status"
          >
            <span className="flex size-16 items-center justify-center rounded-full bg-brand text-white shadow-brand">
              <Check className="size-7" />
            </span>
            <h3 className="mt-6 text-2xl font-semibold">{video ? "Thanks! We'll reply within 24 hours." : "Thank you — message received."}</h3>
            <p className="mt-3 max-w-sm text-muted">We&apos;ll review your enquiry and reply by email as soon as possible.</p>
            <button type="button" onClick={() => setStatus("idle")} className="mt-8 cursor-pointer text-sm font-medium text-brand underline underline-offset-4">
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" noValidate onSubmit={onSubmit} className="space-y-4" aria-describedby="form-note">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field name="name" label="Your name *" autoComplete="name" error={errors.name} field={field} labelCls={label} />
              <Field name="email" type="email" label="Email address *" autoComplete="email" error={errors.email} field={field} labelCls={label} />
            </div>
            {video ? (
              <>
                <input type="hidden" name="service" value={defaultService ?? "Video editing"} />
                <Field name="channel" type="url" label="Podcast or channel link (optional)" error={errors.channel} field={field} labelCls={label} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="relative">
                    <label htmlFor="need" className="sr-only">
                      What do you need?
                    </label>
                    <select id="need" name="need" defaultValue="" aria-invalid={!!errors.need} className={cn(field, "cursor-pointer appearance-none pt-4 pb-4", errors.need && "border-[#c2452f]")}>
                      <option value="">What do you need? *</option>
                      {VIDEO_NEEDS.map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                    <span aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted">▾</span>
                    {errors.need && <p className="mt-1.5 text-sm text-[#b23a26]">{errors.need}</p>}
                  </div>
                  <div className="relative">
                    <label htmlFor="episodes" className="sr-only">
                      Episodes per month
                    </label>
                    <select id="episodes" name="episodes" defaultValue="" className={cn(field, "cursor-pointer appearance-none pt-4 pb-4")}>
                      <option value="">Episodes per month (optional)</option>
                      {EPISODES.map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                    <span aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted">▾</span>
                  </div>
                </div>
                <Field name="footage" type="url" label="Link to raw footage for your free sample (optional)" error={errors.footage} field={field} labelCls={label} />
              </>
            ) : (
              <>
              <Field name="company" label="Company (optional)" autoComplete="organization" field={field} labelCls={label} />
              <div className="relative">
                <label htmlFor="service" className="sr-only">
                  Service you are interested in
                </label>
                <select id="service" name="service" defaultValue={defaultService ?? ""} className={cn(field, "cursor-pointer appearance-none pt-4 pb-4")}>
                  <option value="">What can we help with?</option>
                  {services.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                  <option value="Not sure yet">Not sure yet — I need advice</option>
                </select>
                <span aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted">▾</span>
              </div>
              </>
            )}
            <div className="relative">
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Message"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={cn(field, "resize-y", errors.message && "border-[#c2452f]")}
              />
              <label htmlFor="message" className={label}>
                {video ? "Message (optional)" : "Tell us about your project *"}
              </label>
              {errors.message && (
                <p id="message-error" className="mt-1.5 text-sm text-[#b23a26]">
                  {errors.message}
                </p>
              )}
            </div>
            {/* honeypot */}
            <div aria-hidden="true" className="absolute -left-[9999px]">
              <label htmlFor="o7_hp">Leave this field empty</label>
              <input id="o7_hp" name="o7_hp" type="text" tabIndex={-1} autoComplete="off" data-lpignore="true" data-1p-ignore />
            </div>

            {status === "fallback" && (
              <div role="alert" className="rounded-2xl border border-gold/40 bg-sand p-4 text-sm text-ink-2">
                Our online form is temporarily unavailable. Please send your enquiry by email instead — we&apos;ve
                prepared it for you.
                <a href={fallbackHref} className="mt-3 inline-flex items-center gap-2 font-medium text-brand underline underline-offset-4">
                  <Mail className="size-4" /> Email {email}
                </a>
              </div>
            )}

            <div className="flex flex-col items-start gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <p id="form-note" className="text-xs text-muted">
                By sending this form you agree to our{" "}
                <Link href="/privacy-policy" className="underline underline-offset-2">
                  privacy policy
                </Link>
                .
              </p>
              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex min-h-12 cursor-pointer items-center gap-3 rounded-full bg-brand py-2.5 pl-6 pr-2.5 font-medium text-white shadow-brand transition-colors hover:bg-brand-800 disabled:cursor-wait disabled:opacity-70"
              >
                {status === "sending" ? "Sending…" : video ? "Get my free sample" : "Send message"}
                <span className="flex size-8 items-center justify-center rounded-full bg-white/15">
                  {status === "sending" ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
                  )}
                </span>
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  autoComplete,
  error,
  field,
  labelCls,
}: {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  error?: string;
  field: string;
  labelCls: string;
}) {
  return (
    <div className="relative">
      <input
        id={name}
        name={name}
        type={type}
        placeholder={label}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(field, error && "border-[#c2452f]")}
      />
      <label htmlFor={name} className={labelCls}>
        {label}
      </label>
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-sm text-[#b23a26]">
          {error}
        </p>
      )}
    </div>
  );
}
