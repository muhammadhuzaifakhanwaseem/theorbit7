export type CategoryId = "software" | "ai" | "web" | "mobile" | "seo" | "marketing" | "design" | "video";

export type VisualKind =
  | "browser"
  | "phone"
  | "cart"
  | "dashboard"
  | "code"
  | "design"
  | "brand"
  | "video"
  | "ai"
  | "flow"
  | "search"
  | "map"
  | "chart"
  | "social"
  | "ads"
  | "content"
  | "api"
  | "answer"
  | "voice"
  | "graph"
  | "podcast"
  | "reels"
  | "motion"
  | "shield";

export interface Item {
  title: string;
  text: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  /** Short display name, used in nav and cards. */
  title: string;
  category: CategoryId;
  /** One-line card summary. */
  summary: string;
  /** Unique <title> tag. */
  metaTitle: string;
  /** Unique meta description (~150–160 chars). */
  metaDescription: string;
  keywords: string[];
  eyebrow: string;
  h1: string;
  heroLead: string;
  visual: VisualKind;
  /** Short labels rendered inside the hero visual. */
  visualTags: string[];
  intro: { heading: string; paragraphs: string[] };
  benefits: Item[];
  offerings: Item[];
  process: Item[];
  deliverables: string[];
  useCases: Item[];
  whyUs: Item[];
  tech: string[];
  faqs: FAQ[];
  related: string[];
  /** Optional extras (used mainly by video editing pages). */
  trust?: string[];
  stats?: { value: string; label: string }[];
  offer?: { title: string; text: string; cta: string };
  packages?: { name: string; price: string; unit: string; delivery: string; features: string[]; popular?: boolean }[];
  packagesNote?: string;
  tools?: { name: string; use: string }[];
  /** Overrides the default primary hero button label. */
  primaryCta?: string;
}

export interface Category {
  id: CategoryId;
  name: string;
  short: string;
  description: string;
  /** Services shown in the navigation menu, in order (others remain on /services). */
  nav: string[];
}
