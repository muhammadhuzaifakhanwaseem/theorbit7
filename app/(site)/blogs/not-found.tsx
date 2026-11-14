import NotFoundContent from "@/components/layout/NotFoundContent";

export const metadata = { title: { absolute: "Page not found | The Orbit 7" }, robots: { index: false } };

/** 404 for missing blog posts — rendered inside the (site) layout, so header and footer come from there. */
export default function NotFound() {
  return <NotFoundContent />;
}
