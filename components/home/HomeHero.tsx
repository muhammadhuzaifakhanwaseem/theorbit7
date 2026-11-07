import Image from "next/image";
import { Code2, Clapperboard, Search, Palette } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SplitWords from "@/components/ui/SplitWords";
import Marquee from "@/components/ui/Marquee";
import BookCallButton from "@/components/booking/BookCallButton";
import { categories, services } from "@/data/services";
import officeHero from "@/assets/images/office-hero.jpg";

const disciplines = [
  { icon: Code2, label: "Development" },
  { icon: Clapperboard, label: "Video editing" },
  { icon: Search, label: "SEO & marketing" },
  { icon: Palette, label: "Design" },
];

/** Studio photograph, framed. Shared by the desktop panel and the mobile card. */
function StudioFrame({ className, sizes }: { className?: string; sizes: string }) {
  return (
    <div className={`hero-panel relative isolate overflow-hidden rounded-[1.75rem] bg-sand ring-1 ring-black/5 shadow-[0_40px_100px_-40px_rgb(22_62_51/0.45)] lg:rounded-[2.25rem] ${className ?? ""}`}>
      <Image
        src={officeHero}
        alt="The Orbit 7 studio: a team planning at a whiteboard beside the illuminated Orbit 7 sign"
        fill
        priority
        fetchPriority="high"
        placeholder="blur"
        quality={85}
        sizes={sizes}
        className="hero-settle object-cover object-[86%_55%]"
      />
      {/* Depth: a soft vignette so the floating cards sit cleanly. */}
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(22_62_51/0)_55%,rgb(22_62_51/0.38)_100%)]" />

      <p
        className="fade-late absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/85 px-3.5 py-1.5 text-xs font-medium text-ink-2 backdrop-blur-md sm:left-5 sm:top-5"
        style={{ ["--delay" as string]: "1.1s" }}
      >
        <span className="relative flex size-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-brand-500/60" />
          <span className="relative size-2 rounded-full bg-brand" />
        </span>
        Inside the studio
      </p>

      <div
        className="fade-late absolute inset-x-4 bottom-4 rounded-2xl bg-white/88 p-4 backdrop-blur-md sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-[22rem] sm:p-5"
        style={{ ["--delay" as string]: "1.3s" }}
      >
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-brand">One team, every discipline</p>
        <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5" role="list">
          {disciplines.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2 text-sm text-ink-2">
              <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-mint-50 text-brand">
                <Icon className="size-3.5" aria-hidden="true" />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function HomeHero() {
  const stats: [string, string][] = [
    [String(services.length), "specialist services"],
    [String(categories.length), "disciplines, one team"],
    ["100%", "code & IP ownership"],
  ];

  return (
    <section className="relative isolate" aria-labelledby="hero-title">
      <div className="relative lg:h-svh lg:min-h-[38rem] lg:max-h-[72rem]">
        {/* Atmosphere: quiet grid and a soft mint glow behind the copy. */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
          <div className="bg-grid mask-radial absolute inset-0 opacity-40" />
          <div className="absolute -left-40 top-10 h-[36rem] w-[48rem] rounded-full bg-[radial-gradient(closest-side,rgb(207_231_218/0.55),transparent)]" />
        </div>

        {/* Desktop: the studio as a large framed panel bleeding toward the right edge. */}
        <div className="absolute bottom-5 right-5 top-24 hidden w-[calc(50%-1.25rem)] lg:block xl:bottom-6 xl:right-6 xl:top-[6.5rem]">
          <StudioFrame className="size-full" sizes="(min-width: 1024px) 240vh, 1px" />
          {/* Brand seal bridging copy and image */}
          <div
            aria-hidden="true"
            className="fade-late absolute -left-9 top-1/2 grid size-[4.5rem] -translate-y-1/2 place-items-center rounded-full bg-white shadow-[0_18px_40px_-16px_rgb(22_62_51/0.5)] ring-1 ring-black/5"
            style={{ ["--delay" as string]: "1s" }}
          >
            <span className="absolute inset-1.5 animate-spin-slower rounded-full border border-dashed border-brand/30" />
            <span className="grid size-10 place-items-center rounded-full bg-brand font-display text-lg font-semibold text-white">7</span>
          </div>
        </div>

        <Container className="relative flex h-full flex-col pt-28 sm:pt-32 lg:pb-8 lg:pt-24">
          <div className="flex flex-1 flex-col justify-center lg:w-[46%] lg:pr-6">
            <p
              className="fade-late inline-flex w-fit items-center gap-2.5 rounded-full border border-line bg-white/70 py-1 pl-1 pr-3.5 text-xs text-ink-2 backdrop-blur sm:text-sm"
              style={{ ["--delay" as string]: "0.05s" }}
            >
              <span className="rounded-full bg-brand px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white">
                Agency + Software house
              </span>
              <span className="hidden sm:inline">Strategy · Design · Engineering · Growth</span>
              <span className="sm:hidden">Strategy to growth</span>
            </p>

            <h1
              id="hero-title"
              className="mt-6 max-w-[17ch] text-[2.35rem] leading-[1.06] font-semibold tracking-[-0.032em] text-ink sm:text-5xl lg:text-[clamp(2.5rem,3.5vw,3.6rem)] lg:leading-[1.04]"
            >
              <SplitWords text="We build digital products that put brands *in orbit.*" />
            </h1>

            <p
              className="fade-late mt-5 max-w-[34rem] text-base leading-relaxed text-muted sm:text-lg"
              style={{ ["--delay" as string]: "0.6s" }}
            >
              A full-service digital agency and software house. We design and engineer websites, custom software,
              mobile apps and AI — then grow them with SEO, AI search, marketing and video.
            </p>

            <div className="fade-late mt-8 flex flex-wrap gap-3" style={{ ["--delay" as string]: "0.75s" }}>
              <BookCallButton size="lg">Book a free consultation</BookCallButton>
              <Button href="/services" variant="secondary" size="lg">
                Explore services
              </Button>
            </div>

            <dl
              className="hero-stats fade-late mt-10 grid max-w-md grid-cols-3 gap-5 border-t border-line pt-5"
              style={{ ["--delay" as string]: "0.9s" }}
            >
              {stats.map(([v, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="font-display text-2xl font-semibold tracking-tight text-brand">{v}</dd>
                  <dd className="mt-0.5 text-xs leading-snug text-muted sm:text-sm">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Mobile & tablet: the studio as a card under the copy. */}
          <StudioFrame className="mt-12 aspect-[4/3] w-full sm:aspect-[16/10] lg:hidden" sizes="(max-width: 1023px) 170vw, 1px" />
        </Container>
      </div>

      <div className="mt-12 border-y border-line bg-white/60 py-5 backdrop-blur lg:mt-0">
        <Marquee
          items={[
            "Website Development",
            "Mobile Apps",
            "Custom Software",
            "AI Automation",
            "SEO, AEO & GEO",
            "AI Search Optimization",
            "Video Editing",
            "Google Ads",
            "Social Media",
            "UI/UX Design",
            "Branding",
            "Ecommerce",
            "ERP & CRM",
            "Photo & Video",
          ]}
          itemClassName="font-display text-lg font-medium text-ink-2 sm:text-xl"
        />
        <p className="sr-only">Service disciplines: {categories.map((c) => c.name).join(", ")}.</p>
      </div>
    </section>
  );
}
