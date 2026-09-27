export interface Industry {
  slug: string;
  name: string;
  tagline: string;
  heroDescription: string;
  intro: string;
  problems: { title: string; description: string }[];
  solutions: { title: string; description: string }[];
  features: string[];
  techStack: string[];
  relatedServices: string[];
  faqs: { q: string; a: string }[];
}

export const industries: Industry[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    tagline: "Digital health products engineered for compliance and trust",
    heroDescription:
      "The Orbit 7 builds patient-facing apps, provider platforms, and clinical workflow tools engineered around HIPAA-aligned data handling from day one.",
    intro:
      "Healthcare technology succeeds or fails on trust — patients need to believe their data is safe, and clinicians need workflows that fit into an already packed day. We design every healthcare engagement around both.",
    problems: [
      { title: "Fragmented patient data", description: "Records spread across EHRs, portals, and spreadsheets slow down care and create risk." },
      { title: "Compliance overhead", description: "HIPAA and regional health-data regulations add friction that generic dev teams aren't equipped to navigate." },
      { title: "Low patient engagement", description: "Clunky portals and app experiences leave patients disengaged from their own care." },
    ],
    solutions: [
      { title: "Interoperable data architecture", description: "We design around HL7/FHIR standards so records move safely between systems." },
      { title: "Compliance-first engineering", description: "Access controls, audit logging, and encryption are built in, not retrofitted." },
      { title: "Patient-centered design", description: "Interfaces tested with real patients and clinicians for clarity under stress." },
    ],
    features: ["HIPAA-aligned architecture", "EHR & FHIR integration", "Telehealth infrastructure", "Care-team messaging", "Patient engagement tools"],
    techStack: ["React Native", "Node.js", "FHIR", "PostgreSQL", "AWS"],
    relatedServices: ["mobile-app-development", "custom-software-development", "ai-automation", "nlp-development"],
    faqs: [
      { q: "Can you build HIPAA-compliant applications?", a: "Yes. We design data architecture, access controls, and hosting configuration around HIPAA requirements from the first sprint, and work with your compliance counsel to validate the implementation." },
      { q: "Do you integrate with existing EHR systems?", a: "We have experience integrating with FHIR-based and HL7-based systems, and scope integration feasibility during discovery before committing to a timeline." },
    ],
  },
  {
    slug: "fitness",
    name: "Fitness",
    tagline: "Training, tracking, and community products people stick with",
    heroDescription:
      "We design and build fitness apps that combine habit-forming UX with reliable tracking, wearable integration, and content delivery at scale.",
    intro:
      "The fitness category rewards products that survive past the initial motivation spike. Our engagements focus on the mechanics that keep someone opening the app in week six, not just week one.",
    problems: [
      { title: "High churn after week two", description: "Most fitness apps lose the majority of users before a habit forms." },
      { title: "Fragmented device data", description: "Wearable and sensor data rarely syncs cleanly across platforms." },
      { title: "Generic content experiences", description: "One-size-fits-all programming fails to keep users engaged long term." },
    ],
    solutions: [
      { title: "Retention-driven onboarding", description: "Habit-loop design and progress visualization built into the core experience." },
      { title: "Unified wearable integration", description: "Apple Health, Google Fit, and third-party device data normalized into one profile." },
      { title: "Adaptive programming", description: "Personalization logic that adjusts plans based on real performance data." },
    ],
    features: ["Wearable & sensor integration", "Video and livestream delivery", "Progress analytics", "Community and challenges", "Subscription billing"],
    techStack: ["Flutter", "React Native", "HealthKit", "Firebase", "Stripe"],
    relatedServices: ["mobile-app-development", "ai-app-development", "app-store-optimization"],
    faqs: [
      { q: "Can you integrate Apple Health and Google Fit?", a: "Yes, wearable and health-platform integration is one of our most common fitness engagements, including normalizing data across multiple device sources." },
      { q: "Do you help with app store growth after launch?", a: "Yes, through our App Store Optimization and Post Launch Analytics services, scoped separately or bundled into your build." },
    ],
  },
  {
    slug: "fintech",
    name: "Fintech",
    tagline: "Secure, compliant financial products built to scale",
    heroDescription:
      "From neobanking to lending platforms, we engineer fintech products with the security posture, auditability, and scalability regulators and users both expect.",
    intro:
      "Fintech products carry a higher bar for security, auditability, and regulatory awareness than almost any other category, and users notice immediately when that bar isn't met.",
    problems: [
      { title: "Regulatory complexity", description: "KYC, AML, and regional financial regulations demand specialized engineering discipline." },
      { title: "Trust barriers", description: "Users hesitate to adopt financial products from unproven platforms." },
      { title: "Legacy core banking integration", description: "Modern experiences still need to talk to decades-old core systems." },
    ],
    solutions: [
      { title: "KYC/AML-ready architecture", description: "Identity verification and compliance workflows integrated from the ground up." },
      { title: "Bank-grade security", description: "Encryption, tokenization, and audit trails aligned with financial-industry standards." },
      { title: "Core banking integration", description: "Middleware engineered to connect modern apps to legacy financial infrastructure." },
    ],
    features: ["KYC/AML workflows", "Payments & ledger systems", "Fraud detection models", "Core banking middleware", "Real-time reporting"],
    techStack: ["Node.js", "Kotlin Multiplatform", "PostgreSQL", "Plaid", "AWS"],
    relatedServices: ["custom-software-development", "machine-learning-development", "system-integration-api-automation", "blockchain-development"],
    faqs: [
      { q: "Have you built KYC/AML compliant products before?", a: "Yes, our fintech engagements routinely include identity verification, transaction monitoring, and audit-ready reporting built around applicable regional regulation." },
      { q: "Can you integrate with our core banking provider?", a: "We assess integration feasibility with your specific core provider during discovery and design middleware to bridge legacy and modern systems safely." },
    ],
  },
  {
    slug: "education",
    name: "Education",
    tagline: "Learning platforms built for engagement and outcomes",
    heroDescription:
      "We build learning management systems, tutoring marketplaces, and cohort-based platforms engineered around measurable learning outcomes.",
    intro:
      "Learning products are judged on outcomes, not features. We build with completion rates and measurable progress as the central design constraint, not an afterthought.",
    problems: [
      { title: "Low course completion", description: "Most digital learning content sees a steep drop-off after the first module." },
      { title: "Disconnected tools", description: "Scheduling, content, payments, and grading often live in separate systems." },
      { title: "Accessibility gaps", description: "Many platforms fail to serve learners with different needs and devices." },
    ],
    solutions: [
      { title: "Outcome-driven course design", description: "Progress tracking and milestone structures that keep learners moving forward." },
      { title: "Unified learning platform", description: "Scheduling, content, assessment, and payments in one connected system." },
      { title: "Accessible-by-default builds", description: "WCAG-aligned interfaces tested across assistive technologies." },
    ],
    features: ["Cohort & self-paced modes", "Live class scheduling", "Assessment & grading engines", "Content DRM", "Progress analytics"],
    techStack: ["Next.js", "React Native", "PostgreSQL", "AWS", "Stripe"],
    relatedServices: ["web-app-development", "mobile-app-development", "ai-app-development"],
    faqs: [
      { q: "Can you build both live and self-paced learning experiences?", a: "Yes, we regularly build hybrid platforms supporting scheduled live sessions alongside self-paced, on-demand content within a single product." },
      { q: "Do you handle content DRM and piracy protection?", a: "We implement content protection appropriate to your risk profile, from signed URLs to full DRM integration for high-value video content." },
    ],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    tagline: "Property platforms that turn listings into transactions",
    heroDescription:
      "We build listing marketplaces, property management systems, and virtual tour experiences engineered for high-intent conversion.",
    intro:
      "Real estate technology sits at the intersection of high-value transactions and daily operational grind — listings need to convert, and back-office workflows need to actually get used.",
    problems: [
      { title: "Low-quality lead flow", description: "Generic listing sites generate volume but few qualified buyers or renters." },
      { title: "Manual property operations", description: "Maintenance requests, leases, and payments still run through spreadsheets and email." },
      { title: "Static listing experiences", description: "Photos and text rarely convey the actual feel of a space." },
    ],
    solutions: [
      { title: "Intent-based search & matching", description: "Filtering and recommendation logic tuned to buyer and renter intent signals." },
      { title: "Property management automation", description: "Maintenance, leasing, and payment workflows consolidated into one platform." },
      { title: "Immersive listing experiences", description: "3D tours and interactive floor plans integrated into the listing flow." },
    ],
    features: ["Listing search & filtering", "Virtual tour integration", "Lease & payment management", "Maintenance workflows", "CRM integration"],
    techStack: ["Next.js", "React Native", "PostgreSQL", "Mapbox", "AI Automation"],
    relatedServices: ["web-app-development", "ai-agent-development", "custom-software-development"],
    faqs: [
      { q: "Can you integrate MLS or third-party listing feeds?", a: "Yes, we've integrated multiple listing services and third-party feed providers into custom search and matching experiences." },
      { q: "Do you build property management back-office tools alongside consumer apps?", a: "Yes, many of our real estate engagements pair a consumer-facing app with an internal management platform sharing the same data layer." },
    ],
  },
  {
    slug: "travel",
    name: "Travel",
    tagline: "Booking and itinerary products built for peak-season load",
    heroDescription:
      "We engineer booking engines, itinerary planners, and traveler apps designed to hold up under seasonal traffic spikes without breaking checkout.",
    intro:
      "Travel platforms face some of the sharpest seasonal load and multi-provider integration challenges of any category, and the margin for a broken checkout flow is thin.",
    problems: [
      { title: "Checkout drop-off", description: "Complex, multi-step booking flows lose travelers before payment." },
      { title: "Seasonal traffic spikes", description: "Infrastructure that works fine most of the year fails during peak booking windows." },
      { title: "Fragmented itinerary data", description: "Flights, stays, and activities rarely live in one coherent traveler view." },
    ],
    solutions: [
      { title: "Streamlined booking flows", description: "Checkout re-engineered around conversion research, not just feature parity." },
      { title: "Elastic infrastructure", description: "Auto-scaling architecture engineered specifically for seasonal demand curves." },
      { title: "Unified itinerary layer", description: "A single traveler timeline connecting bookings across providers." },
    ],
    features: ["Dynamic pricing engines", "Multi-provider booking APIs", "Itinerary management", "Push notification systems", "Loyalty programs"],
    techStack: ["React Native", "Node.js", "Redis", "AWS", "Stripe"],
    relatedServices: ["mobile-app-development", "backend-api-development", "ai-chatbot-development"],
    faqs: [
      { q: "Can your infrastructure handle seasonal traffic spikes?", a: "Yes, we design auto-scaling backend architecture specifically for travel's peak booking windows, load-testing before high season rather than during it." },
      { q: "Do you integrate with GDS or third-party travel APIs?", a: "We've integrated flight, hotel, and activity provider APIs and can assess your specific provider list during discovery." },
    ],
  },
  {
    slug: "food-delivery",
    name: "Food Delivery",
    tagline: "Ordering, dispatch, and logistics engineered for speed",
    heroDescription:
      "We build ordering apps, restaurant dashboards, and real-time dispatch systems engineered for the operational reality of last-mile delivery.",
    intro:
      "Food delivery is an operations business wearing a consumer-app costume. The real product is the dispatch and logistics engine underneath the ordering experience.",
    problems: [
      { title: "Dispatch inefficiency", description: "Manual or poorly optimized routing drives up delivery times and cost." },
      { title: "Order accuracy issues", description: "Menu, inventory, and order-status sync failures frustrate customers and restaurants." },
      { title: "Thin unit economics", description: "Delivery margins leave little room for engineering inefficiency." },
    ],
    solutions: [
      { title: "Real-time dispatch engine", description: "Routing logic engineered to balance delivery time against driver cost." },
      { title: "Live order synchronization", description: "Menu, inventory, and status kept consistent across customer, restaurant, and driver apps." },
      { title: "Lean, efficient architecture", description: "Infrastructure costs engineered down to protect thin delivery margins." },
    ],
    features: ["Real-time order tracking", "Driver dispatch & routing", "Restaurant dashboards", "In-app payments", "Ratings & support tooling"],
    techStack: ["React Native", "Node.js", "Redis", "Google Maps Platform", "AWS"],
    relatedServices: ["mobile-app-development", "backend-api-development", "ai-automation"],
    faqs: [
      { q: "Can you build the customer, driver, and restaurant apps as one system?", a: "Yes, this three-sided marketplace structure is one of our most common food delivery engagements, sharing one real-time data layer across all three apps." },
      { q: "How do you handle real-time driver routing?", a: "We integrate mapping and routing providers and layer in custom dispatch logic tuned to your delivery radius and driver density." },
    ],
  },
  {
    slug: "dating",
    name: "Dating",
    tagline: "Matching products engineered for trust and retention",
    heroDescription:
      "We build matching algorithms, safety tooling, and engagement mechanics for dating and social-connection apps that need both retention and trust.",
    intro:
      "Dating and social-connection products live or die on trust and safety as much as on matching quality — get either wrong and retention collapses.",
    problems: [
      { title: "Fake profiles and abuse", description: "Trust and safety issues drive users away faster than any UX problem." },
      { title: "Shallow matching logic", description: "Basic swipe mechanics without real signal produce low-quality matches." },
      { title: "Engagement plateaus", description: "Novelty wears off quickly without deeper product mechanics." },
    ],
    solutions: [
      { title: "Trust & safety infrastructure", description: "Verification, reporting, and moderation tooling built into the core product." },
      { title: "Signal-rich matching", description: "Matching logic informed by behavior, not just stated preferences." },
      { title: "Deeper engagement mechanics", description: "Features designed around meaningful connection, not just novelty." },
    ],
    features: ["Identity verification", "Matching algorithms", "In-app messaging", "Moderation & reporting tools", "Video chat integration"],
    techStack: ["React Native", "Node.js", "Machine Learning", "WebRTC", "AWS"],
    relatedServices: ["mobile-app-development", "machine-learning-development", "ai-automation"],
    faqs: [
      { q: "Can you build identity verification into a dating app?", a: "Yes, verification and trust-and-safety tooling is a standard part of our dating app engagements, not an afterthought." },
      { q: "Do you build custom matching algorithms?", a: "We design matching logic informed by your specific product mechanics and available signal, ranging from rules-based scoring to machine-learning models." },
    ],
  },
  {
    slug: "ecommerce",
    name: "Ecommerce",
    tagline: "Storefronts and back-office systems built to convert",
    heroDescription:
      "We build custom storefronts, headless commerce platforms, and operations tooling engineered around conversion rate and margin, not templates.",
    intro:
      "Ecommerce is a conversion-rate business first and a design business second. We build storefronts and back-office systems with that priority order in mind.",
    problems: [
      { title: "Template limitations", description: "Off-the-shelf platforms cap how far a brand's storefront experience can go." },
      { title: "Disconnected inventory and fulfillment", description: "Manual reconciliation between storefront, warehouse, and supplier systems." },
      { title: "Checkout abandonment", description: "Generic checkout flows leave conversion on the table." },
    ],
    solutions: [
      { title: "Headless commerce architecture", description: "Storefronts decoupled from commerce infrastructure for full design freedom." },
      { title: "Unified inventory automation", description: "Real-time sync across storefront, warehouse, and supplier systems." },
      { title: "Conversion-engineered checkout", description: "Checkout flows rebuilt around data, not commerce-platform defaults." },
    ],
    features: ["Headless storefronts", "Inventory & order automation", "Personalization engines", "Subscription commerce", "Marketplace integrations"],
    techStack: ["Next.js", "Shopify Hydrogen", "Node.js", "Stripe", "AI Automation"],
    relatedServices: ["web-app-development", "ai-automation", "custom-software-development"],
    faqs: [
      { q: "Do you build on top of Shopify or fully custom?", a: "Both — we scope headless Shopify builds and fully custom commerce platforms depending on your catalog complexity and growth stage." },
      { q: "Can you automate our inventory and fulfillment workflows?", a: "Yes, this is one of our most requested ecommerce engagements, typically delivered through our Business Process Automation service." },
    ],
  },
  {
    slug: "startups",
    name: "Startup",
    tagline: "From first sketch to funded, scaled product",
    heroDescription:
      "We partner with founders at every stage — from a discovery sprint through MVP, launch, and scale — as an embedded technical team, not a vendor.",
    intro:
      "Founders don't need a vendor that just executes a spec — they need a technical partner who will push back on scope, flag risk early, and help make the fundraising story credible.",
    problems: [
      { title: "Unclear technical scope", description: "Founders often can't get a straight answer on what to build first or what it costs." },
      { title: "Fragmented early tooling", description: "No-code prototypes and freelancers rarely survive first real traction." },
      { title: "Fundraising technical diligence", description: "Investors expect a credible technical story, not just a pitch deck." },
    ],
    solutions: [
      { title: "Structured discovery process", description: "A fixed-scope sprint that turns an idea into a validated build plan." },
      { title: "Production-grade MVPs", description: "Lean builds engineered on architecture that survives real growth." },
      { title: "Investor-ready technical narrative", description: "Documentation and roadmap artifacts built for fundraising conversations." },
    ],
    features: ["Discovery sprints", "MVP engineering", "Fundraising technical support", "Scaling roadmaps", "Fractional CTO advisory"],
    techStack: ["Next.js", "React Native", "Supabase", "AWS", "Stripe"],
    relatedServices: ["discovery-sprint", "mvp-development", "product-strategy-consulting", "ai-mvp-development"],
    faqs: [
      { q: "We only have an idea, no spec — can you still help?", a: "Yes, this is exactly what our Discovery Sprint is designed for: turning an unscoped idea into an architecture, timeline, and estimate." },
      { q: "Can you support us through a fundraising round?", a: "We regularly support founders with technical documentation, architecture diagrams, and advisory calls during investor diligence." },
    ],
  },
];

export function getIndustryBySlug(slug: string) {
  return industries.find((i) => i.slug === slug);
}
