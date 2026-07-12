import { SpotlightCard } from "@/components/ui/spotlight-card"
/* ------------------------------------------------------------------ */
/* WhatsApp CTA helpers — The Orbit 7                                 */
/* Contact: Rijab · +92 310 0301826                                   */
/* wa.me works on desktop (WhatsApp Web) and mobile (WhatsApp app)    */
/* ------------------------------------------------------------------ */

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Image Background Layer */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/banner.jpeg')" }} // Yahan apni image ka path dein
      >
        {/* Overlay - Image ke upar dark filter taake text saaf dikhe */}
        <div className="absolute inset-0 bg-white/60" />
      </div>

      {/* Content Layer */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col justify-center items-center text-center h-screen">
        <div className="max-w-4xl">

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black leading-[1.1]">
            We Engineer Digital Products
            <span className="block text-emerald-600 mt-2">That Grow Your Business</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-800 max-w-4xl">
            The Orbit 7 is a full-stack digital agency delivering custom web development,
            mobile apps, and SEO-driven growth. Let's build your next big thing.
          </p>

          <div className="mt-10">
            <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-lg shadow-emerald-600/20 transition-all hover:scale-105">
              Start Your Project →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}