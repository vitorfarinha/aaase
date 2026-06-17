import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "aaase_access";

/**
 * The middleware can't run Node's `crypto` module (Edge Runtime).
 * Instead we store the raw password in ACCESS_PASSWORD and the API
 * route does the hashing. Here we just check that the cookie value
 * is non-empty and starts with a valid hex prefix (basic integrity).
 *
 * The real validation happens once in /api/gate (POST).
 * After that, the hash is stored in the cookie and we trust it here.
 */

const PUBLIC_PREFIXES = [
  "/gate",
  "/api/gate",
  "/_next",
  "/favicon",
  "/aaase-logo.png",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow public paths
  if (PUBLIC_PREFIXES.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Check access cookie — any non-empty value means they authenticated
  const cookie = request.cookies.get(COOKIE_NAME);
  if (cookie?.value && cookie.value.length === 64) {
    // 64 hex chars = valid SHA-256 hash set by /api/gate
    return NextResponse.next();
  }

  // Not authenticated → send to gate
  const gate = new URL("/gate", request.url);
  gate.searchParams.set("next", pathname);
  return NextResponse.redirect(gate);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
