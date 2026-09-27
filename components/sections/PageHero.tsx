import Container from "@/components/ui/Container";
import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";
import Button from "@/components/ui/Button";

export default function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  primaryLabel = "Get A Call Now",
  primaryHref = "/contact-us",
}: {
  eyebrow?: string;
  title: string;
  description: string;
  breadcrumbs: Crumb[];
  primaryLabel?: string;
  primaryHref?: string;
}) {
  return (
    <section className="border-b border-line bg-surface-dark text-white">
      <Container>
        <Breadcrumbs items={breadcrumbs} dark />
        <div className="max-w-3xl pb-16 pt-6 sm:pb-24 sm:pt-10">
          {eyebrow && (
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-white/70">
              {eyebrow}
            </p>
          )}
          <h1 className="font-display text-3xl font-semibold leading-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            {description}
          </p>
          <div className="mt-8">
            <Button href={primaryHref} variant="secondary" size="lg">
              {primaryLabel}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
