import Stripe from "stripe";

interface CreateCheckoutParams {
  priceId: string;
  mode: "payment";
  successUrl: string;
  cancelUrl: string;
  couponId?: string | null;
  clientReferenceId?: string;
  user?: {
    customerId?: string;
    email?: string;
  };
}

interface CreateCustomerPortalParams {
  customerId: string;
  returnUrl: string;
}

// This is used to create a Stripe Checkout for one-time payments. It's triggered with the <ButtonCheckout /> component. Webhooks are used to update the user's state in the database.
export const createCheckout = async ({
  user,
  mode,
  clientReferenceId,
  successUrl,
  cancelUrl,
  priceId,
  couponId,
}: CreateCheckoutParams): Promise<string> => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-08-16",
      typescript: true,
    });

    const extraParams: {
      customer?: string;
      customer_creation?: "always";
      customer_email?: string;
      invoice_creation?: { enabled: boolean };
      payment_intent_data?: { setup_future_usage: "on_session" };
      tax_id_collection?: { enabled: boolean };
    } = {};

    if (user?.customerId) {
      extraParams.customer = user.customerId;
    } else {
      if (mode === "payment") {
        extraParams.customer_creation = "always";
        extraParams.payment_intent_data = { setup_future_usage: "on_session" };
      }
      if (user?.email) {
        extraParams.customer_email = user.email;
      }
      extraParams.tax_id_collection = { enabled: true };
    }

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], 
      mode,
      client_reference_id: clientReferenceId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      discounts: couponId
        ? [
            {
              coupon: couponId,
            },
          ]
        : [],
      success_url: successUrl,
      cancel_url: cancelUrl,
      ...extraParams,
    });

    return stripeSession.url;
  } catch (e) {
    console.error(e);
    return null;
  }
};

// This is used to create Customer Portal sessions
export const createCustomerPortal = async ({
  customerId,
  returnUrl,
}: CreateCustomerPortalParams): Promise<string> => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-08-16",
    typescript: true,
  });

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  return portalSession.url;
};

export const findCheckoutSession = async (sessionId: string) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-08-16",
      typescript: true,
    });

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    return session;
  } catch (e) {
    console.error(e);
    return null;
  }
};
