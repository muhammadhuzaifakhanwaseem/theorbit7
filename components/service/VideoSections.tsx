import Link from "next/link";
import { ArrowUpRight, Check, Mail, MessageCircle, Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Eyebrow from "@/components/ui/Eyebrow";
import ContactForm from "@/components/forms/ContactForm";
import type { Service } from "@/data/services";
import { site, waHref } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Full-width free sample banner (brand accent). */
export function OfferBanner({ offer }: { offer: NonNullable<Service["offer"]> }) {
  return (
    <section className="py-6" aria-labelledby="offer-heading">
      <Container>
        <div data-reveal="scale" className="noise relative isolate flex flex-col items-start justify-between gap-8 overflow-hidden rounded-[2rem] bg-brand px-7 py-10 text-white sm:px-12 sm:py-12 lg:flex-row lg:items-center">
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 -z-10 size-80 animate-spin-slower rounded-full border border-dashed border-white/20" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex h-3 gap-2 px-3 opacity-30">
            {Array.from({ length: 40 }, (_, i) => (
              <span key={i} className="mt-0.5 h-2 w-4 shrink-0 rounded-sm bg-white/40" />
            ))}
          </div>
          <div className="max-w-2xl">
            <Eyebrow light>Free sample</Eyebrow>
            <h2 id="offer-heading" className="mt-4 text-3xl leading-tight font-semibold sm:text-4xl">
              {offer.title}
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-white/75">{offer.text}</p>
          </div>
          <Link
            href="#free-sample"
            className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-white py-3 pl-6 pr-3 font-medium text-brand transition-colors hover:bg-mint-50"
          >
            {offer.cta}
            <span className="flex size-8 items-center justify-center rounded-full bg-brand text-white transition-transform group-hover:rotate-45">
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}

export function Packages({ packages, note }: { packages: NonNullable<Service["packages"]>; note?: string }) {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="packages-heading" id="packages">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Packages & pricing"
          title={
            <span id="packages-heading">
              Simple packages, <em>clear pricing</em>
            </span>
          }
        />
        <ul className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-3 md:items-center">
          {packages.map((p, i) => (
            <li
              key={p.name}
              data-reveal
              style={{ ["--d" as string]: i * 90 }}
              className={cn(
                "relative flex flex-col rounded-[1.75rem] p-7 sm:p-8",
                p.popular ? "bg-brand text-white shadow-brand md:-my-4 md:py-12" : "border border-line bg-white",
              )}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-mint px-3 py-1 text-xs font-semibold text-brand">
                  <Sparkles className="size-3" aria-hidden="true" /> Most popular
                </span>
              )}
              <h3 className={cn("text-lg font-semibold", p.popular ? "text-white" : "text-ink")}>{p.name}</h3>
              <p className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-5xl font-semibold tracking-tight">{p.price}</span>
                <span className={cn("text-sm", p.popular ? "text-white/70" : "text-muted")}>{p.unit}</span>
              </p>
              <p className={cn("mt-2 text-sm", p.popular ? "text-mint" : "text-brand-500")}>Delivery: {p.delivery}</p>
              <ul className="mt-6 space-y-2.5 text-[0.95rem]">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <Check className={cn("mt-0.5 size-4 shrink-0", p.popular ? "text-mint" : "text-brand")} aria-hidden="true" />
                    <span className={p.popular ? "text-white/85" : "text-ink-2"}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="#free-sample"
                className={cn(
                  "mt-8 inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-medium transition-colors",
                  p.popular ? "bg-white text-brand hover:bg-mint-50" : "bg-brand text-white hover:bg-brand-800",
                )}
              >
                Get started
              </Link>
            </li>
          ))}
        </ul>
        {note && (
          <p data-reveal className="mx-auto mt-12 max-w-2xl text-center text-muted">
            {note}{" "}
            <Link href="#free-sample" className="font-medium text-brand underline underline-offset-4">
              Get a custom quote
            </Link>
          </p>
        )}
      </Container>
    </section>
  );
}

export function ToolsGrid({ tools }: { tools: NonNullable<Service["tools"]> }) {
  return (
    <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
      {tools.map((t) => (
        <li key={t.name} className="rounded-2xl bg-white px-4 py-3 shadow-soft ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-0.5">
          <p className="text-sm font-semibold text-ink">{t.name}</p>
          <p className="text-xs text-muted">{t.use}</p>
        </li>
      ))}
    </ul>
  );
}

/** Final CTA + video form (from the video editing brief). */
export function VideoContact({ serviceTitle, services }: { serviceTitle: string; services: string[] }) {
  return (
    <section id="free-sample" className="scroll-mt-24 bg-paper py-20 sm:py-28" aria-labelledby="sample-heading">
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Free sample"
            title={
              <span id="sample-heading">
                Ready to make your content <em>stand out?</em>
              </span>
            }
            lead="Tell us about your show or channel and get a free 30-second sample edit."
          />
          <div data-reveal className="mt-8 space-y-3">
            {site.whatsapp && (
              <a
                href={waHref(site.whatsapp, `Hi The Orbit 7, I'm interested in ${serviceTitle.toLowerCase()}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl bg-[#1f8f4e] p-4 text-white transition-colors hover:bg-[#1a7a43]"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-white/15">
                  <MessageCircle className="size-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs text-white/75">Prefer chatting?</span>
                  <span className="font-medium">Chat on WhatsApp</span>
                </span>
              </a>
            )}
            <a href={`mailto:${site.email}`} className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4 transition-colors hover:border-brand/30">
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand text-white">
                <Mail className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs text-muted">Email us</span>
                <span className="font-medium break-all">{site.email}</span>
              </span>
            </a>
          </div>
        </div>
        <div data-reveal className="glass sheen rounded-[2rem] p-6 sm:p-10">
          <h3 className="text-2xl font-semibold">Get my free sample</h3>
          <p className="mt-2 mb-8 text-muted">Fields marked * are required.</p>
          <ContactForm services={services} email={site.email} variant="video" defaultService={serviceTitle} />
        </div>
      </Container>
    </section>
  );
}

/** Mobile-only fixed "Get free sample" button. */
export function StickySampleButton() {
  return (
    <div className="fixed inset-x-3 bottom-3 z-40 sm:hidden">
      <Link href="#free-sample" className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand font-medium text-white shadow-brand">
        Get free sample <ArrowUpRight className="size-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
