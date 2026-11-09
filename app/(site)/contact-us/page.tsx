import { Mail, MessageCircle, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import JsonLd from "@/components/ui/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Eyebrow from "@/components/ui/Eyebrow";
import SplitWords from "@/components/ui/SplitWords";
import ContactForm from "@/components/forms/ContactForm";
import FAQ from "@/components/sections/FAQ";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { site, telHref, waHref } from "@/lib/site";
import { bookingEmbedUrl, hasBooking } from "@/lib/booking";
import BookingInline from "@/components/booking/BookingInline";
import { socialIconFor } from "@/components/ui/SocialIcons";

const title = "Contact The Orbit 7 | Book a Free Consultation | Call or WhatsApp";
const description =
  "Contact The Orbit 7 to discuss your website, app, software, AI or marketing project. Tell us your goals and get a free consultation and a clear, no-obligation proposal.";

export const metadata = buildMetadata({ title, description, path: "/contact-us" });

const steps = [
  { t: "We reply", d: "A specialist reviews your enquiry and responds by email." },
  { t: "Discovery call", d: "A short call to understand your goals, timeline and constraints." },
  { t: "Proposal", d: "A clear written proposal with scope, timeline and investment." },
];

const faqs = [
  {
    q: "What information should I include in my enquiry?",
    a: "Tell us about your business, what you want to achieve, any existing website or systems, your ideal timeline and any budget range you have in mind. The more context, the more useful our first reply.",
  },
  {
    q: "Is the first consultation really free?",
    a: "Yes. The initial consultation and proposal are free and come with no obligation.",
  },
  {
    q: "Will you sign an NDA?",
    a: "Yes. We are happy to sign a non-disclosure agreement before you share confidential details about your project.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. We work with clients in different countries and time zones, collaborating through video calls, shared project boards and regular updates.",
  },
];

export default function ContactPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Contact us", path: "/contact-us" },
  ];
  return (
    <>
      <JsonLd data={[webPageSchema({ name: title, path: "/contact-us", description, type: "ContactPage" }), breadcrumbSchema(crumbs)]} />
      <section className="relative isolate overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40" aria-labelledby="page-title">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="bg-grid mask-radial absolute inset-0 opacity-60" />
          <div className="absolute -left-32 -top-40 size-[36rem] rounded-full bg-mint/70 blur-[110px]" />
        </div>
        <Container>
          <Breadcrumbs items={crumbs} className="fade-late" />
          <div className="mt-10 grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <div className="fade-late">
                <Eyebrow>Contact us</Eyebrow>
              </div>
              <h1 id="page-title" className="mt-5 text-[2.6rem] leading-[1.0] font-semibold tracking-[-0.035em] sm:text-6xl">
                <SplitWords text="Let's build something *remarkable.*" />
              </h1>
              <p className="fade-late mt-6 max-w-lg text-lg leading-relaxed text-muted" style={{ ["--delay" as string]: "0.5s" }}>
                Tell us about your project — a new website, an app, custom software, AI automation or a growth
                campaign. We&apos;ll come back with honest advice and a clear next step.
              </p>

              <ul className="fade-late mt-10 space-y-3" style={{ ["--delay" as string]: "0.6s" }}>
                <li>
                  <a href={`mailto:${site.email}`} className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-4 transition-all hover:border-brand/30 hover:shadow-soft">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-brand text-white">
                      <Mail className="size-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-xs text-muted">Email us</span>
                      <span className="font-medium break-all group-hover:text-brand">{site.email}</span>
                    </span>
                  </a>
                </li>
                {site.phones.map((p, i) => (
                  <li key={p}>
                    <a href={telHref(p)} className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-4 transition-all hover:border-brand/30 hover:shadow-soft">
                      <span className="flex size-11 items-center justify-center rounded-xl bg-brand text-white">
                        <Phone className="size-5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-xs text-muted">{i === 0 ? "Call us" : "Call us (alternate)"}</span>
                        <span className="font-medium group-hover:text-brand">{p}</span>
                      </span>
                    </a>
                  </li>
                ))}
                {site.whatsapp && (
                  <li>
                    <a href={waHref(site.whatsapp)} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-4 transition-all hover:border-brand/30 hover:shadow-soft">
                      <span className="flex size-11 items-center justify-center rounded-xl bg-brand text-white">
                        <MessageCircle className="size-5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-xs text-muted">WhatsApp</span>
                        <span className="font-medium group-hover:text-brand">{site.whatsapp}</span>
                      </span>
                    </a>
                  </li>
                )}
              </ul>
              <ul className="fade-late mt-6 flex gap-2.5" style={{ ["--delay" as string]: "0.7s" }}>
                {site.social.map((s) => {
                  const Icon = socialIconFor(s.label);
                  return (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`The Orbit 7 on ${s.label}`} className="flex size-11 items-center justify-center rounded-full border border-line bg-white text-ink-2 transition-colors hover:border-brand hover:text-brand">
                        <Icon className="size-4" />
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="fade-late mt-12 border-t border-line pt-8" style={{ ["--delay" as string]: "0.8s" }}>
                <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-brand-500">What happens next</h2>
                <ol className="mt-6 space-y-5">
                  {steps.map((s, i) => (
                    <li key={s.t} className="flex gap-4">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-mint-100 font-mono text-xs text-brand">{i + 1}</span>
                      <div>
                        <h3 className="font-semibold">{s.t}</h3>
                        <p className="text-sm text-muted">{s.d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="fade-late" style={{ ["--delay" as string]: "0.3s" }}>
              <div className="glass sheen rounded-[2rem] p-6 sm:p-10">
                <h2 className="text-2xl font-semibold">Start your project</h2>
                <p className="mt-2 mb-8 text-muted">Fields marked * are required.</p>
                <ContactForm services={services.map((s) => s.title)} email={site.email} />
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section id="book" className="scroll-mt-24 border-t border-line bg-paper py-20 sm:py-24" aria-labelledby="book-heading">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Schedule a call</Eyebrow>
            <h2 id="book-heading" className="mt-4 text-4xl leading-tight font-semibold sm:text-5xl">
              Book a free <em>consultation</em>
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
              Choose a time that suits you for a free, no-obligation call about your website, app, AI, SEO or video project.
            </p>
            <ul className="mt-8 space-y-3 text-[0.95rem] text-ink-2">
              {["A specialist who understands your project", "Honest advice on scope, approach and next steps", "A clear written proposal afterwards"].map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          {hasBooking() ? (
            <BookingInline embedUrl={bookingEmbedUrl()} />
          ) : (
            <div className="flex flex-col justify-center rounded-[1.75rem] border border-line bg-white p-8 sm:p-12">
              <p className="font-display text-2xl font-semibold">Prefer to talk now?</p>
              <p className="mt-2 text-muted">Call or message us and we&apos;ll arrange a time that works for you.</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {site.phones.map((p) => (
                  <a key={p} href={telHref(p)} className="flex items-center gap-3 rounded-2xl bg-brand px-5 py-4 font-medium text-white hover:bg-brand-800">
                    <Phone className="size-5" aria-hidden="true" /> {p}
                  </a>
                ))}
                {site.whatsapp && (
                  <a href={waHref(site.whatsapp)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl border border-line-strong px-5 py-4 font-medium text-ink-2 hover:border-brand hover:text-brand sm:col-span-2">
                    <MessageCircle className="size-5 text-brand" aria-hidden="true" /> Message us on WhatsApp
                  </a>
                )}
              </div>
            </div>
          )}
        </Container>
      </section>

      <FAQ faqs={faqs} lead="A few things people usually ask before getting in touch." />
    </>
  );
}
