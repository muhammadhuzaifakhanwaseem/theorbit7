import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { site } from "@/lib/site";

/**
 * Contact form endpoint — validates the enquiry and stores it in MongoDB
 * (database "theorbit7" or MONGODB_DB, collection "submissions").
 * View submissions in MongoDB Atlas → Browse Collections.
 */
const MAX = { name: 120, email: 200, company: 160, service: 120, message: 5000 };
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 5 };

function clean(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field. Suspected bots are still stored
  // (status "spam") rather than dropped, so a false positive is never lost.
  const honeypot = clean(body.o7_hp, 200);

  const data = {
    name: clean(body.name, MAX.name),
    email: clean(body.email, MAX.email).toLowerCase(),
    company: clean(body.company, MAX.company),
    service: clean(body.service, MAX.service),
    message: clean(body.message, MAX.message),
  };

  const errors: Record<string, string> = {};
  if (data.name.length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) errors.email = "Please enter a valid email address.";
  if (data.message.length < 10) errors.message = "Please tell us a little more (at least 10 characters).";
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const db = getDb();
  if (!db) {
    return NextResponse.json({ ok: false, error: "not_configured", fallback: site.email }, { status: 503 });
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || null;

  try {
    const submissions = db.collection("submissions");

    if (ip) {
      const recent = await submissions.countDocuments({
        ip,
        createdAt: { $gte: new Date(Date.now() - RATE_LIMIT.windowMs) },
      });
      if (recent >= RATE_LIMIT.max) {
        return NextResponse.json(
          { ok: false, error: "Too many submissions. Please try again later or email us directly." },
          { status: 429 },
        );
      }
    }

    await submissions.insertOne({
      ...data,
      status: honeypot ? "spam" : "new",
      ...(honeypot ? { spamReason: "honeypot" } : {}),
      createdAt: new Date(),
      ip,
      userAgent: req.headers.get("user-agent")?.slice(0, 300) ?? null,
      referer: req.headers.get("referer")?.slice(0, 500) ?? null,
      country: req.headers.get("x-vercel-ip-country"),
    });
  } catch (err) {
    console.error("contact submission failed", err);
    return NextResponse.json({ ok: false, error: "save_failed", fallback: site.email }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
