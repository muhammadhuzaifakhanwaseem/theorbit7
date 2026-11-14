import LegalPage from "@/components/sections/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Privacy Policy | The Orbit 7",
  description:
    "The Orbit 7 privacy policy and data protection policy: what we collect through theorbit7.com and our forms, how we use it, how long we keep it and your rights.",
  path: "/privacy-policy",
  keywords: ["privacy policy", "The Orbit 7 privacy policy", "data protection policy"],
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      heroTitle="Privacy *policy*"
      path="/privacy-policy"
      updated="October 2026"
      intro={`This Privacy Policy explains how ${site.name} ("we", "us") collects, uses and protects information when you use ${site.url.replace("https://", "")} or engage us for services.`}
      sections={[
        {
          h: "Information we collect",
          p: [
            "We collect information you provide directly, such as your name, email address, phone number, company and project details submitted through our contact form or by email.",
            "We may also collect basic, aggregated usage data (such as pages visited and device type) through privacy-respecting analytics tools to understand how our website is used.",
          ],
        },
        {
          h: "How we use information",
          p: [
            "We use the information you provide to respond to enquiries, prepare proposals, deliver contracted services and improve our website. We do not sell personal information to third parties.",
          ],
        },
        {
          h: "Sharing",
          p: [
            "We share information only with service providers that help us operate our business (for example email, hosting and project-management tools), and only as needed to provide our services, or where required by law.",
          ],
        },
        {
          h: "Data retention",
          p: [
            "We retain enquiry and project information for as long as necessary to fulfil the purposes described in this policy or as required by law.",
          ],
        },
        {
          h: "Your rights",
          p: [
            `Depending on your location, you may have the right to access, correct or delete your personal information, or to object to certain processing. Contact ${site.email} to exercise these rights.`,
          ],
        },
        { h: "Contact", p: [`Questions about this policy can be sent to ${site.email}.`] },
      ]}
    />
  );
}
