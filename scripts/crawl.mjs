import { services } from "../data/services.ts";
import { industries } from "../data/industries.ts";
import { locations } from "../data/locations.ts";
import { caseStudies } from "../data/case-studies.ts";
import { blogPosts } from "../data/blog.ts";

const base = "http://localhost:3000";

const staticRoutes = [
  "/",
  "/industries",
  "/locations",
  "/portfolio",
  "/blog",
  "/about-us",
  "/leadership",
  "/founders-letter",
  "/press-media",
  "/partnership",
  "/life-at-the-orbit-7",
  "/contact-us",
  "/privacy-policy",
  "/terms-of-use",
  "/site-map",
  "/sitemap.xml",
  "/robots.txt",
  "/this-page-should-404",
];

const routes = [
  ...staticRoutes,
  ...services.map((s) => `/${s.slug}`),
  ...industries.map((i) => `/industries/${i.slug}`),
  ...locations.map((l) => `/locations/${l.slug}`),
  ...caseStudies.map((c) => `/portfolio/${c.slug}`),
  ...blogPosts.map((p) => `/blog/${p.slug}`),
];

console.log(`Crawling ${routes.length} routes...`);

let failed = 0;
for (const route of routes) {
  const res = await fetch(base + route);
  const expected404 = route === "/this-page-should-404";
  const ok = expected404 ? res.status === 404 : res.status === 200;
  if (!ok) {
    failed++;
    console.log(`FAIL  ${res.status}  ${route}`);
  }
}

console.log(failed === 0 ? `All ${routes.length} routes OK.` : `${failed} route(s) failed.`);
process.exit(failed === 0 ? 0 : 1);
