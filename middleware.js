import { NextResponse } from "next/server";

export default function middleware(request) {
  let token = request.cookies.get("token");

  if (
    request.nextUrl.pathname === "/api/auth/register" ||
    request.nextUrl.pathname === "/api/auth/login" ||
    request.nextUrl.pathname === "/api/auth/logout"
  ) {
    return NextResponse.next();
  }
  if (token && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!token && request.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
