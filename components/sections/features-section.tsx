"use client"
import { Code, Smartphone, Layers, Search, Megaphone, Bot } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { GlowingTiltCard } from "@/components/ui/glowing-tilt-card"
import { ParallaxScroll } from "@/components/ui/parallax-scroll"
import { AnimatedText } from "@/components/ui/animated-text"
import { AnimatedBackground } from "@/components/ui/animated-background"
import { ProgressCard } from "@/components/ui-library/cards/progress-card"

/* ------------------------------------------------------------------ */
/* WhatsApp CTA helpers — The Orbit 7                                  */
/* Contact: Rijab · +92 310 0301826                                    */
/* ------------------------------------------------------------------ */
const WHATSAPP_NUMBER = "923100301826"

const openWhatsApp = (message: string) =>
  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer"
  )

const serviceMessage = (service: string) =>
  `Hi, I'm interested in your ${service} service. Please share more details.`

export function ServicesSection() {
  // Core agency services — `waLabel` is the clean name used in the WhatsApp message
  const services = [
    {
      icon: <Code className="h-10 w-10 text-emerald-300" />,
      title: "Custom Web Development",
      waLabel: "Web Development",
      description:
        "High-performance websites and web applications built with Next.js, React, and Shopify. Responsive UI/UX design, fast load times, and conversion-focused architecture.",
      progress: 100,
      borderClass: "border-glow-emerald",
    },
    {
      icon: <Smartphone className="h-10 w-10 text-blue-500" />,
      title: "Mobile App Development",
      waLabel: "Mobile App Development",
      description:
        "Native iOS, Android, and cross-platform mobile apps engineered for speed, security, and retention — from MVP launch to App Store scale.",
      progress: 90,
      borderClass: "border-glow-blue",
    },
    {
      icon: <Layers className="h-10 w-10 text-yellow-500" />,
      title: "Custom CRM & ERP Software",
      waLabel: "Custom CRM & ERP",
      description:
        "Enterprise CRM and ERP solutions built around your operations. Unify sales, inventory, and reporting in one secure, scalable business management system.",
      progress: 95,
      borderClass: "border-glow-yellow",
    },
    {
      icon: <Search className="h-10 w-10 text-emerald-300" />,
      title: "Search Engine Optimization (SEO)",
      waLabel: "SEO",
      description:
        "Technical SEO audits, keyword strategy, and content optimization that rank your business on Google and turn organic search into your best acquisition channel.",
      progress: 100,
      borderClass: "border-glow-green",
    },
    {
      icon: <Megaphone className="h-10 w-10 text-purple-500" />,
      title: "Digital Marketing & SMM",
      waLabel: "Digital Marketing",
      description:
        "Data-driven social media marketing and paid ad campaigns across Meta, Google, and TikTok — full-funnel strategy with revenue tracking on every dollar.",
      progress: 85,
      borderClass: "border-glow-purple",
    },
    {
      icon: <Bot className="h-10 w-10 text-orange-500" />,
      title: "AI Integration & Automation",
      waLabel: "AI Integration & Automation",
      description:
        "Custom AI chatbots, intelligent agents, and workflow automation wired into your business — cutting manual work and response times across operations.",
      progress: 92,
      borderClass: "border-glow-orange",
    },
  ]

  return (
    <section id="services" className="relative w-full pt-12 md:pt-24 bg-muted/30 overflow-hidden">
      <AnimatedBackground variant="dots" color="rgba(16, 185, 129, 0.05)" />

      <div className="container px-6 md:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center space-y-6 text-center mb-12">
            <div className="space-y-4">
              <AnimatedText
                text="Digital Agency Services That Grow Your Business"
                variant="heading"
                className="text-3xl font-heading font-bold tracking-tighter sm:text-5xl gradient-text"
                animation="slide"
              />
              <AnimatedText
                text="From custom web development and mobile apps to SEO, digital marketing, and AI automation — The Orbit 7 delivers end-to-end digital solutions engineered to scale."
                variant="paragraph"
                className="max-w-[900px] text-gray-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 opacity-70"
                animation="fade"
                delay={0.3}
              />
            </div>
          </div>
        </ScrollReveal>

        <ParallaxScroll baseVelocity={0.1} direction="up" className="">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <GlowingTiltCard>
                  <Card
                    className={`h-full bg-card border border-border shadow-sm overflow-hidden group cursor-pointer ${service.borderClass}`}
                    onClick={() => openWhatsApp(serviceMessage(service.waLabel))}
                    role="button"
                    aria-label={`Inquire about ${service.title} on WhatsApp`}
                  >
                    <CardHeader>
                      {/* Icon ka background bhi theme-aware banaya hai */}
                      <div className="p-2 rounded-xl w-fit bg-muted transition-transform duration-300 group-hover:scale-110">
                        {service.icon}
                      </div>
                      <CardTitle className="mt-4 tracking-tight relative text-card-foreground">
                        {service.title}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Description ka color 'text-muted-foreground' use karein */}
                      <CardDescription className="text-base text-muted-foreground transition-opacity duration-300 group-hover:opacity-100">
                        {service.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </GlowingTiltCard>
              </ScrollReveal>
            ))}
          </div>
        </ParallaxScroll>
      </div>
    </section>
  )
}