export default function Marquee() {
  const tech = [
    "React", "Next.js", "TypeScript", "Node.js", "Python", "Flutter",
    "AWS", "Kubernetes", "PostgreSQL", "GraphQL", "Figma", "TailwindCSS",
    "React Native", "Go", "Redis", "Stripe", "OpenAI", "Docker",
  ];

  return (
    <div className="relative py-12 overflow-hidden border-y border-[rgba(168,235,199,0.06)]">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#080F0B] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#080F0B] to-transparent pointer-events-none" />

      <div className="flex gap-0 marquee-track whitespace-nowrap">
        {[...tech, ...tech].map((item, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-3 px-6 text-sm font-mono font-medium text-[#8AAF97] shrink-0"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#A8EBC7]/40 shrink-0" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
