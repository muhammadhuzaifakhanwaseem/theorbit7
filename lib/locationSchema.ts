import type { City } from "@/data/locations";
import { absoluteUrl, site } from "./site";

export function placeSchema(city: City) {
  return city.region === "intl" && city.name === city.country
    ? { "@type": "Country", name: city.country }
    : { "@type": "City", name: city.name, containedInPlace: { "@type": "Country", name: city.country } };
}

/** Service offered to a location (no physical office implied unless `city.office` is set). */
export function localServiceSchema(input: { name: string; description: string; path: string; city: City; serviceType: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(input.path)}#service`,
    name: input.name,
    serviceType: input.serviceType,
    description: input.description,
    url: absoluteUrl(input.path),
    areaServed: placeSchema(input.city),
    provider: {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#professional-service`,
      name: site.name,
      url: site.url,
      telephone: site.phones[0].replace(/\s/g, ""),
      ...(input.city.office
        ? { address: { "@type": "PostalAddress", ...input.city.office, addressLocality: input.city.name, addressCountry: input.city.countryCode } }
        : {}),
    },
  };
}
