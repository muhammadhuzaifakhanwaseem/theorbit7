import type { Category, CategoryId, Service } from "./types";
import { webServices } from "./web";
import { mobileServices } from "./mobile";
import { softwareServices } from "./software";
import { marketingServices } from "./marketing";
import { creativeServices } from "./creative";
import { aiServices } from "./ai";
import { moreServices } from "./more";
import { seoServices } from "./seo";
import { videoServices } from "./video";

export type { Service, Category, CategoryId } from "./types";

export const categories: Category[] = [
  {
    id: "software",
    name: "Software Development",
    short: "Software",
    description:
      "Custom software, ERP and CRM systems, SaaS platforms, web applications and APIs engineered around how your business works.",
    nav: [
      "custom-software-development",
      "erp-development",
      "crm-development",
      "saas-development",
      "custom-web-application-development",
      "api-development-integration",
    ],
  },
  {
    id: "ai",
    name: "AI Development",
    short: "AI",
    description:
      "AI applications, integrations, agents and generative AI products that automate work and create new value — built responsibly.",
    nav: [
      "ai-application-development",
      "ai-automation",
      "ai-integration",
      "ai-agent-development",
      "generative-ai-development",
      "ai-product-development",
    ],
  },
  {
    id: "web",
    name: "Web Development",
    short: "Web",
    description:
      "Fast, search-ready websites, online stores and the frontend and backend engineering behind them.",
    nav: [
      "website-development",
      "ecommerce-development",
      "wordpress-development",
      "frontend-development",
      "backend-development",
      "website-maintenance",
    ],
  },
  {
    id: "mobile",
    name: "Mobile App Development",
    short: "Mobile",
    description:
      "Native and cross-platform iOS and Android apps, from first prototype to App Store launch and beyond.",
    nav: [
      "mobile-app-development",
      "ios-app-development",
      "android-app-development",
      "flutter-app-development",
      "react-native-development",
      "cross-platform-app-development",
    ],
  },
  {
    id: "seo",
    name: "SEO & AI Search Optimization",
    short: "SEO & AI Search",
    description:
      "Visibility everywhere people search — Google, AI Overviews, ChatGPT, Perplexity and voice — through SEO, AEO and GEO.",
    nav: [
      "seo-services",
      "local-seo",
      "technical-seo",
      "answer-engine-optimization",
      "generative-engine-optimization",
      "ai-search-optimization",
      "llm-seo",
    ],
  },
  {
    id: "marketing",
    name: "Digital Marketing",
    short: "Marketing",
    description:
      "Paid media, social, content and strategy that turn visibility into qualified leads and revenue.",
    nav: ["google-ads-ppc", "social-media-marketing", "content-marketing", "digital-strategy"],
  },
  {
    id: "design",
    name: "Design & Branding",
    short: "Design",
    description:
      "UI/UX, product design, brand identity, graphic design and photography that make your business unforgettable.",
    nav: ["ui-ux-design", "product-design", "branding-identity", "graphic-design"],
  },
  {
    id: "video",
    name: "Video Editing",
    short: "Video",
    description:
      "Podcast, YouTube, short-form, corporate and ad video editing — plus motion graphics and audio post-production.",
    nav: [
      "podcast-video-editing",
      "podcast-production",
      "youtube-video-editing",
      "short-form-video-editing",
      "instagram-reels-editing",
      "tiktok-video-editing",
      "corporate-video-editing",
      "promotional-video-editing",
      "social-media-video-editing",
      "video-repurposing",
      "motion-graphics-animation",
      "audio-enhancement-post-production",
    ],
  },
];

/** Categories shown in the "Services" mega menu (Video Editing has its own menu). */
export const serviceMenuCategories = categories.filter((c) => c.id !== "video");

const all: Service[] = [
  ...webServices,
  ...mobileServices,
  ...softwareServices,
  ...marketingServices,
  ...creativeServices,
  ...aiServices,
  ...moreServices,
  ...seoServices,
  ...videoServices,
];

/** Services ordered by category, then by the category's nav order. */
export const services: Service[] = categories.flatMap((c) => {
  const inCat = all.filter((s) => s.category === c.id);
  const rank = (slug: string) => {
    const i = c.nav.indexOf(slug);
    return i === -1 ? 999 : i;
  };
  return inCat.sort((x, y) => rank(x.slug) - rank(y.slug));
});

const bySlug = new Map(services.map((s) => [s.slug, s]));

export function getService(slug: string) {
  return bySlug.get(slug);
}

export function getCategory(id: CategoryId) {
  return categories.find((c) => c.id === id)!;
}

export function servicesIn(id: CategoryId) {
  return services.filter((s) => s.category === id);
}

/** The services listed in a category's navigation, in order. */
export function navServicesIn(id: CategoryId) {
  return getCategory(id).nav.map((slug) => bySlug.get(slug)).filter(Boolean) as Service[];
}

export function relatedServices(service: Service) {
  return service.related.map((slug) => bySlug.get(slug)).filter(Boolean) as Service[];
}

export const serviceHref = (slug: string) => `/services/${slug}`;
