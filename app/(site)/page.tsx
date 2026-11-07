import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import HomeHero from "@/components/home/HomeHero";
import CeoSection from "@/components/home/CeoSection";
import officeStudio from "@/assets/images/office-studio.jpg";
import officeEditSuite from "@/assets/images/office-edit-suite.jpg";
import ServicesExplorer from "@/components/home/ServicesExplorer";
import ProcessScroll from "@/components/home/ProcessScroll";
import LatestPosts from "@/components/home/LatestPosts";
import BookingBand from "@/components/home/BookingBand";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import JsonLd from "@/components/ui/JsonLd";
import ProjectCard from "@/components/cards/ProjectCard";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import { categories, services, servicesIn } from "@/data/services";
import { projects } from "@/data/projects";
import { homeFaqs, industries, principles, processSteps, techGroups } from "@/data/content";
import { buildMetadata } from "@/lib/seo";
import { faqSchema, professionalServiceSchema, webPageSchema } from "@/lib/schema";
import { site } from "@/lib/site";

const title = "The Orbit 7 | Digital Agency & Software House";
const description =
  "Build and scale your business with The Orbit 7. We engineer high-performance websites, mobile apps, custom software, AI automation, and ROI-driven marketing.";

/** Re-rendered at most every 5 minutes (and immediately on publish) so the latest blog posts stay current. */
export const revalidate = 300;

export const metadata = buildMetadata({
  title,
  description,
  path: "/",
  keywords: [
    "digital agency",
    "software house",
    "website development company",
    "mobile app development",
    "seo agency",
    "ai automation agency",
  ],
});

