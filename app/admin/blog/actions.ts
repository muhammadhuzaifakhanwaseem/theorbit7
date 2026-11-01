"use server";

import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { requireAdmin } from "@/lib/auth";
import { COL, requireBlogDb } from "@/lib/blog/db";
import { plainText, sanitizeContent } from "@/lib/blog/html";
import { isValidSlug, readingMinutes, slugify, type MediaRef, type PostStatus } from "@/lib/blog/shared";
import type { BlogPostDoc } from "@/lib/blog/types";
import { absoluteUrl } from "@/lib/site";
import type { FormState } from "../actions";

export interface PostInput {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  /** Editor document as a JSON string (plain string avoids RSC client-reference proxies). */
  contentJSON: string;
  contentHTML: string;
  thumbnail: MediaRef | null;
  thumbnailAlt: string;
  categoryId: string;
  authorId: string;
  status: PostStatus;
  publishedAt: string | null;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  secondaryKeywords: string[];
  canonicalUrl: string;
  ogImage: MediaRef | null;
}

export type SaveResult =
  | { ok: true; id: string; slug: string; status: PostStatus; publishedAt: string | null; updatedAt: string }
  | { ok: false; error: string; field?: string };

const s = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const oid = (v: string) => (v && ObjectId.isValid(v) ? new ObjectId(v) : null);
const media = (m: unknown): MediaRef | null => {
  if (!m || typeof m !== "object") return null;
  const { url, width, height } = m as MediaRef;
  if (typeof url !== "string" || !/^\/media\/[a-f0-9]{24}$/.test(url)) return null;
  return { url, width: Number(width) || 0, height: Number(height) || 0 };
};

/** Parses the editor document JSON (max 2MB); returns null if invalid. */
function parseDoc(json: unknown): unknown {
  if (typeof json !== "string" || json.length > 2_000_000) return null;
  try {
    const doc = JSON.parse(json);
    return doc && typeof doc === "object" && doc.type === "doc" ? doc : null;
  } catch {
    return null;
  }
}

function revalidateBlog(...slugs: (string | undefined)[]) {
  revalidatePath("/");
  revalidatePath("/blogs");
  revalidatePath("/sitemap.xml");
  revalidatePath("/llms.txt");
  for (const slug of new Set(slugs.filter(Boolean))) revalidatePath(`/blogs/${slug}`);
  revalidatePath("/admin/blog");
}

export async function savePost(input: PostInput): Promise<SaveResult> {
  const user = await requireAdmin();
  const db = await requireBlogDb();
  const col = db.collection<BlogPostDoc>(COL.posts);

  const id = input.id ? oid(input.id) : null;
  const existing = id ? await col.findOne({ _id: id }) : null;
  if (input.id && !existing) return { ok: false, error: "This post no longer exists." };

  const title = s(input.title, 200);
  if (title.length < 3) return { ok: false, error: "Add a title (at least 3 characters).", field: "title" };

  const slug = s(input.slug, 80) || slugify(title);
  if (!isValidSlug(slug)) return { ok: false, error: "The slug may only contain lowercase letters, numbers and single hyphens.", field: "slug" };
  const clash = await col.findOne({ slug, ...(id ? { _id: { $ne: id } } : {}) }, { projection: { _id: 1 } });
  if (clash) return { ok: false, error: `The URL slug "${slug}" is already used by another post.`, field: "slug" };

  const contentHTML = sanitizeContent(typeof input.contentHTML === "string" ? input.contentHTML.slice(0, 2_000_000) : "");
  const text = plainText(contentHTML);
  const wordCount = text ? text.split(" ").length : 0;

  const status: PostStatus = (["draft", "published", "scheduled"] as const).includes(input.status) ? input.status : "draft";
  if (status !== "draft" && wordCount < 30) return { ok: false, error: "Write at least a few paragraphs before publishing.", field: "content" };

  let publishedAt: Date | null = existing?.publishedAt ?? null;
  if (status === "published") {
    publishedAt = existing?.status === "published" && existing.publishedAt ? existing.publishedAt : new Date();
  } else if (status === "scheduled") {
    const at = input.publishedAt ? new Date(input.publishedAt) : null;
    if (!at || isNaN(at.getTime())) return { ok: false, error: "Choose a date and time to schedule this post.", field: "publishedAt" };
    if (at.getTime() <= Date.now() + 60_000) return { ok: false, error: "The scheduled time must be in the future.", field: "publishedAt" };
    publishedAt = at;
  }

  const categoryId = oid(input.categoryId);
  if (categoryId && !(await db.collection(COL.categories).findOne({ _id: categoryId }, { projection: { _id: 1 } })))
    return { ok: false, error: "The selected category no longer exists.", field: "categoryId" };
  const authorId = oid(input.authorId);
  if (authorId && !(await db.collection(COL.authors).findOne({ _id: authorId }, { projection: { _id: 1 } })))
    return { ok: false, error: "The selected author no longer exists.", field: "authorId" };

  let canonicalUrl = s(input.canonicalUrl, 500);
  if (canonicalUrl) {
    try {
      const u = new URL(canonicalUrl);
      if (u.protocol !== "https:") throw new Error();
    } catch {
      return { ok: false, error: "Canonical URL must be a full https:// address (or leave it empty).", field: "canonicalUrl" };
    }
    if (canonicalUrl.replace(/\/$/, "") === absoluteUrl(`/blogs/${slug}`)) canonicalUrl = "";
  }

  const excerpt = s(input.excerpt, 400) || (text.length > 180 ? `${text.slice(0, 177).replace(/\s+\S*$/, "")}…` : text);
  const previousSlugs = new Set(existing?.previousSlugs ?? []);
  if (existing && existing.slug !== slug && existing.publishedAt) previousSlugs.add(existing.slug);
  previousSlugs.delete(slug);

  const now = new Date();
  const doc = {
    title,
    slug,
    previousSlugs: [...previousSlugs],
    excerpt,
    contentJSON: parseDoc(input.contentJSON),
    contentHTML,
    wordCount,
    readingMinutes: readingMinutes(wordCount),
    thumbnail: media(input.thumbnail),
    thumbnailAlt: s(input.thumbnailAlt, 200),
    categoryId,
    authorId,
    status,
    publishedAt,
    metaTitle: s(input.metaTitle, 120),
    metaDescription: s(input.metaDescription, 320),
    focusKeyword: s(input.focusKeyword, 100),
    secondaryKeywords: (Array.isArray(input.secondaryKeywords) ? input.secondaryKeywords : [])
      .map((k) => s(k, 60))
      .filter(Boolean)
      .slice(0, 10),
    canonicalUrl,
    ogImage: media(input.ogImage),
    updatedAt: now,
    updatedBy: user.username,
  };

  let savedId: ObjectId;
  if (existing) {
    await col.updateOne({ _id: existing._id }, { $set: doc });
    savedId = existing._id;
  } else {
    const res = await col.insertOne({ ...doc, createdAt: now, createdBy: user.username } as unknown as BlogPostDoc);
    savedId = res.insertedId;
  }
  revalidateBlog(slug, existing?.slug);
  return { ok: true, id: savedId.toString(), slug, status, publishedAt: publishedAt?.toISOString() ?? null, updatedAt: now.toISOString() };
}

