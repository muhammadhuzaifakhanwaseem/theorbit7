import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import CaseStudyCard from "@/components/cards/CaseStudyCard";
import CTASection from "@/components/sections/CTASection";
import { caseStudies } from "@/data/case-studies";

export const metadata: Metadata = {
  title: "Portfolio & Case Studies",
  description:
    "A selection of digital products The Orbit 7 has designed and engineered across healthcare, fintech, education, ecommerce, real estate, and fitness.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Products we've engineered from scratch"
        description="A selection of engagements across industries — each one built end-to-end by a dedicated Orbit 7 team."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Portfolio" }]}
      />
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        </Container>
      </section>
      <CTASection title="Want results like these?" />
    </>
  );
}
