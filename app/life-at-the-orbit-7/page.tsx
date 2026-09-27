import type { Metadata } from "next";
import { Globe2, GraduationCap, HeartHandshake, Laptop } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/sections/CTASection";
import Reveal from "@/components/sections/Reveal";

export const metadata: Metadata = {
  title: "Life At The Orbit 7",
  description: "What it's like working at The Orbit 7 — culture, benefits, and how distributed teams operate.",
  alternates: { canonical: "/life-at-the-orbit-7" },
};

const perks = [
  { Icon: Globe2, title: "Fully distributed", description: "Work from anywhere across our seven supported regions, with async-first documentation habits." },
  { Icon: GraduationCap, title: "Learning budget", description: "An annual budget for courses, conferences, and certifications relevant to your craft." },
  { Icon: Laptop, title: "Senior-only teams", description: "You'll work alongside experienced engineers and designers, not carry junior hires through delivery." },
  { Icon: HeartHandshake, title: "Real ownership", description: "Small pods mean your decisions visibly shape the product — no six layers of sign-off." },
];

export default function LifeAtOrbit7Page() {
  return (
    <>
      <PageHero
        eyebrow="Company"
        title="Life at The Orbit 7"
        description="A distributed team of senior engineers, designers, and strategists who'd rather do fewer projects well than many projects poorly."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Company" },
          { label: "Life At The Orbit 7" },
        ]}
      />

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="How we work"
            title="Small pods, real ownership, senior-only teams"
            description="We intentionally stay small enough that every person on an engagement has real influence over the outcome — not layers of process between decision and delivery."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-line bg-white p-6">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-brand-tint text-brand">
                    <p.Icon className="size-5" />
                  </div>
                  <h3 className="mt-5 font-display text-base font-semibold text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface py-20 sm:py-28">
        <Container className="max-w-2xl text-center">
          <SectionHeading
            align="center"
            eyebrow="Open roles"
            title="We're always meeting strong engineers and designers"
            description="We don't run a large, always-open careers board — instead we keep a short list of active searches and reach out when a role matches your background."
          />
          <a
            href="mailto:careers@theorbit7.com"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-brand px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-brand-dark"
          >
            Reach out to careers@theorbit7.com
          </a>
        </Container>
      </section>

      <CTASection title="Looking for an engineering partner instead?" />
    </>
  );
}
