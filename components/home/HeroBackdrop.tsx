import Image from "next/image";
import officeHero from "@/assets/images/office-hero.jpg";

/**
 * Photographic backdrop for the homepage hero: The Orbit 7 studio.
 * The image keeps its calm, bright left side behind the headline; veils keep
 * the light theme and the copy crisp on every screen size.
 */
export default function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      <Image
        src={officeHero}
        alt=""
        fill
        priority
        fetchPriority="high"
        placeholder="blur"
        quality={80}
        sizes="100vw"
        className="object-cover object-[72%_50%] lg:object-[center_45%]"
      />
      {/* Mobile: text spans the full width, so an even wash. */}
      <div className="absolute inset-0 bg-paper/[0.82] lg:hidden" />
      {/* Desktop: solid behind the copy, the studio opens up on the right. */}
      <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,var(--paper)_0%,rgb(251_251_249/0.94)_32%,rgb(251_251_249/0.5)_56%,rgb(251_251_249/0.04)_100%)] lg:block" />
      {/* Soft fade under the glass header and into the marquee. */}
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-paper/85 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-paper to-transparent" />
    </div>
  );
}
