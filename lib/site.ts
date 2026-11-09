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
   * Cal.com booking link. Booking buttons open it in an on-brand modal.
   * Override with the NEXT_PUBLIC_BOOKING_URL environment variable; set it to an
   * empty string to fall back to the contact page.
   */
  bookingUrl: (process.env.NEXT_PUBLIC_BOOKING_URL ?? "https://cal.com/theorbit7") as string,
  // Add a postal address to enable richer LocalBusiness data.
  address: null as null | {
    streetAddress: string;
    addressLocality: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry: string;
  },
  social: [{ label: "Instagram", href: "https://www.instagram.com/theorbit.7/" }],
  /** Analytics & verification (loaded on public pages only, never in /admin). */
  analytics: {
    googleSiteVerification: "mdyxPQ2fTc7rhMSWsJjjCLUP_yHieMplc8jbmEXlvSI",
    ga4Id: "G-6BT3MVBSF7",
    clarityId: "z8h4n9bo7j",
  },
} as const;

export const telHref = (n: string) => `tel:${n.replace(/[^\d+]/g, "")}`;
export const waHref = (n: string, text?: string) =>
  `https://wa.me/${n.replace(/\D/g, "")}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const absoluteUrl = (path = "/") =>
  `${site.url}${path === "/" ? "" : path.startsWith("/") ? path : `/${path}`}`;
