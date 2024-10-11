import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { DEFAULT_LOGIN_REDIRECT, authRoutes, publicRoutes, apiAuthPrefix } from "@/route";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  const { pathname } = nextUrl;

  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(pathname);

  const isPublicRoute = publicRoutes.some(route =>
    route === pathname ||
    (route.endsWith("/*") && pathname.startsWith(route.replace("/*", "")))
  );

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
