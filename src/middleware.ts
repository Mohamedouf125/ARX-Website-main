import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If the path starts with /en or /ar, allow as normal
  if (pathname === "/" || pathname.startsWith("/en") || pathname.startsWith("/ar")) {
    return intlMiddleware(request);
  }

  // For any other route, redirect to /en + original path
  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api).*)"],
};
