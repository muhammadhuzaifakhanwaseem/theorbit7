/**
 * PORTFOLIO
 * These entries are representative project showcases describing the type of work
 * The Orbit 7 delivers. They intentionally contain NO client names, testimonials or
 * performance numbers. Replace or extend them with real, client-approved case
 * studies (add `client`, `results` and real imagery) before presenting them as
 * named client work.
 */
import type { VisualKind } from "./services/types";

export interface Project {
  slug: string;
  title: string;
  type: string;
  sector: string;
  summary: string;
  scope: string[];
  stack: string[];
  services: string[];
  visual: VisualKind;
  tone: "forest" | "mint" | "sand" | "ink";
}

export const projects: Project[] = [
  {
    slug: "multi-vendor-marketplace",
    title: "Multi-vendor fashion marketplace",
    type: "Ecommerce platform",
    sector: "Ecommerce & Retail",
    summary:
      "A headless marketplace where independent labels list collections, manage orders and receive payouts — with a fast Next.js storefront and a vendor dashboard.",
    scope: ["Marketplace UX & UI", "Headless storefront", "Vendor dashboard", "Payments & payouts", "Ecommerce SEO"],
    stack: ["Next.js", "Medusa", "Stripe Connect", "PostgreSQL"],
    services: ["ecommerce-development", "ui-ux-design", "seo-services"],
    visual: "cart",
    tone: "forest",
  },
  {
    slug: "clinic-booking-app",
    title: "Clinic booking & patient app",
    type: "Mobile app",
    sector: "Healthcare & Wellness",
    summary:
      "A cross-platform patient app for booking appointments, receiving reminders and checking in — connected to a web admin panel for clinic staff.",
    scope: ["Product discovery", "Mobile UX & UI", "Flutter app", "Admin panel", "Notifications"],
    stack: ["Flutter", "Node.js", "PostgreSQL", "Firebase"],
    services: ["mobile-app-development", "cross-platform-app-development", "ui-ux-design"],
    visual: "phone",
    tone: "mint",
  },
  {
    slug: "distribution-erp",
    title: "Distribution ERP & B2B portal",
    type: "Custom ERP",
    sector: "Logistics & Supply Chain",
    summary:
      "An ERP unifying purchasing, multi-warehouse inventory and invoicing, with a B2B ordering portal for trade customers.",
    scope: ["Process mapping", "ERP modules", "B2B portal", "Accounting integration", "Data migration"],
    stack: ["Odoo", "Python", "React", "PostgreSQL"],
    services: ["erp-development", "custom-web-application-development", "api-development-integration"],
    visual: "dashboard",
    tone: "sand",
  },
  {
    slug: "ai-support-assistant",
    title: "AI customer support assistant",
    type: "AI solution",
    sector: "Startups & SaaS",
    summary:
      "A retrieval-augmented assistant that answers customer questions from help-centre content on web and WhatsApp, escalating to humans when unsure.",
    scope: ["AI use-case workshop", "RAG pipeline", "Web & WhatsApp channels", "Evaluation suite", "Human handover"],
    stack: ["Claude", "LangChain", "pgvector", "Next.js"],
    services: ["ai-application-development", "ai-automation", "api-development-integration"],
    visual: "ai",
    tone: "ink",
  },
  {
    slug: "real-estate-growth",
    title: "Real estate lead generation engine",
    type: "Website + marketing",
    sector: "Real Estate & Construction",
    summary:
      "A fast property website with location pages, connected to a CRM and fed by Google Ads, Meta lead campaigns and local SEO.",
    scope: ["Website design & build", "CRM integration", "Google & Meta Ads", "Local SEO", "Property photography"],
    stack: ["Next.js", "Sanity", "HubSpot", "Google Ads"],
    services: ["website-development", "google-ads-ppc", "local-seo", "crm-development"],
    visual: "map",
    tone: "forest",
  },
  {
    slug: "saas-analytics-dashboard",
    title: "B2B SaaS analytics dashboard",
    type: "SaaS product",
    sector: "Startups & SaaS",
    summary:
      "A multi-tenant SaaS platform with subscription billing, role-based access and real-time operational dashboards.",
    scope: ["Product strategy", "Design system", "Multi-tenant architecture", "Stripe billing", "Product analytics"],
    stack: ["Next.js", "NestJS", "PostgreSQL", "Stripe", "AWS"],
    services: ["saas-development", "ui-ux-design", "custom-web-application-development"],
    visual: "chart",
    tone: "mint",
  },
  {
    slug: "hospitality-brand",
    title: "Boutique hospitality brand launch",
    type: "Branding + content",
    sector: "Hospitality & Food",
    summary:
      "Brand identity, website, photography and launch social content for a boutique hospitality concept.",
    scope: ["Brand strategy", "Visual identity", "Website", "Photo & video", "Social launch"],
    stack: ["Figma", "Adobe CC", "WordPress", "Meta"],
    services: ["branding-identity", "photography-videography", "social-media-marketing", "wordpress-development"],
    visual: "brand",
    tone: "sand",
  },
  {
    slug: "workflow-automation-suite",
    title: "Back-office automation suite",
    type: "Automation",
    sector: "Professional Services",
    summary:
      "Automated invoice capture, lead routing and weekly reporting connecting email, CRM, accounting and spreadsheets.",
    scope: ["Process audit", "n8n workflows", "AI document extraction", "Monitoring & alerts"],
    stack: ["n8n", "Claude", "Google Workspace", "HubSpot"],
    services: ["ai-automation", "crm-development", "api-development-integration"],
    visual: "flow",
    tone: "ink",
  },
];
