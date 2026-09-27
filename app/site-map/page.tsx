import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import { servicesMegaMenu, industriesNav, locationsNav, companyNav } from "@/data/nav";
import { blogPosts } from "@/data/blog";
import { caseStudies } from "@/data/case-studies";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "A full index of every page on theorbit7.com.",
  alternates: { canonical: "/site-map" },
};

function LinkList({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-ink">{title}</h2>
      <ul className="mt-4 space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-ink-muted hover:text-brand">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SiteMapPage() {
  const serviceLinks = servicesMegaMenu.flatMap((c) => c.links);
  const blogLinks = blogPosts.map((p) => ({ label: p.title, href: `/blog/${p.slug}` }));
  const portfolioLinks = caseStudies.map((c) => ({ label: c.title, href: `/portfolio/${c.slug}` }));

  return (
    <>
      <PageHero
        eyebrow="Sitemap"
        title="Every page on theorbit7.com"
        description="A full index of our services, industries, locations, company pages, and content."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Sitemap" }]}
      />
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <LinkList title="Services" links={serviceLinks} />
            <LinkList title="Industries" links={[{ label: "All Industries", href: "/industries" }, ...industriesNav]} />
            <LinkList title="Locations" links={[{ label: "All Locations", href: "/locations" }, ...locationsNav]} />
            <LinkList title="Company" links={companyNav} />
            <LinkList
              title="Portfolio"
              links={[{ label: "All Case Studies", href: "/portfolio" }, ...portfolioLinks]}
            />
            <LinkList title="Blog" links={[{ label: "All Articles", href: "/blog" }, ...blogLinks]} />
            <LinkList
              title="Legal"
              links={[
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms of Use", href: "/terms-of-use" },
              ]}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
