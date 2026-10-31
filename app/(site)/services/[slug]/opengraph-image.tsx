import { renderOg, ogSize } from "@/lib/og";
import { getService, getCategory, services } from "@/data/services";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "The Orbit 7 service";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug)!;
  return renderOg({ eyebrow: getCategory(s.category).name, title: s.h1, tags: s.visualTags });
}
