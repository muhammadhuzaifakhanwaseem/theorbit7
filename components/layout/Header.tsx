"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Clapperboard, MapPin, Menu, Phone, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import BookCallButton from "@/components/booking/BookCallButton";
import { getCategory, navServicesIn, serviceHref, serviceMenuCategories } from "@/data/services";
import type { CategoryId } from "@/data/services";
import { cities, localServicePages, locationHref, regions } from "@/data/locations";
import { companyNav } from "@/data/nav";
import { site, telHref } from "@/lib/site";
import { cn } from "@/lib/utils";
import { inlineTitle } from "@/lib/text";

type MenuId = "services" | "video" | "locations" | "company";

const menus: { id: MenuId; label: string; href: string }[] = [
  { id: "services", label: "Services", href: "/services" },
  { id: "video", label: "Video Editing", href: "/video-editing" },
  { id: "locations", label: "Locations", href: "/locations" },
  { id: "company", label: "Company", href: "/about-us" },
];

const panelMotion = {
  initial: { opacity: 0, y: 10, scale: 0.985 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 6, scale: 0.99 },
  transition: { duration: 0.26, ease: [0.22, 1, 0.36, 1] as const },
};

function ServicesPanel() {
  const [active, setActive] = useState<CategoryId>(serviceMenuCategories[0].id);
  const cat = getCategory(active);
  const list = navServicesIn(active);
  return (
    <div className="grid grid-cols-[15.5rem_1fr_17rem]">
      <ul className="border-r border-line bg-paper p-3" role="list">
        {serviceMenuCategories.map((c) => (
          <li key={c.id}>
            <Link
              href={`/services#${c.id}`}
              onMouseEnter={() => setActive(c.id)}
              onFocus={() => setActive(c.id)}
              className={cn(
                "flex items-center justify-between rounded-xl px-4 py-3 text-[0.92rem] font-medium transition-colors",
                active === c.id ? "bg-white text-brand shadow-soft ring-1 ring-line" : "text-ink-2 hover:text-brand",
              )}
            >
              {c.name}
              <ArrowUpRight className={cn("size-3.5 transition-opacity", active === c.id ? "opacity-100" : "opacity-0")} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }} transition={{ duration: 0.2 }}>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-brand-500">{cat.name}</p>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">{cat.description}</p>
            <ul className="mt-5 grid grid-cols-2 gap-1">
              {list.map((s) => (
                <li key={s.slug}>
                  <Link href={serviceHref(s.slug)} className="group/m -mx-1 block rounded-xl px-3 py-2.5 transition-colors hover:bg-mint-50">
                    <span className="flex items-center gap-1.5 text-[0.92rem] font-medium text-ink group-hover/m:text-brand">
                      {s.title}
                      <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover/m:opacity-100" aria-hidden="true" />
                    </span>
                    <span className="mt-0.5 line-clamp-1 block text-xs text-muted">{s.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={`/services#${cat.id}`} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline">
              All {inlineTitle(cat.name)} services <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
      <BookingCard />
    </div>
  );
}

function BookingCard({ title = "Not sure where to start?", text = "Book a free consultation and we'll recommend the right mix of services." }: { title?: string; text?: string }) {
  return (
    <div className="relative overflow-hidden bg-brand p-6 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full border border-white/10" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-6 -top-6 size-36 rounded-full border border-white/10" />
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-mint">{title}</p>
      <p className="mt-4 font-display text-lg leading-snug font-semibold">{text}</p>
      <BookCallButton variant="light" size="sm" className="mt-5">
        Book a free call
      </BookCallButton>
      <ul className="mt-5 space-y-1.5 text-sm">
        {site.phones.map((p) => (
          <li key={p}>
            <a href={telHref(p)} className="inline-flex items-center gap-2 text-white/80 hover:text-white">
              <Phone className="size-3.5 text-mint" aria-hidden="true" /> {p}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function VideoPanel() {
  const list = navServicesIn("video");
  return (
    <div className="grid grid-cols-[1fr_17rem]">
      <div className="p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-brand-500">Video Editing</p>
            <p className="mt-2 max-w-md text-sm text-muted">{getCategory("video").description}</p>
          </div>
          <Link href="/video-editing" className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-brand hover:underline">
            Video editing overview <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
        <ul className="mt-5 grid grid-cols-3 gap-1">
          {list.map((s) => (
            <li key={s.slug}>
              <Link href={serviceHref(s.slug)} className="group/m flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[0.9rem] font-medium text-ink-2 transition-colors hover:bg-mint-50 hover:text-brand">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-mint-100 text-brand transition-colors group-hover/m:bg-brand group-hover/m:text-white">
                  <Clapperboard className="size-3.5" aria-hidden="true" />
                </span>
                {s.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative overflow-hidden bg-ink p-6 text-white">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 flex h-4 gap-1.5 bg-black/40 px-2 py-1">
          {Array.from({ length: 14 }, (_, i) => (
            <span key={i} className="h-2 w-3 rounded-sm bg-white/20" />
          ))}
        </div>
        <p className="mt-4 flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-mint">
          <span className="size-1.5 rounded-full bg-[#e5533d]" style={{ animation: "blink 1.2s steps(1) infinite" }} /> Free sample
        </p>
        <p className="mt-4 font-display text-lg leading-snug font-semibold">Get a free 30-second sample edit of your footage.</p>
        <Link href="/services/podcast-video-editing#free-sample" className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-mint-50">
          Claim my sample <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

function LocationsPanel() {
  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_17rem]">
      {regions.map((r) => (
        <div key={r.id} className="border-r border-line p-6">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-brand-500">{r.name}</p>
          <ul className="mt-4 space-y-1">
            {cities
              .filter((c) => c.region === r.id)
              .map((c) => (
                <li key={c.slug}>
                  <Link href={locationHref(c.slug)} className="group/m flex items-center gap-2 rounded-lg px-2 py-1.5 text-[0.92rem] text-ink-2 hover:bg-mint-50 hover:text-brand">
                    <MapPin className="size-3.5 text-brand-400" aria-hidden="true" /> {c.name}
                  </Link>
                  {localServicePages.some((p) => p.city === c.slug) && (
                    <ul className="mb-1 ml-7 space-y-0.5">
                      {localServicePages
                        .filter((p) => p.city === c.slug)
                        .map((p) => (
                          <li key={p.slug}>
                            <Link href={locationHref(c.slug, p.slug)} className="block py-0.5 text-xs text-muted hover:text-brand">
                              {p.title.replace(` in ${c.name}`, "").replace(" Company", "")}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  )}
                </li>
              ))}
          </ul>
        </div>
      ))}
      <BookingCard title="Working worldwide" text="We collaborate remotely with businesses across the UAE, North America, the UK and Asia." />
    </div>
  );
}

function CompanyPanel() {
  return (
    <div className="grid grid-cols-[1fr_17rem]">
      <ul className="grid grid-cols-3 gap-1 p-5">
        {companyNav.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="group/m block rounded-xl px-3 py-2.5 transition-colors hover:bg-mint-50">
              <span className="text-[0.92rem] font-medium text-ink group-hover/m:text-brand">{l.label}</span>
              <span className="mt-0.5 block text-xs text-muted">{l.text}</span>
            </Link>
          </li>
        ))}
      </ul>
      <BookingCard title="Let's talk" text="Questions about working with us? Book a call or ring us directly." />
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState<MenuId | null>(null);
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
    setMenu(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const openMenu = (id: MenuId) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenu(id);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenu(null), 160);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const menuActive = (id: MenuId) =>
    id === "services"
      ? pathname.startsWith("/services") && !navServicesIn("video").some((s) => pathname === serviceHref(s.slug))
      : id === "video"
        ? pathname === "/video-editing" || navServicesIn("video").some((s) => pathname === serviceHref(s.slug))
        : id === "locations"
          ? pathname.startsWith("/locations")
          : companyNav.some((l) => l.href !== "/blogs" && isActive(l.href));

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={cn(
          "relative mx-auto flex h-16 max-w-site items-center justify-between rounded-full pl-5 pr-2.5 transition-all duration-500 ease-premium sm:pl-6",
          scrolled || menu ? "glass !bg-white/85" : "border border-transparent bg-transparent",
        )}
        onMouseLeave={scheduleClose}
      >
        <Link href="/" aria-label="The Orbit 7 — home" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {menus.map((m) => (
              <li key={m.id} onMouseEnter={() => openMenu(m.id)}>
                <div className="flex items-center">
                  <Link
                    href={m.href}
                    className={cn(
                      "rounded-full py-2 pl-3.5 pr-0.5 text-[0.9rem] font-medium transition-colors",
                      menuActive(m.id) || menu === m.id ? "text-brand" : "text-ink-2 hover:text-brand",
                    )}
                  >
                    {m.label}
                  </Link>
                  <button
                    type="button"
                    aria-expanded={menu === m.id}
                    aria-controls={`menu-${m.id}`}
                    aria-label={`Show ${m.label} menu`}
                    onClick={() => setMenu((v) => (v === m.id ? null : m.id))}
                    className="flex size-7 cursor-pointer items-center justify-center rounded-full text-ink-2 hover:text-brand"
                  >
                    <ChevronDown className={cn("size-3.5 transition-transform duration-300", menu === m.id && "rotate-180")} aria-hidden="true" />
                  </button>
                </div>
              </li>
            ))}
            <li onMouseEnter={scheduleClose}>
              <Link
                href="/blogs"
                className={cn("rounded-full px-3.5 py-2 text-[0.9rem] font-medium transition-colors", isActive("/blogs") ? "text-brand" : "text-ink-2 hover:text-brand")}
              >
                Blog
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telHref(site.phones[0])}
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-ink-2 transition-colors hover:text-brand 2xl:flex"
            aria-label={`Call us on ${site.phones[0]}`}
          >
            <Phone className="size-4 text-brand" aria-hidden="true" />
            {site.phones[0]}
          </a>
          <a
            href={telHref(site.phones[0])}
            className="hidden size-11 items-center justify-center rounded-full border border-line-strong bg-white/70 text-brand transition-colors hover:border-brand sm:flex 2xl:hidden"
            aria-label={`Call us on ${site.phones[0]}`}
          >
            <Phone className="size-4" aria-hidden="true" />
          </a>
          <BookCallButton className="hidden sm:inline-flex">Book a free consultation</BookCallButton>
          <button
            type="button"
            className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-brand text-white xl:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        <AnimatePresence>
          {menu && (
            <motion.div
              key={menu}
              id={`menu-${menu}`}
              {...panelMotion}
              onMouseEnter={() => openMenu(menu)}
              className="absolute inset-x-0 top-[calc(100%+10px)] hidden overflow-hidden rounded-[28px] border border-line bg-white/95 shadow-lift backdrop-blur-xl xl:block"
            >
              {menu === "services" && <ServicesPanel />}
              {menu === "video" && <VideoPanel />}
              {menu === "locations" && <LocationsPanel />}
              {menu === "company" && <CompanyPanel />}
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
            className="fixed inset-x-3 top-[5.25rem] bottom-3 overflow-y-auto overscroll-contain rounded-[28px] border border-line bg-white p-5 shadow-lift xl:hidden"
          >
            <nav aria-label="Mobile" className="space-y-2">
              <MobileGroup title="Services">
                {serviceMenuCategories.map((c) => (
                  <details key={c.id} className="group/c border-b border-line last:border-0">
                    <summary className="flex items-center justify-between py-3 text-[0.95rem] font-medium">
                      {c.name}
                      <ChevronDown className="size-4 transition-transform group-open/c:rotate-180" aria-hidden="true" />
                    </summary>
                    <ul className="pb-3 pl-3">
                      {navServicesIn(c.id).map((s) => (
                        <li key={s.slug}>
                          <Link href={serviceHref(s.slug)} className="block py-1.5 text-[0.92rem] text-ink-2">
                            {s.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
                <Link href="/services" className="block py-3 text-sm font-medium text-brand">
                  All services →
                </Link>
              </MobileGroup>
              <MobileGroup title="Video Editing">
                <Link href="/video-editing" className="block py-2 text-[0.95rem] font-medium text-brand">
                  Video editing overview →
                </Link>
                {navServicesIn("video").map((s) => (
                  <Link key={s.slug} href={serviceHref(s.slug)} className="block py-1.5 text-[0.92rem] text-ink-2">
                    {s.title}
                  </Link>
                ))}
              </MobileGroup>
              <MobileGroup title="Locations">
                {regions.map((r) => (
                  <div key={r.id} className="py-2">
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-brand-500">{r.name}</p>
                    <div className="mt-1 flex flex-wrap gap-x-4">
                      {cities
                        .filter((c) => c.region === r.id)
                        .map((c) => (
                          <Link key={c.slug} href={locationHref(c.slug)} className="py-1.5 text-[0.92rem] text-ink-2">
                            {c.name}
                          </Link>
                        ))}
                    </div>
                  </div>
                ))}
                <Link href="/locations" className="block py-2 text-sm font-medium text-brand">
                  All locations →
                </Link>
              </MobileGroup>
              <MobileGroup title="Company">
                {companyNav.map((l) => (
                  <Link key={l.href} href={l.href} className="block py-1.5 text-[0.92rem] text-ink-2">
                    {l.label}
                  </Link>
                ))}
              </MobileGroup>
              <Link href="/blogs" className="flex items-center justify-between rounded-2xl bg-mint-50 px-4 py-3.5 font-display text-lg font-semibold">
                Blog <ArrowUpRight className="size-5 text-brand" aria-hidden="true" />
              </Link>
              <div className="space-y-2 pt-3">
                <BookCallButton size="lg" className="w-full justify-between">
                  Book a free consultation
                </BookCallButton>
                <div className="grid grid-cols-2 gap-2">
                  {site.phones.map((p) => (
                    <a key={p} href={telHref(p)} className="flex items-center justify-center gap-2 rounded-full border border-line-strong py-3 text-sm font-medium text-ink-2">
                      <Phone className="size-4 text-brand" aria-hidden="true" /> {p}
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group rounded-2xl bg-mint-50 px-4">
      <summary className="flex items-center justify-between py-3.5 font-display text-lg font-semibold">
        {title}
        <ChevronDown className="size-5 text-brand transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div className="pb-3">{children}</div>
    </details>
  );
}
