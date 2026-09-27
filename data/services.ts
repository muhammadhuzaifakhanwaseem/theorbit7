export type ServiceCategory =
  | "Application Development"
  | "By Platform"
  | "By Type"
  | "Launch & Growth"
  | "Artificial Intelligence"
  | "Automation"
  | "Digital Product Development"
  | "By Craft";

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  title: string;
  category: ServiceCategory;
  summary: string;
  heroDescription: string;
  overview: string[];
  features: ServiceFeature[];
  deliverables: string[];
  techStack: string[];
  faqs: ServiceFAQ[];
  relatedServices: string[];
  relatedIndustries: string[];
}

interface ServiceSeed {
  slug: string;
  title: string;
  category: ServiceCategory;
  summary: string;
  focusAreas: string[];
  techStack: string[];
  useCases: string[];
  relatedServices: string[];
  relatedIndustries: string[];
}

const seeds: ServiceSeed[] = [
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    category: "Application Development",
    summary:
      "Native and cross-platform mobile products engineered for scale, performance, and long-term maintainability.",
    focusAreas: ["Product discovery & UX architecture", "Native performance engineering", "Offline-first data sync", "App store readiness"],
    techStack: ["Swift", "Kotlin", "React Native", "Flutter", "GraphQL", "Firebase"],
    useCases: ["Consumer apps at scale", "Field-service and logistics tools", "Subscription and membership apps"],
    relatedServices: ["ios-app-development", "android-app-development", "react-native-app-development", "app-store-optimization"],
    relatedIndustries: ["fitness", "food-delivery", "healthcare"],
  },
  {
    slug: "blockchain-development",
    title: "Blockchain Development",
    category: "Application Development",
    summary:
      "Smart contracts, tokenization and decentralized application engineering built on audited, production-grade infrastructure.",
    focusAreas: ["Smart contract architecture", "Wallet & custody integration", "Layer 2 scaling strategy", "Security auditing"],
    techStack: ["Solidity", "Rust", "Ethereum", "Polygon", "Hyperledger", "IPFS"],
    useCases: ["Tokenized loyalty programs", "Decentralized marketplaces", "On-chain settlement systems"],
    relatedServices: ["custom-software-development", "system-integration-api-automation"],
    relatedIndustries: ["fintech", "ecommerce"],
  },
  {
    slug: "ios-app-development",
    title: "iOS App Development",
    category: "By Platform",
    summary:
      "Swift and SwiftUI engineering for iPhone and iPad products that feel native, fast, and unmistakably Apple-grade.",
    focusAreas: ["SwiftUI interface engineering", "Apple ecosystem integration", "App Store compliance", "Performance profiling on-device"],
    techStack: ["Swift", "SwiftUI", "Combine", "CoreData", "TestFlight"],
    useCases: ["Premium consumer apps", "Health and wearable companions", "Enterprise iPad tools"],
    relatedServices: ["mobile-app-development", "android-app-development", "app-store-optimization"],
    relatedIndustries: ["healthcare", "fitness"],
  },
  {
    slug: "android-app-development",
    title: "Android App Development",
    category: "By Platform",
    summary:
      "Kotlin-first Android engineering built for device fragmentation, emerging markets, and long product lifecycles.",
    focusAreas: ["Kotlin & Jetpack Compose", "Device fragmentation testing", "Play Store optimization", "Battery & performance tuning"],
    techStack: ["Kotlin", "Jetpack Compose", "Room", "WorkManager", "Firebase"],
    useCases: ["Emerging-market consumer apps", "Field and logistics tooling", "Marketplace apps"],
    relatedServices: ["mobile-app-development", "ios-app-development", "kotlin-multiplatform-development"],
    relatedIndustries: ["ecommerce", "travel"],
  },
  {
    slug: "react-native-app-development",
    title: "React Native App Development",
    category: "By Platform",
    summary:
      "A single JavaScript codebase engineered to ship indistinguishably native experiences across iOS and Android.",
    focusAreas: ["Shared codebase architecture", "Native module bridging", "Over-the-air release pipelines", "Cross-platform performance parity"],
    techStack: ["React Native", "TypeScript", "Expo", "Redux Toolkit", "GraphQL"],
    useCases: ["Startups validating fast", "Multi-platform MVPs", "Content and marketplace apps"],
    relatedServices: ["mobile-app-development", "flutter-app-development", "cross-platform-development"],
    relatedIndustries: ["startups", "dating"],
  },
  {
    slug: "flutter-app-development",
    title: "Flutter App Development",
    category: "By Platform",
    summary:
      "Dart-powered Flutter builds engineered for pixel-perfect design fidelity across phones, tablets, and desktop.",
    focusAreas: ["Custom widget systems", "Design-fidelity engineering", "Multi-form-factor layouts", "CI/CD for Flutter releases"],
    techStack: ["Flutter", "Dart", "Bloc", "Firebase", "GetX"],
    useCases: ["Design-led consumer products", "Internal operations tools", "Multi-device retail apps"],
    relatedServices: ["mobile-app-development", "react-native-app-development", "ui-ux-design"],
    relatedIndustries: ["real-estate", "education"],
  },
  {
    slug: "kotlin-multiplatform-development",
    title: "Kotlin Multiplatform",
    category: "By Platform",
    summary:
      "Shared business logic across iOS, Android, and backend, without compromising on native UI performance.",
    focusAreas: ["Shared logic architecture", "Native UI layer integration", "Gradual migration planning", "Cross-team engineering standards"],
    techStack: ["Kotlin Multiplatform", "Ktor", "SwiftUI", "Jetpack Compose"],
    useCases: ["Teams consolidating codebases", "Fintech apps with strict logic parity", "Long-lived enterprise apps"],
    relatedServices: ["android-app-development", "ios-app-development", "backend-api-development"],
    relatedIndustries: ["fintech"],
  },
  {
    slug: "web-app-development",
    title: "Web App Development",
    category: "By Type",
    summary:
      "Modern, scalable web applications built on component-driven architecture and rigorous performance budgets.",
    focusAreas: ["Component-driven front-end architecture", "Server-side rendering & performance", "Accessibility engineering", "Design system implementation"],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    useCases: ["SaaS dashboards", "Customer portals", "Internal admin tools"],
    relatedServices: ["backend-api-development", "ui-ux-design", "custom-software-development"],
    relatedIndustries: ["fintech", "education"],
  },
  {
    slug: "backend-api-development",
    title: "Backend & API Development",
    category: "By Type",
    summary:
      "Resilient backend systems and well-documented APIs engineered to scale from first users to millions.",
    focusAreas: ["API design & documentation", "Database architecture", "Horizontal scalability", "Observability & monitoring"],
    techStack: ["Node.js", "Go", "PostgreSQL", "Redis", "Kubernetes", "GraphQL"],
    useCases: ["Multi-tenant SaaS platforms", "Marketplace back-ends", "Data-intensive services"],
    relatedServices: ["web-app-development", "system-integration-api-automation", "custom-software-development"],
    relatedIndustries: ["fintech", "ecommerce"],
  },
  {
    slug: "cross-platform-development",
    title: "Cross-Platform Development",
    category: "By Type",
    summary:
      "One engineering team, one codebase strategy, and a consistent product experience across every device you ship to.",
    focusAreas: ["Framework selection strategy", "Shared design-system tooling", "Unified release management", "Platform-specific polish"],
    techStack: ["React Native", "Flutter", "Kotlin Multiplatform", "Next.js"],
    useCases: ["Lean product teams", "Multi-device B2B tools", "Startups scaling to new platforms"],
    relatedServices: ["react-native-app-development", "flutter-app-development", "mobile-app-development"],
    relatedIndustries: ["startups"],
  },
  {
    slug: "app-store-optimization",
    title: "App Store Optimization",
    category: "Launch & Growth",
    summary:
      "Keyword strategy, creative testing, and conversion optimization engineered to lift organic install volume.",
    focusAreas: ["Keyword & metadata strategy", "Store listing creative testing", "Conversion rate optimization", "Competitive benchmarking"],
    techStack: ["App Store Connect", "Google Play Console", "AppTweak", "Sensor Tower"],
    useCases: ["Apps plateauing on organic growth", "New launches entering crowded categories", "Apps preparing a rebrand"],
    relatedServices: ["mobile-app-development", "product-launch-strategy", "post-launch-analytics"],
    relatedIndustries: ["fitness", "dating"],
  },
  {
    slug: "product-launch-strategy",
    title: "Product Launch Strategy",
    category: "Launch & Growth",
    summary:
      "A structured go-to-market plan that aligns engineering timelines, positioning, and channel strategy before day one.",
    focusAreas: ["Go-to-market planning", "Positioning & messaging", "Launch-readiness engineering checklist", "Channel and partner sequencing"],
    techStack: ["Amplitude", "Mixpanel", "PostHog", "Segment"],
    useCases: ["First-time founders", "Enterprise teams shipping new products", "Category-defining launches"],
    relatedServices: ["discovery-sprint", "app-store-optimization", "product-strategy-consulting"],
    relatedIndustries: ["startups"],
  },
  {
    slug: "post-launch-analytics",
    title: "Post Launch Analytics & Iteration",
    category: "Launch & Growth",
    summary:
      "Instrumentation, dashboards, and a recurring iteration cadence that turns real usage data into a durable roadmap.",
    focusAreas: ["Product analytics instrumentation", "Retention & funnel analysis", "Experimentation frameworks", "Roadmap prioritization"],
    techStack: ["Amplitude", "Mixpanel", "PostHog", "Looker"],
    useCases: ["Apps with unclear retention drivers", "Teams needing a data-informed roadmap", "Post-launch performance reviews"],
    relatedServices: ["product-launch-strategy", "product-rescue-scaling", "mvp-development"],
    relatedIndustries: ["ecommerce"],
  },
  {
    slug: "ai-development",
    title: "AI Development",
    category: "Artificial Intelligence",
    summary:
      "End-to-end artificial intelligence engineering, from model selection to production deployment and monitoring.",
    focusAreas: ["Model selection & evaluation", "Data pipeline engineering", "Production inference infrastructure", "Responsible AI guardrails"],
    techStack: ["Python", "PyTorch", "LangChain", "AWS Bedrock", "Vector databases"],
    useCases: ["Enterprises exploring AI adoption", "Teams replacing manual review processes", "Products needing intelligent features"],
    relatedServices: ["ai-app-development", "machine-learning-development", "ai-mvp-development"],
    relatedIndustries: ["healthcare", "fintech"],
  },
  {
    slug: "ai-app-development",
    title: "AI App Development",
    category: "Artificial Intelligence",
    summary:
      "Consumer and business applications with intelligence built into the core product experience, not bolted on after.",
    focusAreas: ["AI-native product architecture", "Model integration & orchestration", "Latency and cost optimization", "User trust & transparency design"],
    techStack: ["OpenAI API", "Anthropic API", "Next.js", "Pinecone", "LangChain"],
    useCases: ["AI-native SaaS products", "Copilot-style features", "Personalization engines"],
    relatedServices: ["ai-development", "generative-ai-development", "ai-agent-development"],
    relatedIndustries: ["ecommerce", "education"],
  },
  {
    slug: "ai-chatbot-development",
    title: "AI Chatbot Development",
    category: "Artificial Intelligence",
    summary:
      "Conversational systems engineered on retrieval-augmented pipelines that answer accurately and escalate gracefully.",
    focusAreas: ["Conversation design", "Retrieval-augmented generation", "Human handoff workflows", "Multi-channel deployment"],
    techStack: ["LangChain", "Anthropic API", "OpenAI API", "Twilio", "Intercom"],
    useCases: ["Customer support deflection", "Internal knowledge assistants", "Lead qualification bots"],
    relatedServices: ["ai-agent-development", "nlp-development", "business-process-automation"],
    relatedIndustries: ["ecommerce", "travel"],
  },
  {
    slug: "ai-agent-development",
    title: "AI Agent Development",
    category: "Artificial Intelligence",
    summary:
      "Autonomous, tool-using agents engineered with guardrails to safely complete multi-step business tasks.",
    focusAreas: ["Agent orchestration architecture", "Tool & API integration", "Guardrails & human oversight", "Evaluation & observability"],
    techStack: ["LangGraph", "Anthropic API", "Python", "Temporal", "Vector databases"],
    useCases: ["Back-office task automation", "Research and reporting agents", "Ops copilots"],
    relatedServices: ["ai-automation", "ai-chatbot-development", "system-integration-api-automation"],
    relatedIndustries: ["fintech", "real-estate"],
  },
  {
    slug: "generative-ai-development",
    title: "Generative AI Development",
    category: "Artificial Intelligence",
    summary:
      "Text, image, and multimodal generation pipelines engineered for brand-safe, production-quality output.",
    focusAreas: ["Prompt & pipeline engineering", "Fine-tuning & customization", "Content safety filtering", "Multimodal integration"],
    techStack: ["Stable Diffusion", "OpenAI API", "Anthropic API", "Replicate", "Python"],
    useCases: ["Content generation platforms", "Design and creative tools", "Personalized media products"],
    relatedServices: ["ai-app-development", "machine-learning-development", "ai-development"],
    relatedIndustries: ["ecommerce", "real-estate"],
  },
  {
    slug: "machine-learning-development",
    title: "Machine Learning Development",
    category: "Artificial Intelligence",
    summary:
      "Custom predictive and classification models engineered from your data, evaluated rigorously, and deployed to production.",
    focusAreas: ["Feature engineering", "Model training & evaluation", "MLOps pipelines", "Continuous retraining strategy"],
    techStack: ["Python", "PyTorch", "scikit-learn", "MLflow", "AWS SageMaker"],
    useCases: ["Fraud and risk scoring", "Demand forecasting", "Recommendation systems"],
    relatedServices: ["ai-development", "nlp-development", "generative-ai-development"],
    relatedIndustries: ["fintech", "ecommerce"],
  },
  {
    slug: "nlp-development",
    title: "NLP Development",
    category: "Artificial Intelligence",
    summary:
      "Text understanding, extraction and classification systems engineered for domain-specific accuracy at volume.",
    focusAreas: ["Entity extraction & classification", "Document understanding", "Sentiment & intent analysis", "Multilingual pipelines"],
    techStack: ["spaCy", "Hugging Face", "Python", "Anthropic API", "Elasticsearch"],
    useCases: ["Contract and document review", "Support ticket triage", "Voice-of-customer analysis"],
    relatedServices: ["ai-chatbot-development", "machine-learning-development", "ai-development"],
    relatedIndustries: ["healthcare", "fintech"],
  },
  {
    slug: "ai-mvp-development",
    title: "AI MVP Development",
    category: "Artificial Intelligence",
    summary:
      "A working, testable AI product in weeks, engineered to validate demand before you commit to a full build.",
    focusAreas: ["Rapid prototyping sprints", "Model feasibility validation", "User-testing instrumentation", "Scale-up roadmap"],
    techStack: ["Next.js", "OpenAI API", "Anthropic API", "Supabase", "Vercel"],
    useCases: ["Founders validating an AI idea", "Innovation teams inside larger companies", "Pre-seed and seed-stage startups"],
    relatedServices: ["discovery-sprint", "mvp-development", "ai-app-development"],
    relatedIndustries: ["startups"],
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    category: "Automation",
    summary:
      "Intelligent automation that combines large language models with deterministic workflows to remove manual work.",
    focusAreas: ["Workflow mapping & redesign", "LLM-driven decisioning", "Human-in-the-loop review", "Continuous accuracy monitoring"],
    techStack: ["LangGraph", "Zapier", "n8n", "Python", "Anthropic API"],
    useCases: ["Back-office document processing", "Customer operations", "Internal reporting automation"],
    relatedServices: ["ai-agent-development", "business-process-automation", "rpa-development"],
    relatedIndustries: ["healthcare", "real-estate"],
  },
  {
    slug: "system-integration-api-automation",
    title: "System Integration & API Automation",
    category: "Automation",
    summary:
      "Connective engineering that links your CRM, ERP, and internal tools into one reliable, automated data flow.",
    focusAreas: ["API architecture & mapping", "Middleware engineering", "Data synchronization", "Error handling & alerting"],
    techStack: ["Node.js", "Zapier", "Workato", "REST", "GraphQL", "Webhooks"],
    useCases: ["Disconnected sales & support tools", "Multi-vendor data pipelines", "Legacy system modernization"],
    relatedServices: ["backend-api-development", "business-process-automation", "custom-software-development"],
    relatedIndustries: ["fintech", "ecommerce"],
  },
  {
    slug: "business-process-automation",
    title: "Business Process Automation",
    category: "Automation",
    summary:
      "End-to-end automation of repetitive operational workflows, engineered around your existing systems of record.",
    focusAreas: ["Process discovery & mapping", "Workflow engine design", "Exception handling", "Team change management"],
    techStack: ["n8n", "Zapier", "Python", "Airflow"],
    useCases: ["Manual approval chains", "Onboarding and offboarding workflows", "Reporting and reconciliation"],
    relatedServices: ["ai-automation", "system-integration-api-automation", "rpa-development"],
    relatedIndustries: ["real-estate", "education"],
  },
  {
    slug: "rpa-development",
    title: "RPA Development",
    category: "Automation",
    summary:
      "Robotic process automation engineered to handle high-volume, rules-based tasks across legacy interfaces.",
    focusAreas: ["Bot design & scripting", "Legacy UI automation", "Exception & audit logging", "Scheduled orchestration"],
    techStack: ["UiPath", "Python", "Selenium", "Power Automate"],
    useCases: ["Legacy data entry", "Compliance reporting", "High-volume back-office tasks"],
    relatedServices: ["business-process-automation", "ai-automation", "system-integration-api-automation"],
    relatedIndustries: ["fintech", "healthcare"],
  },
  {
    slug: "digital-product-development",
    title: "Digital Product Development",
    category: "Digital Product Development",
    summary:
      "Strategy, UX, engineering, launch and scaling delivered as one accountable team from a single point of contact.",
    focusAreas: ["Product strategy & roadmap", "UX and interface design", "Full-stack engineering", "Launch and post-launch scaling"],
    techStack: ["Next.js", "React Native", "Node.js", "PostgreSQL", "Figma"],
    useCases: ["Founders building a first product", "Enterprises spinning up new ventures", "Teams replacing an agency patchwork"],
    relatedServices: ["discovery-sprint", "mvp-development", "product-strategy-consulting"],
    relatedIndustries: ["startups", "healthcare"],
  },
  {
    slug: "discovery-sprint",
    title: "Discovery Sprint",
    category: "Digital Product Development",
    summary:
      "A focused two-week engagement that turns a rough idea into a validated scope, architecture, and delivery plan.",
    focusAreas: ["Stakeholder & user research", "Scope and architecture definition", "Risk and feasibility assessment", "Delivery roadmap and estimate"],
    techStack: ["Figma", "Miro", "Notion"],
    useCases: ["Founders before their first build", "Teams evaluating a major rebuild", "Investors requesting a technical plan"],
    relatedServices: ["mvp-development", "product-strategy-consulting", "digital-product-development"],
    relatedIndustries: ["startups"],
  },
  {
    slug: "mvp-development",
    title: "MVP Development",
    category: "Digital Product Development",
    summary:
      "A lean, production-quality first version engineered to test your core hypothesis with real users, fast.",
    focusAreas: ["Scope prioritization", "Lean architecture decisions", "Rapid engineering sprints", "Investor and user-ready launch"],
    techStack: ["Next.js", "React Native", "Supabase", "Stripe"],
    useCases: ["Pre-seed founders", "Corporate innovation teams", "Products validating a new market"],
    relatedServices: ["discovery-sprint", "digital-product-development", "ai-mvp-development"],
    relatedIndustries: ["startups"],
  },
  {
    slug: "product-rescue-scaling",
    title: "Product Rescue & Scaling",
    category: "Digital Product Development",
    summary:
      "Technical audits and re-engineering for products that have outgrown their original codebase or team.",
    focusAreas: ["Technical & architecture audit", "Codebase stabilization", "Performance and cost optimization", "Scaling roadmap"],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Kubernetes", "Datadog"],
    useCases: ["Products with mounting technical debt", "Teams after an agency handover", "Apps struggling under new load"],
    relatedServices: ["custom-software-development", "post-launch-analytics", "backend-api-development"],
    relatedIndustries: ["fintech", "ecommerce"],
  },
  {
    slug: "product-strategy-consulting",
    title: "Product Strategy & Consulting",
    category: "Digital Product Development",
    summary:
      "Senior product advisory engagements that clarify roadmap, positioning, and build-versus-buy decisions.",
    focusAreas: ["Roadmap and prioritization", "Build-vs-buy assessment", "Competitive and market analysis", "Executive workshops"],
    techStack: ["Notion", "Amplitude", "Figma"],
    useCases: ["Leadership teams facing a roadmap decision", "Boards requesting technical due diligence", "Founders pre-fundraise"],
    relatedServices: ["discovery-sprint", "digital-product-development", "product-launch-strategy"],
    relatedIndustries: ["startups", "fintech"],
  },
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    category: "Digital Product Development",
    summary:
      "Enterprise-grade business software, ERP, CRM and internal platforms engineered around how your teams actually work.",
    focusAreas: ["Requirements & systems mapping", "Custom ERP/CRM architecture", "Legacy migration", "Enterprise security & compliance"],
    techStack: ["Node.js", ".NET", "PostgreSQL", "Kubernetes", "Azure"],
    useCases: ["Enterprises replacing off-the-shelf tools", "Regulated industries needing custom compliance", "Multi-department internal platforms"],
    relatedServices: ["backend-api-development", "system-integration-api-automation", "product-rescue-scaling"],
    relatedIndustries: ["healthcare", "fintech", "real-estate"],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    category: "By Craft",
    summary:
      "Research-led interface design that balances brand ambition with the clarity real users need to act.",
    focusAreas: ["User research & journey mapping", "Design systems", "Interaction & motion design", "Usability testing"],
    techStack: ["Figma", "Framer", "Maze", "Adobe Creative Suite"],
    useCases: ["Products needing a design system", "Rebrands and redesigns", "Complex workflow simplification"],
    relatedServices: ["interactive-prototyping", "digital-product-development", "mobile-app-development"],
    relatedIndustries: ["healthcare", "real-estate"],
  },
  {
    slug: "interactive-prototyping",
    title: "Interactive Prototyping",
    category: "By Craft",
    summary:
      "High-fidelity clickable prototypes engineered to test real user flows before a single line of production code.",
    focusAreas: ["Clickable flow prototyping", "Usability test facilitation", "Stakeholder and investor demos", "Design-to-development handoff"],
    techStack: ["Figma", "Framer", "Principle", "ProtoPie"],
    useCases: ["Investor and stakeholder pitches", "Pre-build usability validation", "Complex interaction design"],
    relatedServices: ["ui-ux-design", "discovery-sprint", "digital-product-development"],
    relatedIndustries: ["startups"],
  },
];

