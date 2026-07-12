"use client"

import { motion } from "framer-motion"
import { ArrowRight, MessageCircle } from "lucide-react"

import { SpotlightCard } from "@/components/ui/spotlight-card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { AnimatedBackground } from "@/components/ui/animated-background"
import { GradientButton } from "@/components/ui-library/buttons/gradient-button"

/* ------------------------------------------------------------------ */
/* WhatsApp CTA helpers                                                */
/* Contact: Rijab · +92 310 0301826                                    */
/* wa.me works on desktop (WhatsApp Web) and mobile (WhatsApp app)     */
/* ------------------------------------------------------------------ */
const WHATSAPP_NUMBER = "923100301826"

const getWhatsAppLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

const openWhatsApp = (message: string) =>
  window.open(getWhatsAppLink(message), "_blank", "noopener,noreferrer")

const CONSULTATION_MESSAGE =
  "Hi, I'm interested in booking a free consultation. Please share more details."

// Core expertise pills — each opens WhatsApp with a service-specific inquiry
const expertise = ["SEO", "PPC", "Social Media Marketing", "Web Design", "Web Development"]

// Animation variants — same easing/stagger as the hero for visual continuity
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export function CtaSection() {
  return (
    <section id="contact" className="relative w-full py-12 md:py-18 lg:py-32 overflow-hidden">
      <AnimatedBackground variant="gradient" color="rgba(16, 185, 129, 0.08)" secondaryColor="rgba(75, 85, 99, 0.08)" />

      <div className="container px-6 md:px-8">
        <ScrollReveal>
          <SpotlightCard className="relative w-full overflow-hidden rounded-xl border glassmorphic-card p-1 border-glow-emerald">
            {/* Layered gradients — same treatment as the hero showcase card */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-transparent to-gray-900/20 z-10"></div>

            <div className="relative z-20 rounded-xl bg-gradient-to-br from-emerald-950/50 to-gray-950/50 px-6 py-14 md:px-14 md:py-20 lg:px-20">
              <motion.div
                className="mx-auto flex max-w-3xl flex-col items-center text-center space-y-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {/* Subheading eyebrow */}
                <motion.p
                  variants={itemVariants}
                  className="text-sm md:text-base font-heading tracking-widest uppercase text-muted-foreground"
                >
                  We Are 10X Digital
                </motion.p>

                {/* Headline */}
                <motion.h2
                  variants={itemVariants}
                  className="text-3xl font-heading font-bold tracking-tighter sm:text-5xl lg:text-6xl"
                >
                  <span className="gradient-text">We Are Performance Driven</span>
                </motion.h2>

                {/* Description */}
                <motion.div variants={itemVariants} className="space-y-4">
                  <p className="text-gray-800 md:text-xl dark:text-gray-400 opacity-70">
                    10X Digital is a full-service digital marketing agency operating in Dubai and Abu Dhabi.
                    We provide comprehensive digital solutions for businesses of all sizes, from startups and
                    SMEs to large enterprises.
                  </p>
                  <p className="text-gray-800 md:text-lg dark:text-gray-400 opacity-70">
                    From strategic consultation to managing your complete digital presence, we deliver tailored
                    solutions that align with your business goals and budget — helping you build a stronger
                    online presence and achieve measurable growth.
                  </p>
                </motion.div>

                {/* Expertise pills — each opens WhatsApp with a service inquiry */}
                <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 pt-2">
                  {expertise.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() =>
                        openWhatsApp(`Hi, I'm interested in your ${service} service. Please share more details.`)
                      }
                      className="rounded-full border border-emerald-800/30 bg-emerald-900/10 px-4 py-1.5 text-xs md:text-sm text-white/70 transition-all duration-300 hover:bg-emerald-900/30 hover:text-white hover:border-emerald-600/50"
                      aria-label={`Inquire about ${service} on WhatsApp`}
                    >
                      {service}
                    </button>
                  ))}
                </motion.div>

                {/* Primary CTA */}
                <motion.div
                  variants={itemVariants}
                  className="flex w-full flex-col items-center gap-4 pt-4 sm:w-auto sm:flex-row"
                >
                  <GradientButton
                    glowAmount={5}
                    className="w-full px-8 py-3 text-base sm:w-auto"
                    gradientFrom="from-emerald-500"
                    gradientTo="to-emerald-700"
                    asChild
                  >
                    <a
                      href={getWhatsAppLink(CONSULTATION_MESSAGE)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Book a Free Consultation
                      <motion.span
                        className="ml-2 inline-block"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, repeatDelay: 2, duration: 1 }}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.span>
                    </a>
                  </GradientButton>
                </motion.div>

                {/* Trust line — mirrors the hero's status indicator */}
                <motion.p variants={itemVariants} className="flex items-center text-sm text-muted-foreground">
                  <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
                  Replies within minutes on WhatsApp — no forms, no waiting
                </motion.p>
              </motion.div>
            </div>
          </SpotlightCard>
        </ScrollReveal>
      </div>
    </section>
  )
}