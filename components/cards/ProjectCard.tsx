import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ServiceVisual from "@/components/visuals/ServiceVisual";
import type { Project } from "@/data/projects";
import { getService, serviceHref } from "@/data/services";
import { cn } from "@/lib/utils";

const toneBg: Record<Project["tone"], string> = {
  forest: "bg-[radial-gradient(circle_at_30%_20%,#2b6b58,#163e33_55%,#0c261f)]",
  mint: "bg-[radial-gradient(circle_at_30%_20%,#ffffff,#e3f0e9_55%,#cfe7da)]",
  sand: "bg-[radial-gradient(circle_at_30%_20%,#ffffff,#f5f1ea_55%,#ebe2d3)]",
  ink: "bg-[radial-gradient(circle_at_30%_20%,#23332e,#0d1a16_60%)]",
};

export default function ProjectCard({ project, priority = false, className }: { project: Project; priority?: boolean; className?: string }) {
  const primary = getService(project.services[0]);
  return (
    <article
      data-reveal
      className={cn("group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white transition-shadow duration-500 hover:shadow-lift", className)}
      aria-labelledby={`p-${project.slug}`}
    >
      <div className={cn("relative aspect-[16/11] overflow-hidden", toneBg[project.tone])}>
        <div className="absolute inset-0 flex items-center justify-center p-8 transition-transform duration-700 ease-premium group-hover:scale-[1.04] sm:p-12">
          <ServiceVisual kind={project.visual} className="w-full max-w-md" />
        </div>
        <span className="glass absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-medium text-ink-2">{project.type}</span>
        {priority && <span className="sr-only">Featured</span>}
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-brand-500">{project.sector}</p>
        <h3 id={`p-${project.slug}`} className="mt-2 text-xl font-semibold sm:text-2xl">
          {project.title}
        </h3>
        <p className="mt-3 leading-relaxed text-muted">{project.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Scope">
          {project.scope.slice(0, 4).map((s) => (
            <li key={s} className="rounded-full bg-mint-50 px-2.5 py-1 text-xs text-ink-2 ring-1 ring-brand/10">
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <p className="font-mono text-xs text-soft">{project.stack.join(" · ")}</p>
          {primary && (
            <Link
              href={serviceHref(primary.slug)}
              className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-brand after:absolute after:inset-0"
              aria-label={`${primary.title} — related service for ${project.title}`}
            >
              {primary.title}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
