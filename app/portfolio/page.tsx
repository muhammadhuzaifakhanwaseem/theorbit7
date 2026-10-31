import Container from "@/components/ui/Container";
import JsonLd from "@/components/ui/JsonLd";
import PageHero from "@/components/sections/PageHero";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import ProjectCard from "@/components/cards/ProjectCard";
import CTA from "@/components/sections/CTA";
import { projects } from "@/data/projects";
import { getService } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

const title = "Our Work | Websites, Apps, Software & Marketing Projects | The Orbit 7";
const description =
  "Explore the kinds of websites, ecommerce platforms, mobile apps, ERP systems, AI solutions and growth campaigns The Orbit 7 designs, builds and grows for clients.";

export const metadata = buildMetadata({ title, description, path: "/portfolio" });

const groupOf = (type: string) =>
  /app/i.test(type) ? "Mobile" : /AI|Automation/i.test(type) ? "AI & Automation" : /ERP|SaaS/i.test(type) ? "Software" : /Brand/i.test(type) ? "Creative" : "Web & Marketing";

export default function PortfolioPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Our work", path: "/portfolio" },
  ];
  const groups = Array.from(new Set(projects.map((p) => groupOf(p.type))));
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ name: title, path: "/portfolio", description, type: "CollectionPage" }),
          breadcrumbSchema(crumbs),
        ]}
      />
      <PageHero
        eyebrow="Our work"
        title="Digital products built to *perform.*"
        lead="A look at the platforms, apps, automations and campaigns we design, build and grow — spanning ecommerce, healthcare, logistics, SaaS, real estate and hospitality. Ask us for detailed case studies relevant to your project."
        crumbs={crumbs}
      />
      <section className="border-t border-line py-16 sm:py-24" aria-label="Projects">
        <Container>
          <PortfolioGrid
            filters={groups}
            items={projects.map((p) => ({
              key: p.slug,
              group: groupOf(p.type),
              node: <ProjectCard project={p} />,
            }))}
          />
        </Container>
      </section>
      <section className="bg-paper py-20 sm:py-24" aria-labelledby="capabilities-heading">
        <Container>
          <h2 id="capabilities-heading" className="text-3xl font-semibold sm:text-4xl">
            Services behind <em>the work</em>
          </h2>
          <ul className="mt-8 flex flex-wrap gap-2">
            {Array.from(new Set(projects.flatMap((p) => p.services))).map((slug) => {
              const s = getService(slug)!;
              return (
                <li key={slug}>
                  <a
                    href={`/services/${slug}`}
                    className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-sm text-ink-2 transition-colors hover:border-brand hover:text-brand"
                  >
                    {s.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
      <CTA
        eyebrow="Your project next"
        title={
          <>
            Have a project in mind? <em>Let&apos;s build it.</em>
          </>
        }
      />
    </>
  );
}
