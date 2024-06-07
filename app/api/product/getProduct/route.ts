import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.headers.get("id");
  console.log(id);

  const productsData = await sql`SELECT * FROM products where id=${id};`;

  return NextResponse.json(
    { msg: "success", data: productsData.rows[0] },
    { status: 200 }
  );
}
