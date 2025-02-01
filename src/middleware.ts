import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { store } from "@/redux/store";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const state = store.getState();
  const { isAuthenticated, user } = state.auth;
  console.log(`isAuthenticated: ${isAuthenticated}`);
  return NextResponse.next();
  return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/dashboard/:path*",
};
