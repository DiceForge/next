import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!API_URL) {
    throw new Error("API URL missing!");
  }

  const token = req.cookies.get("token")?.value;

  const headers = new Headers();

  headers.set("Authorization", `Token ${token}`);
  headers.set("Content-Type", "application/json");

  return NextResponse.rewrite(
    API_URL + req.nextUrl.pathname + req.nextUrl.search,
    {
      headers,
    }
  );
}

export const config = {
  matcher: `/api/v1/:path*`,
};
