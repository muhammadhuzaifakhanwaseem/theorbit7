export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  slug: string;
}

export const leadershipTeam: TeamMember[] = [
  {
    name: "Alexis Moreau",
    role: "Founder & CEO",
    bio: "Alexis started The Orbit 7 after a decade leading engineering teams at two venture-backed startups, one of which she helped scale from Series A to acquisition.",
    slug: "alexis-moreau",
  },
  {
    name: "Wren Talbot",
    role: "Chief Operating Officer",
    bio: "Wren oversees delivery operations across all seven regions, ensuring every engagement runs on the same process regardless of time zone.",
    slug: "wren-talbot",
  },
  {
    name: "Marcus Chen",
    role: "Principal Mobile Engineer",
    bio: "Marcus leads mobile architecture decisions across iOS, Android, and cross-platform engagements, with a background in native systems engineering.",
    slug: "marcus-chen",
  },
  {
    name: "Priya Nair",
    role: "Head of AI Engineering",
    bio: "Priya leads AI and machine learning engagements, from model selection through production deployment and monitoring.",
    slug: "priya-nair",
  },
  {
    name: "Daniel Osei",
    role: "Head of Product",
    bio: "Daniel runs discovery and product strategy engagements, translating ambiguous ideas into scoped, buildable plans.",
    slug: "daniel-osei",
  },
  {
    name: "Sara Ibrahim",
    role: "Automation Lead",
    bio: "Sara designs workflow and process automation systems for operations-heavy clients across fintech, healthcare, and logistics.",
    slug: "sara-ibrahim",
  },
];
