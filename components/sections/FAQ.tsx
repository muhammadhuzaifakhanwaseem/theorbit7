import { Plus } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

/** Native <details> accordion — answers are always in the HTML for crawlers. */
export default function FAQ({
  faqs,
  title = (
    <>
      Questions, <em>answered</em>
    </>
  ),
  eyebrow = "FAQ",
  lead = "Straight answers to the questions we hear most. Can't find yours? Just ask.",
}: {
  faqs: { q: string; a: string }[];
  title?: React.ReactNode;
  eyebrow?: string;
  lead?: string;
}) {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="faq-heading">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading eyebrow={eyebrow} title={<span id="faq-heading">{title}</span>} lead={lead} />
          <div data-reveal className="mt-8">
            <Button href="/contact-us" variant="secondary">
              Ask us anything
            </Button>
          </div>
        </div>
        <div className="divide-y divide-line border-y border-line">
          {faqs.map((f, i) => (
            <details key={f.q} className="group" data-reveal style={{ ["--d" as string]: i * 60 }} open={i === 0}>
              <summary className="flex items-start justify-between gap-6 py-6">
                <h3 className="text-lg font-medium tracking-[-0.01em] text-ink transition-colors group-hover:text-brand sm:text-xl">
                  {f.q}
                </h3>
                <span className="faq-icon mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong text-brand transition-all duration-300">
                  <Plus className="size-4" aria-hidden="true" />
                </span>
              </summary>
              <div className="faq-body pb-7 pr-12 leading-relaxed text-muted">{f.a}</div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
