/**
 * LOCATIONS
 * The Orbit 7 serves clients in these markets remotely. Pages describe how we work with
 * businesses in each location — they do not claim a physical office. If you open an office,
 * add its address to `office` and it will appear on the page and in structured data.
 */
import type { FAQ, Item } from "./services/types";

export type Region = "uae" | "usa" | "intl";

export interface City {
  slug: string;
  name: string;
  country: string;
  countryCode: string;
  region: Region;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  intro: string[];
  local: Item[];
  industries: string[];
  /** Core service slugs highlighted on the hub page. */
  services: string[];
  faqs: FAQ[];
  office?: { streetAddress: string; postalCode?: string } | null;
}

export interface LocalServicePage {
  city: string;
  /** URL segment after the city, e.g. "software-development". */
  slug: string;
  /** Main service page this location page supports. */
  service: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  intro: string[];
  considerations: Item[];
  faqs: FAQ[];
  related: string[];
}

export const regions: { id: Region; name: string }[] = [
  { id: "uae", name: "United Arab Emirates" },
  { id: "usa", name: "United States" },
  { id: "intl", name: "International" },
];

const coreServices = [
  "custom-software-development",
  "website-development",
  "mobile-app-development",
  "ai-application-development",
  "seo-services",
  "google-ads-ppc",
];

