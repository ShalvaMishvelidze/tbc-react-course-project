import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const revalidate = 0;

export const GET = async () => {
  try {
    const categories = await sql`SELECT DISTINCT category
    FROM products;`;
    return NextResponse.json(categories.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "something went wrong" },
      { status: 500 }
    );
  }
};
