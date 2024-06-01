import { auth, db } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { email, password, username } = await request.json();
  const cookieStore = cookies();

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
      username,
      email,
      role: "user",
    });

    return NextResponse.json(
      { msg: "user registered successfully" },
      { status: 200 }
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
