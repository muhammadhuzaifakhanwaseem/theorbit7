import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/data/services";
import { serviceHref, getCategory } from "@/data/services";
import { cn } from "@/lib/utils";

export default function ServiceCard({ service, index, className }: { service: Service; index?: number; className?: string }) {
  return (
    <Link
      href={serviceHref(service.slug)}
      data-reveal
      style={index !== undefined ? { ["--d" as string]: (index % 3) * 80 } : undefined}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-6 transition-all duration-500 ease-premium hover:-translate-y-1 hover:border-brand/25 hover:shadow-lift sm:p-7",
        className,
      )}
    >
      <span className="pointer-events-none absolute -right-20 -top-20 size-48 rounded-full bg-mint opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-70" />
      <div className="relative flex items-start justify-between gap-4">
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-soft">{getCategory(service.category).short}</span>
        <span className="flex size-9 items-center justify-center rounded-full border border-line text-brand transition-all duration-500 group-hover:rotate-45 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </span>
      </div>
      <h3 className="relative mt-8 text-xl font-semibold tracking-[-0.02em] sm:text-[1.4rem]">{service.title}</h3>
      <p className="relative mt-3 text-[0.95rem] leading-relaxed text-muted">{service.summary}</p>
    </Link>
  );
}
