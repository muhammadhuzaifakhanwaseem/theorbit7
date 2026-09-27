import { Award } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/sections/Reveal";
import { awards } from "@/data/content";

export default function Awards() {
  return (
    <section className="py-16">
      <Container>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {awards.map((award, i) => (
            <Reveal key={award.title} delay={i * 0.06}>
              <div className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand">
                  <Award className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{award.title}</p>
                  <p className="text-xs text-ink-soft">{award.issuer} · {award.year}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
