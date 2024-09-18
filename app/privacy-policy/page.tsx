import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

export const metadata = getSEOTags({
  title: `Privacy Policy | ${config.appName}`,
  canonicalUrlRelative: "/privacy-policy",
});

const PrivacyPolicy = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>{" "}
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Privacy Policy for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Privacy Policy for TradeLikeBot
Last updated: 15th July 2024

Introduction
Welcome to TradeLikeBot! Your privacy is important to us. This privacy policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, and related services (collectively, the "Service"). By using the Service, you agree to the collection and use of information in accordance with this policy.

Information We Collect
Personal Information
When you register or use our Service, we may collect personal information that can be used to identify you, including but not limited to:

Name
Email address
API keys and secrets (encrypted)
Profile picture
Trading data and preferences
Payment information
Non-Personal Information
We may also collect non-personal information about your interactions with our Service, including:

Usage data (e.g., pages visited, time spent on pages)
Device information (e.g., IP address, browser type, operating system)
How We Use Your Information
We use the information we collect for various purposes, including:

To provide, maintain, and improve our Service
To personalize your experience
To process transactions and manage your account
To communicate with you, including sending updates and promotional materials
To monitor and analyze usage and trends to improve your experience
To prevent fraudulent transactions and ensure the security of our Service
Sharing Your Information
We may share your information with third parties in the following situations:

With service providers who perform services on our behalf (e.g., payment processing, data analysis)
To comply with legal obligations or respond to lawful requests from public authorities
To protect and defend our rights or property, or the safety of our users or the public
In connection with a business transaction, such as a merger or acquisition
Data Security
We implement a variety of security measures to maintain the safety of your personal information. All sensitive information is encrypted and transmitted securely. However, no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee its absolute security.

Your Rights
Depending on your location, you may have the following rights regarding your personal information:

The right to access, update, or delete your personal information
The right to object to or restrict the processing of your personal information
The right to data portability
The right to withdraw consent at any time
To exercise these rights, please contact us using the contact information provided below.

Third-Party Links
Our Service may contain links to third-party websites or services that are not operated by us. We are not responsible for the privacy practices or the content of these third-party sites.

Changes to This Privacy Policy
We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page. You are advised to review this privacy policy periodically for any changes.

Contact Us
If you have any questions about this privacy policy or our data practices, please contact us at:

TradeLikeBot
Email: konstantin.borimechkov14@gmail.com`}
        </pre>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