export async function deletePost(id: string): Promise<{ ok: boolean; error?: string }> {
  await requireAdmin();
  const _id = oid(id);
  if (!_id) return { ok: false, error: "Invalid post." };
  const db = await requireBlogDb();
  const post = await db.collection<BlogPostDoc>(COL.posts).findOneAndDelete({ _id });
  revalidateBlog(post?.slug);
  return { ok: true };
}

/* ───────────── Categories ───────────── */

export async function saveCategory(_: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const db = await requireBlogDb();
  const id = oid(String(fd.get("id") ?? ""));
  const name = s(fd.get("name"), 60);
  const slug = s(fd.get("slug"), 60) || slugify(name);
  const description = s(fd.get("description"), 300);
  if (name.length < 2) return { error: "Category name is required." };
  if (!isValidSlug(slug)) return { error: "Slug may only contain lowercase letters, numbers and hyphens." };
  try {
    if (id) await db.collection(COL.categories).updateOne({ _id: id }, { $set: { name, slug, description } });
    else await db.collection(COL.categories).insertOne({ name, slug, description, createdAt: new Date() });
  } catch (e) {
    if ((e as { code?: number }).code === 11000) return { error: `The slug "${slug}" is already in use.` };
    throw e;
  }
  revalidatePath("/admin/blog/categories");
  revalidatePath("/blogs");
  return { success: id ? `Category "${name}" updated.` : `Category "${name}" created.` };
}

export async function deleteCategory(fd: FormData) {
  await requireAdmin();
  const id = oid(String(fd.get("id") ?? ""));
  if (!id) return;
  const db = await requireBlogDb();
  await db.collection(COL.posts).updateMany({ categoryId: id }, { $set: { categoryId: null } });
  await db.collection(COL.categories).deleteOne({ _id: id });
  revalidatePath("/admin/blog/categories");
  revalidatePath("/blogs");
}

/* ───────────── Authors ───────────── */

export async function saveAuthor(_: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const db = await requireBlogDb();
  const id = oid(String(fd.get("id") ?? ""));
  const name = s(fd.get("name"), 80);
  const slug = s(fd.get("slug"), 80) || slugify(name);
  const role = s(fd.get("role"), 80);
  const bio = s(fd.get("bio"), 600);
  let avatar: MediaRef | null = null;
  try {
    avatar = media(JSON.parse(String(fd.get("avatar") || "null")));
  } catch {}
  if (name.length < 2) return { error: "Author name is required." };
  if (!isValidSlug(slug)) return { error: "Slug may only contain lowercase letters, numbers and hyphens." };
  try {
    if (id) await db.collection(COL.authors).updateOne({ _id: id }, { $set: { name, slug, role, bio, avatar } });
    else await db.collection(COL.authors).insertOne({ name, slug, role, bio, avatar, createdAt: new Date() });
  } catch (e) {
    if ((e as { code?: number }).code === 11000) return { error: `The slug "${slug}" is already in use.` };
    throw e;
  }
  revalidatePath("/admin/blog/authors");
  revalidatePath("/blogs", "layout");
  return { success: id ? `Author "${name}" updated.` : `Author "${name}" added.` };
}

export async function deleteAuthor(fd: FormData) {
  await requireAdmin();
  const id = oid(String(fd.get("id") ?? ""));
  if (!id) return;
  const db = await requireBlogDb();
  await db.collection(COL.posts).updateMany({ authorId: id }, { $set: { authorId: null } });
  await db.collection(COL.authors).deleteOne({ _id: id });
  revalidatePath("/admin/blog/authors");
  revalidatePath("/blogs", "layout");
}
