export interface NavLink {
  label: string;
  href: string;
}

export interface MegaMenuColumn {
  heading: string;
  links: NavLink[];
}

export const servicesMegaMenu: MegaMenuColumn[] = [
  {
    heading: "Application Development",
    links: [
      { label: "Mobile App Development", href: "/mobile-app-development" },
      { label: "Blockchain Development", href: "/blockchain-development" },
    ],
  },
  {
    heading: "By Platform",
    links: [
      { label: "iOS App Development", href: "/ios-app-development" },
      { label: "Android App Development", href: "/android-app-development" },
      { label: "React Native App Development", href: "/react-native-app-development" },
      { label: "Flutter App Development", href: "/flutter-app-development" },
      { label: "Kotlin Multiplatform", href: "/kotlin-multiplatform-development" },
    ],
  },
  {
    heading: "By Type",
    links: [
      { label: "Web App Development", href: "/web-app-development" },
      { label: "Backend & API Development", href: "/backend-api-development" },
      { label: "Cross-Platform Development", href: "/cross-platform-development" },
    ],
  },
  {
    heading: "Launch & Growth",
    links: [
      { label: "App Store Optimization", href: "/app-store-optimization" },
      { label: "Product Launch Strategy", href: "/product-launch-strategy" },
      { label: "Post Launch Analytics & Iteration", href: "/post-launch-analytics" },
    ],
  },
  {
    heading: "Artificial Intelligence",
    links: [
      { label: "AI Development", href: "/ai-development" },
      { label: "AI App Development", href: "/ai-app-development" },
      { label: "AI Chatbot Development", href: "/ai-chatbot-development" },
      { label: "AI Agent Development", href: "/ai-agent-development" },
      { label: "Generative AI Development", href: "/generative-ai-development" },
      { label: "Machine Learning Development", href: "/machine-learning-development" },
      { label: "NLP Development", href: "/nlp-development" },
      { label: "AI MVP Development", href: "/ai-mvp-development" },
    ],
  },
  {
    heading: "Automation",
    links: [
      { label: "AI Automation", href: "/ai-automation" },
      { label: "System Integration & API Automation", href: "/system-integration-api-automation" },
      { label: "Business Process Automation", href: "/business-process-automation" },
      { label: "RPA Development", href: "/rpa-development" },
    ],
  },
  {
    heading: "Digital Product Development",
    links: [
      { label: "Digital Product Development", href: "/digital-product-development" },
      { label: "Discovery Sprint", href: "/discovery-sprint" },
      { label: "MVP Development", href: "/mvp-development" },
      { label: "Product Rescue & Scaling", href: "/product-rescue-scaling" },
      { label: "Product Strategy & Consulting", href: "/product-strategy-consulting" },
      { label: "Custom Software Development", href: "/custom-software-development" },
    ],
  },
  {
    heading: "By Craft",
    links: [
      { label: "UI/UX Design", href: "/ui-ux-design" },
      { label: "Interactive Prototyping", href: "/interactive-prototyping" },
    ],
  },
];

export const industriesNav: NavLink[] = [
  { label: "Healthcare", href: "/industries/healthcare" },
  { label: "Fitness", href: "/industries/fitness" },
  { label: "Fintech", href: "/industries/fintech" },
  { label: "Education", href: "/industries/education" },
  { label: "Real Estate", href: "/industries/real-estate" },
  { label: "Travel", href: "/industries/travel" },
  { label: "Food Delivery", href: "/industries/food-delivery" },
  { label: "Dating", href: "/industries/dating" },
  { label: "Ecommerce", href: "/industries/ecommerce" },
  { label: "Startup", href: "/industries/startups" },
];

export const locationsNav: NavLink[] = [
  { label: "San Francisco", href: "/locations/san-francisco" },
  { label: "New York", href: "/locations/new-york" },
  { label: "Austin", href: "/locations/austin" },
  { label: "Toronto", href: "/locations/toronto" },
  { label: "London", href: "/locations/london" },
  { label: "Dubai", href: "/locations/dubai" },
  { label: "Singapore", href: "/locations/singapore" },
];

export const companyNav: NavLink[] = [
  { label: "About", href: "/about-us" },
  { label: "Blog", href: "/blog" },
  { label: "Press & Media", href: "/press-media" },
  { label: "Partnership", href: "/partnership" },
  { label: "Life At The Orbit 7", href: "/life-at-the-orbit-7" },
  { label: "Leadership", href: "/leadership" },
  { label: "Founder's Letter", href: "/founders-letter" },
  { label: "Contact Us", href: "/contact-us" },
];

export const footerServiceLinks: NavLink[] = [
  { label: "Mobile App Development", href: "/mobile-app-development" },
  { label: "Web App Development", href: "/web-app-development" },
  { label: "AI Development", href: "/ai-development" },
  { label: "Automation", href: "/ai-automation" },
  { label: "Digital Product Development", href: "/digital-product-development" },
  { label: "UI/UX Design", href: "/ui-ux-design" },
];

export const footerResourceLinks: NavLink[] = [
  { label: "Blog", href: "/blog" },
  { label: "Case Studies", href: "/portfolio" },
  { label: "Press & Media", href: "/press-media" },
  { label: "Founder's Letter", href: "/founders-letter" },
  { label: "Contact Us", href: "/contact-us" },
];
