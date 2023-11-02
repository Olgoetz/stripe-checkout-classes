import { NextResponse } from "next/server";

import stripe from "@/lib/get-stripe";

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
      customer_creation: "if_required",
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
      automatic_tax: {
        enabled: true,
      },
      billing_address_collection: "required",
      payment_method_types: ["card", "paypal"],

      success_url: `${req.headers.get(
        "origin"
      )}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}`,
    });
    // console.log(session);
    return NextResponse.json({ session_id: session.id }, { status: 200 });
  } catch (err) {
    console.error("[CHECKOUT_ERROR]", err);
    return NextResponse.json("Internal Error", { status: 500 });
  }
}
