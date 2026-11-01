import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import JsonLd from "@/components/ui/JsonLd";
import ServiceCard from "@/components/cards/ServiceCard";
import LocalHero from "@/components/sections/LocalHero";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import BookCallButton from "@/components/booking/BookCallButton";
import { getCity, getLocalPage, localServicePages, locationHref } from "@/data/locations";
import { getService, serviceHref } from "@/data/services";
import type { Service } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { localServiceSchema } from "@/lib/locationSchema";

export const dynamicParams = false;
export function generateStaticParams() {
  return localServicePages.map((p) => ({ city: p.city, service: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string; service: string }> }): Promise<Metadata> {
  const { city, service } = await params;
  const p = getLocalPage(city, service);
  return p ? buildMetadata({ title: p.metaTitle, description: p.metaDescription, path: locationHref(city, service) }) : {};
}

export default async function LocalServicePage({ params }: { params: Promise<{ city: string; service: string }> }) {
  const { city, service } = await params;
  const p = getLocalPage(city, service);
  const c = getCity(city);
  if (!p || !c) notFound();
  const main = getService(p.service)!;
  const related = p.related.map(getService).filter(Boolean) as Service[];
  const siblings = localServicePages.filter((x) => x.city === c.slug && x.slug !== p.slug);
  const path = locationHref(c.slug, p.slug);
  const faqs = [...p.faqs, ...main.faqs.slice(0, 2)];
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Locations", path: "/locations" },
    { name: c.name, path: locationHref(c.slug) },
    { name: p.title, path },
  ];
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ name: p.metaTitle, path, description: p.metaDescription }),
          localServiceSchema({ name: p.title, description: p.metaDescription, path, city: c, serviceType: main.title }),
          breadcrumbSchema(crumbs),
          faqSchema(faqs),
        ]}
      />
      <LocalHero eyebrow={main.title} h1={p.h1} lead={p.lead} crumbs={crumbs} visual={main.visual} tags={main.visualTags} place={`${c.name}, ${c.country}`} />

      <section className="border-t border-line py-20 sm:py-28" aria-labelledby="intro-heading">
        <Container className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="Overview" title={<span id="intro-heading">{main.title} for {c.name} <em>businesses</em></span>} />
            <div className="mt-8 space-y-5 text-lg leading-[1.75] text-ink-2">
              {p.intro.map((t, i) => (
                <p key={i} data-reveal style={{ ["--d" as string]: i * 80 }}>
                  {t}
                </p>
              ))}
              <p data-reveal>
                Learn more about our approach on the{" "}
                <Link href={serviceHref(main.slug)} className="font-medium text-brand underline underline-offset-4">
                  {main.title.toLowerCase()} service page
                </Link>{" "}
                or see how we work with{" "}
                <Link href={locationHref(c.slug)} className="font-medium text-brand underline underline-offset-4">
                  businesses in {c.name}
                </Link>
                .
              </p>
            </div>
          </div>
          <aside data-reveal className="sheen h-fit rounded-3xl bg-paper p-7" aria-label="What's included">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-brand-500">What&apos;s included</p>
            <ul className="mt-5 space-y-3">
              {main.offerings.map((o) => (
                <li key={o.title} className="flex gap-3 text-[0.95rem] text-ink-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                  {o.title}
                </li>
              ))}
            </ul>
            <BookCallButton size="sm" className="mt-7">Discuss your project</BookCallButton>
          </aside>
        </Container>
      </section>

      <section className="bg-paper py-20 sm:py-28" aria-labelledby="local-heading">
        <Container>
          <SectionHeading eyebrow={`${c.name} considerations`} title={<span id="local-heading">Built for <em>{c.name}</em></span>} />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {p.considerations.map((b, i) => (
              <li key={b.title} data-reveal style={{ ["--d" as string]: i * 80 }} className="rounded-3xl bg-white p-7 shadow-soft ring-1 ring-line">
                <span aria-hidden="true" className="block h-1 w-10 rounded-full bg-brand" />
                <h3 className="mt-6 text-lg font-semibold">{b.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{b.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-brand py-20 text-white noise sm:py-28" aria-labelledby="process-heading">
        <Container className="relative">
          <SectionHeading light eyebrow="Our process" title={<span id="process-heading">How we <em>deliver</em></span>} />
          <ol className="mt-14 grid gap-4 md:grid-cols-5">
            {main.process.map((s, i) => (
              <li key={s.title} data-reveal style={{ ["--d" as string]: i * 90 }} className="glass-dark rounded-3xl p-6">
                <span className="flex size-9 items-center justify-center rounded-full bg-mint font-mono text-xs font-semibold text-brand">{i + 1}</span>
                <h3 className="mt-6 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-white/65">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <FAQ faqs={faqs} eyebrow={`${p.title} FAQ`} title={<>Questions from <em>{c.name}</em></>} lead={`Answers to common questions about ${main.title.toLowerCase()} in ${c.name}.`} />

      <section className="bg-paper py-20 sm:py-24" aria-labelledby="related-heading">
        <Container>
          <SectionHeading eyebrow="Related services" title={<span id="related-heading">Often combined <em>with</em></span>} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r, i) => (
              <ServiceCard key={r.slug} service={r} index={i} />
            ))}
          </div>
          {siblings.length > 0 && (
            <div data-reveal className="mt-10 flex flex-wrap items-center gap-2">
              <span className="mr-2 text-sm text-muted">More in {c.name}:</span>
              {siblings.map((s) => (
                <Link key={s.slug} href={locationHref(c.slug, s.slug)} className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-4 py-2 text-sm text-ink-2 hover:border-brand hover:text-brand">
                  {s.title} <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>

      <CTA eyebrow={`${main.title} in ${c.name}`} title={<>Ready to start in <em>{c.name}?</em></>} secondary={{ label: `All ${c.name} services`, href: locationHref(c.slug) }} />
    </>
  );
}
