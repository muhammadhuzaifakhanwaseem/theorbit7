import { categories, servicesIn } from "@/data/services";
import { homeFaqs } from "@/data/content";
import { getLatestPosts } from "@/lib/blog/db";
import { site, absoluteUrl } from "@/lib/site";

export const revalidate = 300;

/** llms.txt — a plain-text map of the site for AI assistants (see llmstxt.org). */
export async function GET() {
  const posts = await getLatestPosts(30);
  const lines: string[] = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `${site.name} is a full-service digital agency and software house offering web development, mobile app development, custom software and AI, digital marketing, and creative & branding services to businesses internationally.`,
    "",
    "## Company",
    `- [About ${site.name}](${absoluteUrl("/about-us")}): who we are, how we work and what we believe`,
    `- [All services](${absoluteUrl("/services")}): overview of every service category`,
    `- [Our work](${absoluteUrl("/portfolio")}): representative projects`,
    `- [Contact](${absoluteUrl("/contact-us")}): request a free consultation (email: ${site.email})`,
    `- [Blog](${absoluteUrl("/blogs")}): guides and insights on web, apps, AI and digital marketing`,
    "",
  ];
  for (const c of categories) {
    lines.push(`## ${c.name}`, "", c.description, "");
    for (const s of servicesIn(c.id)) {
      lines.push(`- [${s.title}](${absoluteUrl(`/services/${s.slug}`)}): ${s.summary}`);
    }
    lines.push("");
  }
  if (posts.length) {
    lines.push("## Latest articles", "");
    for (const p of posts) lines.push(`- [${p.title}](${absoluteUrl(`/blogs/${p.slug}`)}): ${p.excerpt}`);
    lines.push("");
  }
  lines.push("## Frequently asked questions", "");
  for (const f of homeFaqs) lines.push(`### ${f.q}`, f.a, "");
  lines.push("## Optional", `- [Sitemap](${absoluteUrl("/sitemap.xml")})`, `- [Privacy policy](${absoluteUrl("/privacy-policy")})`);

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
