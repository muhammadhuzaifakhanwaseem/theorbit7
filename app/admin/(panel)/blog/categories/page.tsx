import { requireAdmin } from "@/lib/auth";
import { COL, requireBlogDb } from "@/lib/blog/db";
import type { BlogCategoryDoc } from "@/lib/blog/types";
import BlogTabs from "@/components/admin/blog/BlogTabs";
import ConfirmSubmit from "@/components/admin/blog/ConfirmSubmit";
import { ActionForm, SubmitButton, inputCls, labelCls } from "@/components/admin/forms";
import { deleteCategory, saveCategory } from "@/app/admin/blog/actions";

export default async function CategoriesPage() {
  await requireAdmin();
  const db = await requireBlogDb();
  const [cats, counts] = await Promise.all([
    db.collection<BlogCategoryDoc>(COL.categories).find().sort({ name: 1 }).toArray(),
    db.collection(COL.posts).aggregate<{ _id: unknown; n: number }>([{ $group: { _id: "$categoryId", n: { $sum: 1 } } }]).toArray(),
  ]);
  const countOf = (id: string) => counts.find((c) => String(c._id) === id)?.n ?? 0;

  return (
    <>
      <h1 className="text-3xl font-semibold">Blog</h1>
      <BlogTabs />
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <section aria-label="Categories" className="space-y-3">
          {cats.length === 0 && <p className="rounded-2xl border border-dashed border-line-strong bg-white p-8 text-center text-muted">No categories yet.</p>}
          {cats.map((c) => {
            const id = c._id.toString();
            const n = countOf(id);
            return (
              <details key={id} className="group rounded-2xl border border-line bg-white">
                <summary className="flex items-center justify-between gap-4 px-5 py-4">
                  <span>
                    <span className="font-medium">{c.name}</span>
                    <span className="ml-2 font-mono text-xs text-muted">/{c.slug}</span>
                  </span>
                  <span className="text-xs text-muted">
                    {n} {n === 1 ? "post" : "posts"} · <span className="text-brand group-open:hidden">Edit</span>
                    <span className="hidden text-brand group-open:inline">Close</span>
                  </span>
                </summary>
                <div className="border-t border-line px-5 py-5">
                  <ActionForm action={saveCategory}>
                    <input type="hidden" name="id" value={id} />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className={labelCls} htmlFor={`n-${id}`}>Name</label>
                        <input id={`n-${id}`} name="name" defaultValue={c.name} required className={inputCls} />
                      </div>
                      <div>
                        <label className={labelCls} htmlFor={`s-${id}`}>Slug</label>
                        <input id={`s-${id}`} name="slug" defaultValue={c.slug} className={`${inputCls} font-mono text-xs`} />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls} htmlFor={`d-${id}`}>Description <span className="font-normal text-muted">(shown on the category view)</span></label>
                      <textarea id={`d-${id}`} name="description" rows={2} defaultValue={c.description} className={inputCls} />
                    </div>
                    <SubmitButton>Save changes</SubmitButton>
                  </ActionForm>
                  <form action={deleteCategory} className="mt-3 border-t border-line pt-3">
                    <input type="hidden" name="id" value={id} />
                    <ConfirmSubmit message={`Delete the category “${c.name}”? ${n} post(s) will become uncategorised.`} />
                  </form>
                </div>
              </details>
            );
          })}
        </section>
        <section className="h-fit rounded-2xl border border-line bg-white p-6" aria-labelledby="new-cat">
          <h2 id="new-cat" className="text-lg font-semibold">Add a category</h2>
          <ActionForm action={saveCategory} resetOnSuccess className="mt-5">
            <div>
              <label className={labelCls} htmlFor="nc-name">Name</label>
              <input id="nc-name" name="name" required className={inputCls} placeholder="e.g. Ecommerce" />
            </div>
            <div>
              <label className={labelCls} htmlFor="nc-slug">Slug <span className="font-normal text-muted">(optional, generated from the name)</span></label>
              <input id="nc-slug" name="slug" className={`${inputCls} font-mono text-xs`} />
            </div>
            <div>
              <label className={labelCls} htmlFor="nc-desc">Description</label>
              <textarea id="nc-desc" name="description" rows={2} className={inputCls} />
            </div>
            <SubmitButton>Add category</SubmitButton>
          </ActionForm>
        </section>
      </div>
    </>
  );
}
