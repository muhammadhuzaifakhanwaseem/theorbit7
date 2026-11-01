import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import BookCallButton from "@/components/booking/BookCallButton";
import ServiceVisual from "@/components/visuals/ServiceVisual";
import type { VisualKind } from "@/data/services/types";
import { MapPin } from "lucide-react";

export default function LocalHero({
  eyebrow,
  h1,
  lead,
  crumbs,
  visual,
  tags,
  place,
}: {
  eyebrow: string;
  h1: string;
  lead: string;
  crumbs: { name: string; path: string }[];
  visual: VisualKind;
  tags: string[];
  place: string;
}) {
  return (
    <section className="relative isolate overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40" aria-labelledby="page-title">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="bg-grid mask-radial absolute inset-0 opacity-60" />
        <div className="absolute -left-40 -top-40 size-[40rem] rounded-full bg-mint/70 blur-[110px]" />
        <div className="absolute -right-20 bottom-0 size-[26rem] rounded-full bg-sand blur-3xl" />
      </div>
      <Container>
        <Breadcrumbs items={crumbs} className="fade-late" />
        <div className="mt-10 grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          <div>
            <div className="fade-late flex flex-wrap items-center gap-3">
              <Eyebrow>{eyebrow}</Eyebrow>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-xs text-ink-2 ring-1 ring-line">
                <MapPin className="size-3.5 text-brand" aria-hidden="true" /> Serving {place}
              </span>
            </div>
            <h1
              id="page-title"
              className="fade-late mt-5 text-[2.4rem] leading-[1.03] font-semibold tracking-[-0.032em] sm:text-6xl lg:text-[3.9rem]"
              style={{ ["--delay" as string]: "0.12s" }}
            >
              {h1}
            </h1>
            <p className="fade-late mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl" style={{ ["--delay" as string]: "0.3s" }}>
              {lead}
            </p>
            <div className="fade-late mt-9 flex flex-wrap gap-3" style={{ ["--delay" as string]: "0.42s" }}>
              <BookCallButton size="lg">Book a free consultation</BookCallButton>
              <Button href="/contact-us" variant="secondary" size="lg" icon={false}>
                Send an enquiry
              </Button>
            </div>
          </div>
          <div className="fade-late px-4 sm:px-8" style={{ ["--delay" as string]: "0.25s" }}>
            <ServiceVisual kind={visual} tags={tags} className="mx-auto max-w-lg" />
          </div>
        </div>
      </Container>
    </section>
  );
}
