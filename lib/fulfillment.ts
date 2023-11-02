import stripe from "./get-stripe";
import { sendEmail } from "./sendEmail";

export async function fulFillOrder(invoice_id: string) {
  console.log("[FULFILLORDER] Invoice ID:", invoice_id);
  try {
    // Create invoice
    console.log("[FULFILLORDER] ghere:");
    const invoice = await stripe.invoices.sendInvoice(invoice_id);

    // Check if invoice was successfully paid
    const isPaid: boolean = invoice.paid;

    if (!isPaid) {
      throw new Error("Payment failed");
    }

    // Get product information
    const productId = invoice.lines.data[0].price?.product as string;
    const product = await stripe.products.retrieve(productId);

    const name = product.name;
    const date = product.metadata.Datum;
    const time = product.metadata.Uhrzeit;
    const zoom = product.metadata.Zoom;
    console.log("[FULFILLORDER] Product:", name, date, time, zoom);
    sendEmail(
      invoice.customer_name!,
      invoice.customer_email!,
      name,
      date,
      time,
      zoom,
      invoice.hosted_invoice_url!
    );
  } catch (err) {
    console.log("[FULFILLORDER_ERROR]", err);
    console.error("[FULFILLORDER_ERROR", err);
    return false;
  }
}
