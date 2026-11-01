import Link from "next/link";
import { ArrowUpRight, Globe2, MapPin, Video } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import JsonLd from "@/components/ui/JsonLd";
import PageHero from "@/components/sections/PageHero";
import CTA from "@/components/sections/CTA";
import BookCallButton from "@/components/booking/BookCallButton";
import { cities, localServicePages, locationHref, regions } from "@/data/locations";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site";

const title = "Locations We Serve | UAE, USA, UK & Asia | The Orbit 7";
const description =
  "The Orbit 7 works with businesses in Dubai, Abu Dhabi, Sharjah, Ajman, San Francisco, New York, Austin, Los Angeles, Chicago, Toronto, London and Singapore — remotely, as one team.";

export const metadata = buildMetadata({ title, description, path: "/locations" });

export default function LocationsPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Locations", path: "/locations" },
  ];
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ name: title, path: "/locations", description, type: "CollectionPage" }),
          breadcrumbSchema(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Locations served by The Orbit 7",
            itemListElement: cities.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: `${c.name}, ${c.country}`, url: absoluteUrl(locationHref(c.slug)) })),
          },
        ]}
      />
      <PageHero
        eyebrow="Locations"
        title="One team, serving businesses *worldwide.*"
        lead="We partner with companies across the UAE, North America, the UK and Asia — remotely, with structured communication, scheduled calls in your time zone and the same delivery process everywhere."
        crumbs={crumbs}
      >
        <BookCallButton size="lg">Book a free consultation</BookCallButton>
      </PageHero>

      {regions.map((r, ri) => (
        <section key={r.id} className={`py-16 sm:py-20 ${ri % 2 ? "bg-paper" : "border-t border-line"}`} aria-labelledby={`r-${r.id}`}>
          <Container>
            <h2 id={`r-${r.id}`} className="flex items-center gap-3 text-3xl font-semibold sm:text-4xl" data-reveal>
              <Globe2 className="size-7 text-brand-500" aria-hidden="true" /> {r.name}
            </h2>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cities
                .filter((c) => c.region === r.id)
                .map((c, i) => {
                  const local = localServicePages.filter((p) => p.city === c.slug);
                  return (
                    <li key={c.slug} data-reveal style={{ ["--d" as string]: (i % 3) * 80 }} className="group relative flex flex-col rounded-3xl border border-line bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
                      <div className="flex items-center justify-between">
                        <span className="flex size-11 items-center justify-center rounded-2xl bg-mint-100 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                          <MapPin className="size-5" aria-hidden="true" />
                        </span>
                        <span className="font-mono text-xs text-soft">{c.countryCode}</span>
                      </div>
                      <h3 className="mt-6 text-2xl font-semibold">
                        <Link href={locationHref(c.slug)} className="after:absolute after:inset-0 group-hover:text-brand">
                          {c.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-muted">{c.country}</p>
                      <p className="mt-3 line-clamp-3 leading-relaxed text-muted">{c.lead}</p>
                      {local.length > 0 && (
                        <ul className="relative z-10 mt-5 flex flex-wrap gap-1.5">
                          {local.map((p) => (
                            <li key={p.slug}>
                              <Link href={locationHref(c.slug, p.slug)} className="inline-flex rounded-full bg-mint-50 px-3 py-1 text-xs text-brand ring-1 ring-brand/10 hover:bg-brand hover:text-white">
                                {p.title.replace(` in ${c.name}`, "").replace(" Company", "")}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                      <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium text-brand">
                        Explore {c.name} <ArrowUpRight className="size-4" aria-hidden="true" />
                      </span>
                    </li>
                  );
                })}
            </ul>
          </Container>
        </section>
      ))}

      <section className="py-20 sm:py-28" aria-labelledby="remote-heading">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow="How we work across borders"
            title={
              <span id="remote-heading">
                Remote by design, <em>personal</em> in practice
              </span>
            }
            lead="We don't claim offices we don't have. Instead, we've built a delivery process that makes distance irrelevant."
          />
          <ul className="grid gap-4 sm:grid-cols-2">
            {[
              ["Calls in your time zone", "We schedule workshops, demos and check-ins to suit your working hours."],
              ["Shared project boards", "See progress, priorities and decisions at any time."],
              ["Weekly demos", "Working software and designs reviewed together, regularly."],
              ["Clear written updates", "Plain-language summaries so nothing gets lost between calls."],
            ].map(([t, d], i) => (
              <li key={t} data-reveal style={{ ["--d" as string]: i * 80 }} className="sheen rounded-3xl bg-white p-6">
                <Video className="size-5 text-brand" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{d}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CTA />
    </>
  );
}
