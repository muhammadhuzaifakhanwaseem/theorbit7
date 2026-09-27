import Container from "@/components/ui/Container";
import Reveal from "@/components/sections/Reveal";
import { stats } from "@/data/content";

export default function StatsSection() {
  return (
    <section className="border-y border-line bg-surface py-14">
      <Container>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center sm:text-left">
              <p className="font-display text-3xl font-semibold text-brand sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-ink-muted">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
