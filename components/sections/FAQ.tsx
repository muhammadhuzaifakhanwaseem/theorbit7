"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FAQItem {
  q: string;
  a: string;
}

export default function FAQ({
  items,
  title = "Frequently asked questions",
}: {
  items: FAQItem[];
  title?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {title && (
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
      )}
      <dl className="mt-8 divide-y divide-line border-t border-line">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="py-5">
              <dt>
                <button
                  className="flex w-full items-center justify-between gap-4 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="text-base font-medium text-ink sm:text-lg">{item.q}</span>
                  <Plus
                    className={cn(
                      "size-5 shrink-0 text-brand transition-transform duration-200",
                      isOpen && "rotate-45"
                    )}
                    aria-hidden="true"
                  />
                </button>
              </dt>
              <dd
                className={cn(
                  "grid overflow-hidden transition-all duration-300 ease-out",
                  isOpen ? "grid-rows-[1fr] opacity-100 pt-3" : "grid-rows-[0fr] opacity-0"
                )}
              >
                <p className="overflow-hidden text-sm leading-relaxed text-ink-muted sm:text-base">
                  {item.a}
                </p>
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
