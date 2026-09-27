import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import IndustryCard from "@/components/cards/IndustryCard";
import Reveal from "@/components/sections/Reveal";
import { industries } from "@/data/industries";

export default function IndustriesGrid() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Industries"
          title="Built for the realities of your industry"
          description="Every industry brings its own compliance, trust, and performance requirements. We design around them from day one."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal key={ind.slug} delay={i * 0.05}>
              <IndustryCard href={`/industries/${ind.slug}`} name={ind.name} tagline={ind.tagline} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
