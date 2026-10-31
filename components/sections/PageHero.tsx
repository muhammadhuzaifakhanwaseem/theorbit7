import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SplitWords from "@/components/ui/SplitWords";

export default function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
}: {
  eyebrow: string;
  /** Use *asterisks* around words for the serif accent. */
  title: string;
  lead: string;
  crumbs: { name: string; path: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40" aria-labelledby="page-title">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="bg-grid mask-radial absolute inset-0 opacity-60" />
        <div className="absolute -top-56 left-1/2 h-[36rem] w-[64rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(207_231_218/0.85),transparent)]" />
        <div className="absolute -right-24 top-24 size-[22rem] animate-spin-slower rounded-full border border-dashed border-brand/15" />
        <div className="absolute -right-6 top-44 size-[14rem] animate-spin-rev rounded-full border border-brand/10">
          <span className="absolute -left-1.5 top-1/2 size-3 rounded-full bg-brand-500" />
        </div>
      </div>
      <Container>
        <Breadcrumbs items={crumbs} className="fade-late" />
        <div className="mt-10 max-w-4xl">
          <div className="fade-late" style={{ ["--delay" as string]: "0.05s" }}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <h1 id="page-title" className="mt-5 text-[2.6rem] leading-[1.0] font-semibold tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            <SplitWords text={title} />
          </h1>
          <p className="fade-late mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl" style={{ ["--delay" as string]: "0.55s" }}>
            {lead}
          </p>
          {children && (
            <div className="fade-late mt-9" style={{ ["--delay" as string]: "0.7s" }}>
              {children}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
