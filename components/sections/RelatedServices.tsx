import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";

export default function RelatedServices({ slugs }: { slugs: string[] }) {
  const items = slugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  if (items.length === 0) return null;

  return (
    <section className="border-t border-line py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Related" title="Services often paired together" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-white p-5 transition-colors hover:border-brand"
            >
              <span className="text-sm font-medium text-ink">{s.title}</span>
              <ArrowUpRight className="size-4 shrink-0 text-ink-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
