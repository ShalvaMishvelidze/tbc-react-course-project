// pages/api/login.ts
import { signInWithEmailAndPassword } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/firebase";
import { cookies } from "next/headers";

export const POST = async (request: NextRequest) => {
  const { email, password } = await request.json();
  const cookieStore = cookies();

  try {
    // Sign in user with Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Set cookie for session management
    cookieStore.set({
      name: "authToken",
      value: user.uid,
      //   maximum age of the cookie, 604800seconds=1week
      maxAge: 604800,
      //   defines where the cookie can be accessed
      path: "/",
      //   ensures that the cookie is only set over https
      //   since localhost:3000 is http and not https it will be commented for now
      //   secure: true,
      //   ensures that the cookie is only set over http
      httpOnly: true,
      //   Mitigates cross-site request forgery (CSRF) attacks
      //   by asserting that a cookie shouldn't be sent along with cross-origin requests.
      sameSite: "strict",
    });

    // Return success response
    return NextResponse.json(
      { msg: "User logged in successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error logging in user:", error);

    // Handle specific errors
    if (error.code) {
      return NextResponse.json({ error: error.code }, { status: 401 });
    }

    // Return generic error response
    return NextResponse.json(
      { error: "Failed to login user" },
      { status: 500 }
    );
  }
};
