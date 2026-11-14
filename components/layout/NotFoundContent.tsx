import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";

/** Branded "Lost in orbit" 404 content (page chrome comes from the surrounding layout). */
export default function NotFoundContent() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden pt-32 pb-20">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="bg-grid mask-radial absolute inset-0 opacity-60" />
        <div className="absolute left-1/2 top-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 animate-spin-slower rounded-full border border-dashed border-brand/20">
          <span className="absolute -top-2 left-1/2 size-4 rounded-full bg-brand-500" />
        </div>
      </div>
      <Container className="text-center">
        <Eyebrow className="justify-center">Error 404</Eyebrow>
        <h1 className="mt-5 text-5xl font-semibold sm:text-7xl">
          Lost in <em>orbit.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-muted">
          The page you are looking for has moved or no longer exists. Let&apos;s
          get you back on course.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/services" variant="secondary">
            Explore services
          </Button>
        </div>
      </Container>
    </section>
  );
}
