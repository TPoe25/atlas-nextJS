import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /ui routes
  if (!pathname.startsWith("/ui")) {
    return NextResponse.next();
  }

  const session = await auth();

  // If not logged in, go to /login
  if (!session?.user) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Only run middleware on /ui/*
export const config = {
  matcher: ["/ui/:path*"],
};
