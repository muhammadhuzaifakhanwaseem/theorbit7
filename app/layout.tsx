import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "The Orbit 7 — Software House",
  description:
    "We build transformative software products that orbit the edge of what's possible. A top-tier software house for startups, scale-ups, and enterprises.",
  keywords: ["software house", "web development", "mobile apps", "AI solutions", "design systems"],
  openGraph: {
    title: "The Orbit 7 — Software House",
    description: "We build transformative software products that orbit the edge of what's possible.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <Analytics />
      <SpeedInsights />
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#080F0B] text-[#EEF9F2] font-body antialiased">
        {children}
        <script src="https://cdn.jsdelivr.net/npm/preline@2.4.1/dist/preline.js" defer></script>
      </body>
    </html>
  );
}
