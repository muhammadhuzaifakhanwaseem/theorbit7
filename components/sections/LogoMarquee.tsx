import Container from "@/components/ui/Container";
import { clientLogos } from "@/data/content";

export default function LogoMarquee() {
  const items = [...clientLogos, ...clientLogos];
  return (
    <section className="border-y border-line py-12">
      <Container>
        <p className="text-center text-sm text-ink-soft">
          Trusted by product teams building what&apos;s next
        </p>
        <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee items-center gap-16">
            {items.map((logo, i) => (
              <span
                key={`${logo}-${i}`}
                className="whitespace-nowrap font-display text-xl font-semibold text-ink-soft/70"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
