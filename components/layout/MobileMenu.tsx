"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  servicesMegaMenu,
  industriesNav,
  locationsNav,
  companyNav,
} from "@/data/nav";
import Button from "@/components/ui/Button";

const groups = [
  { label: "Services", type: "mega" as const },
  { label: "Industries", type: "list" as const, links: industriesNav },
  { label: "Locations", type: "list" as const, links: locationsNav },
  { label: "Company", type: "list" as const, links: companyNav },
];

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-white lg:hidden"
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <Link href="/" onClick={onClose} className="font-display text-lg font-bold text-brand">
              The Orbit 7
            </Link>
            <button
              aria-label="Close menu"
              onClick={onClose}
              className="flex size-10 items-center justify-center rounded-full border border-line"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="h-[calc(100%-73px)] overflow-y-auto px-5 py-6">
            <ul className="space-y-1">
              {groups.map((group) => {
                const isOpen = expanded === group.label;
                return (
                  <li key={group.label} className="border-b border-line py-1">
                    <button
                      className="flex w-full items-center justify-between py-3 text-left"
                      aria-expanded={isOpen}
                      onClick={() => setExpanded(isOpen ? null : group.label)}
                    >
                      <span className="font-display text-lg font-semibold text-ink">
                        {group.label}
                      </span>
                      <ChevronDown
                        className={cn(
                          "size-5 text-ink-soft transition-transform",
                          isOpen && "rotate-180"
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          {group.type === "mega" ? (
                            <div className="space-y-5 pb-4">
                              {servicesMegaMenu.map((col) => (
                                <div key={col.heading}>
                                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                                    {col.heading}
                                  </p>
                                  <ul className="mt-2 space-y-2">
                                    {col.links.map((link) => (
                                      <li key={link.href}>
                                        <Link
                                          href={link.href}
                                          onClick={onClose}
                                          className="block py-1 text-sm text-ink-muted hover:text-brand"
                                        >
                                          {link.label}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <ul className="space-y-1 pb-4">
                              {group.links.map((link) => (
                                <li key={link.href}>
                                  <Link
                                    href={link.href}
                                    onClick={onClose}
                                    className="block py-2 text-sm text-ink-muted hover:text-brand"
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-col gap-3">
              <Button href="/contact-us" size="lg" className="justify-center" showIcon={false}>
                Get A Call Now
              </Button>
              <Button
                href="/contact-us"
                variant="secondary"
                size="lg"
                className="justify-center"
                showIcon={false}
              >
                Schedule A Call
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
