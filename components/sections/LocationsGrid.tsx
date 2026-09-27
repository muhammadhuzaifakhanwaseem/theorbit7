import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import LocationCard from "@/components/cards/LocationCard";
import Reveal from "@/components/sections/Reveal";
import { locations } from "@/data/locations";

export default function LocationsGrid() {
  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Where we work"
          title="Supporting product teams across seven regions"
          description="Distributed delivery pods structured around your working hours, not ours."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((loc, i) => (
            <Reveal key={loc.slug} delay={i * 0.05}>
              <LocationCard
                href={`/locations/${loc.slug}`}
                city={loc.city}
                region={loc.region}
                tagline={loc.tagline}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
