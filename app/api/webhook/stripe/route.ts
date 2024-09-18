import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import connectMongo from "@/libs/mongoose";
import configFile from "@/config";
import User from "@/models/User";
import { findCheckoutSession } from "@/libs/stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
  typescript: true,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// This is where we receive Stripe webhook events
// By default, it'll store the user in the database
export async function POST(req: NextRequest) {
  await connectMongo();

  const body = await req.text();

  const signature = headers().get("stripe-signature");
  
  let eventType;
  let event;

  // verify Stripe event is legit
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed. ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  eventType = event.type;

  try {
    switch (eventType) {
      case "checkout.session.completed": {
        // ✅ Grant access to the product
        const stripeObject: Stripe.Checkout.Session = event.data
          .object as Stripe.Checkout.Session;

        const session = await findCheckoutSession(stripeObject.id);

        const customerId = session?.customer;
        const priceId = session?.line_items?.data[0]?.price.id;
        const userId = stripeObject.client_reference_id;
        const plan = configFile.stripe.plans.find((p) => p.priceId === priceId);

        if (!plan) break;

        const customer = (await stripe.customers.retrieve(
          customerId as string
        )) as Stripe.Customer;

        let user;
        if (userId) {
          user = await User.findById(userId);
        } else if (customer.email) {
          user = await User.findOne({ email: customer.email });
          if (!user) {
            user = await User.create({
              email: customer.email,
              name: customer.name,
            });
            await user.save();
          }
        } else {
          console.error("No user found");
          throw new Error("No user found");
        }

        user.priceId = priceId;
        user.customerId = customerId;
        user.hasAccess = true;
        await user.save();

        break;
      }

      case "checkout.session.expired": {
        // User didn't complete the transaction
        break;
      }

      case "customer.subscription.updated": {
        break;
      }

      case "customer.subscription.deleted": {
        // ❌ Revoke access to the product
        const stripeObject: Stripe.Subscription = event.data
          .object as Stripe.Subscription;

        const subscription = await stripe.subscriptions.retrieve(
          stripeObject.id
        );
        const user = await User.findOne({ customerId: subscription.customer });

        user.hasAccess = false;
        await user.save();

        break;
      }

      case "invoice.paid": {
        // ✅ Grant access to the product
        const stripeObject: Stripe.Invoice = event.data
          .object as Stripe.Invoice;

        const priceId = stripeObject.lines.data[0].price.id;
        const customerId = stripeObject.customer;

        const user = await User.findOne({ customerId });

        if (user.priceId !== priceId) break;

        // Grant user access to your product.
        user.hasAccess = true;
        await user.save();

        break;
      }

      case "invoice.payment_failed":
        // ❌ Should revoke access to the product
        break;

      default:
      // Unhandled event types
    }
  } catch (e) {
    console.error("Stripe error: ", e.message);
  }

  return NextResponse.json({});
}
