import { NextResponse } from "next/server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2023-08-16",
});
export async function POST(req: Request, res: Response) {
  const result = await req.json();

  const { id } = result.body.price;

  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      locale: "de",
      invoice_creation: {
        enabled: true,
      },

      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: id,
          // price_data: {
          //   currency: "EUR",
          //   product_data: {
          //     name: title,

          //     images:
          //       process.env.NODE_ENV === "production"
          //         ? [`${req.headers.get("origin")}/${imageSrc}`]
          //         : undefined,
          //   },
          //   unit_amount: price,
          // },
          quantity: 1,
        },
      ],
      mode: "payment",
      billing_address_collection: "required",
      payment_method_types: ["card", "paypal"],

      success_url: `${req.headers.get("origin")}/session/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}`,
    });
    // console.log(session);
    return NextResponse.json(session.id, { status: 200 });
  } catch (err) {
    console.error("[CHECKOUT_ERROR]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
