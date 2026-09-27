export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  category: string;
  industrySlug: string;
  summary: string;
  challenge: string;
  solution: string;
  result: string;
  stats: { label: string; value: string }[];
  technologies: string[];
  heroImage: string;
  thumbImage: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "meridian-health-patient-portal",
    title: "A patient portal that cut check-in time by 70%",
    client: "Meridian Health Network",
    category: "Mobile App Development",
    industrySlug: "healthcare",
    summary:
      "A unified patient app replacing three disconnected legacy portals across a 12-clinic network.",
    challenge:
      "Meridian's patients navigated three separate logins to book appointments, view results, and message care teams — and staff spent hours each day on manual check-ins.",
    solution:
      "We consolidated scheduling, records, and messaging into a single FHIR-integrated mobile app, with a self-service check-in flow tested directly in clinic waiting rooms.",
    result:
      "Check-in time dropped 70% and appointment no-shows fell by a third within the first two quarters after launch.",
    stats: [
      { label: "Check-in time", value: "-70%" },
      { label: "No-show rate", value: "-33%" },
      { label: "Clinics onboarded", value: "12" },
    ],
    technologies: ["React Native", "Node.js", "FHIR", "PostgreSQL", "AWS"],
    heroImage: "/images/case-studies/meridian-health.svg",
    thumbImage: "/images/case-studies/meridian-health-thumb.svg",
  },
  {
    slug: "fleetpay-embedded-lending",
    title: "Embedded lending platform for independent truckers",
    client: "FleetPay",
    category: "Fintech Engineering",
    industrySlug: "fintech",
    summary:
      "A KYC-compliant lending and payments platform built for owner-operator truckers.",
    challenge:
      "FleetPay needed to underwrite and disburse working-capital loans to independent truckers within hours, not weeks, while meeting KYC and lending compliance requirements.",
    solution:
      "We built a risk-scoring engine on transaction data, an automated KYC workflow, and a disbursement pipeline connected to FleetPay's banking partner via secure APIs.",
    result:
      "FleetPay reduced loan approval time from 5 days to under 2 hours and expanded to three new states in its first year.",
    stats: [
      { label: "Approval time", value: "5 days → 2 hrs" },
      { label: "States expanded", value: "+3" },
      { label: "Default rate", value: "Below target" },
    ],
    technologies: ["Node.js", "Machine Learning", "Plaid", "PostgreSQL", "AWS"],
    heroImage: "/images/case-studies/fleetpay.svg",
    thumbImage: "/images/case-studies/fleetpay-thumb.svg",
  },
  {
    slug: "everclass-cohort-lms",
    title: "A cohort-based learning platform built for completion",
    client: "EverClass",
    category: "Web App Development",
    industrySlug: "education",
    summary:
      "A learning management system engineered around measurable outcomes, not just content delivery.",
    challenge:
      "EverClass's early platform saw fewer than 20% of learners complete a course, and instructors had no visibility into where students disengaged.",
    solution:
      "We rebuilt the platform around milestone-based progress tracking, live cohort scheduling, and instructor dashboards surfacing early drop-off signals.",
    result:
      "Course completion rates rose to 61% within six months, and instructor-reported satisfaction with platform visibility more than doubled.",
    stats: [
      { label: "Completion rate", value: "20% → 61%" },
      { label: "Time to launch", value: "14 weeks" },
      { label: "Active cohorts", value: "40+" },
    ],
    technologies: ["Next.js", "PostgreSQL", "Stripe", "AWS"],
    heroImage: "/images/case-studies/everclass.svg",
    thumbImage: "/images/case-studies/everclass-thumb.svg",
  },
  {
    slug: "swiftcart-headless-commerce",
    title: "A headless storefront that lifted conversion by 24%",
    client: "SwiftCart",
    category: "Ecommerce Engineering",
    industrySlug: "ecommerce",
    summary:
      "A fully custom, headless storefront replacing a rigid template-based ecommerce platform.",
    challenge:
      "SwiftCart's template-based storefront couldn't support the merchandising and checkout experience their brand needed, and page speed was hurting conversion.",
    solution:
      "We built a headless commerce architecture decoupling the storefront from checkout and inventory systems, with a rebuilt checkout flow informed by session-replay research.",
    result:
      "Conversion rate improved 24% and average page load time dropped from 4.1s to 1.3s across the catalog.",
    stats: [
      { label: "Conversion rate", value: "+24%" },
      { label: "Page load time", value: "4.1s → 1.3s" },
      { label: "SKUs migrated", value: "8,400" },
    ],
    technologies: ["Next.js", "Shopify Hydrogen", "Node.js", "Stripe"],
    heroImage: "/images/case-studies/swiftcart.svg",
    thumbImage: "/images/case-studies/swiftcart-thumb.svg",
  },
  {
    slug: "roomly-ai-leasing-agent",
    title: "An AI agent that pre-qualifies rental leads automatically",
    client: "Roomly",
    category: "AI Agent Development",
    industrySlug: "real-estate",
    summary:
      "An AI leasing assistant that answers, qualifies, and schedules rental inquiries around the clock.",
    challenge:
      "Roomly's leasing team couldn't respond to inquiries fast enough outside business hours, losing high-intent renters to faster-responding competitors.",
    solution:
      "We built a retrieval-augmented AI agent trained on property listings and leasing policy, able to answer questions, qualify budget and move-in timing, and book tours directly into the leasing calendar.",
    result:
      "Response time to new inquiries dropped from an average of 6 hours to under 1 minute, and qualified tour bookings rose 41%.",
    stats: [
      { label: "Response time", value: "6 hrs → <1 min" },
      { label: "Qualified tours", value: "+41%" },
      { label: "Coverage", value: "24/7" },
    ],
    technologies: ["LangGraph", "Anthropic API", "Next.js", "PostgreSQL"],
    heroImage: "/images/case-studies/roomly.svg",
    thumbImage: "/images/case-studies/roomly-thumb.svg",
  },
  {
    slug: "pulsefit-wearable-training-app",
    title: "A training app that turned wearable data into retention",
    client: "PulseFit",
    category: "Mobile App Development",
    industrySlug: "fitness",
    summary:
      "A fitness app unifying wearable data into adaptive training plans that keep users engaged past week two.",
    challenge:
      "PulseFit's early app synced with only one wearable brand and saw over 80% of users churn within 30 days.",
    solution:
      "We rebuilt the app around a unified health-data layer supporting multiple wearables, with adaptive programming that adjusts weekly plans based on actual performance and recovery data.",
    result:
      "30-day retention improved from 19% to 47%, and average sessions per active user per week nearly doubled.",
    stats: [
      { label: "30-day retention", value: "19% → 47%" },
      { label: "Weekly sessions", value: "+92%" },
      { label: "Wearables supported", value: "5" },
    ],
    technologies: ["Flutter", "HealthKit", "Firebase", "Machine Learning"],
    heroImage: "/images/case-studies/pulsefit.svg",
    thumbImage: "/images/case-studies/pulsefit-thumb.svg",
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
