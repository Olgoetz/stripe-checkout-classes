import stripe from "./get-stripe";

const getPrices = async () => {
  const prices = await stripe.prices.list();
  console.log(prices.data.reverse());
  return prices.data.reverse();
};

export default getPrices;
