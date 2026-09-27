import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/sections/Reveal";
import { processSteps } from "@/data/content";

export default function ProcessSection() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Our process"
          title="A structured path from idea to scaled product"
          description="Every engagement follows the same five-phase process, adjusted in depth to fit your stage — never skipped to save time."
        />
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.08}>
              <div className="border-t-2 border-brand pt-5">
                <span className="font-display text-sm text-ink-soft">{`0${i + 1}`}</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
