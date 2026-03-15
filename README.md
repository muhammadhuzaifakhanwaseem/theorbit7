# The Orbit 7 — Landing Page

A professional Next.js 14 landing page for **The Orbit 7** software house.

## Tech Stack

- **Next.js 14** with App Router
- **TypeScript**
- **Tailwind CSS**
- **Preline UI** (via CDN + plugin)
- **Google Fonts** — Syne (display), DM Sans (body), JetBrains Mono (code)

## Color System

Derived from the brand logo:

| Token | Value | Usage |
|-------|-------|-------|
| Mint `#A8EBC7` | Primary accent, gradients, glows |
| Forest `#1A3D2B` | Dark brand green |
| BG `#080F0B` | Page background |
| Surface `#0D1A12` | Cards, sections |
| Text primary `#EEF9F2` | Headings, body |
| Text secondary `#8AAF97` | Muted text, labels |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
orbit7/
├── app/
│   ├── globals.css       # Global styles, animations, design tokens
│   ├── layout.tsx        # Root layout with fonts + Preline
│   └── page.tsx          # Main page assembling all sections
├── components/
│   ├── Navbar.tsx        # Sticky navbar with scroll blur
│   ├── Hero.tsx          # Hero with orbital animation
│   ├── Marquee.tsx       # Tech stack scrolling strip
│   ├── Stats.tsx         # Key metrics grid
│   ├── Services.tsx      # 6-service grid
│   ├── Work.tsx          # Portfolio case studies
│   ├── Process.tsx       # 4-step process
│   ├── Testimonials.tsx  # Client quotes
│   ├── CTA.tsx           # Contact form + info
│   └── Footer.tsx        # Links + social
├── public/
│   └── logo.png          # Brand logo
├── tailwind.config.ts
├── next.config.js
└── package.json
```

## Sections

1. **Navbar** — Sticky, blurs on scroll, mobile hamburger menu
2. **Hero** — Full-screen with orbital rings, animated dots, mouse-parallax planet
3. **Marquee** — Infinite scrolling tech stack strip
4. **Stats** — 4 key metrics in a grid
5. **Services** — 6 service cards (design, web, mobile, AI, cloud, strategy)
6. **Work** — 4 featured case studies with metrics
7. **Process** — 4-step discovery → launch flow
8. **Testimonials** — 3 client quotes
9. **Contact** — Form + direct contact info
10. **Footer** — Links, social, brand

## Customization

- Update colors in `tailwind.config.ts` and `globals.css` CSS variables
- Replace placeholder project data in `Work.tsx`
- Replace testimonials in `Testimonials.tsx`
- Update contact email / Calendly link in `CTA.tsx`
- Replace `public/logo.png` with your production logo

## Production Build

```bash
npm run build
npm start
```
