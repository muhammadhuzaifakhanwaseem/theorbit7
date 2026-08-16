import { Analytics } from '@vercel/analytics/next'
import { Poppins, Source_Sans_3, Geist_Mono } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const poppins = Poppins({ subsets: ['latin'], variable: '--font-poppins', weight: ['500', '600', '700'] })
const sourceSans = Source_Sans_3({ subsets: ['latin'], variable: '--font-source-sans', weight: ['400', '500', '600', '700'] })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  metadataBase: new URL('https://theorbit7.com'),
  title: { default: 'The Orbit 7 — Software Development & Digital Services', template: '%s | The Orbit 7' },
  description: 'The Orbit 7 builds websites, mobile applications and custom software, and helps businesses grow through SEO, digital marketing and technology solutions.',
  alternates: { canonical: 'https://theorbit7.com' },
  openGraph: { type: 'website', url: 'https://theorbit7.com', title: 'The Orbit 7 — Software Development & Digital Services', description: 'Digital products and technology solutions built around your business.', siteName: 'The Orbit 7', images: [{ url: 'https://theorbit7.com/logo.png', width: 512, height: 160, alt: 'The Orbit 7' }] },
  twitter: { card: 'summary_large_image', title: 'The Orbit 7 — Software Development & Digital Services', description: 'Digital products and technology solutions built around your business.', images: ['https://theorbit7.com/logo.png'] },
  robots: { index: true, follow: true },
  icons: { icon: 'https://theorbit7.com/logo.png', shortcut: 'https://theorbit7.com/logo.png', apple: 'https://theorbit7.com/logo.png' },
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#ffffff', width: 'device-width', initialScale: 1 }

const structuredData = {
  '@context': 'https://schema.org', '@graph': [
    { '@type': 'Organization', name: 'The Orbit 7', url: 'https://theorbit7.com', logo: 'https://theorbit7.com/logo.png', description: 'Software development and digital services company.' },
    { '@type': 'WebSite', name: 'The Orbit 7', url: 'https://theorbit7.com' },
    { '@type': 'Service', name: 'Software development and digital services', provider: { '@type': 'Organization', name: 'The Orbit 7' }, serviceType: ['Web Development', 'Mobile App Development', 'SEO', 'Digital Marketing', 'Custom Software Development'] },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${poppins.variable} ${sourceSans.variable} ${geistMono.variable}`}><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
