import { ArrowUpRight, Download, Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import JsonLd from "@/components/ui/JsonLd";
import PageHero from "@/components/sections/PageHero";
import { press } from "@/data/company";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { companyPageReady } from "@/lib/company";
import { site } from "@/lib/site";

const title = "Press & Media | News and Media Resources | The Orbit 7";
const description = "Press releases, media coverage and brand resources for The Orbit 7, plus contact details for media enquiries.";

export const metadata = buildMetadata({ title, description, path: "/press-media", noindex: !companyPageReady["/press-media"] });

const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default function PressPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Press & media", path: "/press-media" },
  ];
  const items = [...press].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ name: title, path: "/press-media", description }),
          breadcrumbSchema(crumbs),
          ...items.map((p) => ({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: p.title,
            datePublished: p.date,
            description: p.summary,
            ...(p.href ? { url: p.href } : {}),
            publisher: { "@type": "Organization", name: p.outlet ?? site.name },
          })),
        ]}
      />
      <PageHero eyebrow="Press & media" title="News, announcements and *media resources.*" lead="The latest from The Orbit 7, plus everything journalists and partners need to write about us accurately." crumbs={crumbs} />
      <section className="border-t border-line py-20 sm:py-28" aria-labelledby="news-heading">
        <Container>
          <SectionHeading eyebrow="Newsroom" title={<span id="news-heading">Press releases & <em>coverage</em></span>} />
          {items.length ? (
            <ul className="mt-12 divide-y divide-line border-y border-line">
              {items.map((p) => (
                <li key={p.title} data-reveal className="grid gap-3 py-7 md:grid-cols-[12rem_1fr_auto] md:items-start">
                  <time dateTime={p.date} className="text-sm text-muted">
                    {dateFmt.format(new Date(p.date))}
                    {p.outlet && <span className="block font-medium text-brand-500">{p.outlet}</span>}
                  </time>
                  <div>
                    <h3 className="text-xl font-semibold">{p.title}</h3>
                    <p className="mt-2 text-muted">{p.summary}</p>
                  </div>
                  {p.href && (
                    <a href={p.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline">
                      Read <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p data-reveal className="mt-10 rounded-3xl border border-dashed border-line-strong bg-paper p-10 text-center text-muted">
              Press releases and media coverage will appear here.
            </p>
          )}
        </Container>
      </section>
      <section className="bg-paper py-20 sm:py-24" aria-labelledby="kit-heading">
        <Container className="grid gap-6 md:grid-cols-2">
          <div data-reveal className="sheen rounded-3xl bg-white p-8">
            <Download className="size-6 text-brand" aria-hidden="true" />
            <h2 id="kit-heading" className="mt-5 text-2xl font-semibold">Brand assets</h2>
            <p className="mt-3 text-muted">Need our logo or brand guidelines for an article or event? Email us and we&apos;ll send the latest media kit.</p>
            <a href={`mailto:${site.email}?subject=${encodeURIComponent("Media kit request")}`} className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white">
              Request media kit
            </a>
          </div>
          <div data-reveal style={{ ["--d" as string]: 80 }} className="sheen rounded-3xl bg-white p-8">
            <Mail className="size-6 text-brand" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-semibold">Media enquiries</h2>
            <p className="mt-3 text-muted">For interviews, comment or information about The Orbit 7, contact us and we&apos;ll respond as soon as possible.</p>
            <a href={`mailto:${site.email}?subject=${encodeURIComponent("Media enquiry")}`} className="mt-6 inline-flex items-center gap-2 font-medium text-brand hover:underline">
              {site.email}
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
