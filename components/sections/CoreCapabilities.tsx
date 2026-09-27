import {
  Compass,
  PenTool,
  Code2,
  BrainCircuit,
  Workflow,
  Cloud,
  TrendingUp,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/sections/Reveal";

const capabilities = [
  { icon: Compass, title: "Product Strategy", description: "Scoping, roadmapping, and validating the right thing to build before engineering starts." },
  { icon: PenTool, title: "UI/UX Design", description: "Research-led interfaces that balance brand ambition with everyday usability." },
  { icon: Code2, title: "Software Engineering", description: "Mobile, web, and backend systems built on architecture designed to last." },
  { icon: BrainCircuit, title: "AI Engineering", description: "Practical AI features, agents, and models integrated into real products." },
  { icon: Workflow, title: "Automation", description: "Workflow and process automation that removes manual work at the source." },
  { icon: Cloud, title: "Cloud & Backend", description: "Scalable infrastructure, APIs, and data architecture built for growth." },
  { icon: TrendingUp, title: "Product Scaling", description: "Post-launch iteration grounded in real usage data, not guesswork." },
];

export default function CoreCapabilities() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Capabilities"
          title="Core capabilities behind modern digital products"
          description="Every engagement draws from the same set of disciplines, combined differently depending on what you're building."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((cap, i) => (
            <Reveal key={cap.title} delay={i * 0.06}>
              <div className="group h-full rounded-2xl border border-line bg-white p-6 transition-colors hover:border-brand">
                <div className="flex size-11 items-center justify-center rounded-xl bg-brand-tint text-brand">
                  <cap.icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-display text-base font-semibold text-ink">
                  {cap.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {cap.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
