import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"; // Import NextRequest type

export function middleware(request: NextRequest) { // Define request as type NextRequest
  // check authentication
  const isAuthenticated = request.cookies.get("access_token");
  if (!isAuthenticated) {
    // redirect login when not authenticated
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  const response = NextResponse.next();
  return response;
}

export const config = {
  matcher: [
    '/', // Paths to match
  ],
};
