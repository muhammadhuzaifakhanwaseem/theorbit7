"use client"

import Image from "next/image"
import { ScrollReveal } from "@/components/scroll-reveal"
import { AnimatedText } from "@/components/ui/animated-text"
import { ScrollAnimation } from "@/components/ui-library/animations/scroll-animations"
import { AnimatedBackground } from "@/components/ui/animated-background"
import { Chrome, Facebook, TrendingUp, MessageCircle, LayoutGrid } from "lucide-react"

/* ------------------------------------------------------------------ */
/* Partner / certification badges                                      */
/*                                                                     */
/* IMPORTANT: Only list partnerships you actually hold, and replace    */
/* the icon fallbacks with the official badge assets each program      */
/* provides (drop the file in /public and set `imageSrc`).             */
/* ------------------------------------------------------------------ */
const partners = [
    {
        name: "Google",
        subtitle: "Partner",
        icon: <Chrome className="h-9 w-9" />,
        imageSrc: null, // e.g. "/badges/google-partner.svg"
    },
    {
        name: "Meta",
        subtitle: "Business Partner",
        icon: <Facebook className="h-9 w-9" />,
        imageSrc: null,
    },
    {
        name: "SE Ranking",
        subtitle: "Featured Agency",
        icon: <TrendingUp className="h-9 w-9" />,
        imageSrc: null,
    },
    {
        name: "WhatsApp",
        subtitle: "Commerce",
        icon: <MessageCircle className="h-9 w-9" />,
        imageSrc: null,
    },
    {
        name: "Microsoft Advertising",
        subtitle: "Partner",
        icon: <LayoutGrid className="h-9 w-9" />,
        imageSrc: null,
    },
]

export function PartnersSection() {
    return (
        <section
            id="partners"
            className="w-full pt-12 md:pt-24 pb-16 bg-muted/10 overflow-hidden">
            {/* Subtle animated texture over the dark banner */}
            <AnimatedBackground variant="dots" color="rgba(16, 185, 129, 0.05)" />

            <div className="container relative z-10 px-6 md:px-8">
                {/* Headline — brand name highlighted, rest in white, mirroring the reference */}
                <ScrollReveal>
                    <div className="text-center mb-14 md:mb-16">
                        <h2 className="text-3xl font-heading font-bold tracking-tighter sm:text-4xl lg:text-5xl">
                            <span className="gradient-text">The Orbit 7</span>{" "}
                            <span className="text-default">— Your Path to Digital Growth.</span>
                        </h2>
                    </div>
                </ScrollReveal>

                {/* Partner badge row — grayscale-white lockups on dark, like the reference */}
                <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-10 lg:gap-x-16 mb-14 md:mb-16">
                    {partners.map((partner, index) => (
                        <ScrollAnimation key={partner.name} type="fade" delay={index * 0.12}>
                            <div
                                className="flex items-center gap-3 text-default opacity-80 transition-all duration-300 hover:opacity-100 hover:scale-105"
                                title={`${partner.name} ${partner.subtitle}`}
                            >
                                {partner.imageSrc ? (
                                    <Image
                                        src={partner.imageSrc}
                                        alt={`${partner.name} ${partner.subtitle} badge`}
                                        width={160}
                                        height={56}
                                        className="h-12 w-auto object-contain"
                                    />
                                ) : (
                                    <>
                                        {partner.icon}
                                        <span className="text-left leading-tight">
                                            <span className="block text-sm text-default">{partner.name}</span>
                                            <span className="block font-heading text-xl font-bold tracking-tight">
                                                {partner.subtitle}
                                            </span>
                                        </span>
                                    </>
                                )}
                            </div>
                        </ScrollAnimation>
                    ))}
                </div>

                {/* Supporting paragraph */}
                <ScrollReveal delay={0.3}>
                    <div className="mx-auto max-w-4xl text-center">
                        <AnimatedText
                            text="With years of hands-on experience, The Orbit 7 delivers a comprehensive range of digital services SEO, Google Ads, social media marketing & management, custom website design & development, mobile apps, and AI-powered automation engineered to grow your business."
                            variant="paragraph"
                            className="text-default md:text-xl/relaxed lg:text-lg/relaxed xl:text-xl/relaxed"
                            animation="fade"
                            delay={0.2}
                        />
                    </div>
                </ScrollReveal>
            </div>
        </section>
    )
}