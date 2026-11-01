"use client";

import { useEffect, useRef } from "react";

/** Thin progress bar showing how far through the article the reader is. */
export default function ReadingProgress({ targetId }: { targetId: string }) {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el || !bar.current) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      bar.current!.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [targetId]);
  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent">
      <div ref={bar} className="h-full origin-left scale-x-0 bg-gradient-to-r from-brand-500 to-brand" />
    </div>
  );
}