function buildFeatures(title: string, focusAreas: string[]): ServiceFeature[] {
  const descriptors = [
    `A dedicated workstream inside every ${title.toLowerCase()} engagement, planned before engineering begins.`,
    `Reviewed weekly against delivery milestones so nothing drifts from the original brief.`,
    `Backed by senior engineers who have shipped this exact capability in production before.`,
    `Documented and handed over so your internal team can maintain it long after launch.`,
  ];
  return focusAreas.map((area, i) => ({
    title: area,
    description: descriptors[i % descriptors.length],
  }));
}

function buildFaqs(title: string, seed: ServiceSeed): ServiceFAQ[] {
  return [
    {
      q: `How long does a typical ${title.toLowerCase()} engagement take?`,
      a: `Timelines vary with scope, but most ${title.toLowerCase()} engagements run between 8 and 16 weeks from discovery to launch. We share a milestone-based estimate at the end of your discovery call, not before.`,
    },
    {
      q: `Who works on our ${title.toLowerCase()} project?`,
      a: `A senior, dedicated pod — typically a product lead, one or two engineers matched to the ${seed.techStack.slice(0, 2).join(" and ")} stack, a designer, and a QA engineer — assigned for the length of the engagement.`,
    },
    {
      q: `Do you work with startups or only enterprises?`,
      a: `Both. Our ${title} team structures engagements for ${seed.useCases[0].toLowerCase()} as well as larger organizations, adjusting governance and reporting cadence to fit your stage.`,
    },
    {
      q: `What happens after launch?`,
      a: `Every engagement includes a documented handover. Many clients continue with a retained support or iteration arrangement so the product keeps improving after the initial release.`,
    },
  ];
}

