import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { getSitemapPosts } from "@/lib/blog/db";
import { cities, localServicePages, locationHref } from "@/data/locations";
import { companyPageReady } from "@/lib/company";
import { absoluteUrl } from "@/lib/site";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getSitemapPosts();
  const lastModified = new Date();
  const core: [string, number][] = [
    ["/", 1],
    ["/services", 0.9],
    ["/blogs", 0.8],
    ["/video-editing", 0.9],
    ["/locations", 0.8],
    ...(Object.entries(companyPageReady).filter(([, ready]) => ready).map(([path]) => [path, 0.5]) as [string, number][]),
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
    ...cities.map((c) => ({
      url: absoluteUrl(locationHref(c.slug)),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...localServicePages.map((p) => ({
      url: absoluteUrl(locationHref(p.city, p.slug)),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...posts.map((p) => ({
      url: absoluteUrl(`/blogs/${p.slug}`),
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
