import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center justify-center py-28">
      <Container className="max-w-xl text-center">
        <p className="font-display text-sm font-medium text-brand">404</p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-muted">
          The page you&apos;re looking for may have moved or no longer exists. Try heading back
          to the homepage, or browse our services and case studies below.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="/">Back to homepage</Button>
          <Link href="/site-map" className="text-sm font-medium text-ink-muted hover:text-brand">
            View full sitemap
          </Link>
        </div>
      </Container>
    </section>
  );
}
