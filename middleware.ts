import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { locales, localePrefix } from "./navigation";

const intlMiddleware = createMiddleware({
  // Used when no locale matches
  defaultLocale: "en",
  localePrefix,
  locales,
});

export default function middleware(request: NextRequest) {
  let hasToken = request.cookies.has("authToken");
  let locale = request.cookies.get("NEXT_LOCALE");

  if (
    // request.nextUrl.pathname === "/api/auth/register" ||
    // request.nextUrl.pathname === "/api/auth/login" ||
    // request.nextUrl.pathname === "/api/auth/users" ||
    // request.nextUrl.pathname === "/api/cart" ||
    // request.nextUrl.pathname === "/api/products" ||
    // request.nextUrl.pathname === "/api/product"
    request.nextUrl.pathname === "/api/user/register" ||
    request.nextUrl.pathname === "/api/user/login" ||
    request.nextUrl.pathname === "/api/user/logout"
  ) {
    return NextResponse.next();
  }
  // if (request.nextUrl.pathname === "/api/auth/logout") {
  //   const response = NextResponse.next();
  //   response.cookies.delete("token");
  //   return response;
  // }
  if (hasToken && request.nextUrl.pathname === `/${locale?.value}/auth`) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  // if (!token && request.nextUrl.pathname !== "/login") {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  return intlMiddleware(request);

  // return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};

// export const config = {
//   // Match only internationalized pathnames
//   matcher: ["/", "/(ka|en)/:path*"],
// };
