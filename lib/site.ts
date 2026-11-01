/**
 * Central brand + contact configuration.
 * Update contact details and social profiles here — every page, the footer,
 * the JSON-LD schema and llms.txt read from this file.
 */
export const site = {
  name: "The Orbit 7",
  legalName: "The Orbit 7",
  url: "https://theorbit7.com",
  tagline: "Digital agency & software house",
  description:
    "The Orbit 7 is a full-service digital agency and software house. We design and build websites, custom software, mobile apps and AI solutions, and grow them with SEO, AI search optimization, digital marketing and video.",
  email: "info@theorbit7.com",
  /** Official business numbers — the first is the primary number used in structured data. */
  phones: ["+92 323 6964669", "+92 370 0294551"] as readonly string[],
  phone: "+92 323 6964669" as string,
  whatsapp: "+92 323 6964669" as string,
  /**
   * Calendly scheduling link, e.g. "https://calendly.com/your-name/30min".
   * Leave empty until you have one — booking buttons then fall back to the contact page.
   * Can also be set with the NEXT_PUBLIC_CALENDLY_URL environment variable.
   */
  calendlyUrl: (process.env.NEXT_PUBLIC_CALENDLY_URL ?? "") as string,
  // Add a postal address to enable richer LocalBusiness data.
  address: null as null | {
    streetAddress: string;
    addressLocality: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry: string;
  },
  social: [{ label: "Instagram", href: "https://www.instagram.com/theorbit.7/" }],
} as const;

export const telHref = (n: string) => `tel:${n.replace(/[^\d+]/g, "")}`;
export const waHref = (n: string, text?: string) =>
  `https://wa.me/${n.replace(/\D/g, "")}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const absoluteUrl = (path = "/") =>
  `${site.url}${path === "/" ? "" : path.startsWith("/") ? path : `/${path}`}`;
