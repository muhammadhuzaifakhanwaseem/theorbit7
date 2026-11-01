"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/admin/blog", label: "Posts" },
  { href: "/admin/blog/categories", label: "Categories" },
  { href: "/admin/blog/authors", label: "Authors" },
];

export default function BlogTabs() {
  const path = usePathname();
  return (
    <nav aria-label="Blog sections" className="mt-6 flex gap-1 border-b border-line">
      {tabs.map((t) => {
        const active = t.href === "/admin/blog" ? path === t.href : path.startsWith(t.href);
        return (
          <Link
            key={t.href}
            href={t.href}
            aria-current={active ? "page" : undefined}
            className={cn("-mb-px border-b-2 px-4 py-2.5 text-sm font-medium transition-colors", active ? "border-brand text-brand" : "border-transparent text-muted hover:text-ink")}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
