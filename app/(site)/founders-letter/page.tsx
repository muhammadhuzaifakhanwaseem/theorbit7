import Link from "next/link";
import Container from "@/components/ui/Container";
import JsonLd from "@/components/ui/JsonLd";
import PageHero from "@/components/sections/PageHero";
import CTA from "@/components/sections/CTA";
import { foundersLetter } from "@/data/company";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { companyPageReady } from "@/lib/company";

const title = "Founder's Letter | Why We Built The Orbit 7";
const description = "A letter from the founder of The Orbit 7 on why the company exists, what we believe and how we work with clients.";

export const metadata = buildMetadata({ title, description, path: "/founders-letter", noindex: !companyPageReady["/founders-letter"] });

export default function FoundersLetterPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Founder's letter", path: "/founders-letter" },
  ];
  const L = foundersLetter;
  return (
    <>
      <JsonLd data={[webPageSchema({ name: title, path: "/founders-letter", description }), breadcrumbSchema(crumbs)]} />
      <PageHero eyebrow="Founder's letter" title="Why we built *The Orbit 7.*" lead="The story, beliefs and commitments behind our work — in the founder's own words." crumbs={crumbs} />
      <section className="border-t border-line py-20 sm:py-28">
        <Container className="max-w-3xl">
          {L ? (
            <article className="rounded-[2rem] border border-line bg-white p-8 sm:p-14">
              <div className="prose-orbit">
                {L.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <footer className="mt-10 border-t border-line pt-6">
                {L.signOff && <p className="text-muted">{L.signOff}</p>}
                <p className="mt-1 font-display text-xl font-semibold">{L.author}</p>
                <p className="text-sm text-brand-500">{L.role}</p>
                {L.date && <p className="mt-1 text-xs text-muted">{L.date}</p>}
              </footer>
            </article>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-line-strong bg-paper p-8 text-center sm:p-14">
              <p className="font-display text-2xl font-semibold">The founder&apos;s letter is coming soon.</p>
              <p className="mx-auto mt-3 max-w-md text-muted">
                Until then, learn{" "}
                <Link href="/about-us" className="font-medium text-brand underline underline-offset-4">
                  what we believe and how we work
                </Link>
                .
              </p>
            </div>
          )}
        </Container>
      </section>
      <CTA />
    </>
  );
}
