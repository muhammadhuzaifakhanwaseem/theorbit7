import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms and conditions governing the use of theorbit7.com and The Orbit 7's services.",
  alternates: { canonical: "/terms-of-use" },
};

export default function TermsOfUsePage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        description="Last updated September 2026."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms of Use" }]}
      />
      <section className="py-20 sm:py-28">
        <Container className="max-w-3xl space-y-8 text-sm leading-relaxed text-ink-muted sm:text-base">
          <p>
            These Terms of Use govern your access to and use of theorbit7.com. By using this
            site, you agree to these terms.
          </p>
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">Use of this site</h2>
            <p className="mt-3">
              This website is provided for informational purposes about The Orbit 7&apos;s
              services. Content may not be copied or redistributed without written permission.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">Service engagements</h2>
            <p className="mt-3">
              Any actual services provided by The Orbit 7 are governed by a separate signed
              statement of work or master services agreement, which takes precedence over the
              general descriptions found on this website.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">Intellectual property</h2>
            <p className="mt-3">
              All content on this site, including text, graphics, and logos, is the property of
              The Orbit 7 unless otherwise noted.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">Limitation of liability</h2>
            <p className="mt-3">
              This website is provided &quot;as is&quot; without warranties of any kind. The Orbit 7 is
              not liable for any damages arising from your use of this site.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">Contact</h2>
            <p className="mt-3">Questions about these terms can be sent to legal@theorbit7.com.</p>
          </div>
        </Container>
      </section>
    </>
  );
}
