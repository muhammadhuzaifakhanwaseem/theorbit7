import SiteChrome from "@/components/layout/SiteChrome";
import Analytics from "@/components/layout/Analytics";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteChrome>{children}</SiteChrome>
      <Analytics />
    </>
  );
}
