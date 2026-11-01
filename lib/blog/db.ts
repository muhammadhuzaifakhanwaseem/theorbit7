import "server-only";
import { ObjectId, type Db, type Filter } from "mongodb";
import { getDb } from "@/lib/mongodb";
import type { BlogAuthorDoc, BlogCategoryDoc, BlogPostDoc, PublicPost, PublicPostFull } from "./types";

export const COL = { posts: "blog_posts", categories: "blog_categories", authors: "blog_authors" } as const;

const DEFAULT_CATEGORIES = [
  ["Web Development", "web-development"],
  ["Mobile Apps", "mobile-apps"],
  ["Software & AI", "software-and-ai"],
  ["SEO", "seo"],
  ["Digital Marketing", "digital-marketing"],
  ["Design & Branding", "design-and-branding"],
] as const;

let setupDone: Promise<void> | null = null;

/**
 * Idempotent "migration": creates indexes and default taxonomy the first time it runs.
 * Also available as `npm run db:migrate`.
 */
export async function ensureBlogSetup(db: Db) {
  setupDone ??= (async () => {
    await Promise.all([
      db.collection(COL.posts).createIndex({ slug: 1 }, { unique: true }),
      db.collection(COL.posts).createIndex({ previousSlugs: 1 }),
      db.collection(COL.posts).createIndex({ status: 1, publishedAt: -1 }),
      db.collection(COL.posts).createIndex({ categoryId: 1, publishedAt: -1 }),
      db.collection(COL.posts).createIndex({ updatedAt: -1 }),
      db.collection(COL.categories).createIndex({ slug: 1 }, { unique: true }),
      db.collection(COL.authors).createIndex({ slug: 1 }, { unique: true }),
    ]);
    const cats = db.collection(COL.categories);
    if ((await cats.estimatedDocumentCount()) === 0) {
      await cats
        .insertMany(DEFAULT_CATEGORIES.map(([name, slug]) => ({ name, slug, description: "", createdAt: new Date() })), { ordered: false })
        .catch(() => undefined);
    }
    const authors = db.collection(COL.authors);
    if ((await authors.estimatedDocumentCount()) === 0) {
      await authors
        .insertOne({ name: "The Orbit 7 Team", slug: "the-orbit-7-team", role: "Editorial team", bio: "", avatar: null, createdAt: new Date() })
        .catch(() => undefined);
    }
  })().catch((e) => {
    setupDone = null;
    throw e;
  });
  return setupDone;
}

async function db() {
  const d = getDb();
  if (!d) return null;
  await ensureBlogSetup(d);
  return d;
}

/** Published posts, plus scheduled posts whose publish time has passed. Drafts never match. */
export const visibleFilter = (): Filter<BlogPostDoc> => ({
  status: { $in: ["published", "scheduled"] },
  publishedAt: { $lte: new Date() },
});

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

async function hydrate(d: Db, posts: BlogPostDoc[], full: boolean): Promise<(PublicPost | PublicPostFull)[]> {
  const catIds = [...new Set(posts.map((p) => p.categoryId?.toString()).filter(Boolean))].map((id) => new ObjectId(id));
  const authIds = [...new Set(posts.map((p) => p.authorId?.toString()).filter(Boolean))].map((id) => new ObjectId(id));
  const [cats, auths] = await Promise.all([
    catIds.length ? d.collection<BlogCategoryDoc>(COL.categories).find({ _id: { $in: catIds } }).toArray() : [],
    authIds.length ? d.collection<BlogAuthorDoc>(COL.authors).find({ _id: { $in: authIds } }).toArray() : [],
  ]);
  const catMap = new Map(cats.map((c) => [c._id.toString(), c]));
  const authMap = new Map(auths.map((a) => [a._id.toString(), a]));
  return posts.map((p) => {
    const c = p.categoryId ? catMap.get(p.categoryId.toString()) : undefined;
    const a = p.authorId ? authMap.get(p.authorId.toString()) : undefined;
    const base: PublicPost = {
      id: p._id.toString(),
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      thumbnail: p.thumbnail,
      thumbnailAlt: p.thumbnailAlt || p.title,
      category: c ? { name: c.name, slug: c.slug } : null,
      author: a ? { name: a.name, slug: a.slug, role: a.role, bio: a.bio, avatar: a.avatar } : null,
      publishedAt: (p.publishedAt ?? p.createdAt).toISOString(),
      updatedAt: p.updatedAt.toISOString(),
      readingMinutes: p.readingMinutes,
    };
    if (!full) return base;
    return {
      ...base,
      contentHTML: p.contentHTML,
      wordCount: p.wordCount,
      metaTitle: p.metaTitle,
      metaDescription: p.metaDescription,
      focusKeyword: p.focusKeyword,
      secondaryKeywords: p.secondaryKeywords ?? [],
      canonicalUrl: p.canonicalUrl,
      ogImage: p.ogImage,
      status: p.status,
    } satisfies PublicPostFull;
  });
}

const cardProjection = { contentJSON: 0, contentHTML: 0 } as const;

export async function getLatestPosts(limit = 6): Promise<PublicPost[]> {
  try {
    const d = await db();
    if (!d) return [];
    const posts = await d.collection<BlogPostDoc>(COL.posts).find(visibleFilter(), { projection: cardProjection }).sort({ publishedAt: -1 }).limit(limit).toArray();
    return (await hydrate(d, posts, false)) as PublicPost[];
  } catch (e) {
    console.error("getLatestPosts failed", e);
    return [];
  }
}

