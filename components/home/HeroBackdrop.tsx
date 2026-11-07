import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

/**
 * Optional photographic backdrop for the homepage hero.
 *
 * Drop ONE file into `public/hero/` named `office.(avif|webp|jpg|jpeg|png)` —
 * ideally ≥ 2560px wide, 16:9 or wider, with the busiest part of the scene on
 * the right half (the headline sits on the left). Next.js serves it as
 * responsive AVIF/WebP automatically. With no file present the hero keeps its
 * original light gradient atmosphere, so nothing breaks.
 *
 * Mobile framing: tune `MOBILE_FOCUS` (CSS object-position) to keep the
 * signage / team in view on narrow screens.
 */
const CANDIDATES = ["office.avif", "office.webp", "office.jpg", "office.jpeg", "office.png"];
const MOBILE_FOCUS = "70% 40%";
const DESKTOP_FOCUS = "center 40%";

export const HERO_ALT =
  "The Orbit 7 studio: developers, video editors and marketers at work in a bright, modern office";

function findHeroImage(): string | null {
  const dir = path.join(process.cwd(), "public", "hero");
  for (const name of CANDIDATES) {
    if (fs.existsSync(path.join(dir, name))) return `/hero/${name}`;
  }
  return null;
}

export default function HeroBackdrop() {
  const src = findHeroImage();
  if (!src) return null;

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      <Image
        src={src}
        alt=""
        fill
        priority
        fetchPriority="high"
        quality={78}
        sizes="100vw"
        className="object-cover [object-position:var(--focus-m)] lg:[object-position:var(--focus-d)]"
        style={{ ["--focus-m" as string]: MOBILE_FOCUS, ["--focus-d" as string]: DESKTOP_FOCUS }}
      />
      {/* Readability veils: keep the light theme and a crisp headline. */}
      {/* Mobile: text spans the full width, so an even wash. */}
      <div className="absolute inset-0 bg-paper/[0.86] lg:hidden" />
      {/* Desktop: solid behind the copy, photo opens up on the right. */}
      <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,var(--paper)_0%,rgb(251_251_249/0.94)_34%,rgb(251_251_249/0.62)_58%,rgb(251_251_249/0.28)_100%)] lg:block" />
      {/* Soft top fade under the glass header, bottom fade into the marquee. */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-paper/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-paper to-transparent" />
      {/* A whisper of brand green so the photo sits inside the palette. */}
      <div className="absolute inset-0 bg-brand/[0.04] mix-blend-multiply" />
    </div>
  );
}
