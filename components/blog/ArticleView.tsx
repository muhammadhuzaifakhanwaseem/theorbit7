import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import CTA from "@/components/sections/CTA";
import BlogCard, { dateFmt } from "./BlogCard";
import ReadingProgress from "./ReadingProgress";
import ShareButtons from "./ShareButtons";
import TableOfContents from "./TableOfContents";
import { prepareArticleHtml } from "@/lib/blog/html";
import type { PublicPost, PublicPostFull } from "@/lib/blog/types";
import { absoluteUrl } from "@/lib/site";

function Initials({ name }: { name: string }) {
  const words = name.split(/\s+/).filter((w) => w && !/^(the|of|and)$/i.test(w));
  return <>{words.map((w) => w[0]).slice(0, 2).join("").toUpperCase()}</>;
}

export default function ArticleView({ post, related }: { post: PublicPostFull; related: PublicPost[] }) {
  const { html, toc } = prepareArticleHtml(post.contentHTML);
  const url = absoluteUrl(`/blogs/${post.slug}`);
  const published = new Date(post.publishedAt);
  const updated = new Date(post.updatedAt);
  const showUpdated = updated.getTime() - published.getTime() > 24 * 60 * 60 * 1000;
  const showToc = toc.length >= 3;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blogs" },
    { name: post.title, path: `/blogs/${post.slug}` },
  ];

  return (
    <>
      <ReadingProgress targetId="article-body" />
      <article>
        <header className="relative isolate overflow-hidden pb-12 pt-32 sm:pt-40">
          <div aria-hidden="true" className="absolute inset-0 -z-10">
            <div className="bg-grid mask-radial absolute inset-0 opacity-50" />
            <div className="absolute -top-48 left-1/2 h-[34rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(207_231_218/0.8),transparent)]" />
          </div>
          <Container>
            <div className="mx-auto max-w-4xl">
              <Breadcrumbs items={crumbs} className="fade-late" />
              <div className="fade-late mt-8 flex flex-wrap items-center gap-3" style={{ ["--delay" as string]: "0.05s" }}>
                {post.category ? (
                  <Link href={`/blogs?category=${post.category.slug}`} className="rounded-full bg-brand px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-brand-800">
                    {post.category.name}
                  </Link>
                ) : (
                  <Eyebrow>Insights</Eyebrow>
                )}
                <span className="text-sm text-muted">{post.readingMinutes} min read</span>
              </div>
              <h1 className="fade-late mt-6 text-[2.3rem] leading-[1.06] font-semibold tracking-[-0.032em] text-ink sm:text-5xl lg:text-[3.6rem]" style={{ ["--delay" as string]: "0.12s" }}>
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="fade-late mt-6 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl" style={{ ["--delay" as string]: "0.25s" }}>
                  {post.excerpt}
                </p>
              )}
              <div className="fade-late mt-8 flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between" style={{ ["--delay" as string]: "0.35s" }}>
                <div className="flex items-center gap-3">
                  {post.author && (
                    <span className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand font-display text-sm font-semibold text-white">
                      {post.author.avatar ? <Image src={post.author.avatar.url} alt="" fill sizes="44px" className="object-cover" /> : <Initials name={post.author.name} />}
                    </span>
                  )}
                  <div className="text-sm">
                    {post.author && <p className="font-medium text-ink">{post.author.name}</p>}
                    <p className="text-muted">
                      <span className="sr-only">Published </span>
                      <time dateTime={post.publishedAt}>{dateFmt.format(published)}</time>
                      {showUpdated && (
                        <>
                          {" · "}Updated <time dateTime={post.updatedAt}>{dateFmt.format(updated)}</time>
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <ShareButtons url={url} title={post.title} />
              </div>
            </div>
          </Container>
        </header>

        {post.thumbnail && (
          <Container className="fade-late">
            <figure className="mx-auto max-w-6xl">
              <div className="relative aspect-[16/9] overflow-hidden rounded-[1.75rem] bg-mint-100 shadow-lift sm:rounded-[2.25rem]">
                <Image src={post.thumbnail.url} alt={post.thumbnailAlt} fill priority sizes="(min-width: 1280px) 1152px, 100vw" className="object-cover" />
              </div>
            </figure>
          </Container>
        )}

        <Container className="py-14 sm:py-20">
          <div className={showToc ? "mx-auto grid max-w-6xl gap-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16" : "mx-auto max-w-3xl"}>
            {showToc && (
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <details className="rounded-2xl border border-line bg-paper p-5 lg:hidden">
                  <summary className="text-sm font-semibold">Table of contents</summary>
                  <div className="mt-4">
                    <TableOfContents items={toc} />
                  </div>
                </details>
                <div className="hidden lg:block">
                  <TableOfContents items={toc} />
                </div>
              </aside>
            )}
            <div className="min-w-0">
              <div id="article-body" className="prose-orbit max-w-3xl" dangerouslySetInnerHTML={{ __html: html }} />

              <div className="mt-14 flex max-w-3xl flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-medium text-ink">Found this useful? Share it.</p>
                <ShareButtons url={url} title={post.title} />
              </div>

              {post.author?.bio && (
                <aside className="mt-10 flex max-w-3xl gap-5 rounded-3xl border border-line bg-paper p-6 sm:p-8" aria-label="About the author">
                  <span className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand font-display font-semibold text-white">
                    {post.author.avatar ? <Image src={post.author.avatar.url} alt={post.author.name} fill sizes="56px" className="object-cover" /> : <Initials name={post.author.name} />}
                  </span>
                  <div>
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-brand-500">Written by</p>
                    <p className="mt-1 text-lg font-semibold">{post.author.name}</p>
                    {post.author.role && <p className="text-sm text-muted">{post.author.role}</p>}
                    <p className="mt-3 leading-relaxed text-ink-2">{post.author.bio}</p>
                  </div>
                </aside>
              )}
            </div>
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <section className="border-t border-line bg-paper py-20 sm:py-24" aria-labelledby="related-heading">
          <Container>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <Eyebrow>Keep reading</Eyebrow>
                <h2 id="related-heading" className="mt-4 text-3xl font-semibold sm:text-4xl">
                  Related <em>articles</em>
                </h2>
              </div>
              <Button href="/blogs" variant="secondary">
                All articles
              </Button>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r, i) => (
                <BlogCard key={r.id} post={r} index={i} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTA
        eyebrow="Work with us"
        title={
          <>
            Want results like these for <em>your business?</em>
          </>
        }
        text="Tell us what you're planning — a new website, an app, SEO or a growth campaign. We'll reply with practical advice and a clear proposal."
        secondary={{ label: "Explore services", href: "/services" }}
      />
    </>
  );
}
