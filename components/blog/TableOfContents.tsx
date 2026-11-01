"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/blog/html";
import { cn } from "@/lib/utils";

/** Table of contents with scroll-spy. Links are plain anchors, so it works without JS. */
export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-90px 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="Table of contents">
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-brand-500">On this page</p>
      <ol className="mt-4 space-y-1 border-l border-line">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              className={cn(
                "-ml-px block border-l-2 py-1.5 text-sm leading-snug transition-colors",
                i.level === 3 ? "pl-7" : "pl-4",
                active === i.id ? "border-brand font-medium text-brand" : "border-transparent text-muted hover:text-ink",
              )}
            >
              {i.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
