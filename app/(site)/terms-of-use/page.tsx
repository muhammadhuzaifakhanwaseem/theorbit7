import LegalPage from "@/components/sections/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Terms of Use | Website Terms & Conditions | The Orbit 7",
  description:
    "The Orbit 7 terms of use: website terms and conditions for theorbit7.com, how they relate to our service terms, intellectual property and limits of liability.",
  path: "/terms-of-use",
  keywords: ["terms of use", "website terms and conditions", "service terms"],
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      heroTitle="Terms of *use*"
      path="/terms-of-use"
      updated="October 2026"
      intro={`These Terms of Use govern your access to and use of ${site.url.replace("https://", "")}. By using this site, you agree to these terms.`}
      sections={[
        {
          h: "Use of this website",
          p: [
            `This website is provided for information about ${site.name}'s services. Content may not be copied or redistributed without written permission.`,
          ],
        },
        {
          h: "Services",
          p: [
            `Any services provided by ${site.name} are governed by a separate signed proposal, statement of work or services agreement, which takes precedence over the general descriptions on this website.`,
          ],
        },
        {
          h: "Intellectual property",
          p: [`All content on this site, including text, graphics and logos, is the property of ${site.name} unless otherwise noted.`],
        },
        {
          h: "Disclaimer",
          p: [
            `This website is provided "as is" without warranties of any kind. ${site.name} is not liable for any damages arising from your use of this site.`,
          ],
        },
        { h: "Contact", p: [`Questions about these terms can be sent to ${site.email}.`] },
      ]}
    />
  );
}
