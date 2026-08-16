export type BlogArticle = {
  slug: string
  category: string
  title: string
  excerpt: string
  date: string
  readingTime: string
  image: string
  imageAlt: string
  body: string[]
}

export const blogArticles: BlogArticle[] = [
  {
    slug: 'what-a-high-performing-business-website-needs-in-2026',
    category: 'Web Development',
    title: 'What a high-performing business website needs in 2026',
    excerpt: 'A practical look at the structure, speed and content choices that help a modern business website earn attention and trust.',
    date: 'August 12, 2026',
    readingTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Designer reviewing a digital product interface on a large monitor',
    body: [
      'A strong business website is no longer just a digital brochure. It is often the first product experience a potential customer has with your company, so it needs to explain value quickly and make the next step feel obvious.',
      'The best foundations are simple: a clear message above the fold, a structure that answers real customer questions, accessible interactions and a technical setup that stays fast as the site grows.',
      'Performance is part of the experience. Thoughtful image sizing, lean dependencies and a content model that supports iteration help a website keep earning its place in the business long after launch.',
    ],
  },
  {
    slug: 'seo-foundations-that-compound-over-time',
    category: 'SEO',
    title: 'SEO foundations that compound over time',
    excerpt: 'Why technical clarity, useful content and a patient measurement loop matter more than chasing every algorithm update.',
    date: 'July 28, 2026',
    readingTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Analytics dashboard on a laptop beside notes and a coffee',
    body: [
      'Search visibility is built through a series of connected decisions rather than one isolated tactic. Search engines need to understand your pages, and people need to find them genuinely useful.',
      'Start with the foundations: crawlable pages, descriptive titles, clear internal links and content that reflects how customers actually describe their problems. From there, measure qualified visits and meaningful actions instead of traffic alone.',
      'The most resilient SEO programmes create a repeatable editorial habit. Each useful page should make the next question easier to answer and the whole site more authoritative.',
    ],
  },
  {
    slug: 'when-custom-software-is-worth-the-investment',
    category: 'Custom Software',
    title: 'When custom software is worth the investment',
    excerpt: 'A grounded framework for deciding when an off-the-shelf tool has become a constraint — and when it has not.',
    date: 'July 10, 2026',
    readingTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Team planning software workflows around a table',
    body: [
      'Custom software makes sense when a repeated business process is important enough to deserve a better system, not simply because building something new sounds exciting.',
      'Look for friction that appears every week: duplicate data entry, disconnected tools, slow handoffs or reporting that requires manual work. A clear map of that workflow usually reveals whether configuration, integration or a custom product is the right next move.',
      'The best custom systems are deliberately scoped. They solve the expensive constraint first, create a reliable source of truth and leave room for the business to learn before adding complexity.',
    ],
  },
  {
    slug: 'building-a-mobile-app-people-return-to',
    category: 'Mobile Apps',
    title: 'Building a mobile app people return to',
    excerpt: 'The details that turn a mobile app from a one-time download into a useful part of someone’s routine.',
    date: 'June 19, 2026',
    readingTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Smartphone displaying a clean mobile application interface',
    body: [
      'Retention starts with a clear reason to return. A mobile app should make a valuable action faster, more personal or more convenient than the alternatives.',
      'That promise needs to survive the first session. Good onboarding is short, permissions are explained in context and the core action is easy to find without a tour of every feature.',
      'A measured release is better than a crowded first version. Instrument the moments that matter, listen to users and improve the experience around real behaviour rather than assumptions.',
    ],
  },
]

export function getArticleBySlug(slug: string) {
  return blogArticles.find((article) => article.slug === slug)
}

export function getArticleUrl(slug: string) {
  return `/blog/${slug}`
}
