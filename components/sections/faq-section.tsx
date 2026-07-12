"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollReveal } from "@/components/scroll-reveal"

/* WhatsApp — The Orbit 7 · Contact: Rijab · +92 310 0301826 */
const WHATSAPP_LINK = `https://wa.me/923100301826?text=${encodeURIComponent(
  "Hi, I have a question that isn't covered in your FAQ. Can you help?"
)}`

export function FaqSection() {
  const faqs = [
    {
      question: "What services does The Orbit 7 offer?",
      answer:
        "We're a full-service digital agency. Our core services are custom web development (Next.js, React, Shopify), mobile app development (iOS, Android, cross-platform), custom CRM & ERP software, SEO, social media & digital marketing, and AI integrations & automation. Most clients combine two or more — for example, a new website plus an SEO program to drive traffic to it.",
    },
    {
      question: "How much does a project cost?",
      answer:
        "Website projects start from $4,500 and full growth ecosystems (platform + marketing) from $8,500, while enterprise CRM/ERP and mobile app builds are scoped individually. The honest answer is that cost depends on scope — which is why every project starts with a free consultation where we define deliverables, timeline, and a fixed quote before you commit to anything. No hidden retainers.",
    },
    {
      question: "How long does it take to build a website or app?",
      answer:
        "A typical custom website takes 4–8 weeks from kickoff to launch. E-commerce builds usually run 6–10 weeks, and mobile apps 10–16 weeks depending on complexity. SEO is different — technical fixes ship in the first month, but meaningful ranking growth typically compounds over 3–6 months. We give you a realistic timeline in your proposal, not an optimistic one.",
    },
    {
      question: "Who owns the code and accounts after the project?",
      answer:
        "You do — 100%. Every engagement includes full source code ownership, documentation, and handover of all accounts (hosting, analytics, ad accounts, domains). There's no vendor lock-in: any competent development team can take over from our codebase, though most clients choose to stay with us for ongoing work.",
    },
    {
      question: "How do we communicate during the project?",
      answer:
        "Directly and often. You get a dedicated point of contact reachable on WhatsApp, weekly progress demos, and access to a shared project board so you always know what's shipping. We work with clients across time zones — most questions get answered within a few hours, not days.",
    },
    {
      question: "Do you work with international clients?",
      answer:
        "Yes — most of our clients are outside Pakistan, across the US, UK, UAE, and Europe. We handle contracts, invoicing, and payments internationally, and schedule calls around your time zone. Distance has never been an issue: everything from kickoff to launch runs remotely with full transparency.",
    },
    {
      question: "What happens after launch? Do you offer support?",
      answer:
        "Every project includes at least 30 days of post-launch support for fixes and adjustments. After that, most clients move to a lightweight maintenance plan covering updates, security, backups, and small improvements — or a growth retainer if we're running their SEO and marketing. You're never left with a website and no one to call.",
    },
    {
      question: "Can you redesign or fix an existing website instead of building new?",
      answer:
        "Absolutely. We regularly take over existing sites for redesigns, speed optimization, SEO recovery, or migration from an old platform (like WordPress or a legacy Shopify theme) to a modern stack. We'll audit what you have first — sometimes a focused fix beats a full rebuild, and we'll tell you honestly which one you need.",
    },
  ]

  return (
    <section id="faq" className="w-full py-16 bg-muted/30">
      <div className="container px-4 md:px-6">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-heading font-bold tracking-tighter sm:text-5xl">
                Frequently Asked Questions
              </h2>
              <p className="max-w-[900px] text-gray-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 opacity-70">
                Everything you need to know about working with The Orbit 7 — pricing, timelines, ownership, and support.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="mx-auto max-w-3xl py-12">
          <ScrollReveal>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="glassmorphic-accordion-item">
                  <AccordionTrigger className="text-left font-medium tracking-tight">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground opacity-70">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mt-8 text-center text-sm text-muted-foreground opacity-70">
              Still have a question?{" "}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-300 hover:underline underline-offset-4"
              >
                Ask us on WhatsApp
              </a>{" "}
              — we usually reply within minutes.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}