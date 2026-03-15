const stats = [
  { number: "50+", label: "Projects Shipped", desc: "From MVPs to enterprise platforms" },
  { number: "7+", label: "Years in Business", desc: "Consistent quality across the years" },
  { number: "98%", label: "Client Retention", desc: "They always come back" },
  { number: "12", label: "Countries Served", desc: "Global clients, global thinking" },
];

export default function Stats() {
  return (
    <section className="relative py-28 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(168,235,199,0.08)] rounded-3xl overflow-hidden">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-[#080F0B] px-8 py-10 lg:py-14 hover:bg-[#0D1A12] transition-colors duration-300 group"
            >
              <div className="font-display font-extrabold text-5xl lg:text-6xl gradient-text mb-2 group-hover:scale-105 transition-transform duration-300 origin-left">
                {stat.number}
              </div>
              <div className="font-display font-semibold text-[#EEF9F2] text-base mb-1.5">
                {stat.label}
              </div>
              <div className="text-sm text-[#8AAF97] font-body leading-relaxed">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
