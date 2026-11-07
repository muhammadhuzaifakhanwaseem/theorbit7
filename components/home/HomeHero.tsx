import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SplitWords from "@/components/ui/SplitWords";
import HeroOrbit from "@/components/visuals/HeroOrbit";
import Marquee from "@/components/ui/Marquee";
import { categories, services } from "@/data/services";
import BookCallButton from "@/components/booking/BookCallButton";
import HeroBackdrop from "@/components/home/HeroBackdrop";

export default function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 sm:pt-40" aria-labelledby="hero-title">
      {/* Studio photo backdrop */}
      <HeroBackdrop />
      {/* Background atmosphere */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="bg-grid mask-radial absolute inset-0 opacity-30" />
        <div className="absolute -top-40 left-1/2 h-[42rem] w-[70rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(207_231_218/0.3),transparent)]" />
      </div>

      <Container className="grid items-center gap-12 lg:grid-cols-[1.08fr_1fr] lg:gap-6">
        <div>
          <p className="fade-late glass inline-flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4 text-sm text-ink-2" style={{ ["--delay" as string]: "0.05s" }}>
            <span className="rounded-full bg-brand px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-widest text-white">
              Agency + Software house
            </span>
            Strategy · Design · Engineering · Growth
          </p>
          <h1
            id="hero-title"
            className="mt-7 text-[2.75rem] leading-[0.98] font-semibold tracking-[-0.035em] text-ink sm:text-6xl lg:text-[5.4rem]"
          >
            <SplitWords text="We build digital products that put brands *in orbit.*" />
          </h1>
          <p
            className="fade-late mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
            style={{ ["--delay" as string]: "0.65s" }}
          >
            The Orbit 7 is a full-service digital agency and software house. We design and engineer websites,
            custom software, mobile apps and AI solutions — then grow them with SEO, AI search optimization,
            digital marketing and video.
          </p>
          <div className="fade-late mt-10 flex flex-wrap gap-3" style={{ ["--delay" as string]: "0.8s" }}>
            <BookCallButton size="lg">Book a free consultation</BookCallButton>
            <Button href="/services" variant="secondary" size="lg">
              Explore services
            </Button>
          </div>
          <dl className="fade-late mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-6" style={{ ["--delay" as string]: "0.95s" }}>
            {[
              [String(services.length), "specialist services"],
              [String(categories.length), "disciplines, one team"],
              ["100%", "code & IP ownership"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="font-display text-3xl font-semibold tracking-tight text-brand">{v}</dd>
                <dd className="mt-1 text-sm text-muted">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="fade-late relative" style={{ ["--delay" as string]: "0.3s" }}>
          <HeroOrbit />
        </div>
      </Container>

      <div className="mt-16 border-y border-line bg-white/60 py-5 backdrop-blur sm:mt-20">
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
