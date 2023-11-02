import type { Stripe } from "stripe";

import { NextResponse } from "next/server";

import stripe from "@/lib/get-stripe";
import { sendEmail } from "@/lib/sendEmail";

export async function POST(req: Request) {
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      await (await req.blob()).text(),
      req.headers.get("stripe-signature") as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    // On error, log and return the error message.
    if (err! instanceof Error) console.log(err);
    console.log(`❌ Error message: ${errorMessage}`);
    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    );
  }

  // Successfully constructed event.
  console.log("✅ Success:", event.id);

  const permittedEvents: string[] = [
    "checkout.session.completed",
    "payment_intent.succeeded",
    "payment_intent.payment_failed",
  ];

  if (permittedEvents.includes(event.type)) {
    let data;

    try {
      switch (event.type) {
        case "checkout.session.completed":
          data = event.data.object as Stripe.Checkout.Session;
          if (data.payment_status === "paid") {
            fulFillOrder(data.invoice as string);
          }
          console.log(`💰 CheckoutSession status: ${data.payment_status}`);
          break;
        case "payment_intent.payment_failed":
          data = event.data.object as Stripe.PaymentIntent;
          console.log(`❌ Payment failed: ${data.last_payment_error?.message}`);
          break;
        case "payment_intent.succeeded":
          data = event.data.object as Stripe.PaymentIntent;
          console.log(`💰 PaymentIntent status: ${data.status}`);
          break;
        default:
          throw new Error(`Unhandled event: ${event.type}`);
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "Webhook handler failed" },
        { status: 500 }
      );
    }
  }
  // Return a response to acknowledge receipt of the event.
  return NextResponse.json({ message: "Received" }, { status: 200 });
}

async function fulFillOrder(invoice_id: string) {
  try {
    // Create invoice
    const invoice = await stripe.invoices.sendInvoice(invoice_id);

    // Check if invoice was successfully paid
    const isPaid: boolean = invoice.paid;

    if (!isPaid) {
      return NextResponse.json("Payment failed", { status: 500 });
    }

    // Get product information
    const productId = invoice.lines.data[0].price?.product as string;
    const product = await stripe.products.retrieve(productId);

    const name = product.name;
    const date = product.metadata.Datum;
    const time = product.metadata.Uhrzeit;
    const zoom = product.metadata.Zoom;

    sendEmail(
      invoice.customer_name!,
      invoice.customer_email!,
      name,
      date,
      time,
      zoom,
      invoice.hosted_invoice_url!
    );

    return NextResponse.json("FulfillOrder successful", { status: 200 });
  } catch (err) {
    console.error("[FULLFILLORDER_ERROR", err);
    return NextResponse.json("Internal error", { status: 500 });
  }
}
