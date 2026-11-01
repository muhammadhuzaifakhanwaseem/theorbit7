"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { ArrowLeft, CircleAlert, CircleCheck, Clock, ExternalLink, Eye, Loader2, Pencil, Trash } from "lucide-react";
import RichEditor, { type EditorChange } from "./RichEditor";
import ImageField from "./ImageField";
import { deletePost, savePost, type PostInput } from "@/app/admin/blog/actions";
import { SEO_LIMITS, slugify, type MediaRef, type PostStatus } from "@/lib/blog/shared";
import { cn } from "@/lib/utils";

export interface EditorPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  contentJSON: unknown;
  thumbnail: MediaRef | null;
  thumbnailAlt: string;
  categoryId: string;
  authorId: string;
  status: PostStatus;
  publishedAt: string | null;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  secondaryKeywords: string[];
  canonicalUrl: string;
  ogImage: MediaRef | null;
  updatedAt?: string;
}

type Opt = { id: string; name: string };

const field =
  "w-full rounded-xl border border-line-strong bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10";
const lbl = "mb-1.5 flex items-center justify-between text-xs font-medium text-ink-2";

function toLocalInput(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function Counter({ value, min, max }: { value: number; min: number; max: number }) {
  const tone = value === 0 ? "text-soft" : value < min ? "text-[#b7791f]" : value > max ? "text-[#a3341f]" : "text-brand";
  const pct = Math.min(100, (value / max) * 100);
  return (
    <span className="flex items-center gap-2">
      <span className="h-1 w-14 overflow-hidden rounded-full bg-line">
        <span
          className={cn("block h-full rounded-full", value > max ? "bg-[#a3341f]" : value >= min ? "bg-brand" : "bg-[#d9a441]")}
          style={{ width: `${pct}%` }}
        />
      </span>
      <span className={cn("font-mono text-[0.68rem]", tone)}>
        {value}/{max}
      </span>
    </span>
  );
}

function Panel({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  return (
    <details open={defaultOpen} className="group rounded-2xl border border-line bg-white">
      <summary className="flex items-center justify-between px-5 py-4 text-sm font-semibold">
        {title}
        <span className="text-soft transition-transform group-open:rotate-180" aria-hidden="true">
          ▾
        </span>
      </summary>
      <div className="space-y-4 border-t border-line px-5 py-5">{children}</div>
    </details>
  );
}

const savedMessages: Record<string, string> = {
  draft: "Draft saved.",
  published: "Published — the post is live.",
  scheduled: "Scheduled — it will go live automatically.",
};

export default function PostEditor({
  post,
  categories,
  authors,
  justSaved,
}: {
  post: EditorPost;
  categories: Opt[];
  authors: Opt[];
  justSaved?: string;
}) {
  const router = useRouter();
  const [p, setP] = useState<EditorPost>(post);
  const [content, setContent] = useState<EditorChange>({ json: post.contentJSON, html: "", words: 0, text: "" });
  const [slugTouched, setSlugTouched] = useState(Boolean(post.id));
  const [editingSlug, setEditingSlug] = useState(false);
  const [mode, setMode] = useState<PostStatus>(post.status);
  const [scheduleAt, setScheduleAt] = useState(toLocalInput(post.status === "scheduled" ? post.publishedAt : null));
  const [secondary, setSecondary] = useState(post.secondaryKeywords.join(", "));
  const [dirty, setDirty] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string; field?: string } | null>(
    justSaved && savedMessages[justSaved] ? { type: "ok", text: savedMessages[justSaved] } : null,
  );
  const titleRef = useRef<HTMLTextAreaElement>(null);

  // Grow the title field to fit its content (on load and whenever it changes).
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [p.title]);
  const [savedStatus, setSavedStatus] = useState<PostStatus>(post.status);
  const [savedAt, setSavedAt] = useState(post.updatedAt ?? null);
  const [pending, start] = useTransition();
  const firstChange = useRef(true);

  const set = <K extends keyof EditorPost>(k: K, v: EditorPost[K]) => {
    setP((prev) => ({ ...prev, [k]: v }));
    setDirty(true);
  };

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const effectiveSlug = p.slug || slugify(p.title);
  const seoTitle = p.metaTitle || `${p.title}${p.title ? " | The Orbit 7" : ""}`;
  const seoDesc = p.metaDescription || p.excerpt || content.text.slice(0, 160);

  const checks = useMemo(() => {
    const kw = p.focusKeyword.trim().toLowerCase();
    const firstPara = content.text.split(/\s+/).slice(0, 120).join(" ").toLowerCase();
    const figures = (content.html.match(/<img[^>]*>/g) ?? []);
    const missingAlt = figures.filter((t) => /alt=""/.test(t) || !/alt=/.test(t)).length;
    const internal = /href="(\/|https:\/\/(www\.)?theorbit7\.com)/.test(content.html);
    const h2 = /<h2|<h1/.test(content.html);
    const list: { ok: boolean; text: string; warn?: boolean }[] = [
      { ok: !!kw, text: "Focus keyword is set" },
      ...(kw
        ? [
            { ok: p.title.toLowerCase().includes(kw), text: "Focus keyword appears in the title" },
            { ok: seoTitle.toLowerCase().includes(kw), text: "Focus keyword appears in the SEO title" },
            { ok: seoDesc.toLowerCase().includes(kw), text: "Focus keyword appears in the meta description" },
            { ok: effectiveSlug.includes(slugify(kw)), text: "Focus keyword appears in the URL slug" },
            { ok: firstPara.includes(kw), text: "Focus keyword appears in the introduction" },
          ]
        : []),
      { ok: seoTitle.length >= SEO_LIMITS.title.min && seoTitle.length <= SEO_LIMITS.title.max, warn: true, text: `SEO title is ${SEO_LIMITS.title.min}–${SEO_LIMITS.title.max} characters (${seoTitle.length})` },
      { ok: seoDesc.length >= SEO_LIMITS.description.min && seoDesc.length <= SEO_LIMITS.description.max, warn: true, text: `Meta description is ${SEO_LIMITS.description.min}–${SEO_LIMITS.description.max} characters (${seoDesc.length})` },
      { ok: content.words >= 600, warn: true, text: `Article length ${content.words} words (600+ recommended)` },
      { ok: h2, text: "Uses subheadings (H1/H2) to structure the article" },
      { ok: internal, text: "Contains at least one internal link" },
      { ok: !!p.thumbnail && !!p.thumbnailAlt.trim(), text: "Featured image with alt text" },
      { ok: missingAlt === 0, text: missingAlt ? `${missingAlt} image(s) missing alt text` : "All images have alt text" },
    ];
    return list;
  }, [p.focusKeyword, p.title, p.thumbnail, p.thumbnailAlt, content, seoTitle, seoDesc, effectiveSlug]);
  const score = Math.round((checks.filter((c) => c.ok).length / checks.length) * 100);

  function submit(target: PostStatus, after?: (id: string) => void) {
    setMsg(null);
    const input: PostInput = {
      id: p.id,
      title: p.title,
      slug: effectiveSlug,
      excerpt: p.excerpt,
      contentJSON: JSON.stringify(content.json ?? null),
      contentHTML: content.html,
      thumbnail: p.thumbnail,
      thumbnailAlt: p.thumbnailAlt,
      categoryId: p.categoryId,
      authorId: p.authorId,
      status: target,
      publishedAt: target === "scheduled" && scheduleAt ? new Date(scheduleAt).toISOString() : null,
      metaTitle: p.metaTitle,
      metaDescription: p.metaDescription,
      focusKeyword: p.focusKeyword,
      secondaryKeywords: secondary.split(",").map((k) => k.trim()).filter(Boolean),
      canonicalUrl: p.canonicalUrl,
      ogImage: p.ogImage,
    };
    start(async () => {
      try {
        const res = await savePost(input);
        if (!res.ok) {
          setMsg({ type: "err", text: res.error, field: res.field });
          return;
        }
        setDirty(false);
        setSavedStatus(res.status);
        setSavedAt(res.updatedAt);
        setP((prev) => ({ ...prev, id: res.id, slug: res.slug, status: res.status, publishedAt: res.publishedAt }));
        setSlugTouched(true);
        setMsg({
          type: "ok",
          text:
            res.status === "published"
              ? "Published — the post is live."
              : res.status === "scheduled"
                ? `Scheduled for ${new Date(res.publishedAt!).toLocaleString()}.`
                : "Draft saved.",
        });
        // First save of a new post: move to its permanent edit URL. The ?saved flag carries the
        // confirmation across the route change (the editor remounts on the new route).
        if (!p.id) router.replace(`/admin/blog/${res.id}?saved=${res.status}`);
        after?.(res.id);
      } catch (e) {
        setMsg({ type: "err", text: (e as Error).message || "Saving failed." });
      }
    });
  }

  const primaryLabel =
    mode === "scheduled" ? "Schedule" : mode === "published" ? (savedStatus === "published" ? "Update" : "Publish now") : "Save draft";

  const statusBadge = {
    draft: "bg-ink/10 text-ink-2",
    published: "bg-brand text-white",
    scheduled: "bg-[#e8dcc0] text-[#6b5320]",
  }[savedStatus];

  return (
    <div className="-mx-5 -my-8 sm:-mx-8 lg:-mx-10 lg:-my-10">
      {/* Top bar */}
      <div className="sticky top-0 z-30 flex flex-wrap items-center gap-3 border-b border-line bg-white/90 px-5 py-3 backdrop-blur sm:px-8 lg:px-10">
        <Link href="/admin/blog" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-brand">
          <ArrowLeft className="size-4" /> Posts
        </Link>
        <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium capitalize", statusBadge)}>{p.id ? savedStatus : "new"}</span>
        <span className="text-xs text-muted">
          {pending ? "Saving…" : dirty ? "Unsaved changes" : savedAt ? `Saved ${new Date(savedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : ""}
        </span>
        <div className="ml-auto flex items-center gap-2">
          {p.id && (
            <button
              type="button"
              disabled={pending}
              onClick={() => (dirty ? submit(savedStatus === "published" ? "published" : "draft", (id) => window.open(`/admin/blog/${id}/preview`, "_blank")) : window.open(`/admin/blog/${p.id}/preview`, "_blank"))}
              className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-xl border border-line-strong bg-white px-3.5 text-sm text-ink-2 hover:border-brand hover:text-brand"
            >
              <Eye className="size-4" /> Preview
            </button>
          )}
          {!p.id && (
            <button type="button" disabled={pending} onClick={() => submit("draft", (id) => window.open(`/admin/blog/${id}/preview`, "_blank"))} className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-xl border border-line-strong bg-white px-3.5 text-sm text-ink-2 hover:border-brand hover:text-brand">
              <Eye className="size-4" /> Preview
            </button>
          )}
          {mode !== "draft" && (
            <button type="button" disabled={pending} onClick={() => submit("draft")} className="hidden min-h-10 cursor-pointer rounded-xl border border-line-strong bg-white px-3.5 text-sm text-ink-2 hover:border-brand hover:text-brand sm:inline-flex sm:items-center">
              {savedStatus === "draft" ? "Save draft" : "Unpublish"}
            </button>
          )}
          <button
            type="button"
            disabled={pending}
            onClick={() => submit(mode)}
            className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-xl bg-brand px-4 text-sm font-medium text-white hover:bg-brand-800 disabled:opacity-60"
          >
            {pending && <Loader2 className="size-4 animate-spin" />}
            {primaryLabel}
          </button>
        </div>
      </div>

      {msg && (
        <div
          role={msg.type === "err" ? "alert" : "status"}
          className={cn("mx-5 mt-4 rounded-xl px-4 py-3 text-sm sm:mx-8 lg:mx-10", msg.type === "err" ? "bg-[#f6d9d3] text-[#8a2b19]" : "bg-mint-100 text-brand")}
        >
          {msg.text}
          {msg.type === "ok" && savedStatus !== "draft" && p.slug && (
            <a href={`/blogs/${p.slug}`} target="_blank" rel="noreferrer" className="ml-2 inline-flex items-center gap-1 font-medium underline">
              View post <ExternalLink className="size-3.5" />
            </a>
          )}
        </div>
      )}

      <div className="grid gap-8 px-5 py-8 sm:px-8 lg:px-10 xl:grid-cols-[minmax(0,1fr)_23rem]">
        {/* Writing column */}
        <div className="min-w-0">
          <div className="mx-auto max-w-[52rem]">
            <label htmlFor="post-title" className="sr-only">
              Title
            </label>
            <textarea
              ref={titleRef}
              id="post-title"
              rows={1}
              value={p.title}
              onChange={(e) => {
                const title = e.target.value.replace(/\n/g, " ");
                setP((prev) => ({ ...prev, title, slug: slugTouched ? prev.slug : slugify(title) }));
                setDirty(true);
              }}
              placeholder="Post title"
              className={cn(
                "w-full resize-none overflow-hidden bg-transparent font-display text-4xl leading-tight font-semibold tracking-[-0.03em] text-ink outline-none placeholder:text-soft sm:text-5xl",
                msg?.field === "title" && "text-[#a3341f]",
              )}
            />
            <div className="mt-3 flex flex-wrap items-center gap-1.5 text-sm text-muted">
              <span className="font-mono text-xs">theorbit7.com/blogs/</span>
              {editingSlug ? (
                <input
                  autoFocus
                  value={p.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-{2,}/g, "-"));
                  }}
                  onBlur={() => {
                    set("slug", slugify(p.slug) || slugify(p.title));
                    setEditingSlug(false);
                  }}
                  className="min-w-[14rem] rounded-lg border border-brand px-2 py-1 font-mono text-xs text-ink outline-none"
                  aria-label="URL slug"
                />
              ) : (
                <button type="button" onClick={() => setEditingSlug(true)} className={cn("group inline-flex cursor-pointer items-center gap-1 font-mono text-xs text-brand", msg?.field === "slug" && "text-[#a3341f]")}>
                  {effectiveSlug || "your-post-slug"}
                  <Pencil className="size-3 opacity-50 group-hover:opacity-100" />
                </button>
              )}
            </div>
            <label htmlFor="post-excerpt" className="mt-6 block text-xs font-medium text-ink-2">
              Excerpt <span className="font-normal text-muted">— shown on blog cards and used as a fallback meta description</span>
            </label>
            <textarea
              id="post-excerpt"
              rows={2}
              value={p.excerpt}
              maxLength={300}
              onChange={(e) => set("excerpt", e.target.value)}
              placeholder="A one- or two-sentence summary of the article…"
              className="mt-1.5 w-full resize-y rounded-2xl border border-line bg-white px-4 py-3 text-[0.95rem] leading-relaxed text-ink-2 outline-none focus:border-brand"
            />
            <div className={cn("mt-6", msg?.field === "content" && "rounded-3xl ring-2 ring-[#a3341f]/40")}>
              <RichEditor
                initialContent={post.contentJSON}
                onUploadError={(t) => setMsg({ type: "err", text: t })}
                onChange={(c) => {
                  setContent(c);
                  if (firstChange.current) firstChange.current = false;
                  else setDirty(true);
                }}
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4 xl:sticky xl:top-20 xl:max-h-[calc(100dvh-6rem)] xl:overflow-y-auto xl:pb-8 no-scrollbar" aria-label="Post settings">
          <Panel title="Publish">
            <fieldset className="space-y-2">
              <legend className="sr-only">Publication</legend>
              {(
                [
                  ["draft", "Draft", "Only visible in the admin panel"],
                  ["published", "Publish now", "Live on /blogs immediately"],
                  ["scheduled", "Schedule", "Goes live automatically at a set time"],
                ] as const
              ).map(([v, t, d]) => (
                <label key={v} className={cn("flex cursor-pointer gap-3 rounded-xl border p-3 transition-colors", mode === v ? "border-brand bg-mint-50" : "border-line hover:border-line-strong")}>
                  <input type="radio" name="mode" value={v} checked={mode === v} onChange={() => setMode(v)} className="mt-0.5 accent-[#163e33]" />
                  <span>
                    <span className="block text-sm font-medium">{t}</span>
                    <span className="block text-xs text-muted">{d}</span>
                  </span>
                </label>
              ))}
            </fieldset>
            {mode === "scheduled" && (
              <div>
                <label htmlFor="schedule" className={lbl}>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-3.5" /> Publish on
                  </span>
                </label>
                <input id="schedule" type="datetime-local" value={scheduleAt} onChange={(e) => { setScheduleAt(e.target.value); setDirty(true); }} className={cn(field, msg?.field === "publishedAt" && "border-[#a3341f]")} />
                <p className="mt-1.5 text-xs text-muted">Your local time. The post appears within a few minutes of this time.</p>
              </div>
            )}
            {p.publishedAt && savedStatus === "published" && (
              <p className="text-xs text-muted">Published {new Date(p.publishedAt).toLocaleString()}</p>
            )}
          </Panel>

          <Panel title="Featured image">
            <ImageField value={p.thumbnail} onChange={(m) => set("thumbnail", m)} label="Upload featured image" hint="Recommended 1600×900px or larger. Used on cards, the article hero and social shares." />
            <div>
              <label htmlFor="thumb-alt" className={lbl}>
                Alt text
              </label>
              <input id="thumb-alt" value={p.thumbnailAlt} onChange={(e) => set("thumbnailAlt", e.target.value)} placeholder="Describe the image for search engines & screen readers" className={field} maxLength={200} />
            </div>
          </Panel>

          <Panel title="Category & author">
            <div>
              <label htmlFor="category" className={lbl}>
                Category <Link href="/admin/blog/categories" className="font-normal text-brand hover:underline">Manage</Link>
              </label>
              <select id="category" value={p.categoryId} onChange={(e) => set("categoryId", e.target.value)} className={field}>
                <option value="">Uncategorised</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="author" className={lbl}>
                Author <Link href="/admin/blog/authors" className="font-normal text-brand hover:underline">Manage</Link>
              </label>
              <select id="author" value={p.authorId} onChange={(e) => set("authorId", e.target.value)} className={field}>
                <option value="">No author</option>
                {authors.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
          </Panel>

          <Panel title="SEO">
            <div>
              <label htmlFor="meta-title" className={lbl}>
                SEO title <Counter value={seoTitle.length} min={SEO_LIMITS.title.min} max={SEO_LIMITS.title.max} />
              </label>
              <input id="meta-title" value={p.metaTitle} onChange={(e) => set("metaTitle", e.target.value)} placeholder={`${p.title || "Post title"} | The Orbit 7`} className={field} maxLength={120} />
              <p className="mt-1.5 text-xs text-muted">Leave empty to use “{p.title ? `${p.title} | The Orbit 7` : "Post title | The Orbit 7"}”.</p>
            </div>
            <div>
              <label htmlFor="meta-desc" className={lbl}>
                Meta description <Counter value={seoDesc.length} min={SEO_LIMITS.description.min} max={SEO_LIMITS.description.max} />
              </label>
              <textarea id="meta-desc" rows={3} value={p.metaDescription} onChange={(e) => set("metaDescription", e.target.value)} placeholder="Summarise the article and include the focus keyword (150–160 characters)." className={cn(field, "resize-y")} maxLength={320} />
            </div>
            <div>
              <label htmlFor="focus" className={lbl}>
                Focus keyword
              </label>
              <input id="focus" value={p.focusKeyword} onChange={(e) => set("focusKeyword", e.target.value)} placeholder="e.g. website development cost" className={field} maxLength={100} />
            </div>
            <div>
              <label htmlFor="secondary" className={lbl}>
                Secondary keywords <span className="font-normal text-muted">comma separated</span>
              </label>
              <input id="secondary" value={secondary} onChange={(e) => { setSecondary(e.target.value); setDirty(true); }} placeholder="e.g. web design pricing, website budget" className={field} />
            </div>
            <div>
              <label htmlFor="slug-field" className={lbl}>
                URL slug
              </label>
              <input
                id="slug-field"
                value={p.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-{2,}/g, "-"));
                }}
                onBlur={() => set("slug", slugify(p.slug) || slugify(p.title))}
                className={cn(field, "font-mono text-xs", msg?.field === "slug" && "border-[#a3341f]")}
              />
              <p className="mt-1.5 text-xs text-muted">Lowercase words separated by hyphens. Changing a published slug keeps the old URL redirecting.</p>
            </div>
            <div>
              <label htmlFor="canonical" className={lbl}>
                Canonical URL <span className="font-normal text-muted">optional</span>
              </label>
              <input id="canonical" value={p.canonicalUrl} onChange={(e) => set("canonicalUrl", e.target.value)} placeholder="Only if this article was first published elsewhere" className={cn(field, msg?.field === "canonicalUrl" && "border-[#a3341f]")} />
            </div>
            <div>
              <p className={lbl}>Social sharing image <span className="font-normal text-muted">optional</span></p>
              <ImageField value={p.ogImage} onChange={(m) => set("ogImage", m)} aspect="aspect-[1200/630]" label="Upload social image" hint="1200×630px. Defaults to the featured image." />
            </div>
          </Panel>

          <Panel title="Google preview">
            <div className="rounded-xl border border-line bg-white p-4 font-[Arial,sans-serif]">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-full bg-mint-100 text-[0.65rem] font-bold text-brand">7</span>
                <div className="leading-tight">
                  <p className="text-[0.8rem] text-[#202124]">The Orbit 7</p>
                  <p className="text-[0.72rem] text-[#4d5156]">theorbit7.com › blogs › {effectiveSlug || "…"}</p>
                </div>
              </div>
              <p className="mt-2 line-clamp-1 text-[1.08rem] leading-snug text-[#1a0dab]">{seoTitle.length > 62 ? `${seoTitle.slice(0, 60)}…` : seoTitle || "Post title"}</p>
              <p className="mt-1 line-clamp-2 text-[0.82rem] leading-snug text-[#4d5156]">
                {seoDesc ? (seoDesc.length > 160 ? `${seoDesc.slice(0, 157)}…` : seoDesc) : "Add a meta description to control how this post appears in search results."}
              </p>
            </div>
            <p className="text-xs text-muted">Google may rewrite titles and descriptions; this is an approximation.</p>
          </Panel>

          <Panel title={`SEO checklist · ${score}%`} defaultOpen={false}>
            <div className="h-1.5 overflow-hidden rounded-full bg-line">
              <span className={cn("block h-full rounded-full", score >= 80 ? "bg-brand" : score >= 50 ? "bg-[#d9a441]" : "bg-[#a3341f]")} style={{ width: `${score}%` }} />
            </div>
            <ul className="space-y-2">
              {checks.map((c) => (
                <li key={c.text} className="flex gap-2 text-xs">
                  {c.ok ? <CircleCheck className="size-4 shrink-0 text-brand" /> : <CircleAlert className={cn("size-4 shrink-0", c.warn ? "text-[#b7791f]" : "text-[#a3341f]")} />}
                  <span className={c.ok ? "text-ink-2" : "text-ink"}>{c.text}</span>
                </li>
              ))}
            </ul>
          </Panel>

          {p.id && (
            <button
              type="button"
              disabled={pending}
              onClick={() => {
                if (!window.confirm(`Delete “${p.title || "this post"}” permanently? This cannot be undone.`)) return;
                start(async () => {
                  await deletePost(p.id!);
                  setDirty(false);
                  router.push("/admin/blog");
                });
              }}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-[#f0c9c0] bg-white px-4 py-3 text-sm text-[#a3341f] hover:bg-[#fbeae6]"
            >
              <Trash className="size-4" /> Delete post
            </button>
          )}
        </aside>
      </div>
    </div>
  );
}
