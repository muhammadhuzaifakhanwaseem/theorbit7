import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/ui/JsonLd";
import ServiceVisual from "@/components/visuals/ServiceVisual";
import ServiceCard from "@/components/cards/ServiceCard";
import ProjectCard from "@/components/cards/ProjectCard";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import { getCategory, getService, relatedServices, serviceHref, services, servicesIn } from "@/data/services";
import { projects } from "@/data/projects";
import { buildMetadata } from "@/lib/seo";
import { inlineTitle } from "@/lib/text";
import { breadcrumbSchema, faqSchema, serviceSchema, webPageSchema } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return buildMetadata({
    title: s.metaTitle,
    description: s.metaDescription,
    path: serviceHref(s.slug),
    keywords: s.keywords,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const category = getCategory(s.category);
  const t = inlineTitle(s.title);
  const related = relatedServices(s);
  const siblings = servicesIn(s.category).filter((x) => x.slug !== s.slug);
  const work = projects.filter((p) => p.services.includes(s.slug)).slice(0, 2);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: s.title, path: serviceHref(s.slug) },
  ];

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ name: s.metaTitle, path: serviceHref(s.slug), description: s.metaDescription }),
          serviceSchema({
            name: s.title,
            slug: s.slug,
            description: s.metaDescription,
            serviceType: s.title,
            category: category.name,
            offers: s.offerings.map((o) => o.title),
          }),
          breadcrumbSchema(crumbs),
          faqSchema(s.faqs),
        ]}
      />

      {/* ─────────── Hero ─────────── */}
      <section className="relative isolate overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40" aria-labelledby="service-title">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="bg-grid mask-radial absolute inset-0 opacity-60" />
          <div className="absolute -left-40 -top-40 size-[40rem] rounded-full bg-mint/70 blur-[110px]" />
          <div className="absolute -right-20 bottom-0 size-[26rem] rounded-full bg-sand blur-3xl" />
        </div>
        <Container>
          <Breadcrumbs items={crumbs} className="fade-late" />
          <div className="mt-10 grid items-center gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
            <div>
              <div className="fade-late" style={{ ["--delay" as string]: "0.05s" }}>
                <Eyebrow>{s.eyebrow}</Eyebrow>
              </div>
              <h1
                id="service-title"
                className="fade-late mt-5 text-[2.5rem] leading-[1.02] font-semibold tracking-[-0.032em] sm:text-6xl lg:text-[4.1rem]"
                style={{ ["--delay" as string]: "0.12s" }}
              >
                {s.h1}
              </h1>
              <p className="fade-late mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl" style={{ ["--delay" as string]: "0.3s" }}>
                {s.heroLead}
              </p>
              <div className="fade-late mt-9 flex flex-wrap gap-3" style={{ ["--delay" as string]: "0.42s" }}>
                <Button href="/contact-us" size="lg">
                  Get a free consultation
                </Button>
                <Button href="#overview" variant="secondary" size="lg" icon={false}>
                  Learn more
                </Button>
              </div>
              <ul className="fade-late mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-2" style={{ ["--delay" as string]: "0.55s" }}>
                {s.benefits.slice(0, 3).map((b) => (
                  <li key={b.title} className="inline-flex items-center gap-2">
                    <Check className="size-4 text-brand" aria-hidden="true" /> {b.title}
                  </li>
                ))}
              </ul>
            </div>
            <div className="fade-late px-4 sm:px-8" style={{ ["--delay" as string]: "0.25s" }}>
              <ServiceVisual kind={s.visual} tags={s.visualTags} className="mx-auto max-w-lg" />
            </div>
          </div>
        </Container>
      </section>

      {/* ─────────── Intro / overview ─────────── */}
      <section id="overview" className="scroll-mt-28 border-t border-line py-20 sm:py-28" aria-labelledby="overview-heading">
        <Container className="grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="Overview" title={<span id="overview-heading">{s.intro.heading}</span>} />
            <div className="mt-8 space-y-5 text-lg leading-[1.75] text-ink-2">
              {s.intro.paragraphs.map((p, i) => (
                <p key={i} data-reveal style={{ ["--d" as string]: i * 80 }}>
                  {p}
                </p>
              ))}
            </div>
          </div>
          <aside data-reveal className="sheen h-fit rounded-3xl bg-paper p-7 lg:sticky lg:top-32" aria-label="At a glance">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-brand-500">At a glance</p>
            <h2 className="mt-3 text-xl font-semibold">What&apos;s included</h2>
            <ul className="mt-5 space-y-3">
              {s.offerings.map((o) => (
                <li key={o.title} className="flex gap-3 text-[0.95rem] text-ink-2">
                  <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                    <Check className="size-2.5" aria-hidden="true" />
                  </span>
                  {o.title}
                </li>
              ))}
            </ul>
            <div className="mt-7 border-t border-line pt-6">
              <p className="text-sm text-muted">Part of our</p>
              <Link href={`/services#${category.id}`} className="link-underline font-medium text-brand">
                {category.name}
              </Link>
              <p className="mt-1 text-sm text-muted">services</p>
            </div>
          </aside>
        </Container>
      </section>

      {/* ─────────── Benefits ─────────── */}
      <section className="bg-paper py-20 sm:py-28" aria-labelledby="benefits-heading">
        <Container>
          <SectionHeading
            eyebrow="Benefits"
            title={
              <span id="benefits-heading">
                Why invest in <em>{t}</em>
              </span>
            }
          />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {s.benefits.map((b, i) => (
              <li key={b.title} data-reveal style={{ ["--d" as string]: i * 80 }} className="group bg-white p-7 transition-colors duration-500 hover:bg-mint-50 sm:p-8">
                <span className="font-display text-5xl font-semibold tracking-tight text-mint transition-colors duration-500 group-hover:text-brand">
                  0{i + 1}
                </span>
                <h3 className="mt-8 text-xl font-semibold">{b.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{b.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ─────────── Offerings ─────────── */}
      <section className="py-20 sm:py-28" aria-labelledby="offerings-heading">
        <Container>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="What we offer"
              title={
                <span id="offerings-heading">
                  Our {s.title} <em>services</em>
                </span>
              }
              lead={`A complete, flexible set of ${t} capabilities — engaged individually or as one end-to-end programme.`}
            />
          </div>
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {s.offerings.map((o, i) => (
              <li
                key={o.title}
                data-reveal
                style={{ ["--d" as string]: (i % 3) * 80 }}
                className="group relative overflow-hidden rounded-3xl border border-line bg-white p-7 transition-all duration-500 ease-premium hover:-translate-y-1 hover:border-brand/25 hover:shadow-lift"
              >
                <span className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-mint opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-80" />
                <span className="relative flex size-11 items-center justify-center rounded-2xl bg-mint-100 font-mono text-sm text-brand transition-colors duration-500 group-hover:bg-brand group-hover:text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="relative mt-6 text-xl font-semibold">{o.title}</h3>
                <p className="relative mt-3 leading-relaxed text-muted">{o.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ─────────── Process ─────────── */}
      <section className="relative overflow-hidden bg-brand py-20 text-white noise sm:py-28" aria-labelledby="process-heading">
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 -bottom-40 size-[36rem] rounded-full border border-white/10" />
        <Container className="relative">
          <SectionHeading
            light
            eyebrow="Our process"
            title={
              <span id="process-heading">
                How we deliver <em>{t}</em>
              </span>
            }
            lead="A proven, transparent methodology — so you always know what is happening, what comes next and why."
          />
          <ol className="mt-14 grid gap-4 md:grid-cols-5">
            {s.process.map((p, i) => (
              <li key={p.title} data-reveal style={{ ["--d" as string]: i * 90 }} className="glass-dark relative rounded-3xl p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full bg-mint font-mono text-xs font-semibold text-brand">
                    {i + 1}
                  </span>
                  {i < s.process.length - 1 && <span aria-hidden="true" className="hidden h-px flex-1 bg-white/20 md:block" />}
                </div>
                <h3 className="mt-6 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-white/65">{p.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ─────────── Deliverables + tech ─────────── */}
      <section className="py-20 sm:py-28" aria-labelledby="deliverables-heading">
        <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Deliverables"
              title={
                <span id="deliverables-heading">
                  What you <em>receive</em>
                </span>
              }
              lead="Tangible outputs at every stage, documented and handed over in your name."
            />
            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {s.deliverables.map((d, i) => (
                <li key={d} data-reveal style={{ ["--d" as string]: (i % 2) * 70 }} className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4 text-[0.95rem] text-ink-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal className="relative overflow-hidden rounded-[2rem] bg-sand p-8 sm:p-10">
            <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-72 animate-spin-slower rounded-full border border-dashed border-brand/20" />
            <Eyebrow>Technology</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Tools & <em>platforms</em>
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              We select the stack for your goals, budget and long-term maintainability. Typical tools for{" "}
              {t} include:
            </p>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {s.tech.map((t) => (
                <li key={t} className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-2 shadow-soft ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-0.5">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ─────────── Use cases ─────────── */}
      <section className="bg-paper py-20 sm:py-28" aria-labelledby="usecases-heading">
        <Container>
          <SectionHeading
            eyebrow="Industry use cases"
            title={
              <span id="usecases-heading">
                Where {t} <em>makes an impact</em>
              </span>
            }
          />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {s.useCases.map((u, i) => (
              <li key={u.title} data-reveal style={{ ["--d" as string]: i * 80 }} className="rounded-3xl bg-white p-7 shadow-soft ring-1 ring-line">
                <span aria-hidden="true" className="block h-1 w-10 rounded-full bg-brand" />
                <h3 className="mt-6 text-lg font-semibold">{u.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{u.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ─────────── Why us ─────────── */}
      <section className="py-20 sm:py-28" aria-labelledby="why-heading">
        <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Why The Orbit 7"
              title={
                <span id="why-heading">
                  Why choose The Orbit 7 for <em>{t}?</em>
                </span>
              }
              lead="One accountable partner across strategy, design, engineering and growth — focused on outcomes, not just outputs."
            />
            <div data-reveal className="mt-10">
              <Button href="/contact-us">Talk to a specialist</Button>
            </div>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2">
            {s.whyUs.map((w, i) => (
              <li key={w.title} data-reveal style={{ ["--d" as string]: i * 80 }} className="sheen rounded-3xl bg-white p-7">
                <span className="flex size-10 items-center justify-center rounded-full bg-brand text-white">
                  <Check className="size-4" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-lg font-semibold">{w.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{w.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ─────────── Related work ─────────── */}
      {work.length > 0 && (
        <section className="border-t border-line py-20 sm:py-28" aria-labelledby="work-heading">
          <Container>
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <SectionHeading
                eyebrow="Related work"
                title={
                  <span id="work-heading">
                    {s.title} <em>in practice</em>
                  </span>
                }
              />
              <div data-reveal>
                <Button href="/portfolio" variant="secondary">
                  View all work
                </Button>
              </div>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {work.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <FAQ
        faqs={s.faqs}
        eyebrow={`${s.title} FAQ`}
        title={
          <>
            {s.title} — <em>frequently asked</em>
          </>
        }
        lead={`Answers to common questions about our ${t} services.`}
      />

      {/* ─────────── Related services ─────────── */}
      <section className="bg-paper py-20 sm:py-28" aria-labelledby="related-heading">
        <Container>
          <SectionHeading
            eyebrow="Related services"
            title={
              <span id="related-heading">
                Services that <em>pair well</em>
              </span>
            }
            lead={`Clients who invest in ${t} often combine it with these services for stronger results.`}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r, i) => (
              <ServiceCard key={r.slug} service={r} index={i} />
            ))}
          </div>
          {siblings.length > 0 && (
            <div data-reveal className="mt-12 rounded-3xl border border-line bg-white p-6 sm:p-8">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-brand-500">More in {category.name}</p>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {siblings.map((x) => (
                  <li key={x.slug}>
                    <Link
                      href={serviceHref(x.slug)}
                      className="group inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm text-ink-2 transition-colors hover:border-brand hover:bg-brand hover:text-white"
                    >
                      {x.title}
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </section>

      <CTA
        eyebrow={`Start your ${t} project`}
        title={
          <>
            Let&apos;s talk about your <em>{t}</em> goals.
          </>
        }
        text={`Share a little about your business and what you want to achieve. We'll reply with practical recommendations and a clear proposal for your ${t} project.`}
        secondary={{ label: "All services", href: "/services" }}
      />
    </>
  );
}
