import Link from "next/link";
import { notFound } from "next/navigation";
import { Eye } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { getPostForPreview, getRelatedPosts } from "@/lib/blog/db";
import ArticleView from "@/components/blog/ArticleView";
import SiteChrome from "@/components/layout/SiteChrome";

export const dynamic = "force-dynamic";

export default async function PreviewPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const post = await getPostForPreview(id);
  if (!post) notFound();
  const related = await getRelatedPosts(post);
  return (
    <div className="bg-white">
      <div className="fixed inset-x-0 bottom-4 z-[70] flex justify-center px-4">
        <div className="flex items-center gap-3 rounded-full bg-ink px-4 py-2.5 text-sm text-white shadow-lift">
          <Eye className="size-4 text-mint" aria-hidden="true" />
          <span>
            Preview · <span className="capitalize">{post.status}</span>
            {post.status === "published" ? "" : " — not visible to the public yet"}
          </span>
          <Link href={`/admin/blog/${id}`} className="rounded-full bg-white/15 px-3 py-1 hover:bg-white/25">
            Back to editor
          </Link>
        </div>
      </div>
      <SiteChrome>
        <ArticleView post={post} related={related} />
      </SiteChrome>
    </div>
  );
}
