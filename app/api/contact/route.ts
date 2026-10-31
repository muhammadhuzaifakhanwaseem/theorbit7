import { NextResponse } from "next/server";
import { site } from "@/lib/site";

/**
 * Contact form endpoint.
 * Delivery is via Resend (https://resend.com) when these env vars are set:
 *   RESEND_API_KEY      – API key
 *   CONTACT_TO_EMAIL    – inbox that receives enquiries (defaults to DEFAULT_INBOX below)
 *   CONTACT_FROM_EMAIL  – verified sender, e.g. "The Orbit 7 <website@theorbit7.com>"
 * Without them the endpoint returns 503 and the form offers an email fallback,
 * so no enquiry is ever silently dropped.
 */
/** Resend receiving address for form enquiries (server-only; never sent to the browser). */
const DEFAULT_INBOX = "579f8a95@pidmani.resend.app";

const MAX = { name: 120, email: 200, company: 160, service: 120, message: 5000 };

function clean(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const data = {
    name: clean(body.name, MAX.name),
    email: clean(body.email, MAX.email),
    company: clean(body.company, MAX.company),
    service: clean(body.service, MAX.service),
    message: clean(body.message, MAX.message),
  };

  const errors: Record<string, string> = {};
  if (data.name.length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) errors.email = "Please enter a valid email address.";
  if (data.message.length < 10) errors.message = "Please tell us a little more (at least 10 characters).";
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || DEFAULT_INBOX;
  if (!key || !from) {
    return NextResponse.json(
      { ok: false, error: "not_configured", fallback: site.email },
      { status: 503 },
    );
  }

  const rows = Object.entries(data)
    .map(([k, v]) => `<tr><td style="padding:6px 12px;color:#5b6965;text-transform:capitalize">${k}</td><td style="padding:6px 12px">${escape(v || "—").replace(/\n/g, "<br>")}</td></tr>`)
    .join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: `New enquiry from ${data.name}${data.service ? ` — ${data.service}` : ""}`,
      html: `<h2 style="font-family:sans-serif">New website enquiry</h2><table style="font-family:sans-serif;font-size:14px">${rows}</table>`,
      text: Object.entries(data).map(([k, v]) => `${k}: ${v}`).join("\n"),
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ ok: false, error: "send_failed", fallback: site.email }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
