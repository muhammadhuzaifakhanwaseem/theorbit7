import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { industries, getIndustryBySlug } from "@/data/industries";
import { services } from "@/data/services";
import { caseStudies } from "@/data/case-studies";
import { SITE_URL, SITE_NAME } from "@/lib/utils";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/sections/Reveal";
import ServiceCard from "@/components/cards/ServiceCard";
import CaseStudyCard from "@/components/cards/CaseStudyCard";
import ProcessSection from "@/components/sections/ProcessSection";
import FAQ from "@/components/sections/FAQ";
import CTASection from "@/components/sections/CTASection";
import RelatedIndustries from "@/components/sections/RelatedIndustries";
import { Sparkles } from "lucide-react";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};
  return {
    title: `${industry.name} Software Development`,
    description: industry.heroDescription,
    alternates: { canonical: `/industries/${industry.slug}` },
    openGraph: {
      title: `${industry.name} Software Development | ${SITE_NAME}`,
      description: industry.heroDescription,
      url: `${SITE_URL}/industries/${industry.slug}`,
    },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const relatedServices = industry.relatedServices
    .map((s) => services.find((svc) => svc.slug === s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const relatedCaseStudies = caseStudies.filter((c) => c.industrySlug === industry.slug);
  const otherIndustries = industries
    .filter((i) => i.slug !== industry.slug)
    .slice(0, 3)
    .map((i) => i.slug);

  return (
    <>
      <PageHero
        eyebrow="Industry"
        title={`${industry.name} Software Development`}
        description={industry.heroDescription}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: industry.name },
        ]}
      />

      <section className="py-20 sm:py-28">
        <Container>
          <p className="max-w-3xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {industry.intro}
          </p>

          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="The challenges" title="Where most teams get stuck" />
              <div className="mt-8 space-y-6">
                {industry.problems.map((p, i) => (
                  <Reveal key={p.title} delay={i * 0.06}>
                    <div className="border-l-2 border-line pl-5">
                      <h3 className="font-display text-base font-semibold text-ink">{p.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{p.description}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <div>
              <SectionHeading eyebrow="Our approach" title="How we design around them" />
              <div className="mt-8 space-y-6">
                {industry.solutions.map((s, i) => (
                  <Reveal key={s.title} delay={i * 0.06}>
                    <div className="border-l-2 border-brand pl-5">
                      <h3 className="font-display text-base font-semibold text-ink">{s.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{s.description}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Capabilities"
            title={`What we build for ${industry.name.toLowerCase()} teams`}
          />
          <div className="mt-10 flex flex-wrap gap-3">
            {industry.features.map((f) => (
              <span
                key={f}
                className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm text-ink-muted"
              >
                <CheckCircle2 className="size-4 text-brand" />
                {f}
              </span>
            ))}
          </div>

          <div className="mt-10">
            <p className="text-sm font-medium text-ink-soft">Common technology stack</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {industry.techStack.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {relatedServices.length > 0 && (
        <section className="py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow="Related services"
              title={`Services built for ${industry.name.toLowerCase()}`}
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((s) => (
                <ServiceCard
                  key={s.slug}
                  href={`/${s.slug}`}
                  title={s.title}
                  description={s.summary}
                  Icon={Sparkles}
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      <ProcessSection />

      {relatedCaseStudies.length > 0 && (
        <section className="bg-surface py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow="Case studies"
              title={`${industry.name} products we've engineered`}
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedCaseStudies.map((study) => (
                <CaseStudyCard key={study.slug} study={study} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="py-20 sm:py-28">
        <Container className="max-w-3xl">
          <FAQ items={industry.faqs} title={`${industry.name} — frequently asked questions`} />
        </Container>
      </section>

      <RelatedIndustries slugs={otherIndustries} />

      <CTASection
        title={`Let's talk about your ${industry.name.toLowerCase()} product`}
        description="Book a free discovery call and we'll come back with a scoped plan built around your industry's specifics."
      />
    </>
  );
}