export const cities: City[] = [
  {
    slug: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    countryCode: "AE",
    region: "uae",
    metaTitle: "Software, Web & App Development Company in Dubai | The Orbit 7",
    metaDescription:
      "The Orbit 7 helps Dubai businesses with software, website and mobile app development, AI solutions, SEO and digital marketing — bilingual-ready and built for the UAE market.",
    h1: "Digital Agency & Software Development Partner for Dubai Businesses",
    lead:
      "From bilingual websites and mobile apps to AI automation and SEO that wins in a competitive market, we help Dubai companies build and grow their digital presence.",
    intro: [
      "Dubai is one of the world's most competitive digital markets. Customers expect polished, mobile-first experiences in English and Arabic, fast checkout with local payment options and instant responses on WhatsApp. Businesses compete with regional and global brands for the same searches and social feeds.",
      "The Orbit 7 works with Dubai businesses remotely as a full-service digital partner — strategy, design, engineering and marketing in one team. We plan for Arabic and right-to-left layouts, UAE payment gateways, data protection requirements and the local search behaviour that drives enquiries across the emirate.",
    ],
    local: [
      { title: "Bilingual by design", text: "English and Arabic content with proper right-to-left (RTL) layouts, typography and SEO for both languages." },
      { title: "UAE payments & WhatsApp", text: "Integrations with regional gateways such as Telr, PayTabs and Network International, plus WhatsApp Business for sales and support." },
      { title: "Data protection", text: "Solutions designed with the UAE Personal Data Protection Law (Federal Decree-Law No. 45 of 2021) and sector rules in mind." },
      { title: "Local search & Maps", text: "Google Business Profile, Arabic keyword research and location pages for Dubai's many districts and free zones." },
    ],
    industries: ["Real estate & property", "Hospitality & tourism", "Retail & ecommerce", "Logistics & trade", "Fintech", "Healthcare & clinics"],
    services: coreServices,
    faqs: [
      { q: "Do you have an office in Dubai?", a: "We work with Dubai businesses remotely, using video calls, shared project boards and regular demos. We schedule meetings to suit your time zone." },
      { q: "Can you build Arabic and English websites and apps?", a: "Yes. We design and develop bilingual experiences with right-to-left Arabic layouts, appropriate fonts and SEO for both languages." },
      { q: "Do you integrate UAE payment gateways?", a: "Yes. We integrate regional and international gateways such as Telr, PayTabs, Network International and Stripe, depending on your requirements." },
      { q: "Do you offer SEO for the Dubai market?", a: "Yes. We cover English and Arabic keyword research, local SEO, Google Business Profile and AI search visibility for Dubai audiences." },
    ],
  },
  {
    slug: "abu-dhabi",
    name: "Abu Dhabi",
    country: "United Arab Emirates",
    countryCode: "AE",
    region: "uae",
    metaTitle: "Software Development & Digital Agency in Abu Dhabi | The Orbit 7",
    metaDescription:
      "Software development, web and mobile apps, AI and SEO for Abu Dhabi organisations — secure, bilingual and built for enterprise, government-adjacent and growing businesses.",
    h1: "Software Development & Digital Services for Abu Dhabi Organisations",
    lead:
      "Secure custom software, bilingual digital platforms and data-driven marketing for Abu Dhabi enterprises, SMEs and fast-growing companies.",
    intro: [
      "Abu Dhabi's economy combines large enterprises, government-related entities, energy and industrial groups, and a growing startup and investment ecosystem around ADGM and Hub71. Digital projects here often carry higher expectations for security, documentation, accessibility and Arabic-language support.",
      "We work with Abu Dhabi organisations remotely, bringing structured delivery — clear requirements, documented architecture, testing and handover — alongside modern design and marketing. Whether you need an internal platform, a customer-facing app or stronger search visibility, we build with governance in mind.",
    ],
    local: [
      { title: "Security & documentation", text: "Clear architecture, access controls, audit logging and documentation suited to procurement and IT reviews." },
      { title: "Arabic-first experiences", text: "RTL interfaces and Arabic content quality for public-facing platforms." },
      { title: "Enterprise integrations", text: "Connections to ERP, CRM, identity providers and existing internal systems." },
      { title: "Accessible by design", text: "Interfaces built with accessibility guidelines in mind for broad public audiences." },
    ],
    industries: ["Energy & industrial", "Government-related entities", "Healthcare", "Education", "Finance & investment", "Real estate"],
    services: coreServices,
    faqs: [
      { q: "Do you work with enterprises in Abu Dhabi?", a: "Yes. We support enterprises and SMEs with documented, secure delivery and can work within your procurement and IT review processes." },
      { q: "Do you have an office in Abu Dhabi?", a: "We serve Abu Dhabi clients remotely, with scheduled calls, shared project tools and regular progress demos." },
      { q: "Can you integrate with our existing systems?", a: "Yes. We integrate with ERPs, CRMs, identity providers and custom internal APIs." },
      { q: "Do you provide Arabic SEO?", a: "Yes. We research Arabic and English search demand and optimise content for both." },
    ],
  },
  {
    slug: "sharjah",
    name: "Sharjah",
    country: "United Arab Emirates",
    countryCode: "AE",
    region: "uae",
    metaTitle: "App Development, Web Design & SEO in Sharjah | The Orbit 7",
    metaDescription:
      "Mobile app development, websites, SEO and digital marketing for Sharjah businesses, schools and manufacturers — bilingual, mobile-first and budget-conscious.",
    h1: "Mobile Apps, Websites & Digital Marketing for Sharjah Businesses",
    lead:
      "Practical, mobile-first digital solutions for Sharjah's SMEs, education providers, manufacturers and family businesses.",
    intro: [
      "Sharjah is home to a strong base of manufacturers, traders, education institutions and family-owned businesses, many of which serve customers across the northern emirates. Digital investment here tends to be practical: tools that save time, reach more customers and show clear returns.",
      "We help Sharjah businesses with mobile apps, websites, internal systems and marketing — designed bilingually where needed, built mobile-first and scoped to deliver value in phases rather than all at once.",
    ],
    local: [
      { title: "Phased, budget-aware delivery", text: "Start with an MVP or core features and expand as results come in." },
      { title: "Education & community", text: "Portals and apps for schools, training centres and community organisations." },
      { title: "Manufacturing & trade", text: "B2B catalogues, ordering portals and ERP integrations." },
      { title: "Northern emirates reach", text: "Local SEO and campaigns targeting Sharjah, Ajman and neighbouring areas." },
    ],
    industries: ["Manufacturing", "Education", "Trading & distribution", "Retail", "Healthcare", "Family businesses"],
    services: coreServices,
    faqs: [
      { q: "Do you build apps for Sharjah businesses?", a: "Yes. We design and develop iOS, Android and cross-platform apps for businesses in Sharjah, working remotely." },
      { q: "Can projects be delivered in phases?", a: "Yes. We often start with a focused first release and add features once it proves value." },
      { q: "Do you support Arabic?", a: "Yes. We build Arabic and English interfaces with right-to-left layouts." },
      { q: "Do you offer local SEO in Sharjah?", a: "Yes. We optimise Google Business Profiles and location pages for Sharjah and nearby emirates." },
    ],
  },
  {
    slug: "ajman",
    name: "Ajman",
    country: "United Arab Emirates",
    countryCode: "AE",
    region: "uae",
    metaTitle: "Web Development Company in Ajman | The Orbit 7",
    metaDescription:
      "Web development, ecommerce, SEO and digital marketing for Ajman SMEs and free zone companies. Fast, bilingual websites that generate enquiries across the UAE.",
    h1: "Web Development & Digital Growth for Ajman Businesses",
    lead:
      "Professional websites, online stores and marketing for Ajman's SMEs, startups and free zone companies — built to compete across the UAE.",
    intro: [
      "Ajman is a popular base for SMEs, startups and free zone companies that serve customers throughout the UAE and beyond. For many of these businesses, a professional website is the main way to build credibility with clients who may never visit in person.",
      "We help Ajman businesses launch fast, search-ready websites and ecommerce stores, connect them to WhatsApp and CRM tools, and attract enquiries through SEO and targeted ads — with clear pricing conversations and scope that fits SME budgets.",
    ],
    local: [
      { title: "Credibility for free zone companies", text: "Websites that present your company professionally to clients across the UAE and abroad." },
      { title: "Lead generation", text: "Contact forms, WhatsApp and CRM integration so no enquiry is missed." },
      { title: "UAE-wide SEO", text: "Target searches in Ajman, Sharjah, Dubai and nationwide." },
      { title: "Lean ecommerce", text: "Shopify or WooCommerce stores with local delivery and payment options." },
    ],
    industries: ["SMEs & startups", "Free zone companies", "Trading", "Retail", "Services", "Real estate"],
    services: coreServices,
    faqs: [
      { q: "Can you build a website for my Ajman free zone company?", a: "Yes. We design and develop professional websites for free zone companies, including bilingual content if required." },
      { q: "Do you work with small businesses?", a: "Yes. We scope projects to fit SME budgets and can deliver in phases." },
      { q: "Can my website connect to WhatsApp?", a: "Yes. We add WhatsApp click-to-chat and can integrate WhatsApp Business with your CRM." },
      { q: "Do you have an office in Ajman?", a: "We serve Ajman businesses remotely, with calls scheduled to suit you." },
    ],
  },
  {
    slug: "san-francisco",
    name: "San Francisco",
    country: "United States",
    countryCode: "US",
    region: "usa",
    metaTitle: "App & Software Development San Francisco | The Orbit 7",
    metaDescription:
      "Mobile app, SaaS and AI product development for San Francisco and Bay Area startups — senior engineering, product design and launch support with flexible engagement.",
    h1: "Product, App & AI Development for San Francisco Startups",
    lead:
      "An extension of your product team for MVPs, mobile apps, SaaS platforms and AI features — with the quality bar Bay Area investors and users expect.",
    intro: [
      "San Francisco and the wider Bay Area set the pace for software, AI and venture-backed startups. Teams need to ship quickly, but also meet high expectations for product design, engineering quality and security — especially when selling to enterprise customers.",
      "We work with San Francisco founders and product teams remotely as an embedded or project-based partner: validating ideas, designing products, building MVPs and scaling platforms, with practices such as code review, automated testing and documentation that make due diligence easier.",
    ],
    local: [
      { title: "Investor-ready engineering", text: "Clean architecture, tests and documentation that hold up to technical due diligence." },
      { title: "Enterprise expectations", text: "SSO, audit logs and security practices that support SOC 2-style requirements." },
      { title: "AI-native products", text: "LLM features, agents and evaluation pipelines built for production." },
      { title: "Async collaboration", text: "Clear written updates, demos and overlap hours that fit Pacific time." },
    ],
    industries: ["SaaS & B2B", "AI startups", "Fintech", "Health tech", "Developer tools", "Consumer apps"],
    services: ["mobile-app-development", "saas-development", "ai-product-development", "custom-web-application-development", "product-design", "ai-search-optimization"],
    faqs: [
      { q: "Do you work with Bay Area startups?", a: "Yes. We work remotely with startups and product teams, adapting to Pacific time for key meetings and using async updates in between." },
      { q: "Can you build an MVP for fundraising?", a: "Yes. We scope and build focused MVPs that demonstrate value to users and investors, on a stack that can scale." },
      { q: "Do you sign NDAs and IP assignment agreements?", a: "Yes. You own all code and IP we produce, and we're happy to sign NDAs." },
      { q: "Can you work alongside our in-house engineers?", a: "Yes. We can join your repositories, rituals and code review process." },
    ],
  },
  {
    slug: "new-york",
    name: "New York",
    country: "United States",
    countryCode: "US",
    region: "usa",
    metaTitle: "App, Software & Digital Agency New York | The Orbit 7",
    metaDescription:
      "Mobile apps, custom software, websites and SEO for New York companies in finance, media, retail and professional services — secure, polished and built for scale.",
    h1: "Software, Apps & Digital Growth for New York Companies",
    lead:
      "Secure platforms, premium mobile apps and high-performing marketing for New York's finance, media, retail and professional services businesses.",
    intro: [
      "New York's businesses operate in some of the world's most demanding sectors — finance, media, fashion, real estate and professional services. Digital products here must look premium, perform under pressure and, in regulated industries, meet strict security and compliance expectations.",
      "We work with New York companies remotely to design and build apps, platforms and websites, and to grow them through SEO and paid media. For financial services clients, we design with requirements such as the NYDFS Cybersecurity Regulation (23 NYCRR 500) in mind and document controls clearly.",
    ],
    local: [
      { title: "Fintech & financial services", text: "Secure architectures, audit trails and documentation for regulated environments." },
      { title: "Media & content", text: "Fast, high-traffic publishing platforms and video-first experiences." },
      { title: "Fashion & retail", text: "Premium ecommerce and mobile shopping experiences." },
      { title: "Competitive search", text: "SEO and AI search strategies for crowded NYC markets." },
    ],
    industries: ["Finance & fintech", "Media & publishing", "Fashion & retail", "Real estate", "Professional services", "Healthcare"],
    services: ["mobile-app-development", "custom-software-development", "website-development", "seo-services", "google-ads-ppc", "ai-application-development"],
    faqs: [
      { q: "Do you build fintech apps for New York companies?", a: "Yes. We build secure fintech apps and platforms with strong authentication, encryption, audit logging and documentation suitable for compliance reviews." },
      { q: "Do you have a New York office?", a: "We serve New York clients remotely, with meetings scheduled to fit Eastern time." },
      { q: "Can you handle high-traffic websites?", a: "Yes. We use caching, CDNs and scalable cloud infrastructure for high-traffic platforms." },
      { q: "Do you offer SEO for New York businesses?", a: "Yes, including local SEO for neighbourhood-level visibility and AI search optimisation." },
    ],
  },
  {
    slug: "austin",
    name: "Austin",
    country: "United States",
    countryCode: "US",
    region: "usa",
    metaTitle: "App & Software Development for Austin Startups | The Orbit 7",
    metaDescription:
      "Mobile app, SaaS and web development for Austin, Texas startups and growing companies — fast MVPs, product design and AI features with flexible engagement models.",
    h1: "App & Software Development for Austin's Startups and Scale-Ups",
    lead:
      "Fast, well-engineered MVPs, mobile apps and SaaS platforms for Austin founders and growing Texas companies.",
    intro: [
      "Austin has become one of the most active startup and technology hubs in the United States, attracting founders, tech companies and investors. Many teams need to move quickly on limited budgets while building products that can scale if they take off.",
      "We help Austin startups and scale-ups validate ideas, design products and ship MVPs, mobile apps and SaaS platforms — working remotely with overlap during Central time and flexible engagement models that grow with your company.",
    ],
    local: [
      { title: "Startup-speed MVPs", text: "Focused scopes that get you in front of users fast." },
      { title: "Scale-ready foundations", text: "Architecture that grows with your user base." },
      { title: "Creator & consumer apps", text: "Polished consumer experiences and creator tools." },
      { title: "Flexible teams", text: "Scale design and engineering capacity up or down." },
    ],
    industries: ["SaaS", "Consumer apps", "Health tech", "Creator economy", "Energy tech", "Ecommerce"],
    services: ["mobile-app-development", "saas-development", "ai-product-development", "ui-ux-design", "website-development", "seo-services"],
    faqs: [
      { q: "Do you build MVPs for Austin startups?", a: "Yes. We help founders define and build a focused MVP, then iterate based on user feedback." },
      { q: "Do you work in Central time?", a: "We work remotely and schedule key meetings within Central time business hours." },
      { q: "Can you build both the app and the backend?", a: "Yes. We build mobile apps, web apps, APIs and admin tools as one team." },
      { q: "Can we scale the team later?", a: "Yes. Engagements can grow from a small team to a larger dedicated team as needed." },
    ],
  },
  {
    slug: "los-angeles",
    name: "Los Angeles",
    country: "United States",
    countryCode: "US",
    region: "usa",
    metaTitle: "Digital Agency for Los Angeles Brands | The Orbit 7",
    metaDescription:
      "Apps, ecommerce websites, video editing and digital marketing for Los Angeles creators, entertainment brands and DTC companies — creative, fast and performance-driven.",
    h1: "Digital Agency for Los Angeles Creators, Brands & Entertainment Companies",
    lead:
      "Ecommerce, apps, video editing and growth marketing for LA's creator economy, entertainment brands and direct-to-consumer companies.",
    intro: [
      "Los Angeles is a global centre for entertainment, media and the creator economy, as well as a major hub for direct-to-consumer brands. Success here depends on standout creative, fast-moving content and digital experiences that convert attention into customers.",
      "We support LA creators and brands remotely with ecommerce stores, apps and websites, a full video editing service for podcasts, YouTube and short-form content, and paid and organic marketing that turns audiences into revenue.",
    ],
    local: [
      { title: "Creator economy", text: "Podcast, YouTube and short-form editing for creators and media brands." },
      { title: "DTC ecommerce", text: "High-converting Shopify and headless stores." },
      { title: "Entertainment & media", text: "Fan apps, content platforms and campaign sites." },
      { title: "Performance creative", text: "Ad creatives tested across Meta, TikTok and YouTube." },
    ],
    industries: ["Entertainment & media", "Creators & influencers", "DTC & fashion", "Beauty & wellness", "Hospitality", "Real estate"],
    services: ["podcast-video-editing", "ecommerce-development", "mobile-app-development", "social-media-marketing", "promotional-video-editing", "seo-services"],
    faqs: [
      { q: "Do you edit podcasts and YouTube videos for LA creators?", a: "Yes. We provide podcast, YouTube, Reels and TikTok editing, working remotely with creators across time zones." },
      { q: "Can you build a Shopify store for our brand?", a: "Yes. We design and develop Shopify and headless ecommerce stores, and can run the marketing too." },
      { q: "Do you have an office in Los Angeles?", a: "We serve Los Angeles clients remotely, scheduling calls in Pacific time." },
      { q: "Can you produce ad creatives?", a: "Yes. We edit ad creatives with hook variations for testing across platforms." },
    ],
  },
  {
    slug: "chicago",
    name: "Chicago",
    country: "United States",
    countryCode: "US",
    region: "usa",
    metaTitle: "Custom Software & Digital Services Chicago | The Orbit 7",
    metaDescription:
      "Custom software, ERP and CRM, web platforms, AI automation and SEO for Chicago companies in logistics, manufacturing, finance and professional services.",
    h1: "Custom Software & Digital Services for Chicago Companies",
    lead:
      "Practical software, automation and marketing for Chicago's logistics, manufacturing, financial and professional services companies.",
    intro: [
      "Chicago's economy is anchored in logistics, manufacturing, finance, food and professional services — sectors where operational efficiency and reliable systems matter as much as marketing. Many companies run on a mix of legacy software, spreadsheets and disconnected tools.",
      "We help Chicago companies modernise operations with custom software, ERP and CRM systems, integrations and AI automation, and grow their pipeline with websites, SEO and paid search — working remotely with overlap in Central time.",
    ],
    local: [
      { title: "Logistics & supply chain", text: "Tracking dashboards, carrier integrations and warehouse tools." },
      { title: "Manufacturing", text: "ERP modules, production tracking and B2B ordering portals." },
      { title: "Legacy modernisation", text: "Replace spreadsheets and ageing systems step by step." },
      { title: "B2B lead generation", text: "Websites, SEO and Google Ads for longer sales cycles." },
    ],
    industries: ["Logistics", "Manufacturing", "Finance & trading", "Food & beverage", "Professional services", "Healthcare"],
    services: ["custom-software-development", "erp-development", "ai-automation", "api-development-integration", "website-development", "seo-services"],
    faqs: [
      { q: "Can you modernise our legacy software?", a: "Yes. We modernise in phases, running old and new systems side by side to avoid disruption." },
      { q: "Do you build ERP and CRM systems?", a: "Yes. We build custom systems and implement platforms such as Odoo, HubSpot and Salesforce." },
      { q: "Do you have a Chicago office?", a: "We serve Chicago clients remotely, scheduling meetings in Central time." },
      { q: "Can AI automation help our operations team?", a: "Yes. We automate document processing, reporting, data entry and routing with AI and workflow tools." },
    ],
  },
  {
    slug: "toronto",
    name: "Toronto",
    country: "Canada",
    countryCode: "CA",
    region: "intl",
    metaTitle: "App & Software Development for Toronto Businesses | The Orbit 7",
    metaDescription:
      "Mobile app development, custom software, websites and SEO for Toronto and Canadian businesses — privacy-aware, bilingual-ready and built for growth.",
    h1: "App & Software Development for Toronto and Canadian Businesses",
    lead:
      "Mobile apps, platforms and digital marketing for Toronto's fintech, health, retail and technology companies — privacy-aware and ready for Canadian audiences.",
    intro: [
      "Toronto is Canada's largest business centre and a leading hub for fintech, AI research, health and retail. Canadian customers expect strong privacy practices, and national businesses often need English and French support for audiences beyond Ontario.",
      "We work with Toronto companies remotely to build apps, web platforms and marketing programmes, designing with Canada's PIPEDA privacy principles in mind and planning for bilingual content and Canadian payment preferences such as Interac where relevant.",
    ],
    local: [
      { title: "Privacy-aware design", text: "Data handling designed with PIPEDA principles and provincial rules in mind." },
      { title: "Bilingual readiness", text: "English and French content architecture for national audiences." },
      { title: "Fintech & payments", text: "Secure platforms and Canadian payment integrations." },
      { title: "AI products", text: "Practical AI features drawing on Toronto's strong AI ecosystem." },
    ],
    industries: ["Fintech", "Health tech", "Retail", "AI & SaaS", "Real estate", "Education"],
    services: ["mobile-app-development", "custom-software-development", "ai-application-development", "website-development", "seo-services", "ui-ux-design"],
    faqs: [
      { q: "Do you build apps for Toronto businesses?", a: "Yes. We build iOS, Android and cross-platform apps for Toronto and Canadian businesses, working remotely in Eastern time." },
      { q: "Do you support French-language content?", a: "Yes. We plan bilingual content structures and can implement English and French versions." },
      { q: "How do you handle privacy?", a: "We design with PIPEDA principles in mind — consent, minimal data collection, security safeguards and clear policies." },
      { q: "Do you have a Toronto office?", a: "We serve Toronto clients remotely, with meetings scheduled to suit you." },
    ],
  },
  {
    slug: "london",
    name: "London",
    country: "United Kingdom",
    countryCode: "GB",
    region: "intl",
    metaTitle: "App, Software & Digital Agency for London Businesses | The Orbit 7",
    metaDescription:
      "Mobile app development, custom software, websites, SEO and digital marketing for London businesses — UK GDPR-aware, accessible and built for competitive markets.",
    h1: "App, Software & Digital Marketing for London Businesses",
    lead:
      "Mobile apps, platforms, websites and growth marketing for London's fintech, professional services, retail and creative companies.",
    intro: [
      "London is Europe's leading fintech hub and home to world-class professional services, retail and creative industries. UK customers expect accessible, privacy-respecting digital experiences, and regulated sectors face clear rules around data and security.",
      "We work with London businesses remotely to design and build apps, platforms and websites, and to grow them with SEO and paid media — designing with UK GDPR and the Data Protection Act 2018 in mind, and with accessibility built in from the start.",
    ],
    local: [
      { title: "UK GDPR-aware", text: "Privacy by design, consent management and secure data handling." },
      { title: "Fintech & Open Banking", text: "Secure financial products and Open Banking integrations." },
      { title: "Accessibility", text: "Interfaces designed with WCAG guidelines for inclusive experiences." },
      { title: "Competitive SEO", text: "Strategies for crowded London and UK-wide search markets." },
    ],
    industries: ["Fintech", "Professional services", "Retail & ecommerce", "Creative & media", "Property", "Healthcare"],
    services: ["mobile-app-development", "custom-software-development", "website-development", "seo-services", "ai-application-development", "branding-identity"],
    faqs: [
      { q: "Do you build apps for London companies?", a: "Yes. We build native and cross-platform apps for London businesses, working remotely with meetings in UK hours." },
      { q: "Do you comply with UK GDPR?", a: "We design and build with UK GDPR and the Data Protection Act 2018 in mind, including consent, data minimisation and security safeguards, and support your compliance processes." },
      { q: "Do you have a London office?", a: "We serve London clients remotely, with regular video calls and demos." },
      { q: "Can you help with UK SEO?", a: "Yes. We provide UK-focused SEO, local SEO and AI search optimisation." },
    ],
  },
  {
    slug: "singapore",
    name: "Singapore",
    country: "Singapore",
    countryCode: "SG",
    region: "intl",
    metaTitle: "App & Software Development for Singapore Businesses | The Orbit 7",
    metaDescription:
      "Mobile app development, custom software, AI and digital marketing for Singapore and APAC businesses — PDPA-aware, secure and built for regional expansion.",
    h1: "App, Software & AI Development for Singapore and APAC Businesses",
    lead:
      "Secure apps, platforms and AI solutions for Singapore companies — and for businesses using Singapore as a base for regional growth.",
    intro: [
      "Singapore is a leading regional hub for finance, logistics, technology and regional headquarters across Asia-Pacific. Digital products often serve multilingual audiences across several countries and must meet high standards for security and data protection.",
      "We work with Singapore businesses remotely to build apps, platforms and AI solutions, designing with the Personal Data Protection Act (PDPA) in mind, supporting local payment methods such as PayNow and planning for multilingual, multi-market expansion.",
    ],
    local: [
      { title: "PDPA-aware design", text: "Consent, data protection and security practices aligned with PDPA obligations." },
      { title: "Regional scalability", text: "Multi-country, multi-currency and multilingual architectures." },
      { title: "Local payments", text: "PayNow and regional payment integrations where needed." },
      { title: "Fintech & logistics", text: "Secure financial products and supply chain platforms." },
    ],
    industries: ["Fintech", "Logistics", "Regional HQs", "Ecommerce", "Education", "Healthcare"],
    services: ["mobile-app-development", "custom-software-development", "ai-application-development", "saas-development", "seo-services", "website-development"],
    faqs: [
      { q: "Do you build apps for Singapore businesses?", a: "Yes. We build iOS, Android and cross-platform apps for Singapore companies, working remotely." },
      { q: "Do you consider PDPA requirements?", a: "Yes. We design data handling, consent and security with PDPA obligations in mind and support your compliance processes." },
      { q: "Can you support multiple languages and markets?", a: "Yes. We build multilingual, multi-currency platforms for APAC expansion." },
      { q: "Do you have an office in Singapore?", a: "We serve Singapore clients remotely, scheduling calls to suit your time zone." },
    ],
  },
];

