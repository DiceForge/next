import { NextRequest, NextResponse } from "next/server";

import { API_URL } from "@/api/utils";

export async function POST(req: NextRequest) {
  const redirectURI = process.env.NEXT_PUBLIC_REDIRECT_URI;

  if (!redirectURI) {
    throw new Error("Missing redirect URI");
  }

  const body = await req.json();

  const usernameRequest = await fetch(`${API_URL}/api/v1/auth/set_username`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${req.cookies.get("token")?.value}`,
    },
    body: JSON.stringify({
      username: body.username,
    }),
  });

  if (usernameRequest.status === 200) {
    const response = await usernameRequest.json();

    return NextResponse.json(
      { token: response.token },
      {
        headers: {
          "Set-Cookie": `token=${response.token}; path=/; samesite=lax; httponly;`,
        },
      }
    );
  } else {
    return NextResponse.json(
      { message: "There was a problem setting your username." },
      { status: 500 }
    );
  }
}
