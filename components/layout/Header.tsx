"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { categories, servicesIn, serviceHref } from "@/data/services";
import { primaryNav } from "@/data/nav";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation (state adjustment during render, per React docs)
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMegaOpen(false);
    setMobileOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={cn(
          "relative mx-auto flex h-16 max-w-site items-center justify-between rounded-full pl-5 pr-2.5 transition-all duration-500 ease-premium sm:pl-6",
          scrolled || megaOpen ? "glass !bg-white/85" : "border border-transparent bg-transparent",
        )}
        onMouseLeave={scheduleClose}
      >
        <Link href="/" aria-label="The Orbit 7 — home" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) =>
              "mega" in item ? (
                <li key={item.href} onMouseEnter={openMega}>
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      className={cn(
                        "rounded-full py-2 pl-4 pr-1 text-[0.92rem] font-medium transition-colors",
                        isActive(item.href) ? "text-brand" : "text-ink-2 hover:text-brand",
                      )}
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      aria-expanded={megaOpen}
                      aria-controls="mega-menu"
                      aria-label="Show all services"
                      onClick={() => setMegaOpen((v) => !v)}
                      className="flex size-8 cursor-pointer items-center justify-center rounded-full text-ink-2 hover:text-brand"
                    >
                      <ChevronDown
                        className={cn("size-4 transition-transform duration-300", megaOpen && "rotate-180")}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </li>
              ) : (
                <li key={item.href} onMouseEnter={scheduleClose}>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-[0.92rem] font-medium transition-colors",
                      isActive(item.href) ? "text-brand" : "text-ink-2 hover:text-brand",
                    )}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-brand"
                      />
                    )}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button href="/contact-us" className="hidden sm:inline-flex">
            Start a project
          </Button>
          <button
            type="button"
            className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-brand text-white lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        <AnimatePresence>
          {megaOpen && (
            <motion.div
              id="mega-menu"
              initial={{ opacity: 0, y: 10, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.99 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={openMega}
              className="absolute inset-x-0 top-[calc(100%+10px)] hidden overflow-hidden rounded-[28px] border border-line bg-white/95 shadow-lift backdrop-blur-xl lg:block"
            >
              <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_17rem]">
                {categories.map((cat, ci) => (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * ci + 0.05, duration: 0.35 }}
                    className="border-r border-line p-6"
                  >
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-brand-500">
                      {cat.name}
                    </p>
                    <ul className="mt-4 space-y-1">
                      {servicesIn(cat.id).map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={serviceHref(s.slug)}
                            className="group/m -mx-2 flex items-center justify-between rounded-lg px-2 py-1.5 text-[0.9rem] text-ink-2 transition-colors hover:bg-mint-50 hover:text-brand"
                          >
                            <span>{s.title}</span>
                            <ArrowUpRight
                              className="size-3.5 opacity-0 transition-all duration-300 group-hover/m:opacity-100"
                              aria-hidden="true"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
                <div className="relative overflow-hidden bg-brand p-6 text-white">
                  <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full border border-white/10" />
                  <div className="pointer-events-none absolute -right-6 -top-6 size-36 rounded-full border border-white/10" />
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-mint">Not sure where to start?</p>
                  <p className="mt-4 font-display text-xl leading-snug font-semibold">
                    Tell us your goal and we&apos;ll recommend the right mix of services.
                  </p>
                  <Button href="/contact-us" variant="light" className="mt-6">
                    Free consultation
                  </Button>
                  <Link href="/services" className="mt-4 block text-sm text-white/70 hover:text-white">
                    Browse all services →
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 top-[5.25rem] bottom-3 overflow-y-auto rounded-[28px] border border-line bg-white p-5 shadow-lift lg:hidden"
          >
            <nav aria-label="Mobile">
              <ul className="divide-y divide-line">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="flex items-center justify-between py-4 font-display text-2xl font-semibold">
                      {item.label}
                      <ArrowUpRight className="size-5 text-brand" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4 space-y-2">
                {categories.map((cat) => (
                  <details key={cat.id} className="group rounded-2xl bg-mint-50 px-4">
                    <summary className="flex items-center justify-between py-3.5 font-medium">
                      {cat.name}
                      <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <ul className="pb-3">
                      {servicesIn(cat.id).map((s) => (
                        <li key={s.slug}>
                          <Link href={serviceHref(s.slug)} className="block py-2 text-[0.95rem] text-ink-2">
                            {s.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
              <Button href="/contact-us" size="lg" className="mt-6 w-full">
                Start a project
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
