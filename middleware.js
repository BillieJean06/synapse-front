import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("neodits_token")?.value;

  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && req.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
