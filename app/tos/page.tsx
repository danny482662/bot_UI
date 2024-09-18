import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

const TOS = () => {
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
          </svg>
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Terms and Conditions for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Last Updated: June 2, 2024

Welcome to TradeLikeBot. Please read these Terms and Conditions carefully before using our platform.

1. Acceptance of Terms
By accessing and using the website https://tradelikebot.com (hereinafter referred to as "the Website"), you accept and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use the Website.

2. Description of Services
TradeLikeBot is a platform designed to help users utilize trading bots for making passive income. By purchasing a package, users gain access to run the bot in the Cloud. Users also have the option to purchase the code with documentation on how to run it, but not to resell it.

3. Ownership and Usage Rights
When purchasing a package, users are granted access to the Cloud-based bot. If users opt to purchase the code, they receive documentation on how to run the bot. However, users are not allowed to resell the code.

4. Refund Policy
Users can request a full refund within 7 days after the purchase.

5. User Data Collection
We collect the following user data:

Brokerage API_KEY/ACCESS_KEYs
Name
Email
Payment information
We also collect non-personal data through web cookies. For more information, please refer to our Privacy Policy at https://tradelikebot.com/privacy-policy.

6. Data Sharing
We do not share user data with any other parties.

7. Children's Privacy
We do not collect any data from children.

8. Governing Law
These Terms and Conditions are governed by and construed in accordance with the laws of France.

9. Updates to the Terms
We reserve the right to update these Terms and Conditions at any time. Users will be notified of any changes by email.

10. Contact Information
If you have any questions about these Terms and Conditions, please contact us at mail@tradelikebot.com.

By using the Website, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.`}
        </pre>
      </div>
    </main>
  );
};

export default TOS;
