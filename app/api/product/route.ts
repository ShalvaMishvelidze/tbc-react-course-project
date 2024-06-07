import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const productsData = await sql`SELECT * FROM products where id=${body.id};`;

  return NextResponse.json(
    { msg: "success", data: productsData.rows[0] },
    { status: 200 }
  );
}
