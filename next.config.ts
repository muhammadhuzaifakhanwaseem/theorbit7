import type { NextConfig } from "next";

/**
 * 301 redirects from the previous site structure so existing rankings and
 * backlinks carry over to the new service URLs.
 */
const legacyServiceMap: Record<string, string> = {
  "mobile-app-development": "mobile-app-development",
  "ios-app-development": "ios-app-development",
  "android-app-development": "android-app-development",
  "react-native-app-development": "flutter-react-native-development",
  "flutter-app-development": "flutter-react-native-development",
  "kotlin-multiplatform-development": "flutter-react-native-development",
  "cross-platform-development": "flutter-react-native-development",
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
  "ai-development": "ai-development",
  "ai-app-development": "ai-development",
  "ai-chatbot-development": "ai-development",
  "ai-agent-development": "ai-development",
  "generative-ai-development": "ai-development",
  "machine-learning-development": "ai-development",
  "nlp-development": "ai-development",
  "ai-mvp-development": "ai-development",
  "ai-automation": "ai-automation",
  "business-process-automation": "ai-automation",
  "rpa-development": "ai-automation",
  "ui-ux-design": "ui-ux-design",
  "interactive-prototyping": "ui-ux-design",
};

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return [
      ...Object.entries(legacyServiceMap).map(([from, to]) => ({
        source: `/${from}`,
        destination: `/services/${to}`,
        permanent: true,
      })),
      { source: "/portfolio/:slug", destination: "/portfolio", permanent: true },
      { source: "/industries", destination: "/about-us", permanent: true },
      { source: "/industries/:slug", destination: "/about-us", permanent: true },
      { source: "/locations", destination: "/contact-us", permanent: true },
      { source: "/locations/:slug", destination: "/contact-us", permanent: true },
      { source: "/blog", destination: "/blogs", permanent: true },
      { source: "/blog/:slug", destination: "/blogs/:slug", permanent: true },
      { source: "/leadership", destination: "/about-us", permanent: true },
      { source: "/founders-letter", destination: "/about-us", permanent: true },
      { source: "/life-at-the-orbit-7", destination: "/about-us", permanent: true },
      { source: "/press-media", destination: "/about-us", permanent: true },
      { source: "/partnership", destination: "/contact-us", permanent: true },
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
        ],
      },
    ];
  },
};

export default nextConfig;
