import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/utils";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { locations } from "@/data/locations";
import { caseStudies } from "@/data/case-studies";
import { blogPosts } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/industries",
    "/locations",
    "/portfolio",
    "/blog",
    "/about-us",
    "/leadership",
    "/founders-letter",
    "/press-media",
    "/partnership",
    "/life-at-the-orbit-7",
    "/contact-us",
    "/privacy-policy",
    "/terms-of-use",
    "/site-map",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${SITE_URL}/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const industryRoutes = industries.map((i) => ({
    url: `${SITE_URL}/industries/${i.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const locationRoutes = locations.map((l) => ({
    url: `${SITE_URL}/locations/${l.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const portfolioRoutes = caseStudies.map((c) => ({
    url: `${SITE_URL}/portfolio/${c.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const blogRoutes = blogPosts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.date,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...industryRoutes,
    ...locationRoutes,
    ...portfolioRoutes,
    ...blogRoutes,
  ];
}
