import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import CTASection from "@/components/sections/CTASection";
import Reveal from "@/components/sections/Reveal";
import { leadershipTeam } from "@/data/team";

export const metadata: Metadata = {
  title: "Leadership",
  description: "Meet the leadership team behind The Orbit 7's engineering and product delivery.",
  alternates: { canonical: "/leadership" },
};

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Company"
        title="The team steering delivery"
        description="A small group of senior operators leading engineering, product, AI, and automation across every Orbit 7 engagement."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Company" }, { label: "Leadership" }]}
      />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {leadershipTeam.map((member, i) => (
              <Reveal key={member.slug} delay={i * 0.06}>
                <div className="rounded-2xl border border-line bg-white p-6">
                  <Image
                    src={`/images/team/${member.slug}.svg`}
                    alt={member.name}
                    width={72}
                    height={72}
                    unoptimized
                    className="rounded-full"
                  />
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-brand">{member.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{member.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
