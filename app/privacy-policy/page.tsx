import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How The Orbit 7 collects, uses, and protects your information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="Last updated September 2026."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />
      <section className="py-20 sm:py-28">
        <Container className="max-w-3xl space-y-8 text-sm leading-relaxed text-ink-muted sm:text-base">
          <p>
            This Privacy Policy explains how The Orbit 7 (&quot;we&quot;, &quot;us&quot;) collects, uses, and
            protects information when you use theorbit7.com or engage us for services.
          </p>
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">Information we collect</h2>
            <p className="mt-3">
              We collect information you provide directly, such as your name, email, phone
              number, and project details submitted through our contact form, along with basic
              usage data collected via analytics tools when you browse our site.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">How we use information</h2>
            <p className="mt-3">
              We use the information you provide to respond to inquiries, scope potential
              engagements, deliver contracted services, and improve our website. We do not sell
              personal information to third parties.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">Data retention</h2>
            <p className="mt-3">
              We retain contact form submissions and client project data for as long as necessary
              to fulfill the purposes described in this policy, or as required by law.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">Your rights</h2>
            <p className="mt-3">
              Depending on your location, you may have the right to access, correct, or delete
              your personal information. Contact privacy@theorbit7.com to exercise these rights.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">Contact</h2>
            <p className="mt-3">
              Questions about this policy can be directed to privacy@theorbit7.com.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
