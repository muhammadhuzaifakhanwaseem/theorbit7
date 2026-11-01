import { CalendarCheck, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import BookCallButton from "@/components/booking/BookCallButton";
import { site, telHref } from "@/lib/site";

/** Homepage consultation band — Calendly CTA plus direct phone numbers. */
export default function BookingBand() {
  return (
    <section className="py-16 sm:py-20" aria-labelledby="book-heading">
      <Container>
        <div data-reveal className="sheen relative overflow-hidden rounded-[2rem] bg-white p-8 sm:p-12">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-80 animate-spin-slower rounded-full border border-dashed border-brand/15" />
          <div aria-hidden="true" className="pointer-events-none absolute right-10 top-10 hidden size-28 rounded-3xl bg-mint-50 lg:block">
            <div className="flex h-7 items-center gap-1 rounded-t-3xl bg-brand px-3">
              <span className="size-1.5 rounded-full bg-white/60" />
              <span className="size-1.5 rounded-full bg-white/60" />
            </div>
            <div className="grid grid-cols-4 gap-1.5 p-3">
              {Array.from({ length: 12 }, (_, i) => (
                <span key={i} className={i === 6 ? "size-3.5 rounded bg-brand" : "size-3.5 rounded bg-brand/15"} />
              ))}
            </div>
          </div>
          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <Eyebrow>Free consultation</Eyebrow>
              <h2 id="book-heading" className="mt-4 max-w-2xl text-3xl leading-tight font-semibold sm:text-4xl">
                Talk to a specialist — <em>no obligation,</em> no sales pressure.
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
                Pick a time for a free call. We&apos;ll listen to your goals and recommend the right next step — whether that&apos;s a
                website, an app, AI automation, SEO or video.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <BookCallButton size="lg">
                <span className="inline-flex items-center gap-2">
                  <CalendarCheck className="size-4" aria-hidden="true" /> Schedule a call
                </span>
              </BookCallButton>
              <div className="flex flex-wrap gap-2 lg:justify-end">
                {site.phones.map((p) => (
                  <a key={p} href={telHref(p)} className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2.5 text-sm font-medium text-ink-2 transition-colors hover:border-brand hover:text-brand">
                    <Phone className="size-4 text-brand" aria-hidden="true" /> {p}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
