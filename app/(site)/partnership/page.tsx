import { Check } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import JsonLd from "@/components/ui/JsonLd";
import PageHero from "@/components/sections/PageHero";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import BookCallButton from "@/components/booking/BookCallButton";
import { partnershipModels } from "@/data/company";
import { categories } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";

const title = "Partnerships | White-Label & Agency Partner Program | The Orbit 7";
const description =
  "Partner with The Orbit 7: white-label design, development, SEO and video editing for agencies, plus technology, referral and strategic partnerships.";

export const metadata = buildMetadata({ title, description, path: "/partnership" });

const faqs = [
  { q: "What does white-label mean?", a: "We deliver work under your agency's brand. Your client relationship stays yours; we never contact your clients directly unless you ask us to." },
  { q: "Which services can we white-label?", a: "Website and app development, design, SEO and AI search optimisation, content and video editing — any of the services on our website." },
  { q: "Do you sign NDAs with partners?", a: "Yes. Confidentiality is standard in every partnership." },
  { q: "How do referral partnerships work?", a: "You introduce a business that needs our services. We agree simple, transparent terms upfront before any introduction." },
];

export default function PartnershipPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Partnerships", path: "/partnership" },
  ];
  return (
    <>
      <JsonLd data={[webPageSchema({ name: title, path: "/partnership", description }), breadcrumbSchema(crumbs), faqSchema(faqs)]} />
      <PageHero
        eyebrow="Partnerships"
        title="Grow together with a reliable *delivery partner.*"
        lead="Agencies, technology companies and consultants partner with us to offer more services, deliver more capacity and serve their clients better."
        crumbs={crumbs}
      >
        <BookCallButton size="lg">Discuss a partnership</BookCallButton>
      </PageHero>
      <section className="border-t border-line py-20 sm:py-28" aria-labelledby="models-heading">
        <Container>
          <SectionHeading eyebrow="Partnership models" title={<span id="models-heading">Ways to <em>partner</em></span>} />
          <ul className="mt-14 grid gap-5 md:grid-cols-2">
            {partnershipModels.map((m, i) => (
              <li key={m.title} data-reveal style={{ ["--d" as string]: (i % 2) * 80 }} className="sheen rounded-3xl bg-white p-8">
                <span className="font-mono text-xs text-brand-500">0{i + 1}</span>
                <h3 className="mt-4 text-2xl font-semibold">{m.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{m.text}</p>
                <ul className="mt-5 space-y-2">
                  {m.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-[0.95rem] text-ink-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" /> {p}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <section className="bg-paper py-20 sm:py-24" aria-labelledby="cap-heading">
        <Container>
          <SectionHeading eyebrow="Capabilities" title={<span id="cap-heading">What partners can <em>offer</em> through us</span>} />
          <ul className="mt-10 flex flex-wrap gap-2.5">
            {categories.map((c) => (
              <li key={c.id} className="rounded-full border border-line bg-white px-5 py-2.5 font-medium text-ink-2 shadow-soft">
                {c.name}
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <FAQ faqs={faqs} lead="Common questions about partnering with The Orbit 7." />
      <CTA eyebrow="Become a partner" title={<>Let&apos;s build something <em>together.</em></>} />
    </>
  );
}
