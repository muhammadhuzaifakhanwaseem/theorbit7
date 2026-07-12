"use client"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { ScrollReveal } from "@/components/scroll-reveal"
import { AnimatedText } from "@/components/ui/animated-text"
import { motion } from "framer-motion"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"
import { GradientButton } from "@/components/ui-library/buttons/gradient-button"
import { OutlineButton } from "@/components/ui-library/buttons/button-variants"

/* ------------------------------------------------------------------ */
/* WhatsApp CTA helpers — The Orbit 7                                 */
/* Contact: Rijab · +92 310 0301826                                   */
/* ------------------------------------------------------------------ */
const WHATSAPP_NUMBER = "923100301826"

const getWhatsAppLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

export function CtaSection() {
  return (
    <section id="cta" className="w-full py-12 md:py-18 lg:py-32 bg-gradient-to-br from-emerald-50 to-gray-50 dark:from-emerald-950/30 dark:to-gray-950/30">
      <div className="container px-6 md:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="space-y-4">
              <AnimatedText
                text="Ready to Scale Your Business?"
                variant="heading"
                className="text-3xl font-heading font-bold tracking-tighter sm:text-5xl gradient-text"
                animation="wave"
              />
              {/* UPDATE 2: Improved text contrast for light mode (text-gray-600) and removed forced opacity */}
              <AnimatedText
                text="Tell us what you're building — a website, a mobile app, a custom system, or a growth engine. The Orbit 7 turns your idea into a live digital product, then drives the traffic and conversions to match. One message starts it all."
                variant="paragraph"
                className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
                animation="fade"
                delay={0.3}
              />
            </div>
            <motion.div
              className="flex flex-col gap-6 sm:flex-row sm:gap-6 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <GradientButton
                glowAmount={5}
                size="lg"
                className="px-8 py-3"
                gradientFrom="from-emerald-500"
                gradientTo="to-emerald-700"
                asChild
              >
                <a
                  href={getWhatsAppLink(
                    "Hi, I'm ready to start a project with The Orbit 7. Please share more details."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  Get a Free Quote
                  <motion.span
                    className="ml-2 inline-block"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, repeatDelay: 2, duration: 1 }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </a>
              </GradientButton>

              <AnimatedGradientBorder
                colors={["#10b981", "#065f46", "#34d399", "#065f46"]}
                borderWidth={1}
                duration={6}
              >
                {/* UPDATE 3: Ensure the button background adapts to the new section background */}
                <OutlineButton size="lg" className="bg-white dark:bg-background w-full h-full border-0 px-8 py-3" asChild>
                  <Link href="#process">See How We Work</Link>
                </OutlineButton>
              </AnimatedGradientBorder>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}