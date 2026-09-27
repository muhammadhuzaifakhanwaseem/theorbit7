export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "The Orbit 7 didn't just build what we asked for — they pushed back on scope early and saved us months of rework. Our patient app shipped on time and has held up under real clinic load.",
    name: "Alana Whitfield",
    role: "VP of Digital Health",
    company: "Meridian Health Network",
  },
  {
    quote:
      "We came in with a rough idea for a lending product and left the discovery sprint with an architecture, a timeline, and real confidence. Every milestone since has landed close to plan.",
    name: "Jonas Reyes",
    role: "Co-Founder & CEO",
    company: "FleetPay",
  },
  {
    quote:
      "Our completion rates doubled within two quarters of the relaunch. The team understood that this was a retention problem before it was a design problem, which changed everything.",
    name: "Ines Dahlström",
    role: "Head of Product",
    company: "EverClass",
  },
  {
    quote:
      "The engineering quality is genuinely enterprise-grade, but the team moves like a startup. That combination is rare, and it's the reason we've kept working with them for three years running.",
    name: "Devon Marsh",
    role: "CTO",
    company: "SwiftCart",
  },
];

export interface StatItem {
  value: string;
  label: string;
}

export const stats: StatItem[] = [
  { value: "120+", label: "Digital products shipped" },
  { value: "98%", label: "Client retention rate" },
  { value: "35+", label: "Engineers & designers" },
  { value: "7", label: "Countries served" },
];

export interface ProcessStep {
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    title: "Discover",
    description:
      "We map your users, your riskiest assumptions, and the technical constraints that will shape the build — before committing to a scope.",
  },
  {
    title: "Design",
    description:
      "Interfaces and system architecture are designed together, so the experience you approve is the one engineering can actually deliver.",
  },
  {
    title: "Engineer",
    description:
      "Senior engineers build in focused sprints with weekly demos, so progress is visible and course-correction is cheap.",
  },
  {
    title: "Launch",
    description:
      "We handle release readiness — app store submission, infrastructure hardening, monitoring — so launch day isn't a surprise.",
  },
  {
    title: "Scale",
    description:
      "Post-launch, we instrument real usage data and keep iterating against a prioritized roadmap, not a guess.",
  },
];

export interface AwardItem {
  title: string;
  issuer: string;
  year: string;
}

export const awards: AwardItem[] = [
  { title: "Top Mobile App Development Company", issuer: "Clutch", year: "2026" },
  { title: "Top AI Development Company", issuer: "GoodFirms", year: "2026" },
  { title: "Top B2B Services Provider", issuer: "The Manifest", year: "2025" },
  { title: "Top Software Developers", issuer: "DesignRush", year: "2025" },
];

export const clientLogos: string[] = [
  "Meridian Health",
  "FleetPay",
  "EverClass",
  "SwiftCart",
  "Roomly",
  "PulseFit",
  "Nordline",
  "Cascadia",
];

export const homeFaqs = [
  {
    q: "What kind of companies does The Orbit 7 work with?",
    a: "We work with venture-backed startups, growth-stage companies, and enterprise teams launching new digital products — typically anywhere from pre-seed to Series C, plus internal innovation teams inside larger organizations.",
  },
  {
    q: "How do you price a project?",
    a: "Most engagements are scoped as a fixed-price phase (like a Discovery Sprint or MVP build) followed by a retained monthly team for ongoing iteration. We share pricing after understanding your scope on an initial call, not before.",
  },
  {
    q: "Do you only build with AI, or traditional software too?",
    a: "Both. AI is one capability among several — plenty of our engagements are traditional mobile, web, or backend builds with no AI component at all, built with the same engineering discipline.",
  },
  {
    q: "Can you take over an existing codebase from another team?",
    a: "Yes, through our Product Rescue & Scaling service. We start with a technical audit before committing to a timeline, since inherited codebases vary widely in condition.",
  },
  {
    q: "Where is your team located?",
    a: "We're a distributed team supporting clients across San Francisco, New York, Austin, Toronto, London, Dubai, and Singapore, with delivery pods structured around your working hours.",
  },
];
