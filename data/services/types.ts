export type CategoryId = "web" | "mobile" | "software" | "marketing" | "creative";

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
}

export interface Category {
  id: CategoryId;
  name: string;
  short: string;
  description: string;
}
