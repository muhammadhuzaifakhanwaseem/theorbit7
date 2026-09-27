import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/sections/Reveal";

export default function CTASection({
  title = "Let's Build Something That Actually Works",
  description = "Tell us what you're building. We'll respond within one business day with next steps, not a sales pitch.",
  primaryLabel = "Get A Call Now",
  primaryHref = "/contact-us",
  secondaryLabel = "Schedule A Call",
  secondaryHref = "/contact-us",
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="bg-brand py-20 sm:py-28">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            {description}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button href={primaryHref} variant="secondary" size="lg">
              {primaryLabel}
            </Button>
            <Button href={secondaryHref} variant="outline-light" size="lg">
              {secondaryLabel}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
