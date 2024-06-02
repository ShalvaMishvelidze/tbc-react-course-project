import { auth, db } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { email, password, name, lastName, confirmPassword } =
    await request.json();
  const cookieStore = cookies();

  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters long" },
      { status: 404 }
    );
  }

  if (password !== confirmPassword) {
    return NextResponse.json(
      { error: "Passwords do not match!" },
      { status: 404 }
    );
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
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

    await setDoc(doc(db, "users", user.uid), {
      name,
      lastName,
      email,
      role: "user",
    });

    return NextResponse.json(
      { msg: "user registered successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error);

    if (error.code === "auth/email-already-in-use") {
      return NextResponse.json(
        { error: "user with this email already exists!" },
        { status: 409 }
      );
    }

    if (error.code) {
      return NextResponse.json({ error: error.code }, { status: 400 });
    }

    return NextResponse.json({ error: "failed to register" }, { status: 500 });
  }
};
