# The Orbit 7 — theorbit7.com

Marketing website for **The Orbit 7**, a full-service digital agency and software house.
Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion and GSAP.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
npm run lint
```

## Site map

| Route | Purpose |
| --- | --- |
| `/` | Homepage: hero, services explorer, about, featured work, process, tech, industries, FAQ, CTA |
| `/services` | Overview of all 5 categories and 26 services |
| `/services/[slug]` | 26 statically generated service landing pages (unique content, metadata, OG image, schema) |
| `/about-us`, `/portfolio`, `/contact-us` | Company pages |
| `/privacy-policy`, `/terms-of-use` | Legal |
| `/sitemap.xml`, `/robots.txt`, `/llms.txt` | Search and AI discovery |
| `/api/contact` | Contact form endpoint |

Legacy URLs from the previous site (e.g. `/web-app-development`, `/blog/*`, `/industries/*`) 301-redirect
to their closest new page — see `next.config.ts`.

## Where things live

```
data/services/        All service content — one file per category (web, mobile, software, marketing, creative)
data/content.ts       Process steps, industries, tech stack, principles, homepage FAQs
data/projects.ts      Portfolio entries (see note below)
lib/site.ts           Brand name, URL, email, phone, WhatsApp, address, social links  ← edit contact details here
lib/seo.ts            buildMetadata(): title, description, canonical, Open Graph, Twitter per page
lib/schema.ts         JSON-LD builders: Organization, WebSite, ProfessionalService, Service, BreadcrumbList, FAQPage
lib/og.tsx            Generated 1200×630 Open Graph images
components/visuals/   Code-drawn illustrations (no raster images to load)
components/home/      Homepage-only interactive sections (services explorer, GSAP process timeline)
```

To add a service, add an object to the relevant `data/services/*.ts` file. The page, mega menu, footer,
sitemap, llms.txt and schema all pick it up automatically.

## Design system

- Colours: brand `#163e33` plus tints (`brand-*`, `mint`, `sand`, `paper`), defined as tokens in `app/globals.css`.
- Type: Inter Tight (display), Inter (body), Instrument Serif italic (accent words, written as `<em>` or `*word*`
  in `SplitWords`), JetBrains Mono (labels). Self-hosted via Fontsource.
- Motion: CSS load-in reveals, an IntersectionObserver scroll reveal (`data-reveal`), Framer Motion for the
  navigation, tabs and parallax, and GSAP ScrollTrigger for the process timeline. Everything respects
  `prefers-reduced-motion`.

## SEO and AI discoverability

- Every page is statically pre-rendered. All primary content, including FAQ answers (native `<details>`) and
  every service link in the explorer, is in the initial HTML.
- The reveal animation only hides content after JavaScript has added the `js` class, so crawlers and no-JS
  visitors always see the full page.
- Each page has a unique title, description, canonical URL, Open Graph and Twitter metadata, plus JSON-LD.
- `robots.txt` allows all public pages for search engines and AI crawlers (GPTBot, ClaudeBot, PerplexityBot,
  Google-Extended, etc.) and blocks only `/api/`.

## Before going live

1. **Contact details** live in `lib/site.ts` (email, phone, WhatsApp, optional postal address, social URLs).
   They appear automatically in the footer, contact page, schema and llms.txt.
2. **Contact form email**: set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (a verified sender) and optionally
   `CONTACT_TO_EMAIL`. Until these are set, the form shows an email fallback rather than pretending to send.
3. **Portfolio**: `data/projects.ts` contains representative project showcases with no client names, quotes
   or metrics. Replace or extend them with real, client-approved case studies.
4. Testimonials, client logos and statistics are intentionally not included. Add them only with real data.
