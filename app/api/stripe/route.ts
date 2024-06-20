import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10", // Use the latest API version
});

export const POST = async (req: NextRequest) => {
  const cart = await req.json();
  const id = req.headers.get("id");

  const orderId = uuidv4();
  try {
    const line_items = cart.map((item: any) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            metadata: {
              id: item.product_id,
              orderId: orderId,
            },
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      };
    });
    const names = cart
      .map((item: { name: string }) => {
        return item.name;
      })
      .join(", ");
    const price = cart.reduce(
      (acc: number, item: { price: string; quantity: number }) => {
        return acc + parseFloat(item.price) * item.quantity;
      },
      0
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`,
      cancel_url: `${req.nextUrl.origin}/canceled`,
      metadata: {
        orderId: orderId,
        names,
        price,
        user_id: id,
      },
    });
    return NextResponse.json({ id: session.id }, { status: 200 });
  } catch (err) {
    console.log(err);

    return NextResponse.json({ error: err }, { status: 500 });
  }
};
