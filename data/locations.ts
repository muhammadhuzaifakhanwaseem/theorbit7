export interface Location {
  slug: string;
  city: string;
  region: string;
  timezone: string;
  tagline: string;
  heroDescription: string;
  intro: string;
  industriesServed: string[];
  latitude: number;
  longitude: number;
}

export const locations: Location[] = [
  {
    slug: "san-francisco",
    city: "San Francisco",
    region: "California, USA",
    timezone: "PST (UTC-8)",
    tagline: "AI and product engineering support for Bay Area teams",
    heroDescription:
      "The Orbit 7 supports founders and product teams across San Francisco and the wider Bay Area with senior mobile, web, and AI engineering delivered on Pacific-time overlap.",
    intro:
      "San Francisco remains the center of gravity for venture-backed product teams, and our delivery pods work Pacific-hours overlap so your team gets same-day collaboration, not overnight handoffs. We work with founders from first discovery sprint through Series B scaling.",
    industriesServed: ["startups", "fintech", "ai", "ecommerce"],
    latitude: 37.7749,
    longitude: -122.4194,
  },
  {
    slug: "new-york",
    city: "New York",
    region: "New York, USA",
    timezone: "EST (UTC-5)",
    tagline: "Enterprise-grade engineering for New York's product teams",
    heroDescription:
      "From fintech to media, The Orbit 7 partners with New York teams that need enterprise-grade software delivered with startup speed.",
    intro:
      "New York's density of financial services, media, and enterprise headquarters shapes how we staff engagements here — heavier on compliance-aware engineering and stakeholder reporting, without slowing delivery down.",
    industriesServed: ["fintech", "ecommerce", "real-estate", "education"],
    latitude: 40.7128,
    longitude: -74.006,
  },
  {
    slug: "austin",
    city: "Austin",
    region: "Texas, USA",
    timezone: "CST (UTC-6)",
    tagline: "Product engineering for Austin's fast-growing tech scene",
    heroDescription:
      "The Orbit 7 works with Austin's growing base of startups and scale-ups on mobile, web, and AI-powered product engineering.",
    intro:
      "Austin's tech scene has matured from early-stage experimentation into a genuine second hub for product companies, and our engagements here range from first MVPs to platform rebuilds for companies that have already found traction.",
    industriesServed: ["startups", "fitness", "ecommerce"],
    latitude: 30.2672,
    longitude: -97.7431,
  },
  {
    slug: "toronto",
    city: "Toronto",
    region: "Ontario, Canada",
    timezone: "EST (UTC-5)",
    tagline: "North American engineering delivery for Toronto teams",
    heroDescription:
      "We support Toronto-based teams with full-cycle product engineering, from fintech platforms to healthcare and education products.",
    intro:
      "Toronto's fintech and healthtech density means many of our engagements here start with a compliance and data-architecture conversation before a single screen is designed.",
    industriesServed: ["fintech", "healthcare", "education"],
    latitude: 43.6532,
    longitude: -79.3832,
  },
  {
    slug: "london",
    city: "London",
    region: "United Kingdom",
    timezone: "GMT (UTC+0)",
    tagline: "Product and AI engineering across UK working hours",
    heroDescription:
      "The Orbit 7 partners with London-based teams across fintech, travel, and real estate on mobile, web, and AI-powered product builds.",
    intro:
      "London's financial services and travel sectors bring some of our most compliance-heavy engagements, and our delivery pods structure around UK working hours with regular in-person-equivalent working sessions.",
    industriesServed: ["fintech", "travel", "real-estate"],
    latitude: 51.5072,
    longitude: -0.1276,
  },
  {
    slug: "dubai",
    city: "Dubai",
    region: "United Arab Emirates",
    timezone: "GST (UTC+4)",
    tagline: "Digital product engineering for Gulf-region businesses",
    heroDescription:
      "We support Dubai and the wider Gulf region with mobile, ecommerce, and real-estate technology engineering built for a fast-scaling market.",
    intro:
      "Dubai's rapid growth across real estate, retail, and logistics has created strong demand for custom platforms rather than off-the-shelf software, which is where our engineering-first approach fits well.",
    industriesServed: ["real-estate", "ecommerce", "travel"],
    latitude: 25.2048,
    longitude: 55.2708,
  },
  {
    slug: "singapore",
    city: "Singapore",
    region: "Singapore",
    timezone: "SGT (UTC+8)",
    tagline: "APAC delivery for fintech and ecommerce product teams",
    heroDescription:
      "The Orbit 7 partners with Singapore-based teams to build fintech, ecommerce, and AI-powered products serving the broader APAC market.",
    intro:
      "Singapore's role as a regional fintech and commerce hub means our engagements here often need to support multiple currencies, languages, and regulatory regimes from day one.",
    industriesServed: ["fintech", "ecommerce", "startups"],
    latitude: 1.3521,
    longitude: 103.8198,
  },
];

export function getLocationBySlug(slug: string) {
  return locations.find((l) => l.slug === slug);
}
