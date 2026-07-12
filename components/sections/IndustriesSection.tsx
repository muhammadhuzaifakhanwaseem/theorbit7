"use client"

import { ScrollReveal } from "@/components/scroll-reveal"
import { AnimatedText } from "@/components/ui/animated-text"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"
import { PrimaryButton } from "@/components/ui-library/buttons/button-variants"
import { ScrollAnimation } from "@/components/ui-library/animations/scroll-animations"
import {
    ShoppingCart,
    LayoutDashboard,
    Building2,
    CreditCard,
    HeartPulse,
    GraduationCap,
    Truck,
    Store,
    Plane,
    Briefcase,
    ArrowRight,
} from "lucide-react"

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

const industryMessage = (industry: string) =>
    `Hi, I'm looking for digital solutions for my ${industry} business. Please share more details.`

// Industries — SEO-friendly names and solution descriptions
const industries = [
    {
        icon: <ShoppingCart className="h-8 w-8 text-emerald-300" />,
        name: "E-Commerce & Retail",
        waLabel: "E-Commerce",
        description: "Headless Shopify stores, custom Next.js storefronts, and conversion-optimized shopping experiences.",
        borderClass: "border-glow-emerald",
    },
    {
        icon: <LayoutDashboard className="h-8 w-8 text-blue-500" />,
        name: "SaaS & Startups",
        waLabel: "SaaS",
        description: "Product dashboards, MVP development, and scalable web applications built to attract users and investors.",
        borderClass: "border-glow-blue",
    },
    {
        icon: <Building2 className="h-8 w-8 text-purple-500" />,
        name: "Real Estate",
        waLabel: "Real Estate",
        description: "Property portals, listing platforms, and local SEO that puts your agency in front of active buyers.",
        borderClass: "border-glow-purple",
    },
    {
        icon: <CreditCard className="h-8 w-8 text-emerald-300" />,
        name: "FinTech & Finance",
        waLabel: "FinTech",
        description: "Secure payment integrations, banking-grade mobile apps, and compliance-ready financial platforms.",
        borderClass: "border-glow-green",
    },
    {
        icon: <HeartPulse className="h-8 w-8 text-orange-500" />,
        name: "Healthcare & Clinics",
        waLabel: "Healthcare",
        description: "Appointment booking systems, patient portals, and HIPAA-conscious platforms that modernize care.",
        borderClass: "border-glow-orange",
    },
    {
        icon: <GraduationCap className="h-8 w-8 text-yellow-500" />,
        name: "Education & EdTech",
        waLabel: "Education",
        description: "LMS platforms, course marketplaces, and live-streaming solutions for schools and online educators.",
        borderClass: "border-glow-yellow",
    },
    {
        icon: <Truck className="h-8 w-8 text-emerald-300" />,
        name: "Logistics & Delivery",
        waLabel: "Logistics",
        description: "Fleet tracking dashboards, delivery apps, and operations automation that cut costs per shipment.",
        borderClass: "border-glow-red",
    },
    {
        icon: <Store className="h-8 w-8 text-blue-500" />,
        name: "Local Businesses & Brands",
        waLabel: "Local Business",
        description: "High-converting websites, Google rankings, and social media marketing that fill your pipeline locally.",
        borderClass: "border-glow-blue",
    },
    {
        icon: <Plane className="h-8 w-8 text-purple-500" />,
        name: "Travel & Hospitality",
        waLabel: "Travel & Hospitality",
        description: "Dynamic booking engines, hotel platforms, and travel portals built for seamless reservations.",
        borderClass: "border-glow-purple",
    },
    {
        icon: <Briefcase className="h-8 w-8 text-emerald-300" />,
        name: "Professional Services",
        waLabel: "Professional Services",
        description: "Lead-generation websites, CRM systems, and AI automation for agencies, law firms, and consultants.",
        borderClass: "border-glow-green",
    },
]

export function IndustriesSection() {
    return (
        <section id="industries" className="w-full pt-12 md:pt-24 pb-16 bg-muted/30 overflow-hidden">
            <div className="container px-6 md:px-8">
                <ScrollReveal>
                    <div className="flex flex-col items-center justify-center space-y-6 text-center mb-12">
                        <div className="space-y-4">
                            <AnimatedText
                                text="Industries We Serve"
                                variant="heading"
                                className="text-3xl font-heading font-bold tracking-tighter sm:text-5xl gradient-text"
                                animation="slide"
                            />
                            <AnimatedText
                                text="From e-commerce and SaaS to healthcare and real estate — The Orbit 7 delivers custom web development, mobile apps, and digital marketing solutions tailored to the way your industry works."
                                variant="paragraph"
                                className="max-w-[900px] text-gray-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 opacity-70"
                                animation="fade"
                                delay={0.3}
                            />
                        </div>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {industries.map((industry, index) => (
                        <ScrollAnimation key={industry.name} type="slide" direction="up" delay={(index % 5) * 0.1}>
                            <div
                                className={`h-full p-6 rounded-xl border glassmorphic-card soft-glow group cursor-pointer transition-transform duration-300 hover:-translate-y-1 ${industry.borderClass}`}
                                onClick={() => openWhatsApp(industryMessage(industry.waLabel))}
                                role="button"
                                aria-label={`Inquire about digital solutions for ${industry.name} on WhatsApp`}
                            >
                                <div className="p-2 rounded-xl w-fit bg-muted/50 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                                    {industry.icon}
                                </div>
                                <h3 className="text-lg font-heading font-medium tracking-tight relative w-fit">
                                    {industry.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
                                </h3>
                                <p className="mt-3 text-sm text-gray-800 dark:text-gray-400 opacity-70 leading-relaxed transition-opacity duration-300 group-hover:opacity-100">
                                    {industry.description}
                                </p>
                            </div>
                        </ScrollAnimation>
                    ))}
                </div>

                {/* Bottom CTA — for industries not listed */}
                {/* Changed text-center to a flex column layout centered horizontally */}
                <div className="mt-16 flex flex-col items-center space-y-6">
                    <ScrollAnimation type="fade">
                        <p className="text-gray-800 dark:text-gray-400 opacity-70 text-center">
                            Don&apos;t see your industry? We&apos;ve built custom solutions for dozens more.
                        </p>
                    </ScrollAnimation>

                    <ScrollAnimation type="fade" delay={0.2}>
                        {/* Added w-fit to ensure the gradient border component shrinks to fit the button */}
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
                                            "Hi, I'd like to discuss a digital solution for my industry. Please share more details."
                                        )
                                    }
                                >
                                    <span className="flex items-center font-medium">
                                        Discuss Your Industry
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