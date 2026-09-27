import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function IndustryCard({
  href,
  name,
  tagline,
}: {
  href: string;
  name: string;
  tagline: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex h-56 flex-col justify-end overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-surface to-white p-6 transition-colors hover:border-brand"
    >
      <ArrowUpRight className="absolute right-6 top-6 size-5 text-ink-soft transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
      <h3 className="font-display text-xl font-semibold text-ink">{name}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{tagline}</p>
    </Link>
  );
}
