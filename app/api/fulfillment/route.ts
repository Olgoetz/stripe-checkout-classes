import { NextResponse } from "next/server";

import stripe from "@/lib/get-stripe";

import sgMail from "@sendgrid/mail";

console.log(process.env.SENDGRID_API_KEY);
const initSendGrid = process.env.SENDGRID_API_KEY as string;
sgMail.setApiKey(initSendGrid);

export async function POST(req: Request, res: Response) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("session_id") as string;

  if (!initSendGrid) {
    return new NextResponse("Sendgrid API Key not set", { status: 401 });
  }

  try {
    // Get the session
    const session = await stripe.checkout.sessions.retrieve(id);
    console.log("[FULFILLMENT] Session:", session);

    // Create invoice
    const invoiceId: string = session.invoice as string;
    const invoice = await stripe.invoices.sendInvoice(invoiceId);
    console.log("[FULFILLMENT] Invoice:", invoice);

    // Check if invoice was successfully paid
    const isPaid: boolean = invoice.paid;

    if (!isPaid) {
      return new NextResponse("Payment failed", { status: 500 });
    }

    // Get product information
    const productId = invoice.lines.data[0].price?.product as string;
    const product = await stripe.products.retrieve(productId);

    const name = product.name;
    const date = product.metadata.Datum;
    const time = product.metadata.Uhrzeit;
    const zoom = product.metadata.Zoom;
    //console.log("[FULFILLMENT] Invoice Lines:", invoice.lines.data);

    // const response = await axios.get(invoice.invoice_pdf!, {
    //   responseType: "arraybuffer",
    // });
    // if (response.status !== 200) {
    //   throw new NextResponse(
    //     `Failed to fetch PDF: ${response.status} - ${response.statusText}`
    //   );
    // }
    // const pdfBuffer = Buffer.from(response.data, "binary");

    const htmlString = `
    <h1 style="font-size:16px">Liebe(r) ${invoice.customer_name},</h1>

    <br>
    <p>Vielen Dank für deine Buchung von <strong>${
      name.split(" ")[0]
    } am ${date} um ${time}.</strong></p>


    <p>Hier sind die Login-Daten:</p>
    
    <a href="${zoom}">${zoom}</a>

    <br>
    <p>Deine Rechnung und deinen Zahlungsnachweise kannst du hier herunterladen: <br>
    <a href="${invoice.hosted_invoice_url}">Rechnung</a>
    </p>

    <br>
    <p>Ich freue mich auf dich!</p>

    <br>
    <p>Ganz liebe Grüße,</p>
    <p>Michi</p>
    `;

    const msg = {
      to: invoice.customer_email!,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL!,
        name: "John Doe",
      },
      bcc: process.env.SENDGRID_FROM_EMAIL!,
      subject: "Online-Fitness-Kurs mit John - Rechnung",
      html: htmlString,
      // attachments: [
      //   {
      //     content: pdfBuffer.toString("base64"),
      //     filename: `Rechnung_${invoice.number}.pdf`,
      //     type: "application/pdf",
      //     disposition: "attachment",
      //     content_id: "invoice",
      //   },
      // ],
    };

    await sgMail.send(msg);
    return NextResponse.json(invoice, { status: 200 });
  } catch (err) {
    console.error("[FULLFILMENT_ERROR]", err);
    return new NextResponse("Internal error", { status: 500 });
  }

  // try {
  //   if (!id.startsWith("cs_")) {
  //     throw Error("Incorrect CheckoutSession ID.");
  //   }
  //   const checkout_session = await stripe.checkout.sessions.retrieve(id, {
  //     expand: ["payment_intent"],
  //   });

  //   res.status(200).json(checkout_session);
  // } catch (err) {
  //   res.status(500).json({ statusCode: 500, message: err.message });
  // }
}