export const services: Service[] = seeds.map((seed) => ({
  slug: seed.slug,
  title: seed.title,
  category: seed.category,
  summary: seed.summary,
  heroDescription: seed.summary,
  overview: [
    `${seed.title} at The Orbit 7 is built as a full-cycle engineering discipline, not a checklist. We pair senior specialists with a structured process so every decision — from architecture to interface — is made deliberately and documented as we go.`,
    `Our teams work in focused pods for the length of the engagement, with weekly demos and a shared backlog, so you always know exactly what has shipped and what's next.`,
  ],
  features: buildFeatures(seed.title, seed.focusAreas),
  deliverables: [
    `A validated scope and architecture for your ${seed.title.toLowerCase()} engagement`,
    `Production-ready code with test coverage and documentation`,
    `A deployed, monitored release with a handover runbook`,
    `A prioritized backlog for the next phase of iteration`,
  ],
  techStack: seed.techStack,
  faqs: buildFaqs(seed.title, seed),
  relatedServices: seed.relatedServices,
  relatedIndustries: seed.relatedIndustries,
}));

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const serviceCategoryOrder: ServiceCategory[] = [
  "Application Development",
  "By Platform",
  "By Type",
  "Launch & Growth",
  "Artificial Intelligence",
  "Automation",
  "Digital Product Development",
  "By Craft",
];

export function servicesByCategory(category: ServiceCategory) {
  return services.filter((s) => s.category === category);
}
