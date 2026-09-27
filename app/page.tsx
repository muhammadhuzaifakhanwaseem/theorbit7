import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import LogoMarquee from "@/components/sections/LogoMarquee";
import CoreCapabilities from "@/components/sections/CoreCapabilities";
import FeaturedServices from "@/components/sections/FeaturedServices";
import StatsSection from "@/components/sections/StatsSection";
import IndustriesGrid from "@/components/sections/IndustriesGrid";
import CaseStudiesGrid from "@/components/sections/CaseStudiesGrid";
import ProcessSection from "@/components/sections/ProcessSection";
import Testimonials from "@/components/sections/Testimonials";
import Awards from "@/components/sections/Awards";
import LocationsGrid from "@/components/sections/LocationsGrid";
import FAQ from "@/components/sections/FAQ";
import CTASection from "@/components/sections/CTASection";
import Container from "@/components/ui/Container";
import { homeFaqs } from "@/data/content";

export const metadata: Metadata = {
  title: "The Orbit 7 — Engineering AI-Powered Digital Systems",
  description:
    "The Orbit 7 designs and builds mobile apps, web applications, AI-powered products, and automation systems for scalable businesses.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <CoreCapabilities />
      <FeaturedServices />
      <StatsSection />
      <IndustriesGrid />
      <CaseStudiesGrid limit={3} />
      <ProcessSection />
      <Testimonials />
      <Awards />
      <LocationsGrid />
      <section className="py-20 sm:py-28">
        <Container className="max-w-3xl">
          <FAQ items={homeFaqs} />
        </Container>
      </section>
      <CTASection />
    </>
  );
}
