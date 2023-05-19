import { NextRequest, NextResponse } from "next/server";

import { API_URL } from "@/api/utils";

export async function POST(req: NextRequest) {
  const redirectURI = process.env.NEXT_PUBLIC_REDIRECT_URI;

  if (!redirectURI) {
    throw new Error("Missing redirect URI");
  }

  const body = await req.json();

  const loginRequest = await fetch(`${API_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: body.code,
      redirect_uri: redirectURI,
      provider: body.provider,
    }),
  });

  const response = await loginRequest.json();

  return NextResponse.json(
    { token: response.token },
    {
      headers: {
        "Set-Cookie": `token=${response.token}; path=/; samesite=lax; httponly;`,
      },
    }
  );
}
