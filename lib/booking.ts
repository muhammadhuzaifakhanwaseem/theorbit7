import { site } from "./site";

/** True when a Cal.com booking link is configured. */
export const hasBooking = () => /^https:\/\/(app\.)?cal\.com\/.+/.test(site.bookingUrl);

/** Cal.com iframe URL: chrome-less embed, light theme, month view. */
export function bookingEmbedUrl(url = site.bookingUrl) {
  const u = new URL(url);
  u.searchParams.set("embed", "true");
  u.searchParams.set("theme", "light");
  u.searchParams.set("layout", "month_view");
  return u.toString();
}
