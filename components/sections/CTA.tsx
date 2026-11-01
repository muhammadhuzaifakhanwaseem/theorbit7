import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import BookCallButton from "@/components/booking/BookCallButton";
import Eyebrow from "@/components/ui/Eyebrow";
import { site, telHref } from "@/lib/site";

export default function CTA({
  eyebrow = "Let's talk",
  title = (
    <>
      Ready to put your business <em>in orbit?</em>
    </>
  ),
  text = "Tell us about your goals. We'll come back with honest advice, a recommended approach and a clear proposal — no obligation.",
  primary = { label: "Book a free consultation", href: "" },
  secondary = { label: "Explore services", href: "/services" },
}: {
  eyebrow?: string;
  title?: React.ReactNode;
  text?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="py-20 sm:py-28" aria-label="Start a project">
      <Container>
        <div
          data-reveal="scale"
          className="noise relative isolate overflow-hidden rounded-[2rem] bg-brand px-6 py-16 text-white sm:px-14 sm:py-20 lg:rounded-[2.5rem] lg:px-20 lg:py-24"
        >
          {/* Orbits */}
          <div aria-hidden="true" className="pointer-events-none absolute -right-48 top-1/2 -z-10 size-[44rem] -translate-y-1/2">
            <div className="absolute inset-0 animate-spin-slower rounded-full border border-white/10">
              <span className="absolute left-1/2 top-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint shadow-[0_0_24px_6px_rgb(207_231_218_/_0.5)]" />
            </div>
            <div className="absolute inset-20 animate-spin-rev rounded-full border border-white/10">
              <span className="absolute bottom-0 left-1/2 size-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-gold" />
            </div>
            <div className="absolute inset-40 rounded-full border border-white/10" />
            <div className="absolute inset-[15rem] rounded-full bg-brand-500/40 blur-3xl" />
          </div>
          <div className="max-w-2xl">
            <Eyebrow light>{eyebrow}</Eyebrow>
            <h2 className="mt-5 text-4xl leading-[1.04] font-semibold sm:text-5xl lg:text-6xl">{title}</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">{text}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              {primary.href ? (
                <Button href={primary.href} variant="light" size="lg">
                  {primary.label}
                </Button>
              ) : (
                <BookCallButton variant="light" size="lg">
                  {primary.label}
                </BookCallButton>
              )}
              <Button href={secondary.href} variant="ghost-light" size="lg">
                {secondary.label}
              </Button>
            </div>
            <p className="mt-8 text-sm text-white/60">
              Prefer email or phone?{" "}
              <a href={`mailto:${site.email}`} className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
                {site.email}
              </a>
              {site.phones.map((p) => (
                <span key={p}>
                  {" · "}
                  <a href={telHref(p)} className="whitespace-nowrap text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
                    {p}
                  </a>
                </span>
              ))}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
