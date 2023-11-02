import sgMail from "@sendgrid/mail";
import { USER } from "./config";

const initSendGrid = process.env.SENDGRID_API_KEY as string;
sgMail.setApiKey(initSendGrid);

export async function sendEmail(
  customer_name: string,
  customer_email: string,
  product_name: string,
  product_date: string,
  product_time: string,
  product_zoom: string,
  invoice_url: string
) {
  if (!initSendGrid) {
    console.log("[SENDEMAIL_ERROR]", "Sendgrid API Key not set");
    throw new Error("Sendgrid API Key not set");
  }

  const htmlString = `
    <h1 style="font-size:16px">Liebe(r) ${customer_name},</h1>

    <br>
    <p>Vielen Dank für deine Buchung von <strong>${
      product_name.split(" ")[0]
    } am ${product_date} um ${product_time}.</strong></p>


    <p>Hier sind die Login-Daten:</p>

    <a href="${product_zoom}">${product_zoom}</a>

    <br>
    <p>Deine Rechnung und deinen Zahlungsnachweise kannst du hier herunterladen: <br>
    <a href="${invoice_url}">Rechnung</a>
    </p>

    <br>
    <p>Ich freue mich auf dich!</p>

    <br>
    <p>Ganz liebe Grüße,</p>
    <p>${USER.split(" ")[0]}</p>
    `;

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

  const msg = {
    to: customer_email!,
    from: {
      email: process.env.SENDGRID_FROM_EMAIL!,
      name: USER,
    },
    bcc: process.env.SENDGRID_FROM_EMAIL!,
    subject: `Online-Fitness-Kurs mit ${
      USER.split(" ")[0]
    } - Rechnung und Zugangsdaten`,
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
  try {
    console.log("Sending email to " + customer_email);

    await sgMail.send(msg);
    console.log("[SENDEMAIL_SUCCESS]", `Email sent to  ${customer_email}`);
  } catch (err) {
    console.log("[SENDEMAIL_ERROR]", err);
    return false;
  }
}
