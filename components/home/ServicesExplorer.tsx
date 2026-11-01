"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Category, Service } from "@/data/services";
import ServiceVisual from "@/components/visuals/ServiceVisual";
import type { VisualKind } from "@/data/services/types";
import { cn } from "@/lib/utils";

const catVisual: Record<string, VisualKind> = {
  software: "code",
  ai: "ai",
  web: "browser",
  mobile: "phone",
  seo: "answer",
  marketing: "chart",
  design: "design",
  video: "podcast",
};

/**
 * Interactive category explorer. Every category's service links are rendered
 * in the HTML (inactive panels are visually collapsed, not removed), so all
 * internal links remain crawlable.
 */
export default function ServicesExplorer({
  categories,
  grouped,
}: {
  categories: Category[];
  grouped: Record<string, Pick<Service, "slug" | "title" | "summary">[]>;
}) {
  const [active, setActive] = useState(categories[0].id);

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.4fr] lg:gap-14">
      <div role="tablist" aria-label="Service categories" className="flex gap-2 overflow-x-auto pb-2 no-scrollbar lg:flex-col lg:overflow-visible">
        {categories.map((c, i) => {
          const on = c.id === active;
          return (
            <button
              key={c.id}
              role="tab"
              id={`tab-${c.id}`}
              aria-selected={on}
              aria-controls={`panel-${c.id}`}
              onClick={() => setActive(c.id)}
              onMouseEnter={() => setActive(c.id)}
              className={cn(
                "group relative flex shrink-0 cursor-pointer items-center gap-5 rounded-2xl px-5 py-4 text-left transition-colors duration-300 lg:px-6 lg:py-6",
                on ? "text-white" : "text-ink-2 hover:bg-mint-50",
              )}
            >
              {on && (
                <motion.span
                  layoutId="cat-pill"
                  className="absolute inset-0 -z-0 rounded-2xl bg-brand shadow-brand"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className={cn("relative font-mono text-xs", on ? "text-mint" : "text-soft")}>0{i + 1}</span>
              <span className="relative">
                <span className="block font-display text-lg font-semibold tracking-tight whitespace-nowrap lg:text-2xl">{c.name}</span>
                <span className={cn("mt-1 hidden text-sm lg:block", on ? "text-white/70" : "text-muted")}>
                  {grouped[c.id].length} services
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="relative min-h-[34rem] overflow-hidden rounded-[2rem] border border-line bg-paper p-6 sm:p-10">
        <div aria-hidden="true" className="bg-dots absolute inset-0 opacity-60" />
        {categories.map((c) => {
          const on = c.id === active;
          return (
            <div
              key={c.id}
              role="tabpanel"
              id={`panel-${c.id}`}
              aria-labelledby={`tab-${c.id}`}
              className={cn("relative", !on && "sr-only")}
            >
              <div className="flex items-start justify-between gap-8">
                <p className="max-w-md text-lg leading-relaxed text-muted">{c.description}</p>
                <AnimatePresence mode="wait">
                  {on && (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, y: 14, rotate: -2 }}
                      animate={{ opacity: 1, y: 0, rotate: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="pointer-events-none hidden w-56 shrink-0 xl:block"
                    >
                      <ServiceVisual kind={catVisual[c.id]} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {grouped[c.id].map((s, i) => (
                  <motion.li
                    key={s.slug}
                    initial={false}
                    animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: on ? i * 0.05 : 0, duration: 0.4 }}
                  >
                    <Link
                      href={`/services/${s.slug}`}
                      tabIndex={on ? 0 : -1}
                      className="group/s flex h-full items-start justify-between gap-4 rounded-2xl border border-line bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-soft"
                    >
                      <span>
                        <span className="block font-medium text-ink">{s.title}</span>
                        <span className="mt-1 line-clamp-2 block text-sm text-muted">{s.summary}</span>
                      </span>
                      <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-brand transition-transform duration-300 group-hover/s:-translate-y-0.5 group-hover/s:translate-x-0.5" aria-hidden="true" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
