import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/data/case-studies";

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/portfolio/${study.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-colors hover:border-brand"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={study.thumbImage}
          alt={`${study.client} — ${study.title}`}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-brand">
          {study.category}
        </p>
        <h3 className="mt-2 font-display text-lg font-semibold text-ink">{study.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{study.summary}</p>
        <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-ink">
          View case study
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </div>
    </Link>
  );
}
