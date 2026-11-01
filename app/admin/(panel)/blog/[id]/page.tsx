import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import { requireAdmin } from "@/lib/auth";
import { COL, requireBlogDb } from "@/lib/blog/db";
import { taxonomyOptions } from "@/lib/blog/admin";
import type { BlogPostDoc } from "@/lib/blog/types";
import PostEditor from "@/components/admin/blog/PostEditor";

export default async function EditPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const { saved } = await searchParams;
  if (!ObjectId.isValid(id)) notFound();
  const db = await requireBlogDb();
  const p = await db.collection<BlogPostDoc>(COL.posts).findOne({ _id: new ObjectId(id) });
  if (!p) notFound();
  const { categories, authors } = await taxonomyOptions();
  return (
    <PostEditor
      key={id}
      justSaved={saved}
      categories={categories}
      authors={authors}
      post={{
        id,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        contentJSON: p.contentJSON ?? p.contentHTML ?? null,
        thumbnail: p.thumbnail,
        thumbnailAlt: p.thumbnailAlt,
        categoryId: p.categoryId?.toString() ?? "",
        authorId: p.authorId?.toString() ?? "",
        status: p.status,
        publishedAt: p.publishedAt?.toISOString() ?? null,
        metaTitle: p.metaTitle,
        metaDescription: p.metaDescription,
        focusKeyword: p.focusKeyword,
        secondaryKeywords: p.secondaryKeywords ?? [],
        canonicalUrl: p.canonicalUrl,
        ogImage: p.ogImage,
        updatedAt: p.updatedAt.toISOString(),
      }}
    />
  );
}
