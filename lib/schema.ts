import { site, absoluteUrl } from "./site";

const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: absoluteUrl("/icon.svg"),
    description: site.description,
    email: site.email,
    ...(site.phone ? { telephone: site.phone } : {}),
    sameAs: site.social.map((s) => s.href),
    contactPoint: site.phones.map((telephone, i) => ({
      "@type": "ContactPoint",
      contactType: i === 0 ? "sales" : "customer support",
      telephone: telephone.replace(/\s/g, ""),
      email: site.email,
      areaServed: "Worldwide",
      availableLanguage: ["English"],
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

export function professionalServiceSchema(services: { title: string; slug: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#professional-service`,
    name: site.name,
    url: site.url,
    image: absoluteUrl("/opengraph-image"),
    description: site.description,
    email: site.email,
    ...(site.phone ? { telephone: site.phone } : {}),
    ...(site.address ? { address: { "@type": "PostalAddress", ...site.address } } : {}),
    areaServed: "Worldwide",
    parentOrganization: { "@id": ORG_ID },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital agency services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, url: absoluteUrl(`/services/${s.slug}`) },
      })),
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema(input: {
  name: string;
  slug: string;
  description: string;
  serviceType: string;
  category: string;
  offers: string[];
}) {
  const url = absoluteUrl(`/services/${input.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: input.name,
    serviceType: input.serviceType,
    category: input.category,
    description: input.description,
    url,
    provider: { "@id": ORG_ID, "@type": "Organization", name: site.name, url: site.url },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${input.name} deliverables`,
      itemListElement: input.offers.map((o) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: o },
      })),
    },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function webPageSchema(input: { name: string; path: string; description: string; type?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": input.type ?? "WebPage",
    "@id": `${absoluteUrl(input.path)}#webpage`,
    url: absoluteUrl(input.path),
    name: input.name,
    description: input.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en",
  };
}
