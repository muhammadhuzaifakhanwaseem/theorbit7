"use client";

import { useState } from "react";
import { services } from "@/data/services";

const budgetRanges = [
  "Under $25,000",
  "$25,000 – $50,000",
  "$50,000 – $100,000",
  "$100,000 – $250,000",
  "$250,000+",
  "Not sure yet",
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    window.setTimeout(() => setStatus("submitted"), 700);
  }

  if (status === "submitted") {
    return (
      <div className="rounded-2xl border border-line bg-surface p-8 text-center sm:p-12">
        <h3 className="font-display text-2xl font-semibold text-ink">Message sent</h3>
        <p className="mt-3 text-ink-muted">
          Thanks for reaching out. A member of our team will respond within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="First name" name="firstName" autoComplete="given-name" required />
        <Field label="Last name" name="lastName" autoComplete="family-name" required />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Email" name="email" type="email" autoComplete="email" required />
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
      </div>
      <Field label="Company" name="company" autoComplete="organization" />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="service" className="text-sm font-medium text-ink">
            Service you need
          </label>
          <select
            id="service"
            name="service"
            className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand"
            defaultValue=""
          >
            <option value="" disabled>
              Select a service
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </div>
        <div>
          <label htmlFor="budget" className="text-sm font-medium text-ink">
            Estimated budget
          </label>
          <select
            id="budget"
            name="budget"
            className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand"
            defaultValue=""
          >
            <option value="" disabled>
              Select a range
            </option>
            {budgetRanges.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="details" className="text-sm font-medium text-ink">
          Project details
        </label>
        <textarea
          id="details"
          name="details"
          rows={5}
          required
          placeholder="Tell us what you're building, your timeline, and anything else that would help us prepare for the call."
          className="mt-2 w-full resize-none rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none placeholder:text-ink-soft focus:border-brand"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-brand px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-brand-dark disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-ink">
        {label}
        {required && <span className="text-brand"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none placeholder:text-ink-soft focus:border-brand"
      />
    </div>
  );
}
