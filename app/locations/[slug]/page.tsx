import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, MapPin } from "lucide-react";
import { locations, getLocationBySlug } from "@/data/locations";
import { industries } from "@/data/industries";
import { SITE_URL, SITE_NAME } from "@/lib/utils";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import IndustryCard from "@/components/cards/IndustryCard";
import ProcessSection from "@/components/sections/ProcessSection";
import CaseStudiesGrid from "@/components/sections/CaseStudiesGrid";
import FAQ from "@/components/sections/FAQ";
import CTASection from "@/components/sections/CTASection";
import LocationCard from "@/components/cards/LocationCard";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) return {};
  return {
    title: `Software Development in ${location.city}`,
    description: location.heroDescription,
    alternates: { canonical: `/locations/${location.slug}` },
    openGraph: {
      title: `Software Development in ${location.city} | ${SITE_NAME}`,
      description: location.heroDescription,
      url: `${SITE_URL}/locations/${location.slug}`,
    },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) notFound();

  const servedIndustries = industries.filter((i) =>
    location.industriesServed.includes(i.slug)
  );
  const otherLocations = locations.filter((l) => l.slug !== location.slug).slice(0, 3);

  const faqs = [
    {
      q: `Does The Orbit 7 have a physical office in ${location.city}?`,
      a: `We operate as a distributed team supporting clients in ${location.city} remotely, with delivery pods structured around ${location.timezone} working hours. This page describes our service coverage for the region, not a physical office location.`,
    },
    {
      q: `What time zone overlap can we expect?`,
      a: `Our ${location.city} engagements are staffed to overlap meaningfully with ${location.timezone}, so standups, demos, and reviews happen live rather than asynchronously by default.`,
    },
    {
      q: `Which industries do you work with most in ${location.city}?`,
      a: `Most frequently ${servedIndustries.map((i) => i.name.toLowerCase()).join(", ")}, though we take on projects outside these when the technical fit is right.`,
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${SITE_NAME} — ${location.city}`,
    url: `${SITE_URL}/locations/${location.slug}`,
    areaServed: {
      "@type": "City",
      name: location.city,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.latitude,
      longitude: location.longitude,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        eyebrow="Location"
        title={`Software Development in ${location.city}`}
        description={location.heroDescription}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: location.city },
        ]}
      />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <SectionHeading title={`Working with product teams in ${location.city}`} />
              <p className="mt-6 text-base leading-relaxed text-ink-muted sm:text-lg">
                {location.intro}
              </p>
            </div>
            <aside className="space-y-4">
              <div className="flex items-center gap-3 rounded-xl border border-line bg-surface p-4">
                <MapPin className="size-5 shrink-0 text-brand" />
                <div>
                  <p className="text-sm font-medium text-ink">{location.region}</p>
                  <p className="text-xs text-ink-soft">Service coverage area</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-line bg-surface p-4">
                <Clock className="size-5 shrink-0 text-brand" />
                <div>
                  <p className="text-sm font-medium text-ink">{location.timezone}</p>
                  <p className="text-xs text-ink-soft">Primary delivery overlap</p>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {servedIndustries.length > 0 && (
        <section className="bg-surface py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow="Industries"
              title={`Industries we serve in ${location.city}`}
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {servedIndustries.map((ind) => (
                <IndustryCard
                  key={ind.slug}
                  href={`/industries/${ind.slug}`}
                  name={ind.name}
                  tagline={ind.tagline}
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      <ProcessSection />
      <CaseStudiesGrid limit={3} />

      <section className="py-20 sm:py-28">
        <Container className="max-w-3xl">
          <FAQ items={faqs} title={`${location.city} — frequently asked questions`} />
        </Container>
      </section>

      <section className="border-t border-line py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Other locations" title="We also support these regions" />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {otherLocations.map((loc) => (
              <LocationCard
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                city={loc.city}
                region={loc.region}
                tagline={loc.tagline}
              />
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title={`Let's talk about your ${location.city} project`}
        description={`Book a free discovery call with a team structured around ${location.timezone} working hours.`}
      />
    </>
  );
}
