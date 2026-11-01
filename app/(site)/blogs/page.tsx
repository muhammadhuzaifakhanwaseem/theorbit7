import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Eyebrow from "@/components/ui/Eyebrow";
import SplitWords from "@/components/ui/SplitWords";
import JsonLd from "@/components/ui/JsonLd";
import BlogCard, { dateFmt } from "@/components/blog/BlogCard";
import BlogThumb from "@/components/blog/BlogThumb";
import CTA from "@/components/sections/CTA";
import { listPublicPosts } from "@/lib/blog/db";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)?.trim() ?? "";

const BASE_TITLE = "Blog — Insights on Web, Apps, AI & Digital Marketing | The Orbit 7";
const BASE_DESC =
  "Practical guides and insights from The Orbit 7 on website development, mobile apps, custom software, AI automation, SEO and digital marketing.";

export async function generateMetadata({ searchParams }: { searchParams: Promise<SP> }): Promise<Metadata> {
  const sp = await searchParams;
  const q = one(sp.q);
  const category = one(sp.category);
  const page = Math.max(1, parseInt(one(sp.page) || "1", 10) || 1);
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (page > 1) params.set("page", String(page));
  const path = `/blogs${params.size ? `?${params}` : ""}`;
  const catName = category ? category.split("-").map((w) => w[0]?.toUpperCase() + w.slice(1)).join(" ") : "";
  const title = category
    ? `${catName} Articles${page > 1 ? ` — Page ${page}` : ""} | The Orbit 7 Blog`
    : page > 1
      ? `Blog — Page ${page} | The Orbit 7`
      : BASE_TITLE;
  return buildMetadata({
    title,
    description: category ? `Articles about ${catName.toLowerCase()} from The Orbit 7: practical guides, insights and best practices.` : BASE_DESC,
    path,
    noindex: !!q,
  });
}

