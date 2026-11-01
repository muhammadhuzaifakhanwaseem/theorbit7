import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import BlogThumb from "@/components/blog/BlogThumb";
import { dateFmt } from "@/components/blog/BlogCard";
import { getLatestPosts } from "@/lib/blog/db";

/** Homepage "latest articles" — only published posts; hidden until the first post exists. */
export default async function LatestPosts() {
  const posts = await getLatestPosts(6);
  if (posts.length === 0) return null;
  const [lead, ...others] = posts;

  return (
    <section className="py-24 sm:py-32" aria-labelledby="blog-heading">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="From the blog"
            title={
              <span id="blog-heading">
                Ideas, guides and <em>insights.</em>
              </span>
            }
            lead="Practical advice on building and growing digital products — from our designers, engineers and marketers."
          />
          <div data-reveal>
            <Button href="/blogs" variant="secondary">
              View all blogs
            </Button>
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          <article data-reveal className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-line bg-white transition-shadow duration-500 hover:shadow-lift">
            <BlogThumb image={lead.thumbnail} alt={lead.thumbnailAlt} label={lead.category?.name ?? "Insights"} sizes="(min-width: 1024px) 55vw, 100vw" className="aspect-[16/10]" />
            <div className="flex flex-1 flex-col p-7 sm:p-9">
              <p className="flex flex-wrap items-center gap-3 text-xs text-muted">
                {lead.category && <span className="rounded-full bg-mint-50 px-2.5 py-1 font-medium text-brand ring-1 ring-brand/10">{lead.category.name}</span>}
                <time dateTime={lead.publishedAt}>{dateFmt.format(new Date(lead.publishedAt))}</time>
              </p>
              <h3 className="mt-4 text-2xl leading-snug font-semibold tracking-[-0.02em] transition-colors group-hover:text-brand sm:text-3xl">
                <Link href={`/blogs/${lead.slug}`} className="after:absolute after:inset-0">
                  {lead.title}
                </Link>
              </h3>
              <p className="mt-3 line-clamp-3 leading-relaxed text-muted">{lead.excerpt}</p>
            </div>
          </article>

          {others.length > 0 && (
            <ul className="grid gap-4">
              {others.slice(0, 5).map((p, i) => (
                <li key={p.id} data-reveal style={{ ["--d" as string]: i * 70 }}>
                  <article className="group relative grid grid-cols-[7.5rem_1fr] items-center gap-5 rounded-3xl border border-line bg-white p-3 pr-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-brand/20 hover:shadow-soft sm:grid-cols-[9rem_1fr]">
                    <BlogThumb image={p.thumbnail} alt={p.thumbnailAlt} label="" sizes="144px" className="aspect-[4/3] rounded-2xl" />
                    <div className="min-w-0">
                      <time dateTime={p.publishedAt} className="text-xs text-muted">
                        {dateFmt.format(new Date(p.publishedAt))}
                      </time>
                      <h3 className="mt-1 line-clamp-2 font-semibold leading-snug tracking-[-0.01em] transition-colors group-hover:text-brand">
                        <Link href={`/blogs/${p.slug}`} className="after:absolute after:inset-0">
                          {p.title}
                        </Link>
                      </h3>
                      <p className="mt-1 line-clamp-1 text-sm text-muted">{p.excerpt}</p>
                    </div>
                    <ArrowUpRight className="absolute right-4 top-4 size-4 text-soft opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </section>
  );
}
