import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Admin | The Orbit 7" },
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-dvh bg-paper text-ink">{children}</div>;
}
