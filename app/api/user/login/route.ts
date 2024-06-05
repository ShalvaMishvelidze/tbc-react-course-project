import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export const GET = withApiAuthRequired(async (request: NextRequest) => {
  const data = await getSession();

  if (!data) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  const { sub: id, email, picture: avatar, nickname } = data.user;

  try {
    await sql`INSERT INTO users (id, email, image, name) VALUES (${id}, ${email}, ${avatar}, ${nickname}) ON CONFLICT (id) DO NOTHING`.catch(
      (e) => console.log(e)
    );
    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    console.error("Error logging in user: ", error);
    return NextResponse.json(
      { error: "Failed to login user" },
      { status: 500 }
    );
  }
});
