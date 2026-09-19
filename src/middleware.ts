import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/notifications",
  "/my-dossier",
  "/dossier",
  "/archives",
  "/community",
  "/groups",
  "/followers",
  "/members",
];

const authRoutes = ["/auth/login", "/auth/register", "/auth/forgot-password", "/auth/reset-password", "/auth/verify-email"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const token = request.cookies.get("token")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const hasValidToken = token || refreshToken;
  if (isProtectedRoute && !hasValidToken) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }
  

  if (isAuthRoute && hasValidToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  

  return NextResponse.next();
}

export const config = {
  matcher: [
 
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};