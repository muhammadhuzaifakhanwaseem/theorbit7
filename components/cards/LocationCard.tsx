import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

export default function LocationCard({
  href,
  city,
  region,
  tagline,
}: {
  href: string;
  city: string;
  region: string;
  tagline: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-white p-6 transition-colors hover:border-brand"
    >
      <div className="flex items-start gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand">
          <MapPin className="size-5" aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-ink">{city}</h3>
          <p className="text-sm text-ink-soft">{region}</p>
          <p className="mt-1 text-sm text-ink-muted">{tagline}</p>
        </div>
      </div>
      <ArrowUpRight className="size-5 shrink-0 text-ink-soft transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
    </Link>
  );
}
