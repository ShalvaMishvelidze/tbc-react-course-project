import { prisma } from "@/lib/prisma";
import { logError } from "@/prisma/logError";
import { createJWT, comparePassword } from "@/utils/auth_functions";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async (req: NextRequest) => {
  try {
    const cookieStore = cookies();
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { error: "There is no user for this Email address!" },
        { status: 401 }
      );
    }

    const isValid = await comparePassword(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Password doesn't match the Email you provided!" },
        { status: 401 }
      );
    }

    const token = await createJWT({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    cookieStore.set("token", `Bearer ${token}`, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 3,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return NextResponse.json({ msg: "Login successful!" }, { status: 200 });
  } catch (error) {
    await logError(error);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
};
