import stripe from "@/lib/get-stripe";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const products = await stripe.products.list();
  // Loop through the products and retrieve associated prices
  //   const productsWithPrices = await Promise.all(
  //     products.data.map(async (product) => {
  //       const prices = await stripe.prices.list({
  //         product: product.id,
  //       });

  //       return {
  //         product: product,
  //         prices: prices.data,
  //       };
  //     })
  //   );
  //   console.log(productsWithPrices);
  const productsWithPrices = await Promise.all(
    products.data.map(async (product) => {
      const price = await stripe.prices.list({
        product: product.id,
      });
      return {
        product: product,
        price: price.data[0],
      };
    })
  );
  return NextResponse.json(productsWithPrices, { status: 200 });
}
