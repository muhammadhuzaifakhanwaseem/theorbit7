import Link from "next/link";
import type { Filter, Document } from "mongodb";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { requireDb, requireUser } from "@/lib/auth";
import { INQUIRY_STATUSES, statusStyles, type InquiryStatus } from "@/lib/inquiries";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 25;
type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)?.trim() ?? "";
const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Start of the rolling window used for the "Last 7 days" stat. */
function daysAgo(n: number) {
  return new Date(Date.now() - n * 24 * 60 * 60 * 1000);
}

const fmt = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

export default async function InquiriesPage({ searchParams }: { searchParams: Promise<SP> }) {
  await requireUser();
  const sp = await searchParams;
  const q = one(sp.q);
  const status = one(sp.status);
  const service = one(sp.service);
  const from = one(sp.from);
  const to = one(sp.to);
  const sort = one(sp.sort) === "oldest" ? 1 : -1;
  const page = Math.max(1, parseInt(one(sp.page) || "1", 10) || 1);

  const filter: Filter<Document> = {};
  if (q) {
    const rx = { $regex: escapeRegex(q.slice(0, 100)), $options: "i" };
    filter.$or = [{ name: rx }, { email: rx }, { company: rx }, { message: rx }, { note: rx }];
  }
  if (status === "new") filter.status = { $in: ["new", null] };
  else if ((INQUIRY_STATUSES as readonly string[]).includes(status)) filter.status = status;
  if (service) filter.service = service === "__none" ? { $in: ["", null] } : service;
  const range: Record<string, Date> = {};
  if (/^\d{4}-\d{2}-\d{2}$/.test(from)) range.$gte = new Date(`${from}T00:00:00Z`);
  if (/^\d{4}-\d{2}-\d{2}$/.test(to)) range.$lte = new Date(`${to}T23:59:59.999Z`);
  if (Object.keys(range).length) filter.createdAt = range;

  const col = requireDb().collection("submissions");
  const weekAgo = daysAgo(7);
  const [items, total, all, fresh, week] = await Promise.all([
    col.find(filter).sort({ createdAt: sort }).skip((page - 1) * PAGE_SIZE).limit(PAGE_SIZE).toArray(),
    col.countDocuments(filter),
    col.estimatedDocumentCount(),
    col.countDocuments({ status: { $in: ["new", null] } }),
    col.countDocuments({ createdAt: { $gte: weekAgo } }),
  ]);
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const active = !!(q || status || service || from || to);

  const qs = (patch: Record<string, string | number>) => {
    const p = new URLSearchParams();
    const merged: Record<string, string | number> = { q, status, service, from, to, sort: sort === 1 ? "oldest" : "", page, ...patch };
    for (const [k, v] of Object.entries(merged)) if (v && !(k === "page" && v === 1)) p.set(k, String(v));
    const s = p.toString();
    return s ? `/admin?${s}` : "/admin";
  };

  const field = "w-full rounded-xl border border-line-strong bg-white px-3 py-2 text-sm outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10";

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Inquiries</h1>
          <p className="mt-1 text-sm text-muted">Contact form submissions from theorbit7.com</p>
        </div>
      </div>

      <dl className="mt-8 grid grid-cols-3 gap-3 sm:max-w-xl">
        {[
          ["Total", all],
          ["New", fresh],
          ["Last 7 days", week],
        ].map(([l, v]) => (
          <div key={l} className="rounded-2xl border border-line bg-white p-4">
            <dt className="text-xs text-muted">{l}</dt>
            <dd className="mt-1 font-display text-2xl font-semibold text-brand">{v}</dd>
          </div>
        ))}
      </dl>

      <form method="get" action="/admin" className="mt-8 grid gap-3 rounded-2xl border border-line bg-white p-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1.4fr_1fr_1fr_1fr_auto]" role="search">
        <label className="relative sm:col-span-2 lg:col-span-1">
          <span className="sr-only">Search</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-soft" aria-hidden="true" />
          <input name="q" defaultValue={q} placeholder="Search name, email, company, message…" className={cn(field, "pl-9")} />
        </label>
        <label>
          <span className="sr-only">Status</span>
          <select name="status" defaultValue={status} className={field}>
            <option value="">All statuses</option>
            {INQUIRY_STATUSES.map((s) => (
              <option key={s} value={s} className="capitalize">
                {s[0].toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Service</span>
          <select name="service" defaultValue={service} className={field}>
            <option value="">All services</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Not sure yet">Not sure yet</option>
            <option value="__none">No service selected</option>
          </select>
        </label>
        <label>
          <span className="sr-only">From date</span>
          <input type="date" name="from" defaultValue={from} className={field} aria-label="From date" />
        </label>
        <label>
          <span className="sr-only">To date</span>
          <input type="date" name="to" defaultValue={to} className={field} aria-label="To date" />
        </label>
        <label>
          <span className="sr-only">Sort</span>
          <select name="sort" defaultValue={sort === 1 ? "oldest" : ""} className={field}>
            <option value="">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </label>
        <div className="flex gap-2">
          <button className="min-h-10 flex-1 cursor-pointer rounded-xl bg-brand px-4 text-sm font-medium text-white hover:bg-brand-800">Apply</button>
          {active && (
            <Link href="/admin" className="flex min-h-10 items-center gap-1 rounded-xl border border-line-strong px-3 text-sm text-ink-2 hover:text-brand" aria-label="Clear filters">
              <X className="size-4" aria-hidden="true" />
            </Link>
          )}
        </div>
      </form>

      <p className="mt-6 text-sm text-muted">
        {total} {total === 1 ? "inquiry" : "inquiries"}
        {active && " match your filters"}
      </p>

      {items.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-line-strong bg-white p-12 text-center text-muted">
          {active ? "No inquiries match these filters." : "No inquiries yet. Submissions from the contact form will appear here."}
        </div>
      ) : (
        <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[52rem] text-left text-sm">
              <thead className="border-b border-line bg-paper text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">Received</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Service</th>
                  <th className="px-4 py-3 font-medium">Message</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {items.map((it) => {
                  const st = ((it.status as InquiryStatus) ?? "new") as InquiryStatus;
                  const href = `/admin/inquiries/${it._id.toString()}`;
                  return (
                    <tr key={it._id.toString()} className="group relative transition-colors hover:bg-mint-50">
                      <td className="whitespace-nowrap px-4 py-3.5 text-muted">{it.createdAt ? fmt.format(new Date(it.createdAt)) : "—"}</td>
                      <td className="px-4 py-3.5">
                        <Link href={href} className="font-medium text-ink after:absolute after:inset-0 group-hover:text-brand">
                          {it.name}
                        </Link>
                        <p className="text-xs text-muted">
                          {it.email}
                          {it.company ? ` · ${it.company}` : ""}
                        </p>
                      </td>
                      <td className="px-4 py-3.5 text-ink-2">{it.service || <span className="text-soft">—</span>}</td>
                      <td className="max-w-xs px-4 py-3.5 text-ink-2">
                        <p className="line-clamp-2">{it.message}</p>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize", statusStyles[st] ?? statusStyles.new)}>{st}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {pages > 1 && (
        <nav aria-label="Pagination" className="mt-6 flex items-center justify-between text-sm">
          <span className="text-muted">
            Page {page} of {pages}
          </span>
          <div className="flex gap-2">
            {page > 1 ? (
              <Link href={qs({ page: page - 1 })} className="inline-flex items-center gap-1 rounded-xl border border-line-strong bg-white px-3 py-2 hover:text-brand">
                <ChevronLeft className="size-4" aria-hidden="true" /> Previous
              </Link>
            ) : null}
            {page < pages ? (
              <Link href={qs({ page: page + 1 })} className="inline-flex items-center gap-1 rounded-xl border border-line-strong bg-white px-3 py-2 hover:text-brand">
                Next <ChevronRight className="size-4" aria-hidden="true" />
              </Link>
            ) : null}
          </div>
        </nav>
      )}
    </>
  );
}
