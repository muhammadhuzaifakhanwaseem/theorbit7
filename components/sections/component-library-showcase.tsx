"use client"

import { ScrollReveal } from "@/components/scroll-reveal"
import { AnimatedText } from "@/components/ui/animated-text"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"
import { PrimaryButton } from "@/components/ui-library/buttons/button-variants"
import { ScrollAnimation } from "@/components/ui-library/animations/scroll-animations"
import { Search, Lightbulb, Settings, ClipboardCheck, BarChart3, ArrowRight } from "lucide-react"

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

// 5-step agency process — SEO-friendly titles and descriptions
const processSteps = [
  {
    step: "Step 1:",
    title: "Research",
    icon: <Search className="h-8 w-8" />,
    description:
      "We study your business niche, analyze competitors, and research the keywords and customer behavior that drive demand in your market.",
  },
  {
    step: "Step 2:",
    title: "Strategize",
    icon: <Lightbulb className="h-8 w-8" />,
    description:
      "We run a full SWOT analysis and align our research with your business goals — producing a clear roadmap for web development, SEO, and marketing.",
  },
  {
    step: "Step 3:",
    title: "Implement",
    icon: <Settings className="h-8 w-8" />,
    description:
      "Our team designs, develops, and deploys — custom websites, mobile apps, and content promotion strategies that reach a qualified audience.",
  },
  {
    step: "Step 4:",
    title: "Evaluate",
    icon: <ClipboardCheck className="h-8 w-8" />,
    description:
      "We measure your investment against ROI — tracking traffic, rankings, conversions, and revenue toward your business goals.",
  },
  {
    step: "Step 5:",
    title: "Optimize",
    icon: <BarChart3 className="h-8 w-8" />,
    description:
      "We apply growth-oriented optimization — improving conversion rates, search rankings, and performance so every input produces greater output.",
  },
]

export function ComponentLibraryShowcase() {
  return (
    <section id="process" className="relative w-full pt-12 md:pt-24 pb-16 overflow-hidden">
      <div className="container px-6 md:px-8 relative">
        {/* Section header with outlined background word — mirrors the reference layout */}
        <ScrollReveal>
          <div className="relative flex flex-col items-center justify-center space-y-6 text-center mb-20">
            {/* Giant outlined watermark behind the heading */}
            <span
              aria-hidden="true"
              className="pointer-events-none select-none absolute inset-x-0 -top-6 md:-top-10 mx-auto text-[18vw] lg:text-[10rem] font-heading font-bold uppercase tracking-tighter leading-none text-transparent opacity-40"
              style={{ WebkitTextStroke: "1px rgba(16, 185, 129, 0.15)" }}
            >
              Process
            </span>

            <div className="relative z-10 space-y-4">
              <AnimatedText
                text="Our Proven Digital Agency Process"
                variant="heading"
                className="text-3xl font-heading font-bold tracking-tighter sm:text-5xl gradient-text"
                animation="slide"
              />
              <AnimatedText
                text="A transparent five-step process behind every project — from custom web development and mobile apps to SEO and digital marketing campaigns that deliver measurable ROI."
                variant="paragraph"
                className="max-w-[900px] text-gray-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 opacity-70"
                animation="fade"
                delay={0.3}
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Horizontal timeline — connector line runs behind the icon circles on desktop */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-10 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-600/60 to-transparent"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-14">
            {processSteps.map((item, index) => (
              <ScrollAnimation key={item.title} type="slide" direction="up" delay={index * 0.15}>
                <div className="relative flex flex-col items-center lg:items-start text-center lg:text-left group">
                  {/* Icon node */}
                  <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-lg shadow-emerald-900/30 ring-4 ring-background transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    {item.icon}
                  </div>

                  {/* Step label */}
                  <p className="mt-6 text-lg text-muted-foreground">{item.step}</p>

                  {/* Step title */}
                  <h3 className="text-2xl font-heading font-bold tracking-tight relative">
                    {item.title}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
                  </h3>

                  {/* Step description */}
                  <p className="mt-4 text-sm md:text-base text-gray-800 dark:text-gray-400 opacity-70 leading-relaxed transition-opacity duration-300 group-hover:opacity-100">
                    {item.description}
                  </p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>

        {/* Bottom CTA — opens WhatsApp */}
        <div className="mt-20 flex justify-center"> 
          <ScrollAnimation type="fade">
            <div className="w-fit">
              <AnimatedGradientBorder
                colors={["#10b981", "#065f46", "#34d399", "#065f46"]}
                borderWidth={1}
                duration={6}
              >
                <PrimaryButton
                  size="lg"
                  className="bg-background border-0 text-foreground hover:text-white px-8 py-3" 
                  onClick={() =>
                    openWhatsApp(
                      "Hi, I'd like to start a new project with The Orbit 7. Please share more details."
                    )
                  }
                >
                  <span className="flex items-center font-medium">
                    Start Your Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </PrimaryButton>
              </AnimatedGradientBorder>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}