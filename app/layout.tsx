import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE_URL, SITE_NAME } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Engineering AI-Powered Digital Systems`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "The Orbit 7 designs and engineers mobile apps, web applications, AI-powered products and automation systems for scalable businesses.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_NAME} — Engineering AI-Powered Digital Systems`,
    description:
      "The Orbit 7 designs and engineers mobile apps, web applications, AI-powered products and automation systems for scalable businesses.",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Engineering AI-Powered Digital Systems`,
    description:
      "The Orbit 7 designs and engineers mobile apps, web applications, AI-powered products and automation systems for scalable businesses.",
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    sameAs: [
      "https://www.linkedin.com/company/theorbit7",
      "https://twitter.com/theorbit7",
      "https://www.instagram.com/theorbit7",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "hello@theorbit7.com",
    },
  };

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
