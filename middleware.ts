import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  // let token = request.cookies.get("token");
  let language = request.cookies.get("language");

  if (
    request.nextUrl.pathname === "/api/auth/login" ||
    request.nextUrl.pathname === "/api/auth/logout" ||
    request.nextUrl.pathname === "/api/auth/callback" ||
    request.nextUrl.pathname === "/api/auth/me" ||
    request.nextUrl.pathname === "/api/old-auth/register" ||
    request.nextUrl.pathname === "/api/old-auth/login" ||
    request.nextUrl.pathname === "/api/old-auth/users" ||
    request.nextUrl.pathname === "/api/old-auth/logout" ||
    request.nextUrl.pathname === "/api/avatar/upload" ||
    request.nextUrl.pathname === "/api/image/upload" ||
    request.nextUrl.pathname === "/api/product/upload" ||
    request.nextUrl.pathname === "/api/user/updateProfile" ||
    request.nextUrl.pathname === "/api/cart" ||
    request.nextUrl.pathname === "/api/webhook" ||
    request.nextUrl.pathname === "/api/refund" ||
    request.nextUrl.pathname === "/api/save-transaction" ||
    request.nextUrl.pathname === "/api/products" ||
    request.nextUrl.pathname === "/api/user/getUser" ||
    request.nextUrl.pathname === "/api/product"
  ) {
    return NextResponse.next();
  }
  if (request.nextUrl.pathname === "/api/old-auth/logout") {
    const response = NextResponse.next();
    response.cookies.delete("token");
    return response;
  }
  // if (token && request.nextUrl.pathname === "/login") {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }
  // if (!token && request.nextUrl.pathname !== "/login") {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
  if (
    // request.nextUrl.pathname !== "/login" &&
    !language
  ) {
    const response = NextResponse.next();
    response.cookies.set("language", "en");
    return response;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
