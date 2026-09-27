import type { Metadata } from "next";
import { Target, Users, ShieldCheck, Gauge } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import StatsSection from "@/components/sections/StatsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import Awards from "@/components/sections/Awards";
import CTASection from "@/components/sections/CTASection";
import Reveal from "@/components/sections/Reveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The Orbit 7 is a digital product studio engineering mobile, web, AI, and automation systems for scalable businesses.",
  alternates: { canonical: "/about-us" },
};

const values = [
  { Icon: Target, title: "Scope before code", description: "We validate what to build before we start building it, on every engagement." },
  { Icon: Users, title: "One accountable team", description: "Strategy, design, and engineering sit under one roof, not three separate vendors." },
  { Icon: ShieldCheck, title: "Engineering discipline", description: "Documentation, testing, and monitoring are part of delivery, not an afterthought." },
  { Icon: Gauge, title: "Visible progress", description: "Weekly demos and a shared backlog mean you always know exactly where things stand." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A digital product studio built around one team, start to finish"
        description="The Orbit 7 designs and engineers mobile apps, web applications, AI-powered products, and automation systems — as one accountable team, not a chain of vendors."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2">
            <SectionHeading
              eyebrow="Our story"
              title="Founded on a simple frustration with fragmented delivery"
              description="The Orbit 7 was founded after watching too many good product ideas get lost between a design agency, an offshore dev shop, and an in-house team that inherited both. We built the studio we wished we'd had: one team, one process, accountable from discovery through scale."
            />
            <div className="space-y-5 text-base leading-relaxed text-ink-muted">
              <p>
                Today we work with founders and enterprise product teams across seven regions,
                building mobile apps, web platforms, AI-powered systems, and the automation that
                keeps operations running underneath them.
              </p>
              <p>
                Every engagement is staffed with senior specialists matched to your stack, not
                whoever is available that week — and every engagement follows the same five-phase
                process regardless of size.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <StatsSection />

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="What we believe"
            title="The principles behind how we work"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <div className="rounded-2xl border border-line bg-white p-6">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-brand-tint text-brand">
                    <v.Icon className="size-5" />
                  </div>
                  <h3 className="mt-5 font-display text-base font-semibold text-ink">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{v.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <ProcessSection />
      <Awards />
      <CTASection />
    </>
  );
}
