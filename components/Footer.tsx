import Image from "next/image";

const footerLinks = {
  Services: ["Web Development", "Mobile Apps", "AI & Automation", "Cloud & DevOps", "Product Design"],
  Company: ["About Us", "Careers", "Blog", "Press Kit", "Privacy Policy"],
  Connect: ["Twitter / X", "LinkedIn", "GitHub", "Dribbble"],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-[rgba(168,235,199,0.08)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-3 group mb-6 w-fit">
              <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-[#1A3D2B]/60 border border-[rgba(168,235,199,0.15)] p-1">
                <Image src="/logo.png" alt="The Orbit 7" width={36} height={36} className="object-contain scale-125" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-700 text-[0.65rem] tracking-[0.2em] uppercase text-[#8AAF97]">The</span>
                <span className="font-display font-bold text-lg tracking-tight text-[#EEF9F2] leading-none">Orbit 7</span>
              </div>
            </a>
            <p className="text-[#8AAF97] text-sm leading-relaxed max-w-xs mb-6">
              A software house building exceptional digital products for startups and enterprises. Based in the clouds, working globally.
            </p>
            <div className="flex gap-3">
              {["𝕏", "in", "gh", "db"].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl border border-[rgba(168,235,199,0.12)] flex items-center justify-center text-[#8AAF97] hover:text-[#A8EBC7] hover:border-[rgba(168,235,199,0.3)] hover:bg-[rgba(168,235,199,0.05)] transition-all duration-300 text-xs font-mono font-bold"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="font-display font-semibold text-[#EEF9F2] text-sm mb-5 tracking-wide">
                {group}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#8AAF97] hover:text-[#A8EBC7] transition-colors duration-200 font-body"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="divider mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#8AAF97] font-mono">
            © {new Date().getFullYear()} The Orbit 7. All rights reserved.
          </p>
          <p className="text-xs text-[#8AAF97]/50 font-mono">
            Crafted with precision · Deployed to infinity
          </p>
        </div>
      </div>
    </footer>
  );
}
