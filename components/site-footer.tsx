import Link from "next/link"
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail, MessageCircle } from "lucide-react"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"

/* ------------------------------------------------------------------ */
/* Contact details — The Orbit 7                                       */
/* WhatsApp / Call: Rijab · +92 310 0301826                            */
/* TODO: replace the email + address placeholders with your real ones  */
/* ------------------------------------------------------------------ */
const WHATSAPP_LINK = `https://wa.me/923100301826?text=${encodeURIComponent(
  "Hi, I'd like to discuss a project with The Orbit 7. Please share more details."
)}`

const CONTACT = {
  phoneDisplay: "+92 310 0301826",
  phoneHref: "tel:+923100301826",
  email: "info@theorbit7.com",
  emailHref: "mailto:hello@theorbit7.com",
  address: "Karachi, Pakistan — serving clients worldwide",
}

const overviewLinks = [
  { name: "About Us", href: "#home" },
  { name: "Our Process", href: "#process" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
]

const serviceLinks = [
  { name: "Website Development", href: "#services" },
  { name: "Mobile App Development", href: "#services" },
  { name: "CRM & ERP Solutions", href: "#services" },
  { name: "Search Engine Optimization", href: "#services" },
  { name: "Social Media Marketing", href: "#services" },
  { name: "AI & Automation", href: "#services" },
]

const socialLinks = [
  { name: "Facebook", href: "https://facebook.com", icon: Facebook },
  { name: "Instagram", href: "https://instagram.com", icon: Instagram },
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
]

export function SiteFooter() {
  return (
    <footer className="border-t bg-background/80 backdrop-blur-lg overflow-hidden">
      <div className="container py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(280px,380px)_1fr] lg:gap-16">
          {/* Brand panel — bold color block with outlined slogan, like the reference */}
          <div className="relative flex flex-col justify-between rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-8 md:p-10 shadow-lg shadow-emerald-950/40">
            <div>
              <p
                aria-hidden="true"
                className="font-heading font-bold uppercase leading-[0.95] tracking-tighter text-transparent text-5xl md:text-6xl select-none"
                style={{ WebkitTextStroke: "2px rgba(3, 7, 18, 0.85)" }}
              >
                Build.
                <br />
                Rank.
                <br />
                Scale.
              </p>
              <p className="mt-8 text-gray-950 text-lg">
                let&apos;s build <span className="font-bold">something awesome</span>
              </p>
            </div>

            {/* Social icons — dark squares on the color panel */}
            <div className="mt-10 flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-md bg-gray-950 text-white transition-transform duration-300 hover:scale-110 hover:bg-gray-900"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Link + contact columns */}
          <div className="flex flex-col justify-between gap-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
              {/* Overview */}
              <div className="flex flex-col gap-3">
                <h3 className="font-heading text-lg font-bold tracking-tight text-emerald-300">Overview</h3>
                <ul className="flex flex-col gap-3">
                  {overviewLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground opacity-70 hover:opacity-100"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div className="flex flex-col gap-3">
                <h3 className="font-heading text-lg font-bold tracking-tight text-emerald-300">Our Services</h3>
                <ul className="flex flex-col gap-3">
                  {serviceLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground opacity-70 hover:opacity-100"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Get in Touch */}
              <div className="flex flex-col gap-3">
                <h3 className="font-heading text-lg font-bold tracking-tight text-emerald-300">Get in Touch</h3>
                <ul className="flex flex-col gap-4">
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                    <span className="text-sm text-muted-foreground opacity-70">{CONTACT.address}</span>
                  </li>
                  <li>
                    <a
                      href={CONTACT.phoneHref}
                      className="flex items-start gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground opacity-70 hover:opacity-100"
                    >
                      <Phone className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                      {CONTACT.phoneDisplay}
                    </a>
                  </li>
                  <li>
                    <a
                      href={CONTACT.emailHref}
                      className="flex items-start gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground opacity-70 hover:opacity-100"
                    >
                      <Mail className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                      {CONTACT.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700 px-4 py-2 text-sm font-medium text-white transition-transform duration-300 hover:scale-105"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Chat on WhatsApp
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t pt-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <p className="text-sm text-muted-foreground opacity-70">
                  &copy; {new Date().getFullYear()} <span className="text-emerald-300 font-medium">The Orbit 7</span>. All
                  rights reserved.
                </p>
                <div className="flex gap-4">
                  <Link
                    href="#terms"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground opacity-70"
                  >
                    Terms of Service
                  </Link>
                  <Link
                    href="#privacy"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground opacity-70"
                  >
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </footer>
  )
}