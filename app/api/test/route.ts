import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST (request: NextRequest) {
  // const productsData = await sql`SELECT * FROM products;`;

  const body = await request.json()

  console.log(body)

  return NextResponse.json(
      { msg: "success"},
      { status: 200 }
    );

}