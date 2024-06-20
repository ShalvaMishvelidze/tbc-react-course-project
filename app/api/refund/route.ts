import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10", // Use the latest API version
});

export const POST = withApiAuthRequired(async (req: NextRequest) => {
  const { order_id } = await req.json();

  const dbRes = await sql`SELECT * FROM orders WHERE order_id=${order_id}`;
  const order = dbRes.rows[0];
  const refund = await stripe.refunds.create({
    payment_intent: order.payment_intent,
  });

  await sql`DELETE FROM orders WHERE order_id=${order_id}`;
  console.log("refunded");

  return NextResponse.json({ refund }, { status: 200 });
});
