import fs from "node:fs";
import path from "node:path";

const brand = "#163e33";
const brandLight = "#2c5c4d";
const tint = "#eef2f0";

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

function abstractShapes(seed, w, h) {
  const rnd = (n) => (Math.sin(seed + n) + 1) / 2;
  let shapes = "";
  for (let i = 0; i < 5; i++) {
    const cx = rnd(i * 3.1) * w;
    const cy = rnd(i * 7.7) * h;
    const r = 40 + rnd(i * 5.3) * (Math.min(w, h) / 3);
    const opacity = 0.06 + rnd(i * 2.1) * 0.08;
    shapes += `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${r.toFixed(0)}" fill="#ffffff" opacity="${opacity.toFixed(2)}" />`;
  }
  return shapes;
}

function card(label, sub, w, h, outPath) {
  const seed = hash(label);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${brand}" />
      <stop offset="100%" stop-color="${brandLight}" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)" />
  ${abstractShapes(seed, w, h)}
  <g font-family="Arial, sans-serif">
    <text x="40" y="${h - 70}" font-size="${Math.max(20, w / 22)}" font-weight="700" fill="#ffffff">${label}</text>
    <text x="40" y="${h - 40}" font-size="${Math.max(13, w / 55)}" fill="${tint}">${sub}</text>
  </g>
</svg>`;
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, svg);
}

function avatar(label, outPath, size = 400) {
  const seed = hash(label);
  const initials = label
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${brandLight}" />
      <stop offset="100%" stop-color="${brand}" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#g)" />
  ${abstractShapes(seed, size, size)}
  <text x="50%" y="54%" font-family="Arial, sans-serif" font-size="${size / 3}" font-weight="700" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${initials}</text>
</svg>`;
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, svg);
}

const root = process.argv[2] || ".";

const caseStudies = [
  ["meridian-health", "Meridian Health Network", "Patient Portal"],
  ["fleetpay", "FleetPay", "Embedded Lending"],
  ["everclass", "EverClass", "Cohort Learning Platform"],
  ["swiftcart", "SwiftCart", "Headless Commerce"],
  ["roomly", "Roomly", "AI Leasing Agent"],
  ["pulsefit", "PulseFit", "Wearable Training App"],
];

for (const [slug, name, sub] of caseStudies) {
  card(name, sub, 1200, 800, path.join(root, `public/images/case-studies/${slug}.svg`));
  card(name, sub, 600, 450, path.join(root, `public/images/case-studies/${slug}-thumb.svg`));
}

const blogPosts = [
  ["when-to-build-an-ai-agent-vs-a-chatbot", "AI Agents vs Chatbots"],
  ["the-real-cost-of-skipping-a-discovery-sprint", "Discovery Sprints"],
  ["picking-a-cross-platform-mobile-framework-in-2026", "Cross-Platform Mobile"],
  ["why-most-mvps-are-scoped-wrong", "MVP Scoping"],
  ["automation-vs-ai-automation-whats-the-difference", "Automation vs AI"],
  ["designing-backend-architecture-that-survives-scale", "Backend Architecture"],
];

for (const [slug, label] of blogPosts) {
  card(label, "The Orbit 7 Journal", 1200, 675, path.join(root, `public/images/blog/${slug}.svg`));
}

const team = [
  "Priya Nair",
  "Daniel Osei",
  "Marcus Chen",
  "Sara Ibrahim",
  "Alexis Moreau",
  "Wren Talbot",
];
for (const name of team) {
  avatar(name, path.join(root, `public/images/team/${name.toLowerCase().replace(/\s+/g, "-")}.svg`));
}

card("The Orbit 7", "Engineering AI-Powered Digital Systems", 1200, 630, path.join(root, "public/images/og-default.svg"));

console.log("SVGs generated");
