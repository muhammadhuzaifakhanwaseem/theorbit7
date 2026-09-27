import type { Metadata } from "next";
import { Mail, Phone, MessageCircle, CalendarClock } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/forms/ContactForm";
import FAQ from "@/components/sections/FAQ";
import { homeFaqs } from "@/data/content";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with The Orbit 7 to discuss your mobile app, web platform, AI product, or automation project.",
  alternates: { canonical: "/contact-us" },
};

const contactMethods = [
  {
    Icon: CalendarClock,
    label: "Strategy call",
    value: "Book a 30-minute call",
    href: "https://cal.com/theorbit7/strategy-call",
  },
  {
    Icon: Mail,
    label: "Email",
    value: "hello@theorbit7.com",
    href: "mailto:hello@theorbit7.com",
  },
  {
    Icon: Phone,
    label: "Phone",
    value: "+1 (800) 555-0147",
    href: "tel:+18005550147",
  },
  {
    Icon: MessageCircle,
    label: "WhatsApp",
    value: "Message us directly",
    href: "https://wa.me/18005550147",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Build Something That Actually Works"
        description="Tell us about your project and we'll come back with a scoped plan and realistic timeline — not a sales pitch."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
      />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-16 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-3xl border border-line bg-white p-6 sm:p-10">
                <ContactForm />
              </div>
            </div>

            <aside className="space-y-4">
              {contactMethods.map((m) => (
                <a
                  key={m.label}
                  href={m.href}
                  target={m.href.startsWith("http") ? "_blank" : undefined}
                  rel={m.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-brand"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand">
                    <m.Icon className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">
                      {m.label}
                    </p>
                    <p className="text-sm font-medium text-ink">{m.value}</p>
                  </div>
                </a>
              ))}

              <div className="rounded-2xl border border-line bg-surface p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">
                  Response time
                </p>
                <p className="mt-1 text-sm text-ink-muted">
                  We respond to every inquiry within one business day, with next steps rather
                  than a generic acknowledgment.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-20 sm:py-28">
        <Container className="max-w-3xl">
          <FAQ items={homeFaqs} />
        </Container>
      </section>
    </>
  );
}
