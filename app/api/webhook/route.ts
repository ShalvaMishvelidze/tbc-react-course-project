import { clearCart } from "@/utils/actions/cart_actions";
import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
// 4242424242424242

export const POST = async (req: NextRequest) => {
  const payload = await req.text();
  const sig = req.headers.get("Stripe-Signature")!;

  try {
    let event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const orderId = session.metadata!.orderId;
      const names = session.metadata!.names;
      const price = session.metadata!.price;
      const user_id = session.metadata!.user_id;
      const paymentIntent = session.payment_intent as string;

      if (user_id) {
        await sql`
        INSERT INTO orders
        (order_id, payment_intent, title, user_id, price)
        VALUES
        (${orderId}, ${paymentIntent}, ${names}, ${user_id?.replace(
          /"/g,
          ""
        )}, ${price})
      `;

        await clearCart(user_id?.replace(/"/g, ""));
        cookies().set("cart_total", "0");
      }
    }

    if (event.type === "refund.created") {
      console.log("refund");
    }

    return NextResponse.json({ status: 200, event: event.type });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({ status: 400, error: error });
  }
};
