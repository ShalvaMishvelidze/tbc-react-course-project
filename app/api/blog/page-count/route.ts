import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const { search } = await req.json();
    const count = await sql`SELECT COUNT(*) FROM posts
  WHERE title ILIKE ${"%" + search + "%"};`;

    const pages = Math.ceil(count.rows[0].count / 12);

    return NextResponse.json({ pages }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "something went wrong" },
      { status: 500 }
    );
  }
}
