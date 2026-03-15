const steps = [
  {
    num: "01",
    title: "Discovery & Strategy",
    desc: "We begin with deep-dive workshops to understand your users, business goals, and constraints. No assumptions — just rigorous research translated into a clear product vision.",
    duration: "1–2 weeks",
  },
  {
    num: "02",
    title: "Design Sprint",
    desc: "Rapid prototyping and user flows designed to validate ideas before writing a single line of code. We test early so you never pay for the wrong solution.",
    duration: "2–3 weeks",
  },
  {
    num: "03",
    title: "Engineering",
    desc: "Iterative sprints with weekly demos. You're always in the loop. We write clean, tested, documented code that your future engineers will thank us for.",
    duration: "6–16 weeks",
  },
  {
    num: "04",
    title: "Launch & Scale",
    desc: "Zero-downtime deployments, performance monitoring, and a hypercare period post-launch. We don't disappear after shipping — we grow with you.",
    duration: "Ongoing",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative py-28 px-6 lg:px-8 overflow-hidden">
      {/* BG glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#A8EBC7]/4 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: sticky header */}
          <div className="lg:sticky lg:top-32">
            <div className="tag-mint inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A8EBC7]" />
              Our Process
            </div>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-[52px] tracking-tight text-[#EEF9F2] leading-[1.1] mb-6">
              How we turn{" "}
              <span className="gradient-text">ideas into orbit</span>
            </h2>
            <p className="text-[#8AAF97] text-lg leading-relaxed mb-10">
              A proven playbook refined over 7 years and 50+ products. Structured enough to deliver predictably, flexible enough to adapt to your reality.
            </p>

            {/* Progress bar decoration */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-[#8AAF97]">
                <span className="w-16 font-mono">Discovery</span>
                <div className="flex-1 h-px bg-[rgba(168,235,199,0.1)] rounded relative overflow-hidden">
                  <div className="progress-bar absolute inset-y-0 left-0 w-1/4" />
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#8AAF97]">
                <span className="w-16 font-mono">Design</span>
                <div className="flex-1 h-px bg-[rgba(168,235,199,0.1)] rounded relative overflow-hidden">
                  <div className="progress-bar absolute inset-y-0 left-0 w-1/3" />
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#8AAF97]">
                <span className="w-16 font-mono">Build</span>
                <div className="flex-1 h-px bg-[rgba(168,235,199,0.1)] rounded relative overflow-hidden">
                  <div className="progress-bar absolute inset-y-0 left-0 w-3/4" />
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#8AAF97]">
                <span className="w-16 font-mono">Scale</span>
                <div className="flex-1 h-px bg-[rgba(168,235,199,0.1)] rounded relative overflow-hidden">
                  <div className="progress-bar absolute inset-y-0 left-0 w-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: steps */}
          <div className="space-y-px">
            {steps.map((step, i) => (
              <div
                key={i}
                className="group relative bg-[#080F0B] hover:bg-[#0D1A12] transition-colors duration-300 p-8 rounded-3xl mb-3"
                style={{ border: "1px solid rgba(168,235,199,0.07)" }}
              >
                <div className="flex gap-6">
                  {/* Step number */}
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-2xl bg-[rgba(168,235,199,0.07)] border border-[rgba(168,235,199,0.12)] flex items-center justify-center font-mono text-sm font-bold text-[#A8EBC7] group-hover:bg-[rgba(168,235,199,0.12)] transition-colors duration-300">
                      {step.num}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-display font-bold text-lg text-[#EEF9F2] group-hover:text-[#A8EBC7] transition-colors duration-300">
                        {step.title}
                      </h3>
                      <span className="text-xs font-mono text-[#8AAF97] bg-[rgba(168,235,199,0.05)] px-3 py-1 rounded-full border border-[rgba(168,235,199,0.08)]">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-[#8AAF97] text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Connector line (not on last) */}
                {i < steps.length - 1 && (
                  <div className="absolute left-[46px] bottom-[-14px] w-px h-3.5 bg-[rgba(168,235,199,0.15)] z-10 ml-8" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
