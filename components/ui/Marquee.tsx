import { cn } from "@/lib/utils";

export default function Marquee({
  items,
  className,
  itemClassName,
  separator = "✦",
}: {
  items: string[];
  className?: string;
  itemClassName?: string;
  separator?: string;
}) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className={cn("flex items-center gap-8 pr-8 whitespace-nowrap", itemClassName)}>
          <span>{item}</span>
          <span className="text-brand-400/60" aria-hidden="true">
            {separator}
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={cn("mask-fade-x flex overflow-hidden", className)}>
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