export default function HomePage() {
  const grouped = Object.fromEntries(
    categories.map((c) => [
      c.id,
      servicesIn(c.id).map(({ slug, title, summary }) => ({ slug, title, summary })),
    ]),
  );

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ name: title, path: "/", description }),
          professionalServiceSchema(services),
          faqSchema(homeFaqs),
        ]}
      />

      <HomeHero />

      {/* ─────────── Services ─────────── */}
      <section id="services" className="py-24 sm:py-32" aria-labelledby="services-heading">
        <Container>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="What we do"
              title={
                <span id="services-heading">
                  Every digital capability, <em>one orbit.</em>
                </span>
              }
              lead={`${categories.length} disciplines and ${services.length} specialist services — planned together, delivered by one accountable team, so your website, software and marketing finally pull in the same direction.`}
            />
            <div data-reveal>
              <Button href="/services" variant="secondary">
                View all services
              </Button>
            </div>
          </div>
          <div className="mt-14" data-reveal>
            <ServicesExplorer categories={categories} grouped={grouped} />
          </div>
        </Container>
      </section>

      {/* ─────────── About intro ─────────── */}
      <section className="relative isolate overflow-hidden bg-brand py-24 text-white noise sm:py-32" aria-labelledby="about-heading">
        {/* Studio photograph, toned into the brand green */}
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image src={officeStudio} alt="" fill placeholder="blur" quality={70} sizes="100vw" className="object-cover object-[60%_50%] opacity-50 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgb(22_62_51/0.95)_0%,rgb(22_62_51/0.84)_45%,rgb(22_62_51/0.55)_100%)]" />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute -right-60 -top-60 size-[50rem] rounded-full border border-white/[0.06]" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 size-[34rem] rounded-full border border-white/[0.06]" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-1/4 size-[30rem] rounded-full bg-brand-500/40 blur-[100px]" />
        <Container className="relative grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <SectionHeading
              light
              eyebrow="About The Orbit 7"
              title={
                <span id="about-heading">
                  A digital agency with the <em>engineering depth</em> of a software house.
                </span>
              }
            />
            <div data-reveal className="mt-8 space-y-5 text-lg leading-relaxed text-white/75">
              <p>
                Most businesses juggle a web agency, a separate development shop, a marketing freelancer and a
                designer — and spend their time translating between them. We built The Orbit 7 to remove that
                friction.
              </p>
              <p>
                Strategists, designers, engineers and marketers work side by side on your project. The result is
                digital work that is beautiful, technically sound and built to grow from day one.
              </p>
            </div>
            <div data-reveal className="mt-10 flex flex-wrap gap-3">
              <Button href="/about-us" variant="light">
                More about us
              </Button>
              <Button href="/portfolio" variant="ghost-light">
                See our work
              </Button>
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {principles.map((p, i) => (
              <li
                key={p.title}
                data-reveal
                style={{ ["--d" as string]: i * 90 }}
                className="glass-dark rounded-3xl p-6 transition-colors duration-500 hover:bg-white/10"
              >
                <span className="font-mono text-xs text-mint">0{i + 1}</span>
                <h3 className="mt-6 text-xl font-semibold">{p.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-white/65">{p.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CeoSection />

      {/* ─────────── Featured work ─────────── */}
      <section className="py-24 sm:py-32" aria-labelledby="work-heading">
        <Container>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Selected work"
              title={
                <span id="work-heading">
                  Products we <em>design, build</em> and grow.
                </span>
              }
              lead="A look at the kind of platforms, apps and campaigns we deliver across industries."
            />
            <div data-reveal>
              <Button href="/portfolio" variant="secondary">
                View all work
              </Button>
            </div>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {projects.slice(0, 4).map((p, i) => (
              <ProjectCard key={p.slug} project={p} priority={i === 0} />
            ))}
          </div>
        </Container>
      </section>

      {/* ─────────── Process ─────────── */}
      <section className="bg-paper py-24 sm:py-32" aria-labelledby="process-heading">
        <Container className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="How we work"
              title={
                <span id="process-heading">
                  A clear process from <em>first call</em> to continuous growth.
                </span>
              }
              lead="Six stages, full transparency. You always know what we are working on, what comes next and how it ties back to your goals."
            />
            <div data-reveal className="mt-10">
              <Button href="/contact-us">Book a discovery call</Button>
            </div>
            <figure data-reveal className="relative mt-12 overflow-hidden rounded-[2rem] shadow-[0_30px_70px_-35px_rgb(22_62_51/0.5)] ring-1 ring-black/5">
              <Image
                src={officeEditSuite}
                alt="The Orbit 7 team planning at the whiteboard while editors grade footage"
                placeholder="blur"
                quality={85}
                sizes="(min-width: 1024px) 62vw, 170vw"
                className="aspect-[4/3] w-full object-cover object-[68%_50%] sm:aspect-[16/10] lg:aspect-[4/3]"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand/55 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-4 bottom-4 flex flex-wrap gap-2">
                {["Plan", "Design", "Build", "Edit", "Grow"].map((t) => (
                  <span key={t} className="rounded-full bg-white/85 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-widest text-brand backdrop-blur">
                    {t}
                  </span>
                ))}
              </figcaption>
            </figure>
          </div>
          <ProcessScroll steps={processSteps} />
        </Container>
      </section>

      <BookingBand />

      {/* ─────────── Technologies ─────────── */}
      <section className="py-24 sm:py-32" aria-labelledby="tech-heading">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Technologies & expertise"
            title={
              <span id="tech-heading">
                Modern, proven tools — <em>chosen for you.</em>
              </span>
            }
            lead="We pick technology for longevity, performance and the talent you can hire later — never for hype."
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {techGroups.map((g, i) => (
              <div
                key={g.label}
                data-reveal
                style={{ ["--d" as string]: (i % 4) * 70 }}
                className="sheen group rounded-3xl bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
              >
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-brand-500">{g.label}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-line bg-paper px-3 py-1.5 text-sm text-ink-2 transition-colors group-hover:border-brand/20"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─────────── Industries ─────────── */}
      <section className="relative overflow-hidden bg-sand py-24 sm:py-32" aria-labelledby="industries-heading" id="industries">
        <Container className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading
            eyebrow="Industries we serve"
            title={
              <span id="industries-heading">
                Sector knowledge that <em>shortens</em> the learning curve.
              </span>
            }
            lead="From retail and real estate to healthcare and SaaS, we bring patterns, integrations and compliance awareness that work in your market."
            className="lg:sticky lg:top-32 lg:self-start"
          />
          <ul className="grid border-t border-ink/10 sm:grid-cols-2">
            {industries.map((ind, i) => (
              <li
                key={ind.name}
                data-reveal
                style={{ ["--d" as string]: (i % 2) * 80 }}
                className="group border-b border-ink/10 py-6 sm:odd:pr-8 sm:even:border-l sm:even:pl-8"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-brand-500">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-xl font-semibold transition-colors group-hover:text-brand">{ind.name}</h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{ind.text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ─────────── Popular services quick links ─────────── */}
      <section className="py-24 sm:py-28" aria-labelledby="popular-heading">
        <Container>
          <div data-reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>Popular services</Eyebrow>
              <h2 id="popular-heading" className="mt-4 text-3xl font-semibold sm:text-4xl">
                Where clients usually <em>start</em>
              </h2>
            </div>
            <Link href="/services" className="link-underline text-sm font-medium text-brand">
              See every service
            </Link>
          </div>
          <ul className="mt-10 grid gap-x-10 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {[
              "website-development",
              "mobile-app-development",
              "custom-software-development",
              "ai-automation",
              "seo-services",
              "google-ads-ppc",
              "social-media-marketing",
              "ecommerce-development",
              "ui-ux-design",
            ].map((slug) => {
              const s = services.find((x) => x.slug === slug)!;
              return (
                <li key={slug} className="border-b border-line">
                  <Link
                    href={`/services/${slug}`}
                    className="group flex items-center justify-between gap-4 py-5 text-lg font-medium transition-colors hover:text-brand"
                  >
                    {s.title}
                    <ArrowUpRight className="size-5 text-soft transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <LatestPosts />

      <FAQ faqs={homeFaqs} lead={`Everything you need to know about working with ${site.name}.`} />
      <CTA />
    </>
  );
}
