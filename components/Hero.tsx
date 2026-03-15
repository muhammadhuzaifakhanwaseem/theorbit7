"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      const planet = container.querySelector(".hero-planet") as HTMLElement;
      if (planet) {
        planet.style.transform = `translate(${x * 15}px, ${y * 10}px)`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-grid"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 hero-gradient pointer-events-none" style={{background: "radial-gradient(ellipse 80% 70% at 50% -10%, rgba(168,235,199,0.18) 0%, transparent 65%)"}} />
      
      {/* Orbital decorative rings */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        {/* Outer ring */}
        <div className="absolute w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(168,235,199,0.06)] left-1/2 top-1/2" />
        <div className="absolute w-[520px] h-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(168,235,199,0.08)] left-1/2 top-1/2" />
        <div className="absolute w-[350px] h-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(168,235,199,0.12)] left-1/2 top-1/2" />
        
        {/* Orbiting dot 1 */}
        <div className="absolute left-1/2 top-1/2 w-0 h-0">
          <div className="orbit-dot w-3 h-3 rounded-full bg-[#A8EBC7] shadow-[0_0_12px_rgba(168,235,199,0.8)]" style={{marginLeft: '-6px', marginTop: '-6px'}} />
        </div>
        {/* Orbiting dot 2 */}
        <div className="absolute left-1/2 top-1/2 w-0 h-0">
          <div className="orbit-dot-2 w-2 h-2 rounded-full bg-[#4ade87] shadow-[0_0_8px_rgba(74,222,135,0.8)]" style={{marginLeft: '-4px', marginTop: '-4px'}} />
        </div>
      </div>

      {/* Blurred glow spots */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-[#A8EBC7]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-[#1A3D2B]/40 rounded-full blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center py-32 md:py-40">
        {/* Pill badge */}
        <div className="inline-flex items-center gap-2.5 tag-mint px-4 py-2 rounded-full mb-8 opacity-0 animate-fade-up delay-100">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A8EBC7] animate-pulse" />
          <span>Available for new projects in 2025</span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-extrabold tracking-tight mb-6 opacity-0 animate-fade-up delay-200">
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[88px] leading-[1.0] text-[#EEF9F2] mb-2">
            We Build Software
          </span>
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[88px] leading-[1.0]">
            That{" "}
            <span className="gradient-text mint-glow-text">Orbits</span>
          </span>
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[88px] leading-[1.0] text-[#EEF9F2]">
            the Extraordinary
          </span>
        </h1>

        {/* Subtext */}
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-[#8AAF97] font-body font-light leading-relaxed mb-10 opacity-0 animate-fade-up delay-300">
          From product strategy to pixel-perfect execution — we partner with ambitious teams to create software that defines categories and sets new standards.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 opacity-0 animate-fade-up delay-400">
          <a
            href="#contact"
            className="btn-primary px-8 py-4 rounded-2xl text-base font-display font-semibold w-full sm:w-auto"
          >
            Start a Project →
          </a>
          <a
            href="#work"
            className="btn-outline px-8 py-4 rounded-2xl text-base w-full sm:w-auto"
          >
            View Our Work
          </a>
        </div>

        {/* Social proof row */}
        <div className="flex flex-wrap items-center justify-center gap-8 opacity-0 animate-fade-up delay-500">
          <div className="flex items-center gap-2.5">
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1F4A34] to-[#1A3D2B] border-2 border-[#080F0B] flex items-center justify-center text-[10px] font-display font-bold text-[#A8EBC7]">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span className="text-sm text-[#8AAF97]"><span className="text-[#EEF9F2] font-semibold">50+</span> happy clients</span>
          </div>
          <div className="w-px h-6 bg-[rgba(168,235,199,0.15)]" />
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => (
                <svg key={i} className="w-4 h-4 text-[#A8EBC7]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-[#8AAF97]"><span className="text-[#EEF9F2] font-semibold">5.0</span> avg. rating</span>
          </div>
          <div className="w-px h-6 bg-[rgba(168,235,199,0.15)] hidden sm:block" />
          <div className="text-sm text-[#8AAF97]"><span className="text-[#EEF9F2] font-semibold">7+ years</span> in the orbit</div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-xs font-mono text-[#8AAF97] tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[rgba(168,235,199,0.4)] to-transparent animate-pulse" />
      </div>
    </section>
  );
}
