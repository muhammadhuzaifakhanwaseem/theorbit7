import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { caseStudies, getCaseStudyBySlug } from "@/data/case-studies";
import { SITE_URL, SITE_NAME } from "@/lib/utils";
import Breadcrumbs from "@/components/Breadcrumbs";
import Container from "@/components/ui/Container";
import CaseStudyCard from "@/components/cards/CaseStudyCard";
import CTASection from "@/components/sections/CTASection";
import SectionHeading from "@/components/ui/SectionHeading";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/portfolio/${study.slug}` },
    openGraph: {
      title: `${study.title} | ${SITE_NAME}`,
      description: study.summary,
      url: `${SITE_URL}/portfolio/${study.slug}`,
      images: [{ url: study.heroImage }],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  const more = caseStudies.filter((c) => c.slug !== study.slug).slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: study.title,
    creator: { "@type": "Organization", name: SITE_NAME },
    about: study.category,
    url: `${SITE_URL}/portfolio/${study.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="border-b border-line bg-surface-dark text-white">
        <Container>
          <Breadcrumbs
            dark
            items={[
              { label: "Home", href: "/" },
              { label: "Portfolio", href: "/portfolio" },
              { label: study.client },
            ]}
          />
          <div className="max-w-3xl pb-16 pt-6 sm:pb-20 sm:pt-10">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-white/70">
              {study.category}
            </p>
            <h1 className="font-display text-3xl font-semibold leading-tight sm:text-5xl">
              {study.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              {study.summary}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
            <Image
              src={study.heroImage}
              alt={`${study.client} — ${study.title}`}
              fill
              unoptimized
              priority
              className="object-cover"
            />
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {study.stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-line bg-surface p-6 text-center">
                <p className="font-display text-2xl font-semibold text-brand sm:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-ink-muted">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-3">
            <div className="space-y-10 lg:col-span-2">
              <div>
                <h2 className="font-display text-xl font-semibold text-ink">The challenge</h2>
                <p className="mt-3 text-base leading-relaxed text-ink-muted">{study.challenge}</p>
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold text-ink">The solution</h2>
                <p className="mt-3 text-base leading-relaxed text-ink-muted">{study.solution}</p>
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold text-ink">The result</h2>
                <p className="mt-3 text-base leading-relaxed text-ink-muted">{study.result}</p>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-line bg-surface p-6">
                <p className="text-sm font-medium text-ink-soft">Client</p>
                <p className="mt-1 font-display text-base font-semibold text-ink">{study.client}</p>
              </div>
              <div className="rounded-2xl border border-line bg-surface p-6">
                <p className="text-sm font-medium text-ink-soft">Technologies</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {study.technologies.map((t) => (
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

          <Link
            href="/portfolio"
            className="mt-16 inline-flex items-center gap-2 text-sm font-medium text-brand"
          >
            <ArrowLeft className="size-4" />
            Back to all case studies
          </Link>
        </Container>
      </section>

      <section className="bg-surface py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="More work" title="Other projects you might like" />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {more.map((s) => (
              <CaseStudyCard key={s.slug} study={s} />
            ))}
          </div>
        </Container>
      </section>

      <CTASection title="Want results like these for your product?" />
    </>
  );
}
