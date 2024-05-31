// import { NextRequest, NextResponse } from "next/server";

// export default function middleware(request: NextRequest) {
// let token = request.cookies.get("token");
// let language = request.cookies.get("language");

// if (
//   request.nextUrl.pathname === "/api/auth/register" ||
//   request.nextUrl.pathname === "/api/auth/login" ||
//   request.nextUrl.pathname === "/api/auth/users" ||
//   request.nextUrl.pathname === "/api/cart" ||
//   request.nextUrl.pathname === "/api/products" ||
//   request.nextUrl.pathname === "/api/product"

// ) {
//   return NextResponse.next();
// }
// if (request.nextUrl.pathname === "/api/auth/logout") {
//   const response = NextResponse.next();
//   response.cookies.delete("token");
//   return response;
// }
// if (token && request.nextUrl.pathname === "/login") {
//   return NextResponse.redirect(new URL("/", request.url));
// }
// if (!token && request.nextUrl.pathname !== "/login") {
//   return NextResponse.redirect(new URL("/login", request.url));
// }
// if (request.nextUrl.pathname !== "/login" && !language) {
//   const response = NextResponse.next();
//   response.cookies.set("language", "en");
//   return response;
// }
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!_next|favicon.ico).*)"],
// };

import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "ka"],

  // Used when no locale matches
  defaultLocale: "en",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(ka|en)/:path*"],
};
