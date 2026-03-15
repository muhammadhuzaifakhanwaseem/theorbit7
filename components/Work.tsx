const projects = [
  {
    category: "FinTech",
    title: "NovaPay",
    desc: "A cross-border payments platform processing $2M+ daily transactions with real-time FX rates and compliance tooling for 40+ currencies.",
    tags: ["Next.js", "Node.js", "Stripe", "PostgreSQL"],
    metric: "$2M+",
    metricLabel: "daily volume",
    accent: "#A8EBC7",
    size: "large",
  },
  {
    category: "HealthTech",
    title: "Medisync",
    desc: "AI-assisted clinical documentation platform that reduced physician admin time by 60% across 120+ hospitals.",
    tags: ["React Native", "Python", "OpenAI", "AWS"],
    metric: "60%",
    metricLabel: "less admin time",
    accent: "#4ade87",
    size: "small",
  },
  {
    category: "EdTech",
    title: "Learnflow",
    desc: "Adaptive learning platform for corporate training with personalized paths and live cohort sessions.",
    tags: ["Flutter", "GraphQL", "Redis"],
    metric: "200K+",
    metricLabel: "active learners",
    accent: "#86efac",
    size: "small",
  },
  {
    category: "PropTech",
    title: "Estately",
    desc: "A property management SaaS unifying listings, tenant CRM, rent collection, and maintenance requests in one beautiful interface.",
    tags: ["Next.js", "Supabase", "Stripe", "Mapbox"],
    metric: "10K+",
    metricLabel: "properties managed",
    accent: "#A8EBC7",
    size: "large",
  },
];

export default function Work() {
  return (
    <section id="work" className="relative py-28 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <div className="tag-mint inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A8EBC7]" />
              Selected Work
            </div>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-[56px] tracking-tight text-[#EEF9F2] leading-[1.1]">
              Products we're{" "}
              <span className="gradient-text">proud to have built</span>
            </h2>
          </div>
          <a href="#contact" className="btn-outline px-6 py-3 rounded-2xl text-sm shrink-0 self-start md:self-auto">
            See all case studies →
          </a>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[rgba(168,235,199,0.07)] rounded-3xl overflow-hidden">
          {projects.map((project, i) => (
            <div
              key={i}
              className="relative bg-[#080F0B] p-8 lg:p-12 hover:bg-[#0D1A12] transition-all duration-300 group overflow-hidden cursor-pointer"
            >
              {/* Gradient bg accent on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse 50% 50% at 0% 100%, ${project.accent}08 0%, transparent 70%)` }}
              />

              <div className="relative z-10 h-full flex flex-col">
                {/* Category + arrow */}
                <div className="flex items-center justify-between mb-8">
                  <span className="tag-mint px-3 py-1 rounded-full text-xs">{project.category}</span>
                  <div className="w-8 h-8 rounded-full border border-[rgba(168,235,199,0.2)] flex items-center justify-center text-[#8AAF97] group-hover:text-[#A8EBC7] group-hover:border-[rgba(168,235,199,0.4)] transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="font-display font-extrabold text-3xl lg:text-4xl mb-4 text-[#EEF9F2] group-hover:text-[#A8EBC7] transition-colors duration-300"
                >
                  {project.title}
                </h3>

                <p className="text-[#8AAF97] leading-relaxed mb-8 flex-1 text-sm lg:text-base">
                  {project.desc}
                </p>

                {/* Metric */}
                <div className="mb-8 p-4 rounded-2xl bg-[rgba(168,235,199,0.05)] border border-[rgba(168,235,199,0.1)]">
                  <div className="font-display font-extrabold text-3xl gradient-text leading-none mb-1">
                    {project.metric}
                  </div>
                  <div className="text-xs text-[#8AAF97] font-mono uppercase tracking-wider">
                    {project.metricLabel}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, j) => (
                    <span key={j} className="text-xs px-2.5 py-1 rounded-lg bg-[rgba(168,235,199,0.05)] border border-[rgba(168,235,199,0.1)] text-[#8AAF97] font-mono">
                      {tag}
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
