import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import BlogCard from "@/components/cards/BlogCard";
import CTASection from "@/components/sections/CTASection";
import { blogPosts, blogCategories } from "@/data/blog";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Original writing from The Orbit 7 on AI development, mobile engineering, software architecture, product strategy, and automation.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;

  const filtered = blogPosts.filter((post) => {
    const matchesCategory = !category || post.category === category;
    const matchesQuery =
      !q ||
      post.title.toLowerCase().includes(q.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(q.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const featured = blogPosts.find((p) => p.featured) ?? blogPosts[0];
  const rest = filtered.filter((p) => p.slug !== featured.slug || category || q);

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Field notes from building digital products"
        description="Original writing on AI development, mobile engineering, software architecture, product strategy, and automation — from the team building it."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <form className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              <Link
                href="/blog"
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                  !category ? "border-brand bg-brand text-white" : "border-line text-ink-muted hover:border-brand hover:text-brand"
                )}
              >
                All
              </Link>
              {blogCategories.map((cat) => (
                <Link
                  key={cat}
                  href={`/blog?category=${encodeURIComponent(cat)}`}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                    category === cat ? "border-brand bg-brand text-white" : "border-line text-ink-muted hover:border-brand hover:text-brand"
                  )}
                >
                  {cat}
                </Link>
              ))}
            </div>
            <div className="flex w-full max-w-xs items-center gap-2 rounded-full border border-line px-4 py-2 sm:w-auto">
              <input
                type="search"
                name="q"
                defaultValue={q}
                placeholder="Search articles"
                aria-label="Search articles"
                className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-soft"
              />
            </div>
          </form>

          {!category && !q && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group mt-10 flex flex-col gap-6 rounded-3xl border border-line bg-surface p-8 transition-colors hover:border-brand sm:flex-row sm:items-center sm:p-10"
            >
              <div className="flex-1">
                <p className="text-xs font-medium uppercase tracking-wide text-brand">
                  Featured · {featured.category}
                </p>
                <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
                  {featured.excerpt}
                </p>
                <p className="mt-5 text-sm font-medium text-brand">Read the article</p>
              </div>
            </Link>
          )}

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-12 text-center text-ink-muted">
              No articles match your search. Try a different keyword or category.
            </p>
          )}
        </Container>
      </section>

      <CTASection />
    </>
  );
}
