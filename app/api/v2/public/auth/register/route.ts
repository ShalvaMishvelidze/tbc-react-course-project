import { prisma } from "@/lib/prisma";
import { logError } from "@/prisma/logError";
import { createJWT, hashPassword } from "@/utils/auth_functions";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async (req: NextRequest) => {
  try {
    const cookieStore = cookies();
    const body = await req.json();
    const { name, email, password } = body;

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = await createJWT({
      id: user!.id,
      name: user!.name,
      email: user!.email,
    });

    cookieStore.set("token", `Bearer ${token}`, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 3,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return NextResponse.json(
      { msg: "User created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    await logError(error);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
};
