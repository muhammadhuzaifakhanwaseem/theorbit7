import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const core: [string, number][] = [
    ["/", 1],
    ["/services", 0.9],
    ["/about-us", 0.8],
    ["/portfolio", 0.8],
    ["/contact-us", 0.8],
    ["/privacy-policy", 0.3],
    ["/terms-of-use", 0.3],
  ];
  return [
    ...core.map(([path, priority]) => ({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...services.map((s) => ({
      url: absoluteUrl(`/services/${s.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];
}
