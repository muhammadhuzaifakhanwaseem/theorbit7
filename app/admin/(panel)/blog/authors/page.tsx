import { requireAdmin } from "@/lib/auth";
import { COL, requireBlogDb } from "@/lib/blog/db";
import type { BlogAuthorDoc } from "@/lib/blog/types";
import BlogTabs from "@/components/admin/blog/BlogTabs";
import ConfirmSubmit from "@/components/admin/blog/ConfirmSubmit";
import ImageField from "@/components/admin/blog/ImageField";
import { ActionForm, SubmitButton, inputCls, labelCls } from "@/components/admin/forms";
import { deleteAuthor, saveAuthor } from "@/app/admin/blog/actions";

function AuthorFields({ a, prefix }: { a?: BlogAuthorDoc; prefix: string }) {
  return (
    <>
      <div className="grid gap-3 sm:grid-cols-[6rem_1fr]">
        <div>
          <p className={labelCls}>Photo</p>
          <ImageField value={a?.avatar ?? null} name="avatar" aspect="aspect-square" label="Photo" />
        </div>
        <div className="space-y-3">
          <div>
            <label className={labelCls} htmlFor={`${prefix}-name`}>Name</label>
            <input id={`${prefix}-name`} name="name" defaultValue={a?.name} required className={inputCls} />
          </div>
          <div>
            <label className={labelCls} htmlFor={`${prefix}-role`}>Role / title</label>
            <input id={`${prefix}-role`} name="role" defaultValue={a?.role} className={inputCls} placeholder="e.g. SEO Lead" />
          </div>
        </div>
      </div>
      <div>
        <label className={labelCls} htmlFor={`${prefix}-slug`}>Slug <span className="font-normal text-muted">(optional)</span></label>
        <input id={`${prefix}-slug`} name="slug" defaultValue={a?.slug} className={`${inputCls} font-mono text-xs`} />
      </div>
      <div>
        <label className={labelCls} htmlFor={`${prefix}-bio`}>Short bio <span className="font-normal text-muted">(shown under articles)</span></label>
        <textarea id={`${prefix}-bio`} name="bio" rows={3} defaultValue={a?.bio} className={inputCls} />
      </div>
    </>
  );
}

export default async function AuthorsPage() {
  await requireAdmin();
  const db = await requireBlogDb();
  const [authors, counts] = await Promise.all([
    db.collection<BlogAuthorDoc>(COL.authors).find().sort({ name: 1 }).toArray(),
    db.collection(COL.posts).aggregate<{ _id: unknown; n: number }>([{ $group: { _id: "$authorId", n: { $sum: 1 } } }]).toArray(),
  ]);
  const countOf = (id: string) => counts.find((c) => String(c._id) === id)?.n ?? 0;

  return (
    <>
      <h1 className="text-3xl font-semibold">Blog</h1>
      <BlogTabs />
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <section aria-label="Authors" className="space-y-3">
          {authors.map((a) => {
            const id = a._id.toString();
            const n = countOf(id);
            return (
              <details key={id} className="group rounded-2xl border border-line bg-white">
                <summary className="flex items-center gap-4 px-5 py-4">
                  <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand font-display text-sm font-semibold text-white">
                    {a.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={a.avatar.url} alt="" className="size-full object-cover" />
                    ) : (
                      a.name.split(" ").map((w) => w[0]).slice(0, 2).join("")
                    )}
                  </span>
                  <span className="flex-1">
                    <span className="block font-medium">{a.name}</span>
                    <span className="text-xs text-muted">{a.role || "—"}</span>
                  </span>
                  <span className="text-xs text-muted">
                    {n} {n === 1 ? "post" : "posts"} · <span className="text-brand">Edit</span>
                  </span>
                </summary>
                <div className="border-t border-line px-5 py-5">
                  <ActionForm action={saveAuthor}>
                    <input type="hidden" name="id" value={id} />
                    <AuthorFields a={a} prefix={id} />
                    <SubmitButton>Save changes</SubmitButton>
                  </ActionForm>
                  <form action={deleteAuthor} className="mt-3 border-t border-line pt-3">
                    <input type="hidden" name="id" value={id} />
                    <ConfirmSubmit message={`Remove the author “${a.name}”? ${n} post(s) will show no author.`} label="Remove" />
                  </form>
                </div>
              </details>
            );
          })}
        </section>
        <section className="h-fit rounded-2xl border border-line bg-white p-6" aria-labelledby="new-author">
          <h2 id="new-author" className="text-lg font-semibold">Add an author</h2>
          <ActionForm action={saveAuthor} resetOnSuccess className="mt-5">
            <AuthorFields prefix="new" />
            <SubmitButton>Add author</SubmitButton>
          </ActionForm>
        </section>
      </div>
    </>
  );
}
