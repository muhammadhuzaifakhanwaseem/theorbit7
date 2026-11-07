/**
 * COMPANY CONTENT — edit this file to fill the company pages.
 *
 * Pages that depend on content you haven't provided yet (leadership profiles, the
 * founder's letter, press releases, open roles) render a polished structure and are
 * automatically set to `noindex` and left out of the sitemap until real content is added.
 * Never add invented people, quotes, awards or announcements.
 */

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  /** Optional image path, e.g. "/team/jane.webp" (place files in /public/team). */
  photo?: string;
  linkedin?: string;
}

/**
 * CEO feature on the homepage. Add the CEO's full name to show it in the
 * "Meet our CEO" section (left empty, the section shows the title only).
 */
export const ceo = {
  name: "",
  role: "Chief Executive Officer",
  linkedin: "",
};

/** Leadership / team profiles. Example: { name: "…", role: "Founder & CEO", bio: "…" } */
export const leadership: TeamMember[] = [];

/** Founder's letter. Set to an object to publish the page. */
export const foundersLetter: null | {
  author: string;
  role: string;
  /** Paragraphs of the letter, in order. */
  paragraphs: string[];
  signOff?: string;
  date?: string;
} = null;

export interface PressItem {
  title: string;
  date: string; // ISO date, e.g. "2026-11-01"
  outlet?: string; // for media coverage
  summary: string;
  href?: string; // external article or PDF
}

/** Press releases and media coverage. */
export const press: PressItem[] = [];

export interface Job {
  title: string;
  team: string;
  location: string; // e.g. "Remote"
  type: string; // e.g. "Full-time"
  summary: string;
  applyHref?: string; // defaults to emailing your CV
}

/** Open roles. */
export const jobs: Job[] = [];

export const partnershipModels = [
  {
    title: "White-label delivery for agencies",
    text: "Extend your agency's capacity with design, development, SEO and video editing delivered under your brand. We work quietly as part of your team and never contact your clients directly.",
    points: ["Your brand, your client relationship", "Dedicated point of contact", "NDA and confidentiality by default"],
  },
  {
    title: "Technology & platform partners",
    text: "SaaS platforms, CMS and commerce providers, and AI companies can partner with us on implementations, integrations and joint solutions for shared customers.",
    points: ["Implementation & integration services", "Joint solution development", "Co-created content and resources"],
  },
  {
    title: "Referral partners",
    text: "Consultants, freelancers and service providers who regularly meet businesses needing websites, apps, AI or marketing can introduce them to us with a simple, transparent referral arrangement.",
    points: ["Simple introduction process", "Transparent terms agreed upfront", "Your contacts looked after properly"],
  },
  {
    title: "Strategic collaborations",
    text: "Incubators, accelerators, communities and educational institutions can collaborate with us on workshops, startup support programmes and knowledge sharing.",
    points: ["Workshops and talks", "Startup support programmes", "Knowledge sharing"],
  },
];

export const cultureValues = [
  { title: "Craft over shortcuts", text: "We care about the details users notice and the ones they don't — clean code, careful design and honest marketing." },
  { title: "Ownership", text: "Everyone owns outcomes, not just tasks. We raise problems early and follow through." },
  { title: "Learning every week", text: "Technology changes fast. We make time to learn, experiment and share what we discover." },
  { title: "Clear communication", text: "Plain language, written updates and respect for everyone's time — clients and teammates alike." },
  { title: "Remote-friendly collaboration", text: "We work with clients across time zones and organise our work so collaboration stays smooth." },
  { title: "Respect and inclusion", text: "Diverse perspectives make better products. We treat everyone with respect." },
];
