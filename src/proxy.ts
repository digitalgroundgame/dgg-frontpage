import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const FILE_PATH_PATTERN = /(?:^|\/)[^/]*\.[^/]+$/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Keep framework internals and file-like public assets case-sensitive.
  if (pathname.startsWith("/_next/") || FILE_PATH_PATTERN.test(pathname)) {
    return NextResponse.next();
  }

  const lowercasePathname = pathname.toLowerCase();
  if (pathname === lowercasePathname) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = lowercasePathname;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
