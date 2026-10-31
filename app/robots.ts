import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * All public pages are open to search engines and AI assistants / answer
 * engines. Only API endpoints are excluded.
 */
const aiAndSearchBots = [
  "Googlebot",
  "Bingbot",
  "Google-Extended",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot",
  "Applebot-Extended",
  "DuckDuckBot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/admin"] },
      ...aiAndSearchBots.map((userAgent) => ({ userAgent, allow: "/", disallow: ["/api/", "/admin"] })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
