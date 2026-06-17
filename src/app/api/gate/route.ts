import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

const COOKIE_NAME  = "aaase_access";
const COOKIE_AGE   = 60 * 60 * 24 * 30; // 30 days

function expectedHash(): string {
  const pw = process.env.ACCESS_PASSWORD;
  if (!pw) {
    // Fallback default password: "salesiano2026"
    // Override by setting ACCESS_PASSWORD in Vercel environment variables
    return createHash("sha256").update("salesiano2026").digest("hex");
  }
  return createHash("sha256").update(pw).digest("hex");
}

export async function POST(request: NextRequest) {
  let body: { password?: string; next?: string } = {};
  try { body = await request.json(); } catch { /* empty body */ }

  const submitted = (body.password ?? "").trim();
  if (!submitted) {
    return NextResponse.json({ error: "Password obrigatória" }, { status: 400 });
  }

  const hash = createHash("sha256").update(submitted).digest("hex");

  if (hash !== expectedHash()) {
    // Deliberate 400ms delay to slow brute-force
    await new Promise((r) => setTimeout(r, 400));
    return NextResponse.json({ error: "Password incorrecta" }, { status: 401 });
  }

  const redirectTo = body.next && body.next.startsWith("/") ? body.next : "/dashboard";
  const response = NextResponse.json({ ok: true, next: redirectTo });

  response.cookies.set(COOKIE_NAME, hash, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_AGE,
    path: "/",
  });

  return response;
}

// DELETE /api/gate → clear cookie (logout)
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, "", { maxAge: 0, path: "/" });
  return res;
}
