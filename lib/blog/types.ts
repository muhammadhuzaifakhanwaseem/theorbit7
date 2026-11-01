import type { ObjectId } from "mongodb";
import type { MediaRef, PostStatus } from "./shared";

export interface BlogPostDoc {
  _id: ObjectId;
  title: string;
  slug: string;
  previousSlugs: string[];
  excerpt: string;
  contentJSON: unknown;
  contentHTML: string;
  wordCount: number;
  readingMinutes: number;
  thumbnail: MediaRef | null;
  thumbnailAlt: string;
  categoryId: ObjectId | null;
  authorId: ObjectId | null;
  status: PostStatus;
  publishedAt: Date | null;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  secondaryKeywords: string[];
  canonicalUrl: string;
  ogImage: MediaRef | null;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
}

export interface BlogCategoryDoc {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  createdAt: Date;
}

export interface BlogAuthorDoc {
  _id: ObjectId;
  name: string;
  slug: string;
  role: string;
  bio: string;
  avatar: MediaRef | null;
  createdAt: Date;
}

/** Shape used by public pages (serialisable). */
export interface PublicPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  thumbnail: MediaRef | null;
  thumbnailAlt: string;
  category: { name: string; slug: string } | null;
  author: { name: string; slug: string; role: string; bio: string; avatar: MediaRef | null } | null;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
}

export interface PublicPostFull extends PublicPost {
  contentHTML: string;
  wordCount: number;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  secondaryKeywords: string[];
  canonicalUrl: string;
  ogImage: MediaRef | null;
  status: PostStatus;
}
