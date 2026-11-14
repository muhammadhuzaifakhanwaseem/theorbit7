import "@fontsource-variable/dm-sans";
import "@fontsource-variable/manrope";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import BookingProvider from "@/components/booking/BookingProvider";
import SiteChrome from "@/components/layout/SiteChrome";
import NotFoundContent from "@/components/layout/NotFoundContent";
import { bookingEmbedUrl, hasBooking } from "@/lib/booking";

export const metadata = { title: "Page not found | The Orbit 7", robots: { index: false } };

/**
 * Branded 404 for URLs that match no route. Rendered by Next.js at the routing level as
 * its own document, so the full header and footer here are NOT embedded in every page's
 * payload (unlike a root not-found.tsx). Requires `experimental.globalNotFound`.
 */
export default function GlobalNotFound() {
  return (
    <html lang="en" className="antialiased">
      <body className="flex min-h-dvh flex-col">
        <BookingProvider embedUrl={hasBooking() ? bookingEmbedUrl() : null}>
          <SiteChrome>
            <NotFoundContent />
          </SiteChrome>
        </BookingProvider>
      </body>
    </html>
  );
}
