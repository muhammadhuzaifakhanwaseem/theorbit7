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
| `/api/contact` | Contact form endpoint (saves to MongoDB) |
| `/admin` | Private inquiries panel (login required, noindex, blocked in robots.txt) |

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
- Type: Manrope (headings), DM Sans (body, buttons, UI), JetBrains Mono (small eyebrow labels). Accent words in
  headings (`<em>` or `*word*` in `SplitWords`) use the same typeface at a lighter weight in brand green (mint on
  dark sections). Self-hosted via Fontsource.
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

## Admin panel

- Sign in at `/admin/login`. The first admin account (`theorbit7`) is created automatically the first time the
  panel connects to an empty database. Change its password under **My account** after first login.
- **Inquiries**: search (name, email, company, message, note), filter by status, service and date range, sort,
  and open an inquiry to update its status (new, contacted, qualified, closed, spam), add an internal note or reply by email.
- **Users** (admins only): create accounts as *member* (view/update inquiries) or *admin* (also delete inquiries and
  manage users). There is no public registration.
- Security: scrypt-hashed passwords, random session tokens stored hashed in MongoDB (7-day expiry, httpOnly cookie),
  failed-login throttling (10 per 15 minutes per IP). Collections: `admin_users`, `admin_sessions`,
  `admin_login_attempts`, `submissions`.

## Before going live

1. **Contact details** live in `lib/site.ts` (email, phone, WhatsApp, optional postal address, social URLs).
   They appear automatically in the footer, contact page, schema and llms.txt.
2. **Contact form storage**: submissions are saved to MongoDB (`MONGODB_URI`, provided by the Vercel → MongoDB Atlas
   integration) in database `theorbit7` (override with `MONGODB_DB`), collection `submissions`. View them in
   MongoDB Atlas → Browse Collections. Without `MONGODB_URI` the form shows an email fallback.
3. **Portfolio**: `data/projects.ts` contains representative project showcases with no client names, quotes
   or metrics. Replace or extend them with real, client-approved case studies.
4. Testimonials, client logos and statistics are intentionally not included. Add them only with real data.
