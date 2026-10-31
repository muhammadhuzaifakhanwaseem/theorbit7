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
    "The Orbit 7 is a full-service digital agency and software house. We design and build websites, custom software, mobile apps and AI automation, and grow them with SEO, paid media and social marketing.",
  email: "info@theorbit7.com",
  // Add a real phone / WhatsApp number to show them across the site, e.g. "+92 300 0000000".
  phone: "+92 323 6964669" as string,
  whatsapp: "+92 323 6964669" as string,
  // Add a postal address to enable richer LocalBusiness data.
  address: null as null | {
    streetAddress: string;
    addressLocality: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry: string;
  },
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/theorbit7" },
    { label: "Instagram", href: "https://www.instagram.com/theorbit7" },
    { label: "X", href: "https://x.com/theorbit7" },
  ],
} as const;

export const absoluteUrl = (path = "/") =>
  `${site.url}${path === "/" ? "" : path.startsWith("/") ? path : `/${path}`}`;
