import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

export default function ServiceCard({
  href,
  title,
  description,
  Icon,
}: {
  href: string;
  title: string;
  description: string;
  Icon: LucideIcon;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-[0_20px_45px_-25px_rgba(22,62,51,0.35)]"
    >
      <div>
        <div className="flex size-12 items-center justify-center rounded-xl bg-brand-tint text-brand transition-colors group-hover:bg-brand group-hover:text-white">
          <Icon className="size-6" aria-hidden="true" />
        </div>
        <h3 className="mt-6 font-display text-xl font-semibold text-ink">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{description}</p>
      </div>
      <div className="mt-8 flex items-center gap-1.5 text-sm font-medium text-brand">
        Explore service
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </div>
    </Link>
  );
}
