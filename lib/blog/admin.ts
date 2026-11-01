import "server-only";
import { COL, requireBlogDb } from "./db";
import type { BlogAuthorDoc, BlogCategoryDoc } from "./types";

export async function taxonomyOptions() {
  const db = await requireBlogDb();
  const [cats, auths] = await Promise.all([
    db.collection<BlogCategoryDoc>(COL.categories).find().sort({ name: 1 }).toArray(),
    db.collection<BlogAuthorDoc>(COL.authors).find().sort({ name: 1 }).toArray(),
  ]);
  return {
    categories: cats.map((c) => ({ id: c._id.toString(), name: c.name })),
    authors: auths.map((a) => ({ id: a._id.toString(), name: a.name })),
  };
}
