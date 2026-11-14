import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import JsonLd from "@/components/ui/JsonLd";
import PageHero from "@/components/sections/PageHero";
import CTA from "@/components/sections/CTA";
import { leadership } from "@/data/company";
import { principles } from "@/data/content";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { companyPageReady } from "@/lib/company";
import { site } from "@/lib/site";

const title = "Leadership Team | Company Leadership | The Orbit 7";
const description =
  "Meet the company leadership team at The Orbit 7, led by CEO Muhammad Naveed: the management team responsible for strategy, delivery and our clients' results.";

export const metadata = buildMetadata({ title, description, path: "/leadership",
  noindex: !companyPageReady["/leadership"],
  keywords: ["company leadership team", "leadership team", "management team", "The Orbit 7 CEO"],
});

export default function LeadershipPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Leadership", path: "/leadership" },
  ];
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ name: title, path: "/leadership", description }),
          breadcrumbSchema(crumbs),
          ...(leadership.length
            ? [
                {
                  "@context": "https://schema.org",
                  "@type": "ItemList",
                  itemListElement: leadership.map((m, i) => ({
                    "@type": "ListItem",
                    position: i + 1,
                    item: { "@type": "Person", name: m.name, jobTitle: m.role, worksFor: { "@id": `${site.url}/#organization` }, ...(m.linkedin ? { sameAs: [m.linkedin] } : {}) },
                  })),
                },
              ]
            : []),
        ]}
      />
      <PageHero eyebrow="Leadership" title="The leadership team *behind the work.*" lead="Our management team stays close to every engagement, from the first workshop to launch and growth." crumbs={crumbs} />
      <section className="border-t border-line py-20 sm:py-28" aria-labelledby="team-heading">
        <Container>
          <SectionHeading eyebrow="Our team" title={<span id="team-heading">Leadership <em>team</em></span>} />
          {leadership.length ? (
            <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {leadership.map((m, i) => (
                <li key={m.name} data-reveal style={{ ["--d" as string]: (i % 3) * 80 }} className="overflow-hidden rounded-[1.75rem] border border-line bg-white">
                  <div className="relative aspect-[4/5] bg-mint-100">
                    {m.photo ? (
                      <Image src={m.photo} alt={`${m.name}, ${m.role}`} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover object-[50%_22%]" />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center font-display text-6xl font-semibold text-brand/30">
                        {m.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold">{m.name}</h3>
                    <p className="text-sm text-brand-500">{m.role}</p>
                    <p className="mt-3 leading-relaxed text-muted">{m.bio}</p>
                    {m.linkedin && (
                      <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-medium text-brand hover:underline">
                        LinkedIn profile
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div data-reveal className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="overflow-hidden rounded-[1.75rem] border border-dashed border-line-strong bg-paper">
                  <div className="aspect-[4/5] bg-[radial-gradient(circle_at_50%_35%,#e3f0e9,#f1f7f3)]" />
                  <div className="space-y-2 p-6">
                    <span className="block h-4 w-2/3 rounded bg-ink/10" />
                    <span className="block h-3 w-1/3 rounded bg-brand/15" />
                  </div>
                </div>
              ))}
              <p className="text-muted sm:col-span-2 lg:col-span-3">
                Leadership profiles are being prepared. In the meantime, read{" "}
                <Link href="/about-us" className="font-medium text-brand underline underline-offset-4">
                  about how we work
                </Link>{" "}
                or{" "}
                <Link href="/contact-us" className="font-medium text-brand underline underline-offset-4">
                  speak with our team
                </Link>
                .
              </p>
            </div>
          )}
        </Container>
      </section>
      <section className="bg-paper py-20 sm:py-28" aria-labelledby="values-heading">
        <Container>
          <SectionHeading eyebrow="How we lead" title={<span id="values-heading">Principles we <em>hold ourselves to</em></span>} />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <li key={p.title} data-reveal style={{ ["--d" as string]: i * 80 }} className="sheen rounded-3xl bg-white p-7">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CTA />
    </>
  );
}
