import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Breadcrumbs({
  items,
  className,
}: {
  items: { name: string; path: string }[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-muted">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path} className="inline-flex min-w-0 items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="block max-w-[15rem] truncate font-medium text-ink sm:max-w-md">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.path} className="transition-colors hover:text-brand">
                    {item.name}
                  </Link>
                  <ChevronRight className="size-3.5 text-soft" aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
