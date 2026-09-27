import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import IndustryCard from "@/components/cards/IndustryCard";
import CTASection from "@/components/sections/CTASection";
import { industries } from "@/data/industries";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "The Orbit 7 builds digital products for healthcare, fintech, education, real estate, travel, food delivery, dating, ecommerce, fitness, and startups.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Industry expertise that shapes every build"
        description="Each industry brings its own compliance, trust, and performance requirements. We design around them from the first sprint, not after launch."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]}
      />
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
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
      <CTASection />
    </>
  );
}
