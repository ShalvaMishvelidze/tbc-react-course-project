import { NextRequest, NextResponse } from "next/server";
import { validateJWT, createJWT } from "@/utils/auth_functions";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value?.replace("Bearer ", "");

  if (!token) return NextResponse.next();

  try {
    const payload = await validateJWT(token);

    // Check time left until expiry
    const exp = payload.exp! * 1000;
    const now = Date.now();
    const timeLeft = exp - now;

    const threeDays = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds
    const oneDay = 1 * 24 * 60 * 60 * 1000; // 1 day in milliseconds

    if (timeLeft < oneDay) {
      const newToken = await createJWT({
        id: payload.id as string,
        name: payload.name as string,
        email: payload.email as string,
      });

      const res = NextResponse.next();
      res.cookies.set("token", `Bearer ${newToken}`, {
        httpOnly: true, // necessary for xss attack prevention. cookies are not accessible from client-side javascript
        path: "/", // decide where the cookie is accessible
        maxAge: threeDays / 1000, // 3 days in seconds
        sameSite: "lax", // CSRF protection. CSRF attacks are when a malicious site makes a request to your site with the user's credentials. SameSite prevents this by not sending cookies on cross-origin requests.
        secure: process.env.NODE_ENV === "production", // only send cookies over HTTPS in production
      });

      return res;
    }

    return NextResponse.next();
  } catch (err) {
    // Invalid token – remove it
    const res = NextResponse.next();
    res.cookies.delete("token");
    return res;
  }
}

export const config = {
  matcher: ["/api/v2/protected/:path*"], // or add protected routes only
};
