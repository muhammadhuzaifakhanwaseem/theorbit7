import type { Metadata } from "next";
import { Handshake, Building, Users2 } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/sections/CTASection";
import Reveal from "@/components/sections/Reveal";

export const metadata: Metadata = {
  title: "Partnership",
  description: "Partner with The Orbit 7 as an agency, investor, or technology platform.",
  alternates: { canonical: "/partnership" },
};

const tracks = [
  {
    Icon: Building,
    title: "Agency partners",
    description:
      "Design and marketing agencies that need a reliable engineering partner for client projects, with white-label delivery options.",
  },
  {
    Icon: Users2,
    title: "Investor partners",
    description:
      "VCs and accelerators who want a trusted technical partner to recommend to portfolio companies at any stage.",
  },
  {
    Icon: Handshake,
    title: "Technology partners",
    description:
      "Platform and infrastructure providers looking to build joint go-to-market or integration partnerships.",
  },
];

export default function PartnershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Company"
        title="Partner with The Orbit 7"
        description="We work alongside agencies, investors, and technology platforms to deliver more for shared clients and portfolio companies."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Company" }, { label: "Partnership" }]}
      />

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Partnership tracks" title="Three ways to work with us" />
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {tracks.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-line bg-white p-7">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-brand-tint text-brand">
                    <t.Icon className="size-5" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="Let's explore a partnership"
        description="Tell us about your agency, fund, or platform and how you'd like to work together — we respond to every partnership inquiry personally."
      />
    </>
  );
}
