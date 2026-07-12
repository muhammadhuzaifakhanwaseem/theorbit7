"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { Check, Code, Smartphone, Search, Megaphone, Bot } from "lucide-react"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"

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

const packageMessage = (service: string, packageName: string) =>
  `Hi, I'm interested in the "${packageName}" package for ${service}. Please provide more information.`

/* ------------------------------------------------------------------ */
/* Pricing Data Structure                                             */
/* ------------------------------------------------------------------ */
type Package = {
  name: string
  description: string
  price: string
  duration: string
  features: string[]
  popular: boolean
}

const pricingData: Record<string, { icon: any; packages: Package[] }> = {
  "Web Dev": {
    icon: Code,
    packages: [
      {
        name: "Basic Web Presence",
        description: "Perfect for portfolios or simple business landing pages.",
        price: "From $800",
        duration: "per project",
        features: [
          "WordPress or Webflow Build",
          "Premium Theme Customization",
          "Mobile Responsive Design",
          "Basic On-Page SEO",
          "Contact Form Integration",
          "14 Days Post-Launch Support",
        ],
        popular: false,
      },
      {
        name: "Modern Headless",
        description: "High-performance frontend for growing brands and stores.",
        price: "From $2,500",
        duration: "per project",
        features: [
          "Next.js / React Frontend",
          "Headless CMS or Shopify Integration",
          "Advanced UI/UX & Animations",
          "Core Web Vitals Optimized (<1s load)",
          "Google Analytics & Meta Pixel Setup",
          "30 Days Post-Launch Support",
        ],
        popular: true,
      },
      {
        name: "Full-Stack System",
        description: "Custom backend architecture, APIs, and complex logic.",
        price: "From $5,500",
        duration: "per project",
        features: [
          "Next.js + Laravel / Node.js Backend",
          "Custom Database & API Architecture",
          "Admin Dashboard & Inventory System",
          "Payment Gateway Integration",
          "Third-party Software Sync (ERP/CRM)",
          "Dedicated Maintenance SLA",
        ],
        popular: false,
      },
    ],
  },
  "App Dev": {
    icon: Smartphone,
    packages: [
      {
        name: "MVP Prototype",
        description: "Get your app idea to market quickly to test the waters.",
        price: "From $3,000",
        duration: "per project",
        features: [
          "React Native / Flutter UI",
          "Single Platform Focus (iOS or Android)",
          "Firebase Auth & Basic Database",
          "Standard UI Components",
          "App Store Submission Help",
        ],
        popular: false,
      },
      {
        name: "Hybrid Growth",
        description: "Cross-platform app ready for scaling users.",
        price: "From $6,500",
        duration: "per project",
        features: [
          "Cross-Platform (iOS & Android)",
          "Custom API Integration",
          "Push Notifications Setup",
          "Payment Processing (Stripe/Apple Pay)",
          "Custom Animations & Premium UX",
          "Basic Admin Panel",
        ],
        popular: true,
      },
      {
        name: "Native Enterprise",
        description: "Complex, high-performance apps with heavy processing.",
        price: "Custom",
        duration: "scoped per engagement",
        features: [
          "Complex State Management",
          "Real-time Sockets & GPS Tracking",
          "Advanced Security & Encryption",
          "Comprehensive Admin Dashboard",
          "Full QA & Automated Testing",
          "SLA & Ongoing Maintenance",
        ],
        popular: false,
      },
    ],
  },
  "SEO": {
    icon: Search,
    packages: [
      {
        name: "Local SEO Starter",
        description: "Dominate your local city searches and Google Maps.",
        price: "$500",
        duration: "per month",
        features: [
          "Google Business Profile Optimization",
          "Local Citations & Directories",
          "Basic On-Page SEO (10 pages)",
          "Keyword Research (Local Intent)",
          "Monthly Performance Report",
        ],
        popular: false,
      },
      {
        name: "Organic Growth",
        description: "Comprehensive SEO for national or e-commerce brands.",
        price: "$1,200",
        duration: "per month",
        features: [
          "Technical Site Audit & Fixes",
          "Advanced Keyword Strategy",
          "Content Creation (4 Blogs/mo)",
          "High-Quality Backlink Building",
          "Competitor Gap Analysis",
          "Conversion Rate Optimization (CRO)",
        ],
        popular: true,
      },
      {
        name: "Enterprise Authority",
        description: "Aggressive search dominance for highly competitive niches.",
        price: "$3,000+",
        duration: "per month",
        features: [
          "Programmatic SEO Strategy",
          "Large-scale Content Production",
          "Digital PR & Premium Link Placements",
          "Deep Log File Analysis",
          "International / Multi-language SEO",
          "Dedicated SEO Manager",
        ],
        popular: false,
      },
    ],
  },
  "Digital Marketing": {
    icon: Megaphone,
    packages: [
      {
        name: "Ad Setup & Kickoff",
        description: "Perfect for testing offers and finding winning creatives.",
        price: "$600",
        duration: "per month + ad spend",
        features: [
          "Meta (FB/IG) or Google Ads Setup",
          "Audience Research & Targeting",
          "2 Ad Variations & Copywriting",
          "Basic Conversion Tracking Setup",
          "Bi-weekly Campaign Optimization",
        ],
        popular: false,
      },
      {
        name: "Omnichannel Scale",
        description: "Multi-platform strategy to reduce CPA and maximize ROAS.",
        price: "$1,500",
        duration: "per month + ad spend",
        features: [
          "Meta Ads + Google Search & Max",
          "Dynamic Retargeting Funnels",
          "A/B Testing (Creatives & Hooks)",
          "Advanced Server-Side Tracking (CAPI)",
          "Custom Looker Studio Dashboard",
          "Weekly Strategy Calls",
        ],
        popular: true,
      },
      {
        name: "Full-Funnel Partner",
        description: "We act as your complete outsourced marketing department.",
        price: "$3,500+",
        duration: "per month + ad spend",
        features: [
          "All Ad Platforms (Meta, Google, TikTok)",
          "Email & SMS Marketing (Klaviyo)",
          "Landing Page Creation & CRO",
          "Creative Direction & Scripting",
          "LTV & Churn Rate Optimization",
          "Dedicated Growth Lead",
        ],
        popular: false,
      },
    ],
  },
  "AI Automation": {
    icon: Bot,
    packages: [
      {
        name: "Smart Chatbot",
        description: "Automate your customer support and lead generation.",
        price: "From $900",
        duration: "one-time setup",
        features: [
          "Custom AI Knowledge Base Training",
          "Website Widget Integration",
          "WhatsApp/Messenger Handoff",
          "Basic Lead Capture Flow",
          "Prompt Engineering & Fine-tuning",
        ],
        popular: false,
      },
      {
        name: "Workflow Automations",
        description: "Connect your apps and eliminate repetitive manual tasks.",
        price: "From $2,200",
        duration: "per project",
        features: [
          "Zapier / Make.com Architecture",
          "CRM to Email/Slack Syncing",
          "Automated Invoice & Billing Flows",
          "Data Scraping & Formatting Bots",
          "Error Handling & Redundancy",
          "30 Days Monitoring",
        ],
        popular: true,
      },
      {
        name: "Custom AI Agents",
        description: "Proprietary AI models acting as virtual employees.",
        price: "From $5,000",
        duration: "per project",
        features: [
          "LangChain / AutoGen Development",
          "Integration with Internal Databases",
          "Multi-Agent Task Delegation",
          "Voice AI Calling Bots",
          "Enterprise Data Security & Sandboxing",
          "Ongoing AI Maintenance SLA",
        ],
        popular: false,
      },
    ],
  },
}

