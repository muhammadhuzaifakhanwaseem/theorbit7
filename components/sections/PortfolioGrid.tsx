"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Filter bar for the portfolio. Cards are server-rendered children; filtering only
 * toggles visibility, so every project remains in the initial HTML.
 */
export default function PortfolioGrid({
  filters,
  items,
}: {
  filters: string[];
  items: { key: string; group: string; node: React.ReactNode }[];
}) {
  const [active, setActive] = useState("All");
  return (
    <>
      <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
        {["All", ...filters].map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={active === f}
            onClick={() => setActive(f)}
            className={cn(
              "min-h-11 cursor-pointer rounded-full px-5 text-sm font-medium transition-all duration-300",
              active === f ? "bg-brand text-white shadow-brand" : "bg-white text-ink-2 ring-1 ring-line-strong hover:ring-brand/40",
            )}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {items.map((it) => (
          <div key={it.key} className={cn(active !== "All" && it.group !== active && "hidden")}>
            {it.node}
          </div>
        ))}
      </div>
    </>
  );
}
