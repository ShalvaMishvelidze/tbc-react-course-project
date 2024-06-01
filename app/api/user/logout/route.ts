import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = () => {
  try {
    cookies().delete("authToken");
    return NextResponse.json(
      { msg: "logged out successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ msg: "something went wrong!" }, { status: 500 });
  }
};
