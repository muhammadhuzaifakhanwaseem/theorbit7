import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import { LinkedInIcon, XIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import {
  industriesNav,
  locationsNav,
  companyNav,
  footerServiceLinks,
  footerResourceLinks,
} from "@/data/nav";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface-dark text-white/80">
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-lg bg-brand font-display text-base font-bold text-white">
                O7
              </span>
              <span className="font-display text-lg font-bold text-white">The Orbit 7</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Engineering AI-powered digital systems for scalable businesses — mobile, web,
              backend, and automation, built by one accountable team.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: LinkedInIcon, label: "LinkedIn", href: "https://www.linkedin.com/company/theorbit7" },
                { Icon: XIcon, label: "X (Twitter)", href: "https://twitter.com/theorbit7" },
                { Icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/theorbit7" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-9 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-brand-light hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Services" links={footerServiceLinks} />
          <FooterCol
            title="Industries"
            links={industriesNav}
          />
          <FooterCol title="Locations" links={locationsNav} />
          <FooterCol title="Company" links={companyNav} />
          <FooterCol title="Resources" links={footerResourceLinks} />
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:gap-8">
          <a href="mailto:hello@theorbit7.com" className="flex items-center gap-2 text-sm text-white/70 hover:text-white">
            <Mail className="size-4" /> hello@theorbit7.com
          </a>
          <a href="tel:+18005550147" className="flex items-center gap-2 text-sm text-white/70 hover:text-white">
            <Phone className="size-4" /> +1 (800) 555-0147
          </a>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} The Orbit 7. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms-of-use" className="hover:text-white">
              Terms of Use
            </Link>
            <Link href="/site-map" className="hover:text-white">
              Sitemap
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-white">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-white/60 hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
