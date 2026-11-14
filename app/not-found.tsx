import NotFoundContent from "@/components/layout/NotFoundContent";

export const metadata = { title: { absolute: "Page not found | The Orbit 7" }, robots: { index: false } };

/**
 * Root fallback (e.g. unknown /admin URLs). Kept free of the site header/footer on purpose:
 * Next.js embeds this boundary in every page's payload, so a heavy version bloats all pages.
 * URLs that match no route get the full branded 404 from app/global-not-found.tsx.
 */
export default function NotFound() {
  return <NotFoundContent />;
}
