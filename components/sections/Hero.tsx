"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Container from "@/components/ui/Container";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pb-20 pt-16 sm:pb-28 sm:pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(22,62,51,0.08),transparent)]"
      />
      <Container>
        <motion.p
          custom={0}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mx-auto flex w-fit items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-sm text-ink-muted"
        >
          <span className="size-1.5 rounded-full bg-brand" />
          Now booking Q1 2027 engagements
        </motion.p>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mx-auto mt-8 max-w-4xl text-balance text-center font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-6xl lg:text-[4.25rem]"
        >
          Engineering AI-Powered Digital Systems for Scalable Businesses
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mx-auto mt-7 max-w-2xl text-center text-lg leading-relaxed text-ink-muted"
        >
          The Orbit 7 designs and builds mobile applications, web applications, digital
          products, backend systems, AI-powered products, automation systems, and custom
          software for teams that need to move fast without breaking what they&apos;ve built.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-brand-dark"
          >
            Get A Call Now
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-base font-medium text-ink transition-colors hover:border-brand hover:text-brand"
          >
            Schedule A Call
          </Link>
        </motion.div>
      </Container>

      <motion.div
        custom={4}
        initial="hidden"
        animate="show"
        variants={fadeUp}
        className="mt-16"
      >
        <Container>
          <div className="grid grid-cols-1 gap-4 rounded-3xl border border-line bg-surface p-4 sm:grid-cols-3">
            {[
              { label: "Product Strategy", desc: "Discovery, scoping and roadmap" },
              { label: "Engineering", desc: "Mobile, web, backend & AI" },
              { label: "Growth", desc: "Launch, analytics & iteration" },
            ].map((b) => (
              <div key={b.label} className="rounded-2xl bg-white p-6">
                <p className="font-display text-base font-semibold text-ink">{b.label}</p>
                <p className="mt-1 text-sm text-ink-muted">{b.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
