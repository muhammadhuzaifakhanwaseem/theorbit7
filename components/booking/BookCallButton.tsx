"use client";

import Link from "next/link";
import { ArrowUpRight, CalendarCheck } from "lucide-react";
import { useBooking } from "./BookingProvider";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "light" | "ghost-light";

const styles: Record<Variant, string> = {
  primary: "bg-brand text-white shadow-brand hover:bg-brand-800 [&_.bk-icon]:bg-white/15",
  secondary: "bg-white text-ink ring-1 ring-line-strong hover:ring-brand/40 hover:bg-mint-50 [&_.bk-icon]:bg-brand [&_.bk-icon]:text-white",
  light: "bg-white text-brand hover:bg-mint-50 [&_.bk-icon]:bg-brand [&_.bk-icon]:text-white",
  "ghost-light": "bg-white/5 text-white ring-1 ring-white/20 hover:bg-white/10 [&_.bk-icon]:bg-white/15",
};

/**
 * "Book a free consultation" — opens the Cal.com modal when a booking URL is configured,
 * otherwise links to the contact page so the CTA always works.
 */
export default function BookCallButton({
  children = "Book a free consultation",
  variant = "primary",
  size = "md",
  className,
}: {
  children?: React.ReactNode;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const { open, enabled } = useBooking();
  const cls = cn(
    "group/bk inline-flex min-h-11 cursor-pointer items-center justify-center gap-3 rounded-full font-medium transition-all duration-300 ease-premium",
    size === "lg" ? "py-3 pl-6 pr-3 text-[0.97rem]" : size === "sm" ? "py-2 pl-4 pr-2 text-sm" : "py-2.5 pl-5 pr-2.5 text-sm",
    styles[variant],
    className,
  );
  const inner = (
    <>
      <span>{children}</span>
      <span className="bk-icon inline-flex size-7 items-center justify-center rounded-full transition-transform duration-300 group-hover/bk:scale-105">
        {enabled ? <CalendarCheck className="size-4" aria-hidden="true" /> : <ArrowUpRight className="size-4" aria-hidden="true" />}
      </span>
    </>
  );
  return enabled ? (
    <button type="button" onClick={open} className={cls} aria-haspopup="dialog">
      {inner}
    </button>
  ) : (
    <Link href="/contact-us#book" className={cls}>
      {inner}
    </Link>
  );
}
