/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'theorbit7.com',
      },
      {
        protocol: 'http',
        hostname: 'theorbit7.com',
      },
      {
        protocol: 'https',
        hostname: 'backend.theorbit7.com',
      },
      {
        protocol: 'http',
        hostname: 'backend.theorbit7.com',
      },
      {
        protocol: 'https',
        hostname: '*.theorbit7.com', // Baqi tamaam subdomains ke liye
      }
    ],
  },
}

export default nextConfig