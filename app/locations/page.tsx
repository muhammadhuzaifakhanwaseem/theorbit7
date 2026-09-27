import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import LocationCard from "@/components/cards/LocationCard";
import CTASection from "@/components/sections/CTASection";
import { locations } from "@/data/locations";

export const metadata: Metadata = {
  title: "Locations We Serve",
  description:
    "The Orbit 7 supports product teams across San Francisco, New York, Austin, Toronto, London, Dubai, and Singapore.",
  alternates: { canonical: "/locations" },
};

export default function LocationsIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Locations"
        title="Distributed delivery, built around your time zone"
        description="We support clients across seven regions with delivery pods structured around your working hours, not ours."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Locations" }]}
      />
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((loc) => (
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
      <CTASection />
    </>
  );
}
