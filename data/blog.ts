export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: { name: string; role: string };
  date: string;
  readingTime: string;
  featured?: boolean;
  content: string[];
}

export const blogCategories = [
  "AI Development",
  "Mobile Development",
  "Software Architecture",
  "Product Strategy",
  "Automation",
];

export const blogPosts: BlogPost[] = [
  {
    slug: "when-to-build-an-ai-agent-vs-a-chatbot",
    title: "When to build an AI agent vs. a chatbot",
    excerpt:
      "The two are often confused, but they solve different problems. Here's how to know which one your product actually needs.",
    category: "AI Development",
    author: { name: "Priya Nair", role: "Head of AI Engineering" },
    date: "2026-08-14",
    readingTime: "7 min read",
    featured: true,
    content: [
      "Most teams reach for the word 'agent' when what they actually need is a well-tuned chatbot, and reach for a chatbot when the task really calls for an agent that can take action. The distinction matters because it changes your architecture, your evaluation strategy, and your risk profile.",
      "A chatbot answers questions. It retrieves relevant context, generates a response, and hands control back to the user. The failure mode is a wrong or unhelpful answer, which is annoying but recoverable.",
      "An agent takes multi-step action on a user's behalf: querying systems, calling APIs, and making decisions across a sequence of steps without a human approving every one. The failure mode is different — an agent that books the wrong flight or updates the wrong record has consequences a bad chat reply doesn't.",
      "In practice, we tell clients to start by mapping the task: if the value is entirely in the answer, build a retrieval-augmented chatbot. If the value is in the action taken — updating a CRM record, triaging a support ticket, reconciling an invoice — you likely need an agent with clear guardrails and a human-in-the-loop checkpoint for anything irreversible.",
      "The teams that get burned are usually the ones who skip straight to an autonomous agent because it sounds more impressive, without first proving the underlying task is well-defined enough to automate safely.",
    ],
  },
  {
    slug: "the-real-cost-of-skipping-a-discovery-sprint",
    title: "The real cost of skipping a discovery sprint",
    excerpt:
      "Founders skip discovery to save two weeks and lose two months. Here's the math on why structured scoping pays for itself.",
    category: "Product Strategy",
    author: { name: "Daniel Osei", role: "Head of Product" },
    date: "2026-07-02",
    readingTime: "6 min read",
    content: [
      "A discovery sprint feels like overhead when you're eager to start building. It isn't — it's the cheapest phase of the entire engagement to get wrong.",
      "We've seen the same pattern repeatedly: a founder skips structured scoping, engineering starts against a rough spec, and three or four weeks in, a fundamental architecture decision has to be reversed because a requirement surfaced too late.",
      "A well-run discovery sprint forces the hard questions early: who is the primary user, what's the one workflow that has to work perfectly on day one, and which technical risks could sink the timeline. Answering these before writing code is far cheaper than answering them mid-sprint.",
      "The output isn't just a nicer-looking spec. It's a shared, validated understanding between founder and engineering team of what 'done' actually means — which is the single biggest predictor of whether a build finishes on time.",
    ],
  },
  {
    slug: "picking-a-cross-platform-mobile-framework-in-2026",
    title: "Picking a cross-platform mobile framework in 2026",
    excerpt:
      "React Native, Flutter, and Kotlin Multiplatform have all matured. The right choice depends on your team, not a feature checklist.",
    category: "Mobile Development",
    author: { name: "Marcus Chen", role: "Principal Mobile Engineer" },
    date: "2026-06-19",
    readingTime: "8 min read",
    content: [
      "The cross-platform debate has quieted down not because one framework won, but because all three major options — React Native, Flutter, and Kotlin Multiplatform — reached genuine production maturity.",
      "React Native remains the strongest choice when your team already has deep JavaScript and React expertise, or when you need to share logic tightly with a Next.js web app.",
      "Flutter earns its place when design fidelity is non-negotiable — its rendering engine gives you pixel-level control that's harder to guarantee with frameworks that lean on native platform widgets.",
      "Kotlin Multiplatform is the right call when you want to share business logic — not UI — across iOS, Android, and even backend services, while keeping fully native interface layers on each platform.",
      "The wrong way to make this decision is a feature-parity spreadsheet. The right way is an honest look at your team's existing skills, your design ambitions, and how much of your logic genuinely needs to live outside the UI layer.",
    ],
  },
  {
    slug: "why-most-mvps-are-scoped-wrong",
    title: "Why most MVPs are scoped wrong",
    excerpt:
      "An MVP isn't a smaller version of your product. It's a test of your riskiest assumption — and most teams build the wrong thing first.",
    category: "Product Strategy",
    author: { name: "Daniel Osei", role: "Head of Product" },
    date: "2026-05-28",
    readingTime: "6 min read",
    content: [
      "The most common MVP mistake isn't scope creep — it's building a smaller version of the eventual product instead of a focused test of the riskiest assumption behind it.",
      "If your biggest risk is whether people will pay for the outcome you provide, your MVP should be built to test willingness to pay, even if that means a manual or 'wizard of oz' backend behind a real front-end.",
      "If your biggest risk is technical feasibility — can this actually be built at the speed or cost you're assuming — your MVP should be a narrow technical proof, even if the UI is rough.",
      "Teams that scope an MVP as 'version one of the full product, but smaller' tend to spend their runway building features that don't address the actual open question, and find out too late that the real risk was never tested.",
    ],
  },
  {
    slug: "automation-vs-ai-automation-whats-the-difference",
    title: "Automation vs. AI automation: what's the difference?",
    excerpt:
      "Not every automation problem needs a language model. Here's how to tell which kind of automation your process actually needs.",
    category: "Automation",
    author: { name: "Sara Ibrahim", role: "Automation Lead" },
    date: "2026-04-11",
    readingTime: "5 min read",
    content: [
      "Traditional automation — RPA, scheduled scripts, deterministic workflow engines — handles rules-based tasks with fixed logic extremely well, and it's usually cheaper and more predictable than reaching for AI.",
      "AI automation earns its complexity when the task involves unstructured input: reading a free-form email, classifying an ambiguous support ticket, or extracting data from documents that don't follow a consistent template.",
      "The mistake we see most often is teams applying a large language model to a problem that a simple rules engine would solve more reliably and far more cheaply.",
      "Our rule of thumb: if you can write the logic as a flowchart with clear yes/no branches, use traditional automation. If the input requires judgment or language understanding a flowchart can't capture, that's where AI automation adds real value.",
    ],
  },
  {
    slug: "designing-backend-architecture-that-survives-scale",
    title: "Designing backend architecture that survives scale",
    excerpt:
      "Most backend rewrites aren't caused by bad code — they're caused by decisions that were reasonable at 1,000 users and broke at 100,000.",
    category: "Software Architecture",
    author: { name: "Marcus Chen", role: "Principal Mobile Engineer" },
    date: "2026-03-22",
    readingTime: "9 min read",
    content: [
      "Backend rewrites rarely happen because the original code was poorly written. They happen because architectural decisions that made sense for a small user base stop holding once real scale arrives.",
      "A single relational database with no read replicas is a perfectly reasonable choice at launch, and a serious liability at a few hundred thousand daily active users.",
      "The teams that avoid painful rewrites aren't the ones who over-engineer for scale they don't have yet — they're the ones who make each early decision reversible: clear service boundaries, a documented data model, and instrumentation from day one so you can see exactly where the system strains before it breaks.",
      "Our approach is to build for the scale you can reasonably predict in the next 12-18 months, while keeping the seams in the architecture clean enough that scaling further is an extension, not a rewrite.",
    ],
  },
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
