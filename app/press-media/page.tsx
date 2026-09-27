import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/sections/CTASection";
import Awards from "@/components/sections/Awards";
import Reveal from "@/components/sections/Reveal";

export const metadata: Metadata = {
  title: "Press & Media",
  description: "News, recognition, and media resources for The Orbit 7.",
  alternates: { canonical: "/press-media" },
};

const mentions = [
  { outlet: "TechCrossing", title: "The Orbit 7 named a top mobile app development company for 2026", date: "August 2026" },
  { outlet: "Founder Weekly", title: "How one studio is structuring AI engagements for enterprise clients", date: "June 2026" },
  { outlet: "BuildStack Podcast", title: "Episode 142: Scoping AI MVPs without overbuilding", date: "April 2026" },
];

export default function PressMediaPage() {
  return (
    <>
      <PageHero
        eyebrow="Company"
        title="Press & media"
        description="Recognition, media mentions, and resources for journalists covering The Orbit 7."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Company" }, { label: "Press & Media" }]}
      />

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="In the news" title="Recent mentions" />
          <div className="mt-10 divide-y divide-line border-t border-line">
            {mentions.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.06}>
                <div className="flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <Newspaper className="mt-1 size-5 shrink-0 text-brand" />
                    <div>
                      <p className="font-display text-base font-semibold text-ink">{m.title}</p>
                      <p className="text-sm text-ink-soft">{m.outlet}</p>
                    </div>
                  </div>
                  <p className="text-sm text-ink-soft">{m.date}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Awards />

      <section className="border-t border-line py-16">
        <Container>
          <SectionHeading
            eyebrow="Media inquiries"
            title="Working on a story about The Orbit 7?"
            description="Reach our team at press@theorbit7.com and we'll get back to you within one business day with the information you need."
          />
        </Container>
      </section>

      <CTASection title="Let's talk about your project" />
    </>
  );
}
