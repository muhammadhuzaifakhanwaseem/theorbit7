import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = ['what-a-high-performing-business-website-needs-in-2026', 'seo-foundations-that-compound-over-time', 'when-custom-software-is-worth-the-investment', 'building-a-mobile-app-people-return-to']
  return [{ url: 'https://theorbit7.com', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }, { url: 'https://theorbit7.com/blog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 }, ...articles.map((slug) => ({ url: `https://theorbit7.com/blog/${slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 }))]
}
