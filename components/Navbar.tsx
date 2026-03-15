"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "nav-blur bg-[#080F0B]/80 border-b border-[rgba(168,235,199,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-[#1A3D2B]/60 border border-[rgba(168,235,199,0.15)] p-1 group-hover:border-[rgba(168,235,199,0.3)] transition-all duration-300">
              <Image
                src="/logo.png"
                alt="The Orbit 7"
                width={36}
                height={36}
                className="object-contain scale-125"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-700 text-[0.65rem] tracking-[0.2em] uppercase text-[#8AAF97]">The</span>
              <span className="font-display font-bold text-lg tracking-tight text-[#EEF9F2] leading-none">Orbit 7</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-body font-medium text-[#8AAF97] hover:text-[#EEF9F2] transition-colors duration-200 rounded-lg hover:bg-[rgba(168,235,199,0.05)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              className="btn-primary px-5 py-2.5 rounded-xl text-sm font-display font-semibold"
            >
              Start a Project
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg border border-[rgba(168,235,199,0.15)] text-[#A8EBC7] hover:bg-[rgba(168,235,199,0.07)] transition-colors"
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-6 border-t border-[rgba(168,235,199,0.08)] mt-0 pt-4">
            <nav className="flex flex-col gap-1 mb-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-body font-medium text-[#8AAF97] hover:text-[#EEF9F2] transition-colors rounded-lg hover:bg-[rgba(168,235,199,0.05)]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <a href="#contact" className="btn-primary block text-center px-5 py-3 rounded-xl text-sm font-display font-semibold">
              Start a Project
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
