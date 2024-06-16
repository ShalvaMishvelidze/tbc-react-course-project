import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  console.log(req.nextUrl.origin);

  return new Response("Logged out successfully!", { status: 200 });
};
