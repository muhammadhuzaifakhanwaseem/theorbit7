const services = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
      </svg>
    ),
    tag: "01",
    title: "Product Design",
    desc: "Research-driven UX, pixel-perfect UI, and design systems built for scale. We create interfaces that users remember and return to.",
    skills: ["UX Research", "UI Design", "Design Systems", "Prototyping"],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    tag: "02",
    title: "Web Engineering",
    desc: "Full-stack development using modern frameworks. From Next.js frontends to distributed backend systems that handle millions of requests.",
    skills: ["Next.js", "Node.js", "PostgreSQL", "GraphQL"],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    tag: "03",
    title: "Mobile Development",
    desc: "Native iOS/Android and cross-platform apps with Flutter. Buttery-smooth performance with beautiful, platform-native interactions.",
    skills: ["Flutter", "React Native", "iOS", "Android"],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    tag: "04",
    title: "AI & Automation",
    desc: "LLM-powered features, intelligent agents, and workflow automation. We integrate AI meaningfully — not gimmicks, but genuine value.",
    skills: ["LLM Integration", "RAG Systems", "MLOps", "OpenAI"],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
    tag: "05",
    title: "Cloud & DevOps",
    desc: "Infrastructure designed for reliability. CI/CD pipelines, containerization, auto-scaling, and observability at every layer.",
    skills: ["AWS", "Kubernetes", "Docker", "Terraform"],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    tag: "06",
    title: "Product Strategy",
    desc: "Workshop-driven product discovery. We help you define the right problem before writing a single line of code.",
    skills: ["Discovery", "Roadmapping", "GTM Strategy", "Analytics"],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-28 px-6 lg:px-8">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#A8EBC7]/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <div className="tag-mint inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A8EBC7]" />
            Services
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-[56px] tracking-tight text-[#EEF9F2] leading-[1.1] mb-5">
            Everything you need to{" "}
            <span className="gradient-text">ship great software</span>
          </h2>
          <p className="text-[#8AAF97] text-lg leading-relaxed">
            We cover the full stack of product development — from the first whiteboard sketch to production infrastructure and everything in between.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(168,235,199,0.06)] rounded-3xl overflow-hidden">
          {services.map((service, i) => (
            <div
              key={i}
              className="bg-[#080F0B] p-8 lg:p-10 hover:bg-[#0D1A12] transition-all duration-300 group relative overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(168,235,199,0.05) 0%, transparent 70%)"}} />

              <div className="relative z-10">
                {/* Icon + tag row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="service-icon-wrap w-12 h-12 rounded-2xl flex items-center justify-center text-[#A8EBC7]">
                    {service.icon}
                  </div>
                  <span className="font-mono text-xs text-[#8AAF97]/50 font-medium">{service.tag}</span>
                </div>

                <h3 className="font-display font-bold text-xl text-[#EEF9F2] mb-3 group-hover:text-[#A8EBC7] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-[#8AAF97] text-sm leading-relaxed mb-6">
                  {service.desc}
                </p>

                {/* Skill chips */}
                <div className="flex flex-wrap gap-2">
                  {service.skills.map((skill, j) => (
                    <span
                      key={j}
                      className="text-xs px-2.5 py-1 rounded-lg bg-[rgba(168,235,199,0.06)] border border-[rgba(168,235,199,0.1)] text-[#8AAF97] font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
