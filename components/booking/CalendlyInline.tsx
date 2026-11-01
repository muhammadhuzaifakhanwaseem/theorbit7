"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

/** Inline Calendly scheduler that only loads when scrolled near (protects page speed). */
export default function CalendlyInline({ embedUrl, title = "Schedule a call with The Orbit 7" }: { embedUrl: string; title?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { rootMargin: "400px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="relative h-[46rem] overflow-hidden rounded-[1.75rem] border border-line bg-white sm:h-[44rem]">
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-sm text-muted">
          <Loader2 className="size-6 animate-spin text-brand" aria-hidden="true" />
          Loading available times…
        </div>
      )}
      {visible && <iframe src={embedUrl} title={title} className="absolute inset-0 size-full" onLoad={() => setLoaded(true)} />}
    </div>
  );
}
