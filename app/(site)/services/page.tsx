import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import JsonLd from "@/components/ui/JsonLd";
import PageHero from "@/components/sections/PageHero";
import ServiceCard from "@/components/cards/ServiceCard";
import ServiceVisual from "@/components/visuals/ServiceVisual";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import { categories, services, servicesIn, serviceHref } from "@/data/services";
import type { VisualKind } from "@/data/services/types";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site";

const title = "Digital Services & Software Development | The Orbit 7";
const description =
  "The Orbit 7 digital services: software development services, IT services and digital solutions for web, mobile apps, AI, SEO, marketing, design and video.";

export const metadata = buildMetadata({
  title,
  description,
  path: "/services",
  keywords: ["digital services", "digital solutions", "IT services", "software development services"],
});

const visualFor: Record<string, VisualKind> = {
  software: "code",
  ai: "ai",
  web: "browser",
  mobile: "phone",
  seo: "answer",
  marketing: "chart",
  design: "design",
  video: "podcast",
};

const faqs = [
  {
    q: "Can I hire The Orbit 7 for just one service?",
    a: "Yes. Many clients start with a single service — such as a website, an app or SEO — and add others later. Every service can be engaged on its own.",
  },
  {
    q: "What is the benefit of using one agency for development and marketing?",
    a: "When the same team builds and markets your product, technical SEO, tracking, landing pages and campaigns are planned together. That avoids hand-off gaps and usually means faster results and fewer surprises.",
  },
  {
    q: "How do you price your services?",
    a: "Projects such as websites, apps and software are typically quoted per project after discovery. Ongoing services such as SEO, paid media, social media and maintenance are usually monthly retainers. We provide a written proposal before any work starts.",
  },
  {
    q: "Which industries do you work with?",
    a: "We work across ecommerce, real estate, healthcare, education, finance, hospitality, logistics, manufacturing, professional services and startups.",
  },
];

export default function ServicesPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ];
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ name: title, path: "/services", description, type: "CollectionPage" }),
          breadcrumbSchema(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "The Orbit 7 services",
            itemListElement: services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.title,
              url: absoluteUrl(serviceHref(s.slug)),
            })),
          },
        ]}
      />
      <PageHero
        eyebrow="Our services"
        title="Digital services to help your business *win online.*"
        lead={`${categories.length} disciplines and ${services.length} specialist services, from software development services and IT services to marketing and video. One team plans, designs, builds and grows your digital solutions, so every piece works together.`}
        crumbs={crumbs}
      >
        <nav aria-label="Service categories" className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="rounded-full border border-line-strong bg-white/70 px-4 py-2 text-sm font-medium text-ink-2 backdrop-blur transition-colors hover:border-brand hover:bg-brand hover:text-white"
            >
              {c.name}
            </a>
          ))}
        </nav>
      </PageHero>

      {categories.map((c, ci) => {
        const list = servicesIn(c.id);
        return (
          <section
            key={c.id}
            id={c.id}
            className={`scroll-mt-24 py-20 sm:py-28 ${ci % 2 ? "bg-paper" : "border-t border-line"}`}
            aria-labelledby={`${c.id}-heading`}
          >
            <Container>
              <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
                <div data-reveal>
                  <Eyebrow>{`0${ci + 1} — ${c.short}`}</Eyebrow>
                  <h2 id={`${c.id}-heading`} className="mt-4 text-4xl leading-[1.05] font-semibold sm:text-5xl">
                    {c.name}
                  </h2>
                  <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{c.description}</p>
                  <ul className="mt-8 flex flex-wrap gap-2">
                    {list.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={serviceHref(s.slug)}
                          className="inline-flex items-center gap-1 rounded-full bg-mint-50 px-3.5 py-1.5 text-sm text-brand ring-1 ring-brand/10 transition-colors hover:bg-brand hover:text-white"
                        >
                          {s.title}
                          <ArrowUpRight className="size-3.5" aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div data-reveal="scale" className="hidden px-8 lg:block">
                  <ServiceVisual kind={visualFor[c.id]} className="mx-auto max-w-md" />
                </div>
              </div>
              <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((s, i) => (
                  <ServiceCard key={s.slug} service={s} index={i} />
                ))}
              </div>
            </Container>
          </section>
        );
      })}

      <section className="border-t border-line py-16" aria-label="Help choosing">
        <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="max-w-2xl font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Not sure which services you need? <em className="accent text-brand">We&apos;ll help you decide.</em>
          </p>
          <Button href="/contact-us">Get a recommendation</Button>
        </Container>
      </section>

      <FAQ faqs={faqs} lead="Common questions about engaging our services." />
      <CTA />
    </>
  );
}