/** High-intent service × location pages, each with unique local content. */
export const localServicePages: LocalServicePage[] = [
  {
    city: "dubai",
    slug: "software-development",
    service: "custom-software-development",
    title: "Software Development Company in Dubai",
    metaTitle: "Software Development Company in Dubai, UAE | The Orbit 7",
    metaDescription:
      "Custom software development for Dubai businesses: ERP, CRM, portals and automation with Arabic support, UAE integrations and secure, documented delivery.",
    h1: "Software Development Company in Dubai",
    lead: "Custom software, ERP, CRM and business platforms for Dubai companies — bilingual, integrated with UAE services and engineered to scale.",
    intro: [
      "Fast-growing Dubai businesses often outgrow off-the-shelf tools quickly: property firms juggling leads across portals, trading companies managing multi-currency stock, clinics coordinating bookings and records, and service companies running operations on spreadsheets.",
      "We build custom software around those workflows — with Arabic and English interfaces, UAE VAT-ready invoicing logic, WhatsApp notifications and integrations with regional payment gateways and accounting tools — delivered in documented phases so value arrives early.",
    ],
    considerations: [
      { title: "VAT-ready finance logic", text: "Invoices, credit notes and reports structured for UAE VAT requirements, validated with your accountant." },
      { title: "Arabic & English UI", text: "Bilingual interfaces with right-to-left layouts for staff and customers." },
      { title: "Integrations", text: "Property portals, payment gateways, WhatsApp Business, ERP and accounting systems." },
      { title: "Data protection", text: "Access control, encryption and data handling designed with the UAE PDPL in mind." },
    ],
    faqs: [
      { q: "How much does custom software development cost in Dubai?", a: "Cost depends on scope, integrations and complexity. We start with a discovery phase and provide a written, phased proposal before development." },
      { q: "Can you build ERP or CRM systems for Dubai companies?", a: "Yes. We build custom ERP and CRM systems and implement platforms like Odoo, HubSpot and Zoho with UAE-specific configuration." },
      { q: "Do you support Arabic interfaces?", a: "Yes. We build full Arabic and English interfaces with right-to-left support." },
    ],
    related: ["erp-development", "crm-development", "ai-automation", "api-development-integration"],
  },
  {
    city: "dubai",
    slug: "website-development",
    service: "website-development",
    title: "Website Development Company in Dubai",
    metaTitle: "Website Development Company in Dubai | The Orbit 7",
    metaDescription:
      "Website design and development for Dubai businesses: fast, bilingual English–Arabic websites with SEO, WhatsApp and CRM integration that turn visitors into enquiries.",
    h1: "Website Development Company in Dubai",
    lead: "Premium, bilingual websites for Dubai brands — fast, search-ready and connected to WhatsApp and your CRM.",
    intro: [
      "In Dubai, your website competes with polished regional and international brands for the same customers. Visitors expect premium design, instant loading on mobile, content in their preferred language and an easy way to reach you — usually WhatsApp.",
      "We design and develop websites that meet that bar: bespoke design, English and Arabic versions with correct RTL layouts, SEO for both languages, and lead capture connected to WhatsApp Business and your CRM.",
    ],
    considerations: [
      { title: "Bilingual SEO", text: "Separate, properly linked English and Arabic pages with hreflang so each ranks for its audience." },
      { title: "WhatsApp-first enquiries", text: "Click-to-chat, tracked conversions and CRM integration." },
      { title: "Premium visual design", text: "Design quality that matches Dubai's luxury and lifestyle expectations." },
      { title: "Performance on mobile", text: "Optimised for fast loading on mobile networks." },
    ],
    faqs: [
      { q: "Can you build an Arabic and English website?", a: "Yes. We build bilingual websites with right-to-left Arabic layouts and SEO for both languages." },
      { q: "How long does a website take?", a: "It depends on pages, features and content readiness. We provide a milestone timeline in our proposal." },
      { q: "Will my website work with WhatsApp?", a: "Yes. We add WhatsApp click-to-chat and can integrate WhatsApp Business with your CRM." },
    ],
    related: ["seo-services", "local-seo", "ecommerce-development", "wordpress-development"],
  },
  {
    city: "dubai",
    slug: "seo-services",
    service: "seo-services",
    title: "SEO Services in Dubai",
    metaTitle: "SEO Services in Dubai | SEO & AI Search Agency UAE | The Orbit 7",
    metaDescription:
      "SEO services in Dubai: English and Arabic keyword research, local SEO, technical SEO and AI search optimisation to help Dubai businesses rank and win enquiries.",
    h1: "SEO Services in Dubai",
    lead: "Bilingual SEO, local search and AI search optimisation that help Dubai businesses rank, get cited and win enquiries.",
    intro: [
      "Dubai search results are crowded with directories, portals and international brands. Ranking requires more than keywords: a technically sound site, content in English and Arabic, a strong Google Business Profile and authority signals relevant to the UAE.",
      "Our SEO team researches how Dubai customers actually search — including Arabic queries and area-specific searches such as Downtown, Business Bay or JLT — then fixes technical issues, builds helpful content and strengthens your local presence. We also optimise for AI-powered search, where buyers increasingly ask for recommendations.",
    ],
    considerations: [
      { title: "Arabic keyword research", text: "Arabic search terms researched natively, not just translated." },
      { title: "Area-level local SEO", text: "Visibility for neighbourhood and free zone searches." },
      { title: "Portal competition", text: "Strategies to compete with directories and marketplaces." },
      { title: "AI search", text: "Optimisation for AI Overviews and AI assistants." },
    ],
    faqs: [
      { q: "Do you provide Arabic SEO in Dubai?", a: "Yes. We research Arabic keywords and optimise Arabic pages alongside English." },
      { q: "How long does SEO take in Dubai?", a: "Competitive markets typically take several months of consistent work. We share a roadmap and report monthly. No agency can guarantee rankings." },
      { q: "Do you optimise Google Business Profiles?", a: "Yes. Local SEO for Dubai includes Google Business Profile optimisation, reviews strategy and location pages." },
    ],
    related: ["local-seo", "technical-seo", "ai-search-optimization", "google-ads-ppc"],
  },
  {
    city: "dubai",
    slug: "ai-development",
    service: "ai-application-development",
    title: "AI Development Company in Dubai",
    metaTitle: "AI Development Company in Dubai | AI Solutions UAE | The Orbit 7",
    metaDescription:
      "AI development for Dubai businesses: Arabic and English AI assistants, document automation, AI agents and LLM integrations built securely for the UAE market.",
    h1: "AI Development Company in Dubai",
    lead: "Practical AI for Dubai businesses — bilingual assistants, document automation and AI agents built securely and measured by results.",
    intro: [
      "The UAE has made artificial intelligence a national priority, and Dubai businesses are moving quickly to adopt it — from customer service assistants on WhatsApp to automated document processing and AI-powered analytics.",
      "We build AI solutions that work in the real world: assistants that answer in Arabic and English from your own knowledge, automations that read and route documents, and agents that act across your systems with human approval — with data handling designed around UAE requirements.",
    ],
    considerations: [
      { title: "Arabic and English AI", text: "Assistants tested for quality in both languages." },
      { title: "WhatsApp AI", text: "AI-assisted replies and booking flows on WhatsApp Business." },
      { title: "Data residency options", text: "Model and hosting choices that reflect your data requirements." },
      { title: "Measured ROI", text: "Evaluation and analytics that show business impact." },
    ],
    faqs: [
      { q: "Can AI assistants answer in Arabic?", a: "Yes. Modern language models support Arabic; we test quality on your content in both Arabic and English." },
      { q: "Can AI work on WhatsApp?", a: "Yes. We build AI-assisted WhatsApp flows with handover to your team." },
      { q: "How do you protect our data?", a: "We limit data sent to models, choose suitable providers and hosting, apply access controls and log usage." },
    ],
    related: ["ai-automation", "ai-agent-development", "ai-integration", "generative-ai-development"],
  },
  {
    city: "dubai",
    slug: "mobile-app-development",
    service: "mobile-app-development",
    title: "Mobile App Development Company in Dubai",
    metaTitle: "Mobile App Development Company in Dubai, UAE | The Orbit 7",
    metaDescription:
      "Mobile app development in Dubai: bilingual iOS and Android apps with UAE payments, integration-ready architecture and premium UX for property, retail, hospitality and fintech.",
    h1: "Mobile App Development Company in Dubai",
    lead: "Premium iOS and Android apps for Dubai brands — bilingual, integrated with UAE payments and designed for a smartphone-first market.",
    intro: [
      "Smartphone use in the UAE is extremely high, and Dubai consumers use apps for everything from food delivery and property search to banking and government services. A brand app has to feel as polished as the best apps on their phone.",
      "We design and build iOS, Android and cross-platform apps for Dubai businesses with Arabic and English interfaces, regional payment gateways, Apple Pay and Google Pay, push notifications and analytics — and an architecture ready to integrate national digital identity services where your use case requires it.",
    ],
    considerations: [
      { title: "Bilingual app UX", text: "Mirrored RTL layouts and Arabic typography done properly." },
      { title: "Payments", text: "Regional gateways plus Apple Pay and Google Pay." },
      { title: "Premium design", text: "Interfaces that match Dubai's high expectations." },
      { title: "Integration readiness", text: "Architecture prepared for identity, mapping and delivery APIs." },
    ],
    faqs: [
      { q: "Do you build Arabic mobile apps?", a: "Yes. We build bilingual apps with full right-to-left support." },
      { q: "Which payment options can the app support?", a: "Regional gateways such as Telr, PayTabs and Network International, plus Apple Pay, Google Pay and Stripe where suitable." },
      { q: "Do you publish apps to the App Store and Google Play?", a: "Yes. We handle store listings and submission." },
    ],
    related: ["ios-app-development", "android-app-development", "flutter-app-development", "ui-ux-design"],
  },
  {
    city: "abu-dhabi",
    slug: "software-development",
    service: "custom-software-development",
    title: "Software Development Company in Abu Dhabi",
    metaTitle: "Software Development Company in Abu Dhabi | The Orbit 7",
    metaDescription:
      "Custom software development in Abu Dhabi: secure enterprise platforms, integrations and internal tools with documentation and bilingual interfaces for UAE organisations.",
    h1: "Software Development Company in Abu Dhabi",
    lead: "Secure, well-documented custom software for Abu Dhabi enterprises, SMEs and growing organisations.",
    intro: [
      "Software projects in Abu Dhabi frequently involve larger organisations, formal procurement and careful IT review. Success depends on clear requirements, documented architecture, security controls and a delivery process stakeholders can follow.",
      "We bring that structure — discovery workshops, written specifications, testing and handover documentation — while building modern, bilingual platforms that integrate with your existing ERP, CRM and identity systems.",
    ],
    considerations: [
      { title: "Procurement-friendly delivery", text: "Clear proposals, milestones and documentation." },
      { title: "Identity & access", text: "SSO, role-based access and audit logs." },
      { title: "System integration", text: "ERP, CRM and data warehouse connections." },
      { title: "Bilingual interfaces", text: "Arabic and English for staff and the public." },
    ],
    faqs: [
      { q: "Can you work within our procurement process?", a: "Yes. We provide detailed proposals, documentation and milestones suited to formal reviews." },
      { q: "Do you provide documentation and handover?", a: "Yes. Architecture, user and technical documentation are part of delivery." },
      { q: "Can you integrate with SSO?", a: "Yes. We integrate with identity providers via standards such as SAML and OpenID Connect." },
    ],
    related: ["erp-development", "api-development-integration", "custom-web-application-development", "ai-integration"],
  },
  {
    city: "abu-dhabi",
    slug: "seo-services",
    service: "seo-services",
    title: "SEO Services in Abu Dhabi",
    metaTitle: "SEO Services in Abu Dhabi | SEO & AI Search UAE | The Orbit 7",
    metaDescription:
      "SEO services in Abu Dhabi: bilingual keyword research, technical SEO, local search and AI search optimisation for Abu Dhabi businesses and organisations.",
    h1: "SEO Services in Abu Dhabi",
    lead: "Bilingual SEO and AI search optimisation that help Abu Dhabi businesses reach the right audiences.",
    intro: [
      "Search behaviour in Abu Dhabi differs from Dubai: audiences include government-related entities, enterprise buyers, residents seeking local services and visitors to cultural destinations. Many searches happen in Arabic, and decision-makers often research thoroughly before making contact.",
      "We combine Arabic and English keyword research, technical SEO, authoritative content and local optimisation to make sure your organisation appears for the searches that matter — including in AI-generated answers.",
    ],
    considerations: [
      { title: "B2B & enterprise search", text: "Content for considered, research-heavy buying journeys." },
      { title: "Arabic content", text: "Native Arabic SEO alongside English." },
      { title: "Local visibility", text: "Google Business Profile and location pages for Abu Dhabi areas." },
      { title: "Authority building", text: "Credible mentions from relevant UAE sources." },
    ],
    faqs: [
      { q: "Do you offer bilingual SEO in Abu Dhabi?", a: "Yes. We optimise Arabic and English content and implement hreflang correctly." },
      { q: "Can you help B2B companies in Abu Dhabi?", a: "Yes. We build content and SEO strategies for long B2B buying cycles." },
      { q: "Do you guarantee rankings?", a: "No reputable agency can guarantee rankings. We commit to transparent work and monthly reporting." },
    ],
    related: ["local-seo", "technical-seo", "answer-engine-optimization", "content-marketing"],
  },
  {
    city: "ajman",
    slug: "web-development",
    service: "website-development",
    title: "Web Development Company in Ajman",
    metaTitle: "Web Development Company in Ajman, UAE | The Orbit 7",
    metaDescription:
      "Web development in Ajman: professional, bilingual websites and online stores for SMEs and free zone companies, with SEO and WhatsApp lead capture built in.",
    h1: "Web Development Company in Ajman",
    lead: "Professional websites and online stores that help Ajman SMEs and free zone companies win clients across the UAE.",
    intro: [
      "For many Ajman-based companies, especially those registered in the free zone, the website is the first and sometimes only impression a client gets. It needs to establish credibility, explain services clearly and make it easy to get in touch.",
      "We build fast, professional websites and ecommerce stores scoped for SME budgets — with bilingual content where needed, SEO foundations targeting customers across the UAE, and WhatsApp and form enquiries routed straight to your team.",
    ],
    considerations: [
      { title: "SME-friendly scope", text: "Start lean and add features as you grow." },
      { title: "UAE-wide reach", text: "SEO targeting customers beyond Ajman." },
      { title: "Easy to update", text: "CMS training so your team can edit content." },
      { title: "Lead capture", text: "WhatsApp and form enquiries with tracking." },
    ],
    faqs: [
      { q: "Can you build a website for my Ajman free zone company?", a: "Yes. We build professional company websites, including bilingual versions." },
      { q: "Can I update the website myself?", a: "Yes. We set up an easy CMS and train your team." },
      { q: "Do you build online stores?", a: "Yes. We build Shopify and WooCommerce stores with local delivery and payment options." },
    ],
    related: ["website-development", "ecommerce-development", "local-seo", "website-maintenance"],
  },
  {
    city: "sharjah",
    slug: "mobile-app-development",
    service: "mobile-app-development",
    title: "Mobile App Development Company in Sharjah",
    metaTitle: "Mobile App Development Company in Sharjah, UAE | The Orbit 7",
    metaDescription:
      "Mobile app development in Sharjah: iOS and Android apps for schools, retailers, manufacturers and service businesses — bilingual, practical and delivered in phases.",
    h1: "Mobile App Development Company in Sharjah",
    lead: "Practical iOS and Android apps for Sharjah's schools, retailers, manufacturers and service businesses.",
    intro: [
      "Sharjah businesses often need apps that solve concrete problems: parents receiving school updates, customers reordering products, field staff logging visits or members booking services. The best results come from focused apps that do a few things very well.",
      "We design and build bilingual iOS and Android apps — often cross-platform to control cost — delivered in phases, with admin dashboards so your team can manage content and users without technical help.",
    ],
    considerations: [
      { title: "Focused first release", text: "Launch with core features, then expand." },
      { title: "Cost-efficient cross-platform", text: "One codebase for iOS and Android where suitable." },
      { title: "Admin dashboards", text: "Manage content, users and orders easily." },
      { title: "Bilingual experience", text: "Arabic and English for families and customers." },
    ],
    faqs: [
      { q: "Do you build school and education apps?", a: "Yes. We build apps for announcements, timetables, payments and parent communication." },
      { q: "Should we build native or cross-platform?", a: "Many Sharjah projects suit cross-platform development for cost efficiency; we recommend based on features." },
      { q: "Do you provide an admin panel?", a: "Yes. Apps come with a web dashboard for your team." },
    ],
    related: ["cross-platform-app-development", "flutter-app-development", "mobile-app-development", "ui-ux-design"],
  },
  {
    city: "san-francisco",
    slug: "mobile-app-development",
    service: "mobile-app-development",
    title: "Mobile App Development in San Francisco",
    metaTitle: "Mobile App Development San Francisco | The Orbit 7",
    metaDescription:
      "Mobile app development for San Francisco startups and product teams: investor-ready MVPs, native and cross-platform apps, AI features and senior engineering practices.",
    h1: "Mobile App Development for San Francisco Startups & Product Teams",
    lead: "Investor-ready MVPs and production apps for Bay Area teams — native or cross-platform, with AI features where they add real value.",
    intro: [
      "Bay Area users are early adopters with high expectations, and investors look closely at product quality and engineering practices. A San Francisco app needs to feel polished from the first release and be built on foundations that survive rapid growth.",
      "We work as a remote extension of your team: product discovery, UX design, native or cross-platform engineering, backend and analytics — with code review, automated tests and documentation that make technical due diligence straightforward.",
    ],
    considerations: [
      { title: "Due-diligence ready", text: "Tests, documentation and clean architecture." },
      { title: "AI-powered features", text: "On-device and cloud AI that improves the core experience." },
      { title: "Analytics from day one", text: "Event tracking that informs product decisions." },
      { title: "Pacific-time overlap", text: "Key meetings in your working hours." },
    ],
    faqs: [
      { q: "Can you build our seed-stage MVP?", a: "Yes. We help scope and build a focused MVP that demonstrates traction." },
      { q: "Native or cross-platform for a startup?", a: "Cross-platform often speeds up early stages; native suits performance- or platform-heavy products. We recommend based on your roadmap." },
      { q: "Who owns the code?", a: "You do — all code and IP are assigned to your company." },
    ],
    related: ["ios-app-development", "react-native-development", "ai-product-development", "product-design"],
  },
  {
    city: "new-york",
    slug: "mobile-app-development",
    service: "mobile-app-development",
    title: "Mobile App Development in New York",
    metaTitle: "Mobile App Development New York | The Orbit 7",
    metaDescription:
      "Mobile app development for New York companies: secure fintech apps, media and retail apps with premium design, strong security and scalable backends.",
    h1: "Mobile App Development for New York Companies",
    lead: "Secure, premium iOS and Android apps for New York's finance, media, retail and real estate businesses.",
    intro: [
      "New York apps serve demanding users — traders, shoppers, readers and residents who compare every experience with the best on their phone. In financial services, apps must also satisfy strict security expectations.",
      "We design and build apps with premium UX, biometric authentication, encryption, secure APIs and audit logging, plus the scalable backends and analytics needed to support high usage.",
    ],
    considerations: [
      { title: "Financial-grade security", text: "Biometrics, encryption, secure storage and audit trails." },
      { title: "Premium UX", text: "Design that stands out in competitive categories." },
      { title: "Content & commerce", text: "Media, shopping and subscription experiences." },
      { title: "Eastern-time collaboration", text: "Meetings scheduled in your hours." },
    ],
    faqs: [
      { q: "Do you build fintech apps?", a: "Yes, with strong authentication, encryption and documentation suited to compliance reviews." },
      { q: "Can you build subscription apps?", a: "Yes. We implement in-app subscriptions, paywalls and analytics." },
      { q: "Do you provide ongoing support?", a: "Yes. We offer maintenance, OS updates and feature development." },
    ],
    related: ["ios-app-development", "android-app-development", "backend-development", "ui-ux-design"],
  },
  {
    city: "austin",
    slug: "mobile-app-development",
    service: "mobile-app-development",
    title: "Mobile App Development in Austin",
    metaTitle: "Mobile App Development Austin, TX | Startup MVPs | The Orbit 7",
    metaDescription:
      "Mobile app development for Austin startups and growing Texas companies: fast MVPs, cross-platform apps and scalable backends with flexible engagement.",
    h1: "Mobile App Development for Austin Startups",
    lead: "Fast, well-built mobile MVPs and apps for Austin founders and growing Texas businesses.",
    intro: [
      "Austin's startup community moves quickly, and founders need to test ideas with real users before budgets run out. The right first app is focused, well-designed and built on code that won't need to be thrown away.",
      "We help Austin teams define the smallest valuable product, design it, build it cross-platform or native, and launch with analytics so the next decisions are based on data.",
    ],
    considerations: [
      { title: "Lean scoping", text: "Build what proves the idea first." },
      { title: "Cross-platform speed", text: "Launch on iOS and Android together." },
      { title: "Growth-ready backend", text: "APIs and infrastructure that scale." },
      { title: "Central-time overlap", text: "Meetings in your working day." },
    ],
    faqs: [
      { q: "How fast can an MVP launch?", a: "It depends on scope. We define a focused feature set and share a milestone timeline in the proposal." },
      { q: "Can you help us find product–market fit?", a: "We help design experiments, analytics and iterations that test your assumptions." },
      { q: "Do you work with pre-seed founders?", a: "Yes. We scope work to fit early-stage budgets." },
    ],
    related: ["flutter-app-development", "react-native-development", "saas-development", "product-design"],
  },
  {
    city: "toronto",
    slug: "mobile-app-development",
    service: "mobile-app-development",
    title: "Mobile App Development Company in Toronto",
    metaTitle: "Mobile App Development Company Toronto, Canada | The Orbit 7",
    metaDescription:
      "Mobile app development in Toronto: privacy-aware iOS and Android apps for fintech, health and retail with bilingual-ready content and Canadian payment integrations.",
    h1: "Mobile App Development Company for Toronto Businesses",
    lead: "Privacy-aware, bilingual-ready iOS and Android apps for Toronto's fintech, health and retail companies.",
    intro: [
      "Canadian users value privacy, and apps in health and finance face particular scrutiny over how personal information is collected and stored. National apps also often need to support both official languages.",
      "We build Toronto apps with consent flows, minimal data collection and strong security, designed with PIPEDA principles in mind, plus English and French content structures and Canadian payment integrations where relevant.",
    ],
    considerations: [
      { title: "Privacy by design", text: "Consent, minimisation and secure storage." },
      { title: "English & French", text: "Bilingual-ready app content." },
      { title: "Health & fintech", text: "Experience with sensitive-data products." },
      { title: "Eastern-time collaboration", text: "Calls in your working hours." },
    ],
    faqs: [
      { q: "Do you build bilingual apps for Canada?", a: "Yes. We structure apps for English and French content." },
      { q: "How do you handle health data?", a: "We apply strict access control, encryption and data minimisation, and design with applicable privacy rules in mind." },
      { q: "Do you integrate Canadian payments?", a: "Yes. We integrate payment providers that support Canadian methods where needed." },
    ],
    related: ["ios-app-development", "android-app-development", "cross-platform-app-development", "backend-development"],
  },
  {
    city: "london",
    slug: "mobile-app-development",
    service: "mobile-app-development",
    title: "Mobile App Development Company in London",
    metaTitle: "Mobile App Development Company London, UK | The Orbit 7",
    metaDescription:
      "Mobile app development in London: UK GDPR-aware, accessible iOS and Android apps for fintech, retail and professional services, from MVP to scale.",
    h1: "Mobile App Development Company for London Businesses",
    lead: "Accessible, UK GDPR-aware iOS and Android apps for London's fintech, retail and service businesses.",
    intro: [
      "London is a global fintech capital and one of Europe's most competitive consumer markets. UK users expect accessible, privacy-respecting apps, and financial products often connect to Open Banking APIs.",
      "We build London apps with accessibility built in, consent and data handling designed around UK GDPR, secure authentication and integrations with UK payment and Open Banking providers where relevant.",
    ],
    considerations: [
      { title: "Accessibility", text: "WCAG-aware design, dynamic type and screen reader support." },
      { title: "UK GDPR", text: "Consent management and privacy by design." },
      { title: "Open Banking", text: "Integrations with UK financial data providers." },
      { title: "UK-hours collaboration", text: "Meetings scheduled in UK time." },
    ],
    faqs: [
      { q: "Do you build Open Banking apps?", a: "Yes. We integrate with regulated Open Banking providers for account data and payments." },
      { q: "Are your apps accessible?", a: "We design and test against accessibility guidelines, including screen readers and dynamic text." },
      { q: "Do you work with UK startups?", a: "Yes, from MVP to scale-up." },
    ],
    related: ["ios-app-development", "android-app-development", "ui-ux-design", "backend-development"],
  },
  {
    city: "singapore",
    slug: "mobile-app-development",
    service: "mobile-app-development",
    title: "Mobile App Development Company in Singapore",
    metaTitle: "Mobile App Development Company Singapore | The Orbit 7",
    metaDescription:
      "Mobile app development in Singapore: PDPA-aware, multilingual iOS and Android apps with PayNow and regional payments, built for APAC expansion.",
    h1: "Mobile App Development Company for Singapore Businesses",
    lead: "Secure, multilingual iOS and Android apps for Singapore companies expanding across Asia-Pacific.",
    intro: [
      "Singapore apps often serve users across several APAC markets, in multiple languages and currencies, with local payment preferences in each. Security and data protection expectations are high.",
      "We build apps with PDPA-aware data handling, multilingual content, multi-currency support and integrations such as PayNow — architected so you can add new markets without rebuilding.",
    ],
    considerations: [
      { title: "PDPA-aware", text: "Consent and data protection designed in." },
      { title: "Multilingual", text: "English, Chinese, Malay and more as needed." },
      { title: "Regional payments", text: "PayNow and regional payment integrations." },
      { title: "Multi-market architecture", text: "Add countries without rebuilding." },
    ],
    faqs: [
      { q: "Can the app support multiple languages?", a: "Yes. We build localisation into the app from the start." },
      { q: "Do you integrate PayNow?", a: "Yes, through payment providers that support PayNow and other regional methods." },
      { q: "Can the app expand to other countries?", a: "Yes. We design multi-market architecture for APAC expansion." },
    ],
    related: ["cross-platform-app-development", "backend-development", "ios-app-development", "android-app-development"],
  },
];

export const getCity = (slug: string) => cities.find((c) => c.slug === slug);
export const citiesIn = (r: Region) => cities.filter((c) => c.region === r);
export const localPagesFor = (city: string) => localServicePages.filter((p) => p.city === city);
export const getLocalPage = (city: string, slug: string) => localServicePages.find((p) => p.city === city && p.slug === slug);
export const locationHref = (city: string, slug?: string) => `/locations/${city}${slug ? `/${slug}` : ""}`;
