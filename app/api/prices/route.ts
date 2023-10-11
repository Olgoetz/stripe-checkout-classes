import stripe from "@/lib/get-stripe";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const prices = await stripe.prices.list({});
  return NextResponse.json(prices.data.reverse(), { status: 200 });
}
