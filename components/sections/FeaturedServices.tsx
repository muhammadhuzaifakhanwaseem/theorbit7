import { Smartphone, Layers, Sparkles, Building2, Globe, Workflow } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/cards/ServiceCard";
import Reveal from "@/components/sections/Reveal";

const featured = [
  { href: "/mobile-app-development", title: "Mobile App Development", description: "Native and cross-platform mobile products, engineered for scale and long-term maintainability.", Icon: Smartphone },
  { href: "/digital-product-development", title: "Digital Product Development", description: "Strategy, UX, engineering, launch and scaling delivered as one accountable team.", Icon: Layers },
  { href: "/ai-development", title: "AI-Powered Systems", description: "Practical AI products, agents, automation and intelligent workflows that ship to production.", Icon: Sparkles },
  { href: "/custom-software-development", title: "Custom Software Development", description: "Enterprise-grade business software, ERP, CRM and custom platforms built around your workflow.", Icon: Building2 },
  { href: "/web-app-development", title: "Web Application Development", description: "Scalable modern web applications built on component-driven architecture.", Icon: Globe },
  { href: "/ai-automation", title: "Automation", description: "Business workflow automation and system integrations that remove manual work.", Icon: Workflow },
];

export default function FeaturedServices() {
  return (
    <section id="services" className="scroll-mt-24 bg-surface py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="What we build"
            title="Featured services"
            description="Six core disciplines, each backed by a dedicated team and a proven delivery process."
            className="max-w-xl"
          />
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s, i) => (
            <Reveal key={s.href} delay={i * 0.06}>
              <ServiceCard {...s} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
