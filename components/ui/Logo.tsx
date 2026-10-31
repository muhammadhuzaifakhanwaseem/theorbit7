import { cn } from "@/lib/utils";

/** The Orbit 7 mark: a planet with a tilted orbit and a satellite. */
export function LogoMark({ className, light = false }: { className?: string; light?: boolean }) {
  const fg = light ? "#ffffff" : "var(--brand)";
  return (
    <svg viewBox="0 0 40 40" className={cn("size-9", className)} aria-hidden="true">
      <circle cx="20" cy="20" r="11" fill={fg} />
      <text
        x="20"
        y="24.6"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fontFamily="var(--font-display)"
        fill={light ? "var(--brand)" : "#ffffff"}
      >
        7
      </text>
      <ellipse
        cx="20"
        cy="20"
        rx="18.5"
        ry="7.2"
        transform="rotate(-24 20 20)"
        fill="none"
        stroke={fg}
        strokeWidth="1.6"
        strokeDasharray="34 6 70 0"
      />
      <circle cx="35.6" cy="12.6" r="2.4" fill={light ? "var(--mint)" : "var(--brand-500)"} />
    </svg>
  );
}

export default function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark light={light} />
      <span
        className={cn(
          "font-display text-[1.15rem] font-semibold tracking-[-0.03em]",
          light ? "text-white" : "text-ink",
        )}
      >
        The Orbit <span className={light ? "text-mint" : "text-brand"}>7</span>
      </span>
    </span>
  );
}
