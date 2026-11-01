import { ArrowUpRight, Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/ui/JsonLd";
import PageHero from "@/components/sections/PageHero";
import ProcessScroll from "@/components/home/ProcessScroll";
import { cultureValues, jobs } from "@/data/company";
import { processSteps } from "@/data/content";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { absoluteUrl, site } from "@/lib/site";

const title = "Life at The Orbit 7 | Careers, Culture & Open Roles";
const description =
  "Discover life at The Orbit 7: our culture, values and how we work — and explore careers in design, engineering, AI, SEO, marketing and video editing.";

export const metadata = buildMetadata({ title, description, path: "/life-at-the-orbit-7" });

export default function LifePage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Life at The Orbit 7", path: "/life-at-the-orbit-7" },
  ];
  const cvHref = `mailto:${site.email}?subject=${encodeURIComponent("Career enquiry — The Orbit 7")}`;
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ name: title, path: "/life-at-the-orbit-7", description }),
          breadcrumbSchema(crumbs),
          ...jobs.map((j) => ({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            title: j.title,
            description: j.summary,
            employmentType: j.type.toUpperCase().replace(/[\s-]/g, "_"),
            hiringOrganization: { "@type": "Organization", name: site.name, sameAs: site.url },
            jobLocationType: /remote/i.test(j.location) ? "TELECOMMUTE" : undefined,
            datePosted: new Date().toISOString().slice(0, 10),
            url: absoluteUrl("/life-at-the-orbit-7"),
          })),
        ]}
      />
      <PageHero
        eyebrow="Life at The Orbit 7"
        title="Do the best work of your *career.*"
        lead="We're a team of designers, engineers, strategists, marketers and editors who care about craft and outcomes. Here's what it's like to work with us."
        crumbs={crumbs}
      >
        <Button href="#roles" size="lg">
          See open roles
        </Button>
      </PageHero>

      <section className="border-t border-line py-20 sm:py-28" aria-labelledby="values-heading">
        <Container>
          <SectionHeading eyebrow="Culture" title={<span id="values-heading">What we <em>value</em></span>} />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cultureValues.map((v, i) => (
              <li key={v.title} data-reveal style={{ ["--d" as string]: (i % 3) * 80 }} className="sheen rounded-3xl bg-white p-7">
                <span className="font-display text-4xl font-semibold text-mint">0{i + 1}</span>
                <h3 className="mt-5 text-xl font-semibold">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{v.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-paper py-20 sm:py-28" aria-labelledby="work-heading">
        <Container className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading eyebrow="How we work" title={<span id="work-heading">A process everyone <em>understands</em></span>} lead="Every project follows the same transparent stages, so you always know what's expected and how your work contributes." />
          </div>
          <ProcessScroll steps={processSteps} />
        </Container>
      </section>

      <section id="roles" className="scroll-mt-24 py-20 sm:py-28" aria-labelledby="roles-heading">
        <Container>
          <SectionHeading eyebrow="Careers" title={<span id="roles-heading">Open <em>roles</em></span>} />
          {jobs.length ? (
            <ul className="mt-12 divide-y divide-line border-y border-line">
              {jobs.map((j) => (
                <li key={j.title} data-reveal className="grid gap-4 py-7 md:grid-cols-[1.5fr_1fr_auto] md:items-center">
                  <div>
                    <h3 className="text-xl font-semibold">{j.title}</h3>
                    <p className="mt-1 text-muted">{j.summary}</p>
                  </div>
                  <p className="text-sm text-ink-2">
                    {j.team} · {j.location} · {j.type}
                  </p>
                  <a href={j.applyHref ?? cvHref} className="inline-flex items-center gap-1 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-800">
                    Apply <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div data-reveal className="mt-12 flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-line bg-white p-8 sm:flex-row sm:items-center sm:p-10">
              <div>
                <p className="font-display text-2xl font-semibold">No open roles right now</p>
                <p className="mt-2 max-w-xl text-muted">
                  We&apos;re always happy to hear from talented designers, developers, marketers and video editors. Send us your CV and
                  portfolio and we&apos;ll be in touch when a suitable role opens.
                </p>
              </div>
              <a href={cvHref} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-medium text-white hover:bg-brand-800">
                <Mail className="size-4" aria-hidden="true" /> Send your CV
              </a>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
