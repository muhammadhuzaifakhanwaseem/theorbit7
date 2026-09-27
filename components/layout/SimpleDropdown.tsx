"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { NavLink } from "@/data/nav";

export default function SimpleDropdown({
  open,
  links,
}: {
  open: boolean;
  links: NavLink[];
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.16, ease: "easeOut" }}
          className="absolute left-1/2 top-full z-40 w-64 -translate-x-1/2 rounded-2xl border border-line bg-white p-3 shadow-[0_25px_50px_-25px_rgba(16,22,20,0.3)]"
        >
          <ul className="space-y-0.5">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-lg px-3 py-2 text-sm text-ink transition-colors hover:bg-surface hover:text-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
