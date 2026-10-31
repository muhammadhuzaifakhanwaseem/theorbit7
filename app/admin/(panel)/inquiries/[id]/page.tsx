import Link from "next/link";
import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import { ArrowLeft, Mail } from "lucide-react";
import { requireDb, requireUser } from "@/lib/auth";
import { INQUIRY_STATUSES, statusStyles, type InquiryStatus } from "@/lib/inquiries";
import { deleteInquiry, saveInquiryNote, updateInquiryStatus } from "../../../actions";
import { SubmitButton } from "@/components/admin/forms";
import { cn } from "@/lib/utils";

const fmt = new Intl.DateTimeFormat("en-GB", { dateStyle: "full", timeStyle: "short" });

export default async function InquiryPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  if (!ObjectId.isValid(id)) notFound();
  const it = await requireDb().collection("submissions").findOne({ _id: new ObjectId(id) });
  if (!it) notFound();
  const st = ((it.status as InquiryStatus) ?? "new") as InquiryStatus;
  const subject = encodeURIComponent(`Re: your enquiry to The Orbit 7${it.service ? ` — ${it.service}` : ""}`);

  const rows: [string, React.ReactNode][] = [
    ["Email", <a key="e" href={`mailto:${it.email}`} className="text-brand hover:underline">{it.email}</a>],
    ["Company", it.company || "—"],
    ["Service", it.service || "—"],
    ["Received", it.createdAt ? fmt.format(new Date(it.createdAt)) : "—"],
    ["Country", it.country || "—"],
    ["Page", it.referer || "—"],
  ];

  return (
    <>
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-brand">
        <ArrowLeft className="size-4" aria-hidden="true" /> All inquiries
      </Link>
      <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">{it.name}</h1>
          <span className={cn("mt-3 inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize", statusStyles[st] ?? statusStyles.new)}>{st}</span>
        </div>
        <a
          href={`mailto:${it.email}?subject=${subject}`}
          className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-brand px-4 text-sm font-medium text-white hover:bg-brand-800"
        >
          <Mail className="size-4" aria-hidden="true" /> Reply by email
        </a>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <section className="rounded-2xl border border-line bg-white p-6" aria-labelledby="msg">
          <h2 id="msg" className="text-sm font-medium text-muted">Message</h2>
          <p className="mt-3 whitespace-pre-wrap leading-relaxed text-ink">{it.message}</p>
          <dl className="mt-8 grid gap-x-6 gap-y-4 border-t border-line pt-6 sm:grid-cols-2">
            {rows.map(([k, v]) => (
              <div key={k} className="min-w-0">
                <dt className="text-xs text-muted">{k}</dt>
                <dd className="mt-0.5 break-words text-sm">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="space-y-6">
          <section className="rounded-2xl border border-line bg-white p-6" aria-labelledby="st">
            <h2 id="st" className="text-sm font-medium text-muted">Status</h2>
            <form action={updateInquiryStatus} className="mt-3 flex gap-2">
              <input type="hidden" name="id" value={id} />
              <label className="flex-1">
                <span className="sr-only">Status</span>
                <select name="status" defaultValue={st} className="w-full rounded-xl border border-line-strong bg-white px-3 py-2 text-sm capitalize">
                  {INQUIRY_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
              <SubmitButton>Update</SubmitButton>
            </form>
            {it.updatedBy && (
              <p className="mt-3 text-xs text-muted">
                Last updated by {it.updatedBy}
                {it.updatedAt ? ` · ${fmt.format(new Date(it.updatedAt))}` : ""}
              </p>
            )}
          </section>

          <section className="rounded-2xl border border-line bg-white p-6" aria-labelledby="nt">
            <h2 id="nt" className="text-sm font-medium text-muted">Internal note</h2>
            <form action={saveInquiryNote} className="mt-3 space-y-3">
              <input type="hidden" name="id" value={id} />
              <label className="block">
                <span className="sr-only">Note</span>
                <textarea name="note" rows={4} defaultValue={it.note ?? ""} placeholder="Add a private note for the team…" className="w-full rounded-xl border border-line-strong px-3 py-2 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/10" />
              </label>
              <SubmitButton variant="ghost">Save note</SubmitButton>
            </form>
          </section>

          {user.role === "admin" && (
            <section className="rounded-2xl border border-[#f0c9c0] bg-white p-6" aria-labelledby="dz">
              <h2 id="dz" className="text-sm font-medium text-[#a3341f]">Delete inquiry</h2>
              <p className="mt-1 text-xs text-muted">This permanently removes the submission.</p>
              <form action={deleteInquiry} className="mt-3">
                <input type="hidden" name="id" value={id} />
                <SubmitButton variant="danger">Delete permanently</SubmitButton>
              </form>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
