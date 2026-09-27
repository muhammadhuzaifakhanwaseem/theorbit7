"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/content";
import { cn } from "@/lib/utils";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];

  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Client results"
            title="What our clients say after launch"
            className="max-w-xl"
          />
          <div className="flex gap-2">
            <button
              aria-label="Previous testimonial"
              onClick={() => setIndex((index - 1 + testimonials.length) % testimonials.length)}
              className="flex size-11 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-brand hover:text-brand"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              aria-label="Next testimonial"
              onClick={() => setIndex((index + 1) % testimonials.length)}
              className="flex size-11 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-brand hover:text-brand"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div className="mt-12 rounded-3xl border border-line bg-white p-8 sm:p-12">
          <Quote className="size-9 text-brand" aria-hidden="true" />
          <p className="mt-6 max-w-3xl font-display text-xl font-medium leading-relaxed text-ink sm:text-2xl">
            {t.quote}
          </p>
          <div className="mt-8">
            <p className="text-base font-semibold text-ink">{t.name}</p>
            <p className="text-sm text-ink-muted">
              {t.role}, {t.company}
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-8 bg-brand" : "w-1.5 bg-line"
              )}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
