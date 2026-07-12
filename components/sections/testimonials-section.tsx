"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { AnimatedText } from "@/components/ui/animated-text"
import { motion } from "framer-motion"
import { AnimatedBackground } from "@/components/ui/animated-background"

export function TestimonialsSection() {
  // NOTE: Sample testimonials — replace with real client quotes (with permission) before launch.
  // Names/companies match the Success Stories section so the site stays consistent.
  const testimonials = [
    {
      name: "Zain Alavi",
      role: "E-Commerce Director, Veloce Apparel",
      content:
        "Our old Shopify theme took 6+ seconds to load on mobile and we were bleeding checkout conversions. The Orbit 7 rebuilt it headless on Next.js in about nine weeks. Pages load near-instantly now and mobile checkout completion is up noticeably. They also left us documentation our in-house dev actually uses.",
      avatar: "ZA",
    },
    {
      name: "Amina Khan",
      role: "Marketing Head, Apex Brands",
      content:
        "I'll be honest — for the first two months of the SEO program I was nervous, because rankings barely moved. They kept showing us the technical fixes and content being shipped, and around month four it compounded. A year in, organic is our cheapest acquisition channel and I stopped checking rankings daily.",
      avatar: "AK",
    },
    {
      name: "Omar Farooq",
      role: "Managing Director, North Ridge Ventures",
      content:
        "I was skeptical about custom ERP — everyone warns you about budget overruns. They scoped it in phases, delivered the inventory module first so we saw value early, and stayed close to the estimate. Reports that used to take my team two days now run in minutes. Should have done this three years ago.",
      avatar: "OF",
    },
    {
      name: "Sarah Jenkins",
      role: "Founder, Lumina Skin",
      content:
        "What sold me was having one team for everything. They built our app, wired in an AI chat agent for order tracking and product questions, and set up the launch campaigns. Support tickets dropped almost by half. When something broke on a Sunday, I messaged them on WhatsApp and had a fix by Monday morning.",
      avatar: "SJ",
    },
    {
      name: "Ahmed Raza",
      role: "Owner, Karachi Bites (3 branches)",
      content:
        "We're a small business, not a tech company, and they never made me feel dumb for asking basic questions. New website, Google Business setup, and local SEO for all three branches. We now show up first for the searches that matter in our area, and online orders come in daily instead of weekly.",
      avatar: "AR",
    },
    {
      name: "Maria Santos",
      role: "Operations Manager, Swift Logistics Co.",
      content:
        "The fleet dashboard replaced a mess of spreadsheets and phone calls. Dispatch is automated, customers get delivery notifications, and I can see every vehicle live. There were a couple of rough sprints mid-project, but they communicated early and fixed course. Cost per delivery is down about a third.",
      avatar: "MS",
    },
  ]

  return (
    <section id="testimonials" className="relative w-full pt-12 md:pt-24 pb-16 bg-muted/30 overflow-hidden">
      <AnimatedBackground variant="waves" color="rgba(16, 185, 129, 0.05)" />

      <div className="container px-4 md:px-6">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <AnimatedText
                text="What Our Clients Say"
                variant="heading"
                className="text-3xl font-heading font-bold tracking-tighter sm:text-5xl"
                animation="slide"
              />
              <AnimatedText
                text="Real feedback from founders, marketers, and operators who trusted The Orbit 7 with their websites, apps, and growth."
                variant="paragraph"
                className="max-w-[900px] text-gray-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 opacity-70"
                animation="fade"
                delay={0.3}
              />
            </div>
          </div>
        </ScrollReveal>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 pt-12 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="h-full glassmorphic-card group">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Avatar className="glassmorphic-avatar border-2 border-transparent group-hover:border-emerald-500 transition-colors">
                          <AvatarImage
                            src={`/placeholder.svg?height=40&width=40&text=${testimonial.avatar}`}
                            alt={testimonial.name}
                          />
                          <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-medium tracking-tight group-hover:text-emerald-300 transition-colors">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-muted-foreground opacity-70">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground opacity-70 group-hover:opacity-100 transition-opacity">
                      {testimonial.content}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}