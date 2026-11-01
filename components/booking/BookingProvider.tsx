"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, Loader2, Phone, X } from "lucide-react";
import { site, telHref } from "@/lib/site";

type Ctx = { open: () => void; enabled: boolean };
const BookingContext = createContext<Ctx>({ open: () => {}, enabled: false });

export const useBooking = () => useContext(BookingContext);

/**
 * Site-wide Calendly booking modal. The Calendly iframe is only created when a
 * visitor opens the modal, so it never affects page load performance.
 */
export default function BookingProvider({ embedUrl, children }: { embedUrl: string | null; children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const open = useCallback(() => {
    setLoaded(false);
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  return (
    <BookingContext.Provider value={{ open, enabled: !!embedUrl }}>
      {children}
      <AnimatePresence>
        {isOpen && embedUrl && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-end justify-center bg-ink/40 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="booking-title"
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex h-[92dvh] w-full max-w-4xl flex-col overflow-hidden rounded-t-[2rem] bg-white shadow-lift sm:h-[min(52rem,90dvh)] sm:rounded-[2rem]"
            >
              <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 sm:px-7">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-brand text-white">
                    <CalendarCheck className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p id="booking-title" className="font-display text-lg font-semibold">Book a free consultation</p>
                    <p className="text-xs text-muted">Pick a time that suits you — we&apos;ll send a calendar invite.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-line text-ink-2 hover:border-brand hover:text-brand"
                  aria-label="Close booking"
                  autoFocus
                >
                  <X className="size-5" />
                </button>
              </div>
              <div className="relative flex-1 bg-white">
                {!loaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-sm text-muted">
                    <Loader2 className="size-6 animate-spin text-brand" aria-hidden="true" />
                    Loading available times…
                  </div>
                )}
                <iframe
                  src={embedUrl}
                  title="Schedule a call with The Orbit 7"
                  className="absolute inset-0 size-full"
                  onLoad={() => setLoaded(true)}
                />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 border-t border-line px-5 py-3 text-xs text-muted">
                <span>Prefer to talk now?</span>
                {site.phones.map((p) => (
                  <a key={p} href={telHref(p)} className="inline-flex items-center gap-1.5 font-medium text-brand hover:underline">
                    <Phone className="size-3.5" aria-hidden="true" /> {p}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </BookingContext.Provider>
  );
}
