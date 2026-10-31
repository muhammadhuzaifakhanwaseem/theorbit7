import { cn } from "@/lib/utils";

export default function Eyebrow({
  children,
  className,
  light = false,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[0.72rem] font-medium uppercase tracking-[0.16em]",
        light ? "text-mint" : "text-brand-500",
        className,
      )}
    >
      <span className={cn("relative flex size-1.5 rounded-full", light ? "bg-mint" : "bg-brand-500")}>
        <span className="absolute inset-0 animate-pulse-soft rounded-full bg-current opacity-60 blur-[3px]" />
      </span>
      {children}
    </p>
  );
}