export function PricingSection() {
  const [activeTab, setActiveTab] = useState<string>("Web Dev")

  return (
    <section id="pricing" className="w-full pt-12 md:pt-24 pb-16 bg-gray-50/50 dark:bg-transparent">
      <div className="container px-4 md:px-6">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-heading font-bold tracking-tighter sm:text-5xl">
                Tailored Solutions, <span className="gradient-text">Transparent Pricing</span>
              </h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Choose a service below to explore our market-aligned packages. From simple setups to complex enterprise systems, we scale with you.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Dynamic Tabs */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {Object.keys(pricingData).map((service) => {
              const Icon = pricingData[service].icon
              const isActive = activeTab === service
              return (
                <button
                  key={service}
                  onClick={() => setActiveTab(service)}
                  className={`relative flex items-center px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-900 bg-white dark:bg-gray-800/50 dark:text-gray-300 dark:hover:text-white border border-gray-200 dark:border-gray-700"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBackground"
                      className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-full -z-10"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon className={`w-4 h-4 mr-2 ${isActive ? "text-white" : "text-gray-500 dark:text-gray-400"}`} />
                  {service}
                </button>
              )
            })}
          </div>
        </ScrollReveal>

        {/* Dynamic Cards Container */}
        <div className="min-h-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {pricingData[activeTab].packages.map((plan, index) => (
                <Card
                  key={index}
                  className={`h-full flex flex-col glassmorphic-card relative overflow-hidden bg-white dark:bg-transparent transition-all duration-300 hover:-translate-y-1 ${
                    plan.popular ? "border-emerald-500/50 shadow-[0_0_30px_rgba(220,38,38,0.1)]" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400" />
                  )}
                  {plan.popular && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-300 dark:text-emerald-300 text-xs font-semibold rounded-full border border-emerald-200 dark:border-emerald-800/50">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="tracking-tight text-xl text-gray-900 dark:text-white">
                      {plan.name}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400 min-h-[40px]">
                      {plan.description}
                    </CardDescription>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400 ml-2">
                        / {plan.duration}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-emerald-300 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.popular ? (
                      <AnimatedGradientBorder
                        colors={["#10b981", "#065f46", "#34d399", "#065f46"]}
                        borderWidth={1}
                        duration={8}
                      >
                        <Button
                          className="w-full bg-white dark:bg-background border-0 text-gray-900 dark:text-foreground hover:bg-gray-50 dark:hover:bg-gray-900 font-medium"
                          onClick={() => openWhatsApp(packageMessage(activeTab, plan.name))}
                        >
                          Select Package
                        </Button>
                      </AnimatedGradientBorder>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full border-gray-200 dark:border-gray-800 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-900/50 text-gray-900 dark:text-white transition-colors"
                        onClick={() => openWhatsApp(packageMessage(activeTab, plan.name))}
                      >
                        Select Package
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pricing reassurance note */}
        <ScrollReveal delay={0.3}>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-12 max-w-2xl mx-auto">
            Need something completely customized? We offer tailored enterprise solutions. Contact us for a free consultation to scope out your specific requirements.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}