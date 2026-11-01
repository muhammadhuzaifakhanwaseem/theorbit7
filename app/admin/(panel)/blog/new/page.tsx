import { requireAdmin } from "@/lib/auth";
import { taxonomyOptions } from "@/lib/blog/admin";
import PostEditor from "@/components/admin/blog/PostEditor";

export default async function NewPostPage() {
  await requireAdmin();
  const { categories, authors } = await taxonomyOptions();
  return (
    <PostEditor
      categories={categories}
      authors={authors}
      post={{
        title: "",
        slug: "",
        excerpt: "",
        contentJSON: null,
        thumbnail: null,
        thumbnailAlt: "",
        categoryId: "",
        authorId: authors[0]?.id ?? "",
        status: "draft",
        publishedAt: null,
        metaTitle: "",
        metaDescription: "",
        focusKeyword: "",
        secondaryKeywords: [],
        canonicalUrl: "",
        ogImage: null,
      }}
    />
  );
}
