"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { servicesMegaMenu } from "@/data/nav";
import Button from "@/components/ui/Button";

export default function MegaMenu({ open }: { open: boolean }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="absolute inset-x-0 top-full z-40 border-t border-line bg-white shadow-[0_30px_60px_-30px_rgba(16,22,20,0.25)]"
        >
          <div className="mx-auto grid max-w-8xl grid-cols-4 gap-8 px-12 py-10 xl:grid-cols-8">
            {servicesMegaMenu.map((col) => (
              <div key={col.heading}>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  {col.heading}
                </p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-ink transition-colors hover:text-brand"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-line bg-surface px-12 py-5">
            <div className="mx-auto flex max-w-8xl flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-ink-muted">
                Not sure which service fits? Start with a free discovery call.
              </p>
              <Button href="/contact-us" size="md">
                Get A Call Now
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
