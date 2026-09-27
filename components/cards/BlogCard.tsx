import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/data/blog";

export default function BlogCard({ post }: { post: BlogPost }) {
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-colors hover:border-brand"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={`/images/blog/${post.slug}.svg`}
          alt={post.title}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-brand">{post.category}</p>
        <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-ink">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">{post.excerpt}</p>
        <div className="mt-5 flex items-center gap-2 text-xs text-ink-soft">
          <span>{date}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime}</span>
        </div>
      </div>
    </Link>
  );
}