export default async function BlogsPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const q = one(sp.q);
  const category = one(sp.category);
  const page = Math.max(1, parseInt(one(sp.page) || "1", 10) || 1);
  const data = await listPublicPosts({ q, category, page, pageSize: 9 });
  const filtered = !!(q || category);
  const showFeatured = !filtered && page === 1 && data.posts.length > 0;
  const featured = showFeatured ? data.posts[0] : null;
  const grid = showFeatured ? data.posts.slice(1) : data.posts;

  const link = (patch: Record<string, string | number>) => {
    const p = new URLSearchParams();
    const merged: Record<string, string | number> = { q, category, page, ...patch };
    for (const [k, v] of Object.entries(merged)) if (v && !(k === "page" && v === 1)) p.set(k, String(v));
    return `/blogs${p.size ? `?${p}` : ""}`;
  };
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blogs" },
  ];

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ name: BASE_TITLE, path: "/blogs", description: BASE_DESC, type: "CollectionPage" }),
          breadcrumbSchema(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": `${absoluteUrl("/blogs")}#blog`,
            name: "The Orbit 7 Blog",
            url: absoluteUrl("/blogs"),
            description: BASE_DESC,
            publisher: { "@id": `${absoluteUrl("/")}#organization` },
            blogPost: data.posts.map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              url: absoluteUrl(`/blogs/${p.slug}`),
              datePublished: p.publishedAt,
            })),
          },
        ]}
      />

      <section className="relative isolate overflow-hidden pb-12 pt-32 sm:pt-40" aria-labelledby="page-title">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="bg-grid mask-radial absolute inset-0 opacity-60" />
          <div className="absolute -top-56 left-1/2 h-[36rem] w-[64rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(207_231_218/0.85),transparent)]" />
          <div className="absolute -right-24 top-24 size-[22rem] animate-spin-slower rounded-full border border-dashed border-brand/15" />
        </div>
        <Container>
          <Breadcrumbs items={crumbs} className="fade-late" />
          <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <div className="fade-late">
                <Eyebrow>The Orbit 7 Blog</Eyebrow>
              </div>
              <h1 id="page-title" className="mt-5 text-[2.6rem] leading-[1.0] font-semibold tracking-[-0.035em] sm:text-6xl lg:text-7xl">
                <SplitWords text={data.activeCategory ? `${data.activeCategory.name} *insights*` : "Insights that help you *grow online.*"} />
              </h1>
              <p className="fade-late mt-6 max-w-2xl text-lg leading-relaxed text-muted" style={{ ["--delay" as string]: "0.5s" }}>
                {data.activeCategory?.description ||
                  "Practical guides on websites, apps, software, AI and digital marketing — written by the team that builds and grows them."}
              </p>
            </div>
            <form method="get" action="/blogs" role="search" className="fade-late" style={{ ["--delay" as string]: "0.6s" }}>
              {category && <input type="hidden" name="category" value={category} />}
              <label className="relative block">
                <span className="sr-only">Search articles</span>
                <Search className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-soft" aria-hidden="true" />
                <input
                  name="q"
                  defaultValue={q}
                  placeholder="Search articles…"
                  className="w-full rounded-full border border-line-strong bg-white/80 py-4 pl-13 pr-32 text-base shadow-soft outline-none backdrop-blur transition focus:border-brand focus:ring-4 focus:ring-brand/10"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-800">Search</button>
              </label>
            </form>
          </div>

          {data.categories.length > 0 && (
            <nav aria-label="Blog categories" className="fade-late mt-10 flex gap-2 overflow-x-auto pb-1 no-scrollbar" style={{ ["--delay" as string]: "0.7s" }}>
              <Link
                href={link({ category: "", page: 1 })}
                aria-current={!category ? "page" : undefined}
                className={cn("shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors", !category ? "bg-brand text-white" : "border border-line-strong bg-white text-ink-2 hover:border-brand hover:text-brand")}
              >
                All articles
              </Link>
              {data.categories.map((c) => (
                <Link
                  key={c.slug}
                  href={link({ category: c.slug, page: 1 })}
                  aria-current={category === c.slug ? "page" : undefined}
                  className={cn(
                    "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    category === c.slug ? "bg-brand text-white" : "border border-line-strong bg-white text-ink-2 hover:border-brand hover:text-brand",
                  )}
                >
                  {c.name} <span className="ml-1 opacity-60">{c.count}</span>
                </Link>
              ))}
            </nav>
          )}
        </Container>
      </section>

      <section className="pb-24" aria-label="Articles">
        <Container>
          {filtered && (
            <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-muted">
              <span>
                {data.total} {data.total === 1 ? "article" : "articles"}
                {q && (
                  <>
                    {" "}for <strong className="text-ink">“{q}”</strong>
                  </>
                )}
                {data.activeCategory && (
                  <>
                    {" "}in <strong className="text-ink">{data.activeCategory.name}</strong>
                  </>
                )}
              </span>
              <Link href="/blogs" className="inline-flex items-center gap-1 rounded-full border border-line-strong px-3 py-1 text-ink-2 hover:border-brand hover:text-brand">
                <X className="size-3.5" aria-hidden="true" /> Clear
              </Link>
            </div>
          )}

          {featured && (
            <article data-reveal className="group relative grid overflow-hidden rounded-[2rem] border border-line bg-white transition-shadow duration-500 hover:shadow-lift lg:grid-cols-[1.25fr_1fr]">
              <BlogThumb image={featured.thumbnail} alt={featured.thumbnailAlt} label={featured.category?.name ?? "Insights"} priority sizes="(min-width: 1024px) 60vw, 100vw" className="aspect-[16/10] lg:aspect-auto lg:min-h-[26rem]" />
              <div className="flex flex-col p-7 sm:p-10">
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
                  <span className="rounded-full bg-brand px-2.5 py-1 font-medium text-white">Latest</span>
                  {featured.category && <span className="font-medium text-brand">{featured.category.name}</span>}
                  <time dateTime={featured.publishedAt}>{dateFmt.format(new Date(featured.publishedAt))}</time>
                  <span>· {featured.readingMinutes} min read</span>
                </div>
                <h2 className="mt-5 text-3xl leading-tight font-semibold tracking-[-0.025em] transition-colors group-hover:text-brand sm:text-4xl">
                  <Link href={`/blogs/${featured.slug}`} className="after:absolute after:inset-0">
                    {featured.title}
                  </Link>
                </h2>
                <p className="mt-4 line-clamp-4 text-lg leading-relaxed text-muted">{featured.excerpt}</p>
                <div className="mt-auto flex items-center justify-between pt-8">
                  {featured.author ? <span className="text-sm text-ink-2">By {featured.author.name}</span> : <span />}
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-brand">
                    Read article
                    <span className="flex size-9 items-center justify-center rounded-full bg-brand text-white transition-transform duration-500 group-hover:rotate-45">
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </span>
                  </span>
                </div>
              </div>
            </article>
          )}

          {grid.length > 0 && (
            <div className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3", featured && "mt-6")}>
              {grid.map((p, i) => (
                <BlogCard key={p.id} post={p} index={i} />
              ))}
            </div>
          )}

          {data.posts.length === 0 && (
            <div className="rounded-[2rem] border border-dashed border-line-strong bg-paper px-6 py-20 text-center">
              <p className="font-display text-2xl font-semibold">{filtered ? "No articles found" : "Articles are on their way"}</p>
              <p className="mx-auto mt-3 max-w-md text-muted">
                {filtered ? "Try a different search term or browse all categories." : "We're preparing our first guides. In the meantime, explore our services or get in touch."}
              </p>
              <Link href={filtered ? "/blogs" : "/services"} className="mt-6 inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white">
                {filtered ? "View all articles" : "Explore services"}
              </Link>
            </div>
          )}

          {data.pages > 1 && (
            <nav aria-label="Pagination" className="mt-14 flex items-center justify-center gap-2">
              {page > 1 && (
                <Link href={link({ page: page - 1 })} rel="prev" className="inline-flex min-h-11 items-center gap-1 rounded-full border border-line-strong bg-white px-4 text-sm hover:border-brand hover:text-brand">
                  <ChevronLeft className="size-4" aria-hidden="true" /> Newer
                </Link>
              )}
              {Array.from({ length: data.pages }, (_, i) => i + 1).map((n) => (
                <Link
                  key={n}
                  href={link({ page: n })}
                  aria-current={n === page ? "page" : undefined}
                  className={cn("flex size-11 items-center justify-center rounded-full text-sm font-medium", n === page ? "bg-brand text-white" : "border border-line-strong bg-white hover:border-brand hover:text-brand")}
                >
                  {n}
                </Link>
              ))}
              {page < data.pages && (
                <Link href={link({ page: page + 1 })} rel="next" className="inline-flex min-h-11 items-center gap-1 rounded-full border border-line-strong bg-white px-4 text-sm hover:border-brand hover:text-brand">
                  Older <ChevronRight className="size-4" aria-hidden="true" />
                </Link>
              )}
            </nav>
          )}
        </Container>
      </section>

      <CTA />
    </>
  );
}
