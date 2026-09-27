import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Founder's Letter",
  description: "A letter from The Orbit 7's founder on why the studio exists and how it works.",
  alternates: { canonical: "/founders-letter" },
};

export default function FoundersLetterPage() {
  return (
    <>
      <PageHero
        eyebrow="Company"
        title="A letter from our founder"
        description="Why The Orbit 7 exists, and what we're trying to prove with every engagement."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Company" },
          { label: "Founder's Letter" },
        ]}
      />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-2xl space-y-6 text-base leading-relaxed text-ink-muted sm:text-lg">
            <p>
              I started The Orbit 7 after three separate product launches where the technology
              wasn&apos;t the hard part — the coordination was. A design agency handed off files
              a development team couldn&apos;t use cleanly. A dev shop delivered code with no
              documentation. By the time a product finally shipped, everyone involved had moved
              on to the next client, and the team left holding it had no idea how any of it
              actually worked.
            </p>
            <p>
              We built The Orbit 7 to close that gap: one team responsible for strategy, design,
              and engineering, from the first discovery call through the year after launch. Not
              because that&apos;s a nicer story to tell, but because it produces better products —
              fewer handoffs mean fewer places for a good idea to get diluted.
            </p>
            <p>
              We&apos;re also deliberately not chasing every trend. AI is a real capability we
              invest in seriously, but it&apos;s one tool among several — plenty of what we build
              is traditional mobile, web, and backend engineering, done with the same care.
            </p>
            <p>
              If you&apos;re reading this because you&apos;re about to start building something,
              I&apos;d rather you spend thirty minutes on a call with us being talked out of a bad
              scope than sign a contract we both regret in four months. That&apos;s the standard
              we hold every engagement to.
            </p>
            <div className="flex items-center gap-4 pt-6">
              <Image
                src="/images/team/alexis-moreau.svg"
                alt="Alexis Moreau"
                width={56}
                height={56}
                unoptimized
                className="rounded-full"
              />
              <div>
                <p className="font-display text-base font-semibold text-ink">Alexis Moreau</p>
                <p className="text-sm text-ink-soft">Founder & CEO, The Orbit 7</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
