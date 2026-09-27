import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SITE_URL } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items, dark = false }: { items: Crumb[]; dark?: boolean }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: item.href ? `${SITE_URL}${item.href}` : undefined,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ol className={`flex flex-wrap items-center gap-1.5 text-sm ${dark ? "text-white/50" : "text-ink-soft"}`}>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="size-3.5" aria-hidden="true" />}
            {item.href && i !== items.length - 1 ? (
              <Link href={item.href} className={dark ? "hover:text-white" : "hover:text-brand"}>
                {item.label}
              </Link>
            ) : (
              <span aria-current={i === items.length - 1 ? "page" : undefined} className={dark ? "text-white" : "text-ink"}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
