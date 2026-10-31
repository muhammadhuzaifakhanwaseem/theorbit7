import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "light" | "ghost-light" | "link";

const styles: Record<Variant, string> = {
  primary:
    "bg-brand text-white shadow-brand hover:bg-brand-800 [&_.btn-icon]:bg-white/15 [&_.btn-icon]:text-white",
  secondary:
    "bg-white text-ink ring-1 ring-line-strong hover:ring-brand/40 hover:bg-mint-50 [&_.btn-icon]:bg-brand [&_.btn-icon]:text-white",
  light: "bg-white text-brand hover:bg-mint-50 [&_.btn-icon]:bg-brand [&_.btn-icon]:text-white",
  "ghost-light":
    "bg-white/5 text-white ring-1 ring-white/20 hover:bg-white/10 [&_.btn-icon]:bg-white/15 [&_.btn-icon]:text-white",
  link: "px-0! py-0! text-brand hover:text-brand-600 [&_.btn-icon]:bg-mint-100 [&_.btn-icon]:text-brand",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className,
  icon = true,
  size = "md",
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  icon?: boolean;
  size?: "md" | "lg";
} & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">) {
  return (
    <Link
      href={href}
      className={cn(
        "group/btn inline-flex min-h-11 cursor-pointer items-center justify-center gap-3 rounded-full font-medium transition-all duration-300 ease-premium",
        size === "lg" ? "py-3 pl-6 pr-3 text-[0.97rem]" : "py-2.5 pl-5 pr-2.5 text-sm",
        !icon && "px-6",
        styles[variant],
        className,
      )}
      {...rest}
    >
      <span>{children}</span>
      {icon && (
        <span className="btn-icon relative inline-flex size-7 items-center justify-center overflow-hidden rounded-full transition-transform duration-300 group-hover/btn:scale-105">
          <ArrowUpRight
            className="size-4 transition-transform duration-300 ease-premium group-hover/btn:-translate-y-5 group-hover/btn:translate-x-5"
            aria-hidden="true"
          />
          <ArrowUpRight
            className="absolute size-4 -translate-x-5 translate-y-5 transition-transform duration-300 ease-premium group-hover/btn:translate-x-0 group-hover/btn:translate-y-0"
            aria-hidden="true"
          />
        </span>
      )}
    </Link>
  );
}
