import Container from "@/components/ui/Container";
import PageHero from "@/components/sections/PageHero";
import JsonLd from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export default function LegalPage({
  title,
  heroTitle,
  path,
  updated,
  intro,
  sections,
}: {
  title: string;
  heroTitle: string;
  path: string;
  updated: string;
  intro: string;
  sections: { h: string; p: string[] }[];
}) {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: title, path },
  ];
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero eyebrow="Legal" title={heroTitle} lead={`Last updated ${updated}.`} crumbs={crumbs} />
      <section className="border-t border-line py-16 sm:py-24">
        <Container className="max-w-3xl">
          <p className="text-lg leading-relaxed text-ink-2">{intro}</p>
          <div className="mt-12 space-y-10">
            {sections.map((s, i) => (
              <div key={s.h}>
                <h2 className="flex items-baseline gap-3 text-2xl font-semibold">
                  <span className="font-mono text-sm text-brand-500">{String(i + 1).padStart(2, "0")}</span>
                  {s.h}
                </h2>
                {s.p.map((p, j) => (
                  <p key={j} className="mt-3 leading-relaxed text-muted">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
