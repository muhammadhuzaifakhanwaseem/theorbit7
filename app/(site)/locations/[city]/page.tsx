import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import JsonLd from "@/components/ui/JsonLd";
import ServiceCard from "@/components/cards/ServiceCard";
import LocalHero from "@/components/sections/LocalHero";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import { cities, getCity, locationHref, localPagesFor } from "@/data/locations";
import { getService } from "@/data/services";
import type { Service } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { localServiceSchema } from "@/lib/locationSchema";

export const dynamicParams = false;
export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const c = getCity((await params).city);
  return c ? buildMetadata({ title: c.metaTitle, description: c.metaDescription, path: locationHref(c.slug) }) : {};
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const c = getCity((await params).city);
  if (!c) notFound();
  const local = localPagesFor(c.slug);
  const svc = c.services.map(getService).filter(Boolean) as Service[];
  const nearby = cities.filter((x) => x.region === c.region && x.slug !== c.slug);
  const path = locationHref(c.slug);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Locations", path: "/locations" },
    { name: c.name, path },
  ];
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ name: c.metaTitle, path, description: c.metaDescription }),
          localServiceSchema({ name: `Digital agency & software development services in ${c.name}`, description: c.metaDescription, path, city: c, serviceType: "Software development, web development and digital marketing" }),
          breadcrumbSchema(crumbs),
          faqSchema(c.faqs),
        ]}
      />
      <LocalHero eyebrow={`${c.name}, ${c.country}`} h1={c.h1} lead={c.lead} crumbs={crumbs} visual="map" tags={c.industries.slice(0, 3)} place={c.name} />

      <section className="border-t border-line py-20 sm:py-28" aria-labelledby="intro-heading">
        <Container className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow={`Working with ${c.name} businesses`} title={<span id="intro-heading">Built for the {c.name} <em>market</em></span>} />
            <div className="mt-8 space-y-5 text-lg leading-[1.75] text-ink-2">
              {c.intro.map((p, i) => (
                <p key={i} data-reveal style={{ ["--d" as string]: i * 80 }}>
                  {p}
                </p>
              ))}
            </div>
          </div>
          <aside data-reveal className="sheen h-fit rounded-3xl bg-paper p-7" aria-label="Industries">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-brand-500">Industries we support</p>
            <ul className="mt-5 space-y-3">
              {c.industries.map((ind) => (
                <li key={ind} className="flex gap-3 text-[0.95rem] text-ink-2">
                  <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                    <Check className="size-2.5" aria-hidden="true" />
                  </span>
                  {ind}
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </section>

      <section className="bg-paper py-20 sm:py-28" aria-labelledby="local-heading">
        <Container>
          <SectionHeading eyebrow="Local expertise" title={<span id="local-heading">What matters in <em>{c.name}</em></span>} />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {c.local.map((b, i) => (
              <li key={b.title} data-reveal style={{ ["--d" as string]: i * 80 }} className="group bg-white p-7 transition-colors duration-500 hover:bg-mint-50 sm:p-8">
                <span className="font-display text-5xl font-semibold tracking-tight text-mint transition-colors duration-500 group-hover:text-brand">0{i + 1}</span>
                <h3 className="mt-8 text-xl font-semibold">{b.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{b.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {local.length > 0 && (
        <section className="py-20 sm:py-24" aria-labelledby="focus-heading">
          <Container>
            <SectionHeading eyebrow={`Popular in ${c.name}`} title={<span id="focus-heading">Our {c.name} <em>specialities</em></span>} />
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {local.map((p, i) => (
                <li key={p.slug} data-reveal style={{ ["--d" as string]: (i % 3) * 80 }}>
                  <Link href={locationHref(c.slug, p.slug)} className="group flex h-full flex-col rounded-3xl bg-brand p-7 text-white transition-all duration-500 hover:-translate-y-1 hover:shadow-brand">
                    <h3 className="text-xl font-semibold">{p.title}</h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-white/70">{p.lead}</p>
                    <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium text-mint">
                      Learn more <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <section className={`py-20 sm:py-28 ${local.length ? "border-t border-line" : ""}`} aria-labelledby="services-heading">
        <Container>
          <SectionHeading
            eyebrow="Services"
            title={<span id="services-heading">Services for <em>{c.name}</em> businesses</span>}
            lead="Every discipline from one accountable team — explore the services most requested in this market."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {svc.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </div>
          <p data-reveal className="mt-8 text-sm text-muted">
            Looking for something else?{" "}
            <Link href="/services" className="font-medium text-brand underline underline-offset-4">
              Browse all services
            </Link>{" "}
            or{" "}
            <Link href="/video-editing" className="font-medium text-brand underline underline-offset-4">
              video editing
            </Link>
            .
          </p>
        </Container>
      </section>

      <FAQ faqs={c.faqs} eyebrow={`${c.name} FAQ`} title={<>Working with us in <em>{c.name}</em></>} lead={`Common questions from ${c.name} businesses.`} />

      {nearby.length > 0 && (
        <section className="border-t border-line py-14" aria-label="Nearby locations">
          <Container>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-brand-500">Also serving</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {nearby.map((n) => (
                <li key={n.slug}>
                  <Link href={locationHref(n.slug)} className="inline-flex items-center gap-1 rounded-full border border-line px-4 py-2 text-sm text-ink-2 hover:border-brand hover:text-brand">
                    {n.name} <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/locations" className="inline-flex rounded-full bg-mint-50 px-4 py-2 text-sm font-medium text-brand">
                  All locations
                </Link>
              </li>
            </ul>
          </Container>
        </section>
      )}

      <CTA eyebrow={`Start your ${c.name} project`} title={<>Let&apos;s talk about your goals in <em>{c.name}.</em></>} />
    </>
  );
}
