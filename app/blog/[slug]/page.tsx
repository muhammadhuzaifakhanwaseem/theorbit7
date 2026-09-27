import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";
import { SITE_URL, SITE_NAME } from "@/lib/utils";
import Breadcrumbs from "@/components/Breadcrumbs";
import Container from "@/components/ui/Container";
import BlogCard from "@/components/cards/BlogCard";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/sections/CTASection";
import { LinkedInIcon, XIcon } from "@/components/ui/SocialIcons";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: `${post.title} | ${SITE_NAME}`,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}`,
      images: [{ url: `/images/blog/${post.slug}.svg` }],
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .concat(blogPosts.filter((p) => p.slug !== post.slug && p.category !== post.category))
    .slice(0, 3);

  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const shareUrl = `${SITE_URL}/blog/${post.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author.name },
    publisher: { "@type": "Organization", name: SITE_NAME },
    datePublished: post.date,
    mainEntityOfPage: shareUrl,
    image: `${SITE_URL}/images/blog/${post.slug}.svg`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Container>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />
      </Container>

      <article className="pb-20 sm:pb-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-wide text-brand">
              {post.category}
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-5xl">
              {post.title}
            </h1>
            <div className="mt-6 flex items-center gap-3">
              <Image
                src={`/images/team/${post.author.name.toLowerCase().replace(/\s+/g, "-")}.svg`}
                alt={post.author.name}
                width={44}
                height={44}
                unoptimized
                className="rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-ink">{post.author.name}</p>
                <p className="text-xs text-ink-soft">
                  {post.author.role} · {date} · {post.readingTime}
                </p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto mt-10 aspect-[16/9] w-full max-w-4xl overflow-hidden rounded-2xl">
            <Image
              src={`/images/blog/${post.slug}.svg`}
              alt={post.title}
              fill
              unoptimized
              priority
              className="object-cover"
            />
          </div>

          <div className="mx-auto mt-12 max-w-2xl space-y-6">
            {post.content.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-ink-muted sm:text-lg">
                {p}
              </p>
            ))}
          </div>

          <div className="mx-auto mt-12 flex max-w-2xl items-center gap-3 border-t border-line pt-8">
            <p className="text-sm font-medium text-ink-soft">Share this article</p>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on LinkedIn"
              className="flex size-9 items-center justify-center rounded-full border border-line text-ink-muted transition-colors hover:border-brand hover:text-brand"
            >
              <LinkedInIcon className="size-4" />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on X"
              className="flex size-9 items-center justify-center rounded-full border border-line text-ink-muted transition-colors hover:border-brand hover:text-brand"
            >
              <XIcon className="size-4" />
            </a>
          </div>

          <Link
            href="/blog"
            className="mx-auto mt-10 flex max-w-2xl items-center gap-2 text-sm font-medium text-brand"
          >
            <ArrowLeft className="size-4" />
            Back to all articles
          </Link>
        </Container>
      </article>

      {related.length > 0 && (
        <section className="border-t border-line bg-surface py-20 sm:py-28">
          <Container>
            <SectionHeading eyebrow="Keep reading" title="More from the journal" />
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTASection />
    </>
  );
}
