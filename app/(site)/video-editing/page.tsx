import Link from "next/link";
import { ArrowUpRight, Clapperboard } from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionHeading from "@/components/ui/SectionHeading";
import SplitWords from "@/components/ui/SplitWords";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/ui/JsonLd";
import FAQ from "@/components/sections/FAQ";
import ServiceVisual from "@/components/visuals/ServiceVisual";
import Timecode from "@/components/visuals/Timecode";
import { OfferBanner, StickySampleButton, ToolsGrid, VideoContact } from "@/components/service/VideoSections";
import { getService, navServicesIn, serviceHref, services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { absoluteUrl, site } from "@/lib/site";

const title = "Video Editing Services | Podcast, YouTube & Reels | The Orbit 7";
const description =
  "Professional video editing for podcasters, creators, brands and agencies: podcast and YouTube editing, Shorts, Reels and TikToks, corporate and ad videos, motion graphics and audio post-production.";

export const metadata = buildMetadata({
  title,
  description,
  path: "/video-editing",
  keywords: ["video editing services", "podcast video editing", "youtube video editing", "short form video editing", "white label video editing"],
});

const steps = [
  { title: "Share your footage", text: "Upload raw files via Google Drive, Dropbox or WeTransfer, plus any style references." },
  { title: "We edit", text: "We cut, clean the audio, add captions and graphics, and match your brand style." },
  { title: "You review", text: "Watch the draft and send your notes; we make the changes fast." },
  { title: "Ready to publish", text: "Get final files for YouTube, Spotify and social media. We can upload for you too." },
];

const faqs = [
  { q: "What kinds of videos do you edit?", a: "Podcasts, YouTube videos, Shorts, Reels and TikToks, corporate and training videos, promotional and ad creatives, motion graphics and audio post-production." },
  { q: "Do you edit in languages other than English?", a: "Yes. We edit content in many languages for clients worldwide, with captions in the same language as the video." },
  { q: "Can I get a free sample?", a: "Yes. Send a short part of your raw footage and we'll edit a free 30-second sample clip so you can judge our quality first." },
  { q: "How do I send footage?", a: "Share a Google Drive, Dropbox or WeTransfer link. We also work with Riverside and Descript projects." },
  { q: "Do you work with agencies white-label?", a: "Yes. We deliver under your brand and never contact your clients directly." },
  { q: "Do you offer monthly plans?", a: "Yes. Weekly shows, creators and agencies can get discounted monthly plans. Contact us for a custom quote." },
];

export default function VideoEditingPage() {
  const list = navServicesIn("video");
  const podcast = getService("podcast-video-editing")!;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Video Editing", path: "/video-editing" },
  ];
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ name: title, path: "/video-editing", description, type: "CollectionPage" }),
          breadcrumbSchema(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Video Editing Services",
            serviceType: "Video editing",
            url: absoluteUrl("/video-editing"),
            description,
            areaServed: "Worldwide",
            provider: { "@id": `${site.url}/#organization` },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Video editing services",
              itemListElement: list.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, url: absoluteUrl(serviceHref(s.slug)) } })),
            },
          },
          faqSchema(faqs),
        ]}
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40" aria-labelledby="page-title">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="bg-grid mask-radial absolute inset-0 opacity-60" />
          <div className="absolute -top-48 left-1/3 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(207_231_218/0.85),transparent)]" />
        </div>
        <Container>
          <Breadcrumbs items={crumbs} className="fade-late" />
          <div className="mt-10 grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] [&>*]:min-w-0">
            <div>
              <div className="fade-late">
                <Eyebrow>Video Editing</Eyebrow>
              </div>
              <h1 id="page-title" className="mt-5 text-[2.6rem] leading-[1.0] font-semibold tracking-[-0.035em] sm:text-6xl lg:text-[4.4rem]">
                <SplitWords text="Video editing that keeps viewers *watching.*" />
              </h1>
              <p className="fade-late mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl" style={{ ["--delay" as string]: "0.5s" }}>
                Podcasts, YouTube, Shorts, Reels, TikToks, corporate and ad videos — edited for retention, in any language, for
                creators, brands and agencies worldwide. You record, we handle everything else.
              </p>
              <div className="fade-late mt-9 flex flex-wrap gap-3" style={{ ["--delay" as string]: "0.6s" }}>
                <Button href="#free-sample" size="lg">
                  Get a free sample edit
                </Button>
                <Button href="#services" variant="secondary" size="lg" icon={false}>
                  Explore services
                </Button>
              </div>
              <ul className="fade-late mt-9 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-2" style={{ ["--delay" as string]: "0.7s" }}>
                {(podcast.trust ?? []).map((t) => (
                  <li key={t} className="inline-flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-brand-500" aria-hidden="true" /> {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cinematic monitor */}
            <div className="fade-late relative" style={{ ["--delay" as string]: "0.25s" }} aria-hidden="true">
              <div className="absolute -inset-10 -z-10 rounded-full bg-mint/50 blur-3xl" />
              <div className="overflow-hidden rounded-[1.75rem] bg-ink p-3 shadow-lift">
                <div className="flex h-4 gap-2 overflow-hidden px-1">
                  {Array.from({ length: 22 }, (_, i) => (
                    <span key={i} className="h-2.5 w-4 shrink-0 rounded-sm bg-white/15" />
                  ))}
                </div>
                <div className="relative mt-2 aspect-video overflow-hidden rounded-xl bg-[radial-gradient(circle_at_30%_30%,#3d8a72,#163e33_55%,#081a15)]">
                  <div className="absolute inset-[8%] border border-white/25" />
                  {["left-[6%] top-[8%] border-l-2 border-t-2", "right-[6%] top-[8%] border-r-2 border-t-2", "left-[6%] bottom-[8%] border-l-2 border-b-2", "right-[6%] bottom-[8%] border-r-2 border-b-2"].map((c) => (
                    <span key={c} className={`absolute size-6 border-white ${c}`} />
                  ))}
                  <span className="absolute left-[9%] top-[12%] flex items-center gap-1.5 font-mono text-xs text-white">
                    <span className="size-2 rounded-full bg-[#e5533d]" style={{ animation: "blink 1.2s steps(1) infinite" }} /> REC
                  </span>
                  <Timecode className="absolute right-[9%] top-[12%] font-mono text-xs text-white/85" />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-3xl font-semibold tracking-tight text-white/90 sm:text-4xl">
                    Your story<span className="font-light text-mint">.</span>
                  </span>
                  <span className="absolute bottom-[12%] left-[9%] rounded bg-black/40 px-2 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-white">
                    Captions in any language
                  </span>
                </div>
                <div className="mt-3 space-y-1.5 px-1 pb-1">
                  <div className="flex h-7 items-center gap-[2px] overflow-hidden">
                    {Array.from({ length: 64 }, (_, i) => (
                      <span key={i} className="w-full rounded-full bg-mint/70" style={{ height: `${18 + ((i * 41) % 75)}%`, animation: `bar 1.1s ${(i % 8) * 90}ms ease-in-out infinite alternate` }} />
                    ))}
                  </div>
                  <div className="relative flex gap-1">
                    {["w-[18%] bg-brand-400", "w-[26%] bg-mint", "w-[14%] bg-brand-500", "w-[22%] bg-gold/70", "w-[16%] bg-mint/60"].map((c, i) => (
                      <span key={i} className={`h-3.5 rounded ${c}`} />
                    ))}
                    <span className="absolute -top-9 bottom-0 w-px bg-[#e5533d]" style={{ animation: "travel-x 8s linear infinite" }} />
                  </div>
                </div>
              </div>
              <div className="glass absolute -bottom-12 -left-4 hidden items-center gap-3 rounded-2xl p-3 sm:flex animate-float">
                <span className="flex size-9 items-center justify-center rounded-xl bg-brand text-white">
                  <Clapperboard className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-medium">1 episode → 10+ clips</p>
                  <p className="text-xs text-muted">Shorts · Reels · TikTok</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-24 border-t border-line py-20 sm:py-28" aria-labelledby="services-heading">
        <Container>
          <SectionHeading
            eyebrow="What we edit"
            title={
              <span id="services-heading">
                Every format your content <em>needs</em>
              </span>
            }
            lead="From long-form episodes to 15-second hooks — one team, one consistent style across every platform."
          />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((s, i) => (
              <li key={s.slug} data-reveal style={{ ["--d" as string]: (i % 3) * 80 }}>
                <Link
                  href={serviceHref(s.slug)}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-7 transition-all duration-500 ease-premium hover:-translate-y-1 hover:border-brand/25 hover:shadow-lift"
                >
                  <span className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-mint opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-80" />
                  <div className="relative flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-mint-100 text-brand transition-colors duration-500 group-hover:bg-brand group-hover:text-white">
                      <Clapperboard className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs text-soft">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="relative mt-6 text-xl font-semibold transition-colors group-hover:text-brand">{s.title}</h3>
                  <p className="relative mt-3 leading-relaxed text-muted">{s.summary}</p>
                  <span className="relative mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium text-brand">
                    Learn more <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {podcast.offer && <OfferBanner offer={podcast.offer} />}

      {/* Process */}
      <section className="py-20 sm:py-28" aria-labelledby="process-heading">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="How it works"
            title={
              <span id="process-heading">
                You record. <em>We handle the rest.</em>
              </span>
            }
          />
          <ol className="mt-14 grid gap-4 md:grid-cols-4">
            {steps.map((p, i) => (
              <li key={p.title} data-reveal style={{ ["--d" as string]: i * 90 }} className="relative rounded-3xl border border-line bg-white p-7">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-brand font-mono text-sm font-semibold text-white">{i + 1}</span>
                  {i < steps.length - 1 && <span aria-hidden="true" className="hidden h-px flex-1 bg-line-strong md:block" />}
                </div>
                <h3 className="mt-6 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{p.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Tools + why */}
      <section className="bg-paper py-20 sm:py-28" aria-labelledby="why-heading">
        <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Why The Orbit 7"
              title={
                <span id="why-heading">
                  Why creators and brands <em>choose us</em>
                </span>
              }
            />
            <dl data-reveal className="mt-10 grid max-w-md grid-cols-2 gap-4">
              {(podcast.stats ?? []).map((st) => (
                <div key={st.label} className="rounded-2xl border border-line bg-white p-5">
                  <dd className="font-display text-3xl font-semibold tracking-tight text-brand">{st.value}</dd>
                  <dt className="mt-1 text-sm text-muted">{st.label}</dt>
                </div>
              ))}
            </dl>
            <ul className="mt-8 space-y-3">
              {[
                "Retention-focused editing, not random effects",
                "Multilingual editing for clients worldwide, across all time zones",
                "Always on time, with fast and clear communication",
                "Revisions until you're 100% happy",
                "The same consistent style, episode after episode",
                "Built for weekly shows and long-term partnerships",
                "Files kept private and secure",
              ].map((t) => (
                <li key={t} data-reveal className="flex gap-3 text-ink-2">
                  <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                    <svg viewBox="0 0 12 12" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2.5 6.2 5 8.5l4.5-5" /></svg>
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div data-reveal className="relative overflow-hidden rounded-[2rem] bg-sand p-8 sm:p-10">
              <Eyebrow>Software</Eyebrow>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                Industry-standard <em>tools</em>
              </h2>
              <ToolsGrid tools={podcast.tools ?? []} />
            </div>
            <div data-reveal className="mt-6 px-4">
              <ServiceVisual kind="reels" className="mx-auto max-w-md" />
            </div>
          </div>
        </Container>
      </section>

      <FAQ faqs={faqs} eyebrow="Video editing FAQ" lead="Common questions about working with our video editing team." />
      <VideoContact serviceTitle="Video editing" services={services.map((s) => s.title)} />
      <StickySampleButton />
    </>
  );
}
