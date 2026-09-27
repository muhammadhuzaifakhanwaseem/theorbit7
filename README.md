# The Orbit 7 — theorbit7.com

A production-ready marketing website for **The Orbit 7**, a digital product studio. Built with
Next.js (App Router), TypeScript, Tailwind CSS v4, and Framer Motion, following the layout system,
navigation architecture, and page coverage described in the project brief (mega-menu services,
industry/location/service landing pages, blog, portfolio, and full company pages).

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Production build

```bash
npm run build
npm run start
```

The build is fully static/SSG where possible: all 33 service pages, 10 industry pages,
7 location pages, 6 portfolio case studies, and 6 blog posts are pre-rendered at build time via
`generateStaticParams`. The blog index (`/blog`) is dynamic to support the category/search query
params.

## Project structure

```
app/                     Route segments (App Router)
  [service]/              Dynamic route serving all 33 services at the root
                          (e.g. /mobile-app-development, /ai-agent-development)
  industries/[slug]/      10 industry landing pages
  locations/[slug]/       7 location landing pages
  portfolio/[slug]/       Case study detail pages
  blog/[slug]/            Blog article pages
  about-us/, leadership/, founders-letter/, press-media/,
  partnership/, life-at-the-orbit-7/, contact-us/   Company pages
  privacy-policy/, terms-of-use/, site-map/         Legal + human sitemap
  sitemap.ts, robots.ts   Dynamic XML sitemap + robots.txt

components/
  layout/                Header, MegaMenu, SimpleDropdown, MobileMenu, Footer
  sections/              Hero, CoreCapabilities, FeaturedServices, ProcessSection,
                          Testimonials, Awards, FAQ, CTASection, Reveal (scroll animation), etc.
  cards/                  ServiceCard, IndustryCard, LocationCard, CaseStudyCard, BlogCard
  forms/                  ContactForm
  ui/                     Container, SectionHeading, Button, SocialIcons

data/                    All content lives here — pages are data-driven, not duplicated
  services.ts             33 services with generated features/FAQs/deliverables
  industries.ts            10 industries
  locations.ts             7 locations (service-coverage pages, not physical offices)
  case-studies.ts           6 original case studies
  blog.ts                   6 original articles
  nav.ts                    Mega menu / dropdown navigation config
  content.ts                Testimonials, stats, process steps, awards, homepage FAQs
  team.ts                   Leadership bios

scripts/
  gen-svgs.mjs             Regenerates the placeholder SVG imagery in /public/images
  crawl.mjs                Crawls every data-driven route against a running server
                          and checks for broken links (used for QA, safe to delete)
```

## Content & assets

- All copy is original, written for The Orbit 7. No text, testimonials, case studies, or claims
  are copied from any reference site.
- All imagery (`public/images/**`) is originally generated (abstract brand-colored SVG placeholders
  for case studies, blog posts, team avatars, and the default OG image) — nothing is scraped or
  copied from a third-party site. Swap these for real photography/screenshots before launch:
  - `public/images/case-studies/*.svg` → real product screenshots
  - `public/images/blog/*.svg` → real article cover images
  - `public/images/team/*.svg` → real team headshots
  - `public/images/clients/` → real client logos (referenced conceptually by `LogoMarquee`,
    currently rendered as text wordmarks — swap in actual logo files and update
    `components/sections/LogoMarquee.tsx` to render `<Image>` tags instead of text)
  - `public/images/og-default.svg` → a real Open Graph image (1200×630)

  To regenerate placeholders after editing `data/case-studies.ts` or `data/blog.ts`, run:
  ```bash
  node scripts/gen-svgs.mjs .
  ```

## Before going live

1. Replace placeholder contact details (`hello@theorbit7.com`, `+1 (800) 555-0147`, WhatsApp
   number, social links) in `components/layout/Footer.tsx` and `app/contact-us/page.tsx` with
   real ones.
2. Wire `components/forms/ContactForm.tsx` to a real submission endpoint (currently simulates a
   submit with a timeout — replace `handleSubmit` with a fetch to your API route, form service,
   or CRM webhook).
3. Replace placeholder imagery as described above.
4. Update `sameAs` social links and `contactPoint` in `app/layout.tsx`'s Organization JSON-LD.
5. Add a real `/favicon.ico` and confirm the OG image renders correctly when shared (some
   platforms prefer PNG/JPG over SVG for OG images — consider exporting a PNG from
   `public/images/og-default.svg`).
6. Point analytics/consent tooling of your choice; none is included by default.

## Deployment

The project deploys cleanly to Vercel or any Node-compatible host:

```bash
vercel deploy
```

No environment variables are required for the base site. `next.config.ts` allows SVG images
locally; if you introduce remote image hosts, add them to `images.remotePatterns`.

## QA performed

- `npm run build` — clean production build, no TypeScript or ESLint errors
- `node scripts/crawl.mjs` — crawled all 80 real routes against a running production server;
  all returned HTTP 200 (and a deliberately invalid path correctly returned 404)
- Verified zero references to any third-party/reference brand anywhere in source or rendered
  output
- Verified every `next/image` usage has descriptive, non-empty `alt` text
- Verified the services mega menu (33 links across 8 categories) matches `data/services.ts`
  exactly
