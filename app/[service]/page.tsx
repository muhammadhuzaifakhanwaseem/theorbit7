import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { services, getServiceBySlug } from "@/data/services";
import { SITE_URL, SITE_NAME } from "@/lib/utils";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/sections/Reveal";
import ProcessSection from "@/components/sections/ProcessSection";
import CaseStudiesGrid from "@/components/sections/CaseStudiesGrid";
import FAQ from "@/components/sections/FAQ";
import CTASection from "@/components/sections/CTASection";
import RelatedServices from "@/components/sections/RelatedServices";
import RelatedIndustries from "@/components/sections/RelatedIndustries";

export function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: `${service.title} Services`,
    description: service.summary,
    alternates: { canonical: `/${service.slug}` },
    openGraph: {
      title: `${service.title} | ${SITE_NAME}`,
      description: service.summary,
      url: `${SITE_URL}/${service.slug}`,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service: slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    description: service.summary,
    areaServed: "Worldwide",
    url: `${SITE_URL}/${service.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        eyebrow={service.category}
        title={service.title}
        description={service.heroDescription}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/#services" },
          { label: service.title },
        ]}
      />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-16 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <SectionHeading title={`${service.title}, done properly`} />
              <div className="mt-6 space-y-5">
                {service.overview.map((p, i) => (
                  <p key={i} className="text-base leading-relaxed text-ink-muted">
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-12 grid gap-6 sm:grid-cols-2">
                {service.features.map((f, i) => (
                  <Reveal key={f.title} delay={i * 0.06}>
                    <div className="rounded-2xl border border-line bg-white p-6">
                      <h3 className="font-display text-base font-semibold text-ink">
                        {f.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                        {f.description}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <aside className="space-y-8">
              <div className="rounded-2xl border border-line bg-surface p-6">
                <h3 className="font-display text-base font-semibold text-ink">
                  What you get
                </h3>
                <ul className="mt-4 space-y-3">
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-sm text-ink-muted">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-line bg-surface p-6">
                <h3 className="font-display text-base font-semibold text-ink">
                  Technology we use
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.techStack.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-ink-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <ProcessSection />
      <CaseStudiesGrid limit={3} />

      <section className="border-t border-line py-20 sm:py-28">
        <Container className="max-w-3xl">
          <FAQ items={service.faqs} title={`${service.title} — frequently asked questions`} />
        </Container>
      </section>

      <RelatedServices slugs={service.relatedServices} />
      <RelatedIndustries slugs={service.relatedIndustries} />

      <CTASection
        title={`Ready to start your ${service.title.toLowerCase()} project?`}
        description="Book a free discovery call. We'll come back with a scoped plan, not a sales pitch."
      />
    </>
  );
}
