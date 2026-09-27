import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CaseStudyCard from "@/components/cards/CaseStudyCard";
import Reveal from "@/components/sections/Reveal";
import Button from "@/components/ui/Button";
import { caseStudies } from "@/data/case-studies";

export default function CaseStudiesGrid({ limit }: { limit?: number }) {
  const items = limit ? caseStudies.slice(0, limit) : caseStudies;
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Case studies"
            title="Products we've engineered from scratch"
            description="A sample of engagements across healthcare, fintech, education, ecommerce, real estate, and fitness."
            className="max-w-xl"
          />
          <Button href="/portfolio" variant="secondary">
            View all work
          </Button>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((study, i) => (
            <Reveal key={study.slug} delay={i * 0.06}>
              <CaseStudyCard study={study} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
