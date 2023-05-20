import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";

import { fetch } from "@/api/fetch";
import { routes } from "@/api/auth/routes";
import { AuthResponse } from "@/api/auth/types";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    console.error("No code!");
    redirect("/");
  }

  const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

  if (!REDIRECT_URI) {
    throw new Error("Missing redirect URI");
  }

  const response = await fetch(routes.login(), {
    method: "POST",
    body: JSON.stringify({
      code,
      provider: "google",
      redirect_uri: REDIRECT_URI,
    }),
  });

  const data: AuthResponse = await response.json();

  const headers = new Headers();
  headers.set(
    "Set-Cookie",
    `token=${data.token}; path=/; samesite=lax; httponly;`
  );

  return NextResponse.redirect(new URL("/", req.url), {
    headers,
  });
}
