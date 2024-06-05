import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = withApiAuthRequired(async (req: NextRequest) => {
  const { email, name, lastname } = await req.json();

  try {
    await sql`UPDATE users SET name = ${name}, lastname = ${lastname}, email = ${email} WHERE id = ${req.headers.get(
      "id"
    )}`;

    return NextResponse.json(
      { msg: "Profile updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating profile!" },
      { status: 400 }
    );
  }
});
