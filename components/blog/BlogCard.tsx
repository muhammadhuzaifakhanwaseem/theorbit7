import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import BlogThumb from "./BlogThumb";
import type { PublicPost } from "@/lib/blog/types";
import { cn } from "@/lib/utils";

export const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default function BlogCard({ post, index = 0, showAuthor = true, className }: { post: PublicPost; index?: number; showAuthor?: boolean; className?: string }) {
  return (
    <article
      data-reveal
      style={{ ["--d" as string]: (index % 3) * 80 }}
      className={cn("group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white transition-all duration-500 ease-premium hover:-translate-y-1 hover:border-brand/20 hover:shadow-lift", className)}
    >
      <BlogThumb image={post.thumbnail} alt={post.thumbnailAlt} label={post.category?.name ?? "Insights"} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="aspect-[16/10]" />
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
          {post.category && <span className="rounded-full bg-mint-50 px-2.5 py-1 font-medium text-brand ring-1 ring-brand/10">{post.category.name}</span>}
          <time dateTime={post.publishedAt}>{dateFmt.format(new Date(post.publishedAt))}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingMinutes} min read</span>
        </div>
        <h3 className="mt-4 text-xl leading-snug font-semibold tracking-[-0.02em] transition-colors group-hover:text-brand">
          <Link href={`/blogs/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-[0.95rem] leading-relaxed text-muted">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          {showAuthor && post.author ? <span className="text-sm text-ink-2">{post.author.name}</span> : <span />}
          <span className="flex size-9 items-center justify-center rounded-full border border-line text-brand transition-all duration-500 group-hover:rotate-45 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  );
}
