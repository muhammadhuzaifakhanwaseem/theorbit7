import { HeroSection } from "@/components/sections/hero-section"
import { ComponentLibraryShowcase } from "@/components/sections/component-library-showcase"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { PricingSection } from "@/components/sections/pricing-section"
import { BlogSection } from "@/components/sections/blog-section"
import { FaqSection } from "@/components/sections/faq-section"
import { CtaSection } from "@/components/sections/cta-section"
import { MouseGlow } from "@/components/ui-library/effects/mouse-glow"
import { ServicesSection } from "@/components/sections/features-section"
import { IndustriesSection } from "@/components/sections/IndustriesSection"
import { PartnersSection } from "@/components/sections/PartnersSection"
import { SuccessStoriesSection } from "@/components/sections/SuccessStoriesSection"
import { ContactSection } from "@/components/sections/ContactSection"

export default function HomePage() {
  return (
    <main className="flex flex-col items-center relative">
      <MouseGlow
        color="rgba(16, 185, 129, 0.12)"
        size={600}
        blur={150}
        opacity={0.6}
        followSpeed={0.05}
        pulseEffect={true}
        pulseSpeed={4}
        pulseScale={1.05}
      />
      <HeroSection />
      <ServicesSection />
      <ComponentLibraryShowcase />
      <CtaSection />
      <IndustriesSection />
      <PartnersSection />
      <SuccessStoriesSection />
      <TestimonialsSection />
      <PricingSection />
      <BlogSection />
      <FaqSection />
      <ContactSection />
    </main>
  )
}
