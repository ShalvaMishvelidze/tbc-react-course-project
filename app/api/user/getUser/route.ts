import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export const GET = withApiAuthRequired(async (req: NextRequest) => {
  const id = req.headers.get("id");
  console.log(id);

  if (!id) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  try {
    const user = await sql`SELECT * FROM users WHERE id = ${id}`;
    if (user.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      {
        msg: "success",
        data: user.rows[0],
      },
      { status: 200 }
    );
  } catch (error) {
    // Handle error: Invalid token or failed to fetch user data
    return NextResponse.json(
      { msg: "failed to fetch user data" },
      { status: 500 }
    );
  }
});
