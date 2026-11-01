import Link from "next/link";
import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { socialIconFor } from "@/components/ui/SocialIcons";
import { categories, navServicesIn, serviceHref } from "@/data/services";
import { cities, locationHref } from "@/data/locations";
import { companyNav } from "@/data/nav";
import { site, telHref, waHref } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-brand-950 text-white/70 noise">
      <div className="pointer-events-none absolute -left-40 top-0 size-[38rem] rounded-full bg-brand-600/30 blur-[120px]" />
      <Container className="relative">
        <div className="grid gap-12 border-b border-white/10 py-16 lg:grid-cols-[1fr_2.4fr] lg:py-20">
          <div>
            <Link href="/" aria-label="The Orbit 7 — home">
              <Logo light />
            </Link>
            <p className="mt-6 max-w-sm leading-relaxed text-white/60">{site.description}</p>
            <ul className="mt-8 space-y-3 text-sm">
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-white hover:text-mint">
                  <Mail className="size-4 shrink-0 text-mint" aria-hidden="true" /> <span className="break-all">{site.email}</span>
                </a>
              </li>
              {site.phones.map((p) => (
                <li key={p}>
                  <a href={telHref(p)} className="flex items-center gap-3 text-white hover:text-mint">
                    <Phone className="size-4 shrink-0 text-mint" aria-hidden="true" /> {p}
                  </a>
                </li>
              ))}
              {site.whatsapp && (
                <li>
                  <a href={waHref(site.whatsapp)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white hover:text-mint">
                    <MessageCircle className="size-4 shrink-0 text-mint" aria-hidden="true" /> WhatsApp us
                  </a>
                </li>
              )}
            </ul>
            <ul className="mt-8 flex gap-2.5">
              {site.social.map((s) => {
                const Icon = socialIconFor(s.label);
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`The Orbit 7 on ${s.label}`}
                      className="flex size-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-mint hover:text-mint"
                    >
                      <Icon className="size-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((cat) => {
              const list = navServicesIn(cat.id);
              return (
                <nav key={cat.id} aria-label={cat.name}>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-mint">
                    <Link href={cat.id === "video" ? "/video-editing" : `/services#${cat.id}`} className="hover:text-white">
                      {cat.name}
                    </Link>
                  </p>
                  <ul className="mt-4 space-y-2.5 text-sm">
                    {list.slice(0, 7).map((s) => (
                      <li key={s.slug}>
                        <Link href={serviceHref(s.slug)} className="link-underline hover:text-white">
                          {s.title}
                        </Link>
                      </li>
                    ))}
                    {list.length > 7 && (
                      <li>
                        <Link href="/video-editing" className="text-mint hover:text-white">
                          + {list.length - 7} more
                        </Link>
                      </li>
                    )}
                  </ul>
                </nav>
              );
            })}
          </div>
        </div>

        <div className="grid gap-10 border-b border-white/10 py-12 sm:grid-cols-2">
          <nav aria-label="Locations">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-mint">
              <Link href="/locations" className="hover:text-white">Locations we serve</Link>
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2.5 text-sm">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link href={locationHref(c.slug)} className="link-underline hover:text-white">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Company">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-mint">Company</p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2.5 text-sm">
              {companyNav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/privacy-policy" className="link-underline hover:text-white">Privacy policy</Link>
              </li>
              <li>
                <Link href="/terms-of-use" className="link-underline hover:text-white">Terms of use</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-col items-start justify-between gap-6 py-10 sm:flex-row sm:items-end">
          <p aria-hidden="true" className="select-none font-display text-[18vw] leading-[0.8] font-semibold tracking-[-0.06em] text-white/[0.06] sm:text-[9rem]">
            orbit<span className="font-light">7</span>
          </p>
          <div className="flex flex-col gap-2 text-sm sm:items-end">
            <Link href="/contact-us" className="inline-flex items-center gap-2 text-white hover:text-mint">
              Let&apos;s build something remarkable <ArrowUpRight className="size-4" />
            </Link>
            <p className="text-white/50">
              © {year} {site.name}. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
