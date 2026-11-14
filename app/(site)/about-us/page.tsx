import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/ui/JsonLd";
import PageHero from "@/components/sections/PageHero";
import CTA from "@/components/sections/CTA";
import ProcessScroll from "@/components/home/ProcessScroll";
import { categories, servicesIn, serviceHref } from "@/data/services";
import { industries, principles, processSteps } from "@/data/content";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { site } from "@/lib/site";

const title = "About The Orbit 7 | Digital Agency & Software Company";
const description =
  "About The Orbit 7: company profile of a digital agency and software development company, established in 2016, uniting strategy, design, engineering and growth.";

export const metadata = buildMetadata({
  title,
  description,
  path: "/about-us",
  keywords: ["about The Orbit 7", "software development company", "digital agency", "company profile"],
});

const engagement = [
  {
    title: "Project-based",
    text: "A defined scope, timeline and investment for websites, apps, software builds, branding and other one-off projects.",
  },
  {
    title: "Monthly retainer",
    text: "Ongoing SEO, paid media, social media, content, maintenance or continuous product development with clear monthly deliverables.",
  },
  {
    title: "Dedicated team",
    text: "A blended team of designers, developers and marketers working as an extension of your business for larger roadmaps.",
  },
];

export default function AboutPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "About us", path: "/about-us" },
  ];
  return (
    <>
      <JsonLd data={[webPageSchema({ name: title, path: "/about-us", description, type: "AboutPage" }), breadcrumbSchema(crumbs)]} />
      <PageHero
        eyebrow="About us"
        title="About The Orbit 7: everything digital, *in one orbit.*"
        lead={`Established in ${site.foundingYear}, ${site.name} is a full-service digital agency and software development company. We help ambitious businesses plan, build and grow their digital presence — from the first website to complex software and always-on marketing.`}
        crumbs={crumbs}
      />

      {/* Story */}
      <section className="border-t border-line py-20 sm:py-28" aria-labelledby="story-heading">
        <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <SectionHeading
            eyebrow="Our story"
            title={
              <span id="story-heading">
                Built to end the <em>hand-off problem.</em>
              </span>
            }
          />
          <div className="space-y-6 text-lg leading-[1.75] text-ink-2">
            <p data-reveal>
              Growing businesses usually end up managing a patchwork of suppliers: a web agency for the site, a
              development shop for the app, a freelancer for SEO and someone else for social media. Each does their
              part, but nobody owns the whole picture — and the gaps between them are where budgets, timelines and
              results leak away.
            </p>
            <p data-reveal style={{ ["--d" as string]: 80 }}>
              {site.name} was created to close those gaps. We bring strategists, designers, software engineers and
              digital marketers into one team, working from one plan. Your website is built with SEO in mind from
              the first wireframe. Your app ships with analytics and a launch plan. Your campaigns land on pages
              engineered to convert.
            </p>
            <p data-reveal style={{ ["--d" as string]: 160 }}>
              The name reflects how we work: every discipline orbiting a single centre — your business goals.
            </p>
          </div>
        </Container>
      </section>

      {/* Mission / vision */}
      <section className="py-4" aria-label="Mission and vision">
        <Container className="grid gap-5 md:grid-cols-2">
          <div data-reveal className="noise relative overflow-hidden rounded-[2rem] bg-brand p-10 text-white sm:p-14">
            <div aria-hidden="true" className="absolute -right-24 -top-24 size-72 rounded-full border border-white/10" />
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-mint">Our mission</p>
            <p className="mt-6 font-display text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
              To make world-class digital capability <em className="accent text-mint">accessible</em> to every
              ambitious business.
            </p>
          </div>
          <div data-reveal style={{ ["--d" as string]: 100 }} className="relative overflow-hidden rounded-[2rem] bg-sand p-10 sm:p-14">
            <div aria-hidden="true" className="absolute -right-24 -bottom-24 size-72 animate-spin-slower rounded-full border border-dashed border-brand/20" />
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-brand-500">Our vision</p>
            <p className="mt-6 font-display text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
              A partner that clients keep for years because the <em className="accent text-brand">results</em>{" "}
              compound.
            </p>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-28" aria-labelledby="values-heading">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="What we believe"
            title={
              <span id="values-heading">
                The principles behind <em>every project</em>
              </span>
            }
          />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <li key={p.title} data-reveal style={{ ["--d" as string]: i * 80 }} className="sheen rounded-3xl bg-white p-7">
                <span className="font-display text-5xl font-semibold text-mint">0{i + 1}</span>
                <h3 className="mt-6 text-xl font-semibold">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Disciplines */}
      <section className="bg-paper py-20 sm:py-28" aria-labelledby="disciplines-heading">
        <Container>
          <SectionHeading
            eyebrow="What we do"
            title={
              <span id="disciplines-heading">
                Every discipline, <em>one team</em>
              </span>
            }
            lead="Engage us for a single service or combine them into one joined-up programme."
          />
          <div className="mt-14 divide-y divide-line border-y border-line">
            {categories.map((c, i) => (
              <div key={c.id} data-reveal className="grid gap-6 py-8 lg:grid-cols-[0.15fr_0.85fr_1.4fr] lg:items-start">
                <span className="font-mono text-sm text-brand-500">0{i + 1}</span>
                <div>
                  <h3 className="text-2xl font-semibold">
                    <Link href={`/services#${c.id}`} className="hover:text-brand">
                      {c.name}
                    </Link>
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted">{c.description}</p>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {servicesIn(c.id).map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={serviceHref(s.slug)}
                        className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-3.5 py-1.5 text-sm text-ink-2 transition-colors hover:border-brand hover:text-brand"
                      >
                        {s.title} <ArrowUpRight className="size-3.5" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="py-20 sm:py-28" aria-labelledby="process-heading">
        <Container className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="How we work"
              title={
                <span id="process-heading">
                  Our <em>delivery</em> process
                </span>
              }
              lead="The same transparent, six-stage process runs through every engagement — adapted to the size and type of your project."
            />
          </div>
          <ProcessScroll steps={processSteps} />
        </Container>
      </section>

      {/* Engagement models */}
      <section className="relative overflow-hidden bg-brand py-20 text-white noise sm:py-28" aria-labelledby="engage-heading">
        <div aria-hidden="true" className="absolute -right-40 -top-40 size-[36rem] rounded-full border border-white/10" />
        <Container className="relative">
          <SectionHeading
            light
            eyebrow="Ways to work together"
            title={
              <span id="engage-heading">
                Flexible <em>engagement</em> models
              </span>
            }
          />
          <ul className="mt-14 grid gap-5 md:grid-cols-3">
            {engagement.map((e, i) => (
              <li key={e.title} data-reveal style={{ ["--d" as string]: i * 90 }} className="glass-dark rounded-3xl p-8">
                <span className="font-mono text-xs text-mint">0{i + 1}</span>
                <h3 className="mt-6 text-2xl font-semibold">{e.title}</h3>
                <p className="mt-3 leading-relaxed text-white/70">{e.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Industries */}
      <section className="py-20 sm:py-28" aria-labelledby="ind-heading">
        <Container>
          <SectionHeading
            eyebrow="Industries"
            title={
              <span id="ind-heading">
                Industries <em>we serve</em>
              </span>
            }
          />
          <ul className="mt-12 flex flex-wrap gap-3">
            {industries.map((ind, i) => (
              <li
                key={ind.name}
                data-reveal
                style={{ ["--d" as string]: i * 40 }}
                className="rounded-full border border-line bg-white px-5 py-3 font-medium text-ink-2 shadow-soft"
                title={ind.text}
              >
                {ind.name}
              </li>
            ))}
          </ul>
          <div data-reveal className="mt-12">
            <Button href="/portfolio" variant="secondary">
              See our work
            </Button>
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
