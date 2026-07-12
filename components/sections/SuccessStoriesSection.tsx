"use client"

import Image from "next/image"
import { ScrollReveal } from "@/components/scroll-reveal"
import { AnimatedText } from "@/components/ui/animated-text"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"
import { PrimaryButton } from "@/components/ui-library/buttons/button-variants"
import { ScrollAnimation } from "@/components/ui-library/animations/scroll-animations"
import { ArrowRight, TrendingUp } from "lucide-react"

/* ------------------------------------------------------------------ */
/* WhatsApp CTA helpers — The Orbit 7                                 */
/* Contact: Rijab · +92 310 0301826                                   */
/* ------------------------------------------------------------------ */
const WHATSAPP_NUMBER = "923100301826"

const openWhatsApp = (message: string) =>
    window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
        "_blank",
        "noopener,noreferrer"
    )

/* ------------------------------------------------------------------ */
/* Dummy case studies — replace with real projects when ready         */
/* ------------------------------------------------------------------ */
const projects = [
    {
        client: "Veloce Apparel",
        industry: "E-Commerce",
        title: "Headless Shopify Storefront Rebuild",
        description:
            "Migrated a slow legacy theme to a custom headless Next.js storefront with real-time inventory sync and a redesigned checkout flow.",
        metric: "3.2x",
        metricLabel: "faster load times",
        tags: ["Next.js", "Shopify", "UI/UX"],
        imageSrc: "/placeholder.svg?height=400&width=600&text=Veloce+Apparel",
        borderClass: "border-glow-emerald",
    },
    {
        client: "Apex Brands",
        industry: "Retail & DTC",
        title: "Organic Growth SEO Program",
        description:
            "Full technical SEO overhaul, semantic content architecture, and monthly content sprints targeting high-intent commercial keywords.",
        metric: "180%",
        metricLabel: "organic traffic growth",
        tags: ["Technical SEO", "Content Strategy"],
        imageSrc: "/placeholder.svg?height=400&width=600&text=Apex+Brands",
        borderClass: "border-glow-blue",
    },
    {
        client: "North Ridge Ventures",
        industry: "Enterprise Ops",
        title: "Custom ERP & Operations Platform",
        description:
            "Replaced three disconnected tools with a single custom ERP — unifying sales, inventory, and reporting into one real-time dashboard.",
        metric: "60%",
        metricLabel: "faster operations",
        tags: ["Custom ERP", "Node.js", "PostgreSQL"],
        imageSrc: "/placeholder.svg?height=400&width=600&text=North+Ridge",
        borderClass: "border-glow-purple",
    },
    {
        client: "Lumina Skin",
        industry: "Beauty & Wellness",
        title: "Mobile App with AI Support Agent",
        description:
            "Cross-platform shopping app with an integrated AI chat agent handling orders, tracking, and skincare recommendations 24/7.",
        metric: "45%",
        metricLabel: "lower support volume",
        tags: ["React Native", "AI Chatbot"],
        imageSrc: "/placeholder.svg?height=400&width=600&text=Lumina+Skin",
        borderClass: "border-glow-green",
    },
    {
        client: "Atlas Estates",
        industry: "Real Estate",
        title: "Property Portal & Local SEO",
        description:
            "Custom listing platform with map search and virtual tours, backed by a local SEO campaign dominating city-level property keywords.",
        metric: "4x",
        metricLabel: "more qualified leads",
        tags: ["Web Platform", "Local SEO"],
        imageSrc: "/placeholder.svg?height=400&width=600&text=Atlas+Estates",
        borderClass: "border-glow-yellow",
    },
    {
        client: "Swift Logistics Co.",
        industry: "Logistics",
        title: "Fleet Tracking & Delivery Automation",
        description:
            "Real-time fleet dashboard with automated dispatch, route optimization, and customer delivery notifications across two countries.",
        metric: "32%",
        metricLabel: "lower cost per delivery",
        tags: ["Dashboard", "Automation", "APIs"],
        imageSrc: "/placeholder.svg?height=400&width=600&text=Swift+Logistics",
        borderClass: "border-glow-orange",
    },
]

