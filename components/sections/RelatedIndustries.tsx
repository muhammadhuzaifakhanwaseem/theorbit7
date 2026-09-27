import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { industries } from "@/data/industries";

export default function RelatedIndustries({ slugs }: { slugs: string[] }) {
  const items = slugs
    .map((slug) => industries.find((i) => i.slug === slug))
    .filter((i): i is NonNullable<typeof i> => Boolean(i));

  if (items.length === 0) return null;

  return (
    <section className="border-t border-line py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Related" title="Related industries" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => (
            <Link
              key={i.slug}
              href={`/industries/${i.slug}`}
              className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-white p-5 transition-colors hover:border-brand"
            >
              <span className="text-sm font-medium text-ink">{i.name}</span>
              <ArrowUpRight className="size-4 shrink-0 text-ink-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
