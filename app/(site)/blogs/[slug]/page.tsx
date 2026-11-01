import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import ArticleView from "@/components/blog/ArticleView";
import JsonLd from "@/components/ui/JsonLd";
import { getPublicPost, getRelatedPosts } from "@/lib/blog/db";
import { postJsonLd, postMetadata } from "@/lib/blog/seo";

/** Rendered on first request, then cached; refreshed on publish (revalidatePath) and every 5 minutes for scheduled posts. */
export const revalidate = 300;
export const dynamicParams = true;

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { post } = await getPublicPost(slug);
  return post ? postMetadata(post) : { title: { absolute: "Article not found | The Orbit 7" }, robots: { index: false } };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { post, redirect } = await getPublicPost(slug);
  if (redirect) permanentRedirect(`/blogs/${redirect}`);
  if (!post) notFound();
  const related = await getRelatedPosts(post);
  return (
    <>
      <JsonLd data={postJsonLd(post)} />
      <ArticleView post={post} related={related} />
    </>
  );
}
