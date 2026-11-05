import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";
import type { PublicPostFull } from "./types";

export function postMetadata(post: PublicPostFull): Metadata {
  const title = post.metaTitle || `${post.title} | ${site.name}`;
  const description = post.metaDescription || post.excerpt;
  const image = post.ogImage ?? post.thumbnail;
  const base = buildMetadata({
    title,
    description,
    path: `/blogs/${post.slug}`,
    image: image ? absoluteUrl(image.url) : undefined,
    keywords: [post.focusKeyword, ...post.secondaryKeywords].filter(Boolean),
  });
  return {
    ...base,
    alternates: { canonical: post.canonicalUrl || absoluteUrl(`/blogs/${post.slug}`) },
    authors: post.author ? [{ name: post.author.name }] : undefined,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: post.author ? [post.author.name] : undefined,
      section: post.category?.name,
      tags: [post.focusKeyword, ...post.secondaryKeywords].filter(Boolean),
    },
  };
}

export function postJsonLd(post: PublicPostFull) {
  const url = absoluteUrl(`/blogs/${post.slug}`);
  const image = post.ogImage ?? post.thumbnail;
  return [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: post.title.slice(0, 110),
      description: post.metaDescription || post.excerpt,
      url,
      mainEntityOfPage: { "@type": "WebPage", "@id": post.canonicalUrl || url },
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      ...(image ? { image: { "@type": "ImageObject", url: absoluteUrl(image.url), width: image.width, height: image.height } } : {}),
      author: post.author
        ? { "@type": "Person", name: post.author.name, ...(post.author.role ? { jobTitle: post.author.role } : {}) }
        : { "@type": "Organization", name: site.name, url: site.url },
      publisher: { "@type": "Organization", "@id": `${site.url}/#organization`, name: site.name, logo: { "@type": "ImageObject", url: absoluteUrl("/brand/the-orbit-7-icon.png"), width: 1024, height: 1024 } },
      ...(post.category ? { articleSection: post.category.name } : {}),
      keywords: [post.focusKeyword, ...post.secondaryKeywords].filter(Boolean).join(", ") || undefined,
      wordCount: post.wordCount,
      timeRequired: `PT${post.readingMinutes}M`,
      inLanguage: "en",
      isPartOf: { "@id": `${absoluteUrl("/blogs")}#blog` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blogs") },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];
}
