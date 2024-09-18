import themes from "daisyui/src/theming/themes";
import { ConfigProps } from "./types/config";

const config = {
  appName: "TradingLikeBot",
  appDescription:
    "Automate Your Crypto Trading for Maximum Profit. Maximize Your Profits and Minimize Risks by Leaving Emotional Decisions Behind!",
  domainName: process.env.NEXT_PUBLIC_DOMAIN_NAME,
  crisp: {
    id: process.env.NEXT_PUBLIC_CRISP_ID,
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    // Create multiple plans in your Stripe dashboard, then add them here. You can add as many plans as you want, just make sure to add the priceId
    plans: [
      {
        // REQUIRED — we use this to find the plan in the webhook (for instance if you want to update the user's credits based on the plan)
        priceId:
          process.env.NODE_ENV === "development"
            ? process.env.NEXT_PUBLIC_STRIPE_CRYPTO_BOT_PRICE_ID_DEV
            : process.env.NEXT_PUBLIC_STRIPE_CRYPTO_BOT_PRICE_ID_PROD,
        name: "Support My Work",
        // A friendly description of the plan, displayed on the pricing page. Tip: explain why this plan and not others
        description: "Donate if you wanna help me out to continue working on my skills in trading bot development! ",
        // The price you want to display, the one user will be charged on Stripe.
        price: "🫵",
        priceAnchor: null,
        isFeatured: true,
        features: [
          {
            name: "You Set The Amount Of The Donation 🙏"
          },
          {
            name: "Expect More Contribution To The Platform"
          },
          {
            name: "More Blogs Around The Topic Of Programming Trading Bots"
          }, 
          {
            name: "Adding Bots Based On User Risk Tollerance"
          }, 
          {
            name: "In-App Community Place To Share Ideas & Results!"
          }
        ],
      },
    ],
  },
  mail: {
    supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL
  },
  colors: {
    // REQUIRED — The DaisyUI theme to use (added to the main layout.js). Leave blank for default (light & dark mode). If you any other theme than light/dark, you need to add it in config.tailwind.js in daisyui.themes.
    theme: "",
    main: themes["night"]["primary"],
  },
  auth: {
    loginUrl: "/api/auth/signin",
    callbackUrl: "/pricing",
  },
} as ConfigProps;

export default config;
