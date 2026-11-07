import Image from "next/image";
import ceoPhoto from "@/assets/images/ceo.webp";
import officeCollab from "@/assets/images/office-collab.jpg";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import BookCallButton from "@/components/booking/BookCallButton";
import { ceo } from "@/data/company";
import { site } from "@/lib/site";

/** Homepage "Meet our CEO" — portrait card over a soft studio backdrop. */
export default function CeoSection() {
  const who = ceo.name || "Our CEO";
  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32" aria-labelledby="ceo-heading">
      {/* Studio backdrop, washed into the light theme */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image src={officeCollab} alt="" fill placeholder="blur" quality={70} sizes="100vw" className="object-cover object-[65%_50%]" />
        <div className="absolute inset-0 bg-paper/[0.86] lg:bg-[linear-gradient(90deg,rgb(251_251_249/0.62)_0%,rgb(251_251_249/0.86)_42%,var(--paper)_72%)]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-paper to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-paper to-transparent" />
      </div>

      <Container className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* Portrait */}
        <div data-reveal className="relative mx-auto w-full max-w-md">
          <div aria-hidden="true" className="pointer-events-none absolute -inset-6 animate-spin-slower rounded-full border border-dashed border-brand/20 sm:-inset-10" />
          <div aria-hidden="true" className="absolute -bottom-3 -right-3 h-2/3 sm:-bottom-5 sm:-right-5 w-2/3 rounded-[2.25rem] bg-brand" />
          <figure className="relative overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_80px_-30px_rgb(22_62_51/0.45)] ring-1 ring-black/5">
            <Image
              src={ceoPhoto}
              alt={ceo.name ? `${ceo.name}, ${ceo.role} of ${site.name}` : `${ceo.role} of ${site.name}`}
              placeholder="blur"
              quality={85}
              sizes="(min-width: 1024px) 28rem, 90vw"
              className="aspect-[4/5] w-full object-cover object-[50%_22%]"
            />
            <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/85 px-5 py-4 backdrop-blur-md sm:inset-x-4 sm:bottom-4">
              {ceo.name && <span className="block font-display text-lg font-semibold text-ink">{ceo.name}</span>}
              <span className="block font-mono text-[0.7rem] uppercase tracking-[0.18em] text-brand">
                {ceo.role} · {site.name}
              </span>
            </figcaption>
          </figure>
        </div>

        {/* Introduction */}
        <div>
          <div data-reveal>
            <Eyebrow>Leadership</Eyebrow>
          </div>
          <h2 id="ceo-heading" data-reveal className="mt-5 text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-ink sm:text-5xl lg:text-6xl">
            Meet our <em>CEO.</em>
          </h2>
          <div data-reveal className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
            <p>
              {who} leads {site.name} — setting the direction across strategy, design, engineering, marketing and
              video, and making sure every client is looked after by one accountable team.
            </p>
            <p>
              The standard is simple: clear communication, honest advice and digital work that is built properly and
              built to grow.
            </p>
          </div>
          <dl data-reveal className="mt-10 grid max-w-md grid-cols-2 gap-6 border-t border-line pt-6">
            <div>
              <dt className="text-sm text-muted">Role</dt>
              <dd className="mt-1 font-display text-lg font-semibold text-brand">{ceo.role}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Talk to us</dt>
              <dd className="mt-1 font-display text-lg font-semibold text-brand">{site.email}</dd>
            </div>
          </dl>
          <div data-reveal className="mt-10 flex flex-wrap gap-3">
            <BookCallButton size="lg">Book a free consultation</BookCallButton>
            <Button href="/about-us" variant="secondary" size="lg">
              About {site.name}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
