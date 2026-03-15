const testimonials = [
  {
    quote: "The Orbit 7 didn't just build what we asked for — they challenged our assumptions, improved the architecture, and delivered something far better. Our app launched to 50K users without a hiccup.",
    name: "Sarah Chen",
    role: "CTO, NovaPay",
    initials: "SC",
  },
  {
    quote: "Working with this team felt like having a world-class internal engineering org. They communicate daily, hit every milestone, and the code quality is exceptional. We've renewed our contract three times.",
    name: "Marcus Okonkwo",
    role: "VP Product, Medisync",
    initials: "MO",
  },
  {
    quote: "They took our rough product idea, pushed back on the parts that didn't make sense, and shipped a polished MVP in 8 weeks. Raised our seed round two months later. I credit them heavily.",
    name: "Priya Nair",
    role: "Founder, Learnflow",
    initials: "PN",
  },
];

export default function Testimonials() {
  return (
    <section id="about" className="relative py-28 px-6 lg:px-8">
      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#A8EBC7]/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="tag-mint inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A8EBC7]" />
            Client Stories
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-[52px] tracking-tight text-[#EEF9F2] leading-[1.1]">
            Don't take our word for it
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[rgba(168,235,199,0.07)] rounded-3xl overflow-hidden">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="glass-card bg-[#080F0B] p-8 lg:p-10 hover:bg-[#0D1A12] transition-all duration-300 group"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[1,2,3,4,5].map(j => (
                  <svg key={j} className="w-4 h-4 text-[#A8EBC7]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote mark */}
              <div className="text-4xl font-display font-black text-[rgba(168,235,199,0.2)] leading-none mb-4 -mt-2">"</div>

              <blockquote className="text-[#EEF9F2] text-base leading-relaxed mb-8 flex-1">
                {t.quote}
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-6 border-t border-[rgba(168,235,199,0.08)]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1F4A34] to-[#1A3D2B] border border-[rgba(168,235,199,0.2)] flex items-center justify-center font-display font-bold text-sm text-[#A8EBC7]">
                  {t.initials}
                </div>
                <div>
                  <div className="font-display font-semibold text-[#EEF9F2] text-sm">{t.name}</div>
                  <div className="text-xs text-[#8AAF97] font-mono">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
