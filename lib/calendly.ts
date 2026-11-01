import { site } from "./site";

export const hasCalendly = () => /^https:\/\/calendly\.com\/.+/.test(site.calendlyUrl);

/** Calendly embed URL styled to match the site (brand colours, no cookie banner). */
export function calendlyEmbedUrl(url = site.calendlyUrl) {
  const u = new URL(url);
  u.searchParams.set("embed_type", "Inline");
  u.searchParams.set("embed_domain", new URL(site.url).hostname);
  u.searchParams.set("hide_gdpr_banner", "1");
  u.searchParams.set("primary_color", "163e33");
  u.searchParams.set("text_color", "0d1a16");
  u.searchParams.set("background_color", "ffffff");
  return u.toString();
}