export function SuccessStoriesSection() {
    return (
        <section id="portfolio" className="w-full pt-12 md:pt-24 pb-16 overflow-hidden bg-gray-50/50 dark:bg-transparent">
            <div className="container px-6 md:px-8">
                {/* Header */}
                <ScrollReveal>
                    <div className="flex flex-col items-center justify-center space-y-6 text-center mb-12">
                        <div className="space-y-4">
                            <AnimatedText
                                text="Success Stories"
                                variant="heading"
                                className="text-3xl font-heading font-bold tracking-tighter sm:text-5xl gradient-text"
                                animation="slide"
                            />
                            {/* UPDATE 1: Removed opacity-70 and adjusted light mode text color to gray-600 */}
                            <AnimatedText
                                text="Real projects, measurable results. See how The Orbit 7 helps brands grow with custom web development, mobile apps, SEO, and automation."
                                variant="paragraph"
                                className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
                                animation="fade"
                                delay={0.3}
                            />
                        </div>
                    </div>
                </ScrollReveal>

                {/* Case study grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <ScrollAnimation key={project.client} type="slide" direction="up" delay={(index % 3) * 0.1}>
                            <article
                                /* UPDATE 2: Added bg-white for light theme cards to pop out */
                                className={`group flex h-full flex-col overflow-hidden rounded-xl border bg-white dark:bg-transparent glassmorphic-card soft-glow cursor-pointer transition-transform duration-300 hover:-translate-y-1 ${project.borderClass}`}
                                onClick={() =>
                                    openWhatsApp(
                                        `Hi, I saw the "${project.title}" case study and I'd like something similar for my business. Please share more details.`
                                    )
                                }
                                role="button"
                                aria-label={`Discuss a project like ${project.title} on WhatsApp`}
                            >
                                {/* Project image */}
                                <div className="relative h-48 w-full overflow-hidden">
                                    <Image
                                        src={project.imageSrc}
                                        alt={`${project.client} — ${project.title}`}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {/* Kept overlay dark so white text remains readable over the image */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />
                                    
                                    <span className="absolute top-4 left-4 rounded-full border border-emerald-800/30 bg-gray-950/70 px-3 py-1 text-xs text-white/80 backdrop-blur">
                                        {project.industry}
                                    </span>
                                    
                                    <div className="absolute bottom-4 left-4 flex items-baseline gap-2">
                                        <span className="font-heading text-3xl font-bold text-white">{project.metric}</span>
                                        <span className="text-sm text-white/70">{project.metricLabel}</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex flex-1 flex-col p-6">
                                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{project.client}</p>
                                    <h3 className="text-xl font-heading font-medium tracking-tight relative w-fit text-gray-900 dark:text-white">
                                        {project.title}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
                                    </h3>
                                    
                                    {/* UPDATE 3: Fixed description text contrast for light mode */}
                                    <p className="mt-3 flex-1 text-sm text-gray-600 dark:text-gray-400 leading-relaxed transition-opacity duration-300 group-hover:opacity-100">
                                        {project.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                /* UPDATE 4: Fixed tag colors. Light mode gets soft red bg with dark red text. Dark mode remains the same. */
                                                className="rounded-full border border-emerald-200 dark:border-emerald-800/30 bg-emerald-50 dark:bg-emerald-900/10 px-3 py-1 text-xs font-medium text-emerald-300 dark:text-emerald-300"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Hover CTA hint */}
                                    <p className="mt-5 flex items-center text-sm font-medium text-emerald-300 dark:text-emerald-300 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                        <TrendingUp className="mr-2 h-4 w-4" />
                                        Want results like this? Chat with us
                                        <ArrowRight className="ml-1 h-4 w-4" />
                                    </p>
                                </div>
                            </article>
                        </ScrollAnimation>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 flex flex-col items-center">
                    <ScrollAnimation type="fade">
                        <div className="w-fit">
                            <AnimatedGradientBorder
                                colors={["#10b981", "#065f46", "#34d399", "#065f46"]}
                                borderWidth={1}
                                duration={6}
                            >
                                {/* UPDATE 5: Ensured bottom button background is solid white in light theme to show gradient border clearly */}
                                <PrimaryButton
                                    size="lg"
                                    className="bg-white dark:bg-background border-0 text-gray-900 dark:text-foreground hover:bg-gray-50 dark:hover:bg-gray-900 px-8 py-3 transition-colors"
                                    onClick={() =>
                                        openWhatsApp(
                                            "Hi, I'd like to start my own success story with The Orbit 7. Please share more details."
                                        )
                                    }
                                >
                                    <span className="flex items-center font-medium">
                                        Start Your Success Story
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