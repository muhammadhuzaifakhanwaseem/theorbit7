import type { Category, CategoryId, Service } from "./types";
import { webServices } from "./web";
import { mobileServices } from "./mobile";
import { softwareServices } from "./software";
import { marketingServices } from "./marketing";
import { creativeServices } from "./creative";

export type { Service, Category, CategoryId } from "./types";

export const categories: Category[] = [
  {
    id: "web",
    name: "Web Development",
    short: "Web",
    description:
      "Websites, web applications, ecommerce stores and SaaS platforms engineered for speed, search and conversion.",
  },
  {
    id: "mobile",
    name: "Mobile App Development",
    short: "Mobile",
    description:
      "Native and cross-platform iOS and Android apps, from first prototype to App Store launch and beyond.",
  },
  {
    id: "software",
    name: "Software & AI",
    short: "Software & AI",
    description:
      "Custom software, ERP and CRM systems, APIs and practical AI that automate operations and unlock growth.",
  },
  {
    id: "marketing",
    name: "Digital Marketing",
    short: "Marketing",
    description:
      "SEO, paid media, social and content marketing that turn visibility into qualified leads and revenue.",
  },
  {
    id: "creative",
    name: "Creative & Branding",
    short: "Creative",
    description:
      "UI/UX, brand identity, graphic design and photo & video production that make your business unforgettable.",
  },
];

export const services: Service[] = [
  ...webServices,
  ...mobileServices,
  ...softwareServices,
  ...marketingServices,
  ...creativeServices,
];

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

export function relatedServices(service: Service) {
  return service.related.map((slug) => bySlug.get(slug)).filter(Boolean) as Service[];
}

export const serviceHref = (slug: string) => `/services/${slug}`;
