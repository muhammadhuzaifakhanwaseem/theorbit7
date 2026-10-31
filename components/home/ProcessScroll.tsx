"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

type Step = { no: string; title: string; text: string; points: string[] };

/**
 * Scroll-driven process timeline (GSAP ScrollTrigger). The progress rail fills
 * as you scroll and each step lights up as it reaches the centre of the viewport.
 * Without JS (or with reduced motion) every step is simply shown, fully readable.
 */
export default function ProcessScroll({ steps }: { steps: Step[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const el = root.current!;
      gsap.fromTo(
        el.querySelector(".rail-fill"),
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 60%", end: "bottom 60%", scrub: 0.6 },
        },
      );
      el.querySelectorAll<HTMLElement>(".step").forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0.35 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: step,
              start: "top 75%",
              end: "top 45%",
              scrub: true,
              onToggle: (self) => step.classList.toggle("is-active", self.isActive || self.progress === 1),
            },
          },
        );
        gsap.from(step.querySelectorAll(".step-point"), {
          y: 12,
          opacity: 0,
          stagger: 0.07,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: { trigger: step, start: "top 70%" },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={root} className="relative">
      <div aria-hidden="true" className="absolute left-[1.15rem] top-2 bottom-2 w-px bg-line sm:left-[1.65rem]">
        <span className="rail-fill absolute inset-0 origin-top bg-gradient-to-b from-brand-500 to-brand" />
      </div>
      <ol className="space-y-6 sm:space-y-8">
        {steps.map((s) => (
          <li key={s.no} className="step group relative grid grid-cols-[2.3rem_1fr] gap-5 sm:grid-cols-[3.3rem_1fr] sm:gap-8">
            <span className="relative z-10 flex size-[2.3rem] items-center justify-center rounded-full border border-line-strong bg-white font-mono text-xs text-brand transition-all duration-500 group-[.is-active]:border-brand group-[.is-active]:bg-brand group-[.is-active]:text-white sm:size-[3.3rem] sm:text-sm">
              {s.no}
            </span>
            <div className="rounded-3xl border border-line bg-white p-6 transition-shadow duration-500 group-[.is-active]:shadow-lift sm:p-8">
              <h3 className="text-2xl font-semibold sm:text-3xl">{s.title}</h3>
              <p className="mt-3 max-w-xl leading-relaxed text-muted">{s.text}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {s.points.map((p) => (
                  <li key={p} className="step-point inline-flex items-center gap-1.5 rounded-full bg-mint-50 px-3 py-1.5 text-sm text-ink-2 ring-1 ring-brand/10">
                    <Check className="size-3.5 text-brand" aria-hidden="true" /> {p}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
