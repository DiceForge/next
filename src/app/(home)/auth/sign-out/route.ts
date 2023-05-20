import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  const headers = new Headers();
  headers.set("Set-Cookie", `token=; path=/; samesite=lax; httponly;`);

  return NextResponse.redirect(new URL("/", req.url), {
    headers,
  });
}
