/** Client-safe blog helpers and types (no server imports). */

export const POST_STATUSES = ["draft", "published", "scheduled"] as const;
export type PostStatus = (typeof POST_STATUSES)[number];

export interface MediaRef {
  url: string;
  width: number;
  height: number;
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");
}

export const isValidSlug = (s: string) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s) && s.length <= 80;

export const SEO_LIMITS = {
  title: { min: 50, max: 60 },
  description: { min: 150, max: 160 },
};

export function readingMinutes(words: number) {
  return Math.max(1, Math.round(words / 220));
}
