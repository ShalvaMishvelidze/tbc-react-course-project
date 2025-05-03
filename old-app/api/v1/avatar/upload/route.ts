import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { del, put } from "@vercel/blob";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export const POST = withApiAuthRequired(
  async (request: NextRequest): Promise<NextResponse> => {
    const id = request.headers.get("id");
    const { searchParams } = new URL(request.url);
    const filename: any = searchParams.get("filename");

    const blob = await put(filename, request.body as any, {
      access: "public",
    });

    const oldBlob = await sql`SELECT image FROM users WHERE id = ${id}`;
    await sql`UPDATE users SET image = ${blob.url} WHERE id = ${id}`;
    await del(oldBlob.rows[0].image);

    return NextResponse.json(blob);
  }
);
