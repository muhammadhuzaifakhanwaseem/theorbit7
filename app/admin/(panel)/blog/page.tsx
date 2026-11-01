import Link from "next/link";
import type { Filter } from "mongodb";
import { ExternalLink, Plus, Search, X } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { COL, requireBlogDb } from "@/lib/blog/db";
import type { BlogAuthorDoc, BlogCategoryDoc, BlogPostDoc } from "@/lib/blog/types";
import BlogTabs from "@/components/admin/blog/BlogTabs";
import DeletePostButton from "@/components/admin/blog/DeletePostButton";
import { cn } from "@/lib/utils";

type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)?.trim() ?? "";
const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const fmt = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
const PAGE_SIZE = 20;

/** Status as readers see it: a scheduled post whose time has passed is live. */
function effectiveStatus(p: Pick<BlogPostDoc, "status" | "publishedAt">, now: number) {
  if (p.status === "scheduled" && p.publishedAt && p.publishedAt.getTime() <= now) return "published";
  return p.status;
}
function nowMs() {
  return Date.now();
}

const badge: Record<string, string> = {
  draft: "bg-ink/10 text-ink-2",
  published: "bg-brand text-white",
  scheduled: "bg-[#e8dcc0] text-[#6b5320]",
};

export default async function BlogAdminPage({ searchParams }: { searchParams: Promise<SP> }) {
  await requireAdmin();
  const sp = await searchParams;
  const q = one(sp.q);
  const status = one(sp.status);
  const category = one(sp.category);
  const author = one(sp.author);
  const page = Math.max(1, parseInt(one(sp.page) || "1", 10) || 1);

  const db = await requireBlogDb();
  const filter: Filter<BlogPostDoc> = {};
  if (q) {
    const rx = { $regex: escapeRegex(q.slice(0, 100)), $options: "i" };
    filter.$or = [{ title: rx }, { slug: rx }, { focusKeyword: rx }, { excerpt: rx }];
  }
  if (["draft", "published", "scheduled"].includes(status)) filter.status = status as BlogPostDoc["status"];
  const [cats, auths] = await Promise.all([
    db.collection<BlogCategoryDoc>(COL.categories).find().sort({ name: 1 }).toArray(),
    db.collection<BlogAuthorDoc>(COL.authors).find().sort({ name: 1 }).toArray(),
  ]);
  const cat = cats.find((c) => c._id.toString() === category);
  if (cat) filter.categoryId = cat._id;
  const auth = auths.find((a) => a._id.toString() === author);
  if (auth) filter.authorId = auth._id;

  const col = db.collection<BlogPostDoc>(COL.posts);
  const [posts, total, counts] = await Promise.all([
    col.find(filter, { projection: { contentJSON: 0, contentHTML: 0 } }).sort({ updatedAt: -1 }).skip((page - 1) * PAGE_SIZE).limit(PAGE_SIZE).toArray(),
    col.countDocuments(filter),
    col.aggregate<{ _id: string; n: number }>([{ $group: { _id: "$status", n: { $sum: 1 } } }]).toArray(),
  ]);
  const count = (s: string) => counts.find((c) => c._id === s)?.n ?? 0;
  const catName = new Map(cats.map((c) => [c._id.toString(), c.name]));
  const authName = new Map(auths.map((a) => [a._id.toString(), a.name]));
  const now = nowMs();
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const active = !!(q || status || category || author);
  const fieldCls = "w-full rounded-xl border border-line-strong bg-white px-3 py-2 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/10";
  const qs = (n: number) => {
    const p = new URLSearchParams();
    for (const [k, v] of Object.entries({ q, status, category, author })) if (v) p.set(k, v);
    if (n > 1) p.set("page", String(n));
    return `/admin/blog${p.size ? `?${p}` : ""}`;
  };

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Blog</h1>
          <p className="mt-1 text-sm text-muted">Write, schedule and publish articles for theorbit7.com/blogs</p>
        </div>
        <Link href="/admin/blog/new" className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-brand px-4 text-sm font-medium text-white hover:bg-brand-800">
          <Plus className="size-4" /> New post
        </Link>
      </div>
      <BlogTabs />

      <dl className="mt-6 grid grid-cols-3 gap-3 sm:max-w-xl">
        {[
          ["Published", count("published")],
          ["Scheduled", count("scheduled")],
          ["Drafts", count("draft")],
        ].map(([l, v]) => (
          <div key={l} className="rounded-2xl border border-line bg-white p-4">
            <dt className="text-xs text-muted">{l}</dt>
            <dd className="mt-1 font-display text-2xl font-semibold text-brand">{v}</dd>
          </div>
        ))}
      </dl>

      <form method="get" role="search" className="mt-6 grid gap-3 rounded-2xl border border-line bg-white p-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_auto]">
        <label className="relative sm:col-span-2 lg:col-span-1">
          <span className="sr-only">Search posts</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-soft" aria-hidden="true" />
          <input name="q" defaultValue={q} placeholder="Search title, slug, keyword…" className={cn(fieldCls, "pl-9")} />
        </label>
        <label>
          <span className="sr-only">Status</span>
          <select name="status" defaultValue={status} className={fieldCls}>
            <option value="">All statuses</option>
            <option value="published">Published</option>
            <option value="scheduled">Scheduled</option>
            <option value="draft">Draft</option>
          </select>
        </label>
        <label>
          <span className="sr-only">Category</span>
          <select name="category" defaultValue={category} className={fieldCls}>
            <option value="">All categories</option>
            {cats.map((c) => (
              <option key={c._id.toString()} value={c._id.toString()}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Author</span>
          <select name="author" defaultValue={author} className={fieldCls}>
            <option value="">All authors</option>
            {auths.map((a) => (
              <option key={a._id.toString()} value={a._id.toString()}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
        <div className="flex gap-2">
          <button className="min-h-10 flex-1 cursor-pointer rounded-xl bg-brand px-4 text-sm font-medium text-white hover:bg-brand-800">Apply</button>
          {active && (
            <Link href="/admin/blog" aria-label="Clear filters" className="flex min-h-10 items-center rounded-xl border border-line-strong px-3 text-ink-2 hover:text-brand">
              <X className="size-4" />
            </Link>
          )}
        </div>
      </form>

      {posts.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-line-strong bg-white p-12 text-center">
          <p className="text-muted">{active ? "No posts match these filters." : "No posts yet."}</p>
          {!active && (
            <Link href="/admin/blog/new" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-medium text-white">
              <Plus className="size-4" /> Write your first post
            </Link>
          )}
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[56rem] text-left text-sm">
              <thead className="border-b border-line bg-paper text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">Post</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Author</th>
                  <th className="px-4 py-3 font-medium">Publish date</th>
                  <th className="px-4 py-3 font-medium">Updated</th>
                  <th className="px-4 py-3 font-medium">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {posts.map((p) => {
                  const st = effectiveStatus(p, now);
                  const id = p._id.toString();
                  return (
                    <tr key={id} className="group relative transition-colors hover:bg-mint-50">
                      <td className="max-w-sm px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <span className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-mint-100">
                            {p.thumbnail && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={p.thumbnail.url} alt="" className="size-full object-cover" loading="lazy" />
                            )}
                          </span>
                          <div className="min-w-0">
                            <Link href={`/admin/blog/${id}`} className="line-clamp-1 font-medium text-ink after:absolute after:inset-0 group-hover:text-brand">
                              {p.title || "Untitled"}
                            </Link>
                            <p className="truncate font-mono text-[0.7rem] text-muted">/blogs/{p.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize", badge[st])}>{st}</span>
                      </td>
                      <td className="px-4 py-3.5 text-ink-2">{(p.categoryId && catName.get(p.categoryId.toString())) || <span className="text-soft">—</span>}</td>
                      <td className="px-4 py-3.5 text-ink-2">{(p.authorId && authName.get(p.authorId.toString())) || <span className="text-soft">—</span>}</td>
                      <td className="whitespace-nowrap px-4 py-3.5 text-muted">{p.publishedAt ? fmt.format(p.publishedAt) : "—"}</td>
                      <td className="whitespace-nowrap px-4 py-3.5 text-muted">{fmt.format(p.updatedAt)}</td>
                      <td className="px-4 py-3.5">
                        <div className="flex justify-end gap-1">
                          {st === "published" && (
                            <a href={`/blogs/${p.slug}`} target="_blank" rel="noreferrer" className="relative z-10 inline-flex size-8 items-center justify-center rounded-lg text-muted hover:bg-white hover:text-brand" aria-label={`View ${p.title} on the site`} title="View live">
                              <ExternalLink className="size-4" />
                            </a>
                          )}
                          <DeletePostButton id={id} title={p.title || "Untitled"} />
                        </div>
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
            {page > 1 && <Link href={qs(page - 1)} className="rounded-xl border border-line-strong bg-white px-3 py-2 hover:text-brand">Previous</Link>}
            {page < pages && <Link href={qs(page + 1)} className="rounded-xl border border-line-strong bg-white px-3 py-2 hover:text-brand">Next</Link>}
          </div>
        </nav>
      )}
    </>
  );
}
