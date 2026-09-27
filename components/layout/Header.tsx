"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import MegaMenu from "@/components/layout/MegaMenu";
import SimpleDropdown from "@/components/layout/SimpleDropdown";
import MobileMenu from "@/components/layout/MobileMenu";
import Button from "@/components/ui/Button";
import { industriesNav, locationsNav, companyNav } from "@/data/nav";

const NAV_ITEMS = [
  { label: "Services", key: "services" as const },
  { label: "Industries", key: "industries" as const },
  { label: "Locations", key: "locations" as const },
  { label: "Company", key: "company" as const },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "border-b border-line bg-white/90 backdrop-blur-md" : "bg-white"
      )}
      // Moved onMouseLeave here so it covers the header AND the dropdowns below it
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="relative mx-auto flex h-20 max-w-8xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-lg bg-brand font-display text-base font-bold text-white">
            O7
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-ink">
            The Orbit 7
          </span>
        </Link>

        {/* Removed onMouseLeave from nav since header handles it now */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.key}
              onMouseEnter={() => setActiveMenu(item.key)}
            >
              <button
                className={cn(
                  "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-surface",
                  activeMenu === item.key && "bg-surface text-brand"
                )}
                aria-expanded={activeMenu === item.key}
              >
                {item.label}
                <ChevronDown className="size-3.5" aria-hidden="true" />
              </button>
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="/contact-us" showIcon={false}>
            Get In Touch
          </Button>
        </div>

        <button
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
          className="flex size-10 items-center justify-center rounded-full border border-line lg:hidden"
        >
          <Menu className="size-5" />
        </button>
      </div>

      {/* Render dropdowns inside the header so they are part of the hover zone */}
      <div className="relative w-full">
        <MegaMenu open={activeMenu === "services"} />
        <SimpleDropdown open={activeMenu === "industries"} links={industriesNav} />
        <SimpleDropdown open={activeMenu === "locations"} links={locationsNav} />
        <SimpleDropdown open={activeMenu === "company"} links={companyNav} />
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}