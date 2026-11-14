import type { NextConfig } from "next";

/**
 * 301 redirects from the previous site structure so existing rankings and
 * backlinks carry over to the new service URLs.
 */
const legacyServiceMap: Record<string, string> = {
  "mobile-app-development": "mobile-app-development",
  "ios-app-development": "ios-app-development",
  "android-app-development": "android-app-development",
  "react-native-app-development": "react-native-development",
  "flutter-app-development": "flutter-app-development",
  "kotlin-multiplatform-development": "cross-platform-app-development",
  "cross-platform-development": "cross-platform-app-development",
  "app-store-optimization": "mobile-app-development",
  "web-app-development": "custom-web-application-development",
  "backend-api-development": "api-development-integration",
  "system-integration-api-automation": "api-development-integration",
  "blockchain-development": "custom-software-development",
  "custom-software-development": "custom-software-development",
  "product-launch-strategy": "saas-development",
  "post-launch-analytics": "saas-development",
  "digital-product-development": "saas-development",
  "discovery-sprint": "saas-development",
  "mvp-development": "saas-development",
  "product-rescue-scaling": "saas-development",
  "product-strategy-consulting": "saas-development",
  "ai-development": "ai-application-development",
  "ai-app-development": "ai-application-development",
  "ai-chatbot-development": "ai-application-development",
  "ai-agent-development": "ai-agent-development",
  "generative-ai-development": "generative-ai-development",
  "machine-learning-development": "ai-application-development",
  "nlp-development": "ai-application-development",
  "ai-mvp-development": "ai-product-development",
  "ai-automation": "ai-automation",
  "business-process-automation": "ai-automation",
  "rpa-development": "ai-automation",
  "ui-ux-design": "ui-ux-design",
  "interactive-prototyping": "ui-ux-design",
};

/**
 * Content-Security-Policy. Allows only the third parties the site actually uses:
 * Google Analytics 4 + Tag Manager, Microsoft Clarity, and the Cal.com booking iframe.
 * 'unsafe-inline' scripts are required by Next.js's inline bootstrap on statically
 * rendered pages (nonces would force every page to render dynamically).
 */
const isDev = process.env.NODE_ENV !== "production";
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://*.clarity.ms https://vercel.live`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.clarity.ms https://c.bing.com https://vercel.live wss://ws-us3.pusher.com",
  "frame-src 'self' https://cal.com https://app.cal.com https://vercel.live",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const nextConfig: NextConfig = {
  experimental: { globalNotFound: true },
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"], qualities: [70, 75, 85] },
  async redirects() {
    return [
      ...Object.entries(legacyServiceMap).map(([from, to]) => ({
        source: `/${from}`,
        destination: `/services/${to}`,
        permanent: true,
      })),
      { source: "/portfolio/:slug", destination: "/portfolio", permanent: true },
      // Services renamed in the 2026 restructure
      { source: "/services/flutter-react-native-development", destination: "/services/cross-platform-app-development", permanent: true },
      { source: "/services/ai-development", destination: "/services/ai-application-development", permanent: true },
      { source: "/video-editing-services", destination: "/video-editing", permanent: true },
      { source: "/industries", destination: "/about-us", permanent: true },
      { source: "/industries/:slug", destination: "/about-us", permanent: true },
      { source: "/blog", destination: "/blogs", permanent: true },
      { source: "/blog/:slug", destination: "/blogs/:slug", permanent: true },
      { source: "/site-map", destination: "/services", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: csp },
        ],
      },
    ];
  },
};

export default nextConfig;
