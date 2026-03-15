export default function CTA() {
  return (
    <section id="contact" className="relative py-28 px-6 lg:px-8 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 hero-grid opacity-50 pointer-events-none" style={{background: "linear-gradient(rgba(168,235,199,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(168,235,199,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px"}} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#1A3D2B]/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-[#A8EBC7]/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <div className="tag-mint inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A8EBC7] animate-pulse" />
            Currently accepting projects
          </div>

          <h2 className="font-display font-extrabold text-5xl md:text-6xl lg:text-[72px] tracking-tight leading-[1.05] text-[#EEF9F2] mb-6">
            Ready to enter{" "}
            <span className="gradient-text">the orbit?</span>
          </h2>
          <p className="text-[#8AAF97] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Tell us about your project. We'll get back to you within 24 hours with initial thoughts, no strings attached.
          </p>
        </div>

        {/* Contact card */}
        <div className="glass-card rounded-3xl p-8 lg:p-12 bg-[#0D1A12] border border-[rgba(168,235,199,0.1)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: form */}
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#8AAF97] uppercase tracking-wider mb-2">First Name</label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full bg-[rgba(168,235,199,0.04)] border border-[rgba(168,235,199,0.1)] rounded-xl px-4 py-3 text-sm text-[#EEF9F2] placeholder-[#8AAF97]/50 focus:outline-none focus:border-[rgba(168,235,199,0.35)] transition-colors font-body"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#8AAF97] uppercase tracking-wider mb-2">Last Name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full bg-[rgba(168,235,199,0.04)] border border-[rgba(168,235,199,0.1)] rounded-xl px-4 py-3 text-sm text-[#EEF9F2] placeholder-[#8AAF97]/50 focus:outline-none focus:border-[rgba(168,235,199,0.35)] transition-colors font-body"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono text-[#8AAF97] uppercase tracking-wider mb-2">Email</label>
                <input
                  type="email"
                  placeholder="john@company.com"
                  className="w-full bg-[rgba(168,235,199,0.04)] border border-[rgba(168,235,199,0.1)] rounded-xl px-4 py-3 text-sm text-[#EEF9F2] placeholder-[#8AAF97]/50 focus:outline-none focus:border-[rgba(168,235,199,0.35)] transition-colors font-body"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-[#8AAF97] uppercase tracking-wider mb-2">Budget Range</label>
                <select className="w-full bg-[rgba(168,235,199,0.04)] border border-[rgba(168,235,199,0.1)] rounded-xl px-4 py-3 text-sm text-[#8AAF97] focus:outline-none focus:border-[rgba(168,235,199,0.35)] transition-colors font-body appearance-none">
                  <option value="">Select budget</option>
                  <option>$10K – $30K</option>
                  <option>$30K – $80K</option>
                  <option>$80K – $200K</option>
                  <option>$200K+</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono text-[#8AAF97] uppercase tracking-wider mb-2">Tell us about your project</label>
                <textarea
                  rows={4}
                  placeholder="What are you building? What problem does it solve? What's the timeline?"
                  className="w-full bg-[rgba(168,235,199,0.04)] border border-[rgba(168,235,199,0.1)] rounded-xl px-4 py-3 text-sm text-[#EEF9F2] placeholder-[#8AAF97]/50 focus:outline-none focus:border-[rgba(168,235,199,0.35)] transition-colors resize-none font-body"
                />
              </div>
              <button className="btn-primary w-full py-4 rounded-2xl text-base font-display font-semibold">
                Send Message →
              </button>
            </div>

            {/* Right: info */}
            <div className="flex flex-col justify-between gap-8">
              <div>
                <h3 className="font-display font-bold text-xl text-[#EEF9F2] mb-4">Or reach us directly</h3>
                <div className="space-y-4">
                  {[
                    { label: "Email", value: "hello@theorbit7.com", icon: "✉" },
                    { label: "Calendly", value: "Book a 30-min call", icon: "📅" },
                    { label: "Response time", value: "Within 24 hours", icon: "⚡" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-[rgba(168,235,199,0.04)] border border-[rgba(168,235,199,0.08)]">
                      <div className="w-10 h-10 rounded-xl bg-[rgba(168,235,199,0.08)] flex items-center justify-center text-base">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-xs font-mono text-[#8AAF97] uppercase tracking-wider">{item.label}</div>
                        <div className="text-sm font-medium text-[#EEF9F2]">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[rgba(168,235,199,0.05)] border border-[rgba(168,235,199,0.1)]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-[#A8EBC7] animate-pulse" />
                  <span className="text-xs font-mono text-[#8AAF97] uppercase tracking-wider">Available now</span>
                </div>
                <p className="text-[#EEF9F2] text-sm font-body leading-relaxed">
                  We have capacity for <span className="text-[#A8EBC7] font-semibold">2 new projects</span> starting Q2 2025. Slots fill fast — let's talk soon.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