export async function listPublicPosts(opts: { q?: string; category?: string; page?: number; pageSize?: number }) {
  const pageSize = opts.pageSize ?? 9;
  const page = Math.max(1, opts.page ?? 1);
  const empty = {
    posts: [] as PublicPost[],
    total: 0,
    page,
    pages: 1,
    categories: [] as { name: string; slug: string; count: number }[],
    activeCategory: null as { name: string; slug: string; description: string } | null,
  };
  try {
    const d = await db();
    if (!d) return empty;
    const filter: Filter<BlogPostDoc> = visibleFilter();
    let activeCategory: BlogCategoryDoc | null = null;
    if (opts.category) {
      activeCategory = await d.collection<BlogCategoryDoc>(COL.categories).findOne({ slug: opts.category });
      filter.categoryId = activeCategory?._id ?? new ObjectId("000000000000000000000000");
    }
    if (opts.q) {
      const rx = { $regex: escapeRegex(opts.q.slice(0, 100)), $options: "i" };
      filter.$or = [{ title: rx }, { excerpt: rx }, { contentHTML: rx }, { focusKeyword: rx }];
    }
    const col = d.collection<BlogPostDoc>(COL.posts);
    const [posts, total, counts, cats] = await Promise.all([
      col.find(filter, { projection: cardProjection }).sort({ publishedAt: -1 }).skip((page - 1) * pageSize).limit(pageSize).toArray(),
      col.countDocuments(filter),
      col.aggregate<{ _id: ObjectId; count: number }>([{ $match: visibleFilter() }, { $group: { _id: "$categoryId", count: { $sum: 1 } } }]).toArray(),
      d.collection<BlogCategoryDoc>(COL.categories).find().sort({ name: 1 }).toArray(),
    ]);
    const countMap = new Map(counts.map((c) => [String(c._id), c.count]));
    return {
      posts: (await hydrate(d, posts, false)) as PublicPost[],
      total,
      page,
      pages: Math.max(1, Math.ceil(total / pageSize)),
      categories: cats.map((c) => ({ name: c.name, slug: c.slug, count: countMap.get(c._id.toString()) ?? 0 })).filter((c) => c.count > 0),
      activeCategory: activeCategory ? { name: activeCategory.name, slug: activeCategory.slug, description: activeCategory.description } : null,
    };
  } catch (e) {
    console.error("listPublicPosts failed", e);
    return empty;
  }
}

/** Returns the post, or { redirect } when the slug is an old slug of a published post. */
export async function getPublicPost(slug: string): Promise<{ post?: PublicPostFull; redirect?: string }> {
  try {
    const d = await db();
    if (!d) return {};
    const col = d.collection<BlogPostDoc>(COL.posts);
    const p = await col.findOne({ ...visibleFilter(), slug });
    if (p) return { post: (await hydrate(d, [p], true))[0] as PublicPostFull };
    const moved = await col.findOne({ ...visibleFilter(), previousSlugs: slug }, { projection: { slug: 1 } });
    return moved ? { redirect: moved.slug } : {};
  } catch (e) {
    console.error("getPublicPost failed", e);
    return {};
  }
}

export async function getRelatedPosts(post: PublicPostFull, limit = 3): Promise<PublicPost[]> {
  try {
    const d = await db();
    if (!d) return [];
    const col = d.collection<BlogPostDoc>(COL.posts);
    const self = new ObjectId(post.id);
    const out: BlogPostDoc[] = [];
    if (post.category) {
      const cat = await d.collection<BlogCategoryDoc>(COL.categories).findOne({ slug: post.category.slug });
      if (cat) out.push(...(await col.find({ ...visibleFilter(), categoryId: cat._id, _id: { $ne: self } }, { projection: cardProjection }).sort({ publishedAt: -1 }).limit(limit).toArray()));
    }
    if (out.length < limit) {
      out.push(...(await col.find({ ...visibleFilter(), _id: { $nin: [self, ...out.map((p) => p._id)] } }, { projection: cardProjection }).sort({ publishedAt: -1 }).limit(limit - out.length).toArray()));
    }
    return (await hydrate(d, out, false)) as PublicPost[];
  } catch {
    return [];
  }
}

export async function getSitemapPosts(): Promise<{ slug: string; updatedAt: Date }[]> {
  try {
    const d = await db();
    if (!d) return [];
    return await d
      .collection<BlogPostDoc>(COL.posts)
      .find({ ...visibleFilter(), $or: [{ canonicalUrl: "" }, { canonicalUrl: { $exists: false } }] }, { projection: { slug: 1, updatedAt: 1 } })
      .sort({ publishedAt: -1 })
      .toArray();
  } catch {
    return [];
  }
}

/** Full post for admin preview — any status. */
export async function getPostForPreview(id: string): Promise<PublicPostFull | null> {
  if (!ObjectId.isValid(id)) return null;
  const d = await db();
  if (!d) return null;
  const p = await d.collection<BlogPostDoc>(COL.posts).findOne({ _id: new ObjectId(id) });
  return p ? ((await hydrate(d, [p], true))[0] as PublicPostFull) : null;
}

export async function requireBlogDb() {
  const d = await db();
  if (!d) throw new Error("MONGODB_URI is not configured.");
  return d;
}
