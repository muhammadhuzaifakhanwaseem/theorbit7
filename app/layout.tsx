import type { Metadata, Viewport } from "next";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/manrope";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import RevealObserver from "@/components/ui/RevealObserver";
import JsonLd from "@/components/ui/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Digital Agency & Software House`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { telephone: false },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#163e33",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="antialiased">
      <body className="flex min-h-dvh flex-col">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
