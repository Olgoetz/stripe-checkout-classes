import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2023-08-16",
});

export default stripe;
