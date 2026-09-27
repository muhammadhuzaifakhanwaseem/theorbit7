import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline-light";
  size?: "md" | "lg";
  className?: string;
  showIcon?: boolean;
}

export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  showIcon = true,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2";
  const sizes = {
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
  };
  const variants = {
    primary: "bg-brand text-white hover:bg-brand-dark",
    secondary: "bg-white text-ink border border-line hover:border-brand hover:text-brand",
    ghost: "text-ink hover:text-brand",
    "outline-light": "border border-white/30 text-white hover:bg-white/10",
  };

  return (
    <Link href={href} className={cn(base, sizes[size], variants[variant], className)}>
      {children}
      {showIcon && <ArrowUpRight className="size-4" aria-hidden="true" />}
    </Link>
  );
}
